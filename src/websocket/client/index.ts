import { WebSocket } from 'ws';

export default async function connectionWebSocketClient(ws: WebSocket) {
    ws.on('open', () => {
        console.log(
            '[WebSockets - Client]: Client connected to the WebSocket server',
        );
    });
}
