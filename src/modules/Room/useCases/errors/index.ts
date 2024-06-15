class RoomNotExistsError extends Error {
    constructor() {
        super('Room not exists!');
    }
}

class UserAlreadyInRoomError extends Error {
    constructor() {
        super('This user is already in this room!');
    }
}

export { RoomNotExistsError, UserAlreadyInRoomError };
