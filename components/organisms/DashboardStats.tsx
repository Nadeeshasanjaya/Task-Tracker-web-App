"use client";

import type { Task } from "@/components/molecules/TaskCard";

const statusConfig = [
  { key: "TODO", label: "To Do", color: "text-slate-600" },
  { key: "IN_PROGRESS", label: "In Progress", color: "text-[var(--teal)]" },
  { key: "DONE", label: "Done", color: "text-emerald-600" },
] as const;

export function DashboardStats({ tasks }: { tasks: Task[] }) {
  const now = new Date();

  const counts = statusConfig.map((s) => ({
    ...s,
    count: tasks.filter((t) => t.status === s.key).length,
  }));

  const overdue = tasks.filter(
    (t) => t.dueDate && t.status !== "DONE" && new Date(t.dueDate) < now
  ).length;

  return (
    <section
      aria-label="Task summary"
      className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4"
    >
      {counts.map((s) => (
        <div
          key={s.key}
          className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[#fbfcfa] p-5 shadow-[0_8px_24px_rgba(23,35,31,0.04)]"
        >
          <span
            className={`absolute inset-x-0 top-0 h-1 ${s.key === "TODO" ? "bg-slate-300" : s.key === "IN_PROGRESS" ? "bg-[var(--teal)]" : "bg-emerald-400"}`}
          />
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${s.color}`}
          >
            {s.label}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] transition-transform group-hover:translate-x-1">
            {s.count}
          </p>
        </div>
      ))}

      <div
        className={`relative overflow-hidden rounded-2xl border p-5 shadow-[0_8px_24px_rgba(23,35,31,0.04)] ${
          overdue > 0
            ? "border-orange-200 bg-orange-50"
            : "border-[var(--line)] bg-[#fbfcfa]"
        }`}
      >
        <span className="absolute inset-x-0 top-0 h-1 bg-orange-300" />
        <p
          className={`text-xs font-medium ${
            overdue > 0 ? "text-orange-700" : "text-orange-600"
          }`}
        >
          Overdue
        </p>
        <p
          className={`mt-2 text-3xl font-bold tracking-tight ${
            overdue > 0 ? "text-orange-700" : "text-[var(--ink)]"
          }`}
        >
          {overdue}
        </p>
      </div>
    </section>
  );
}
