"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface QASearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function QASearchBar({ value, onChange }: QASearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="প্রশ্ন অনুসন্ধান করুন..."
        className="pl-10 h-11 md:h-12 rounded-xl"
      />
    </div>
  );
}
