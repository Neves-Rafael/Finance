import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AddTransactionButton } from "../_components/add-transaction-button";
import { Navbar } from "../_components/navbar";
import { DataTable } from "../_components/ui/data-table";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { db } from "../_lib/prisma";
import { TransactionColumns } from "./_columns";

export default async function TransactionPage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }

  const transaction = await db.transaction.findMany({ where: { userId } });

  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-10 overflow-hidden p-10">
        <div className="flex w-full items-center justify-between ">
          <h1 className="font-bold text-2xl">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>

        <ScrollArea>
          <DataTable columns={TransactionColumns} data={transaction} />
        </ScrollArea>
      </div>
    </>
  );
}
