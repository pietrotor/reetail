import { SVGProps } from "react";

export const DownStairArrowIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={8}
      height={10}
      viewBox="0 0 8 10"
      fill="none"
      {...props}
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.5}
        d="M.5 1.25v5.417c0 .46.373.833.833.833h5.834m0 0-1.25 1.25m1.25-1.25-1.25-1.25"
      />
    </svg>
  );
};
