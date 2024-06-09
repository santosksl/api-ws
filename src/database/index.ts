import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

dotenv.config();

const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
});

export const db = drizzle(connection);
