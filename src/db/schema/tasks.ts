import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  json,
} from "drizzle-orm/pg-core";

export const tasksTable = pgTable("tasks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  complete: boolean("complete").notNull().default(false),
  description: text("description"),
  userId: text("user_id").notNull().default("default_user"),
  dueDate: timestamp("due_date"),
  tags: json("tags").$type<string[]>().default([]),
  priority: integer("priority").notNull().default(0),
  updatedAt: timestamp("updated_at"),
  createdAt: timestamp("created_at").notNull(),
});
