"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

// Texte für beide Sprachen (da wir außerhalb der Provider sind)
const texts = {
  de: {
    title: "Seite nicht gefunden",
    description:
      "Die gesuchte Seite scheint nicht zu existieren. Möglicherweise wurde sie verschoben oder gelöscht.",
    back: "Zurück",
    dashboard: "Zum Dashboard",
    searchTitle: "Suchen Sie etwas?",
    searchDesc: "Nutzen Sie die Navigation oder gehen Sie zurück zum Dashboard",
    errorTitle: "Temporärer Fehler?",
    errorDesc: "Versuchen Sie es in ein paar Minuten erneut",
    homeTitle: "Zurück zur Startseite",
    homeDesc: "Kehren Sie zum Dashboard zurück und verwalten Sie Ihre Aufgaben",
    support: "Haben Sie Probleme? Kontaktieren Sie uns über",
  },
  en: {
    title: "Page not found",
    description:
      "The page you're looking for doesn't seem to exist. It may have been moved or deleted.",
    back: "Back",
    dashboard: "To Dashboard",
    searchTitle: "Looking for something?",
    searchDesc: "Use the navigation or go back to the dashboard",
    errorTitle: "Temporary error?",
    errorDesc: "Try again in a few minutes",
    homeTitle: "Back to homepage",
    homeDesc: "Return to the dashboard and manage your tasks",
    support: "Having problems? Contact us at",
  },
};

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Locale aus der URL extrahieren
  const locale = pathname?.startsWith("/en") ? "en" : "de";
  const t = texts[locale];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            className="relative"
          >
            <h1 className="text-8xl md:text-9xl font-bold text-secondary">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              {t.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              {t.description}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button
              onClick={() => router.back()}
              variant="outline"
              size="lg"
              className="flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Button>

            <Link href={`/${locale}`}>
              <Button
                size="lg"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Home className="h-4 w-4" />
                {t.dashboard}
              </Button>
            </Link>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="pt-12 text-sm text-muted-foreground"
          >
            <p>
              {t.support}{" "}
              <a
                href="mailto:support@taskify.software"
                className="text-primary hover:underline"
              >
                support@taskify.software
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
