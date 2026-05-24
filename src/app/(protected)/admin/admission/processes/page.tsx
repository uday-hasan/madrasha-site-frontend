"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Trash2, Edit2, Plus } from "lucide-react";
import {
  admissionService,
  type AdmissionProcess,
} from "@/api/admission/admission.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";

export default function AdminAdmissionProcessesPage() {
  const [processes, setProcesses] = useState<AdmissionProcess[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AdmissionProcess>({
    step: "",
    displayOrder: 0,
  });

  useEffect(() => {
    fetchProcesses();
  }, []);

  const fetchProcesses = async () => {
    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = (await admissionService.getProcesses()) as any;
      setProcesses(response.data || []);
    } catch (error) {
      console.error("Failed to fetch processes:", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (process?: AdmissionProcess) => {
    if (process) {
      setEditingId(process.id || null);
      setFormData(process);
    } else {
      setEditingId(null);
      setFormData({
        step: "",
        displayOrder: processes.length,
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({ step: "", displayOrder: 0 });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "displayOrder" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.step.trim()) {
      toast.error("আবশ্যক");
      return;
    }

    try {
      setSubmitting(true);
      if (editingId) {
        await admissionService.updateProcess(editingId, formData);
        toast.success("প্রক্রিয়া আপডেট করা হয়েছে");
      } else {
        await admissionService.createProcess(formData);
        toast.success("প্রক্রিয়া যোগ করা হয়েছে");
      }
      handleCloseDialog();
      fetchProcesses();
    } catch (error) {
      console.error("Failed to save process:", error);
      toast.error("প্রক্রিয়া সংরক্ষণ করতে ব্যর্থ");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("এই প্রক্রিয়া মুছে ফেলতে চান?")) return;

    try {
      await admissionService.deleteProcess(id);
      toast.success("প্রক্রিয়া মুছে ফেলা হয়েছে");
      fetchProcesses();
    } catch (error) {
      console.error("Failed to delete process:", error);
      toast.error("প্রক্রিয়া মুছে ফেলতে ব্যর্থ");
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
        title="ভর্তি প্রক্রিয়া"
        subtitle="ভর্তির পদক্ষেপগুলি পরিচালনা করুন"
      />

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex justify-between items-center">
            <SectionTitle title="সব প্রক্রিয়া" centered={false} />
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              নতুন প্রক্রিয়া যোগ করুন
            </Button>
          </div>

          <div className="space-y-3">
            {processes.map((process, index) => (
              <Card key={process.id}>
                <CardContent className="p-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="font-medium">{process.step}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenDialog(process)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(process.id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {processes.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  কোন প্রক্রিয়া নেই। নতুন একটি যোগ করুন।
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
              {editingId
                ? "প্রক্রিয়া সম্পাদনা করুন"
                : "নতুন প্রক্রিয়া যোগ করুন"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                প্রক্রিয়া বর্ণনা *
              </label>
              <Textarea
                name="step"
                value={formData.step}
                onChange={handleChange}
                placeholder="এই ধাপ সম্পর্কে বর্ণনা করুন..."
                rows={4}
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
