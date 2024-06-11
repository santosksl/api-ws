import { authUserController, createUserController } from '@/http/controllers';
import { FastifyInstance } from 'fastify';

async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/signup', async (request, reply) => {
        await createUserController.handle(request, reply);
    });

    fastify.post('/login', async (request, reply) => {
        await authUserController.handle(request, reply);
    });
}

export { userRoutes };
