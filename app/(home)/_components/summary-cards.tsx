import { PiggyBankIcon, TrendingDown, TrendingUpIcon, Wallet } from "lucide-react";
import { SummaryCardInfo } from "./summary-card-info";

interface summaryCardsProps {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  userCanAddTransaction: boolean;
}

export async function SummaryCards({
  balance,
  expensesTotal,
  depositsTotal,
  investmentsTotal,
  userCanAddTransaction,
}: summaryCardsProps) {
  return (
    <div className="space-y-6">
      <SummaryCardInfo
        icon={<Wallet size={16} />}
        title="Saldo"
        size="large"
        amount={balance}
        userCanAddTransaction={userCanAddTransaction}
      />

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
