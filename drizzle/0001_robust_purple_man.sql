CREATE TABLE `taskTags` (
	`taskId` integer NOT NULL,
	`tagId` integer NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tags_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_tags_table`("id", "name") SELECT "id", "name" FROM `tags_table`;--> statement-breakpoint
DROP TABLE `tags_table`;--> statement-breakpoint
ALTER TABLE `__new_tags_table` RENAME TO `tags_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;