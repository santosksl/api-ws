import { userRoutes } from '@/modules/User/routes/user-routes';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';
import { FastifyInstance } from 'fastify';

dotenv.config();

class Routes {
    static RegisterRoutes(routerController: FastifyInstance) {
        routerController.register(fastifyJwt, {
            secret: process.env.JWT_SECKET_KEY,
        });

        routerController.register(cors, { origin: true });
        routerController.register(userRoutes, { prefix: '/user' });
    }
}

export { Routes };
