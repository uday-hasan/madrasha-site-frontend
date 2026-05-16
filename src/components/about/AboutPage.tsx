"use client";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  aboutService,
  AboutValue,
  Achievement,
  ProposedBuilding,
  LeadershipMember,
  AboutQuote,
  AboutSection,
} from "@/api/about/about.service";
import { siteConfig } from "@/lib/constants/site-config";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Building2, Hammer, X } from "lucide-react";
import Image from "next/image";
import { useSettingsStore } from "@/stores/settingsStore";
import { teacherService } from "@/api/teacher/teacher.service";

export default function AboutPage() {
  const { getSettingsByCategory, fetchSettingsByCategory } = useSettingsStore();

  const [aboutSections, setAboutSections] = useState<AboutSection[]>([]);
  const [aboutValues, setAboutValues] = useState<AboutValue[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [proposedBuildings, setProposedBuildings] = useState<
    ProposedBuilding[]
  >([]);
  const [leadership, setLeadership] = useState<LeadershipMember[]>([]);
  const [aboutQuotes, setAboutQuotes] = useState<AboutQuote[]>([]);
  const [teachers, setTeachers] = useState<number>(0);
  const [notices, setNotices] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState<AboutValue | null>(null);

  useEffect(() => {
    fetchSettingsByCategory("about");
  }, [fetchSettingsByCategory]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Fetch all about data in parallel
        const [
          sectionsRes,
          valuesRes,
          achievementsRes,
          buildingsRes,
          leadershipRes,
          quotesRes,
          teachersRes,
        ] = await Promise.all([
          aboutService.getSections(),
          aboutService.getValues(),
          aboutService.getAchievements(),
          aboutService.getBuildings(),
          aboutService.getLeadership(),
          aboutService.getQuotes(),
          teacherService.getAllActive(),
        ]);

        setAboutSections(sectionsRes.data || []);
        setAboutValues(valuesRes.data || []);
        setAchievements(achievementsRes.data || []);
        setProposedBuildings(buildingsRes.data || []);
        setLeadership(leadershipRes.data || []);
        setAboutQuotes(quotesRes.data || []);
        setTeachers(teachersRes.data?.length || 0);
      } catch (error) {
        console.error("Failed to fetch about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const aboutSettings = getSettingsByCategory("about");

  const about = {
    title: aboutSettings.about_title || "আমাদের সম্পর্কে",
    subtitle:
      aboutSettings.about_description || "মাদরাসা দারুল আরকাম আল ইসলামিয়া",
    history:
      aboutSettings.about_history ||
      "মাদরাসা দারুল আরকাম আল ইসলামিয়া ২০২৪ সাল থেকে ইসলামী শিক্ষার আলো ছড়িয়ে দিচ্ছে।",
  };

  // Get first quote for founder's message section
  const firstQuote = aboutQuotes.length > 0 ? aboutQuotes[0] : null;

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

      {/* History & Founder's Message */}
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
                {firstQuote ? (
                  <>
                    <blockquote className="text-muted-foreground italic leading-relaxed">
                      &ldquo;{firstQuote.quote}&rdquo;
                    </blockquote>
                    <p className="mt-4 font-semibold">— {firstQuote.author}</p>
                  </>
                ) : (
                  <p className="text-muted-foreground">
                    কোনো বাণী পাওয়া যায়নি
                  </p>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* About Sections (Mission, Vision, Appeal) */}
      {aboutSections.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aboutSections.map((section, index) => (
                <AnimatedSection key={section.id} delay={index * 0.15}>
                  <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leadership Section */}
      {leadership.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="পরিচালনা পরিষদ"
              subtitle="আমাদের মাদরাসার নেতৃত্বদানকারী ব্যক্তিত্ব"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {leadership.map((member, i) => (
                <AnimatedSection key={member.id} delay={i * 0.1}>
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-8 pb-6">
                      {member.photoUrl ? (
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                          <Image
                            src={member.photoUrl}
                            alt={member.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl font-bold">
                          <Shield className="h-10 w-10" />
                        </div>
                      )}
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className="text-primary font-medium mt-1">
                        {member.designation}
                      </p>
                      {member.bio && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {member.bio}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      {aboutValues.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <SectionTitle title="আমাদের মূল্যবোধ" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {aboutValues.map((value, i) => (
                <AnimatedSection key={value.id} delay={i * 0.1}>
                  <Card
                    className="text-center p-4 cursor-pointer hover:shadow-md transition-shadow"
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
      )}

      {/* Facilities Section - Dynamic from AboutSections */}
      {(() => {
        const facilitiesSection = aboutSections.find(
          (s) => s.slug === "benefits" || s.slug === "facilities",
        );
        return facilitiesSection ? (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <SectionTitle
                title={facilitiesSection.title}
                subtitle={facilitiesSection.description}
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
        ) : (
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
        );
      })()}

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="আমাদের অর্জন"
              subtitle="আমাদের যাত্রার মাইলফলকগুলো"
            />
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
              <div className="space-y-8">
                {achievements.map((achievement, i) => (
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
      )}

      {/* Foundation Services Section - Dynamic from AboutSections */}
      {(() => {
        const servicesSection = aboutSections.find(
          (s) =>
            s.slug === "services" ||
            s.slug === "al-ashrof-foundation-services" ||
            s.slug === "foundation-services",
        );
        return servicesSection ? (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <SectionTitle title={servicesSection.title} />
              <div className="bg-card rounded-lg border p-6 md:p-8">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {servicesSection.description}
                </p>
              </div>
            </div>
          </section>
        ) : (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <SectionTitle title="আল আশরাফ ফাউন্ডেশনের সেবাসমূহ" />
              <p className="text-muted-foreground text-center">
                সেবাসমূহের তালিকা শীঘ্রই আপডেট করা হবে।
              </p>
            </div>
          </section>
        );
      })()}

      {/* Proposed Building Section */}
      {proposedBuildings.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="প্রস্তাবিত ভবন"
              subtitle="ভবিষ্যত পরিকল্পনা ও উন্নয়ন প্রকল্প"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proposedBuildings.map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 0.1}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative bg-primary/10 h-48 flex items-center justify-center overflow-hidden">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="w-full h-full object-cover object-center"
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
                      {project.estimatedCost && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {project.estimatedCost}
                        </p>
                      )}
                      {project.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {project.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* At a Glance Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="এক নজরে মাদ্রাসা" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "প্রতিষ্ঠাকাল", value: siteConfig.foundedYear },
              {
                label: "অভিজ্ঞ শিক্ষক",
                value: `${loading ? "-" : teachers}জন`,
              },
              { label: "বিভাগ", value: `${siteConfig.totalDepartments}টি` },
              {
                label: "মোট শিক্ষার্থী",
                value: `${siteConfig.totalStudents}+`,
              },
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

      {/* Modal for Values */}
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
                {selectedValue.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
