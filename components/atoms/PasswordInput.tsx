"use client";

import { useState } from "react";
import { InputHTMLAttributes } from "react";

export function PasswordInput({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={`w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 pr-16 text-sm focus:border-[var(--teal)] focus:outline-none focus:ring-4 focus:ring-[#b8e4dc]/40 ${className}`}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-[var(--muted)] hover:bg-[#e2f3ed] hover:text-[var(--teal)]"
      >
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
}
