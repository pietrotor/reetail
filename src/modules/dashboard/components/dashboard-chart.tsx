import { CircleHelp } from "lucide-react";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardHeader } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface IDashboardChart {
  data: any;
  decimal: string;
  integer: string;
  text: string;
}

export default function DashboardChart({
  data,
  decimal,
  integer,
  text,
}: IDashboardChart) {
  return (
    <Card className="justify-between p-4 w-full shadow-xl">
      <CardHeader>
        <div className="flex flex-col">
          <span className="flex items-center text-sm text-gray-500">
            {text}
            <CircleHelp fill="black" color="white" strokeWidth={2} size={18} />
          </span>
          <p className="text-2xl font-medium">
            {integer}
            <span className="text-base text-gray-600">,{decimal}</span>
          </p>
        </div>
      </CardHeader>
      <ChartContainer config={chartConfig} className="w-full h-48">
        <AreaChart
          accessibilityLayer
          data={data}
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
            dataKey="mes"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value}
          />
          <YAxis hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey="ventas"
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
