import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardHeader } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CircleHelp } from "lucide-react";
import { useMemo } from "react";
// const chartData = [
//   { month: "January", desktop: 50 },
//   { month: "February", desktop: 80 },
//   { month: "March", desktop: 100 },
//   { month: "April", desktop: 95 },
//   { month: "May", desktop: 94 },
//   { month: "June", desktop: 93 },
//   { month: "July", desktop: 115 },
//   { month: "August", desktop: 105 },
//   { month: "September", desktop: 115 },
//   { month: "October", desktop: 120 },
//   { month: "November", desktop: 140 },
//   { month: "December", desktop: 150 },
// ];

const chartConfig = {
  desktop: {
    label: "label",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function DashboardChart({
  data,
}: {
  data: { [key: string]: number };
}) {
  const currentMRR = useMemo(() => {
    const currentMonth = new Date().toLocaleString("en-US", {
      month: "long",
    });

    const value = data[currentMonth];

    return {
      decimal: value ? (value % 1).toFixed(2).slice(2) : "00",
      integer: value
        ? Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(Math.trunc(value))
        : "0",
    };
  }, [data]);

  return (
    <Card className="justify-between p-4 w-full shadow-xl">
      <CardHeader>
        <div className="flex flex-col">
          <span className="flex items-center text-sm text-[#B4B4B4]">
            Monthly Recurring Income (MRR){" "}
            <CircleHelp fill="black" color="white" strokeWidth={2} size={18} />
          </span>
          <p className="text-2xl font-medium">
            {currentMRR.integer}
            <span className="text-base text-[#7A7A7A]">
              .{currentMRR.decimal}
            </span>
          </p>
        </div>
      </CardHeader>
      <ChartContainer config={chartConfig} className="w-full h-48">
        <AreaChart
          accessibilityLayer
          data={Object.entries(data).map(([month, desktop]) => ({
            month,
            desktop,
          }))}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="60%" stopColor="#1AC548" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#F8F8F8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} strokeDasharray="10 10" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="url(#colorUv)"
            fillOpacity={0.2}
            stroke="#1AC548"
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}
