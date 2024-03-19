    import { db } from "@/lib/db";
    import { getSelf } from "@/lib/auth-service";

    interface User {
        id: string;
        username: string;
        imageUrl: string;
        externalUserId: string;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
        stream: {
          isLive: boolean;
        } | null;
      }
      
    export const getGuestRecommended = async () => {
    let userId;

    try {
        const self = await getSelf();
        userId = self.id;
    } catch {
        userId = null;
    }

    let users: User[] = [];

    if (!userId) {
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
                }
            },
            {
                createdAt: "desc"
            },
            ]
        });
        }
    
        return users;
    
    };