"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHomeStore } from "@/stores/homeStore";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants/site-config";
import Image from "next/image";

export function HeroBanner() {
  const { homeData, fetchHomeData } = useHomeStore();
  const heroSlides = homeData?.heroSlides || [];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  if (heroSlides.length === 0) {
    return (
      <div className="min-h-125 bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {siteConfig.name} এ আপনাকে স্বাগতম
          </h1>
          <p className="text-muted-foreground text-lg">ইলম ও আমলের পথে</p>
        </div>
      </div>
    );
  }

  const slide = heroSlides[currentSlide];
  const hasImage = !!slide.imageUrl;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Image-only slides */}
      <div className="relative">
        {heroSlides.map((s, idx) =>
          s.imageUrl ? (
            <div
              key={s.id}
              className={cn(
                "transition-opacity duration-1000",
                idx === currentSlide
                  ? "opacity-100"
                  : "opacity-0 absolute inset-0",
              )}
            >
              <Image
                src={s.imageUrl}
                alt={s.title}
                width={1920}
                height={480}
                className="w-full h-auto"
                priority={idx === 0}
              />
            </div>
          ) : null,
        )}
      </div>

      {/* Fallback text content (shown only when current slide has no image) */}
      {!hasImage && (
        <div className="min-h-125 md:min-h-150 bg-linear-to-br from-primary/90 to-primary/70 flex items-center">
          <div className="absolute inset-0 bg-[url('/images/mosque-pattern.svg')] opacity-10" />
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="max-w-2xl text-primary-foreground">
              <p className="text-lg font-medium mb-2 opacity-90">
                {slide.subtitle}
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-base md:text-lg opacity-90 mb-8 leading-relaxed">
                {slide.description}
              </p>
              <Button asChild size="lg" variant="outline">
                <Link href={slide.ctaLink || "#"}>
                  {slide.ctaText || "আরও জানুন"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation arrows */}
      {heroSlides.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
            aria-label="আগের স্লাইড"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
            aria-label="পরের স্লাইড"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  idx === currentSlide ? "bg-white w-6" : "bg-white/50",
                )}
                aria-label={`স্লাইড ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
