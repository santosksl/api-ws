import { db } from '@/database';
import { members, rooms, users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { UserNotExistsError } from './errors';

interface IUserSQL {
    id: number;
    name: string;
}

interface IRoomsSQL {
    id: number;
    name: string;
}

interface FetchUserInfosResponse {
    user: IUserSQL[];
    rooms: IRoomsSQL[];
}

class FetchUserInfosUseCase {
    async execute(userId: number): Promise<FetchUserInfosResponse> {
        const thisUserReallyExists = await db
            .select({ dbUserId: users.id })
            .from(users)
            .where(eq(users.id, userId));

        if (thisUserReallyExists.length <= 0) {
            throw new UserNotExistsError();
        }

        const user = await db
            .select({
                id: users.id,
                name: users.name,
            })
            .from(users)
            .where(eq(users.id, userId));

        const roomsList = await db
            .select({ id: rooms.id, name: rooms.name })
            .from(members)
            .innerJoin(rooms, eq(members.roomId, rooms.id))
            .where(eq(members.userId, userId));

        return { user, rooms: roomsList };
    }
}

export { FetchUserInfosUseCase };
