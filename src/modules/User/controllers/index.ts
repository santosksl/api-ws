import { AuthenticateUserController } from '@/modules/User/controllers/AuthenticateUserController';
import { CreateUserController } from '@/modules/User/controllers/CreateUserController';
import { AuthenticateUserUseCase } from '@/modules/User/useCases/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@/modules/User/useCases/CreateUserUseCase';
import { FetchUserInfosUseCase } from '../useCases/FetchUserInfosUseCase';
import { FetchUserInfosController } from './FetchUserInfosController';

const createUserUseCase = new CreateUserUseCase();
const createUserController = new CreateUserController(createUserUseCase);

const authUserUseCase = new AuthenticateUserUseCase();
const authUserController = new AuthenticateUserController(authUserUseCase);

const fetchUserInfosUseCase = new FetchUserInfosUseCase();
const fetchUserInfosController = new FetchUserInfosController(
    fetchUserInfosUseCase,
);

export { authUserController, createUserController, fetchUserInfosController };
