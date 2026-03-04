import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { fakeAdmissionInfo } from "@/lib/fake-data/admission-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, FileText, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "ভর্তি তথ্য",
  description: "দারুল উলুম মাদ্রাসায় ভর্তির তথ্য ও প্রয়োজনীয় কাগজপত্র।",
};

export default function AdmissionPage() {
  const admission = fakeAdmissionInfo;

  return (
    <>
      <PageHeader
        title="ভর্তি তথ্য"
        subtitle={`শিক্ষাবর্ষ ${admission.session}`}
      />

      {admission.isOpen && (
        <div className="bg-green-500 text-white py-3 text-center font-semibold">
          ভর্তি চলছে! শেষ তারিখ: {admission.endDate}
        </div>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <SectionTitle title="ভর্তি প্রক্রিয়া" centered={false} />
                <div className="space-y-4">
                  {admission.process.map((step, i) => (
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
                <SectionTitle title="বিভাগওয়ারি ভর্তির তথ্য" centered={false} />
                <div className="space-y-4">
                  {admission.requirements.map((req, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{req.department}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-semibold text-muted-foreground">বয়স:</p>
                            <p>{req.minimumAge}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-muted-foreground">আসন:</p>
                            <p>{req.seats}টি</p>
                          </div>
                          <div>
                            <p className="font-semibold text-muted-foreground">যোগ্যতা:</p>
                            <p>{req.minimumQualification}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-muted-foreground">মাসিক বেতন:</p>
                            <p className="text-primary font-semibold">{req.fees}</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-muted-foreground mb-2 text-sm">প্রয়োজনীয় কাগজপত্র:</p>
                          <div className="flex flex-wrap gap-2">
                            {req.documents.map((doc) => (
                              <Badge key={doc} variant="outline" className="text-xs">
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
                    {admission.importantDates.map((item, i) => (
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
                  <p className="text-sm opacity-90">শনি - বৃহস্পতি</p>
                  <p className="text-sm opacity-90">সকাল ৮টা - বিকেল ৪টা</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
