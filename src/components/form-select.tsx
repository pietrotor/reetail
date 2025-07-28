import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { cn } from "@/lib/utils";

type SelectOption = {
  label: string;
  value: string;
};

export default function FormSelect({
  label,
  options,
  placeholder,
  containerClassName,
  className,
  onValueChange,
  value,
}: {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  containerClassName?: string;
  className?: HTMLElement["className"];
  onValueChange?: (value: string) => void;
  value?: string;
}) {
  return (
    <div className={`flex flex-col text-sm gap-[10px] ${containerClassName}`}>
      {label && <label>{label}</label>}
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger
          className={cn(
            "w-full py-[17px] px-[15px] !h-[54px] bg-[#F7F5F4] rounded-[8px] !text-black border-0",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, value }, i) => (
            <SelectItem key={i} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
