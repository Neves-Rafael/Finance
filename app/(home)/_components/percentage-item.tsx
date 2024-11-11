import { ReactNode } from "react";

interface PercentagemItemProps {
  icon: ReactNode;
  title: string;
  typePercentage: number;
}

export function PercentagemItem({ icon, title, typePercentage }: PercentagemItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <p className="text-muted-foreground">{title}</p>
      </div>
      <p className="font-bold">{typePercentage}%</p>
    </div>
  );
}
