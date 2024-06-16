import dotenv from 'dotenv';
import { SetupApplication } from './app';

dotenv.config();

class Server {
    static startServer() {
        const application = new SetupApplication(
            process.env.HTTP_PORT,
            process.env.WEBSOCKET_PORT,
        );
        application.initApplication();
        application.startApplication();
        return application;
    }
}

Server.startServer();
