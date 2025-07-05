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
import { Plus, Calendar, Tag, ArrowRight } from "lucide-react";
import { LanguageToggle } from "@/src/components/common/LanguageToggle";
import { ThemeToggle } from "@/src/components/common/ThemeToggle";
import Footer from "@/src/components/common/Footer";
import { FormattedMessage } from "react-intl";
import { use } from "react";

export default function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-x-3">
              <div className="flex items-center gap-x-2">
                <Image alt="Logo" src="/logo.svg" width={28} height={28} />
                <h1 className="text-xl font-medium tracking-tight">taskify</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <div className="w-px h-6 bg-border"></div>
              <ThemeToggle className="cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative container max-w-4xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-sm font-medium text-accent mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <FormattedMessage
              id="Landing.badge.new"
              defaultMessage="Komplett kostenlos"
            />
          </div>

          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight leading-tight">
            <FormattedMessage
              id="Landing.hero.title"
              defaultMessage="Task-Management"
            />
            <br />
            <span className="text-accent">
              <FormattedMessage
                id="Landing.hero.titleAccent"
                defaultMessage="neu gedacht"
              />
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <FormattedMessage
              id="Landing.hero.subtitle"
              defaultMessage="Erstelle, organisiere und verwalte deine Aufgaben intuitiv. Mit Tags, Prioritäten und Deadlines behältst du immer den Überblick."
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href={`/${locale}/register`}>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8 py-3 h-auto cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <FormattedMessage
                  id="Landing.hero.registerButton"
                  defaultMessage="Jetzt kostenlos starten"
                />
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/${locale}/login`}>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto font-medium px-8 py-3 h-auto cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <FormattedMessage
                  id="Landing.hero.loginButton"
                  defaultMessage="Bereits registriert? Anmelden"
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Screenshot */}
      <section className="relative container max-w-6xl mx-auto px-6 py-24">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-sm font-medium text-accent mb-6">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <FormattedMessage
                id="Landing.dashboard.badge"
                defaultMessage="Frisch gelauncht"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              <FormattedMessage
                id="Landing.dashboard.title"
                defaultMessage="Deine neue Task-Zentrale"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <FormattedMessage
                id="Landing.dashboard.subtitle"
                defaultMessage="Moderne, intuitive Benutzeroberfläche für maximale Produktivität. Alle Features, die du brauchst - ohne Ballast."
              />
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="relative group">
            {/* Main Container */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-secondary/20 rounded-2xl blur-xl scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Browser Frame */}
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden transition-all duration-500 group-hover:shadow-accent/20 group-hover:shadow-2xl">
                {/* Browser Header */}
                <div className="flex items-center gap-2 px-6 py-4 bg-muted/30 border-b border-border/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full opacity-80"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-80"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full opacity-80"></div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-background/50 px-4 py-1.5 rounded-lg text-xs text-muted-foreground border border-border/30 font-mono">
                      taskify.app/dashboard
                    </div>
                  </div>
                </div>

                {/* Screenshot Container */}
                <div className="relative bg-gradient-to-br from-background via-background to-muted/30 p-8">
                  <div className="relative aspect-[16/10] bg-background/50 rounded-xl overflow-hidden border border-border/30 shadow-inner">
                    <Image
                      src="/dashboard.png"
                      alt="Taskify Dashboard Interface - Task Management Application"
                      width={1200}
                      height={750}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
                      priority
                      quality={95}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent pointer-events-none"></div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <div className="bg-accent/90 text-accent-foreground px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg backdrop-blur-sm">
                      ⚡ Blitzschnell
                    </div>
                    <div className="bg-secondary/90 text-secondary-foreground px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg backdrop-blur-sm">
                      � Fokussiert
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 transform -translate-x-4 group-hover:translate-x-0">
                <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-xl max-w-48">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Plus className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        Tasks in Sekunden
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Hinzufügen und bearbeiten
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-1/4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-500 transform translate-x-4 group-hover:translate-x-0">
                <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-xl max-w-48">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        Deadlines im Griff
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Termine und Prioritäten
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            <FormattedMessage
              id="Landing.features.title"
              defaultMessage="Alles was du brauchst"
            />
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <FormattedMessage
              id="Landing.features.subtitle"
              defaultMessage="Entwickelt für moderne Arbeitsweisen. Einfach, schnell und effektiv."
            />
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="relative group text-center border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
            <CardHeader className="p-8">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Plus className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-xl mb-3">
                <FormattedMessage
                  id="Landing.features.create.title"
                  defaultMessage="Intuitiv erstellen"
                />
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                <FormattedMessage
                  id="Landing.features.create.description"
                  defaultMessage="Tasks mit nur wenigen Klicks hinzufügen. Titel, Beschreibung und Tags - fertig."
                />
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative group text-center border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
            <CardHeader className="p-8">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-xl mb-3">
                <FormattedMessage
                  id="Landing.features.deadline.title"
                  defaultMessage="Deadlines setzen"
                />
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                <FormattedMessage
                  id="Landing.features.deadline.description"
                  defaultMessage="Fälligkeiten und Prioritäten verwalten. Behalte wichtige Termine im Blick."
                />
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative group text-center border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
            <CardHeader className="p-8">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Tag className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-xl mb-3">
                <FormattedMessage
                  id="Landing.features.organize.title"
                  defaultMessage="Smart organisieren"
                />
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                <FormattedMessage
                  id="Landing.features.organize.description"
                  defaultMessage="Tags und Filter nutzen. Finde deine Tasks blitzschnell wieder."
                />
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            <FormattedMessage
              id="Landing.stats.title"
              defaultMessage="Warum Taskify?"
            />
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <FormattedMessage
              id="Landing.stats.subtitle"
              defaultMessage="Fakten sprechen für sich. Eine App, die wirklich funktioniert."
            />
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">100%</div>
            <div className="text-lg font-medium mb-2">Kostenlos</div>
            <div className="text-sm text-muted-foreground">
              Keine versteckten Kosten, keine Premium-Features
            </div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">&lt;1s</div>
            <div className="text-lg font-medium mb-2">Ladezeit</div>
            <div className="text-sm text-muted-foreground">
              Optimiert für Geschwindigkeit und Performance
            </div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">Open</div>
            <div className="text-lg font-medium mb-2">Source</div>
            <div className="text-sm text-muted-foreground">
              Transparent, sicher und community-driven
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-accent via-accent to-accent/80 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-white/5 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>

        <div className="relative container max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              <FormattedMessage
                id="Landing.cta.title"
                defaultMessage="Bereit zu starten?"
              />
            </h3>

            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              <FormattedMessage
                id="Landing.cta.subtitle"
                defaultMessage="Registriere dich kostenlos und beginne sofort mit dem Organisieren deiner Aufgaben."
              />
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href={`/${locale}/register`}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto bg-white text-accent hover:bg-gray-50 font-medium text-lg px-10 py-4 h-auto transition-all duration-300 hover:scale-105 cursor-pointer shadow-xl"
                >
                  <FormattedMessage
                    id="Landing.cta.button"
                    defaultMessage="Kostenlos registrieren"
                  />
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="text-white/80 text-sm">
              <FormattedMessage
                id="Landing.cta.features"
                defaultMessage="⚡ Sofort nutzbar • 📱 Responsive Design • 🔒 Deine Daten bleiben bei dir"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
