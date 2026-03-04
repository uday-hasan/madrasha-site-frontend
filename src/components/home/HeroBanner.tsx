"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHomeStore } from "@/stores/homeStore";
import { cn } from "@/lib/utils/cn";

export function HeroBanner() {
  const { heroSlides, fetchHomeData } = useHomeStore();
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
      <div className="min-h-[500px] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            দারুল উলুম মাদ্রাসায় স্বাগতম
          </h1>
          <p className="text-muted-foreground text-lg">ইলম ও আমলের পথে</p>
        </div>
      </div>
    );
  }

  const slide = heroSlides[currentSlide];

  return (
    <div className="relative min-h-[500px] md:min-h-[600px] bg-gradient-to-br from-primary/90 to-primary/70 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/mosque-pattern.svg')] opacity-10" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-2xl text-primary-foreground">
          <p className="text-lg font-medium mb-2 opacity-90">{slide.subtitle}</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {slide.title}
          </h1>
          <p className="text-base md:text-lg opacity-90 mb-8 leading-relaxed">
            {slide.description}
          </p>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
            <Link href={slide.ctaLink}>{slide.ctaText}</Link>
          </Button>
        </div>
      </div>

      {heroSlides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
            aria-label="আগের স্লাইড"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
            aria-label="পরের স্লাইড"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  idx === currentSlide ? "bg-white w-6" : "bg-white/50"
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
