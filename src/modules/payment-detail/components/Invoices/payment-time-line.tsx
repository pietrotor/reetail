import { TransactionStatus } from "@/api";
import { formatDateToString } from "@/utils/formatters";

type PaymentTimeLineProps = {
  createdAt: string;
  updatedAt: string;
  status: TransactionStatus;
};

const statusItems = {
  [TransactionStatus.Upcoming]: {
    label: "Waiting on client to process payment",
    color: "#FFFFFF",
  },
  [TransactionStatus.Processing]: {
    label: "Processing",
    color: "#3296FF",
  },
  [TransactionStatus.Completed]: {
    label: "Invoice paid",
    color: "#000000",
  },
  [TransactionStatus.Overdue]: {
    label: "Payment Overdue",
    color: "#DD214F",
  },
};

export const PaymentTimeLine = ({
  createdAt,
  updatedAt,
  status,
}: PaymentTimeLineProps) => {
  return (
    <div className="flex flex-col gap-4 relative">
      <div
        className={`absolute h-8 left-1 top-4 border border-black ${
          statusItems[status].color === "#FFFFFF"
            ? "dashed-gradient-line border-dashed"
            : ""
        }`}
      />
      {/* <div className="absolute h-8 left-1 top-14 w-0.5 bg-[#1F1F21]"></div> */}
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 bg-black rounded-full" />
        <p className="text-xs">{formatDateToString(createdAt)}</p>-
        <p className="text-sm font-medium">Invoice Created</p>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{
            backgroundColor: statusItems[status].color,
            border:
              statusItems[status].color === "#FFFFFF"
                ? "1px solid #000"
                : "none",
          }}
        />
        <p className="text-xs">{formatDateToString(updatedAt)}</p>-
        <p
          className="text-sm font-medium"
          style={{
            color:
              statusItems[status].color === "#FFFFFF"
                ? "#000000"
                : statusItems[status].color,
          }}
        >
          {statusItems[status].label}
        </p>
      </div>
    </div>
  );
};
