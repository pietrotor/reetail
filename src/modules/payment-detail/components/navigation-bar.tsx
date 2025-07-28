import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

const NavigationBar = () => {
  return (
    <div className="w-full flex justify-between px-2 py-2.5 items-center">
      <div className="flex gap-2 items-center">
        <Link to={"/dashboard"}>
          <button className="flex bg-[#FFFFFF] justify-center items-center rounded-[6px] py-2 px-[17px] gap-[3px] shadow-[22px_31px_15px_rgba(107,107,107,0.01),12px_17px_13px_rgba(107,107,107,0.05),5px_8px_9px_rgba(107,107,107,0.09),1px_2px_5px_rgba(107,107,107,0.1)]">
            <ChevronLeft strokeWidth={1.2} size={22} /> Go back
          </button>
        </Link>

        <p className="font-semibold text-xl">Stark</p>
      </div>
      <div className="px-4 py-2 rounded-full bg-[#1BD1331A] text-[#097E34] h-fit">
        Active term
      </div>
    </div>
  );
};

export { NavigationBar };
