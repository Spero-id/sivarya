CREATE TABLE `account` (
	`id` varchar(128) NOT NULL,
	`userId` bigint unsigned NOT NULL,
	`account_id` varchar(255) NOT NULL,
	`provider_id` varchar(255) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp,
	`refresh_token_expires_at` timestamp,
	`scope` text,
	`password` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(128) NOT NULL,
	`userId` bigint unsigned NOT NULL,
	`token` varchar(128) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`ip_address` varchar(64),
	`user_agent` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` varchar(128) NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `media` DROP FOREIGN KEY `fk_media_project`;
--> statement-breakpoint
ALTER TABLE `project_views` DROP FOREIGN KEY `fk_views_project`;
--> statement-breakpoint
ALTER TABLE `projects` DROP FOREIGN KEY `fk_projects_category`;
--> statement-breakpoint
ALTER TABLE `media` MODIFY COLUMN `size_bytes` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `media` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `messages` MODIFY COLUMN `is_read` tinyint NOT NULL;--> statement-breakpoint
ALTER TABLE `messages` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `project_views` MODIFY COLUMN `count` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` MODIFY COLUMN `featured` tinyint NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` MODIFY COLUMN `views` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `projects` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `users` ADD `email_verified` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `image` varchar(500);--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` timestamp;--> statement-breakpoint
ALTER TABLE `media` ADD CONSTRAINT `media_project_id_projects_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `project_views` ADD CONSTRAINT `project_views_project_id_projects_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `projects_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE restrict ON UPDATE cascade;