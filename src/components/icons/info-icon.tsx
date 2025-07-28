import { SVGProps } from "react";

export const InfoIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={23}
      viewBox="0 0 22 23"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M.25 11.5c0 5.937 4.813 10.75 10.75 10.75s10.75-4.813 10.75-10.75S16.937.75 11 .75.25 5.563.25 11.5Zm10.432-.973c.247.034.589.122.879.412.29.29.379.632.412.88.027.204.027.442.027.642V16.5a1 1 0 1 1-2 0v-4a1 1 0 1 1 0-2h.04c.2 0 .437 0 .642.027Zm.313-4.027a.998.998 0 0 0-.995 1c0 .552.446 1 .995 1h.01c.55 0 .995-.448.995-1s-.446-1-.996-1h-.009Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
