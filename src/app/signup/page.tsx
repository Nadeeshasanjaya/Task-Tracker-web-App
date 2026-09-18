"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }

    if (!data.session) {
      setMessage(
        "Account created. Check your email to confirm your account, then log in."
      );
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-10">
      <div className="mb-7 text-center">
        <Link
          href="/"
          className="mx-auto mb-6 flex w-fit items-center gap-3 text-lg font-bold tracking-tight"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--teal)] text-sm text-white shadow-[0_5px_12px_rgba(8,127,114,0.22)]">
            T
          </span>
          Task-Manager
        </Link>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--coral)]">
          Start with clarity
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--ink)]">
          Build your focused workspace.
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          A simple home for the work that matters.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-2xl border border-[var(--line)] bg-[#fbfcfa] p-6 shadow-[0_14px_40px_rgba(23,35,31,0.07)]"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm focus:border-[var(--teal)] focus:outline-none focus:ring-4 focus:ring-[#b8e4dc]/40"
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm focus:border-[var(--teal)] focus:outline-none focus:ring-4 focus:ring-[#b8e4dc]/40"
        />
        {error && (
          <p className="rounded-xl bg-[#fff0ed] px-3 py-2 text-sm text-[#c94e3b]">
            {error}
          </p>
        )}
        {message && (
          <p className="rounded-xl bg-[#e2f3ed] px-3 py-2 text-sm text-[#087f72]">
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[var(--teal)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_5px_12px_rgba(8,127,114,0.18)] hover:bg-[var(--teal-dark)] disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-[var(--muted)]">
        Already have a workspace?{" "}
        <Link
          href="/login"
          className="font-semibold text-[var(--teal)] hover:underline"
        >
          Log in
        </Link>
      </p>
    </main>
  );
}
