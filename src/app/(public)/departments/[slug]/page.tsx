"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { useDepartmentStore } from "@/stores/departmentStore";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Clock, UserCheck, BookOpen } from "lucide-react";

export default function DepartmentDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { selectedDepartment, isLoading, error, fetchDepartmentBySlug } =
    useDepartmentStore();

  useEffect(() => {
    if (slug) {
      fetchDepartmentBySlug(slug);
    }
  }, [slug, fetchDepartmentBySlug]);

  if (isLoading) {
    return (
      <>
        <PageHeader title="লোড হচ্ছে..." subtitle="" />
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="text-center p-6">
                  <CardContent className="pt-0">
                    <Skeleton className="h-8 w-8 mx-auto mb-2" />
                    <Skeleton className="h-6 w-24 mx-auto mb-1" />
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </section>
      </>
    );
  }

  if (error || !selectedDepartment) {
    return (
      <>
        <PageHeader title="বিভাগ পাওয়া যায়নি" subtitle="" />
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">
              {error || "আপনি যে বিভাগটি খুঁজছেন তা পাওয়া যায়নি।"}
            </p>
          </div>
        </section>
      </>
    );
  }

  const dept = selectedDepartment;

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
                <p className="font-bold text-sm">
                  {dept.headTeacher || "নির্ধারিত হয়নি"}
                </p>
                <p className="text-sm text-muted-foreground">বিভাগীয় প্রধান</p>
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <h2 className="text-2xl font-bold mb-4">বিভাগ সম্পর্কে</h2>
            <p className="text-muted-foreground leading-relaxed">
              {dept.description}
            </p>
          </div>

          {dept.subjects && dept.subjects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                পাঠ্যক্রম
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dept.subjects.map((subject, i) => (
                  <div
                    key={subject}
                    className="flex items-center gap-2 bg-card p-3 rounded-lg border"
                  >
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm">{subject}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
