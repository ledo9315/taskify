"use client";

import { Button } from "@src/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-background">
      <div className="text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="text-8xl font-light text-accent mb-4">404</h1>
          <p className="text-xl text-muted-foreground">Seite nicht gefunden</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button
              className="gap-2 hover:bg-accent/10 transition-colors cursor-pointer"
              variant="ghost"
            >
              <Home className="w-4 h-4" />
              Startseite
            </Button>
          </Link>

          <Button
            variant="ghost"
            className="gap-2 hover:bg-accent/10 transition-colors cursor-pointer"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Button>
        </div>
      </div>
    </div>
  );
}
