import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { localeMiddleware } from "./middleware/locale";

export async function middleware(request: NextRequest) {
  const localeResponse = localeMiddleware(request);
  if (localeResponse) {
    return localeResponse;
  }

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    // Extrahiere die aktuelle Locale aus der URL
    const { pathname } = request.nextUrl;
    const currentLocale = pathname.split("/")[1];
    const supportedLocales = ["de", "en"];
    const locale = supportedLocales.includes(currentLocale)
      ? currentLocale
      : "de";

    return NextResponse.redirect(new URL(`/${locale}/landing`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/en",
    "/de",
    "/de/add",
    "/en/add",
    "/de/edit/:id",
    "/en/edit/:id",
    "/de/account",
    "/en/account",
  ],
};
