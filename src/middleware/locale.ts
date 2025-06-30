import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const supportedLocales = ["de", "en"];
const defaultLocale = "de";

function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });
  const negotiator = new Negotiator({ headers: negotiatorHeaders });
  const acceptedLanguages = negotiator.languages();
  return match(acceptedLanguages, supportedLocales, defaultLocale);
}

export function localeMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignoriere Assets und API-Routen
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/logo")
  ) {
    return null;
  }

  // Prüfe ob bereits eine Locale vorhanden ist
  const hasLocale = supportedLocales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocale) {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  return null;
}
