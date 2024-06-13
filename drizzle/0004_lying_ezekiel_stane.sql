DROP TABLE `messages`;--> statement-breakpoint
ALTER TABLE `room` ADD `owner_id` int;--> statement-breakpoint
ALTER TABLE `room` ADD CONSTRAINT `room_owner_id_users_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;