import { migrate } from 'drizzle-orm/mysql2/migrator';
import fastify from 'fastify';
import { WebSocketServer } from 'ws';
import { db } from './database';
import { Routes } from './http/routes';

class SetupApplication {
    constructor(
        private port: number,
        public app = fastify(),
    ) {}

    public initApplication() {
        this.setupRoutes();
        this.setupFastify();
        this.setupWebSocket();
    }

    private async setupFastify() {
        await migrate(db, { migrationsFolder: './drizzle' });
    }

    private setupRoutes() {
        Routes.RegisterRoutes(this.app);
    }

    private async setupWebSocket() {
        const wss = new WebSocketServer({
            port: this.port,
        });

        wss.on('connection', (socket) => {
            console.log('Connection WebSockets');
        });
    }

    public startApplication() {
        this.app
            .listen({
                host: '0.0.0.0',
                port: this.port,
            })
            .then((address) => {
                console.log(`🚀 HTTP Server Running!\n🎯 Address: ${address}`);
            });
    }
}

export { SetupApplication };
