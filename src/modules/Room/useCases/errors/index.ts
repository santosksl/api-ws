class OwnerIdNotExistsError extends Error {
    constructor() {
        super('Owner Id Not Exists!');
    }
}

export { OwnerIdNotExistsError };
