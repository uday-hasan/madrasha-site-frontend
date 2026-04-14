"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { useNoticeStore } from "@/stores/noticeStore";

export function MarqueeNotice() {
  const { notices, fetchNotices } = useNoticeStore();

  useEffect(() => {
    fetchNotices({ featured: true, isActive: true });
  }, [fetchNotices]);

  const featuredNotices = notices.filter((n) => n.featured);

  if (featuredNotices.length === 0) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div className="flex items-center gap-3 container mx-auto px-4">
        <div className="flex items-center gap-2 shrink-0 font-semibold text-sm whitespace-nowrap">
          <Bell className="h-4 w-4 animate-pulse" />
          <span>নোটিশ:</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div
            className="text-sm whitespace-nowrap"
            style={{ animation: "marquee 20s linear infinite" }}
          >
            {featuredNotices.map((n, i) => (
              <span key={n.id}>
                <Link href={`/notices/${n.slug}`} className="hover:underline">
                  {n.title}
                </Link>
                {i < featuredNotices.length - 1 && " *** "}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
