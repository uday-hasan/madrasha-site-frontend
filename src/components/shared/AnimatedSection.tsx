"use client";
import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    let gsap: typeof import("gsap").gsap | undefined;
    let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger | undefined;

    const initAnimation = async () => {
      try {
        const gsapModule = await import("gsap");
        const stModule = await import("gsap/ScrollTrigger");
        gsap = gsapModule.gsap;
        ScrollTrigger = stModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      } catch {
        // GSAP not available, skip animation
        element.style.opacity = "1";
      }
    };

    initAnimation();

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, [delay]);

  return (
    <div ref={sectionRef} className={cn("opacity-0", className)}>
      {children}
    </div>
  );
}
