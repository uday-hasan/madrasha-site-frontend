"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import { useContactStore } from "@/stores/contactStore";
import { contactService, ContactInfo } from "@/api/contact/contact.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactAdminPage() {
  const { contactInfo, isLoading, fetchContactInfo } = useContactStore();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<ContactInfo>({
    address: "",
    city: "",
    district: "",
    phone: [],
    email: [],
    officeHours: "",
    googleMapsUrl: undefined,
  });

  const [phoneInput, setPhoneInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  useEffect(() => {
    if (contactInfo) {
      setFormData({
        address: contactInfo.address || "",
        city: contactInfo.city || "",
        district: contactInfo.district || "",
        phone: contactInfo.phone || [],
        email: contactInfo.email || [],
        officeHours: contactInfo.officeHours || "",
        googleMapsUrl: contactInfo.googleMapsUrl || undefined,
      });
    }
  }, [contactInfo]);

  const handleAddPhone = () => {
    if (phoneInput.trim()) {
      setFormData({
        ...formData,
        phone: [...formData.phone, phoneInput.trim()],
      });
      setPhoneInput("");
    }
  };

  const handleRemovePhone = (index: number) => {
    setFormData({
      ...formData,
      phone: formData.phone.filter((_, i) => i !== index),
    });
  };

  const handleAddEmail = () => {
    if (emailInput.trim()) {
      setFormData({
        ...formData,
        email: [...formData.email, emailInput.trim()],
      });
      setEmailInput("");
    }
  };

  const handleRemoveEmail = (index: number) => {
    setFormData({
      ...formData,
      email: formData.email.filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await contactService.updateContactData(formData);
      await fetchContactInfo();
      toast.success("যোগাযোগ তথ্য সফলভাবে আপডেট হয়েছে");
    } catch (err) {
      toast.error("আপডেট ব্যর্থ হয়েছে");
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">যোগাযোগ পৃষ্ঠা ব্যবস্থাপনা</h1>
        <p className="text-muted-foreground">
          যোগাযোগের সকল তথ্য এখানে সম্পাদনা করুন
        </p>
      </div>

      {/* Address Info */}
      <Card>
        <CardHeader>
          <CardTitle>ঠিকানা তথ্য</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>ঠিকানা</Label>
            <Input
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="মাদরাসার সম্পূর্ণ ঠিকানা"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>শহর</Label>
              <Input
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="শহরের নাম"
              />
            </div>
            <div className="space-y-2">
              <Label>জেলা</Label>
              <Input
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
                placeholder="জেলার নাম"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>গুগল ম্যাপস URL</Label>
            <Input
              value={formData.googleMapsUrl || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  googleMapsUrl: e.target.value || undefined,
                })
              }
              placeholder="https://maps.google.com/..."
              type="url"
            />
          </div>
        </CardContent>
      </Card>

      {/* Phone Numbers */}
      <Card>
        <CardHeader>
          <CardTitle>ফোন নম্বরসমূহ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="ফোন নম্বর যোগ করুন"
              dir="ltr"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddPhone();
                }
              }}
            />
            <Button onClick={handleAddPhone} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.phone.map((phone, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded"
              >
                <span dir="ltr">{phone}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePhone(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Addresses */}
      <Card>
        <CardHeader>
          <CardTitle>ইমেইল ঠিকানাসমূহ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="ইমেইল ঠিকানা যোগ করুন"
              type="email"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddEmail();
                }
              }}
            />
            <Button onClick={handleAddEmail} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.email.map((email, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded"
              >
                <span>{email}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveEmail(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Office Hours */}
      <Card>
        <CardHeader>
          <CardTitle>অন্যান্য তথ্য</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>অফিস সময়</Label>
            <Input
              value={formData.officeHours}
              onChange={(e) =>
                setFormData({ ...formData, officeHours: e.target.value })
              }
              placeholder="যেমন: সকাল ৮টা - বিকেল ৫টা"
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={isSaving} className="w-full">
        {isSaving ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            সংরক্ষণ করা হচ্ছে...
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            সকল পরিবর্তন সংরক্ষণ করুন
          </>
        )}
      </Button>
    </div>
  );
}
