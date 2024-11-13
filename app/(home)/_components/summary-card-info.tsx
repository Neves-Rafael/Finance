import { AddTransactionButton } from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardInfoProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCanAddTransaction?: boolean;
}

export function SummaryCardInfo({
  userCanAddTransaction,
  icon,
  title,
  amount,
  size = "small",
}: SummaryCardInfoProps) {
  return (
    <div>
      <Card className={`${size === "large" ? "bg-zinc-800" : ""}`}>
        <CardHeader className="flex-row items-center gap-4 ">
          {icon}
          <p
            className={`${size === "small" ? "text-muted-foreground" : "text-zinc-50 opacity-70"}`}
          >
            {title}
          </p>
        </CardHeader>
        <CardContent className="flex justify-between">
          <p className={` font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}>
            {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(amount)}
          </p>
          {size === "large" && (
            <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
