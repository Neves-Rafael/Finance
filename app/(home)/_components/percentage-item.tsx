import { ReactNode } from "react";

interface PercentagemItemProps {
  icon: ReactNode;
  title: string;
  typePercentage: number;
  color: string;
}

export function PercentagemItem({ icon, title, typePercentage, color }: PercentagemItemProps) {
  const getIconColor = (color: string) => {
    if (color === "green") {
      return "bg-green-950";
    }
    if (color === "red") {
      return "bg-red-950";
    }
    return "bg-zinc-800";
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`p-2 ${getIconColor(color)} rounded-lg`}>{icon}</div>
        <p className="text-muted-foreground">{title}</p>
      </div>
      <p className="font-bold">{typePercentage}%</p>
    </div>
  );
}
