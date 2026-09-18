import { TextareaHTMLAttributes } from "react";

export function Textarea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none ${className}`}
    />
  );
}