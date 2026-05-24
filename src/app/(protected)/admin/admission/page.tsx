"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, ListChecks, BookOpen, Calendar } from "lucide-react";
import Link from "next/link";

export default function AdminAdmissionPage() {
  const sections = [
    {
      title: "ভর্তি সেটিংস",
      description: "শিক্ষাবর্ষ, ভর্তি স্ট্যাটাস এবং অফিস সময় পরিচালনা করুন",
      icon: Settings,
      href: "/admin/admission/settings",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "ভর্তি প্রক্রিয়া",
      description: "ভর্তির পদক্ষেপগুলি যোগ এবং সম্পাদনা করুন",
      icon: ListChecks,
      href: "/admin/admission/processes",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "বিভাগওয়ারি তথ্য",
      description: "প্রতিটি বিভাগের ভর্তি প্রয়োজনীয়তা পরিচালনা করুন",
      icon: BookOpen,
      href: "/admin/admission/requirements",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "গুরুত্বপূর্ণ তারিখ",
      description: "ভর্তি সংক্রান্ত গুরুত্বপূর্ণ তারিখ যোগ করুন",
      icon: Calendar,
      href: "/admin/admission/dates",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <>
      <PageHeader
        title="ভর্তি ব্যবস্থাপনা"
        subtitle="ভর্তি সংক্রান্ত সকল তথ্য পরিচালনা করুন"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.href} href={section.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {section.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {section.description}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${section.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <span>ব্যবস্থাপনা করুন</span>
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
