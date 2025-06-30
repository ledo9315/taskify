import { db } from "@/db";
import { user, session, account, verification } from "./schema/auth";
import { tasksTable } from "./schema/tasks";

async function clearDatabase() {
  try {
    // Lösche alle Daten aus den Tabellen (in der richtigen Reihenfolge wegen Foreign Keys)
    await db.delete(session);
    console.log("✅ Sessions geleert");

    await db.delete(account);
    console.log("✅ Accounts geleert");

    await db.delete(verification);
    console.log("✅ Verifications geleert");

    await db.delete(tasksTable);
    console.log("✅ Tasks geleert");

    await db.delete(user);
    console.log("✅ Users geleert");

    console.log("🎉 Datenbank wurde erfolgreich geleert!");
  } catch (error) {
    console.error("❌ Fehler beim Leeren der Datenbank:", error);
    process.exit(1);
  }
}

clearDatabase();
