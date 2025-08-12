import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
}

function LinkBtn({
  variant,
  children,
  href,
  className,
  ...rest
}: CustomLinkProps) {
  const style: Record<string, string> = {
    primary:
      "font-medium text-neutral3 uppercase bg-primary min-h-11 px-9.5 flex items-center cursor-pointer hover:bg-secondary1 transition-colors duration-200",
    secondary:
      "text-secondary1 font-medium uppercase cursor-pointer hover:text-primary transition-colors duration-200",
  };

  return (
    <Link
      href={href ?? "/"}
      className={`${style[variant as string]} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default LinkBtn;
