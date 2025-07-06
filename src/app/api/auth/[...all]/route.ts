import { auth } from "@/src/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handlers = toNextJsHandler(auth);

// Erlaubte Origins
const allowedOrigins = [
  "https://taskify.software",
  "https://taskify.leonid-domahalskyy.com",
  "http://localhost:3000",
];

// Dynamische CORS Headers basierend auf Origin
const getCorsHeaders = (origin: string | null) => {
  const isAllowedOrigin = origin && allowedOrigins.includes(origin);

  return {
    "Access-Control-Allow-Origin": isAllowedOrigin ? origin : allowedOrigins[0],
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
};

export async function GET(request: NextRequest) {
  const response = await handlers.GET(request);
  const origin = request.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // CORS Headers zu Response hinzufügen
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export async function POST(request: NextRequest) {
  const response = await handlers.POST(request);
  const origin = request.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // CORS Headers zu Response hinzufügen
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

// Alle Auth-Requests werden an Better-Auth weitergeleitet:
// POST /api/auth/sign-in/email
// POST /api/auth/sign-out
// GET /api/auth/session
// etc.
