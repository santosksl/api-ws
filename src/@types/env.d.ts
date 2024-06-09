declare namespace NodeJS {
    interface ProcessEnv {
        PORT: number;

        MYSQL_DATABASE: string;
        MYSQL_PASSWORD: string;
        MYSQL_USER: string;
    }
}
