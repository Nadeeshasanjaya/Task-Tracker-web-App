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
      className={`rounded-lg border bg-white p-4 shadow-sm ${overdue ? "border-red-400" : "border-gray-200"}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold">{task.title}</h3>
        <PriorityBadge priority={task.priority} />
      </div>

      {task.description && (
        <p className="mt-1 text-sm text-gray-600">{task.description}</p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <StatusBadge status={task.status} />
        {task.dueDate && (
          <span
            className={`text-xs ${overdue ? "font-semibold text-red-600" : "text-gray-500"}`}
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
          className="rounded border border-gray-300 px-2 py-1 text-xs"
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