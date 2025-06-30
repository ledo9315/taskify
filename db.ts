import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as auth from "./src/db/schema/auth";
import * as tasks from "./src/db/schema/tasks";

const client = createClient({
  url: "file:local.db",
});

const schema = {
  ...auth,
  ...tasks,
};

const db = drizzle(client, { schema });

export { db, schema };
