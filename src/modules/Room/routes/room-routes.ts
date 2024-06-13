import { verifyJWT } from '@/http/middlewares/verifyJWT';
import { FastifyInstance } from 'fastify';
import { createRoomController } from '../controllers';

async function roomRoutes(fastify: FastifyInstance) {
    fastify.post(
        '/create',
        { onRequest: [verifyJWT] },
        async (request, reply) => {
            await createRoomController.handle(request, reply);
        },
    );
}

export { roomRoutes };
