import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();

export default defineConfig({
    out: './drizzle',
    schema: './src/database/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        host: 'localhost',
        port: 3306,
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PASSWORD,
    },
});
