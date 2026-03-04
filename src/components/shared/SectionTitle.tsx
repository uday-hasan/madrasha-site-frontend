import { cn } from "@/lib/utils/cn";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  centered = true,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-10",
        centered && "text-center",
        className
      )}
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "h-1 w-16 bg-primary mt-4 rounded",
          centered && "mx-auto"
        )}
      />
    </div>
  );
}
