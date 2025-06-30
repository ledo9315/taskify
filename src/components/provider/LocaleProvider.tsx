"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { Locale, messages, isValidLocale } from "@src/components/locale/locale";
import { useParams } from "next/navigation";

interface LocaleProviderProps extends PropsWithChildren {
  locale: Locale;
}

const LocaleProvider = ({
  children,
  locale: initialLocale,
}: LocaleProviderProps) => {
  const params = useParams();
  const [currentLocale, setCurrentLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const urlLocale = params.locale as string;
    // Nur gültige Locales setzen
    if (urlLocale && isValidLocale(urlLocale) && urlLocale !== currentLocale) {
      setCurrentLocale(urlLocale);
    }
  }, [params.locale, currentLocale]);

  return (
    <IntlProvider
      locale={currentLocale}
      defaultLocale="de"
      messages={messages[currentLocale]}
      key={currentLocale}
    >
      {children}
    </IntlProvider>
  );
};

export default LocaleProvider;
