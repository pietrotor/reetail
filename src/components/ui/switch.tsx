import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  thumbClassName,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  thumbClassName?: string;
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-[#F9F7F6] data-[state=unchecked]:bg-[#F9F7F6] focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[20px] w-[40px] shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 p-[2px]",
        className
      )}
      style={{
        boxShadow:
          "6px 8px 3px 0px rgba(83, 87, 90, 0.00) inset, 4px 5px 2px 0px rgba(83, 87, 90, 0.01) inset, 2px 3px 2px 0px rgba(83, 87, 90, 0.05) inset, 1px 1px 2px 0px rgba(83, 87, 90, 0.09) inset, 0px 0px 1px 0px rgba(83, 87, 90, 0.10) inset",
      }}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-[#121212] dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=unchecked]:translate-x-0", thumbClassName
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
