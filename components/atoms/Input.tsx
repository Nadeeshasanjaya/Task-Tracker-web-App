import { InputHTMLAttributes } from "react";

export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none ${className}`}
    />
  );
}