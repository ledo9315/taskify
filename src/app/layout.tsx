import "@/src/app/globals.css";
import type { Metadata } from "next";
import React from "react";
import { ThemeProvider } from "@src/components/provider/ThemeProvider";
import TanstackQueryProvider from "@src/components/provider/TanstackQueryProvider";
import { Toaster } from "@src/components/ui/sonner";
import { Locale } from "@src/components/locale/locale";
import LocaleProvider from "@src/components/provider/LocaleProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://taskify.software";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Taskify - Kostenloses Task-Management für maximale Produktivität",
    template: "%s | Taskify",
  },
  description:
    "Verwalten Sie Ihre Aufgaben effizient mit Taskify - dem kostenlosen, modernen Task-Management-Tool. Erstellen, organisieren und verfolgen Sie Ihre Aufgaben mit Tags, Prioritäten und Deadlines.",
  keywords: [
    "Task Management",
    "Aufgaben verwalten",
    "Produktivität",
    "To-Do Liste",
    "Projekt Organisation",
    "kostenlos",
    "Deadline Tracking",
    "Tags",
    "Prioritäten",
    "Taskify",
  ],
  authors: [{ name: "Leonid Domahalskyy" }],
  creator: "Leonid Domahalskyy",
  publisher: "Taskify",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_US"],
    url: baseUrl,
    siteName: "Taskify",
    title: "Taskify - Kostenloses Task-Management für maximale Produktivität",
    description:
      "Verwalten Sie Ihre Aufgaben effizient mit Taskify - dem kostenlosen, modernen Task-Management-Tool. Erstellen, organisieren und verfolgen Sie Ihre Aufgaben mit Tags, Prioritäten und Deadlines.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Taskify - Task Management Dashboard",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@taskify_app",
    creator: "@leonid_dev",
    title: "Taskify - Kostenloses Task-Management",
    description:
      "Verwalten Sie Ihre Aufgaben effizient mit dem kostenlosen Task-Management-Tool Taskify.",
    images: [`${baseUrl}/twitter-image.png`],
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      de: `${baseUrl}/de`,
      en: `${baseUrl}/en`,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: "Technology",
  classification: "Business Software",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    "application-name": "Taskify",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Taskify",
    "theme-color": "#9277e6",
    "msapplication-TileColor": "#9277e6",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale: Locale = "de";

  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon-96.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icon-192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://vercel.com" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <LocaleProvider locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TanstackQueryProvider>{children}</TanstackQueryProvider>
          </ThemeProvider>
        </LocaleProvider>
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
