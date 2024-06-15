import { verifyJWT } from '@/http/middlewares/verifyJWT';
import { FastifyInstance } from 'fastify';
import { createRoomController, joinRoomController } from '../controllers';

async function roomRoutes(fastify: FastifyInstance) {
    fastify.post(
        '/create',
        { onRequest: [verifyJWT] },
        async (request, reply) => {
            await createRoomController.handle(request, reply);
        },
    );

    fastify.post(
        '/join',
        { onRequest: [verifyJWT] },
        async (request, reply) => {
            await joinRoomController.handle(request, reply);
        },
    );
}

export { roomRoutes };
