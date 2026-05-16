"use client";
import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { adminNavItems } from "@/lib/constants/navigation";
import { siteConfig } from "@/lib/constants/site-config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils/cn";
import { LogOut, Home, User, Menu } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const SidebarContent = () => (
    <>
      <nav className="p-4 space-y-1">
        {adminNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="space-y-2 p-4 border-t mt-auto">
        <Link
          href="/"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground px-3 py-2"
        >
          <Home className="h-4 w-4" />
          মূল সাইটে যান
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            setSidebarOpen(false);
            handleLogout();
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          লগআউট
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r z-40 hidden md:flex md:flex-col">
        <div className="p-6 border-b">
          <p className="font-bold text-primary">{siteConfig.name}</p>
          <p className="text-xs text-muted-foreground mt-1">পরিচালনা প্যানেল</p>
        </div>

        <SidebarContent />
      </aside>

      {/* Mobile Sidebar as Sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 flex flex-col">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="text-left">
              <p className="font-bold text-primary">{siteConfig.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                পরিচালনা প্যানেল
              </p>
            </SheetTitle>
          </SheetHeader>

          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="md:ml-64">
        {/* Top bar */}
        <header className="bg-card border-b px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="font-bold text-lg">
              {adminNavItems.find((i) => i.href === pathname)?.label ||
                "ড্যাশবোর্ড"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.name || "অ্যাডমিন"}
            </span>
            <Link href="/admin/profile">
              <Button variant="ghost" size="sm" title="প্রোফাইল">
                <User className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              title="লগআউট"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="p-4 md:p-6 ">{children}</main>
      </div>
    </div>
  );
}
