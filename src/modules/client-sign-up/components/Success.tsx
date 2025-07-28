import { useNavigate } from "react-router";

import orangeGradient from "@/assets/gradients/orangeGradient.svg";
import emailConfirmationImage from "@/assets/images/succes_image.png";
import SignupLayout from "@/modules/sign-up/components/sign-up-layout";

export const Success = () => {
  const navigate = useNavigate();
  return (
    <SignupLayout>
      <div className="flex flex-col center gap-[15px] w-[432px] mx-auto">
        <div className="relative w-[294px] h-[288px] flex center">
          {[
            {
              src: orangeGradient,
              className:
                "rotate-[15deg] min-w-[400px] h-[400px] z-[60] shrink-0",
            },
            {
              src: emailConfirmationImage,
              className: "w-[287px] h-[294px] z-[70]",
            },
          ].map(({ src, className }, i) => (
            <img
              key={i}
              src={src}
              className={`absolute select-none ${className}`}
            />
          ))}
        </div>

        <h1 className="text-[22px] font-medium">Success!</h1>
        <p className="text-[#737373] text-center">
          Your transfer was successful. The funds have been sent and a
          confirmation has been emailed to you.
        </p>

        <button
          className="bg-white w-full py-[13px] rounded-[8px] cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Continue to dashboard
        </button>
      </div>
    </SignupLayout>
  );
};
