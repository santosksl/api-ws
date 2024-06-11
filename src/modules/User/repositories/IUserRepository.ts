interface IUserDTO {
    name: string;
    email: string;
    passwordHash: string;
}

interface IAuthUserDTO {
    email: string;
    password: string;
}

export { IAuthUserDTO, IUserDTO };
