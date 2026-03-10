import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { fakeTeachers, leadership } from "@/lib/fake-data/teachers-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, Crown } from "lucide-react";

export const metadata: Metadata = {
  title: "শিক্ষকমণ্ডলী",
  description: "দারুল উলুম মাদ্রাসার অভিজ্ঞ শিক্ষকমণ্ডলীর পরিচয়।",
};

export default function TeachersPage() {
  return (
    <>
      <PageHeader
        title="শিক্ষকমণ্ডলী"
        subtitle="অভিজ্ঞ ও যোগ্য শিক্ষকগণের তত্ত্বাবধানে পাঠদান"
      />

      {/* Leadership Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="নেতৃত্ব"
            subtitle="প্রতিষ্ঠানের পরিচালনা পর্ষদ"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[leadership.chairman, leadership.viceChairman, leadership.founder].map(
              (leader) => (
                <Card key={leader.name} className="text-center hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="h-2 bg-primary" />
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                      <Crown className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg leading-tight mb-1">{leader.name}</h3>
                    <p className="text-primary text-sm font-medium">{leader.designation}</p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* Teachers Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="আমাদের শিক্ষকগণ"
            subtitle="প্রতিটি শিক্ষক তাঁর বিষয়ে বিশেষজ্ঞ এবং দীর্ঘ অভিজ্ঞতাসম্পন্ন"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fakeTeachers.map((teacher) => (
              <Card key={teacher.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-3 bg-primary" />
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary text-xl font-bold">
                      {teacher.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{teacher.name}</h3>
                      <p className="text-primary text-sm font-medium">{teacher.designation}</p>
                      <p className="text-muted-foreground text-sm">{teacher.department}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                    {teacher.bio}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{teacher.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-muted-foreground">অভিজ্ঞতা: {teacher.experience}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {teacher.subjects.slice(0, 3).map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
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
