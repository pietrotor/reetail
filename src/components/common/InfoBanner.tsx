import { InfoIcon } from "../icons";

type InfoBannerProps = {
  children: React.ReactNode;
};

export const InfoBanner = ({ children }: InfoBannerProps) => {
  return (
    <div className="w-full bg-gradient-to-r from-[#8B0F4729] via-[#8B0F4729] via-16% to-white p-4 rounded-xl text-[#8B0F47] flex items-center gap-2">
      <InfoIcon className="h-8 w-8" />
      {children}
    </div>
  );
};
