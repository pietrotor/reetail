import { X } from "lucide-react";
import { useRef, useState } from "react";

export const TagInput = ({
  label,
  containerClassName,
  value: propValue,
  onTagChange,
  name = "",
  optional,
}: {
  optional?: boolean;
  label: string;
  containerClassName?: string;
  value?: string[];
  onTagChange?: (name: string, value: string[]) => void;
  name?: string;
}) => {
  const [internalTags, setInternalTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use propValue if provided, otherwise use internal state
  const tags = propValue === undefined ? internalTags : propValue;

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement> &
      React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const shouldAddTag =
      e.key === "Enter" ||
      e.type === "blur" ||
      (e.key === "Enter" && e.type === "keydown");
    if (!shouldAddTag) {
      return;
    }
    const inputValue = e.target.value.trim();
    const isValidTag = inputValue && !tags.includes(inputValue);

    if (!isValidTag) {
      return;
    }

    const newTags = [...tags, inputValue];
    onTagChange?.(name, newTags);
    if (propValue === undefined) {
      setInternalTags(newTags);
    }

    e.target.value = ""; // Clear input
    if (inputRef.current?.placeholder) {
      inputRef.current.placeholder = "";
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    onTagChange?.(name, newTags);
    if (propValue === undefined) {
      setInternalTags(newTags);
    }

    if (tags.length <= 1 && inputRef.current?.placeholder === "") {
      inputRef.current.placeholder = "eg. supplier";
    }
  };

  return (
    <div className={`flex flex-col text-sm gap-[10px] ${containerClassName}`}>
      <label>
        {label}
        {optional && <span className="text-xs opacity-50"> (optional)</span>}
      </label>
      <div className="rounded-[8px] flex flex-wrap items-center gap-[5px] bg-[#F7F5F4] p-[10px]">
        {tags.map((tag, i) => (
          <div
            key={i}
            className={`flex items-center bg-[#333333] text-white px-[15px] py-[7px] rounded-[4px] text-sm`}
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-2 hover:text-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          placeholder={tags.length === 0 ? "eg. supplier" : undefined}
          onKeyDown={handleKeyDown}
          onBlur={handleKeyDown}
          className="flex-grow outline-none px-[5px] py-[7px]"
        />
      </div>
    </div>
  );
};
