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
      <section className="container max-w-4xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight">
            <FormattedMessage
              id="Landing.hero.title"
              defaultMessage="Task Management"
            />
            <br />
            <span className="text-accent">
              <FormattedMessage
                id="Landing.hero.titleAccent"
                defaultMessage="einfach gemacht"
              />
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <FormattedMessage
              id="Landing.hero.subtitle"
              defaultMessage="Erstelle, organisiere und verwalte deine Aufgaben mit Tags, Prioritäten und Deadlines."
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href={`/${locale}/register`}>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8 py-3 h-auto cursor-pointer"
              >
                <FormattedMessage
                  id="Landing.hero.registerButton"
                  defaultMessage="Kostenlos starten"
                />
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/${locale}/login`}>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto font-medium px-8 py-3 h-auto cursor-pointer"
              >
                <FormattedMessage
                  id="Landing.hero.loginButton"
                  defaultMessage="Anmelden"
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
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <FormattedMessage
                id="Landing.badge.new"
                defaultMessage="Komplett kostenlos und Open Source"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              <FormattedMessage
                id="Landing.dashboard.title"
                defaultMessage="Dein persönliches Dashboard"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <FormattedMessage
                id="Landing.dashboard.subtitle"
                defaultMessage="Behalte alle deine Aufgaben im Überblick mit unserer intuitiven und übersichtlichen Benutzeroberfläche."
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
                      ✨ Intuitive Bedienung
                    </div>
                    <div className="bg-secondary/90 text-secondary-foreground px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg backdrop-blur-sm">
                      🏷️ Smart Tags
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
                        Schnell hinzufügen
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Neue Tasks in Sekunden
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
                        Nie wieder vergessen
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Deadlines im Blick
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
      <section className="container max-w-4xl mx-auto px-6 py-16 mb-30">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium tracking-tight mb-4">
            <FormattedMessage
              id="Landing.features.title"
              defaultMessage="Was du kannst"
            />
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center border-border/50">
            <CardHeader className="p-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-lg mb-2">
                <FormattedMessage
                  id="Landing.features.create.title"
                  defaultMessage="Tasks erstellen"
                />
              </CardTitle>
              <CardDescription className="text-sm">
                <FormattedMessage
                  id="Landing.features.create.description"
                  defaultMessage="Aufgaben hinzufügen und bearbeiten"
                />
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-border/50">
            <CardHeader className="p-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-lg mb-2">
                <FormattedMessage
                  id="Landing.features.deadline.title"
                  defaultMessage="Deadlines setzen"
                />
              </CardTitle>
              <CardDescription className="text-sm">
                <FormattedMessage
                  id="Landing.features.deadline.description"
                  defaultMessage="Termine und Prioritäten verwalten"
                />
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-border/50">
            <CardHeader className="p-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Tag className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-lg mb-2">
                <FormattedMessage
                  id="Landing.features.organize.title"
                  defaultMessage="Mit Tags organisieren"
                />
              </CardTitle>
              <CardDescription className="text-sm">
                <FormattedMessage
                  id="Landing.features.organize.description"
                  defaultMessage="Aufgaben kategorisieren und filtern"
                />
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-accent">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <h3 className="text-4xl sm:text-5xl font-medium tracking-tight text-white">
              <FormattedMessage
                id="Landing.cta.title"
                defaultMessage="Bereit für mehr Produktivität?"
              />
            </h3>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href={`/${locale}/register`}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto bg-white text-accent hover:bg-gray-50 font-medium text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <FormattedMessage
                    id="Landing.cta.button"
                    defaultMessage="Jetzt kostenlos registrieren"
                  />
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
