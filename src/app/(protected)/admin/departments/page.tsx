"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Loader2,
  Plus,
  Trash2,
  Edit,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Users,
  Clock,
  BookOpen,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useDepartmentStore } from "@/stores/departmentStore";
import { Department, DepartmentQuery } from "@/types/department";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ASSET_URL = process.env.NEXT_PUBLIC_ASSET_URL || "http://localhost:5000";

export default function DepartmentsAdminPage() {
  const {
    departments,
    isLoading,
    meta,
    fetchDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  } = useDepartmentStore();

  const [query, setQuery] = useState<DepartmentQuery>({ page: 1, limit: 10 });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    slug: string;
    description: string;
    duration: string;
    subjects: string;
    headTeacher: string;
    totalStudents: string;
    isActive: boolean;
    displayOrder: string;
    image: File | null;
  }>({
    name: "",
    slug: "",
    description: "",
    duration: "",
    subjects: "",
    headTeacher: "",
    totalStudents: "0",
    isActive: true,
    displayOrder: "0",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchDepartments(query);
  }, [query]);

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      duration: "",
      subjects: "",
      headTeacher: "",
      totalStudents: "0",
      isActive: true,
      displayOrder: "0",
      image: null,
    });
    setImagePreview(null);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\u0980-\u09FF]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("ছবির সাইজ ৫MB এর বেশি হতে পারবে না");
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const buildFormData = () => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("slug", formData.slug);
    form.append("description", formData.description);
    form.append("duration", formData.duration);
    form.append("subjects", JSON.stringify(formData.subjects.split(",").map((s) => s.trim()).filter(Boolean)));
    form.append("headTeacher", formData.headTeacher);
    form.append("totalStudents", formData.totalStudents);
    form.append("isActive", String(formData.isActive));
    form.append("displayOrder", formData.displayOrder);
    if (formData.image) {
      form.append("image", formData.image);
    }
    return form;
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.description) {
      toast.error("নাম ও বিবরণ আবশ্যক");
      return;
    }

    const form = buildFormData();
    const success = await createDepartment(form);
    if (success) {
      toast.success("বিভাগ সফলভাবে তৈরি হয়েছে");
      setIsAddOpen(false);
      resetForm();
    }
  };

  const handleUpdate = async () => {
    if (!selectedDepartment) return;
    if (!formData.name || !formData.description) {
      toast.error("নাম ও বিবরণ আবশ্যক");
      return;
    }

    const form = buildFormData();
    const success = await updateDepartment(selectedDepartment.id, form);
    if (success) {
      toast.success("বিভাগ সফলভাবে আপডেট হয়েছে");
      setIsEditOpen(false);
      resetForm();
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const success = await deleteDepartment(deleteId);
    if (success) {
      toast.success("বিভাগ মুছে ফেলা হয়েছে");
      setDeleteId(null);
    }
  };

  const openEdit = (dept: Department) => {
    setSelectedDepartment(dept);
    setFormData({
      name: dept.name,
      slug: dept.slug,
      description: dept.description,
      duration: dept.duration,
      subjects: dept.subjects?.join(", ") || "",
      headTeacher: dept.headTeacher || "",
      totalStudents: String(dept.totalStudents || 0),
      isActive: dept.isActive,
      displayOrder: String(dept.displayOrder || 0),
      image: null,
    });
    setImagePreview(dept.imageUrl || null);
    setIsEditOpen(true);
  };

  const openDetails = (dept: Department) => {
    setSelectedDepartment(dept);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">বিভাগ ব্যবস্থাপনা</h1>
          <p className="text-muted-foreground">
            সকল বিভাগ তৈরি, সম্পাদনা এবং মুছে ফেলুন
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              নতুন বিভাগ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>নতুন বিভাগ তৈরি করুন</DialogTitle>
            </DialogHeader>
            <DepartmentForm
              formData={formData}
              setFormData={setFormData}
              imagePreview={imagePreview}
              onNameChange={handleNameChange}
              onImageChange={handleImageChange}
              clearImage={clearImage}
              onSubmit={handleCreate}
              isLoading={isLoading}
              submitText="তৈরি করুন"
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="বিভাগ অনুসন্ধান..."
          className="max-w-sm"
          value={query.search || ""}
          onChange={(e) =>
            setQuery({ ...query, search: e.target.value, page: 1 })
          }
        />
        <Select
          value={query.isActive === undefined ? "all" : String(query.isActive)}
          onValueChange={(v) =>
            setQuery({
              ...query,
              isActive: v === "all" ? undefined : v === "true",
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="স্ট্যাটাস" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
            <SelectItem value="true">সক্রিয়</SelectItem>
            <SelectItem value="false">নিষ্ক্রিয়</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left">বিভাগ</th>
              <th className="p-3 text-left">সময়কাল</th>
              <th className="p-3 text-center">শিক্ষার্থী</th>
              <th className="p-3 text-center">স্ট্যাটাস</th>
              <th className="p-3 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                </td>
              </tr>
            ) : departments.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  কোনো বিভাগ পাওয়া যায়নি
                </td>
              </tr>
            ) : (
              departments.map((dept) => (
                <tr key={dept.id} className="border-t hover:bg-muted/50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded overflow-hidden bg-muted">
                        {dept.imageUrl ? (
                          <Image
                            src={dept.imageUrl.startsWith("http") ? dept.imageUrl : `${ASSET_URL}${dept.imageUrl}`}
                            alt={dept.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-6 w-6 m-3 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{dept.name}</div>
                        <div className="text-xs text-muted-foreground">/{dept.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {dept.duration}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="h-4 w-4" />
                      {dept.totalStudents}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    {dept.isActive ? (
                      <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="mx-auto h-5 w-5 text-red-500" />
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDetails(dept)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(dept)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => setDeleteId(dept.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={query.page === 1}
            onClick={() => setQuery({ ...query, page: (query.page || 1) - 1 })}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            পৃষ্ঠা {meta.page} / {meta.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={query.page === meta.totalPages}
            onClick={() => setQuery({ ...query, page: (query.page || 1) + 1 })}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>বিভাগ সম্পাদনা করুন</DialogTitle>
          </DialogHeader>
          <DepartmentForm
            formData={formData}
            setFormData={setFormData}
            imagePreview={imagePreview}
            onNameChange={handleNameChange}
            onImageChange={handleImageChange}
            clearImage={clearImage}
            onSubmit={handleUpdate}
            isLoading={isLoading}
            submitText="আপডেট করুন"
          />
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>বিভাগ বিবরণ</DialogTitle>
          </DialogHeader>
          {selectedDepartment && (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted">
                  {selectedDepartment.imageUrl ? (
                    <Image
                      src={selectedDepartment.imageUrl.startsWith("http") ? selectedDepartment.imageUrl : `${ASSET_URL}${selectedDepartment.imageUrl}`}
                      alt={selectedDepartment.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-12 w-12 m-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedDepartment.name}</h2>
                  <Badge variant={selectedDepartment.isActive ? "default" : "outline"}>
                    {selectedDepartment.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    স্ল্যাগ: {selectedDepartment.slug}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">সময়কাল</p>
                    <p className="font-medium">{selectedDepartment.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">মোট শিক্ষার্থী</p>
                    <p className="font-medium">{selectedDepartment.totalStudents}</p>
                  </div>
                </div>
              </div>

              {selectedDepartment.headTeacher && (
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">বিভাগীয় প্রধান</p>
                    <p className="font-medium">{selectedDepartment.headTeacher}</p>
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mb-2">বিবরণ</p>
                <p className="text-sm bg-muted p-3 rounded-lg">{selectedDepartment.description}</p>
              </div>

              {selectedDepartment.subjects && selectedDepartment.subjects.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">বিষয়সমূহ</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedDepartment.subjects.map((subject, idx) => (
                      <Badge key={idx} variant="outline">{subject}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                প্রদর্শন ক্রম: {selectedDepartment.displayOrder} | তৈরি: {new Date(selectedDepartment.createdAt).toLocaleDateString("bn-BD")}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Alert */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>বিভাগ মুছে ফেলুন</AlertDialogTitle>
            <AlertDialogDescription>
              আপনি কি নিশ্চিত যে এই বিভাগটি মুছে ফেলতে চান? এই কাজটি অপরিবর্তনীয়।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>বাতিল</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              মুছে ফেলুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Form Component
function DepartmentForm({
  formData,
  setFormData,
  imagePreview,
  onNameChange,
  onImageChange,
  clearImage,
  onSubmit,
  isLoading,
  submitText,
}: {
  formData: {
    name: string;
    slug: string;
    description: string;
    duration: string;
    subjects: string;
    headTeacher: string;
    totalStudents: string;
    isActive: boolean;
    displayOrder: string;
    image: File | null;
  };
  setFormData: React.Dispatch<React.SetStateAction<typeof formData>>;
  imagePreview: string | null;
  onNameChange: (name: string) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearImage: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  submitText: string;
}) {
  return (
    <div className="space-y-4 py-4">
      {/* Image Upload */}
      <div className="space-y-2">
        <Label>বিভাগের ছবি</Label>
        <div className="flex items-center gap-4">
          {imagePreview ? (
            <div className="relative h-24 w-24 rounded-lg overflow-hidden">
              <Image src={imagePreview} alt="Preview" fill className="object-cover" />
              <button
                onClick={clearImage}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div className="h-24 w-24 rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-1">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">ছবি নির্বাচন করুন</span>
            </div>
          )}
          <div className="flex-1">
            <Input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground mt-1">সর্বোচ্চ ৫MB</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">বিভাগের নাম *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="যেমন: হিফজ বিভাগ"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">স্ল্যাগ *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
            placeholder="যেমন: hifz"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">বিবরণ *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="বিভাগের বিস্তারিত বিবরণ"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">সময়কাল</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
            placeholder="যেমন: ৩ বছর"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="headTeacher">বিভাগীয় প্রধান</Label>
          <Input
            id="headTeacher"
            value={formData.headTeacher}
            onChange={(e) => setFormData((prev) => ({ ...prev, headTeacher: e.target.value }))}
            placeholder="প্রধান শিক্ষকের নাম"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="totalStudents">মোট শিক্ষার্থী</Label>
          <Input
            id="totalStudents"
            type="number"
            value={formData.totalStudents}
            onChange={(e) => setFormData((prev) => ({ ...prev, totalStudents: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="displayOrder">প্রদর্শন ক্রম</Label>
          <Input
            id="displayOrder"
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData((prev) => ({ ...prev, displayOrder: e.target.value }))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subjects">বিষয়সমূহ (কমা দিয়ে আলাদা করুন)</Label>
        <Input
          id="subjects"
          value={formData.subjects}
          onChange={(e) => setFormData((prev) => ({ ...prev, subjects: e.target.value }))}
          placeholder="কুরআন, তাজবিদ, আরবি"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(v: boolean) => setFormData((prev) => ({ ...prev, isActive: v }))}
        />
        <Label htmlFor="isActive">সক্রিয় বিভাগ</Label>
      </div>

      <Button onClick={onSubmit} disabled={isLoading} className="w-full">
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : submitText}
      </Button>
    </div>
  );
}
