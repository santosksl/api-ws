import dotenv from 'dotenv';
import { SetupApplication } from './app';

dotenv.config();

class Server {
    static startServer() {
        const application = new SetupApplication(3333);
        application.initApplication();
        application.startApplication();
    }
}

Server.startServer();
