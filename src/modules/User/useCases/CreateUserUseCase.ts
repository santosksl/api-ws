import { db } from '@/database';
import { users } from '@/database/schema';
import * as bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { IUserDTO } from '../repositories/IUserRepository';
import { UserAlreadyExistsError } from './errors';

class CreateUserUseCase {
    async execute({ name, email, passwordHash, socketId }: IUserDTO) {
        const alreadyExistsEmail = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (alreadyExistsEmail.length > 0) {
            throw new UserAlreadyExistsError();
        }

        await bcrypt.hash(passwordHash, 6);
        await db.insert(users).values({ name, email, passwordHash, socketId });
    }
}

export { CreateUserUseCase };
