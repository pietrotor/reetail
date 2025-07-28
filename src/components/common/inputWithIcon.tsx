import * as React from "react";

import { Input } from "../ui/input";

import { cn } from "@/lib/utils";

export type InputWithIconProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  inputClassName?: string;
};

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  (
    {
      className,
      icon,
      iconPosition = "left",
      disabled = false,
      inputClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "flex h-10 items-center rounded-md border border-input bg-white text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          iconPosition === "left" && "pl-3",
          iconPosition === "right" && "pr-3",
          className
        )}
      >
        {iconPosition === "left" && icon}
        <Input
          {...props}
          ref={ref}
          className={cn(
            "border-none focus-visible:ring-0 w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:opacity-50",
            inputClassName,
            disabled && "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />
        {iconPosition === "right" && icon}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
