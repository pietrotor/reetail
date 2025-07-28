import { CircleUserRound, SquareArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import SimpleArrowIcon from "@/assets/icons/simple-arrow-icon";
import conduitCommerceLogo from "@/assets/images/conduitCommerceLogo.png";
import { cn } from "@/lib/utils";
import { useCurrentUserStore } from "@/store/use-current-user";

export default function SignUpHeader() {
  const [openLogOut, setOpenLogOut] = useState<boolean>(false);
  const navigate = useNavigate();

  const currentUser = useCurrentUserStore();
  const isUserLoggedIn = !!currentUser.id;

  return (
    <div
      className={cn(
        "flex md:flex-row flex-col gap-2 center w-full pb-4 justify-around",
        !isUserLoggedIn ? "justify-center" : "justify-around"
      )}
    >
      {isUserLoggedIn && <div className="w-96"></div>}
      <div className="w-96 flex justify-center">
        <img src={conduitCommerceLogo} className="mx-auto h-12" />
      </div>
      {isUserLoggedIn && (
        <div
          className="flex right-[40px] center gap-2.5 text-sm w-96 relative"
          onClick={() => {
            setOpenLogOut((current) => !current);
          }}
        >
          <CircleUserRound strokeWidth={1.5} />
          <span>{currentUser.email}</span>
          <SimpleArrowIcon className="" />

          {openLogOut && (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/signup");
              }}
              className="absolute bg-white text-[#F23B3B] -bottom-14 right-20 p-2.5 rounded-[8px] w-[119px] flex center gap-[5px]"
            >
              <SquareArrowLeft width={14} height={14} />
              Log out
            </button>
          )}
        </div>
      )}
    </div>
  );
}
