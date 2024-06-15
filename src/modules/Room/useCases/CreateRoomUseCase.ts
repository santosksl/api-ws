import { db } from '@/database';
import { IRoomDTO } from '@/database/repositories/IRoomRepository';
import { members, rooms, users } from '@/database/schema';
import { UserNotExistsError } from '@/modules/User/useCases/errors';
import { eq } from 'drizzle-orm';

class CreateRoomUseCase {
    async execute({ name, ownerId }: IRoomDTO) {
        const whoeverCreatedItReallyExists = await db
            .select()
            .from(users)
            .where(eq(users.id, ownerId));

        if (whoeverCreatedItReallyExists.length <= 0) {
            throw new UserNotExistsError();
        }

        const createRoom = await db.insert(rooms).values({ name, ownerId });

        const selectRoom = await db
            .select({
                roomId: rooms.id,
            })
            .from(rooms)
            .where(eq(rooms.id, createRoom[0].insertId));

        const { roomId } = selectRoom[0];

        const createMember = await db
            .insert(members)
            .values({ userId: ownerId, roomId });

        return { createRoom, createMember };
    }
}

export { CreateRoomUseCase };
