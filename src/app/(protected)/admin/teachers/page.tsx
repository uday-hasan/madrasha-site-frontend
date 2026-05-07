"use client";

import { useEffect, useState } from "react";
import { useTeacherStore } from "@/stores/teacherStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Edit2, Plus, CheckCircle, AlertCircle, X } from "lucide-react";
import { TeacherInput } from "@/api/teacher/teacher.service";

export default function AdminTeachersPage() {
  const {
    teachers,
    isLoading,
    isSubmitting,
    error,
    success,
    getAllTeachers,
    createTeacher,
    deleteTeacher,
    updateTeacher,
    clearError,
    clearSuccess,
  } = useTeacherStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<TeacherInput>({
    name: "",
    designation: "",
    department: "",
    education: "",
    experience: "",
    bio: "",
    phone: "",
    email: "",
    isActive: true,
    displayOrder: 0,
  });

  useEffect(() => {
    getAllTeachers();
  }, [getAllTeachers]);

  // Handle error from store and display in form
  useEffect(() => {
    if (error && isFormOpen) {
      setFormError(error);
    }
  }, [error, isFormOpen]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        clearSuccess();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, clearSuccess]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setFormError(null);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      designation: "",
      department: "",
      education: "",
      experience: "",
      bio: "",
      phone: "",
      email: "",
      isActive: true,
      displayOrder: 0,
    });
    setEditingId(null);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.designation) {
      setFormError("নাম এবং পদবি আবশ্যক।");
      return;
    }

    // Convert displayOrder to number
    const submitData = {
      ...formData,
      displayOrder: Number(formData.displayOrder) || 0,
    };

    if (editingId) {
      await updateTeacher(editingId, submitData);
    } else {
      await createTeacher(submitData);
    }

    // Only close form and reset if successful (no error)
    const hasError = useTeacherStore.getState().error;
    if (!hasError) {
      resetForm();
      setIsFormOpen(false);
    }
  };

  const handleEdit = (teacherId: string) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    if (teacher) {
      setFormData({
        name: teacher.name,
        designation: teacher.designation,
        department: teacher.department,
        education: teacher.education,
        experience: teacher.experience,
        bio: teacher.bio,
        phone: teacher.phone,
        email: teacher.email,
        isActive: teacher.isActive,
        displayOrder: teacher.displayOrder,
      });
      setEditingId(teacherId);
      setIsFormOpen(true);
    }
  };

  const handleDelete = async (teacherId: string) => {
    await deleteTeacher(teacherId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">শিক্ষকমণ্ডলী ব্যবস্থাপনা</h1>
          <p className="text-muted-foreground mt-1">
            শিক্ষক যোগ করুন, সম্পাদনা করুন এবং মুছে ফেলুন
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            clearError();
            setIsFormOpen(!isFormOpen);
          }}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          নতুন শিক্ষক যোগ করুন
        </Button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-800">{success}</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-800">{error}</span>
        </div>
      )}

      {/* Form */}
      {isFormOpen && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle>
              {editingId ? "শিক্ষক সম্পাদনা করুন" : "নতুন শিক্ষক যোগ করুন"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-800 text-sm font-medium">ত্রুটি:</p>
                  <p className="text-red-700 text-sm whitespace-pre-wrap">
                    {formError}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormError(null)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">শিক্ষকের নাম *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="উদাহরণ: মাওলানা আহমেদ"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="designation">পদবি *</Label>
                  <Input
                    id="designation"
                    name="designation"
                    placeholder="উদাহরণ: প্রধান শিক্ষক"
                    value={formData.designation}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="department">বিভাগ</Label>
                  <Input
                    id="department"
                    name="department"
                    placeholder="উদাহরণ: হিফজ বিভাগ"
                    value={formData.department}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="email">ইমেইল</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">ফোন নম্বর</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+880 1234567890"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="education">শিক্ষা</Label>
                  <Input
                    id="education"
                    name="education"
                    placeholder="উদাহরণ: এম এ (আরবি)"
                    value={formData.education}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">অভিজ্ঞতা</Label>
                  <Input
                    id="experience"
                    name="experience"
                    placeholder="উদাহরণ: ১৫ বছর"
                    value={formData.experience}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="displayOrder">প্রদর্শন ক্রম</Label>
                  <Input
                    id="displayOrder"
                    name="displayOrder"
                    type="number"
                    placeholder="0"
                    value={formData.displayOrder}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">জীবনী</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="শিক্ষক সম্পর্কে বিস্তারিত তথ্য..."
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
                <Label htmlFor="isActive" className="cursor-pointer">
                  সক্রিয় করুন
                </Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? "প্রক্রিয়াকরণ..."
                    : editingId
                      ? "আপডেট করুন"
                      : "যোগ করুন"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false);
                    resetForm();
                    clearError();
                  }}
                >
                  বাতিল করুন
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Teachers List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">শিক্ষকদের তালিকা</h2>

        {isLoading ? (
          <div className="grid gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : teachers.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                কোনো শিক্ষক পাওয়া যায়নি। প্রথমে একজন শিক্ষক যোগ করুন।
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="text-left p-3 font-semibold">নাম</th>
                  <th className="text-left p-3 font-semibold">পদবি</th>
                  <th className="text-left p-3 font-semibold">বিভাগ</th>
                  <th className="text-left p-3 font-semibold">ইমেইল</th>
                  <th className="text-left p-3 font-semibold">অবস্থা</th>
                  <th className="text-left p-3 font-semibold">ক্রিয়া</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="border-b hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-3">{teacher.name}</td>
                    <td className="p-3">{teacher.designation}</td>
                    <td className="p-3">{teacher.department || "-"}</td>
                    <td className="p-3 text-sm">{teacher.email || "-"}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${teacher.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {teacher.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                      </span>
                    </td>
                    <td className="p-3 space-x-2 flex">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(teacher.id)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogTitle>
                            শিক্ষক মুছে ফেলুন?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            এই শিক্ষককে মুছে ফেলতে চান? এই পদক্ষেপ পূর্ববত করা
                            যাবে না।
                          </AlertDialogDescription>
                          <div className="flex gap-2 justify-end mt-4">
                            <AlertDialogCancel>বাতিল করুন</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(teacher.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              মুছে ফেলুন
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
