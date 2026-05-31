/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, FileText, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  admissionService,
  type AdmissionInfo,
} from "@/api/admission/admission.service";

export default function AdmissionPage() {
  const [admissionInfo, setAdmissionInfo] = useState<AdmissionInfo | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmissionInfo = async () => {
      try {
        setLoading(true);
        const response = (await admissionService.getFullAdmissionInfo()) as any;
        setAdmissionInfo(response.data);
      } catch (err) {
        console.error("Failed to fetch admission info:", err);
        setError("ভর্তি তথ্য লোড করতে ব্যর্থ হয়েছে");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissionInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error || !admissionInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error || "ডেটা লোড করতে পারা যায়নি"}</p>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="ভর্তি তথ্য"
        subtitle={`শিক্ষাবর্ষ ${admissionInfo.settings.session}`}
      />

      {admissionInfo.settings.isOpen && (
        <div className="bg-green-500 text-white py-3 text-center font-semibold">
          ভর্তি চলছে! শেষ তারিখ: {admissionInfo.settings.endDate}
        </div>
      )}

            <section className="py-8">
        <div className="container mx-auto px-4">
          <Link href="/application-form">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">অনলাইনে আবেদন করুন</h3>
                  <p className="text-muted-foreground">মাদ্রাসায় ভর্তির জন্য এখনই আবেদন করুন</p>
                </div>
                <Button size="lg" className="gap-2">
                  আবেদন করুন
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <SectionTitle title="ভর্তি প্রক্রিয়া" centered={false} />
                <div className="space-y-4">
                  {admissionInfo.processes.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-muted-foreground pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionTitle
                  title="বিভাগওয়ারি ভর্তির তথ্য"
                  centered={false}
                />
                <div className="space-y-4">
                  {admissionInfo.requirements.map((req, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">
                          {req.department?.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-semibold text-muted-foreground">
                              বয়স:
                            </p>
                            <p>{req.minimumAge}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-muted-foreground">
                              আসন:
                            </p>
                            <p>{req.seats}টি</p>
                          </div>
                          <div>
                            <p className="font-semibold text-muted-foreground">
                              যোগ্যতা:
                            </p>
                            <p>{req.minimumQualification}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-muted-foreground">
                              মাসিক বেতন:
                            </p>
                            <p className="text-primary font-semibold">
                              {req.fees}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-muted-foreground mb-2 text-sm">
                            প্রয়োজনীয় কাগজপত্র:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {req.documents.map((doc) => (
                              <Badge
                                key={doc}
                                variant="outline"
                                className="text-xs"
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    গুরুত্বপূর্ণ তারিখ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {admissionInfo.importantDates.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{item.event}</p>
                          <p className="text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <Clock className="h-10 w-10 mx-auto mb-3 opacity-80" />
                  <h3 className="font-bold text-lg mb-2">অফিস সময়</h3>
                  <p className="text-sm opacity-90">
                    {admissionInfo.settings.officeHoursDays}
                  </p>
                  <p className="text-sm opacity-90">
                    {admissionInfo.settings.officeHoursStart} -{" "}
                    {admissionInfo.settings.officeHoursEnd}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
