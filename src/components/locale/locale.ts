const messages = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  de: require("@src/lang/de.json"),
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  en: require("@src/lang/en.json"),
};

export type Locale = keyof typeof messages;

export const SUPPORTED_LOCALES: Locale[] = ["de", "en"];

export const DEFAULT_LOCALE: Locale = "de";

export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

export { messages };
