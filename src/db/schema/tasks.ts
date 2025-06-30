import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const tasksTable = sqliteTable("tasks", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  complete: integer({ mode: "boolean" }).notNull().default(false),
  description: text().notNull(),
  userId: text("user_id").notNull().default("default_user"),
  dueDate: integer({ mode: "timestamp" }),
  tags: text({ mode: "json" }).$type<string[]>().default([]),
  priority: integer({ mode: "number" }).notNull().default(0),
  updatedAt: integer({ mode: "timestamp" }),
  createdAt: integer({ mode: "timestamp" }).notNull(),
});
