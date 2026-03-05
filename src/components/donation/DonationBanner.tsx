export default function DonationBanner({
  bannerText,
  quranicVerse,
}: {
  bannerText: string;
  quranicVerse: { arabic: string; bangla: string; reference: string };
}) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary to-primary/80 text-primary-foreground py-12 md:py-20">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 border border-primary-foreground/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 border border-primary-foreground/20 rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Arabic verse */}
          <div className="mb-6">
            <p
              className="text-2xl md:text-4xl leading-relaxed font-arabic mb-4"
              dir="rtl"
              lang="ar"
            >
              {quranicVerse.arabic}
            </p>
            <div className="w-24 h-0.5 bg-primary-foreground/30 mx-auto mb-4" />
            <p className="text-base md:text-lg opacity-90 italic mb-2">
              &quot;{quranicVerse.bangla}&quot;
            </p>
            <p className="text-sm opacity-70">— {quranicVerse.reference}</p>
          </div>

          <div className="w-16 h-px bg-primary-foreground/30 mx-auto my-6" />

          <p className="text-base md:text-xl opacity-90 leading-relaxed">
            {bannerText}
          </p>
        </div>
      </div>
    </section>
  );
}
