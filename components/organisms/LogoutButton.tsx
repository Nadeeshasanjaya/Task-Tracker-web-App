"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/atoms/Button";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Log out
    </Button>
  );
}