ALTER TABLE `users` ADD `email` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `password_hash` varchar(255) NOT NULL;