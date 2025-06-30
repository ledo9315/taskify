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
    return NextResponse.redirect(new URL("/de/landing", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/en", "/de"], // nur diese Routen werden geschützt
};
