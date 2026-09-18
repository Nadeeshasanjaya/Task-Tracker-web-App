import { InputHTMLAttributes } from "react";

export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-[var(--line)] bg-[#fbfcfa] px-3 py-2.5 text-sm text-[var(--ink)] placeholder:text-[#9aa79f] focus:border-[var(--teal)] focus:outline-none focus:ring-4 focus:ring-[#b8e4dc]/40 ${className}`}
    />
  );
}
