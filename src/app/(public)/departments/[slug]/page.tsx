import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { fakeDepartments } from "@/lib/fake-data/departments-data";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, UserCheck, BookOpen } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dept = fakeDepartments.find((d) => d.slug === slug);
  if (!dept) return { title: "বিভাগ পাওয়া যায়নি" };
  return {
    title: dept.name,
    description: dept.description,
  };
}

export async function generateStaticParams() {
  return fakeDepartments.map((dept) => ({ slug: dept.slug }));
}

export default async function DepartmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const dept = fakeDepartments.find((d) => d.slug === slug);
  if (!dept) notFound();

  return (
    <>
      <PageHeader title={dept.name} subtitle={`সময়কাল: ${dept.duration}`} />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="text-center p-6">
              <CardContent className="pt-0">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-bold text-lg">{dept.duration}</p>
                <p className="text-sm text-muted-foreground">সময়কাল</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-0">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-bold text-lg">{dept.totalStudents}</p>
                <p className="text-sm text-muted-foreground">মোট শিক্ষার্থী</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-0">
                <UserCheck className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-bold text-sm">{dept.headTeacher}</p>
                <p className="text-sm text-muted-foreground">বিভাগীয় প্রধান</p>
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <h2 className="text-2xl font-bold mb-4">বিভাগ সম্পর্কে</h2>
            <p className="text-muted-foreground leading-relaxed">{dept.description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              পাঠ্যক্রম
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dept.subjects.map((subject, i) => (
                <div key={subject} className="flex items-center gap-2 bg-card p-3 rounded-lg border">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm">{subject}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
