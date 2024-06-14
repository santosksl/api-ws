import { db } from '@/database';
import { IRoomDTO } from '@/database/repositories/IRoomRepository';
import { room, users } from '@/database/schema';
import { UserNotExistsError } from '@/modules/User/useCases/errors';

class CreateRoomUseCase {
    async execute({ name, ownerId }: IRoomDTO) {
        const whoeverCreatedItReallyExists = await db
            .select({
                userId: users.id,
            })
            .from(users);

        const { userId } = whoeverCreatedItReallyExists[0];

        if (ownerId !== userId) {
            throw new UserNotExistsError();
        }

        await db.insert(room).values({ name, ownerId });
    }
}

export { CreateRoomUseCase };
