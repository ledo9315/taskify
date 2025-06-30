import { db } from "@/db";
import { tasksTable } from "./schema/tasks";
import { user } from "./schema/auth";

const getManyTasksForUser = (userId: string) => {
  const baseDate = new Date();

  return [
    // Hausarbeit & Privat (Priorität 0-2, verschiedene Status)
    {
      title: "Einkaufen gehen",
      description:
        "Milch, Brot, Eier und Butter im Supermarkt kaufen. Nicht vergessen: Bio-Produkte bevorzugen.",
      tags: ["hausarbeit", "einkauf", "dringend"],
      complete: false,
      priority: 2,
      dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // Heute fällig in 4 Stunden
      userId,
      createdAt: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "Wohnung putzen",
      description:
        "Komplette Wohnung gründlich reinigen: Bad, Küche, Wohnzimmer und Schlafzimmer.",
      tags: ["hausarbeit", "putzen", "wochenende"],
      complete: true,
      priority: 0,
      dueDate: null,
      userId,
      createdAt: new Date(baseDate.getTime() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Geburtstagsgeschenk für Maria kaufen",
      description:
        "Überraschungsgeschenk für Marias 30. Geburtstag besorgen. Sie mag Bücher und Pflanzen.",
      tags: ["geschenk", "geburtstag", "freunde"],
      complete: false,
      priority: 1,
      dueDate: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 Tage überfällig
      userId,
      createdAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "Zahnarzttermin vereinbaren",
      description:
        "Kontrolltermin für nächste Woche buchen. Dr. Müller anrufen (Tel: 0123-456789).",
      tags: ["gesundheit", "termin", "privat"],
      complete: false,
      priority: 1,
      dueDate: new Date(Date.now() + 6 * 60 * 60 * 1000), // Heute fällig in 6 Stunden
      userId,
      createdAt: new Date(baseDate.getTime() - 4 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },

    // Arbeit & Projekte
    {
      title: "Projektdokumentation fertigstellen",
      description:
        "Die finale Dokumentation für das React-Projekt schreiben. Alle Komponenten und APIs dokumentieren.",
      tags: ["arbeit", "dokumentation", "react"],
      complete: false,
      priority: 2,
      dueDate: new Date(baseDate.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 Tage überfällig
      userId,
      createdAt: new Date(baseDate.getTime() - 8 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Code Review durchführen",
      description:
        "Pull Request #42 reviewen und Feedback geben. Besonders auf TypeScript-Typen achten.",
      tags: ["arbeit", "review", "typescript"],
      complete: true,
      priority: 1,
      dueDate: null,
      userId,
      createdAt: new Date(baseDate.getTime() - 10 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseDate.getTime() - 9 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Bug in der Login-Funktion fixen",
      description:
        "Der Login-Button funktioniert nicht korrekt bei langsamer Internetverbindung. Loading-State implementieren.",
      tags: ["bug", "frontend", "javascript", "dringend"],
      complete: false,
      priority: 2,
      dueDate: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 Tage überfällig
      userId,
      createdAt: new Date(baseDate.getTime() - 15 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseDate.getTime() - 14 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Team Meeting vorbereiten",
      description:
        "Agenda für das wöchentliche Team-Meeting erstellen. Sprint Review und Planning berücksichtigen.",
      tags: ["arbeit", "meeting", "planning"],
      complete: false,
      priority: 1,
      dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // Heute fällig in 2 Stunden
      userId,
      createdAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "Datenbank-Migration testen",
      description:
        "Neue Drizzle-Migration auf Staging-Environment testen und sicherstellen, dass alle Daten korrekt migriert werden.",
      tags: ["datenbank", "migration", "testing"],
      complete: false,
      priority: 2,
      dueDate: new Date(baseDate.getTime() + 5 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "API-Dokumentation aktualisieren",
      description:
        "OpenAPI-Spezifikation für die neuen Endpunkte erstellen und Postman-Collection aktualisieren.",
      tags: ["api", "dokumentation", "openapi"],
      complete: false,
      priority: 1,
      dueDate: new Date(baseDate.getTime() + 12 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "Performance-Optimierung Frontend",
      description:
        "Bundle-Size analysieren, Code-Splitting implementieren und Lazy Loading für Komponenten einführen.",
      tags: ["performance", "frontend", "optimierung"],
      complete: false,
      priority: 1,
      dueDate: new Date(baseDate.getTime() + 20 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 6 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },

    // Sport & Gesundheit
    {
      title: "Sporttraining planen",
      description:
        "Trainingsplan für die nächsten 4 Wochen erstellen. 3x pro Woche Krafttraining, 2x Cardio.",
      tags: ["sport", "fitness", "planung"],
      complete: false,
      priority: 0,
      dueDate: new Date(baseDate.getTime() + 6 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 6 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Yoga-Kurs anmelden",
      description:
        "Neuen Yoga-Kurs für Montag und Mittwoch buchen. Online oder im Studio.",
      tags: ["sport", "yoga", "entspannung"],
      complete: false,
      priority: 0,
      dueDate: new Date(baseDate.getTime() + 14 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "Lauftraining für Marathon",
      description:
        "Wöchentlich 3 Läufe: 1x kurz (5km), 1x mittel (10km), 1x lang (15-20km).",
      tags: ["sport", "laufen", "marathon"],
      complete: false,
      priority: 0,
      dueDate: null,
      userId,
      createdAt: new Date(baseDate.getTime() - 20 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000),
    },

    // Lernen & Weiterbildung
    {
      title: "TypeScript-Kurs abschließen",
      description:
        "Die letzten 3 Module des Advanced TypeScript Kurses durcharbeiten und Zertifikat erhalten.",
      tags: ["lernen", "typescript", "kurs"],
      complete: false,
      priority: 1,
      dueDate: new Date(baseDate.getTime() + 20 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 20 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseDate.getTime() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      title: "React Query Tutorial schauen",
      description:
        "Neues Tutorial über React Query v5 anschauen und in eigenem Projekt umsetzen.",
      tags: ["lernen", "react", "tutorial"],
      complete: true,
      priority: 0,
      dueDate: null,
      userId,
      createdAt: new Date(baseDate.getTime() - 12 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseDate.getTime() - 11 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Next.js 15 Features studieren",
      description:
        "Neue Features in Next.js 15 durchgehen: App Router Updates, Server Components, etc.",
      tags: ["lernen", "nextjs", "features"],
      complete: false,
      priority: 0,
      dueDate: new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },

    // Reisen & Urlaub
    {
      title: "Urlaubsplanung für Sommer",
      description:
        "Reiseziele recherchieren und Urlaubsantrag stellen. Präferenz: Südeuropa, 2 Wochen im Juli.",
      tags: ["urlaub", "reise", "planung"],
      complete: false,
      priority: 0,
      dueDate: new Date(baseDate.getTime() + 60 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "Reisepass verlängern",
      description:
        "Neuen Reisepass beantragen - alter läuft im Herbst ab. Termin online buchen.",
      tags: ["reise", "dokumente", "behörde"],
      complete: false,
      priority: 1,
      dueDate: new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "Flugtickets für Barcelona buchen",
      description:
        "Günstige Flüge für das Wochenende in Barcelona suchen und buchen. Hin- und Rückflug.",
      tags: ["reise", "flug", "barcelona"],
      complete: true,
      priority: 1,
      dueDate: null,
      userId,
      createdAt: new Date(baseDate.getTime() - 8 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000),
    },

    // Finanzen & Admin
    {
      title: "Steuererklärung vorbereiten",
      description:
        "Alle Belege sammeln und sortieren. Software herunterladen und ersten Entwurf erstellen.",
      tags: ["finanzen", "steuer", "admin"],
      complete: false,
      priority: 2,
      dueDate: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 Tage überfällig
      userId,
      createdAt: new Date(baseDate.getTime() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "Versicherungen überprüfen",
      description:
        "Alle Versicherungen durchgehen und Konditionen vergleichen. Eventuell wechseln.",
      tags: ["finanzen", "versicherung", "vergleich"],
      complete: false,
      priority: 0,
      dueDate: new Date(baseDate.getTime() + 25 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 10 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "Bankwechsel durchführen",
      description:
        "Zu neuer Bank wechseln mit besseren Konditionen. Alle Lastschriften umstellen.",
      tags: ["finanzen", "bank", "wechsel"],
      complete: false,
      priority: 1,
      dueDate: new Date(baseDate.getTime() + 35 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 12 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },

    // Hobbys & Kreativ
    {
      title: "Fotobuch erstellen",
      description:
        "Urlaubsfotos vom letzten Jahr sortieren und schönes Fotobuch zusammenstellen.",
      tags: ["hobby", "fotos", "kreativ"],
      complete: false,
      priority: 0,
      dueDate: null,
      userId,
      createdAt: new Date(baseDate.getTime() - 15 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "Gitarre üben",
      description:
        "Täglich 30 Minuten Gitarre üben. Neue Akkorde lernen und alte Songs wiederholen.",
      tags: ["hobby", "musik", "gitarre"],
      complete: false,
      priority: 0,
      dueDate: null,
      userId,
      createdAt: new Date(baseDate.getTime() - 20 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Kochkurs besuchen",
      description:
        "Italienischen Kochkurs buchen und lernen, wie man echte Pasta macht.",
      tags: ["hobby", "kochen", "italienisch"],
      complete: false,
      priority: 0,
      dueDate: new Date(baseDate.getTime() + 22 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 4 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },

    // Sozial & Familie
    {
      title: "Freunde zum Grillabend einladen",
      description:
        "Grillparty für nächstes Wochenende planen. Einkaufsliste erstellen und Leute einladen.",
      tags: ["freunde", "party", "grillen"],
      complete: false,
      priority: 1,
      dueDate: new Date(Date.now() + 8 * 60 * 60 * 1000), // Heute fällig in 8 Stunden
      userId,
      createdAt: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "Mama anrufen",
      description:
        "Schon lange nicht mehr mit Mama telefoniert. Mal wieder ein längeres Gespräch führen.",
      tags: ["familie", "telefon", "mama"],
      complete: true,
      priority: 1,
      dueDate: null,
      userId,
      createdAt: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Hochzeitsgeschenk für Tim und Sarah",
      description:
        "Schönes Geschenk für die Hochzeit von Tim und Sarah aussuchen. Budget: 100€.",
      tags: ["geschenk", "hochzeit", "freunde"],
      complete: false,
      priority: 1,
      dueDate: new Date(baseDate.getTime() + 18 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },

    // Technische Projekte
    {
      title: "Portfolio-Website überarbeiten",
      description:
        "Neues Design implementieren und aktuelle Projekte hinzufügen. Performance optimieren.",
      tags: ["portfolio", "website", "design"],
      complete: false,
      priority: 1,
      dueDate: new Date(baseDate.getTime() + 25 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 25 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Docker Setup für Entwicklung",
      description:
        "Docker-Container für lokale Entwicklungsumgebung einrichten. Database, Redis, etc.",
      tags: ["docker", "entwicklung", "setup"],
      complete: false,
      priority: 0,
      dueDate: null,
      userId,
      createdAt: new Date(baseDate.getTime() - 12 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "GitHub Actions CI/CD Pipeline",
      description:
        "Automatische Tests und Deployment-Pipeline für alle Repositories einrichten.",
      tags: ["devops", "ci-cd", "github"],
      complete: true,
      priority: 1,
      dueDate: null,
      userId,
      createdAt: new Date(baseDate.getTime() - 18 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseDate.getTime() - 16 * 24 * 60 * 60 * 1000),
    },

    // Allgemeine Tasks
    {
      title: "Auto zur Inspektion bringen",
      description:
        "TÜV-Termin vereinbaren und Auto zur Inspektion bringen. Winterreifen wechseln lassen.",
      tags: ["auto", "inspektion", "tüv"],
      complete: false,
      priority: 1,
      dueDate: new Date(baseDate.getTime() - 4 * 24 * 60 * 60 * 1000), // 4 Tage überfällig
      userId,
      createdAt: new Date(baseDate.getTime() - 8 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "Backup-Strategie überarbeiten",
      description:
        "Aktuelle Backup-Prozesse evaluieren und neue Strategie für Cloud-Storage implementieren.",
      tags: ["backup", "cloud", "sicherheit"],
      complete: false,
      priority: 2,
      dueDate: new Date(baseDate.getTime() + 16 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 4 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
    {
      title: "Neuen Monitor kaufen",
      description:
        "4K-Monitor für Homeoffice kaufen. Mindestens 27 Zoll, gute Farbdarstellung für Design-Arbeit.",
      tags: ["technik", "monitor", "homeoffice"],
      complete: false,
      priority: 0,
      dueDate: new Date(baseDate.getTime() + 40 * 24 * 60 * 60 * 1000),
      userId,
      createdAt: new Date(baseDate.getTime() - 14 * 24 * 60 * 60 * 1000),
      updatedAt: null,
    },
  ];
};

export async function seedDatabase() {
  try {
    console.log("🌱 Starte Datenbank-Seeding...");

    const args = process.argv.slice(2);
    const forceReset = args.includes("--force");

    if (forceReset) {
      console.log("🗑️  Lösche alle vorhandenen Tasks...");
      await db.delete(tasksTable);
      console.log("✅ Tasks zurückgesetzt");
    } else {
      const existingTasks = await db.select().from(tasksTable);

      if (existingTasks.length > 0) {
        console.log(
          "⚠️  Datenbank enthält bereits Tasks. Seeding übersprungen."
        );
        console.log(`   Gefunden: ${existingTasks.length} Aufgaben`);
        console.log(
          "   Verwende 'npm run db:seed -- --force' um Tasks zurückzusetzen."
        );
        return;
      }
    }

    console.log("👥 Suche nach vorhandenen Benutzern...");

    // Alle vorhandenen Benutzer laden
    const existingUsers = await db.select().from(user);

    if (existingUsers.length === 0) {
      console.log("❌ Keine Benutzer gefunden!");
      console.log("\n📝 ANLEITUNG:");
      console.log("   1. Starte die Anwendung: npm run dev");
      console.log("   2. Gehe zu /register");
      console.log("   3. Erstelle mindestens einen Testbenutzer");
      console.log("   4. Führe das Seeding erneut aus");
      return;
    }

    // Nur den ersten Benutzer verwenden
    const firstUser = existingUsers[0];
    console.log(
      `   ✅ Verwende Benutzer: ${firstUser.name} (${firstUser.email})`
    );

    console.log("\n📝 Erstelle viele Testaufgaben für diesen Benutzer...");

    // Viele Tasks für den ersten Benutzer erstellen
    const allTasks = getManyTasksForUser(firstUser.id);

    console.log(`   📊 Erstelle ${allTasks.length} Tasks...`);

    // Tasks in Batches einfügen für bessere Performance
    const batchSize = 10;
    for (let i = 0; i < allTasks.length; i += batchSize) {
      const batch = allTasks.slice(i, i + batchSize);
      await db.insert(tasksTable).values(batch);
      console.log(
        `   ✅ Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allTasks.length / batchSize)} erstellt`
      );
    }

    console.log("\n🎉 Datenbank-Seeding erfolgreich abgeschlossen!");
    console.log("\n📊 STATISTIKEN:");
    console.log(`   👤 Benutzer: ${firstUser.name} (${firstUser.email})`);
    console.log(`   📝 Tasks gesamt: ${allTasks.length}`);
    console.log(`   ✅ Erledigt: ${allTasks.filter((t) => t.complete).length}`);
    console.log(`   ⏰ Offen: ${allTasks.filter((t) => !t.complete).length}`);
    console.log(
      `   🔴 Hoch: ${allTasks.filter((t) => t.priority === 2).length}`
    );
    console.log(
      `   🟡 Mittel: ${allTasks.filter((t) => t.priority === 1).length}`
    );
    console.log(
      `   🟢 Niedrig: ${allTasks.filter((t) => t.priority === 0).length}`
    );
    console.log(
      `   📅 Mit Termin: ${allTasks.filter((t) => t.dueDate).length}`
    );
    console.log(
      `   🏷️  Einzigartige Tags: ${new Set(allTasks.flatMap((t) => t.tags)).size}`
    );
  } catch (error) {
    console.error("❌ Fehler beim Seeding:", error);
    throw error;
  }
}

// Script direkt ausführen, wenn als Hauptmodul geladen
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("✅ Seeding abgeschlossen");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seeding fehlgeschlagen:", error);
      process.exit(1);
    });
}
