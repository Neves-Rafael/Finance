import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { Circle } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-green-950 font-bold text-primary hover:bg-muted">
        <Circle className="mr-2 w-2.5 fill-primary" />
        Depósito
      </Badge>
    );
  }

  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-red-950 font-bold text-red-500 hover:bg-muted">
        <Circle className="mr-2 w-2.5 fill-red-500" />
        Despesa
      </Badge>
    );
  }

  return (
    <Badge className="bg-zinc-500 font-bold text-zinc-50 hover:bg-muted">
      <Circle className="mr-2 w-2.5 fill-zinc-50" />
      Investimento
    </Badge>
  );
};

export default TransactionTypeBadge;
