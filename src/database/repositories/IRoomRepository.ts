interface IRoomDTO {
    name: string;
    ownerId: number;
}

interface IJoinRoomDTO {
    roomId: number;
    userId: number;
}

export { IJoinRoomDTO, IRoomDTO };
