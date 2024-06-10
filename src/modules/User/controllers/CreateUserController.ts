import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CreateUserUseCase } from '../useCases/CreateUserUseCase';
import { UserAlreadyExistsError } from '../useCases/errors';

const userSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
        .string()
        .min(2, { message: 'Password must be at least 2 characters long' }),
    socketId: z.string(),
});

class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}

    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password, socketId } = userSchema.parse(
            request.body,
        );

        try {
            await this.createUserUseCase.execute({
                name,
                email,
                passwordHash: password,
                socketId,
            });
            return reply
                .status(201)
                .send({ message: 'User created successfully' });
        } catch (err) {
            if (err instanceof UserAlreadyExistsError) {
                return reply.status(409).send({ message: err.message });
            }

            throw err;
        }
    }
}

export { CreateUserController };
