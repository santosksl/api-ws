declare namespace NodeJS {
    interface ProcessEnv {
        HTTP_PORT: number;
        WEBSOCKET_PORT: number;

        MYSQL_DATABASE: string;
        MYSQL_PASSWORD: string;
        MYSQL_USER: string;

        JWT_SECKET_KEY: string;
    }
}
