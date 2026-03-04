"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/lib/constants/navigation";
import { siteConfig } from "@/lib/constants/site-config";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="মেনু খুলুন">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px]">
        <SheetHeader>
          <SheetTitle className="text-primary text-xl font-bold">
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-2">
          {navItems.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <div>
                  <button
                    className="flex w-full items-center justify-between py-2 px-3 rounded-md text-foreground hover:bg-accent transition-colors"
                    onClick={() =>
                      setExpandedItem(
                        expandedItem === item.label ? null : item.label
                      )
                    }
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expandedItem === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedItem === item.label && (
                    <div className="ml-4 mt-1 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="py-2 px-3 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="block py-2 px-3 rounded-md text-foreground hover:bg-accent transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
