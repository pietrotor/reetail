import { Clock } from "lucide-react";

// type StatusBadgeVariantsType = {
//   variants: {
//     [key: string]: {
//       className: string;
//       text: string;
//     };
//   };
//   size: {
//     [key: string]: {
//       className: string;
//       iconSize: number;
//     };
//   };
// };

const statusBadgeVariants = {
  variants: {
    pending: {
      className: "bg-[#EFEFEF] text-[#7D7D7D]",
      text: "Upcoming",
    },
    processing: {
      className: "bg-[#3296FF1A] text-[#3296FF]",
      text: "Processing",
    },
    overdue: {
      className: "bg-[#DD214F26] text-[#DD214F]",
      text: "Overdue",
    },
    completed: {
      className: "bg-[#1BD1331A] text-[#1BD133]",
      text: "Completed",
    },
    pendingOrange: {
      className: "bg-[#FF84001A] text-[#FF9000]",
      text: "Pending",
    },
  },
  size: {
    sm: {
      className: "text-[10px]",
      iconSize: 12,
    },
    md: {
      className: "text-sm",
      iconSize: 14,
    },
    lg: {
      className: "text-lg",
      iconSize: 16,
    },
  },
};

export type TPaymentStatus = keyof typeof statusBadgeVariants.variants;

export default function StatusBadge({
  variant,
  size = "sm",
}: {
  variant: TPaymentStatus;
  size?: keyof typeof statusBadgeVariants.size;
}) {
  return (
    <div
      className={`flex gap-1 py-[3px] px-[7px] rounded-full items-center justify-center w-fit ${statusBadgeVariants.variants[variant].className} ${statusBadgeVariants.size[size].className}`}
    >
      <Clock size={statusBadgeVariants.size[size].iconSize} />
      {statusBadgeVariants.variants[variant].text}
    </div>
  );
}
