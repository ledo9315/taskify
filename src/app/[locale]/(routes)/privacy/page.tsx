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
import { ArrowLeft, Eye, FileText, Settings } from "lucide-react";
import { LanguageToggle } from "@/src/components/common/LanguageToggle";
import { ThemeToggle } from "@/src/components/common/ThemeToggle";
import { FormattedMessage } from "react-intl";
import { useNavigation } from "@/src/hooks/useNavigation";

export default function DatenschutzPage({
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
            <FormattedMessage id="Privacy.title" defaultMessage="Datenschutz" />
          </h1>
          <p className="text-lg text-muted-foreground">
            <FormattedMessage
              id="Privacy.subtitle"
              defaultMessage="Informationen zum Datenschutz auf einen Blick"
            />
          </p>
        </div>

        <div className="space-y-8">
          {/* Datenschutz auf einen Blick */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-accent" />
                <FormattedMessage
                  id="Privacy.overview.title"
                  defaultMessage="1. Datenschutz auf einen Blick"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">
                  <FormattedMessage
                    id="Privacy.overview.general.title"
                    defaultMessage="Allgemeine Hinweise"
                  />
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <FormattedMessage
                    id="Privacy.overview.general.text"
                    defaultMessage="Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung."
                  />
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">
                  <FormattedMessage
                    id="Privacy.overview.dataCollection.title"
                    defaultMessage="Datenerfassung auf dieser Website"
                  />
                </h4>
                <h5 className="font-medium text-sm mb-2">
                  <FormattedMessage
                    id="Privacy.overview.responsible.title"
                    defaultMessage="Wer ist verantwortlich für die Datenerfassung auf dieser Website?"
                  />
                </h5>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <FormattedMessage
                    id="Privacy.overview.responsible.text"
                    defaultMessage="Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt Hinweis zur Verantwortlichen Stelle in dieser Datenschutzerklärung entnehmen."
                  />
                </p>

                <h5 className="font-medium text-sm mb-2">
                  <FormattedMessage
                    id="Privacy.overview.howWeCollect.title"
                    defaultMessage="Wie erfassen wir Ihre Daten?"
                  />
                </h5>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <FormattedMessage
                    id="Privacy.overview.howWeCollect.text"
                    defaultMessage="Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten."
                  />
                </p>

                <h5 className="font-medium text-sm mb-2">
                  <FormattedMessage
                    id="Privacy.overview.usage.title"
                    defaultMessage="Wofür nutzen wir Ihre Daten?"
                  />
                </h5>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <FormattedMessage
                    id="Privacy.overview.usage.text"
                    defaultMessage="Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden."
                  />
                </p>

                <h5 className="font-medium text-sm mb-2">
                  <FormattedMessage
                    id="Privacy.overview.rights.title"
                    defaultMessage="Welche Rechte haben Sie bezüglich Ihrer Daten?"
                  />
                </h5>
                <p className="text-muted-foreground leading-relaxed">
                  <FormattedMessage
                    id="Privacy.overview.rights.text"
                    defaultMessage="Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden."
                  />
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hosting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-accent" />
                <FormattedMessage
                  id="Privacy.hosting.title"
                  defaultMessage="2. Hosting"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <FormattedMessage
                  id="Privacy.hosting.intro"
                  defaultMessage="Wir hosten die Inhalte unserer Website bei folgendem Anbieter:"
                />
              </p>

              <div>
                <h3 className="font-semibold mb-3">IONOS</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <FormattedMessage
                    id="Privacy.hosting.ionos.description"
                    defaultMessage="Anbieter ist die IONOS SE, Elgendorfer Str. 57, 56410 Montabaur (nachfolgend IONOS). Wenn Sie unsere Website besuchen, erfasst IONOS verschiedene Logfiles inklusive Ihrer IP-Adressen."
                  />
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <FormattedMessage
                    id="Privacy.hosting.ionos.moreInfo"
                    defaultMessage="Weitere Informationen entnehmen Sie der Datenschutzerklärung von IONOS:"
                  />{" "}
                  <a
                    href="https://www.ionos.de/terms-gtc/datenschutzerklaerung/"
                    className="text-accent hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.ionos.de/terms-gtc/datenschutzerklaerung/
                  </a>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <FormattedMessage
                    id="Privacy.hosting.ionos.legal"
                    defaultMessage="Die Verwendung von IONOS erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst verlässlichen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG."
                  />
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Allgemeine Hinweise und Pflichtinformationen */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                <FormattedMessage
                  id="Privacy.general.title"
                  defaultMessage="3. Allgemeine Hinweise und Pflichtinformationen"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">
                  <FormattedMessage
                    id="Privacy.general.dataProtection.title"
                    defaultMessage="Datenschutz"
                  />
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <FormattedMessage
                    id="Privacy.general.dataProtection.text1"
                    defaultMessage="Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung."
                  />
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <FormattedMessage
                    id="Privacy.general.dataProtection.text2"
                    defaultMessage="Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht."
                  />
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <FormattedMessage
                    id="Privacy.general.dataProtection.text3"
                    defaultMessage="Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich."
                  />
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">
                  <FormattedMessage
                    id="Privacy.general.responsible.title"
                    defaultMessage="Hinweis zur verantwortlichen Stelle"
                  />
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <FormattedMessage
                    id="Privacy.general.responsible.intro"
                    defaultMessage="Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:"
                  />
                </p>
                <div className="bg-muted/30 p-4 rounded-lg space-y-1">
                  <p className="font-medium">Leonid Domahalskyy</p>
                  <p>Rude 13</p>
                  <p>24941 Flensburg</p>
                  <p>Telefon: 015205892880</p>
                  <p>E-Mail: leonid.domagalsky@gmail.com</p>
                </div>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  <FormattedMessage
                    id="Privacy.general.responsible.definition"
                    defaultMessage="Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet."
                  />
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">
                  <FormattedMessage
                    id="Privacy.general.retention.title"
                    defaultMessage="Speicherdauer"
                  />
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <FormattedMessage
                    id="Privacy.general.retention.text"
                    defaultMessage="Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben."
                  />
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">
                  <FormattedMessage
                    id="Privacy.general.revocation.title"
                    defaultMessage="Widerruf Ihrer Einwilligung zur Datenverarbeitung"
                  />
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <FormattedMessage
                    id="Privacy.general.revocation.text"
                    defaultMessage="Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt."
                  />
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">
                  <FormattedMessage
                    id="Privacy.general.complaint.title"
                    defaultMessage="Beschwerderecht bei der zuständigen Aufsichtsbehörde"
                  />
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <FormattedMessage
                    id="Privacy.general.complaint.text"
                    defaultMessage="Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe."
                  />
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">
                  <FormattedMessage
                    id="Privacy.general.rights.title"
                    defaultMessage="Auskunft, Berichtigung und Löschung"
                  />
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <FormattedMessage
                    id="Privacy.general.rights.text"
                    defaultMessage="Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden."
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
              id="Privacy.questionsText"
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
