import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export function googleAuthErrorMessage(message?: string | null): string {
  if (
    !message ||
    /CLIENT_ID_AND_SECRET|Provider not found|Internal Server Error|not properly configured/i.test(
      message
    )
  ) {
    return "Google sign-in is not configured yet. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env.local.";
  }
  return message;
}
