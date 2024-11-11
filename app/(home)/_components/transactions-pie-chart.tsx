"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import { TransactionType } from "@prisma/client";
import { PiggyBank, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { PercentagemItem } from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionsPieChartsProps {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  typesPercentage: TransactionPercentagePerType;
}

export default function TransactionsPieCharts({
  depositsTotal,
  expensesTotal,
  investmentsTotal,
  typesPercentage,
}: TransactionsPieChartsProps) {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFF",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
  ];
  return (
    <Card className="flex flex-col p-12 ">
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="amount" nameKey="type" innerRadius={60} />
          </PieChart>
        </ChartContainer>
        <div className="space-y-3">
          <PercentagemItem
            icon={<TrendingUpIcon size={24} className="text-green-500" />}
            title="Receita"
            typePercentage={typesPercentage[TransactionType.DEPOSIT]}
            color="green"
          />

          <PercentagemItem
            icon={<TrendingDownIcon size={24} className="text-red-500" />}
            title="Despesas"
            typePercentage={typesPercentage[TransactionType.EXPENSE]}
            color="red"
          />

          <PercentagemItem
            icon={<PiggyBank size={24} className="text-zinc-100" />}
            title="Investimento"
            typePercentage={typesPercentage[TransactionType.INVESTMENT]}
            color="zinc"
          />
        </div>
      </CardContent>
    </Card>
  );
}
