"use client";

import { Button } from "@src/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-background">
      <div className="text-center animate-fade-in max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1
            className="text-8xl font-light text-accent mb-4"
            role="heading"
            aria-level={1}
          >
            404
          </h1>
          <h2 className="text-xl text-muted-foreground mb-4">
            Seite nicht gefunden
          </h2>
          <p className="text-sm text-muted-foreground">
            Die angeforderte Seite existiert nicht oder wurde verschoben. Kein
            Problem - wir helfen Ihnen beim Navigieren.
          </p>
        </div>

        <div className="flex flex-col gap-4 justify-center">
          <Link href="/">
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 cursor-pointer"
              size="lg"
              aria-label="Zurück zur Taskify Startseite"
            >
              <Home className="mr-2 h-4 w-4" aria-hidden="true" />
              Zum Dashboard
            </Button>
          </Link>

          <Button
            variant="ghost"
            className="gap-2 hover:bg-accent/10 transition-colors cursor-pointer"
            onClick={() => router.back()}
            aria-label="Zur vorherigen Seite zurückkehren"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Zurück
          </Button>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          <p>
            Falls Sie glauben, dass diese Seite fälschlicherweise nicht gefunden
            wurde, kontaktieren Sie uns bitte über{" "}
            <a
              href="mailto:support@taskify.software"
              className="text-accent hover:underline"
              aria-label="Support per E-Mail kontaktieren"
            >
              support@taskify.software
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
