CREATE TABLE `messages` (
	`to` varchar(255),
	`text` text,
	`room` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`socket` varchar(255),
	`avatar` varchar(255),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
