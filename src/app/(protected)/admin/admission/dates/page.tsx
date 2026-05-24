"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, Trash2, Edit2, Plus, Calendar } from "lucide-react";
import {
  admissionService,
  type AdmissionImportantDate,
} from "@/api/admission/admission.service";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";

export default function AdminAdmissionImportantDatesPage() {
  const [dates, setDates] = useState<AdmissionImportantDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AdmissionImportantDate>({
    event: "",
    date: "",
    displayOrder: 0,
  });

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = (await admissionService.getImportantDates()) as any;
      setDates(response.data || []);
    } catch (error) {
      console.error("Failed to fetch dates:", error);
      toast.error("তারিখ লোড করতে ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (date?: AdmissionImportantDate) => {
    if (date) {
      setEditingId(date.id || null);
      setFormData(date);
    } else {
      setEditingId(null);
      setFormData({
        event: "",
        date: "",
        displayOrder: dates.length,
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "displayOrder" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.event.trim() || !formData.date.trim()) {
      toast.error("সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন");
      return;
    }

    try {
      setSubmitting(true);
      if (editingId) {
        await admissionService.updateImportantDate(editingId, formData);
        toast.success("তারিখ আপডেট করা হয়েছে");
      } else {
        await admissionService.createImportantDate(formData);
        toast.success("তারিখ যোগ করা হয়েছে");
      }
      handleCloseDialog();
      fetchDates();
    } catch (error) {
      console.error("Failed to save date:", error);
      toast.error("তারিখ সংরক্ষণ করতে ব্যর্থ");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("এই তারিখ মুছে ফেলতে চান?")) return;

    try {
      await admissionService.deleteImportantDate(id);
      toast.success("তারিখ মুছে ফেলা হয়েছে");
      fetchDates();
    } catch (error) {
      console.error("Failed to delete date:", error);
      toast.error("তারিখ মুছে ফেলতে ব্যর্থ");
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
        title="গুরুত্বপূর্ণ তারিখ"
        subtitle="ভর্তি সম্পর্কিত গুরুত্বপূর্ণ তারিখগুলি পরিচালনা করুন"
      />

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex justify-between items-center">
            <SectionTitle title="সব তারিখ" centered={false} />
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              নতুন তারিখ যোগ করুন
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dates.map((date) => (
              <Card key={date.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">{date.event}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {date.date}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenDialog(date)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(date.id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {dates.length === 0 && (
              <Card className="md:col-span-2">
                <CardContent className="p-8 text-center text-muted-foreground">
                  কোন তারিখ নেই। নতুন একটি যোগ করুন।
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "তারিখ সম্পাদনা করুন" : "নতুন তারিখ যোগ করুন"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                ইভেন্ট বা কার্যক্রম *
              </label>
              <Input
                name="event"
                value={formData.event}
                onChange={handleChange}
                placeholder="উদাহরণ: ভর্তি ফরম বিতরণ শুরু"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">তারিখ *</label>
              <Input
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="উদাহরণ: १ জানুয়ারি २०२५"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                প্রদর্শনের ক্রম
              </label>
              <Input
                name="displayOrder"
                type="number"
                value={formData.displayOrder}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              বাতিল করুন
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  সংরক্ষণ করছে...
                </>
              ) : (
                "সংরক্ষণ করুন"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
