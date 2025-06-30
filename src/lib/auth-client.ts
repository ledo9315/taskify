import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

// authClient.signIn.email() macht intern:
// POST http://localhost:3000/api/auth/sign-in/email
// Body: { email, password, callbackURL }
