import React from "react";

import { cn } from "@/lib/utils";

type SectionContainerProps = {
  children: React.ReactNode;
  className?: HTMLElement["className"];
};

export const SectionContainer = ({
  children,
  className,
}: SectionContainerProps) => {
  return (
    <section
      className={cn("w-full rounded-xl shadow-lg bg-white p-4", className)}
    >
      {children}
    </section>
  );
};
