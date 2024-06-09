import dotenv from 'dotenv';
import { SetupApplication } from './app';

dotenv.config();

class Server {
    static startServer() {
        const application = new SetupApplication(process.env.PORT);
        application.initApplication();
        application.startApplication();
        return application;
    }
}

const applicationInstance = Server.startServer();
export const { httpServer, io } = applicationInstance;
