import { auth, clerkClient } from "@clerk/nextjs/server";
import { CheckIcon, XIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Navbar } from "../_components/navbar";
import { Badge } from "../_components/ui/badge";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { getCurrentMonthTransactions } from "../_data/get-current-month-transactions";
import { AcquirePlanButton } from "./_components/acquire-plan-button";

export default async function SubscriptionPage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }

  const user = await (await clerkClient()).users.getUser(userId);
  const currentMonthTransactions = await getCurrentMonthTransactions();
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center space-y-6 p-10">
        <h1 className="font-bold text-3xl">Assinaturas</h1>

        <div className="flex gap-6">
          <Card className="w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {!hasPremiumPlan && (
                <Badge
                  title="ativo"
                  className="absolute top-4 left-4 bg-primary/10 font-bold text-base text-primary "
                >
                  Ativo
                </Badge>
              )}
              <h2 className="text-center font-semibold text-2xl">Plano Básico</h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="font-semibold text-6xl">0</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Apenas 10 transações por mês({currentMonthTransactions}/10)</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon className="text-muted-foreground" />
                <p>Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasPremiumPlan && (
                <Badge
                  title="ativo"
                  className="absolute top-4 left-4 bg-primary/10 font-bold text-base text-primary "
                >
                  Ativo
                </Badge>
              )}
              <h2 className="text-center font-semibold text-2xl">Plano Premium</h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="font-semibold text-6xl">19</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-muted-foreground" />
                <p>Relatórios de IA</p>
              </div>
              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
