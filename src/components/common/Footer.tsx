"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FormattedMessage } from "react-intl";

const Footer = () => {
  const params = useParams();
  const locale = (params?.locale as string) || "de";

  return (
    <footer className="pb-6">
      <div className="border-t border-border/40 pt-6">
        <div className="flex flex-col items-center gap-4">
          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href={`/${locale}/legal`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FormattedMessage id="Footer.legal" defaultMessage="Impressum" />
            </Link>
            <div className="w-px h-4 bg-border"></div>
            <Link
              href={`/${locale}/privacy`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FormattedMessage
                id="Footer.privacy"
                defaultMessage="Datenschutz"
              />
            </Link>
            <div className="w-px h-4 bg-border"></div>
            <Link
              href="mailto:leonid.domagalsky@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FormattedMessage id="Footer.contact" defaultMessage="Kontakt" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
