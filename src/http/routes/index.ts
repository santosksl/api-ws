import { userRoutes } from '@/modules/User/routes/user-routes';
import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

class Routes {
    static RegisterRoutes(routerController: FastifyInstance) {
        routerController.register(cors, { origin: true });
        routerController.register(userRoutes, { prefix: '/user' });
    }
}

export { Routes };
