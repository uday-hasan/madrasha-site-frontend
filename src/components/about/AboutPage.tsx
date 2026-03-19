"use client";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { fakeAboutContent, fakeAchievements } from "@/lib/fake-data/about-data";
import { leadership } from "@/lib/fake-data/teachers-data";
import { siteConfig } from "@/lib/constants/site-config";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { foundationServices } from "@/lib/fake-data/service-data";
import { CheckCircle, Shield, Building2, Hammer, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
export default function AboutPage() {
  const about = fakeAboutContent;
  const leadershipMembers = [
    leadership.chairman,
    leadership.viceChairman,
    leadership.founder,
  ];

  const [selectedValue, setSelectedValue] = useState<{
    title: string;
    content: string;
  } | null>(null);

  return (
    <>
      <PageHeader title={about.title} subtitle={about.subtitle} />

      {/* Highlighted Tagline */}
      <section className="py-8 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground text-lg md:text-xl font-semibold leading-relaxed">
            &ldquo;{siteConfig.highlightedTagline}&rdquo;
          </p>
        </div>
      </section>

      {/* Parent Organization */}
      <section className="py-6 bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <Building2 className="h-6 w-6 text-primary" />
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">
                {siteConfig.parentOrganization.role}:
              </span>{" "}
              <span className="text-primary font-bold">
                {siteConfig.parentOrganization.name}
              </span>
            </p>
          </div>
        </div>
      </section>

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
              <h2 className="text-2xl font-bold mb-4">আবেদন</h2>
              <p className="text-muted-foreground leading-relaxed">
                {about.request}
              </p>
            </AnimatedSection>
            <AnimatedSection>
              <h2 className="text-2xl font-bold mb-4">
                আমাদের লক্ষ্য ও উদ্দেশ্য
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {about.mission}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h2 className="text-2xl font-bold mb-4">অবতরণিকা</h2>
              <p className="text-muted-foreground leading-relaxed">
                {about.vision}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="পরিচালনা পরিষদ"
            subtitle="আমাদের মাদরাসার নেতৃত্বদানকারী ব্যক্তিত্ব"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadershipMembers.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.1}>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl font-bold">
                      <Shield className="h-10 w-10" />
                    </div>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-primary font-medium mt-1">
                      {member.designation}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionTitle title="আমাদের মূল্যবোধ" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {about.values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <Card
                  className="text-center p-4 cursor-pointer"
                  onClick={() => setSelectedValue(value)}
                >
                  <CardContent className="pt-4">
                    <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold text-sm underline">
                      {value.title}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="আমাদের সুযোগ-সুবিধা"
            subtitle="শিক্ষার্থীদের জন্য আমাদের প্রতিষ্ঠানে যা রয়েছে"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {siteConfig.facilities.map((facility, i) => (
              <AnimatedSection key={facility} delay={i * 0.1}>
                <div className="flex items-start gap-3 p-4 bg-card rounded-lg border hover:shadow-md transition-shadow">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{facility}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="আমাদের অর্জন"
            subtitle="আমাদের যাত্রার মাইলফলকগুলো"
          />
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
            <div className="space-y-8">
              {fakeAchievements.map((achievement, i) => (
                <AnimatedSection key={achievement.id} delay={i * 0.1}>
                  <div
                    className={`flex items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className="flex-1 md:text-right md:pr-8">
                      {i % 2 === 0 ? (
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-primary font-bold">
                              {achievement.year}
                            </p>
                            <h3 className="font-semibold mt-1">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {achievement.description}
                            </p>
                          </CardContent>
                        </Card>
                      ) : (
                        <div />
                      )}
                    </div>
                    <div className="shrink-0 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 hidden md:block" />
                    <div className="flex-1 md:pl-8">
                      {i % 2 !== 0 ? (
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-primary font-bold">
                              {achievement.year}
                            </p>
                            <h3 className="font-semibold mt-1">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {achievement.description}
                            </p>
                          </CardContent>
                        </Card>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Foundation Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="আল আশরাফ ফাউন্ডেশনের সেবাসমূহ"
            subtitle={foundationServices.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {foundationServices.services.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.05}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <span
                      className="text-3xl"
                      role="img"
                      aria-label={service.title}
                    >
                      {service.icon}
                    </span>
                    <h3 className="font-semibold mt-3 mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Proposed Building Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="প্রস্তাবিত ভবন"
            subtitle="ভবিষ্যত পরিকল্পনা ও উন্নয়ন প্রকল্প"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundationServices.futureProjects.map((project, i) => (
              <AnimatedSection key={project.title} delay={i * 0.1}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-primary/10 h-58 flex items-center justify-center overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top"
                        width={400}
                        height={200}
                      />
                    ) : (
                      <Hammer className="h-16 w-16 text-primary/40" />
                    )}
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-lg leading-snug">
                        {project.title}
                      </h3>
                      <Badge className="shrink-0">{project.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {project.estimatedCost}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="এক নজরে মাদ্রাসা" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "প্রতিষ্ঠাকাল", value: siteConfig.foundedYear },
              {
                label: "মোট শিক্ষার্থী",
                value: `${siteConfig.totalStudents}+`,
              },
              {
                label: "অভিজ্ঞ শিক্ষক",
                value: `${siteConfig.totalTeachers}জন`,
              },
              { label: "বিভাগ", value: `${siteConfig.totalDepartments}টি` },
            ].map((item) => (
              <Card key={item.label} className="text-center p-6">
                <CardContent className="pt-0">
                  <p className="text-3xl font-bold text-primary">
                    {item.value}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {item.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* POPUP */}
      {selectedValue && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setSelectedValue(null)}
        >
          <div
            className="bg-background rounded-2xl shadow-xl max-w-sm w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setSelectedValue(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex flex-col items-center text-center gap-3">
              <CheckCircle className="h-10 w-10 text-primary" />
              <h3 className="text-lg font-bold">{selectedValue.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {selectedValue.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
