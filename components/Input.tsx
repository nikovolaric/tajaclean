import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Input({
  className = "",
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...rest}
      className={`border-neutral1 flex h-11 w-full items-center rounded-[1px] border bg-white px-4.5 shadow-[inset_0.5px_0.5px_4px_rgba(0,0,0,0.1)] outline-none ${className}`}
    />
  );
}

export function Textarea({
  className = "",
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...rest}
      className={`border-neutral1 h-54 w-full rounded-[1px] border bg-white px-4.5 py-2 shadow-[inset_0.5px_0.5px_4px_rgba(0,0,0,0.1)] outline-none ${className}`}
    />
  );
}
