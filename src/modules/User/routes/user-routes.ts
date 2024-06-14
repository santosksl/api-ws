import { FastifyInstance } from 'fastify';
import {
    authUserController,
    createUserController,
    fetchUserInfosController,
} from '../controllers';

async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/signup', async (request, reply) => {
        await createUserController.handle(request, reply);
    });

    fastify.post('/login', async (request, reply) => {
        await authUserController.handle(request, reply);
    });

    fastify.get('/:userId', async (request, reply) => {
        await fetchUserInfosController.handle(request, reply);
    });
}

export { userRoutes };
