"use client";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDepartmentStore } from "@/stores/departmentStore";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DepartmentsOverview() {
  const { departments, fetchDepartments } = useDepartmentStore();

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const previewDepartments = departments.slice(0, 4);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="আমাদের বিভাগসমূহ"
          subtitle="ইসলামী শিক্ষার প্রতিটি স্তরে সর্বোচ্চ মানের শিক্ষা প্রদান করা হয়"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {previewDepartments.map((dept) => (
            <Card key={dept.id} className="hover:shadow-lg transition-shadow group">
              <CardHeader className="pb-3">
                <Badge variant="secondary" className="w-fit mb-2">
                  {dept.duration}
                </Badge>
                <CardTitle className="text-lg leading-tight">{dept.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {dept.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    শিক্ষার্থী: {dept.totalStudents}
                  </span>
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    বিস্তারিত <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/departments">সকল বিভাগ দেখুন</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
