import { ChevronDown, SearchIcon } from "lucide-react";

const SearchBar = ({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) => (
  <div className="flex bg-white p-2.5 rounded-lg border gap-2 items-center">
    <SearchIcon className="h-5 w-5 bg-gradient-to-b from-[#1C1C1C] to-[#626262] bg-clip-text" />
    <input className={`outline-none placeholder-black pe-1 border-e ${className}`} placeholder={props.placeholder} />
    <button className="flex text-xs items-center">All <ChevronDown height={14} width={14} /></button>
  </div>
);

export default SearchBar;
