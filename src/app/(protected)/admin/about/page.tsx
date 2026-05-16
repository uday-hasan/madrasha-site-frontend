"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutSectionsManager from "@/components/admin/about/AboutSectionsManager";
import AboutValuesManager from "@/components/admin/about/AboutValuesManager";
import AchievementsManager from "@/components/admin/about/AchievementsManager";
import LeadershipManager from "@/components/admin/about/LeadershipManager";
import QuotesManager from "@/components/admin/about/QuotesManager";
import ProposedBuildingsManager from "@/components/admin/about/ProposedBuildingsManager";

export default function AboutAdminPage() {
  const [activeTab, setActiveTab] = useState("sections");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">সম্পর্কে পৃষ্ঠা ব্যবস্থাপনা</h1>
        <p className="text-muted-foreground mt-2">
          পৃষ্ঠার সমস্ত বিষয়বস্তু পরিচালনা করুন
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="sections">বিভাগ</TabsTrigger>
          <TabsTrigger value="values">মূল্যবোধ</TabsTrigger>
          <TabsTrigger value="achievements">অর্জন</TabsTrigger>
          <TabsTrigger value="leadership">নেতৃত্ব</TabsTrigger>
          <TabsTrigger value="quotes">উদ্ধৃতি</TabsTrigger>
          <TabsTrigger value="buildings">ভবন</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-4">
          <AboutSectionsManager />
        </TabsContent>

        <TabsContent value="values" className="space-y-4">
          <AboutValuesManager />
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <AchievementsManager />
        </TabsContent>

        <TabsContent value="leadership" className="space-y-4">
          <LeadershipManager />
        </TabsContent>

        <TabsContent value="quotes" className="space-y-4">
          <QuotesManager />
        </TabsContent>

        <TabsContent value="buildings" className="space-y-4">
          <ProposedBuildingsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
