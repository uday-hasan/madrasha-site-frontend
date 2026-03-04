import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { fakeAboutContent, fakeAchievements } from "@/lib/fake-data/about-data";
import { siteConfig } from "@/lib/constants/site-config";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে",
  description: "দারুল উলুম মাদ্রাসার ইতিহাস, লক্ষ্য ও উদ্দেশ্য সম্পর্কে জানুন।",
};

export default function AboutPage() {
  const about = fakeAboutContent;

  return (
    <>
      <PageHeader
        title={about.title}
        subtitle={about.subtitle}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <SectionTitle title="আমাদের ইতিহাস" centered={false} />
              <p className="text-muted-foreground leading-relaxed">
                {about.history}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="bg-primary/5 p-8 rounded-xl border border-primary/20">
                <h3 className="text-xl font-bold mb-4 text-primary">
                  প্রতিষ্ঠাতার বাণী
                </h3>
                <blockquote className="text-muted-foreground italic leading-relaxed">
                  &ldquo;{about.founderMessage}&rdquo;
                </blockquote>
                <p className="mt-4 font-semibold">— {about.founderName}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <h2 className="text-2xl font-bold mb-4">আমাদের লক্ষ্য</h2>
              <p className="text-muted-foreground leading-relaxed">
                {about.mission}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h2 className="text-2xl font-bold mb-4">আমাদের দৃষ্টিভঙ্গি</h2>
              <p className="text-muted-foreground leading-relaxed">
                {about.vision}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="আমাদের মূল্যবোধ" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {about.values.map((value, i) => (
              <AnimatedSection key={value} delay={i * 0.1}>
                <Card className="text-center p-4">
                  <CardContent className="pt-4">
                    <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold text-sm">{value}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionTitle title="আমাদের অর্জন" subtitle="বছরের পর বছর ধরে আমাদের যাত্রার মাইলফলকগুলো" />
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
            <div className="space-y-8">
              {fakeAchievements.map((achievement, i) => (
                <AnimatedSection key={achievement.id} delay={i * 0.1}>
                  <div className={`flex items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="flex-1 md:text-right md:pr-8">
                      {i % 2 === 0 ? (
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-primary font-bold">{achievement.year}</p>
                            <h3 className="font-semibold mt-1">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                          </CardContent>
                        </Card>
                      ) : <div />}
                    </div>
                    <div className="shrink-0 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 hidden md:block" />
                    <div className="flex-1 md:pl-8">
                      {i % 2 !== 0 ? (
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-primary font-bold">{achievement.year}</p>
                            <h3 className="font-semibold mt-1">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                          </CardContent>
                        </Card>
                      ) : <div />}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="এক নজরে মাদ্রাসা" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "প্রতিষ্ঠাকাল", value: siteConfig.foundedYear },
              { label: "মোট শিক্ষার্থী", value: `${siteConfig.totalStudents}+` },
              { label: "অভিজ্ঞ শিক্ষক", value: `${siteConfig.totalTeachers}জন` },
              { label: "বিভাগ", value: `${siteConfig.totalDepartments}টি` },
            ].map((item) => (
              <Card key={item.label} className="text-center p-6">
                <CardContent className="pt-0">
                  <p className="text-3xl font-bold text-primary">{item.value}</p>
                  <p className="text-muted-foreground mt-1 text-sm">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
