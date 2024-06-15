import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    avatar: varchar('avatar', { length: 255 }),
});

export const rooms = mysqlTable('rooms', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    ownerId: int('owner_id').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const members = mysqlTable('members', {
    userId: int('user_id')
        .references(() => users.id)
        .notNull(),
    roomId: int('room_id')
        .references(() => rooms.id)
        .notNull(),
});
