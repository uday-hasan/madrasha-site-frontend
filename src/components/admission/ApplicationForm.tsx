"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/shared/PageHeader";
import { Loader2 } from "lucide-react";
import {
  applicationService,
  ApplicationFormData,
} from "@/api/application/application.service";
import { departmentService } from "@/api/department/department.service";

interface Department {
  id: string;
  name: string;
}

export function ApplicationFormComponent() {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [departmentsLoading, setDepartmentsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "ONLINE">("CASH");

  const [formData, setFormData] = useState<ApplicationFormData>({
    studentName: "",
    studentEmail: "",
    studentPhone: "",
    fatherName: "",
    fatherPhone: "",
    dateOfBirth: "",
    presentAddress: "",
    permanentAddress: "",
    departmentId: "",
    paymentMethod: "CASH",
    notes: "",
  });

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = (await departmentService.getAll({
          limit: 100,
        })) as any;
        setDepartments(response.data || []);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
        toast.error("বিভাগসমূহ লোড করতে ব্যর্থ");
      } finally {
        setDepartmentsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDepartmentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      departmentId: value,
    }));
  };

  const handlePaymentMethodChange = (value: "CASH" | "ONLINE") => {
    setPaymentMethod(value);
    setFormData((prev) => ({
      ...prev,
      paymentMethod: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (
      !formData.studentName ||
      !formData.studentEmail ||
      !formData.studentPhone ||
      !formData.fatherName ||
      !formData.fatherPhone ||
      !formData.dateOfBirth ||
      !formData.presentAddress ||
      !formData.permanentAddress ||
      !formData.departmentId
    ) {
      toast.error("সকল বাধ্যতামূলক ক্ষেত্র পূরণ করুন");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.studentEmail)) {
      toast.error("বৈধ ইমেইল ঠিকানা প্রবেশ করুন");
      return;
    }

    // Phone validation (basic)
    if (formData.studentPhone.length < 10) {
      toast.error("বৈধ ফোন নম্বর প্রবেশ করুন");
      return;
    }

    try {
      setLoading(true);
      const response = await applicationService.submitApplication(formData);

      if (response) {
        toast.success("আবেদন সফলভাবে জমা দেওয়া হয়েছে!");
        // Redirect to a success page or back to admission
        setTimeout(() => {
          router.push("/admission");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Failed to submit application:", error);
      toast.error(
        error?.message || "আবেদন জমা দিতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="অনলাইন আবেদন ফর্ম"
        subtitle="মাদ্রাসায় ভর্তির জন্য অনলাইনে আবেদন করুন"
      />

      <section className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>শিক্ষার্থীর তথ্য</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">ব্যক্তিগত তথ্য</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentName">শিক্ষার্থীর নাম *</Label>
                      <Input
                        id="studentName"
                        name="studentName"
                        placeholder="আপনার নাম লিখুন"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">জন্ম তারিখ *</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentEmail">ইমেইল *</Label>
                      <Input
                        id="studentEmail"
                        name="studentEmail"
                        type="email"
                        placeholder="আপনার ইমেইল"
                        value={formData.studentEmail}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentPhone">ফোন নম্বর *</Label>
                      <Input
                        id="studentPhone"
                        name="studentPhone"
                        placeholder="আপনার ফোন নম্বর"
                        value={formData.studentPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Father's Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">অভিভাবকের তথ্য</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fatherName">পিতার নাম *</Label>
                      <Input
                        id="fatherName"
                        name="fatherName"
                        placeholder="আপনার পিতার নাম"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fatherPhone">পিতার ফোন নম্বর *</Label>
                      <Input
                        id="fatherPhone"
                        name="fatherPhone"
                        placeholder="পিতার ফোন নম্বর"
                        value={formData.fatherPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">ঠিকানা</h3>

                  <div className="space-y-2">
                    <Label htmlFor="presentAddress">বর্তমান ঠিকানা *</Label>
                    <Textarea
                      id="presentAddress"
                      name="presentAddress"
                      placeholder="বর্তমান ঠিকানা প্রবেশ করুন"
                      value={formData.presentAddress}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="permanentAddress">স্থায়ী ঠিকানা *</Label>
                    <Textarea
                      id="permanentAddress"
                      name="permanentAddress"
                      placeholder="স্থায়ী ঠিকানা প্রবেশ করুন"
                      value={formData.permanentAddress}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </div>
                </div>

                {/* Department Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">বিভাগ নির্বাচন</h3>

                  <div className="space-y-2">
                    <Label htmlFor="departmentId">বিভাগ *</Label>
                    <Select
                      value={formData.departmentId}
                      onValueChange={handleDepartmentChange}
                      disabled={departmentsLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="একটি বিভাগ নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    অর্থ প্রদানের পদ্ধতি
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="payment-cash"
                        name="paymentMethod"
                        value="CASH"
                        checked={paymentMethod === "CASH"}
                        onChange={() => handlePaymentMethodChange("CASH")}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <Label
                        htmlFor="payment-cash"
                        className="cursor-pointer ml-2 font-normal"
                      >
                        নগদ অর্থ (সরাসরি ইনস্টিটিউটে)
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="payment-online"
                        name="paymentMethod"
                        value="ONLINE"
                        checked={paymentMethod === "ONLINE"}
                        onChange={() => handlePaymentMethodChange("ONLINE")}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <Label
                        htmlFor="payment-online"
                        className="cursor-pointer ml-2 font-normal"
                      >
                        অনলাইন অর্থ প্রদান
                      </Label>
                    </div>
                  </div>

                  {paymentMethod === "ONLINE" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-800">
                      আপনি অনলাইন পেমেন্ট পদ্ধতি নির্বাচন করেছেন। আবেদন জমার পর
                      আপনাকে পেমেন্ট লিঙ্কের মাধ্যমে অর্থ প্রদান করতে হবে।
                    </div>
                  )}

                  {paymentMethod === "CASH" && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3 text-sm text-green-800">
                      আপনি নগদ অর্থ প্রদানের বিকল্প নির্বাচন করেছেন। ইনস্টিটিউটে
                      সরাসরি গিয়ে নগদ অর্থ প্রদান করতে পারবেন।
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">অতিরিক্ত তথ্য (ঐচ্ছিক)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="কোনো অতিরিক্ত তথ্য থাকলে এখানে লিখুন"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading || departmentsLoading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      আবেদন জমা হচ্ছে...
                    </>
                  ) : (
                    "আবেদন জমা দিন"
                  )}
                </Button>

                {/* Terms */}
                <div className="text-xs text-muted-foreground">
                  আবেদন জমা দিয়ে আপনি আমাদের শর্তাবলী এবং গোপনীয়তা নীতিতে
                  সম্মতি জানাচ্ছেন।
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
