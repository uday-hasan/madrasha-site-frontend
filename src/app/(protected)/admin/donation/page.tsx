/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2, Plus, Trash2, Edit, Save } from "lucide-react";
import { useDonationStore } from "@/stores/useDonationStore";
import {
  donationService,
  DonationCategory,
  DonationMethod,
} from "@/api/donation/donation.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DonationAdminPage() {
  const { data, loading, fetchDonationData } = useDonationStore();
  const [isSaving, setIsSaving] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<DonationCategory | null>(null);
  const [editingMethod, setEditingMethod] = useState<DonationMethod | null>(
    null,
  );
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isMethodDialogOpen, setIsMethodDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    pageTitle: "",
    pageDescription: "",
    bannerText: "",
    quranicVerse: { arabic: "", bangla: "", reference: "" },
    categories: [] as DonationCategory[],
    methods: [] as DonationMethod[],
    contactForDonation: { phone: "", email: "", note: "" },
  });

  useEffect(() => {
    fetchDonationData();
  }, [fetchDonationData]);

  useEffect(() => {
    if (data) {
      setFormData({
        pageTitle: data.pageTitle || "",
        pageDescription: data.pageDescription || "",
        bannerText: data.bannerText || "",
        quranicVerse: data.quranicVerse || {
          arabic: "",
          bangla: "",
          reference: "",
        },
        categories: (data.categories as DonationCategory[]) || [],
        methods: (data.methods as DonationMethod[]) || [],
        contactForDonation: data.contactForDonation || {
          phone: "",
          email: "",
          note: "",
        },
      });
    }
  }, [data]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await donationService.updateDonationData(formData);
      await fetchDonationData();
      toast.success("দান তথ্য সফলভাবে আপডেট হয়েছে");
    } catch (err) {
      toast.error("আপডেট ব্যর্থ হয়েছে");
    }
    setIsSaving(false);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsCategoryDialogOpen(true);
  };

  const handleSaveCategory = (category: DonationCategory) => {
    if (editingCategory) {
      setFormData({
        ...formData,
        categories: formData.categories.map((c) =>
          c.id === editingCategory.id ? category : c,
        ),
      });
    } else {
      setFormData({
        ...formData,
        categories: [
          ...formData.categories,
          { ...category, id: Date.now().toString() },
        ],
      });
    }
    setIsCategoryDialogOpen(false);
    toast.success("বিভাগ সংরক্ষিত হয়েছে");
  };

  const handleDeleteCategory = (id: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((c) => c.id !== id),
    });
    toast.success("বিভাগ মুছে ফেলা হয়েছে");
  };

  const handleAddMethod = () => {
    setEditingMethod(null);
    setIsMethodDialogOpen(true);
  };

  const handleSaveMethod = (method: DonationMethod) => {
    if (editingMethod) {
      setFormData({
        ...formData,
        methods: formData.methods.map((m) =>
          m.id === editingMethod.id ? method : m,
        ),
      });
    } else {
      setFormData({
        ...formData,
        methods: [
          ...formData.methods,
          { ...method, id: Date.now().toString() },
        ],
      });
    }
    setIsMethodDialogOpen(false);
    toast.success("পদ্ধতি সংরক্ষিত হয়েছে");
  };

  const handleDeleteMethod = (id: string) => {
    setFormData({
      ...formData,
      methods: formData.methods.filter((m) => m.id !== id),
    });
    toast.success("পদ্ধতি মুছে ফেলা হয়েছে");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">দান পৃষ্ঠা ব্যবস্থাপনা</h1>
        <p className="text-muted-foreground">
          দান পৃষ্ঠার সকল তথ্য এখানে সম্পাদনা করুন
        </p>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>পৃষ্ঠা তথ্য</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>পৃষ্ঠা শিরোনাম</Label>
            <Input
              value={formData.pageTitle}
              onChange={(e) =>
                setFormData({ ...formData, pageTitle: e.target.value })
              }
              placeholder="পৃষ্ঠা শিরোনাম"
            />
          </div>
          <div className="space-y-2">
            <Label>পৃষ্ঠা বর্ণনা</Label>
            <Textarea
              value={formData.pageDescription}
              onChange={(e) =>
                setFormData({ ...formData, pageDescription: e.target.value })
              }
              placeholder="পৃষ্ঠার বিস্তারিত বর্ণনা"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>ব্যানার টেক্সট</Label>
            <Input
              value={formData.bannerText}
              onChange={(e) =>
                setFormData({ ...formData, bannerText: e.target.value })
              }
              placeholder="ব্যানারে দেখানো টেক্সট"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quranic Verse */}
      <Card>
        <CardHeader>
          <CardTitle>কোরআনের আয়াত</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>আরবি (Arabic)</Label>
            <Textarea
              value={formData.quranicVerse.arabic}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quranicVerse: {
                    ...formData.quranicVerse,
                    arabic: e.target.value,
                  },
                })
              }
              placeholder="আরবিতে আয়াত"
              rows={2}
              dir="rtl"
            />
          </div>
          <div className="space-y-2">
            <Label>বাংলা অনুবাদ</Label>
            <Textarea
              value={formData.quranicVerse.bangla}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quranicVerse: {
                    ...formData.quranicVerse,
                    bangla: e.target.value,
                  },
                })
              }
              placeholder="বাংলায় অনুবাদ"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>সূরা ও আয়াত নম্বর</Label>
            <Input
              value={formData.quranicVerse.reference}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quranicVerse: {
                    ...formData.quranicVerse,
                    reference: e.target.value,
                  },
                })
              }
              placeholder="যেমন: সূরা আল-বাকারা: ২৪৫"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>দানের খাতসমূহ</CardTitle>
          <Button onClick={handleAddCategory} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            নতুন খাত
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {formData.categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">{category.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingCategory(category);
                      setIsCategoryDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Methods */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>দানের মাধ্যমসমূহ</CardTitle>
          <Button onClick={handleAddMethod} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            নতুন মাধ্যম
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {formData.methods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">{method.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ধরন: {method.type}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingMethod(method);
                      setIsMethodDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteMethod(method.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact for Donation */}
      <Card>
        <CardHeader>
          <CardTitle>দানের জন্য যোগাযোগ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>ফোন নম্বর</Label>
            <Input
              value={formData.contactForDonation.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contactForDonation: {
                    ...formData.contactForDonation,
                    phone: e.target.value,
                  },
                })
              }
              placeholder="ফোন নম্বর"
              dir="ltr"
            />
          </div>
          <div className="space-y-2">
            <Label>ইমেইল</Label>
            <Input
              value={formData.contactForDonation.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contactForDonation: {
                    ...formData.contactForDonation,
                    email: e.target.value,
                  },
                })
              }
              placeholder="ইমেইল ঠিকানা"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label>নোট</Label>
            <Textarea
              value={formData.contactForDonation.note}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contactForDonation: {
                    ...formData.contactForDonation,
                    note: e.target.value,
                  },
                })
              }
              placeholder="যোগাযোগের সময় ইত্যাদি"
              rows={2}
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

      {/* Category Dialog */}
      <CategoryDialog
        open={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
        editing={editingCategory}
        onSave={handleSaveCategory}
      />

      {/* Method Dialog */}
      <MethodDialog
        open={isMethodDialogOpen}
        onOpenChange={setIsMethodDialogOpen}
        editing={editingMethod}
        onSave={handleSaveMethod}
      />
    </div>
  );
}

