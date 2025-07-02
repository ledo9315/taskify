import "@/src/app/globals.css";
import type { Metadata } from "next";
import React from "react";
import { ThemeProvider } from "@src/components/provider/ThemeProvider";
import TanstackQueryProvider from "@src/components/provider/TanstackQueryProvider";
import { Toaster } from "@src/components/ui/sonner";
import { Locale } from "@src/components/locale/locale";
import LocaleProvider from "@src/components/provider/LocaleProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
export const metadata: Metadata = {
  title: "Aufgaben-Planer | Produktivität optimieren",
  description:
    "Verwalten Sie Ihre Aufgaben effizient mit unserem intuitiven Aufgaben-Planer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale: Locale = "de";

  return (
    <html suppressHydrationWarning>
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
      </body>
    </html>
  );
}
