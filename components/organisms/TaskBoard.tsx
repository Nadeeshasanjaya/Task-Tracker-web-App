"use client";

import { useEffect, useState } from "react";
import { TaskForm } from "@/components/organisms/TaskForm";
import { TaskCard, type Task } from "@/components/molecules/TaskCard";
import { DashboardStats } from "@/components/organisms/DashboardStats";

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tasks")
      .then((r) => r.json())
      .then((data) => setTasks(data))
      .finally(() => setLoading(false));
  }, []);

  async function handleStatusChange(id: string, status: Task["status"]) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) return;
    const updated = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function handleUpdated(updated: Task) {
    setTasks((prev) =>
      prev.map((task) => (task.id === updated.id ? updated : task))
    );
  }

  if (loading) {
    return (
      <div
        className="mx-auto max-w-6xl animate-pulse space-y-4"
        aria-label="Loading tasks"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-28 rounded-2xl bg-[#fbfcfa]" />
          ))}
        </div>
        <div className="h-48 rounded-2xl bg-[#fbfcfa]" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <DashboardStats tasks={tasks} />
      <section
        id="tasks"
        className="scroll-mt-6 rounded-3xl border border-[var(--line)] bg-[#fbfcfa]/80 p-4 shadow-[0_14px_36px_rgba(23,35,31,0.045)] sm:p-6"
      >
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
              Your workflow
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-[var(--ink)]">
              Task overview
            </h2>
          </div>
          <p className="hidden text-xs text-[var(--muted)] sm:block">
            Keep the next step visible.
          </p>
        </div>
        <TaskForm onCreated={(t) => setTasks((prev) => [t, ...prev])} />
      </section>
      {tasks.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-[#cbd8cf] bg-[#fbfcfa] px-6 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e2f3ed] text-xl text-[var(--teal)]">
            ✓
          </div>
          <h2 className="mt-4 text-lg font-bold text-[var(--ink)]">
            Your board is clear.
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-sm text-[var(--muted)]">
            Add a task above and turn today’s intentions into something
            concrete.
          </p>
        </section>
      ) : (
        <section className="rounded-3xl border border-[var(--line)] bg-[#fbfcfa]/60 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                Active list
              </p>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-[var(--ink)]">
                All tasks
              </h2>
            </div>
            <span className="rounded-full bg-[#e2f3ed] px-3 py-1 text-xs font-bold text-[var(--teal)]">
              {tasks.length} total
            </span>
          </div>
          <div
            id="planning"
            className="grid scroll-mt-6 gap-3 md:grid-cols-2 xl:grid-cols-3"
          >
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onUpdated={handleUpdated}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
