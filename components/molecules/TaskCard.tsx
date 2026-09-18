"use client";

import { PriorityBadge } from "@/components/molecules/PriorityBadge";
import { StatusBadge } from "@/components/molecules/StatusBadge";
import { Button } from "@/components/atoms/Button";

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
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onStatusChange, onDelete }: Props) {
  const overdue =
    task.dueDate &&
    task.status !== "DONE" &&
    new Date(task.dueDate) < new Date();

  return (
    <div
      className={`rounded-2xl border bg-[#fbfcfa] p-5 shadow-[0_8px_24px_rgba(23,35,31,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(23,35,31,0.08)] ${overdue ? "border-orange-300" : "border-[var(--line)]"}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold tracking-tight text-[var(--ink)]">{task.title}</h3>
        <PriorityBadge priority={task.priority} />
      </div>

      {task.description && (
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{task.description}</p>
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

      <div className="mt-3 flex items-center gap-2">
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as Task["status"])
          }
          className="rounded-lg border border-[var(--line)] bg-[#f1f5f1] px-2.5 py-1.5 text-xs font-medium text-[var(--ink)] focus:border-[var(--teal)] focus:outline-none"
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
        <Button variant="danger" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}