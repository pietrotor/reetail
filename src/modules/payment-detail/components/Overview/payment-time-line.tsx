import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const Circle = ({ softOpacity }: { softOpacity?: boolean }) => {
  return (
    <div
      className={cn(
        "h-5 w-5 rounded-full bg-[#1F1F21] flex items-center justify-center relative z-10",
        softOpacity ? "bg-[#A5A5A6]" : "bg-[#1F1F21]"
      )}
    >
      <div className="h-2 w-2 rounded-full bg-white"></div>
    </div>
  );
};

type TPaymentTimeLineProps = {
  data: {
    firstPayment: string;
    latestPayment?: string;
    nextPayment: string;
    lastPayment: string;
  };
};

export const PaymentTimeLine = ({
  data: { firstPayment, latestPayment, nextPayment, lastPayment },
}: TPaymentTimeLineProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setContainerWidth(containerRef.current?.offsetWidth || 0);
  }, [containerRef.current?.offsetWidth]);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-between text-xs font-medium relative"
    >
      <div
        style={{
          width: `${(containerWidth || 0) / 3}px`,
        }}
        className="absolute bottom-2 left-0 h-0.5 bg-gradient-to-r from-transparent to-[#1F1F21]"
      />
      <div
        style={{
          width: `${(containerWidth || 0) / 3}px`,
          left: `${(containerWidth || 0) / 3}px`,
        }}
        className="absolute bottom-2 left-0 border-t-2 border-[#1F1F21] border-dashed"
      />
      <div
        style={{
          width: `${(containerWidth || 0) / 3}px`,
          left: `${((containerWidth || 0) / 3) * 2}px`,
          WebkitMaskImage: "linear-gradient(to left, transparent, black)",
          WebkitMaskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
        }}
        className="absolute bottom-2 left-0 h-[2px] bg-[linear-gradient(to_right,_#1F1F21_50%,_transparent_50%)] bg-[length:8px_2px] bg-repeat-x"
      />
      <div>
        <p className="opacity-40">Term start</p>
        <p className="opacity-40">{firstPayment.replace(/\//g, ".")}</p>
        <Circle softOpacity />
      </div>
      {latestPayment && (
        <div className="text-center flex flex-col items-center">
          <p>Latest</p>
          <p>{latestPayment.replace(/\//g, ".")}</p>
          <Circle />
        </div>
      )}
      <div className="text-center flex flex-col items-center">
        <p>Next</p>
        <p>{nextPayment.replace(/\//g, ".")}</p>
        <Circle />
      </div>
      <div className="flex flex-col items-end">
        <p className="opacity-40">Term end</p>
        <p className="opacity-40">{lastPayment.replace(/\//g, ".")}</p>
        <Circle softOpacity />
      </div>
    </div>
  );
};
