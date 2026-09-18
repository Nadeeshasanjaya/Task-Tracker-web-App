"use client";

import type { Task } from "@/components/molecules/TaskCard";

const statusConfig = [
  { key: "TODO", label: "To Do", color: "bg-gray-100 text-gray-800" },
  { key: "IN_PROGRESS", label: "In Progress", color: "bg-blue-100 text-blue-800" },
  { key: "DONE", label: "Done", color: "bg-green-100 text-green-800" },
] as const;

export function DashboardStats({ tasks }: { tasks: Task[] }) {
  const now = new Date();

  const counts = statusConfig.map((s) => ({
    ...s,
    count: tasks.filter((t) => t.status === s.key).length,
  }));

  const overdue = tasks.filter(
    (t) =>
      t.dueDate && t.status !== "DONE" && new Date(t.dueDate) < now,
  ).length;

  return (
    <section
      aria-label="Task summary"
      className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4"
    >
      {counts.map((s) => (
        <div
          key={s.key}
          className="rounded-lg border bg-white p-4 shadow-sm"
        >
          <p className="text-xs font-medium text-gray-500">{s.label}</p>
          <p className="mt-1 text-2xl font-bold">{s.count}</p>
        </div>
      ))}

      <div
        className={`rounded-lg border p-4 shadow-sm ${
          overdue > 0 ? "border-red-300 bg-red-50" : "bg-white"
        }`}
      >
        <p
          className={`text-xs font-medium ${
            overdue > 0 ? "text-red-600" : "text-gray-500"
          }`}
        >
          Overdue
        </p>
        <p
          className={`mt-1 text-2xl font-bold ${
            overdue > 0 ? "text-red-600" : ""
          }`}
        >
          {overdue}
        </p>
      </div>
    </section>
  );
}