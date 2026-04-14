"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { useNoticeStore } from "@/stores/noticeStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatBanglaDate } from "@/lib/utils/helpers";
import { Calendar, AlertCircle, ArrowRight } from "lucide-react";

export default function NoticesPage() {
  const { notices, isLoading, error, fetchNotices } = useNoticeStore();

  useEffect(() => {
    fetchNotices({ isActive: true });
  }, [fetchNotices]);

  if (isLoading) {
    return (
      <>
        <PageHeader
          title="নোটিশ বোর্ড"
          subtitle="মাদ্রাসার সকল গুরুত্বপূর্ণ ঘোষণা ও নোটিশ"
        />
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <SectionTitle title="সকল নোটিশ" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageHeader
          title="নোটিশ বোর্ড"
          subtitle="মাদ্রাসার সকল গুরুত্বপূর্ণ ঘোষণা ও নোটিশ"
        />
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="নোটিশ বোর্ড"
        subtitle="মাদ্রাসার সকল গুরুত্বপূর্ণ ঘোষণা ও নোটিশ"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle title="সকল নোটিশ" />

          <div className="space-y-4">
            {notices.length === 0 ? (
              <p className="text-center text-muted-foreground">
                কোনো নোটিশ পাওয়া যায়নি।
              </p>
            ) : (
              notices.map((notice) => (
                <Card
                  key={notice.id}
                  className={`hover:shadow-md transition-shadow ${
                    notice.isImportant ? "border-primary/50" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {notice.isImportant && (
                            <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                          )}
                          <Badge variant="secondary">{notice.category}</Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {formatBanglaDate(
                                notice.createdAt || new Date().toISOString(),
                              )}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                          {notice.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {notice.excerpt || notice.content}
                        </p>
                      </div>
                      <Link
                        href={`/notices/${notice.slug}`}
                        className="text-primary hover:text-primary/80 shrink-0"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
