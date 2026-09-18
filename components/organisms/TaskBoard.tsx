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

  if (loading) return <p className="text-sm text-gray-500">Loading tasks…</p>;

  return (
    <div className="flex flex-col gap-4">
      <DashboardStats tasks={tasks} />
      <TaskForm onCreated={(t) => setTasks((prev) => [t, ...prev])} />
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">
          No tasks yet. Add one above to get started.
        </p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}