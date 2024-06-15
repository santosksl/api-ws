import { UserNotExistsError } from '@/modules/User/useCases/errors';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { JoinRoomUseCase } from '../useCases/JoinRoomUseCase';
import { RoomNotExistsError, UserAlreadyInRoomError } from '../useCases/errors';

const joinRoomSchema = z.object({
    roomId: z.number(),
    userId: z.number(),
});

class JoinRoomController {
    constructor(private joinRoomUseCase: JoinRoomUseCase) {}

    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { roomId, userId } = joinRoomSchema.parse(request.body);

        try {
            await this.joinRoomUseCase.execute({ roomId, userId });
            return reply.status(201).send({
                message: 'The user has successfully entered the room',
            });
        } catch (err) {
            if (err instanceof RoomNotExistsError) {
                return reply.status(409).send({ message: err.message });
            }

            if (err instanceof UserAlreadyInRoomError) {
                return reply.status(409).send({ message: err.message });
            }

            if (err instanceof UserNotExistsError) {
                return reply.status(409).send({ message: err.message });
            }

            throw err;
        }
    }
}

export { JoinRoomController };
