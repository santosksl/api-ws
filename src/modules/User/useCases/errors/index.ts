class UserAlreadyExistsError extends Error {
    constructor() {
        super('E-mail already exists!');
    }
}

class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid Credentials');
    }
}

export { UserAlreadyExistsError, InvalidCredentialsError };
