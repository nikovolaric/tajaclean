import Link from "next/link";
import { LinkHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

interface CustomLinkProps extends LinkHTMLAttributes<HTMLLinkElement> {
  variant?: Variant;
}

function LinkBtn({ variant, ...rest }: CustomLinkProps) {
  const style: Record<string, string> = {
    primary:
      "font-medium text-neutral3 uppercase bg-primary min-h-11 px-9.5 flex items-center cursor-pointer hover:bg-secondary1 transition-colors duration-200",
    secondary:
      "text-secondary1 font-medium uppercase cursor-pointer hover:text-primary transition-colors duration-200",
  };

  return (
    <Link
      href={rest.href ?? "/"}
      className={`${style[variant as string]} ${rest.className ?? ""}`}
    >
      {rest.children}
    </Link>
  );
}

export default LinkBtn;
