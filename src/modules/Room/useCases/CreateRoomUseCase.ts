import { db } from '@/database';
import { IRoomDTO } from '@/database/repositories/IRoomRepository';
import { room, users } from '@/database/schema';
import { OwnerIdNotExistsError } from './errors';

class CreateRoomUseCase {
    async execute({ name, ownerId }: IRoomDTO) {
        const whoeverCreatedItReallyExists = await db
            .select({
                userId: users.id,
            })
            .from(users);

        const { userId } = whoeverCreatedItReallyExists[0];

        if (userId !== ownerId) {
            throw new OwnerIdNotExistsError();
        }

        await db.insert(room).values({ name, ownerId });
    }
}

export { CreateRoomUseCase };
