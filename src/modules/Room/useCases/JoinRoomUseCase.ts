import { db } from '@/database';
import { IJoinRoomDTO } from '@/database/repositories/IRoomRepository';
import { members, rooms, users } from '@/database/schema';
import { UserNotExistsError } from '@/modules/User/useCases/errors';
import { eq } from 'drizzle-orm';
import { RoomNotExistsError, UserAlreadyInRoomError } from './errors';

class JoinRoomUseCase {
    async execute({ roomId, userId }: IJoinRoomDTO) {
        const doesThisRoomReallyExist = await db
            .select({
                dbRoomId: rooms.id,
            })
            .from(rooms);

        const { dbRoomId } = doesThisRoomReallyExist[0];

        if (roomId !== dbRoomId) {
            throw new RoomNotExistsError();
        }

        const userInRoom = await db
            .select()
            .from(members)
            .where(eq(members.userId, userId));

        if (userInRoom.length > 0) {
            throw new UserAlreadyInRoomError();
        }

        const theUserReallyExists = await db
            .select({
                dbUserId: users.id,
            })
            .from(users);

        const { dbUserId } = theUserReallyExists[0];

        if (userId !== dbUserId) {
            throw new UserNotExistsError();
        }

        await db.insert(members).values({ roomId, userId });
    }
}

export { JoinRoomUseCase };
