import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { TaskBoard } from "@/components/organisms/TaskBoard";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <DashboardLayout>
      <h1 className="mb-4 text-2xl font-bold">Your tasks</h1>
      <TaskBoard />
    </DashboardLayout>
  );
}