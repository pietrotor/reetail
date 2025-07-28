import { forwardRef } from "react";

const FormInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    optional?: boolean;
    label?: string;
    containerClassName?: string;
  }
>(({ className, label, optional, containerClassName, ...props }, ref) => {
  return (
    <div className={`flex flex-col text-sm gap-[10px] ${containerClassName}`}>
      {label && (
        <label>
          {label}
          {optional && <span className="text-xs opacity-50"> (optional)</span>}
        </label>
      )}
      <input
        ref={ref}
        {...props}
        className={`py-[17px] px-[15px] bg-[#F7F5F4] rounded-[8px] outline-none h-[51px] ${className}`}
      />
    </div>
  );
});

FormInput.displayName = "FormInput";

export default FormInput;