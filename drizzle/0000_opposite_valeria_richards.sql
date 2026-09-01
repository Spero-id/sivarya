-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `categories` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`slug` varchar(50) NOT NULL,
	`name_id` varchar(100) NOT NULL,
	`name_en` varchar(100) NOT NULL,
	`sort_order` int NOT NULL DEFAULT 0,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_categories_slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`project_id` bigint unsigned,
	`filename` varchar(255) NOT NULL,
	`path` varchar(500) NOT NULL,
	`mime_type` varchar(100) NOT NULL DEFAULT '',
	`size_bytes` bigint unsigned NOT NULL DEFAULT 0,
	`alt` varchar(255) NOT NULL DEFAULT '',
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`email` varchar(190) NOT NULL,
	`subject` varchar(255) NOT NULL DEFAULT '',
	`message` text NOT NULL,
	`is_read` tinyint(1) NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_views` (
	`project_id` bigint unsigned NOT NULL,
	`view_date` date NOT NULL,
	`count` bigint unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `project_views_project_id_view_date` PRIMARY KEY(`project_id`,`view_date`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`slug` varchar(120) NOT NULL,
	`category_id` bigint unsigned NOT NULL,
	`title` varchar(255) NOT NULL,
	`client` varchar(255) NOT NULL DEFAULT '',
	`cover_image` varchar(500) NOT NULL DEFAULT '',
	`aspect` varchar(20) NOT NULL DEFAULT '4/5',
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`featured` tinyint(1) NOT NULL DEFAULT 0,
	`sort_order` int NOT NULL DEFAULT 0,
	`views` bigint unsigned NOT NULL DEFAULT 0,
	`summary_id` text NOT NULL,
	`summary_en` text NOT NULL,
	`challenge_id` text,
	`challenge_en` text,
	`strategy_id` text,
	`strategy_en` text,
	`result_id` text,
	`result_en` text,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`published_at` timestamp,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_projects_slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`username` varchar(50) NOT NULL,
	`email` varchar(190) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`role` enum('admin','editor') NOT NULL DEFAULT 'admin',
	`last_login_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_users_username` UNIQUE(`username`),
	CONSTRAINT `uq_users_email` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `media` ADD CONSTRAINT `fk_media_project` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `project_views` ADD CONSTRAINT `fk_views_project` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `fk_projects_category` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX `idx_media_project` ON `media` (`project_id`);--> statement-breakpoint
CREATE INDEX `idx_messages_read` ON `messages` (`is_read`);--> statement-breakpoint
CREATE INDEX `idx_projects_category` ON `projects` (`category_id`);--> statement-breakpoint
CREATE INDEX `idx_projects_status_featured` ON `projects` (`status`,`featured`);--> statement-breakpoint
CREATE INDEX `idx_projects_sort` ON `projects` (`sort_order`);
*/