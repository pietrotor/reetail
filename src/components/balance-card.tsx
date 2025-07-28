import { Ellipsis } from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

import { formatCurrency } from "@/utils/formatters";

export default function BalanceCard() {
  return (
    <Card className="balance-card px-4 py-3 gap-1 justify-between">
      <CardContent className="flex flex-col gap-1">
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm text-white/50">Current Balance</p>
          {/* Replace this */}
          <Ellipsis className="text-white/50" />
        </div>
        <div className="flex text-white gap-1">
          <p className="text-2xl font-medium">
            {formatCurrency({
              value: 65259,
              fractionDigits: 65259 % 1 === 0 ? 0 : 2,
            })}
          </p>
          <p className="text-xs opacity-50 pb-3">USD</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full cursor-pointer">
          Transfer
        </Button>
      </CardFooter>
    </Card>
  );
}
