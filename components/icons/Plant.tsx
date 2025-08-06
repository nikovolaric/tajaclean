import { SVGProps } from "react";

function Plant(props: SVGProps<SVGSVGElement>) {
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
        d="M11.6667 33.334H28.3334"
        stroke="#788968"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6667 33.3327C25.8334 29.166 18.0001 22.666 21.6667 16.666"
        stroke="#788968"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8334 15.667C17.6667 17.0003 18.8334 19.3337 19.6667 21.8337C16.3334 22.5003 13.8334 22.5003 11.6667 21.3337C9.66675 20.3337 7.83341 18.167 6.66675 14.3337C11.3334 13.5003 14.0001 14.3337 15.8334 15.667Z"
        stroke="#788968"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.5 9.99935C22.2293 11.9853 21.5901 14.3096 21.6667 16.666C24.8333 16.4993 27.1667 15.666 28.8333 14.3327C30.5 12.666 31.5 10.4993 31.6667 6.66602C27.1667 6.83268 25 8.33268 23.5 9.99935Z"
        stroke="#788968"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Plant;
