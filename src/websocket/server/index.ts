import { WebSocket, WebSocketServer } from 'ws';

export default async function connectionWebSocketServer(wss: WebSocketServer) {
    wss.on('connection', (ws: WebSocket) => {
        console.log('[WebSockets - Server]: New client connected');

        ws.on('close', () => {
            console.log('[WebSockets - Server]: Client disconnected');
        });

        ws.on('error', (error) => {
            console.log('[WebSockets - Server]: Web Socket Error');
            console.log(error.message);
        });
    });
}
