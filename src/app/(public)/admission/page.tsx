import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import {
  fakeAdmissionInfo,
  admissionApplicationFee,
  admissionRequiredDocuments,
  admissionDressCode,
  admissionFoodMenu,
  admissionHolidays,
} from "@/lib/fake-data/admission-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, FileText, Clock, Shirt, Utensils, UtensilsCrossed } from "lucide-react";
import { siteConfig } from "@/lib/constants/site-config";

export const metadata: Metadata = {
  title: "ভর্তি তথ্য",
  description: `${siteConfig.name} ভর্তির তথ্য ও প্রয়োজনীয় কাগজপত্র।`,
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

      {/* Application Fee Highlight */}
      <div className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold">
            📋 আবেদন ফরমের মূল্য: <span className="text-xl font-bold">{admissionApplicationFee}</span>
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Admission Process */}
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

              {/* Required Documents */}
              <div>
                <SectionTitle title="প্রয়োজনীয় কাগজপত্র" centered={false} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {admissionRequiredDocuments.map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                      <FileText className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department-wise Requirements */}
              <div>
                <SectionTitle
                  title="বিভাগওয়ারি ভর্তির তথ্য"
                  centered={false}
                />
                <div className="space-y-4">
                  {admission.requirements.map((req, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">
                          {req.department}
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

            {/* Sidebar */}
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

      {/* Dress Code Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="ড্রেসকোড"
            subtitle="প্রতিষ্ঠানের নির্ধারিত পোশাক বিধিমালা"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Boys */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shirt className="h-5 w-5 text-primary" />
                  {admissionDressCode.boys.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {admissionDressCode.boys.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Girls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shirt className="h-5 w-5 text-primary" />
                  {admissionDressCode.girls.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {admissionDressCode.girls.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          {admissionDressCode.note && (
            <p className="text-center text-sm text-muted-foreground mt-6 max-w-xl mx-auto">
              ℹ️ {admissionDressCode.note}
            </p>
          )}
        </div>
      </section>

      {/* Food Menu Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="খাদ্য ও টিফিন তালিকা"
            subtitle="আবাসিক শিক্ষার্থীদের জন্য স্বাস্থ্যসম্মত খাবারের ব্যবস্থা"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { label: "সকালের নাস্তা", value: admissionFoodMenu.breakfast, icon: "🥣" },
              { label: "দুপুরের খাবার", value: admissionFoodMenu.lunch, icon: "🍛" },
              { label: "রাতের খাবার", value: admissionFoodMenu.dinner, icon: "🍽️" },
              { label: "টিফিন", value: admissionFoodMenu.tiffin, icon: "🍌", wide: true },
              { label: "বিশেষ খাবার", value: admissionFoodMenu.special, icon: "⭐", wide: true },
            ].map((item, i) => (
              <Card key={i} className={item.wide ? "sm:col-span-2 lg:col-span-1" : ""}>
                <CardContent className="p-5">
                  <p className="text-2xl mb-2">{item.icon}</p>
                  <h3 className="font-semibold text-sm mb-1 text-primary">{item.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Holiday Schedule Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="বার্ষিক ছুটি পরিক্রমা"
            subtitle="শিক্ষাবর্ষের বার্ষিক ছুটির তালিকা"
          />
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-primary text-primary-foreground">
                        <th className="text-left p-4 font-semibold">অনুষ্ঠান/কারণ</th>
                        <th className="text-right p-4 font-semibold">ছুটির দিন</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admissionHolidays.map((holiday, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                          <td className="p-4 text-foreground">{holiday.event}</td>
                          <td className="p-4 text-right font-medium text-primary">{holiday.days}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
