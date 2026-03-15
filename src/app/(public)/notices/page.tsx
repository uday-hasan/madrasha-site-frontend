import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { fakeNotices } from "@/lib/fake-data/notices-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatBanglaDate } from "@/lib/utils/helpers";
import { Calendar, AlertCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "নোটিশ বোর্ড",
  description: "দারুল উলুম মাদ্রাসার সকল নোটিশ ও ঘোষণা।",
};

export default function NoticesPage() {
  const sortedNotices = [...fakeNotices].slice(0, 2);
  // .sort(
  //   (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  // );

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
            {sortedNotices.map((notice) => (
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
                          <span>{formatBanglaDate(notice.date)}</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {notice.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {notice.content}
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