function CategoryDialog({
  open,
  onOpenChange,
  editing,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: DonationCategory | null;
  onSave: (category: DonationCategory) => void;
}) {
  const [formData, setFormData] = useState<DonationCategory>({
    id: "",
    title: "",
    description: "",
    icon: "",
  });

  useEffect(() => {
    if (editing) {
      setFormData(editing);
    } else {
      setFormData({
        id: Date.now().toString(),
        title: "",
        description: "",
        icon: "",
      });
    }
  }, [editing, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editing ? "খাত সম্পাদনা করুন" : "নতুন খাত যোগ করুন"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>শিরোনাম</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="খাতের নাম"
            />
          </div>
          <div className="space-y-2">
            <Label>বর্ণনা</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="খাতের বিবরণ"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label>আইকন (Lucide Icon নাম)</Label>
            <Input
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              placeholder="যেমন: Zakat, Scholarship, Building"
            />
          </div>
          <Button onClick={() => onSave(formData)} className="w-full">
            সংরক্ষণ করুন
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MethodDialog({
  open,
  onOpenChange,
  editing,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: DonationMethod | null;
  onSave: (method: DonationMethod) => void;
}) {
  const [formData, setFormData] = useState<DonationMethod>({
    id: "",
    type: "bank",
    name: "",
    details: {},
  });

  // details as editable key-value pairs
  const [detailRows, setDetailRows] = useState<
    { key: string; value: string }[]
  >([{ key: "", value: "" }]);

  useEffect(() => {
    if (editing) {
      setFormData({ ...editing, details: editing.details ?? {} });
      const rows = Object.entries(editing.details ?? {}).map(
        ([key, value]) => ({
          key,
          value,
        }),
      );
      setDetailRows(rows.length > 0 ? rows : [{ key: "", value: "" }]);
    } else {
      setFormData({
        id: Date.now().toString(),
        type: "bank",
        name: "",
        details: {},
      });
      setDetailRows([{ key: "", value: "" }]);
    }
  }, [editing, open]);

  const updateRow = (index: number, field: "key" | "value", val: string) => {
    setDetailRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: val } : row)),
    );
  };

  const addRow = () =>
    setDetailRows((prev) => [...prev, { key: "", value: "" }]);

  const removeRow = (index: number) =>
    setDetailRows((prev) => prev.filter((_, i) => i !== index));

  const handleSave = () => {
    const details: Record<string, string> = {};
    detailRows.forEach(({ key, value }) => {
      if (key.trim()) details[key.trim()] = value.trim();
    });
    onSave({ ...formData, details });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editing ? "মাধ্যম সম্পাদনা করুন" : "নতুন মাধ্যম যোগ করুন"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>নাম</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="যেমন: সোনালী ব্যাংক, বিকাশ (Personal)"
            />
          </div>

          <div className="space-y-2">
            <Label>ধরন</Label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as "bank" | "mobile" | "cash",
                })
              }
              className="w-full border rounded-md p-2 bg-background"
            >
              <option value="bank">ব্যাংক</option>
              <option value="mobile">মোবাইল ব্যাংকিং</option>
              <option value="cash">নগদ</option>
            </select>
          </div>

          {/* Dynamic key-value detail rows */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>বিস্তারিত তথ্য</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addRow}
              >
                <Plus className="h-3 w-3 mr-1" />
                সারি যোগ করুন
              </Button>
            </div>
            <div className="space-y-2">
              {detailRows.map((row, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    value={row.key}
                    onChange={(e) => updateRow(index, "key", e.target.value)}
                    placeholder="যেমন: হিসাব নম্বর"
                    className="flex-1"
                  />
                  <Input
                    value={row.value}
                    onChange={(e) => updateRow(index, "value", e.target.value)}
                    placeholder="মান"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRow(index)}
                    disabled={detailRows.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              বাম কলাম: লেবেল (যেমন: হিসাব নম্বর) | ডান কলাম: মান (যেমন:
              1611120044315)
            </p>
          </div>

          <Button onClick={handleSave} className="w-full">
            সংরক্ষণ করুন
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
