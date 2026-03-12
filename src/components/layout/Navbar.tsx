"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { GoogleTranslate } from "./GoogleTranslate";
import { MobileMenu } from "./MobileMenu";
import { navItems } from "@/lib/constants/navigation";
import { siteConfig } from "@/lib/constants/site-config";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg overflow-hidden">
              <Image
                src="/images/site_logo_with_bg.jpg"
                alt={siteConfig.name}
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <p className="font-bold text-primary leading-tight text-sm md:text-base">
                {siteConfig.name}
              </p>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {siteConfig.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent",
                        pathname.startsWith(item.href) &&
                          item.href !== "/" &&
                          "text-primary font-medium",
                      )}
                    >
                      {item.label}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-48 bg-popover border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent block",
                      (pathname === item.href ||
                        (item.href !== "/" &&
                          pathname.startsWith(item.href))) &&
                        "text-primary font-medium bg-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <GoogleTranslate />
            </div>
            <ThemeToggle />
            <div className="lg:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
