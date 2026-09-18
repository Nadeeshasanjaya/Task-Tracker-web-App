import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-[var(--teal)] text-white shadow-[0_5px_12px_rgba(8,127,114,0.18)] hover:bg-[var(--teal-dark)] hover:-translate-y-px",
  secondary: "bg-[#e7eeea] text-[var(--ink)] hover:bg-[#dbe7e0]",
  danger: "bg-[#fff0ed] text-[#c94e3b] hover:bg-[#ffe2dc]",
  ghost: "bg-transparent text-[var(--muted)] hover:bg-[#e7eeea] hover:text-[var(--ink)]",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
    />
  );
}