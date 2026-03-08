import { DonationCategory } from "@/types/donation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface DonationCategoryCardProps {
  category: DonationCategory;
}

export function DonationCategoryCard({ category }: DonationCategoryCardProps) {
  const progress =
    category.targetAmount && category.collectedAmount
      ? Math.round((category.collectedAmount / category.targetAmount) * 100)
      : null;

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("bn-BD").format(amount);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/40">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
            {category.icon}
          </div>
          <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors leading-snug">
            {category.title}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {category.description}
        </p>

        {progress !== null &&
          category.targetAmount &&
          category.collectedAmount && (
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  সংগৃহীত:{" "}
                  <span className="font-semibold text-foreground">
                    ৳{formatAmount(category.collectedAmount)}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  লক্ষ্য:{" "}
                  <span className="font-semibold text-foreground">
                    ৳{formatAmount(category.targetAmount)}
                  </span>
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-right">
                {progress}% সম্পন্ন
              </p>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
