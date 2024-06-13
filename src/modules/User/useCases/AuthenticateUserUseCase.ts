import { db } from '@/database';
import { users } from '@/database/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { IAuthUserDTO } from '@/database/repositories/IUserRepository';
import { InvalidCredentialsError } from './errors';

interface IAuthUserResponse {
    id: number;
}

interface AuthUserUseCaseResponse {
    user: IAuthUserResponse;
}

class AuthenticateUserUseCase {
    async execute({
        email,
        password,
    }: IAuthUserDTO): Promise<AuthUserUseCaseResponse> {
        const alreadyExistsEmail = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (alreadyExistsEmail.length <= 0) {
            throw new InvalidCredentialsError();
        }

        const getPasswordHashed = await db
            .select({
                passwordHash: users.passwordHash,
            })
            .from(users);

        const { passwordHash } = getPasswordHashed[0];
        const doesPasswordMatch = await bcrypt.compare(password, passwordHash);

        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError();
        }

        const getUserInfo = await db
            .select({
                id: users.id,
                name: users.name,
            })
            .from(users);

        const { id, name } = getUserInfo[0];

        const user = {
            id,
            name,
        };

        return { user };
    }
}

export { AuthenticateUserUseCase };
