import { CreateUserController } from '@/modules/User/controllers/CreateUserController';
import { CreateUserUseCase } from '@/modules/User/useCases/CreateUserUseCase';

const createUserUseCase = new CreateUserUseCase();
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
