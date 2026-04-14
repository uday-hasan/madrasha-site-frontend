"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { useNoticeStore } from "@/stores/noticeStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatBanglaDate } from "@/lib/utils/helpers";
import { Calendar, ArrowLeft, AlertCircle } from "lucide-react";

export default function NoticeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { selectedNotice, isLoading, error, fetchNoticeBySlug } =
    useNoticeStore();

  useEffect(() => {
    if (slug) {
      fetchNoticeBySlug(slug);
    }
  }, [slug, fetchNoticeBySlug]);

  if (isLoading) {
    return (
      <>
        <PageHeader title="নোটিশ বোর্ড" />
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <Skeleton className="h-10 w-32 mb-6" />
            <div className="bg-card rounded-xl border p-8">
              <Skeleton className="h-4 w-48 mb-4" />
              <Skeleton className="h-8 w-3/4 mb-6" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error || !selectedNotice) {
    return (
      <>
        <PageHeader title="নোটিশ বোর্ড" />
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">
              {error || "আপনি যে নোটিশটি খুঁজছেন তা পাওয়া যায়নি।"}
            </p>
          </div>
        </section>
      </>
    );
  }

  const notice = selectedNotice;

  return (
    <>
      <PageHeader title="নোটিশ বোর্ড" />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/notices">
              <ArrowLeft className="h-4 w-4 mr-2" />
              সকল নোটিশ
            </Link>
          </Button>

          <article className="bg-card rounded-xl border p-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {notice.isImportant && (
                <div className="flex items-center gap-1 text-red-500 text-sm font-medium">
                  <AlertCircle className="h-4 w-4" />
                  গুরুত্বপূর্ণ
                </div>
              )}
              <Badge variant="secondary">{notice.category}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatBanglaDate(notice.createdAt || new Date().toISOString())}
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
              {notice.title}
            </h1>

            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
              <p>{notice.content}</p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
