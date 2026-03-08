import { cn } from "@/lib/utils/cn";

interface DonationBannerProps {
  bannerText: string;
  quranicVerse: { arabic: string; bangla: string; reference: string };
  className?: string;
}

export function DonationBanner({
  bannerText,
  quranicVerse,
  className,
}: DonationBannerProps) {
  return (
    <section
      className={cn(
        "bg-primary text-primary-foreground py-16 md:py-24 px-4 relative overflow-hidden",
        className,
      )}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full border border-primary-foreground/10" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full border border-primary-foreground/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full border border-primary-foreground/5" />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10 text-center">
        {/* Arabic verse */}
        <p
          className="text-2xl md:text-4xl leading-relaxed mb-6"
          dir="rtl"
          lang="ar"
          style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
        >
          {quranicVerse.arabic}
        </p>

        <div className="w-20 h-px bg-primary-foreground/30 mx-auto mb-4" />

        {/* Bangla translation */}
        <p className="text-base md:text-lg opacity-90 italic mb-2">
          &quot;{quranicVerse.bangla}&quot;
        </p>
        <p className="text-sm opacity-60 mb-8">— {quranicVerse.reference}</p>

        <div className="w-12 h-px bg-primary-foreground/20 mx-auto mb-6" />

        {/* Banner text */}
        <p className="text-base md:text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
          {bannerText}
        </p>
      </div>
    </section>
  );
}
