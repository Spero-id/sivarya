UPDATE `users` SET `role` = 'admin' WHERE `role` = 'editor';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('admin','user') NOT NULL DEFAULT 'user';--> statement-breakpoint