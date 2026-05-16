"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Plus, Trash2, Edit, Loader2, Upload, X } from "lucide-react";
import { aboutService, ProposedBuilding } from "@/api/about/about.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function ProposedBuildingsManager() {
  const [buildings, setBuildings] = useState<ProposedBuilding[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    status: "Planning",
    estimatedCost: "",
    description: "",
    displayOrder: 0,
  });

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      const res = await aboutService.getAllBuildings();
      setBuildings(res.data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to load buildings");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (building?: ProposedBuilding) => {
    if (building) {
      setIsEditing(true);
      setEditingId(building.id);
      setFormData({
        title: building.title,
        imageUrl: building.imageUrl || "",
        status: building.status,
        estimatedCost: building.estimatedCost || "",
        description: building.description || "",
        displayOrder: building.displayOrder,
      });
      setPreviewUrl(building.imageUrl || null);
      setSelectedFile(null);
      setUploadMethod("url");
    } else {
      setIsEditing(false);
      setEditingId(null);
      setFormData({
        title: "",
        imageUrl: "",
        status: "Planning",
        estimatedCost: "",
        description: "",
        displayOrder: 0,
      });
      setPreviewUrl(null);
      setSelectedFile(null);
      setUploadMethod("file");
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      title: "",
      imageUrl: "",
      status: "Planning",
      estimatedCost: "",
      description: "",
      displayOrder: 0,
    });
    setPreviewUrl(null);
    setSelectedFile(null);
    setUploadMethod("file");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("ফাইলের সাইজ খুব বড়। সর্বোচ্চ ৫ এমবি অনুমোদিত।");
        return;
      }

      // Validate file type (image only)
      if (!file.type.startsWith("image/")) {
        toast.error("শুধুমাত্র ছবির ফাইল অনুমোদিত। ভিডিও নয়।");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const submitFormData = new FormData();
      submitFormData.append("title", formData.title);
      submitFormData.append("status", formData.status);
      submitFormData.append("estimatedCost", formData.estimatedCost);
      submitFormData.append("description", formData.description);
      submitFormData.append("displayOrder", String(formData.displayOrder));

      // Handle file or URL
      if (uploadMethod === "file") {
        if (selectedFile) {
          submitFormData.append("file", selectedFile);
        }
      } else if (uploadMethod === "url" && formData.imageUrl) {
        submitFormData.append("imageUrl", formData.imageUrl);
      }

      if (isEditing && editingId) {
        await aboutService.updateBuilding(editingId, submitFormData);
        toast.success("ভবন সফলভাবে আপডেট করা হয়েছে");
      } else {
        await aboutService.createBuilding(submitFormData);
        toast.success("ভবন সফলভাবে তৈরি করা হয়েছে");
      }

      handleCloseDialog();
      fetchBuildings();
    } catch (error: any) {
      toast.error(error.message || "অপারেশন ব্যর্থ");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি নিশ্চিত?")) return;
    try {
      await aboutService.deleteBuilding(id);
      toast.success("ভবন সফলভাবে ডিলিট করা হয়েছে");
      fetchBuildings();
    } catch (error: any) {
      toast.error(error.message || "ডিলিট ব্যর্থ");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">প্রস্তাবিত ভবন</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "ভবন সম্পাদনা" : "নতুন ভবন যোগ করুন"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">শিরোনাম</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>ছবি আপলোড পদ্ধতি</Label>
                <Select
                  value={uploadMethod}
                  onValueChange={(value) =>
                    setUploadMethod(value as "file" | "url")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="file">ফাইল আপলোড</SelectItem>
                    <SelectItem value="url">URL লিংক</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {uploadMethod === "file" ? (
                <div className="space-y-2">
                  <Label>ছবি নির্বাচন করুন</Label>
                  <p className="text-xs text-muted-foreground">
                    সর্বোচ্চ ৫ এমবি, শুধুমাত্র ছবি
                  </p>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-slate-50 transition-colors">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground mb-2">
                      ক্লিক করে ছবি নির্বাচন করুন
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                  </div>

                  {previewUrl && (
                    <div className="relative w-full h-40 mt-2">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setSelectedFile(null);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">ছবির URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://..."
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                  />
                  {formData.imageUrl && (
                    <div className="relative w-full h-40 mt-2">
                      <Image
                        src={formData.imageUrl}
                        alt="Preview"
                        fill
                        className="object-contain"
                        onError={() =>
                          setFormData({ ...formData, imageUrl: "" })
                        }
                      />
                    </div>
                  )}
                </div>
              )}

              <div>
                <Label htmlFor="status">অবস্থা</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">পরিকল্পনা</SelectItem>
                    <SelectItem value="Under Construction">
                      নির্মাণাধীন
                    </SelectItem>
                    <SelectItem value="Completed">সম্পূর্ণ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="estimatedCost">অনুমানিত খরচ</Label>
                <Input
                  id="estimatedCost"
                  value={formData.estimatedCost}
                  onChange={(e) =>
                    setFormData({ ...formData, estimatedCost: e.target.value })
                  }
                  placeholder="যেমন, ৳ ৫০,০০,০০০"
                />
              </div>

              <div>
                <Label htmlFor="description">বর্ণনা</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="displayOrder">প্রদর্শন ক্রম</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      displayOrder: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    প্রক্রিয়াকরণ...
                  </>
                ) : (
                  "সংরক্ষণ করুন"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {buildings.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          এখনও কোনো ভবন নেই। শুরু করতে একটি তৈরি করুন।
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {buildings.map((building) => (
            <Card key={building.id} className="overflow-hidden">
              {building.imageUrl && (
                <div className="w-full h-40 relative overflow-hidden bg-muted">
                  <Image
                    src={building.imageUrl}
                    alt={building.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-bold text-sm">{building.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {building.status === "Planning" && "পরিকল্পনা"}
                      {building.status === "Under Construction" &&
                        "নির্মাণাধীন"}
                      {building.status === "Completed" && "সম্পূর্ণ"}
                    </p>
                  </div>
                </div>

                {building.estimatedCost && (
                  <p className="text-xs text-muted-foreground">
                    খরচ: {building.estimatedCost}
                  </p>
                )}

                {building.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {building.description}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleOpenDialog(building)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    সম্পাদনা
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDelete(building.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    মুছুন
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
