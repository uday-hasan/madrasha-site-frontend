"use client";
import { HeroSlide } from "@/types/home";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Trash2, GripVertical } from "lucide-react";
import Image from "next/image";

interface HeroSlideListProps {
  slides: HeroSlide[];
  onEdit: (slide: HeroSlide) => void;
  onDelete: (slideId: string | number) => void;
  isDeleting?: boolean;
}

export function HeroSlideList({
  slides,
  onEdit,
  onDelete,
  isDeleting = false,
}: HeroSlideListProps) {
  if (slides.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
        <p className="text-muted-foreground">কোনো স্লাইড এখনো যোগ করা হয়নি</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {slides.map((slide) => (
        <Card key={slide.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex gap-4 h-24">
              {/* Drag Handle */}
              <div className="flex items-center justify-center px-4 bg-muted/30 cursor-grab active:cursor-grabbing">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* Image Thumbnail */}
              <div className="w-32 h-full relative flex-shrink-0 bg-muted">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
                <h3 className="font-semibold text-sm truncate">
                  {slide.title}
                </h3>
                {slide.subtitle && (
                  <p className="text-xs text-muted-foreground truncate">
                    {slide.subtitle}
                  </p>
                )}
                {slide.ctaText && (
                  <p className="text-xs text-primary">{slide.ctaText}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pr-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(slide)}
                  disabled={isDeleting}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(slide.id)}
                  disabled={isDeleting}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
