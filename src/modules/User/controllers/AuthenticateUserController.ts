import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AuthenticateUserUseCase } from '../useCases/AuthenticateUserUseCase';
import { UserAlreadyExistsError } from '../useCases/errors';

const authSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
        .string()
        .min(2, { message: 'Password must be at least 2 characters long' }),
});

class AuthenticateUserController {
    constructor(private authUserUseCase: AuthenticateUserUseCase) {}

    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = authSchema.parse(request.body);

        try {
            const { user } = await this.authUserUseCase.execute({
                email,
                password,
            });

            const token = await reply.jwtSign(
                {},
                {
                    sign: {
                        sub: `${user.id}`,
                    },
                },
            );

            return reply
                .status(201)
                .send({ message: 'The user has been logged in', user, token });
        } catch (err) {
            if (err instanceof UserAlreadyExistsError) {
                return reply.status(409).send({ message: err.message });
            }

            throw err;
        }
    }
}

export { AuthenticateUserController };
