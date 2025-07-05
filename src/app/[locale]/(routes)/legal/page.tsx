"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { LanguageToggle } from "@/src/components/common/LanguageToggle";
import { ThemeToggle } from "@/src/components/common/ThemeToggle";
import { FormattedMessage } from "react-intl";
import { useNavigation } from "@/src/hooks/useNavigation";

export default function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const { backToLanding } = useNavigation(params);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-x-3">
              <Link
                href={`/${locale}/landing`}
                className="flex items-center gap-x-2 hover:opacity-80 transition-opacity"
              >
                <Image alt="Logo" src="/logo.svg" width={28} height={28} />
                <h1 className="text-xl font-medium tracking-tight">taskify</h1>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <div className="w-px h-6 bg-border"></div>
              <ThemeToggle className="cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-6 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={backToLanding}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <FormattedMessage
              id="Navigation.backToLanding"
              defaultMessage="Zurück zur Startseite"
            />
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            <FormattedMessage id="Impressum.title" defaultMessage="Impressum" />
          </h1>
          <p className="text-lg text-muted-foreground">
            <FormattedMessage
              id="Impressum.subtitle"
              defaultMessage="Angaben gemäß § 5 TMG"
            />
          </p>
        </div>

        <div className="space-y-8">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                <FormattedMessage
                  id="Impressum.contactInfo"
                  defaultMessage="Angaben gemäß § 5 TMG"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Leonid Domahalskyy
                </h3>
                <div className="text-muted-foreground space-y-1">
                  <p>Rude 13</p>
                  <p>24941 Flensburg</p>
                  <p>Deutschland</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle>
                <FormattedMessage
                  id="Impressum.contact"
                  defaultMessage="Kontakt"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">
                    <FormattedMessage
                      id="Impressum.email"
                      defaultMessage="E-Mail:"
                    />
                  </p>
                  <a
                    href="mailto:leonid.domagalsky@gmail.com"
                    className="text-accent hover:underline"
                  >
                    leonid.domagalsky@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">
                    <FormattedMessage
                      id="Impressum.phone"
                      defaultMessage="Telefon:"
                    />
                  </p>
                  <a
                    href="tel:+4915205892880"
                    className="text-accent hover:underline"
                  >
                    015205892880
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Disclaimer */}
          <Card>
            <CardHeader>
              <CardTitle>
                <FormattedMessage
                  id="Impressum.disclaimer"
                  defaultMessage="Haftungsausschluss"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">
                  <FormattedMessage
                    id="Impressum.contentLiability"
                    defaultMessage="Haftung für Inhalte"
                  />
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <FormattedMessage
                    id="Impressum.contentLiabilityText"
                    defaultMessage="Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen."
                  />
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">
                  <FormattedMessage
                    id="Impressum.linkLiability"
                    defaultMessage="Haftung für Links"
                  />
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <FormattedMessage
                    id="Impressum.linkLiabilityText"
                    defaultMessage="Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich."
                  />
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">
                  <FormattedMessage
                    id="Impressum.copyright"
                    defaultMessage="Urheberrecht"
                  />
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <FormattedMessage
                    id="Impressum.copyrightText"
                    defaultMessage="Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers."
                  />
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col items-center text-center mt-16 pt-8 border-t border-border">
          <p className="text-muted-foreground mb-4">
            <FormattedMessage
              id="Impressum.questionsText"
              defaultMessage="Hast du Fragen oder Anregungen?"
            />
          </p>
          <Button
            variant="outline"
            onClick={backToLanding}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <FormattedMessage
              id="Navigation.backToLanding"
              defaultMessage="Zurück zur Startseite"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
