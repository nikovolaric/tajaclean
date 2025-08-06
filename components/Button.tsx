"use client"

import { ButtonHTMLAttributes } from "react";
import {  useFormStatus } from "react-dom";

type Variant = "primary" | "secondary";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

function Button({ children, variant, ...rest }: CustomButtonProps) {
const {pending} = useFormStatus()

  const style: Record<string, string> = {
    primary:
      "font-medium text-neutral3 uppercase bg-primary h-11 px-9.5 flex items-center cursor-pointer hover:bg-secondary1 transition-colors duration-200",
    secondary:
      "text-secondary1 font-medium uppercase cursor-pointer hover:text-primary transition-colors duration-200",
  };

  return (
    <button
      {...rest}
      className={`${style[variant as string]} ${rest.className}`}
      disabled={pending}
    >
      {pending?"...":children}
    </button>
  );
}

export default Button;
