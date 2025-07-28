import { useMemo } from "react";

import { cn } from "@/lib/utils";

type CashDisplayProps = {
  amount: number | string;
  currency?: string;
  className?: HTMLElement["className"];
  decimalClassName?: HTMLElement["className"];
  hideDecimal?: boolean;
};

function splitNumber(num: number) {
  const [integerPart, decimalPart] = num.toString().split(".");
  return {
    integer: parseInt(integerPart, 10),
    decimal: decimalPart ? parseInt(decimalPart, 10) : 0,
  };
}

function addThosandsSeparator(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const CashDisplay = ({
  amount,
  currency = "$",
  className,
  decimalClassName,
  hideDecimal = false,
}: CashDisplayProps) => {
  const value = useMemo(() => {
    if (typeof amount === "string") {
      const valueAsNumber = Number(amount);
      if (!Number.isNaN(valueAsNumber)) {
        return splitNumber(valueAsNumber);
      } else {
        return {
          integer: 0,
          decimal: 0,
        };
      }
    }

    return splitNumber(amount);
  }, [amount]);
  return (
    <p className={cn("text-black font-medium", className)}>
      {currency}
      {addThosandsSeparator(value.integer)}
      {!hideDecimal && (
        <span className={cn("text-[#7A7A7A]", decimalClassName)}>
          .{value.decimal.toString().padStart(2, "0")}
        </span>
      )}
    </p>
  );
};
