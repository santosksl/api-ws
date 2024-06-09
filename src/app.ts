import { migrate } from 'drizzle-orm/mysql2/migrator';
import fastify from 'fastify';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { db } from './database';

class SetupApplication {
    public httpServer: HTTPServer;
    public io: SocketIOServer;

    constructor(
        private port: number,
        public app = fastify(),
    ) {
        this.httpServer = createServer(this.app.server);
        this.io = new SocketIOServer(this.httpServer, {
            cors: {
                origin: 'http://localhost:3000',
            },
        });
    }

    public initApplication() {
        this.setupFastify();
        this.setupWebSocket();
    }

    private async setupFastify() {
        await migrate(db, { migrationsFolder: './drizzle' });
    }

    private async setupWebSocket() {
        this.io.on('connection', (socket) => {
            console.log('User Connected:', socket.id);

            socket.on('disconnect', () => {
                console.log('User Disconnected:', socket.id);
            });
        });
    }

    public startApplication() {
        this.httpServer.listen(this.port, () =>
            console.log('🚀 WebSockets Server Running'),
        );
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
