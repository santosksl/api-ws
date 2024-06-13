import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CreateRoomUseCase } from '../useCases/CreateRoomUseCase';
import { OwnerIdNotExistsError } from '../useCases/errors';

const roomSchema = z.object({
    name: z
        .string()
        .min(4, { message: 'Name must be at least 4 characters long' }),
    ownerId: z.number(),
});

class CreateRoomController {
    constructor(private createRoomUseCase: CreateRoomUseCase) {}

    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, ownerId } = roomSchema.parse(request.body);

        try {
            await this.createRoomUseCase.execute({ name, ownerId });
            return reply
                .status(201)
                .send({ message: 'The room has been created successfully' });
        } catch (err) {
            if (err instanceof OwnerIdNotExistsError) {
                return reply.status(409).send({ message: err.message });
            }

            throw err;
        }
    }
}

export { CreateRoomController };
