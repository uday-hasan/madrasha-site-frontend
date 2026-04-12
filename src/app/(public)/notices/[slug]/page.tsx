import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { fakeNotices } from "@/lib/fake-data/notices-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatBanglaDate } from "@/lib/utils/helpers";
import { Calendar, ArrowLeft, AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const notice = fakeNotices.find((n) => n.slug === slug);
  if (!notice) return { title: "নোটিশ পাওয়া যায়নি" };
  return {
    title: notice.title,
    description: notice.content.slice(0, 155),
  };
}

export async function generateStaticParams() {
  return fakeNotices.map((notice) => ({ slug: notice.slug }));
}

export default async function NoticeDetailPage({ params }: Props) {
  const { slug } = await params;
  const notice = fakeNotices.find((n) => n.slug === slug);
  if (!notice) notFound();

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
                {formatBanglaDate(notice.date || new Date().toISOString())}
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
