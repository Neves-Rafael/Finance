import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
import { redirect } from "next/navigation";
import { Navbar } from "../_components/navbar";
import { getDashboard } from "../_data/get-dashboard";
import { ExpensesPerCategory } from "./_components/expenses-per-category";
import { LastTransactions } from "./_components/last-transactions";
import { SummaryCards } from "./_components/summary-cards";
import { TimeSelect } from "./_components/time-select";
import TransactionsPieCharts from "./_components/transactions-pie-chart";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  if (!month) {
    return redirect("?month=01");
  }

  if (!isMatch(month, "MM")) {
    return redirect("?month=01");
  }

  const dashboard = await getDashboard(month);

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-10">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards month={month} {...dashboard} />
            <div className="grid grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieCharts {...dashboard} />
              <ExpensesPerCategory expensesPerCategory={dashboard.totalExpensePerCategory} />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
}
