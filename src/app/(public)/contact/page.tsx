"use client";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { useContactStore } from "@/stores/contactStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const { contactInfo, fetchContactInfo, submitContactForm, isSubmitting, submitSuccess } = useContactStore();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });

  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitContactForm(formData);
  };

  return (
    <>
      <PageHeader
        title="যোগাযোগ"
        subtitle="আমাদের সাথে যোগাযোগ করুন"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionTitle title="যোগাযোগের তথ্য" centered={false} />

              <div className="space-y-6">
                {contactInfo && (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">ঠিকানা</p>
                        <p className="text-muted-foreground">
                          {contactInfo.address}, {contactInfo.city}, {contactInfo.district}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">ফোন</p>
                        {contactInfo.phone.map((phone) => (
                          <p key={phone} className="text-muted-foreground" dir="ltr">{phone}</p>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">ইমেইল</p>
                        {contactInfo.email.map((email) => (
                          <p key={email} className="text-muted-foreground">{email}</p>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">অফিস সময়</p>
                        <p className="text-muted-foreground">{contactInfo.officeHours}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <SectionTitle title="বার্তা পাঠান" centered={false} />

              {submitSuccess ? (
                <Card className="text-center p-8">
                  <CardContent>
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">বার্তা পাঠানো হয়েছে!</h3>
                    <p className="text-muted-foreground">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">আপনার নাম *</Label>
                      <Input
                        id="name"
                        placeholder="নাম লিখুন"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">ফোন নম্বর</Label>
                      <Input
                        id="phone"
                        placeholder="ফোন নম্বর"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">ইমেইল</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ইমেইল ঠিকানা"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">বিষয় *</Label>
                    <Input
                      id="subject"
                      placeholder="বার্তার বিষয়"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">বার্তা *</Label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="আপনার বার্তা লিখুন"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
