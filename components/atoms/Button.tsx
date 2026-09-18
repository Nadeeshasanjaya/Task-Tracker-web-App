import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-black text-white hover:bg-gray-800",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
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
      className={`rounded px-4 py-2 text-sm font-medium transition disabled:opacity-50 ${styles[variant]} ${className}`}
    />
  );
}