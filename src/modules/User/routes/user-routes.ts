import { createUserController } from '@/http/controllers';
import { FastifyInstance } from 'fastify';

async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/register', async (request, reply) => {
        await createUserController.handle(request, reply);
    });

    fastify.get('/hello', async (request, reply) => {
        reply.send({ message: 'Hello, World' });
    });
}

export { userRoutes };
