import { auth } from "@/src/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);

// Alle Auth-Requests werden an Better-Auth weitergeleitet:
// POST /api/auth/sign-in/email
// POST /api/auth/sign-out
// GET /api/auth/session
// etc.
