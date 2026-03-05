"use client";

import { Construction, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

interface UnderConstructionProps {
  pageName?: string;
  message?: string;
  showBackButton?: boolean;
}

export default function UnderConstruction({
  pageName = "এই পেজটি",
  message = "আমরা এই পেজে কাজ করছি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
  showBackButton = true,
}: UnderConstructionProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Animated Icon */}
        <div className="relative mx-auto mb-8 w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-20" />
          <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 border-2 border-dashed border-primary/30">
            <Construction className="w-16 h-16 text-primary animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          🚧 নির্মাণাধীন
        </h2>

        {/* Page name badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium mb-4">
          <Clock className="w-4 h-4" />
          <span>{pageName}</span>
        </div>

        {/* Message */}
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto">
          {message}
        </p>

        {/* Progress indicator */}
        <div className="max-w-xs mx-auto mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>অগ্রগতি</span>
            <span>শীঘ্রই আসছে...</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-primary to-primary/60 rounded-full animate-pulse"
              style={{ width: "35%" }}
            />
          </div>
        </div>

        {/* Back button */}
        {showBackButton && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        )}
      </div>
    </div>
  );
}
