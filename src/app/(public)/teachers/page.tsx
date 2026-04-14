"use client";

import { useEffect } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { leadership } from "@/lib/fake-data/teachers-data";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GraduationCap, Briefcase, Shield } from "lucide-react";
import { useTeacherStore } from "@/stores/teacherStore";

export default function TeachersPage() {
  const { teachers, isLoading, error, fetchTeachers } = useTeacherStore();

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const leadershipMembers = [
    leadership.chairman,
    leadership.viceChairman,
    leadership.founder,
  ];

  return (
    <>
      <PageHeader
        title="শিক্ষকমণ্ডলী"
        subtitle="অভিজ্ঞ ও যোগ্য শিক্ষকগণের তত্ত্বাবধানে পাঠদান"
      />

      {/* Leadership Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="পরিচালনা পরিষদ"
            subtitle="আমাদের মাদরাসার নেতৃত্বদানকারী ব্যক্তিত্ব"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadershipMembers.map((member) => (
              <Card
                key={member.name}
                className="text-center hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="h-3 bg-primary" />
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-lg leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mt-1">
                    {member.designation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="আমাদের শিক্ষকগণ"
            subtitle="প্রতিটি শিক্ষক তাঁর বিষয়ে বিশেষজ্ঞ এবং দীর্ঘ অভিজ্ঞতাসম্পন্ন"
          />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-3 bg-primary" />
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Skeleton className="w-14 h-14 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-20 w-full mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              <p>ডেটা লোড করতে সমস্যা হয়েছে।</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : teachers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              কোনো শিক্ষকের তথ্য পাওয়া যায়নি।
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachers.map((teacher) => (
                <Card
                  key={teacher.id}
                  className="hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="h-3 bg-primary" />
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary text-xl font-bold">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-tight">
                          {teacher.name}
                        </h3>
                        <p className="text-primary text-sm font-medium">
                          {teacher.designation}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {teacher.department}
                        </p>
                      </div>
                    </div>

                    {teacher.bio && (
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                        {teacher.bio}
                      </p>
                    )}

                    <div className="space-y-2 text-sm">
                      {teacher.education && (
                        <div className="flex items-start gap-2">
                          <GraduationCap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            {teacher.education}
                          </span>
                        </div>
                      )}
                      {teacher.experience && (
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">
                            অভিজ্ঞতা: {teacher.experience}
                          </span>
                        </div>
                      )}
                    </div>

                    {teacher.email && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-muted-foreground">
                          {teacher.email}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
