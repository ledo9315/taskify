"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { CheckCircle, Plus, Calendar, Tag } from "lucide-react";
import { LanguageToggle } from "@/src/components/common/LanguageToggle";
import { ThemeToggle } from "@/src/components/common/ThemeToggle";
import { FormattedMessage } from "react-intl";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { locale } = useParams();
  const { theme } = useTheme();
  return (
    <div className="min-h-screen bg-background">
      <nav>
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-x-2">
              <Image alt="Logo" src="/logo.svg" width={28} height={28} />
              <h1 className="text-xl font-medium tracking-tight">taskify</h1>
            </div>
            <div className="flex items-center p-0 md:px-4">
              <LanguageToggle />
              <div className="mx-1">
                <div className="w-px h-6 bg-border"></div>
              </div>
              <ThemeToggle className="cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-6 py-24 sm:py-14">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-6xl font-medium tracking-tight leading-tight">
              <FormattedMessage
                id="Landing.hero.title"
                defaultMessage="Aufgaben leicht gemacht"
              />
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              <FormattedMessage
                id="Landing.hero.subtitle"
                defaultMessage="Organisiere deine Tasks, behalte den Überblick und arbeite produktiver. Komplett kostenlos und ohne Anmeldezwang."
              />
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href={`/${locale}/register`}>
              <Button
                size="lg"
                className="rounded-none w-full bg-accent dark:bg-accent text-white hover:ring-1 hover:ring-accent font-normal text-md hover:bg-accent dark:hover:bg-accent dark:hover:text-white hover:text-primary-foreground transition-all duration-300 cursor-pointer"
              >
                <FormattedMessage
                  id="Landing.hero.registerButton"
                  defaultMessage="Kostenlos registrieren"
                />
              </Button>
            </Link>
            <Link href={`/${locale}/login`}>
              <Button
                size={"lg"}
                variant="outline"
                className="rounded-none w-full font-normal border-primary/20 dark:border-primary/20 text-md hover:bg-secondary dark:hover:bg-secondary hover:text-primary cursor-pointer transition-colors duration-300"
              >
                <FormattedMessage
                  id="Landing.hero.loginButton"
                  defaultMessage="Anmelden"
                />
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <FormattedMessage
                id="Landing.hero.feature1"
                defaultMessage="Komplett kostenlos"
              />
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <FormattedMessage
                id="Landing.hero.feature2"
                defaultMessage="Sofort loslegen"
              />
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <FormattedMessage
                id="Landing.hero.feature3"
                defaultMessage="Weitere Funktionen"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border border-primary/20 transition-colors duration-300">
            <CardHeader className="text-center pb-4">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-medium">
                <FormattedMessage
                  id="Landing.features.card1.title"
                  defaultMessage="Einfach hinzufügen"
                />
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                <FormattedMessage
                  id="Landing.features.card1.description"
                  defaultMessage="Neue Aufgaben in Sekunden erstellen und bearbeiten"
                />
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-primary/20 transition-colors duration-300">
            <CardHeader className="text-center pb-4">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-medium">
                <FormattedMessage
                  id="Landing.features.card2.title"
                  defaultMessage="Termine im Blick"
                />
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                <FormattedMessage
                  id="Landing.features.card2.description"
                  defaultMessage="Deadlines setzen und rechtzeitig erledigen"
                />
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-primary/20 transition-colors duration-300">
            <CardHeader className="text-center pb-4">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-medium">
                <FormattedMessage
                  id="Landing.features.card3.title"
                  defaultMessage="Clever organisieren"
                />
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                <FormattedMessage
                  id="Landing.features.card3.description"
                  defaultMessage="Mit Tags und Kategorien den Überblick behalten"
                />
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="container max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium tracking-tight mb-4">
              <FormattedMessage
                id="Landing.dashboard.title"
                defaultMessage="Dein persönliches Dashboard"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <FormattedMessage
                id="Landing.dashboard.subtitle"
                defaultMessage="Behalte alle deine Aufgaben im Überblick mit unserer intuitiven und übersichtlichen Benutzeroberfläche."
              />
            </p>
          </div>

          <div className="flex justify-center">
            {!mounted ? (
              <Image
                src="/dashboard.gif"
                alt="Taskify Hero Image - Aufgabenverwaltung"
                width={600}
                height={400}
                className="w-full max-w-6xl border border-primary/20 hover:border-primary/40 transition-colors duration-300"
                priority={true}
                unoptimized
              />
            ) : theme === "light" ? (
              <Image
                src="/dashboard.gif"
                alt="Taskify Hero Image - Aufgabenverwaltung"
                width={600}
                height={400}
                className="w-full max-w-6xl border border-primary/20 hover:border-primary/40 transition-colors duration-300"
                priority={true}
                unoptimized
              />
            ) : (
              <Image
                src="/dashboard_dark.gif"
                alt="Taskify Hero Image - Aufgabenverwaltung"
                width={600}
                height={400}
                className="w-full max-w-6xl border border-primary/20 hover:border-primary/40 transition-colors duration-300"
                priority={true}
                unoptimized
              />
            )}
          </div>

          <div className="relative">
            {/* Subtle gradient overlay for better integration */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Footer im taskify Stil */}
      <footer className="border-t border-primary/30 mt-16">
        <div className="container max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-x-2">
              <Image alt="Logo" src="/logo.svg" width={24} height={24} />
              <span className="font-medium tracking-tight">taskify</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors duration-200"
              >
                <FormattedMessage
                  id="Landing.footer.privacy"
                  defaultMessage="Datenschutz"
                />
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors duration-200"
              >
                <FormattedMessage
                  id="Landing.footer.terms"
                  defaultMessage="Nutzungsbedingungen"
                />
              </Link>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors duration-200"
              >
                <FormattedMessage
                  id="Landing.footer.contact"
                  defaultMessage="Kontakt"
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
