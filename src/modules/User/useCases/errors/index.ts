class UserAlreadyExistsError extends Error {
    constructor() {
        super('E-mail already exists!');
    }
}

class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid Credentials!');
    }
}

class UserNotExistsError extends Error {
    constructor() {
        super('User not exists!');
    }
}

export { InvalidCredentialsError, UserAlreadyExistsError, UserNotExistsError };
