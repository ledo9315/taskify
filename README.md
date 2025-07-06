# Taskify

![Taskify Vorschau](public/preview.jpg)

Taskify ist ein modernes, kostenloses Task-Management-Tool, das dir hilft, deine Aufgaben effizient zu organisieren, zu priorisieren und zu erledigen. Die App ist für Desktop und Mobile optimiert und bietet ein elegantes, schnelles Nutzererlebnis.

## Features

- **Aufgabenverwaltung**: Erstelle, bearbeite und lösche Aufgaben mit wenigen Klicks.
- **Tags & Prioritäten**: Organisiere Aufgaben mit Tags und setze Prioritäten (hoch, mittel, niedrig).
- **Fälligkeitsdaten**: Behalte Deadlines im Blick und filtere Aufgaben nach Fälligkeit.
- **Dark Mode**: Automatische Anpassung an das System-Theme.
- **Mehrsprachigkeit**: Deutsch und Englisch werden unterstützt.
- **Sichere Authentifizierung**: Moderne Authentifizierung und Passwort-Reset.
- **Performance**: Schnelle Ladezeiten durch statische Assets und optimiertes Caching.

## Tech Stack

- **Next.js**
- **TypeScript**
- **PostgreSQL**
- **Drizzle ORM**
- **React Query**
- **Better Auth**
- **Zustand**
- **Tailwind CSS**
- **Vercel**

## Lokale Entwicklung

1. **Repository klonen**
   ```bash
   git clone https://github.com/dein-benutzername/taskify.git
   cd taskify
   ```
2. **Abhängigkeiten installieren**
   ```bash
   npm install
   # oder
   yarn install
   ```
3. **Umgebungsvariablen anlegen**
   Erstelle eine `.env.local` Datei und trage die nötigen Variablen ein.

4. **Datenbank migrieren (optional)**

   ```bash
   npm run db:migrate
   ```

5. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```
   Die App läuft dann auf [http://localhost:3000](http://localhost:3000).

## Deployment

Taskify ist für Vercel optimiert. Ein Klick auf den Button deployt die App direkt:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=taskify)

---

**Autor:** Leonid Domahalskyy

Feedback und Pull Requests sind willkommen!
