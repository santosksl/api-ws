import { CreateRoomUseCase } from '../useCases/CreateRoomUseCase';
import { JoinRoomUseCase } from '../useCases/JoinRoomUseCase';
import { CreateRoomController } from './CreateRoomController';
import { JoinRoomController } from './JoinRoomController';

const createRoomUseCase = new CreateRoomUseCase();
const createRoomController = new CreateRoomController(createRoomUseCase);

const joinRoomUseCase = new JoinRoomUseCase();
const joinRoomController = new JoinRoomController(joinRoomUseCase);

export { createRoomController, joinRoomController };
