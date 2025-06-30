DROP TABLE `tags_table`;--> statement-breakpoint
DROP TABLE `taskTags`;--> statement-breakpoint
ALTER TABLE `tasks_table` ADD `tags` text DEFAULT '[]';