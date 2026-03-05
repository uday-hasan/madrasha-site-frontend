import { DonationCategory } from "@/types/donation";

export default function DonationCategoryCard({
  category,
}: {
  category: DonationCategory;
}) {
  const progress =
    category.targetAmount && category.collectedAmount
      ? Math.round((category.collectedAmount / category.targetAmount) * 100)
      : null;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("bn-BD").format(amount);
  };

  return (
    <div className="group bg-card border border-border rounded-xl p-5 md:p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      {/* Icon & Title */}
      <div className="flex items-start gap-4 mb-4">
        <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 transition-transform">
          {category.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {category.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
        {category.description}
      </p>

      {/* Progress bar */}
      {progress !== null &&
        category.targetAmount &&
        category.collectedAmount && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs md:text-sm">
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
            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-primary to-primary/70 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right">
              {progress}% সম্পন্ন
            </p>
          </div>
        )}
    </div>
  );
}
