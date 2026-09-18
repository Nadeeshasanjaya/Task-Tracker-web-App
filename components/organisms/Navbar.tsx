import Link from "next/link";
import { LogoutButton } from "@/components/organisms/LogoutButton";

export function Navbar() {
  return (
    <>
      <header className="flex min-w-0 items-center justify-between gap-3 border-b border-[var(--line)] bg-[#fbfcfa] px-4 py-4 md:hidden">
        <Link
          href="/dashboard"
          className="flex min-w-0 items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--teal)] text-sm text-white">
            T
          </span>
          <span className="truncate">Task-Manager</span>
        </Link>
        <LogoutButton />
      </header>
      <aside className="hidden min-h-screen w-64 shrink-0 border-r border-[var(--line)] bg-[#fbfcfa] px-5 py-7 md:flex md:flex-col">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-2 text-lg font-bold tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--teal)] text-sm text-white shadow-[0_5px_12px_rgba(8,127,114,0.22)]">
            T
          </span>
          Task-Manager
        </Link>
        <p className="mb-3 mt-12 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9aa79f]">
          Workspace
        </p>
        <nav className="space-y-1" aria-label="Main navigation">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl bg-[#e2f3ed] px-3 py-3 text-sm font-semibold text-[var(--teal)]"
          >
            <span className="text-base">▦</span> Overview
          </Link>
          <a
            href="#tasks"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[var(--muted)] hover:bg-[#eef4f0] hover:text-[var(--ink)]"
          >
            <span className="text-base">✓</span> My tasks
          </a>
          <a
            href="#planning"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[var(--muted)] hover:bg-[#eef4f0] hover:text-[var(--ink)]"
          >
            <span className="text-base">◷</span> Planning
          </a>
        </nav>
        <div className="mt-auto border-t border-[var(--line)] pt-5">
          <div className="mb-4 flex items-center gap-3 px-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f9d6ca] text-sm font-bold text-[#a64e3d]">
              TM
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--ink)]">
                My workspace
              </p>
              <p className="text-xs text-[var(--muted)]">Personal plan</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
