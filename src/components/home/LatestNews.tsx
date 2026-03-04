"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useHomeStore } from "@/stores/homeStore";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatBanglaDate } from "@/lib/utils/helpers";
import { Calendar } from "lucide-react";

export function LatestNews() {
  const { latestNews, fetchHomeData } = useHomeStore();

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="সর্বশেষ সংবাদ"
          subtitle="মাদ্রাসার সাম্প্রতিক কার্যক্রম ও ঘটনাবলী"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {latestNews.map((news) => (
            <Card key={news.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{news.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatBanglaDate(news.date)}</span>
                  </div>
                </div>
                <CardTitle className="text-base leading-tight line-clamp-2">
                  {news.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {news.excerpt}
                </p>
                <Link
                  href={`/notices/${news.slug}`}
                  className="text-primary text-sm hover:underline"
                >
                  বিস্তারিত পড়ুন →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/notices">সকল সংবাদ দেখুন</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
