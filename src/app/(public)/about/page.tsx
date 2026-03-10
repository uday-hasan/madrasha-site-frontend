import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  fakeAboutContent,
  fakeAchievements,
  aboutEducationSystem,
  aboutObjectives,
} from "@/lib/fake-data/about-data";
import { siteConfig } from "@/lib/constants/site-config";
import { foundationServices } from "@/lib/fake-data/service-data";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Target, Building2, Star } from "lucide-react";

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

      {/* অবতরণিকা — History/Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <SectionTitle title="অবতরণিকা" centered={false} />
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

      {/* শিক্ষা ব্যবস্থা — Education System */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <SectionTitle title="শিক্ষা ব্যবস্থা" centered={false} />
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {aboutEducationSystem}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* লক্ষ্য ও উদ্দেশ্য — Mission, Vision, Objectives */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="লক্ষ্য ও উদ্দেশ্য" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <AnimatedSection>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    আমাদের লক্ষ্য
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {about.mission}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    আমাদের দৃষ্টিভঙ্গি
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {about.vision}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          <div className="space-y-3 max-w-2xl mx-auto">
            {aboutObjectives.map((obj, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-muted-foreground pt-0.5">{obj}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* আমাদের মূল্যবোধ — Values */}
      <section className="py-16 bg-muted/30">
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

      {/* বৈশিষ্ট্যসমূহ — Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="বৈশিষ্ট্যসমূহ"
            subtitle="আমাদের প্রতিষ্ঠানের বিশেষ সুযোগ-সুবিধাসমূহ"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteConfig.facilities.map((facility, i) => (
              <AnimatedSection key={i} delay={(i % 6) * 0.08}>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border hover:border-primary/40 transition-colors">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{facility}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* আল আশরাফ ফাউন্ডেশন */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="আল আশরাফ ফাউন্ডেশন"
            subtitle="আমাদের মাদার প্রতিষ্ঠান"
          />
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-muted-foreground leading-relaxed">
              {foundationServices.description}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {foundationServices.services.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.08}>
                <Card className="text-center h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <p className="text-3xl mb-3">{service.icon}</p>
                    <h3 className="font-semibold text-sm mb-2">{service.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ভবিষ্যত পরিকল্পনা — Future Plan */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="ভবিষ্যত পরিকল্পনা"
            subtitle="আমাদের স্বপ্নের প্রকল্পসমূহ"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-primary/5 rounded-xl p-8 border border-primary/20">
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {foundationServices.futureProjects[0].title}
                </h3>
                <p className="text-muted-foreground mb-3">
                  আনুমানিক বাজেট:{" "}
                  <span className="font-semibold text-foreground">
                    {foundationServices.futureProjects[0].estimatedCost}
                  </span>
                </p>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {foundationServices.futureProjects[0].status}
                </span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-muted-foreground leading-relaxed">
                আল্লাহর রহমতে আমরা একটি বিশাল মসজিদ-মাদরাসা কমপ্লেক্স নির্মাণের
                পরিকল্পনা করছি। এই ১০ তলা কমপ্লেক্সে মসজিদ, মাদরাসা, পাঠাগার,
                কম্পিউটার ল্যাব এবং আরও অনেক সুবিধা থাকবে। এই স্বপ্ন পূরণে আপনার
                সহযোগিতা আমন্ত্রণ জানাই।
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* আমাদের অর্জন — Achievements Timeline */}
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

      {/* এক নজরে মাদ্রাসা */}
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
