import { userRoutes } from '@/modules/User/routes/user-routes';
import { FastifyInstance } from 'fastify';

class Routes {
    static RegisterRoutes(routerController: FastifyInstance) {
        routerController.register(userRoutes, { prefix: '/user' });
    }
}

export { Routes };
