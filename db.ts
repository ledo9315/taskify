import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as auth from "./src/db/schema/auth";
import * as tasks from "./src/db/schema/tasks";

const sql = neon(process.env.DATABASE_URL!);

const schema = {
  ...auth,
  ...tasks,
};

const db = drizzle(sql, { schema });

export { db, schema };
