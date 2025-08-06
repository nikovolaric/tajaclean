import { HTMLAttributes } from "react";

export function H1(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={`font-lora text-primary text-[28px] font-semibold lg:text-3xl ${props.className ?? ""}`}
    >
      {props.children}
    </h1>
  );
}

export function H2(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={`font-lora text-primary text-2xl font-medium ${props.className ?? ""}`}
    >
      {props.children}
    </h2>
  );
}

export function H3(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`font-lora text-primary font-medium ${props.className ?? ""}`}
    >
      {props.children}
    </h3>
  );
}
