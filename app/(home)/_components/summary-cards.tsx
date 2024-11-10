import { db } from "@/app/_lib/prisma";
import { PiggyBankIcon, TrendingDown, TrendingUpIcon, Wallet } from "lucide-react";
import { SummaryCardInfo } from "./summary-card-info";

interface summaryCardsProps {
  month: string;
}

export async function SummaryCards({ month }: summaryCardsProps) {
  const whereDateFilter = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lte: new Date(`2024-${month}-31`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...whereDateFilter, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...whereDateFilter, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...whereDateFilter, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount
  );

  const balance = depositsTotal - investmentsTotal - expensesTotal;

  return (
    <div className="space-y-6">
      <SummaryCardInfo icon={<Wallet size={16} />} title="Saldo" size="large" amount={balance} />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCardInfo
          icon={<PiggyBankIcon size={16} />}
          title="Investimento"
          amount={investmentsTotal}
        />
        <SummaryCardInfo
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCardInfo
          icon={<TrendingDown size={16} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
}
