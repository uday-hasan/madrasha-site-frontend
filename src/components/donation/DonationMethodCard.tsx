import { DonationMethod } from "@/types/donation";
import { Building2, Smartphone, Globe } from "lucide-react";

const methodIcons = {
  bank: Building2,
  mobile: Smartphone,
  online: Globe,
};

const methodColors = {
  bank: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
  mobile:
    "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
  online:
    "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
};

export default function DonationMethodCard({
  method,
}: {
  method: DonationMethod;
}) {
  const Icon = methodIcons[method.type];
  const colorClass = methodColors[method.type];

  return (
    <div
      className={`rounded-xl border-2 p-5 md:p-6 ${colorClass} transition-all duration-300 hover:shadow-md`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-current/10">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">{method.name}</h3>
      </div>

      {/* Details */}
      <div className="space-y-2.5">
        {Object.entries(method.details).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2"
          >
            <span className="text-xs md:text-sm text-muted-foreground font-medium">
              {key}:
            </span>
            <span className="text-sm md:text-base text-foreground font-semibold select-all">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
