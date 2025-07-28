import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { ComponentProps, useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import CalendarIcon from "@/assets/icons/calendar-icon";
import { cn } from "@/lib/utils";

export const DatePicker = ({
  label,
  value: propValue,
  onChange,
  className,
  disabled,
  calendarProps,
  valueFormat = "MM/dd/yyyy",
}: {
  label?: string;
  value?: Date | undefined;
  onChange?: (date: Date | undefined) => void;
  className?: HTMLElement["className"];
  disabled?: boolean;
  calendarProps?: Partial<ComponentProps<typeof Calendar>>;
  valueFormat?: string;
}) => {
  const [internalDate, setInternalDate] = useState<Date>();

  const date = propValue === undefined ? internalDate : propValue;

  const onSelect: SelectSingleEventHandler = (date: Date | undefined) => {
    setInternalDate(date);
    onChange?.(date);
  };

  return (
    <div className="flex flex-col gap-[10px] text-sm">
      {label && <label>{label}</label>}
      <Popover>
        <PopoverTrigger disabled={disabled} asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-between text-left font-normal text-sm !py-[17px] !px-[15px] !h-[58px] bg-[#F7F5F4] border-0 rounded-[8px]",
              className,
              !internalDate && "text-muted-foreground"
            )}
          >
            <div className="flex items-center gap-[10px]">
              <CalendarIcon className="!w-[24px] !h-[24px]" />
              {date ? format(date, valueFormat) : <span>Pick a date</span>}
            </div>
            {!disabled && <ChevronDown />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            {...calendarProps}
            mode="single"
            selected={internalDate}
            onSelect={onSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
