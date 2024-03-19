import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getSearch = async (term?: string) => {
  let userId = null;

  try {
    const self = await getSelf();
    userId = self?.id || null;
  } catch {
    // Handle error fetching self
    userId = null;
  }

  let streams = [];

  const whereClause: any = {
    OR: [
      {
        name: {
          contains: term || "", // Ensure term is not null
        },
      },
      {
        user: {
          username: {
            contains: term || "", // Ensure term is not null
          },
        },
      },
    ],
  };

  if (userId) {
    whereClause.user = {
      NOT: {
        blocking: {
          some: {
            blockedId: userId,
          },
        },
      },
    };
  }

  streams = await db.stream.findMany({
    where: whereClause,
    select: {
      user: true,
      id: true,
      name: true,
      isLive: true,
      thumbnailUrl: true,
      updatedAt: true,
    },
    orderBy: [
      {
        isLive: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
  });

  return streams;
};
