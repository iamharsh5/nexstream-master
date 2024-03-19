import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    // Fetch the IDs of users you follow
    const followingIds = (await db.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true }, // Use 'followingId' instead of 'followedId'
    })).map((f) => f.followingId);

    // Fetch recommended users excluding those you follow and yourself
    users = await db.user.findMany({
      where: {
        NOT: [
          {
            id: {
              in: followingIds.concat(userId), // Include own ID to ensure it's excluded
            },
          },
          {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: [
        {
          stream: {
            isLive: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  } else {
    // Fetch all users if not logged in (guest mode)
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: [
        {
          stream: {
            isLive: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  }

  return users;
};
