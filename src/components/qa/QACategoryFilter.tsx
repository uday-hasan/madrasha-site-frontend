"use client";

interface QACategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function QACategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: QACategoryFilterProps) {
  const allCategories = ["সকল", ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200
            ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
