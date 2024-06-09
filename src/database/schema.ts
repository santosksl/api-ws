import {
    int,
    mysqlTable,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    socketId: varchar('socket', { length: 255 }),
    avatar: varchar('avatar', { length: 255 }),
});

export const message = mysqlTable('messages', {
    to: varchar('to', { length: 255 }),
    text: text('text'),
    roomId: varchar('room', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
