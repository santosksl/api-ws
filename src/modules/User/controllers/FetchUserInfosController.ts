import { FastifyReply, FastifyRequest } from 'fastify';
import { FetchUserInfosUseCase } from '../useCases/FetchUserInfosUseCase';
import { UserNotExistsError } from '../useCases/errors';

class FetchUserInfosController {
    constructor(private fetchUserInfosUseCase: FetchUserInfosUseCase) {}

    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { userId } = request.params as { userId: number };
        const userIdConvert = Number(userId);

        try {
            const { user } =
                await this.fetchUserInfosUseCase.execute(userIdConvert);
            return reply.status(201).send({ user });
        } catch (err) {
            if (err instanceof UserNotExistsError) {
                return reply.status(409).send({ message: err.message });
            }

            throw err;
        }
    }
}

export { FetchUserInfosController };
