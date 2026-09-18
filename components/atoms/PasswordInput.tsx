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
        onPointerDown={(event) => {
          event.preventDefault();
          setVisible(true);
        }}
        onPointerUp={() => setVisible(false)}
        onPointerLeave={() => setVisible(false)}
        onPointerCancel={() => setVisible(false)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") setVisible(true);
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter" || event.key === " ") setVisible(false);
        }}
        onBlur={() => setVisible(false)}
        aria-label="Hold to show password"
        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[#e2f3ed] hover:text-[var(--teal)]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      </button>
    </div>
  );
}
