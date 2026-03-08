import { DonationMethod } from "@/types/donation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Smartphone, Globe } from "lucide-react";

const methodIcons = {
  bank: Building2,
  mobile: Smartphone,
  online: Globe,
};

interface DonationMethodCardProps {
  method: DonationMethod;
}

export function DonationMethodCard({ method }: DonationMethodCardProps) {
  const Icon = methodIcons[method.type];

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary/40">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <CardTitle className="text-lg">{method.name}</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {Object.entries(method.details).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 py-2 border-b border-border last:border-b-0"
            >
              <span className="text-sm text-muted-foreground">{key}:</span>
              <span className="text-sm font-semibold text-foreground select-all">
                {value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
