import { FastifyInstance } from 'fastify';
import { authUserController, createUserController } from '../controllers';

async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/signup', async (request, reply) => {
        await createUserController.handle(request, reply);
    });

    fastify.post('/login', async (request, reply) => {
        await authUserController.handle(request, reply);
    });
}

export { userRoutes };
