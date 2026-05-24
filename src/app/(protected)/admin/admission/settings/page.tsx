/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { Loader } from "lucide-react";
import {
  admissionService,
  type AdmissionSettings,
} from "@/api/admission/admission.service";
import { toast } from "react-toastify";

export default function AdminAdmissionSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<AdmissionSettings>({
    isOpen: true,
    session: "",
    startDate: "",
    endDate: "",
    officeHoursStart: "",
    officeHoursEnd: "",
    officeHoursDays: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = (await admissionService.getSettings()) as any;
        if (response.data) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        toast.error("সেটিংস লোড করতে ব্যর্থ");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await admissionService.updateSettings(formData);
      toast.success("সেটিংস আপডেট করা হয়েছে");
    } catch (error) {
      console.error("Failed to update settings:", error);
      toast.error("সেটিংস আপডেট করতে ব্যর্থ");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="ভর্তি সেটিংস"
        subtitle="ভর্তি সম্পর্কিত সাধারণ সেটিংস পরিচালনা করুন"
      />

      <section className="py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>ভর্তি তথ্য সম্পাদনা</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Admission Status */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={formData.isOpen}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("isOpen", checked as boolean)
                      }
                    />
                    <span className="font-medium">ভর্তি খোলা আছে</span>
                  </label>
                </div>

                {/* Session */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    শিক্ষাবর্ষ (যেমন: २०२५-२०२६)
                  </label>
                  <Input
                    name="session"
                    value={formData.session}
                    onChange={handleChange}
                    placeholder="२०२५-२०२६"
                  />
                </div>

                {/* Start Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    শুরুর তারিখ
                  </label>
                  <Input
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    placeholder="२०२५ সালের १ জানুয়ারি"
                  />
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">শেষ তারিখ</label>
                  <Input
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    placeholder="२०२५ সালের ३१ মার্চ"
                  />
                </div>

                {/* Office Hours Days */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    অফিস খোলার দিন (যেমন: শনি - বৃহস্পতি)
                  </label>
                  <Input
                    name="officeHoursDays"
                    value={formData.officeHoursDays}
                    onChange={handleChange}
                    placeholder="শনি - বৃহস্পতি"
                  />
                </div>

                {/* Office Hours Start */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    অফিস শুরুর সময় (যেমন: সকাল ৮টা)
                  </label>
                  <Input
                    name="officeHoursStart"
                    value={formData.officeHoursStart}
                    onChange={handleChange}
                    placeholder="সকাল ৮টা"
                  />
                </div>

                {/* Office Hours End */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    অফিস বন্ধের সময় (যেমন: বিকেল ४টা)
                  </label>
                  <Input
                    name="officeHoursEnd"
                    value={formData.officeHoursEnd}
                    onChange={handleChange}
                    placeholder="বিকেল ४टा"
                  />
                </div>

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      সংরক্ষণ করছে...
                    </>
                  ) : (
                    "সংরক্ষণ করুন"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
