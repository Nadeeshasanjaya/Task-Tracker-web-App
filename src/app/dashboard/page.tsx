import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/templates/DashboardLayout";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-sm text-gray-600">Logged in as {user.email}</p>
    </DashboardLayout>
  );
}