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
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 200,
    },
  },
};

const heroVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 300,
      duration: 0.6,
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 200,
    },
  },
  hover: {
    y: -8,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 400,
    },
  },
};

export default function LandingPage() {
  const params = useParams();
  const locale = params.locale as string;

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const dashboardRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const dashboardInView = useInView(dashboardRef, { once: true, amount: 0.1 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    // Preload critical animations
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm"
        role="navigation"
        aria-label="Hauptnavigation"
      >
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-between h-16"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-x-3"
            >
              <div className="flex items-center gap-x-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    alt="Taskify Logo - Task Management App"
                    src="/logo.svg"
                    width={28}
                    height={28}
                    priority
                  />
                </motion.div>
                <h1 className="text-xl font-medium tracking-tight">taskify</h1>
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <LanguageToggle />
              <div className="w-px h-6 bg-border" role="separator"></div>
              <ThemeToggle className="cursor-pointer" />
            </motion.div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative container max-w-4xl mx-auto px-6 py-20"
        role="main"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.header
          className="text-center space-y-8"
          variants={heroVariants}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-sm font-medium text-accent mb-6"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-2 h-2 bg-accent rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <FormattedMessage
              id="Landing.badge.new"
              defaultMessage="Komplett kostenlos"
            />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl font-medium tracking-tight leading-tight"
            variants={itemVariants}
          >
            <FormattedMessage
              id="Landing.hero.title"
              defaultMessage="Task-Management"
            />
            <br />
            <motion.span
              className="text-accent"
              initial={{ opacity: 0, x: -50 }}
              animate={
                heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ delay: 0.5, type: "spring", damping: 15 }}
            >
              <FormattedMessage
                id="Landing.hero.titleAccent"
                defaultMessage="neu gedacht"
              />
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            <FormattedMessage
              id="Landing.hero.subtitle"
              defaultMessage="Erstelle, organisiere und verwalte deine Aufgaben intuitiv. Mit Tags, Prioritäten und Deadlines behältst du immer den Überblick."
            />
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Link href={`/${locale}/register`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8 py-3 h-auto cursor-pointer"
                    aria-label="Jetzt kostenlos bei Taskify registrieren"
                  >
                    <FormattedMessage
                      id="Landing.hero.registerButton"
                      defaultMessage="Jetzt kostenlos starten"
                    />
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link href={`/${locale}/login`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto font-medium px-8 py-3 h-auto cursor-pointer"
                    aria-label="Bei Taskify anmelden"
                  >
                    <FormattedMessage
                      id="Landing.hero.loginButton"
                      defaultMessage="Bereits registriert? Anmelden"
                    />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.header>
      </motion.section>

      {/* Dashboard Screenshot */}
      <motion.section
        ref={dashboardRef}
        className="relative container max-w-6xl mx-auto px-6 py-24"
        initial="hidden"
        animate={dashboardInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Background Elements */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          style={{ y: backgroundY }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-sm font-medium text-accent mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-2 h-2 bg-accent rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <FormattedMessage
                id="Landing.dashboard.badge"
                defaultMessage="Frisch gelauncht"
              />
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
              variants={itemVariants}
            >
              <FormattedMessage
                id="Landing.dashboard.title"
                defaultMessage="Deine neue Task-Zentrale"
              />
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              <FormattedMessage
                id="Landing.dashboard.subtitle"
                defaultMessage="Moderne, intuitive Benutzeroberfläche für maximale Produktivität. Alle Features, die du brauchst - ohne Ballast."
              />
            </motion.p>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div className="relative group" variants={itemVariants}>
            {/* Main Container */}
            <div className="relative">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-secondary/20 rounded-2xl blur-xl scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              {/* Browser Frame */}
              <motion.div
                className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden"
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
              >
                {/* Browser Header */}
                <div className="flex items-center gap-2 px-6 py-4 bg-muted/30 border-b border-border/50">
                  <div className="flex gap-2">
                    <motion.div
                      className="w-3 h-3 bg-red-500 rounded-full opacity-80"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div
                      className="w-3 h-3 bg-yellow-500 rounded-full opacity-80"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full opacity-80"
                      whileHover={{ scale: 1.2 }}
                    />
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
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", damping: 15 }}
                    >
                      <Image
                        src="/dashboard.png"
                        alt="Taskify Dashboard Interface - Modernes Task-Management mit Tags, Prioritäten und Deadlines. Zeigt übersichtliche Aufgabenliste, Filteroptionen und intuitive Benutzeroberfläche"
                        width={1200}
                        height={750}
                        className="w-full h-full object-cover object-top"
                        priority
                        quality={95}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        loading="eager"
                      />
                    </motion.div>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent pointer-events-none"></div>
                  </div>

                  {/* Feature Highlights */}
                  <motion.div
                    className="absolute top-4 right-4 flex flex-col gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, staggerChildren: 0.1 }}
                  >
                    <motion.div
                      className="bg-accent/90 text-accent-foreground px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <FormattedMessage
                        id="Landing.dashboard.highlight.fast"
                        defaultMessage="⚡ Blitzschnell"
                      />
                    </motion.div>
                    <motion.div
                      className="bg-secondary/90 text-secondary-foreground px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <FormattedMessage
                        id="Landing.dashboard.highlight.focused"
                        defaultMessage="🎯 Fokussiert"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -left-8 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                animate={{
                  y: [-5, 5, -5],
                }}
                style={{
                  animationDuration: "3s",
                  animationIterationCount: "infinite",
                  animationTimingFunction: "ease-in-out",
                }}
              >
                <motion.div
                  className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-xl max-w-48"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Plus className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        <FormattedMessage
                          id="Landing.dashboard.floatingCard.tasks.title"
                          defaultMessage="Tasks in Sekunden"
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <FormattedMessage
                          id="Landing.dashboard.floatingCard.tasks.subtitle"
                          defaultMessage="Hinzufügen und bearbeiten"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute -right-8 bottom-1/4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                animate={{
                  y: [5, -5, 5],
                }}
                style={{
                  animationDuration: "3.5s",
                  animationIterationCount: "infinite",
                  animationTimingFunction: "ease-in-out",
                }}
              >
                <motion.div
                  className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-xl max-w-48"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        <FormattedMessage
                          id="Landing.dashboard.floatingCard.deadlines.title"
                          defaultMessage="Deadlines im Griff"
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <FormattedMessage
                          id="Landing.dashboard.floatingCard.deadlines.subtitle"
                          defaultMessage="Termine und Prioritäten"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        ref={featuresRef}
        className="container max-w-6xl mx-auto px-6 py-20"
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            variants={itemVariants}
          >
            <FormattedMessage
              id="Landing.features.title"
              defaultMessage="Alles was du brauchst"
            />
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            <FormattedMessage
              id="Landing.features.subtitle"
              defaultMessage="Entwickelt für moderne Arbeitsweisen. Einfach, schnell und effektiv."
            />
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          <motion.div variants={cardVariants}>
            <motion.div whileHover="hover" variants={cardVariants}>
              <Card className="relative group text-center border-accent/50 h-full">
                <CardHeader className="p-8">
                  <motion.div
                    className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-6"
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{
                      rotate: { duration: 0.5 },
                      scale: { type: "spring", damping: 15 },
                    }}
                  >
                    <Plus className="h-8 w-8 text-accent" />
                  </motion.div>
                  <CardTitle className="text-xl mb-3">
                    <FormattedMessage
                      id="Landing.features.create.title"
                      defaultMessage="Intuitiv erstellen"
                    />
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    <FormattedMessage
                      id="Landing.features.create.description"
                      defaultMessage="Tasks mit nur wenigen Klicks hinzufügen."
                    />
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={cardVariants}>
            <motion.div whileHover="hover" variants={cardVariants}>
              <Card className="relative group text-center border-accent/50 h-full">
                <CardHeader className="p-8">
                  <motion.div
                    className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-6"
                    whileHover={{
                      scale: 1.1,
                      rotateY: 180,
                    }}
                    transition={{ type: "spring", damping: 15 }}
                  >
                    <Calendar className="h-8 w-8 text-accent" />
                  </motion.div>
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
            </motion.div>
          </motion.div>

          <motion.div variants={cardVariants}>
            <motion.div whileHover="hover" variants={cardVariants}>
              <Card className="relative group text-center border-accent/50 h-full">
                <CardHeader className="p-8">
                  <motion.div
                    className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-6"
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, 360],
                    }}
                    transition={{
                      rotate: { duration: 0.8 },
                      scale: { type: "spring", damping: 15 },
                    }}
                  >
                    <Tag className="h-8 w-8 text-accent" />
                  </motion.div>
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
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        ref={statsRef}
        className="container max-w-4xl mx-auto px-6 py-20"
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            variants={itemVariants}
          >
            <FormattedMessage
              id="Landing.stats.title"
              defaultMessage="Warum Taskify?"
            />
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            <FormattedMessage
              id="Landing.stats.subtitle"
              defaultMessage="Fakten sprechen für sich. Eine App, die wirklich funktioniert."
            />
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          <motion.div
            className="text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.div
              className="text-4xl font-bold text-accent mb-2"
              initial={{ scale: 0 }}
              animate={statsInView ? { scale: 1 } : { scale: 0 }}
              transition={{
                type: "spring",
                damping: 15,
                delay: 0.2,
                duration: 0.6,
              }}
            >
              100%
            </motion.div>
            <div className="text-lg font-medium mb-2">
              <FormattedMessage
                id="Landing.stats.free.title"
                defaultMessage="Kostenlos"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <FormattedMessage
                id="Landing.stats.free.description"
                defaultMessage="Keine versteckten Kosten, keine Premium-Features"
              />
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.div
              className="text-4xl font-bold text-accent mb-2"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={
                statsInView
                  ? { rotateY: 0, opacity: 1 }
                  : { rotateY: 180, opacity: 0 }
              }
              transition={{
                type: "spring",
                damping: 15,
                delay: 0.4,
                duration: 0.8,
              }}
            >
              Modern
            </motion.div>
            <div className="text-lg font-medium mb-2">
              <FormattedMessage
                id="Landing.stats.modern.title"
                defaultMessage="Technologie"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <FormattedMessage
                id="Landing.stats.modern.description"
                defaultMessage="Gebaut mit Next.js, React und TypeScript"
              />
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.div
              className="text-4xl font-bold text-accent mb-2"
              initial={{ x: 100, opacity: 0 }}
              animate={
                statsInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }
              }
              transition={{
                type: "spring",
                damping: 15,
                delay: 0.6,
                duration: 0.8,
              }}
            >
              Open
            </motion.div>
            <div className="text-lg font-medium mb-2">
              <FormattedMessage
                id="Landing.stats.openSource.title"
                defaultMessage="Source"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <FormattedMessage
                id="Landing.stats.openSource.description"
                defaultMessage="Transparent, sicher und community-driven"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        className="relative py-24 bg-gradient-to-br from-accent via-accent to-accent/80 overflow-hidden"
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-30"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={
            ctaInView ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 1.2 }
          }
          transition={{ duration: 1.5 }}
        >
          <div className="h-full w-full bg-white/5 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </motion.div>

        <div className="relative container max-w-4xl mx-auto px-6 text-center">
          <motion.div className="space-y-8" variants={containerVariants}>
            <motion.h3
              className="text-4xl sm:text-5xl font-bold tracking-tight text-white"
              variants={itemVariants}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={
                ctaInView
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.5, opacity: 0 }
              }
              transition={{ type: "spring", damping: 15, delay: 0.2 }}
            >
              <FormattedMessage
                id="Landing.cta.title"
                defaultMessage="Bereit zu starten?"
              />
            </motion.h3>

            <motion.p
              className="text-xl text-white/90 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              <FormattedMessage
                id="Landing.cta.subtitle"
                defaultMessage="Registriere dich kostenlos und beginne sofort mit dem Organisieren deiner Aufgaben."
              />
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
              variants={itemVariants}
            >
              <Link href={`/${locale}/register`}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto bg-white text-accent hover:bg-gray-50 font-medium text-lg px-10 py-4 h-auto cursor-pointer shadow-xl"
                  >
                    <FormattedMessage
                      id="Landing.cta.button"
                      defaultMessage="Kostenlos registrieren"
                    />
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              className="text-white/80 text-sm"
              variants={itemVariants}
              initial={{ y: 20, opacity: 0 }}
              animate={ctaInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.8 }}
            >
              <FormattedMessage
                id="Landing.cta.features"
                defaultMessage="⚡ Sofort nutzbar • 📱 Responsive Design • 🔒 Deine Daten bleiben bei dir"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
