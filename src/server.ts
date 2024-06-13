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

Server.startServer();
