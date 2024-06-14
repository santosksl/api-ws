import { db } from '@/database';
import { users } from '@/database/schema';
import { UserNotExistsError } from './errors';

interface IUserSQL {
    name: string;
}

interface FetchUserInfosResponse {
    user: IUserSQL[];
}

class FetchUserInfosUseCase {
    async execute(userId: number): Promise<FetchUserInfosResponse> {
        const thisUserReallyExists = await db
            .select({ dbUserId: users.id })
            .from(users);

        const { dbUserId } = thisUserReallyExists[0];

        if (userId !== dbUserId) {
            throw new UserNotExistsError();
        }

        const user = await db
            .select({
                name: users.name,
            })
            .from(users);

        return { user };
    }
}

export { FetchUserInfosUseCase };
