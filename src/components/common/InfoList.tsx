import { ReactNode } from "react";

type InfoListProps = {
  label: string | ReactNode;
  value: string | ReactNode;
};

export const InfoList = ({ label, value }: InfoListProps) => {
  return (
    <div className="w-full flex items-center justify-between py-1.5">
      {typeof label === "string" ? (
        <p className="text-xs">{label}</p>
      ) : (
        <>{label}</>
      )}
      {typeof value === "string" ? (
        <p className="font-medium text-sm">{value}</p>
      ) : (
        value
      )}
    </div>
  );
};
