"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { adminNavItems } from "@/lib/constants/navigation";
import { siteConfig } from "@/lib/constants/site-config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { LogOut, Home } from "lucide-react";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r z-40 hidden md:block">
        <div className="p-6 border-b">
          <p className="font-bold text-primary">{siteConfig.name}</p>
          <p className="text-xs text-muted-foreground mt-1">পরিচালনা প্যানেল</p>
        </div>

        <nav className="p-4 space-y-1">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground px-3 py-2"
          >
            <Home className="h-4 w-4" />
            মূল সাইটে যান
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            লগআউট
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="md:ml-64">
        {/* Top bar */}
        <header className="bg-card border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-bold">
              {adminNavItems.find((i) => i.href === pathname)?.label ||
                "ড্যাশবোর্ড"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {user?.name || "অ্যাডমিন"}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
