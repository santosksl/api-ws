import { db } from '@/database';
import { IUserDTO } from '@/database/repositories/IUserRepository';
import { users } from '@/database/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { UserAlreadyExistsError } from './errors';

class CreateUserUseCase {
    async execute({ name, email, passwordHash }: IUserDTO) {
        const alreadyExistsEmail = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (alreadyExistsEmail.length > 0) {
            throw new UserAlreadyExistsError();
        }

        const hash = await bcrypt.hash(passwordHash, 6);
        await db.insert(users).values({ name, email, passwordHash: hash });
    }
}

export { CreateUserUseCase };
