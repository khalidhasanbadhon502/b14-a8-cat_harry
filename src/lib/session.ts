import "server-only";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import type { StudioOwner } from "@/lib/studios-db";

export async function getSessionOwner(): Promise<StudioOwner | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return null;

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email ?? undefined,
  };
}
