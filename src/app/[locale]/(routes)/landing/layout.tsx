import { Metadata } from "next";

// Structured Data für SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Taskify",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web Browser",
  description:
    "Kostenloses Task-Management-Tool für maximale Produktivität. Erstellen, organisieren und verfolgen Sie Ihre Aufgaben mit Tags, Prioritäten und Deadlines.",
  url: "https://taskify.software",
  downloadUrl: "https://taskify.software/register",
  softwareVersion: "1.0",
  datePublished: "2025-07-01",
  dateModified: new Date().toISOString().split("T")[0],
  author: {
    "@type": "Person",
    name: "Leonid Domahalskyy",
  },
  publisher: {
    "@type": "Organization",
    name: "Taskify",
    url: "https://taskify.software",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Task-Erstellung und -Verwaltung",
    "Tag-System für Organisation",
    "Prioritäten-Management",
    "Deadline-Tracking",
    "Kostenlose Nutzung",
    "Open Source",
    "Mehrsprachige Unterstützung",
    "Dark Mode",
    "Regelmäßige Updates",
  ],
  screenshot: "https://taskify.software/dashboard.png",
};

interface GenerateMetadataProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://taskify.software";

  const isGerman = locale === "de";

  const title = isGerman
    ? "Taskify - Kostenloses Task-Management für maximale Produktivität"
    : "Taskify - Free Task Management for Maximum Productivity";

  const description = isGerman
    ? "Verwalten Sie Ihre Aufgaben effizient mit Taskify - dem kostenlosen, modernen Task-Management-Tool. Erstellen, organisieren und verfolgen Sie Ihre Aufgaben mit Tags, Prioritäten und Deadlines. Open Source, 100% kostenlos, keine versteckten Kosten."
    : "Manage your tasks efficiently with Taskify - the free, modern task management tool. Create, organize and track your tasks with tags, priorities and deadlines. Open Source, 100% free, no hidden costs.";

  const keywords = isGerman
    ? [
        "Task Management kostenlos",
        "Open Source",
        "Aufgaben verwalten",
        "To-Do Liste",
        "Produktivitäts-App",
        "Projekt Organisation",
        "Deadline Tracking",
        "Tags System",
        "Prioritäten Management",
        "kostenlose Aufgabenverwaltung",
        "moderne Task App",
        "Taskify Deutschland",
      ]
    : [
        "free task management",
        "open source",
        "task organizer",
        "to-do list app",
        "productivity tool",
        "project management",
        "deadline tracker",
        "tag system",
        "priority management",
        "free task app",
        "modern task management",
        "Taskify app",
      ];

  // Strukturierte Daten je nach Sprache anpassen
  const localizedStructuredData = {
    ...structuredData,
    description: description,
    inLanguage: locale,
  };

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/landing`,
      siteName: "Taskify",
      images: [
        {
          url: `${baseUrl}/preview.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: isGerman ? "de_DE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/preview.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/landing`,
      languages: {
        de: `${baseUrl}/de/landing`,
        en: `${baseUrl}/en/landing`,
      },
    },
    other: {
      "application/ld+json": JSON.stringify(localizedStructuredData),
      "article:author": "Leonid Domahalskyy",
      "article:section": "Technology",
      "article:tag": keywords.join(", "),
    },
  };
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
