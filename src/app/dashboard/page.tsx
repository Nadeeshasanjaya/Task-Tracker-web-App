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

  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <DashboardLayout>
      <div className="mx-auto mb-8 max-w-6xl">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal)]">
            {currentDate}
          </p>
          <span className="rounded-full bg-[#e2f3ed] px-3 py-1 text-xs font-semibold text-[var(--teal)]">
            Personal workspace
          </span>
        </div>
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
              Make room for what matters.
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Plan clearly. Finish confidently.
            </p>
          </div>
        </div>
      </div>
      <TaskBoard />
    </DashboardLayout>
  );
}
