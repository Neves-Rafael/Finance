import { ArrowDownUp } from "lucide-react";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { db } from "../_lib/prisma";
import { TransactionColumns } from "./_columns";

export default async function TransactionPage() {
  const transaction = await db.transaction.findMany({});

  return (
    <div className="space-y-10 p-10">
      <div className="flex w-full items-center justify-between ">
        <h1 className="font-bold text-2xl">Transações</h1>
        <Button className="rounded-full font-bold">
          Adicionar Transação <ArrowDownUp className="ml-1" />
        </Button>
      </div>

      <DataTable columns={TransactionColumns} data={transaction} />
    </div>
  );
}
