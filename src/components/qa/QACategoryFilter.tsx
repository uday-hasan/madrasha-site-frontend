"use client";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

interface QACategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export function QACategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: QACategoryFilterProps) {
  const allCategories = ["সকল", ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((cat) => (
        <Button
          key={cat}
          variant={selectedCategory === cat ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(cat)}
          className={cn("rounded-full text-xs md:text-sm")}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}
