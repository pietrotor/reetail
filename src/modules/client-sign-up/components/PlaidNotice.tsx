import { SignUpFormContainer } from "./sign-up-form-container";

import LockIcon from "@/assets/icons/lock-icon";
import ShieldIcon from "@/assets/icons/shield-icon";

export const PlaidNotice = () => {
  return (
    <SignUpFormContainer
      className="h-[502px] justify-between p-[25px] pt-[70px]"
      onValidStep={(callback) => callback}
      cta="plaid"
    >
      <div className="flex flex-col gap-[25px] px-[65px]">
        <h1 className="text-[22px] w-[287px] text-center self-center">
          <span className="font-semibold">Recurrent Finance</span> uses Plaid to
          link your bank
        </h1>

        {[
          {
            icon: ShieldIcon,
            label: "Secure",
            text: "Encryption helps protect your personal financial data.",
          },
          {
            icon: LockIcon,
            label: "Private",
            text: "Your credentials will never be made accessible to Conduit",
          },
        ].map((item, i) => (
          <div key={i} className="flex gap-[15px]">
            <div className="p-[13px] bg-[#F5F4F3] rounded-[8px]">
              <item.icon width={24} height={24} />
            </div>
            <div className="flex flex-col gap-[3px]">
              <h2 className="text-[20px] font-semibold">{item.label}</h2>
              <p className="text-sm">{item.text}</p>
            </div>
          </div>
        ))}

        <p className="text-sm text-center w-[271px] self-center">
          By clicking "Continue" you agree to the{" "}
          <span className="font-semibold underline">
            Plaid End User Privacy Policy
          </span>
        </p>
      </div>
    </SignUpFormContainer>
  );
};
