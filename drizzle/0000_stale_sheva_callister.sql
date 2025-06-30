CREATE TABLE `tags_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`tasks_id` integer NOT NULL,
	FOREIGN KEY (`tasks_id`) REFERENCES `tasks_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tasks_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`complete` integer DEFAULT false NOT NULL,
	`description` text NOT NULL,
	`updatedAt` integer,
	`createdAt` integer NOT NULL
);
