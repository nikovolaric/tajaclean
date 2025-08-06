import { SVGProps } from "react";

function Hand(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.3333 25.0007H21.6667C22.5507 25.0007 23.3986 24.6495 24.0237 24.0243C24.6488 23.3992 25 22.5514 25 21.6673C25 20.7833 24.6488 19.9354 24.0237 19.3103C23.3986 18.6852 22.5507 18.334 21.6667 18.334H16.6667C15.6667 18.334 14.8333 18.6673 14.3333 19.334L5 28.334"
        stroke="#788968"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6667 35.0005L14.3334 32.6671C14.8334 32.0005 15.6667 31.6671 16.6667 31.6671H23.3334C25.1667 31.6671 26.8334 31.0005 28.0001 29.6671L35.6667 22.3338C36.3099 21.726 36.6853 20.8876 36.7103 20.0031C36.7353 19.1185 36.4079 18.2603 35.8001 17.6171C35.1923 16.974 34.3539 16.5986 33.4694 16.5736C32.5848 16.5486 31.7266 16.876 31.0834 17.4838L24.0834 23.9838"
        stroke="#788968"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33325 26.666L13.3333 36.666"
        stroke="#788968"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.6666 19.8327C29.336 19.8327 31.4999 17.6687 31.4999 14.9993C31.4999 12.33 29.336 10.166 26.6666 10.166C23.9972 10.166 21.8333 12.33 21.8333 14.9993C21.8333 17.6687 23.9972 19.8327 26.6666 19.8327Z"
        stroke="#788968"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 13.334C12.7614 13.334 15 11.0954 15 8.33398C15 5.57256 12.7614 3.33398 10 3.33398C7.23858 3.33398 5 5.57256 5 8.33398C5 11.0954 7.23858 13.334 10 13.334Z"
        stroke="#788968"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Hand;
