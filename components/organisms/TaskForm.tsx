"use client";

import { useState } from "react";
import { FormField } from "@/components/molecules/FormField";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textarea";
import { Button } from "@/components/atoms/Button";
import type { Task } from "@/components/molecules/TaskCard";

export function TaskForm({ onCreated }: { onCreated: (t: Task) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        priority,
        dueDate: dueDate || null,
      }),
    });

    setLoading(false);
    if (!res.ok) return;

    const task = await res.json();
    onCreated(task);
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setDueDate("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-lg border bg-white p-4 shadow-sm md:grid-cols-2"
    >
      <div className="md:col-span-2">
        <FormField label="Title" htmlFor="title">
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormField>
      </div>

      <div className="md:col-span-2">
        <FormField label="Description" htmlFor="description">
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
        </FormField>
      </div>

      <FormField label="Priority" htmlFor="priority">
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task["priority"])}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </FormField>

      <FormField label="Due date" htmlFor="dueDate">
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </FormField>

      <div className="md:col-span-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add task"}
        </Button>
      </div>
    </form>
  );
}