import type { Metadata } from "next";
// import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/constants/site-config";
import { Users, BookOpen, Bell, Image } from "lucide-react";

export const metadata: Metadata = {
  title: "ড্যাশবোর্ড",
};

const stats = [
  { title: "মোট শিক্ষার্থী", value: siteConfig.totalStudents, icon: Users },
  { title: "শিক্ষকমণ্ডলী", value: siteConfig.totalTeachers, icon: BookOpen },
  { title: "সক্রিয় নোটিশ", value: 5, icon: Bell },
  { title: "গ্যালারি ছবি", value: 6, icon: Image },
];

export default function DashboardPage() {
  return (
    // <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">ড্যাশবোর্ড</h2>
        <p className="text-muted-foreground">
          {siteConfig.name} পরিচালনা প্যানেলে স্বাগতম
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            ব্যাকএন্ড সংযোগ হলে এখানে সাম্প্রতিক কার্যক্রম দেখাবে।
          </p>
        </CardContent>
      </Card>
    </div>
    // </DashboardLayout>
  );
}
