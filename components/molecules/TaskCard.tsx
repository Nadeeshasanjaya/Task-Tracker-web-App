"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { PriorityBadge } from "@/components/molecules/PriorityBadge";
import { StatusBadge } from "@/components/molecules/StatusBadge";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate: string | null;
};

interface Props {
  task: Task;
  onStatusChange: (id: string, status: Task["status"]) => void;
  onUpdated: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onStatusChange, onUpdated, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate?.slice(0, 10) ?? "");
  const [saving, setSaving] = useState(false);
  const overdue =
    task.dueDate &&
    task.status !== "DONE" &&
    new Date(task.dueDate) < new Date();

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;

    setSaving(true);
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        priority,
        dueDate: dueDate || null,
      }),
    });
    setSaving(false);

    if (!response.ok) return;
    onUpdated(await response.json());
    setEditing(false);
  }

  return (
    <div
      className={`group rounded-2xl border bg-[#fbfcfa] p-5 shadow-[0_8px_24px_rgba(23,35,31,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(23,35,31,0.08)] ${overdue ? "border-orange-300" : "border-[var(--line)]"}`}
    >
      {editing ? (
        <form className="space-y-3" onSubmit={handleUpdate}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="w-full rounded-xl border border-[var(--line)] px-3 py-2 text-sm focus:border-[var(--teal)] focus:outline-none"
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={2}
            className="w-full rounded-xl border border-[var(--line)] px-3 py-2 text-sm focus:border-[var(--teal)] focus:outline-none"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as Task["priority"])
              }
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm"
            >
              <option value="LOW">Low priority</option>
              <option value="MEDIUM">Medium priority</option>
              <option value="HIGH">High priority</option>
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--teal)]">
              {task.title}
            </h3>
            <PriorityBadge priority={task.priority} />
          </div>

          {task.description && (
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              {task.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusBadge status={task.status} />
            {task.dueDate && (
              <span
                className={`text-xs ${overdue ? "font-semibold text-orange-700" : "text-[var(--muted)]"}`}
              >
                Due {new Date(task.dueDate).toLocaleDateString()}
                {overdue && " · Overdue"}
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <select
              value={task.status}
              onChange={(event) =>
                onStatusChange(task.id, event.target.value as Task["status"])
              }
              className="rounded-lg border border-[var(--line)] bg-[#f1f5f1] px-2.5 py-1.5 text-xs font-medium text-[var(--ink)] focus:border-[var(--teal)] focus:outline-none"
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
            <Button
              variant="secondary"
              className="px-3"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              className="px-3"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
