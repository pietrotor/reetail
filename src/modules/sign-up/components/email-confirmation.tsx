import { useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

import { useVerifyEmailEndpointApiV1UsersVerifyPost } from "@/api";
import orangeGradient from "@/assets/gradients/orangeGradient.svg";
import emailConfirmationImage from "@/assets/images/emailConfirmationImage.svg";

export default function EmailConfirmation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectUrl =
    searchParams.get("isVendor") === "true"
      ? "/signup/form"
      : "/signup/client-form";

  const verifyEmail = useVerifyEmailEndpointApiV1UsersVerifyPost();

  const handleClick = useCallback(() => {
    verifyEmail.mutate(
      {
        params: {
          email: searchParams.get("email") as string,
        },
      },
      {
        onSuccess: () => {
          navigate(
            `${redirectUrl}?verification_token=` +
              "" +
              (searchParams.get("payment_term_id")
                ? `&payment_term_id=${searchParams.get("payment_term_id")}`
                : "") +
              (searchParams.get("email")
                ? `&email=${searchParams.get("email")}`
                : "")
          );
        },
      }
    );
  }, [navigate, redirectUrl, searchParams, verifyEmail]);

  if (!searchParams.get("email")) {
    return <Link to={"/signup/client-form"} />;
  }

  return (
    <div className="flex flex-col center gap-[15px] w-[432px] mx-auto">
      <div className="relative w-[294px] h-[288px] flex center">
        {[
          {
            src: orangeGradient,
            className: "rotate-[15deg] min-w-[400px] h-[400px] z-[60] shrink-0",
          },
          {
            src: emailConfirmationImage,
            className: "w-[212px] h-[228px] z-[70]",
          },
        ].map(({ src, className }, i) => (
          <img
            key={i}
            src={src}
            className={`absolute select-none ${className}`}
          />
        ))}
      </div>

      <h1 className="text-[22px] font-medium">Check your email</h1>
      <p className="text-[#737373] text-center">
        We’ve sent a confirmation link to your inbox. Click it to finalize your
        registration and get started right away.
      </p>

      <button
        className="bg-white w-full py-[13px] rounded-[8px] cursor-pointer"
        onClick={handleClick}
      >
        {verifyEmail.isPending ? "Sending..." : "Send again"}
      </button>
    </div>
  );
}
