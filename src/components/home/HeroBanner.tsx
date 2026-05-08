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
      <div className="py-20 bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {siteConfig.name} এ আপনাকে স্বাগতম
          </h1>
          <p className="text-muted-foreground text-lg">ইলম ও আমলের পথে</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full group">
      {/* 
          1. Removed fixed heights (h-96, etc.) 
          2. The container will now be sized by the image inside it
      */}
      <div className="relative w-full overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={cn(
              "w-full transition-opacity duration-1000 ease-in-out",
              idx === currentSlide
                ? "relative opacity-100"
                : "absolute inset-0 opacity-0 pointer-events-none",
            )}
          >
            {slide.imageUrl ? (
              <Image
                src={slide.imageUrl}
                alt={slide.title || "Banner Image"}
                width={1920} // Reference width
                height={640} // Reference height (adjust based on your typical banner ratio)
                priority={idx === 0}
                className="w-full h-auto block" // h-auto ensures the image isn't cropped
                unoptimized={slide.imageUrl.startsWith("http")}
              />
            ) : (
              // Fallback for slides without images
              <div className="w-full aspect-[21/9] bg-primary/10 flex items-center justify-center p-8">
                <div className="text-center max-w-2xl">
                  <h2 className="text-3xl font-bold text-primary">
                    {slide.title}
                  </h2>
                  <p className="mt-4">{slide.description}</p>
                </div>
              </div>
            )}

            {/* 
               Optional: Dynamic Text Overlay 
               Only show this if you actually want text on top of the image. 
               If your text is ALREADY part of the image, delete this <div>.
            */}
            {(slide.title || slide.ctaText) && !slide.imageUrl && (
              <div className="absolute inset-0 flex items-center z-10 bg-black/20">
                <div className="container mx-auto px-4">
                  <div className="max-w-xl text-white">
                    {slide.title && (
                      <h1 className="text-2xl md:text-4xl font-bold mb-4">
                        {slide.title}
                      </h1>
                    )}
                    {slide.ctaText && (
                      <Button asChild size="lg">
                        <Link href={slide.ctaLink || "#"}>{slide.ctaText}</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows - hidden by default, shown on hover (group-hover) */}
      {heroSlides.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators (Dots) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  idx === currentSlide
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/80",
                )}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
