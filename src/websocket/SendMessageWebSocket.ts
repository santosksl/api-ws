import { WebSocket, WebSocketServer } from 'ws';

interface IMessageDTO {
    name: string;
    message: string;
}

export default async function sendMessageWebSocket(
    wss: WebSocketServer,
    ws: WebSocket,
) {
    wss.on('message', ({ name, message }: IMessageDTO) => {
        console.log(`Username: ${name}`);
        console.log(`Message: ${message}`);

        ws.send(`Server received your message: ${message}`);
    });
}
