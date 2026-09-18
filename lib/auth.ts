import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    throw new Response("Unauthorized", { status: 401 });
  }

  // Upsert into our own DB — Supabase Auth is the source of identity,
  // Prisma/Neon is the source of data.
  const dbUser = await prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: { email: user.email },
  });

  return dbUser;
}

export function handleApiError(error: unknown) {
  if (error instanceof Response) return error;
  console.error(error);
  return Response.json({ error: "Internal server error" }, { status: 500 });
}