import { auth } from "@/src/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handlers = toNextJsHandler(auth);

// CORS Headers hinzufügen
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

export async function GET(request: NextRequest) {
  const response = await handlers.GET(request);

  // CORS Headers zu Response hinzufügen
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export async function POST(request: NextRequest) {
  const response = await handlers.POST(request);

  // CORS Headers zu Response hinzufügen
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export async function OPTIONS() {
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
