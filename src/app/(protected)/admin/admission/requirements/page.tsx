/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader, Trash2, Edit2, Plus, X } from "lucide-react";
import {
  admissionService,
  type AdmissionRequirement,
} from "@/api/admission/admission.service";
import { departmentService } from "@/api/department/department.service";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

export default function AdminAdmissionRequirementsPage() {
  const [requirements, setRequirements] = useState<AdmissionRequirement[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newDocument, setNewDocument] = useState("");
  const [formData, setFormData] = useState<AdmissionRequirement>({
    departmentId: "",
    minimumAge: "",
    minimumQualification: "",
    documents: [],
    fees: "",
    seats: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reqRes, deptRes] = await Promise.all([
        admissionService.getRequirements() as any,
        departmentService.getAllDepartments(),
      ]);
      setRequirements(reqRes.data || []);
      setDepartments(deptRes.data || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("ডেটা লোড করতে ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (req?: AdmissionRequirement) => {
    if (req) {
      setEditingId(req.id || null);
      setFormData(req);
    } else {
      setEditingId(null);
      setFormData({
        departmentId: "",
        minimumAge: "",
        minimumQualification: "",
        documents: [],
        fees: "",
        seats: 0,
      });
    }
    setNewDocument("");
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditingId(null);
    setNewDocument("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "seats" ? parseInt(value) : value,
    });
  };

  const handleDepartmentChange = (value: string) => {
    setFormData({
      ...formData,
      departmentId: value,
    });
  };

  const addDocument = () => {
    if (!newDocument.trim()) return;
    setFormData({
      ...formData,
      documents: [...formData.documents, newDocument],
    });
    setNewDocument("");
  };

  const removeDocument = (index: number) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter((_, i) => i !== index),
    });
  };

  const getDepartmentName = (id: string) => {
    return departments.find((d) => d.id === id)?.name || "অজানা বিভাগ";
  };

  const handleSubmit = async () => {
    if (
      !formData.departmentId ||
      !formData.minimumAge ||
      !formData.minimumQualification ||
      !formData.fees ||
      formData.seats <= 0
    ) {
      toast.error("সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন");
      return;
    }

    try {
      setSubmitting(true);
      if (editingId) {
        await admissionService.updateRequirement(editingId, formData);
        toast.success("প্রয়োজনীয়তা আপডেট করা হয়েছে");
      } else {
        await admissionService.createRequirement(formData);
        toast.success("প্রয়োজনীয়তা যোগ করা হয়েছে");
      }
      handleCloseDialog();
      fetchData();
    } catch (error) {
      console.error("Failed to save requirement:", error);
      toast.error("প্রয়োজনীয়তা সংরক্ষণ করতে ব্যর্থ");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("এই প্রয়োজনীয়তা মুছে ফেলতে চান?")) return;

    try {
      await admissionService.deleteRequirement(id);
      toast("প্রয়োজনীয়তা মুছে ফেলা হয়েছে");
      fetchData();
    } catch (error) {
      console.error("Failed to delete requirement:", error);
      toast.error("প্রয়োজনীয়তা মুছে ফেলতে ব্যর্থ");
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
        title="বিভাগওয়ারি ভর্তির তথ্য"
        subtitle="প্রতিটি বিভাগের ভর্তি প্রয়োজনীয়তা পরিচালনা করুন"
      />

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex justify-between items-center">
            <SectionTitle title="সব প্রয়োজনীয়তা" centered={false} />
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              নতুন প্রয়োজনীয়তা যোগ করুন
            </Button>
          </div>

          <div className="space-y-4">
            {requirements.map((req) => (
              <Card key={req.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">
                        {getDepartmentName(req.departmentId as string)}
                      </h3>
                      <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                        <div>
                          <p className="text-muted-foreground font-medium">
                            বয়স
                          </p>
                          <p>{req.minimumAge}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-medium">
                            আসন
                          </p>
                          <p>{req.seats}টি</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-medium">
                            যোগ্যতা
                          </p>
                          <p className="text-sm">{req.minimumQualification}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-medium">
                            বেতন
                          </p>
                          <p className="text-primary font-semibold">
                            {req.fees}
                          </p>
                        </div>
                      </div>
                      {req.documents.length > 0 && (
                        <div className="mt-3">
                          <p className="text-muted-foreground font-medium text-sm mb-2">
                            প্রয়োজনীয় কাগজপত্র:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {req.documents.map((doc, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenDialog(req)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(req.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {requirements.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  কোন প্রয়োজনীয়তা নেই। নতুন একটি যোগ করুন।
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingId
                ? "প্রয়োজনীয়তা সম্পাদনা করুন"
                : "নতুন প্রয়োজনীয়তা যোগ করুন"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Department Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                বিভাগ নির্বাচন করুন *
              </label>
              <Select
                value={formData.departmentId}
                onValueChange={handleDepartmentChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="বিভাগ বেছে নিন..." />
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

            {/* Minimum Age */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                নূন্যতম বয়স *
              </label>
              <Input
                name="minimumAge"
                value={formData.minimumAge}
                onChange={handleChange}
                placeholder="উদাহরণ: ৪-৭ বছর"
              />
            </div>

            {/* Minimum Qualification */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                নূন্যতম যোগ্যতা *
              </label>
              <Textarea
                name="minimumQualification"
                value={formData.minimumQualification}
                onChange={handleChange}
                placeholder="উদাহরণ: কোনো পূর্ব যোগ্যতার প্রয়োজন নেই"
                rows={2}
              />
            </div>

            {/* Fees */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">মাসিক বেতন *</label>
              <Input
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                placeholder="উদাহরণ: মাসিক ৫০০ টাকা"
              />
            </div>

            {/* Seats */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">মোট আসন *</label>
              <Input
                name="seats"
                type="number"
                value={formData.seats}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            {/* Documents */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                প্রয়োজনীয় কাগজপত্র
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newDocument}
                  onChange={(e) => setNewDocument(e.target.value)}
                  placeholder="কাগজপত্র যোগ করুন..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addDocument();
                    }
                  }}
                />
                <Button type="button" onClick={addDocument} variant="outline">
                  যোগ করুন
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.documents.map((doc, idx) => (
                  <Badge key={idx} variant="secondary">
                    {doc}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => removeDocument(idx)}
                    />
                  </Badge>
                ))}
              </div>
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
