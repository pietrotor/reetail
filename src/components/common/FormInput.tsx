import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { Input } from "../ui";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { cn } from "@/lib/utils";

export const FormInput = <T extends FieldValues>({
  form,
  name,
  label,
  description,
  placeholder,
  type,
  className,
  containerClassName,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  description?: string;
  placeholder: string;
  type?: string;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              className={cn(
                "py-[17px] px-[15px] bg-[#F7F5F4] rounded-[8px] outline-none h-[51px]",
                className
              )}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
