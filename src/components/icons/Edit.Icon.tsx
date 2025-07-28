import { SVGProps } from "react";

import { cn } from "@/lib/utils";

export const EditIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      {...props}
    >
      <path
        d="M5.5 9.62502C5.5 9.37188 5.7052 9.16669 5.95833 9.16669H9.16667C9.4198 9.16669 9.625 9.37188 9.625 9.62502C9.625 9.87816 9.4198 10.0834 9.16667 10.0834H5.95833C5.7052 10.0834 5.5 9.87816 5.5 9.62502Z"
        className={cn(
          props.className,
          "fill-gray-300 hover:bg-accent hover:text-accent-foreground"
        )}
      />
      <path
        d="M8.48027 5.24457L9.35844 4.36646C9.71323 4.01168 9.71323 3.43647 9.35844 3.08169L7.91776 1.64108C7.56296 1.2863 6.98771 1.28631 6.63291 1.6411L5.75488 2.51918L8.48027 5.24457Z"
        className={cn(
          props.className,
          "fill-gray-300 hover:bg-accent hover:text-accent-foreground"
        )}
      />
      <path
        d="M7.9949 5.73071L5.26951 3.00531L1.18307 7.09182C1.0127 7.26223 0.916992 7.49328 0.916992 7.73422V9.62907C0.916992 9.87996 1.12037 10.0833 1.37125 10.0833H3.26578C3.50673 10.0833 3.73781 9.98762 3.90819 9.81726L7.9949 5.73071Z"
        className={cn(
          props.className,
          "fill-gray-300 hover:bg-accent hover:text-accent-foreground"
        )}
      />
    </svg>
  );
};
