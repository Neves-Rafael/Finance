import { AddTransactionButton } from "../_components/add-transaction-button";
import { Navbar } from "../_components/navbar";
import { DataTable } from "../_components/ui/data-table";
import { db } from "../_lib/prisma";
import { TransactionColumns } from "./_columns";

export default async function TransactionPage() {
  const transaction = await db.transaction.findMany({});

  return (
    <>
      <Navbar />
      <div className="space-y-10 p-10">
        <div className="flex w-full items-center justify-between ">
          <h1 className="font-bold text-2xl">Transações</h1>
          <AddTransactionButton />
        </div>

        <DataTable columns={TransactionColumns} data={transaction} />
      </div>
    </>
  );
}
