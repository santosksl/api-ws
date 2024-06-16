import { WebSocket, WebSocketServer } from 'ws';

interface IMessageDTO {
    userName: string;
    message: string;
}

export default async function connectionWebSocketServer(wss: WebSocketServer) {
    wss.on('connection', async (ws: WebSocket) => {
        console.log('[WebSockets - Server]: New client connected');

        ws.on('close', () => {
            console.log('[WebSockets - Server]: Client disconnected');
        });

        ws.on('error', (error) => {
            console.log('[WebSockets - Server]: Web Socket Error');
            console.log(error.message);
        });

        ws.on('message', (data) => {
            const { message, userName }: IMessageDTO = JSON.parse(
                data.toString(),
            );

            wss.clients.forEach((client) => {
                client.send(
                    JSON.stringify({
                        message,
                        userName,
                    }),
                );
            });
        });
    });
}
