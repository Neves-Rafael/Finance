"use client";

import { ArrowDownUp } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { UpsertTransactionDialog } from "./upsert-transaction-dialog";

interface addTransactionButtonProps {
  userCanAddTransaction?: boolean;
}

export function AddTransactionButton({ userCanAddTransaction }: addTransactionButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full font-bold"
              onClick={() => setDialogIsOpen(true)}
              disabled={!userCanAddTransaction}
            >
              Adicionar Transação <ArrowDownUp className="ml-1" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction
              ? "Você atingiu o limite de transações. Atualize seu plano para criar transações ilimitadas."
              : null}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
}
