import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { fakeDepartments } from "@/lib/fake-data/departments-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "বিভাগসমূহ",
  description: "দারুল উলুম মাদ্রাসার সকল বিভাগ সম্পর্কে জানুন।",
};

export default function DepartmentsPage() {
  return (
    <>
      <PageHeader
        title="বিভাগসমূহ"
        subtitle="ইসলামী শিক্ষার প্রতিটি স্তরে সর্বোচ্চ মানের শিক্ষা"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="আমাদের শিক্ষা কার্যক্রম"
            subtitle="মক্তব থেকে দাওরাতুল হাদিস পর্যন্ত সব স্তরে বিশেষজ্ঞ শিক্ষকদের তত্ত্বাবধানে শিক্ষা প্রদান করা হয়"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fakeDepartments.map((dept) => (
              <Card key={dept.id} className="hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      {dept.duration}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{dept.totalStudents} শিক্ষার্থী</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{dept.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                    {dept.description}
                  </p>
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">বিষয়সমূহ:</p>
                    <div className="flex flex-wrap gap-1">
                      {dept.subjects.slice(0, 4).map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {dept.subjects.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{dept.subjects.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      প্রধান: {dept.headTeacher}
                    </p>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/departments/${dept.slug}`}>
                        বিস্তারিত <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
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
