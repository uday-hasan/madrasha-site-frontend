import { cn } from "@/lib/utils/cn";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground py-16 px-4 text-center",
        className
      )}
    >
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl opacity-90">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
