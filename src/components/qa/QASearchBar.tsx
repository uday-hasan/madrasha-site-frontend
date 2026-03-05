"use client";

import { Search } from "lucide-react";

interface QASearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QASearchBar({ value, onChange }: QASearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="প্��শ্ন অনুসন্ধান করুন..."
        className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl border border-border bg-card text-foreground text-sm md:text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      />
    </div>
  );
}
