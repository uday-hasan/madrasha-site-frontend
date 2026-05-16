"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/constants/site-config";
import { BookOpen, Bell, Image } from "lucide-react";
import { teacherService } from "@/api/teacher/teacher.service";
import { noticeService } from "@/api/notice/notice.service";
import { galleryService } from "@/api/gallery/gallery.service";

interface DashboardStats {
  teachersCount: number;
  activeNoticesCount: number;
  galleryCount: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    teachersCount: 0,
    activeNoticesCount: 0,
    galleryCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch teachers count
        const teachersResponse = await teacherService.getAllActive();
        const teachersCount = teachersResponse.data?.length || 0;

        // Fetch active notices count
        const noticesResponse = await noticeService.getActive();
        const activeNoticesCount = noticesResponse.data?.length || 0;

        // Fetch gallery items count
        const galleryResponse = await galleryService.getAll({});
        const galleryCount = galleryResponse.data?.length || 0;

        setStats({
          teachersCount,
          activeNoticesCount,
          galleryCount,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const dashboardStats = [
    { title: "শিক্ষকমণ্ডলী", value: stats.teachersCount, icon: BookOpen },
    { title: "সক্রিয় নোটিশ", value: stats.activeNoticesCount, icon: Bell },
    { title: "গ্যালারি ছবি", value: stats.galleryCount, icon: Image },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">ড্যাশবোর্ড</h2>
        <p className="text-muted-foreground">
          {siteConfig.name} পরিচালনা প্যানেলে স্বাগতম
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? "-" : stat.value}
              </div>
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
  );
}
