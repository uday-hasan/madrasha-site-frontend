"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Loader2,
  Plus,
  Trash2,
  Edit,
  Image as ImageIcon,
  BarChart3,
  Layout,
  ChevronUp,
  ChevronDown,
  Upload,
  Link as LinkIcon,
} from "lucide-react";
import Image from "next/image";

import { useHomeStore } from "@/stores/homeStore";
import { HeroSlide, Stat } from "@/types/home";
import { homeService } from "@/api/home/home.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

const getImageUrl = (imageUrl: string | undefined): string => {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${ASSET_URL}${imageUrl}`;
};

export default function HomeAdminPage() {
  const {
    heroSlides,
    stats,
    isSlidesLoading,
    isStatsLoading,
    fetchSlides,
    fetchStats,
  } = useHomeStore();

  const [activeTab, setActiveTab] = useState("hero");

  // Hero Slides State
  const [displayedSlides, setDisplayedSlides] = useState<HeroSlide[]>([]);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isSlideDialogOpen, setIsSlideDialogOpen] = useState(false);
  const [deleteSlideIndex, setDeleteSlideIndex] = useState<number | null>(null);
  const [imageUploadMode, setImageUploadMode] = useState<"url" | "upload">("url");
  const [selectedSlideFile, setSelectedSlideFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const [isSavingSlide, setIsSavingSlide] = useState(false);

  // Stats State
  const [displayedStats, setDisplayedStats] = useState<Stat[]>([]);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const [isStatDialogOpen, setIsStatDialogOpen] = useState(false);
  const [deleteStatIndex, setDeleteStatIndex] = useState<number | null>(null);
  const [isSavingStat, setIsSavingStat] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      await fetchSlides();
      await fetchStats();
    };
    loadData();
  }, [fetchSlides, fetchStats]);

  // Sync slides from store to display state
  useEffect(() => {
    if (heroSlides && heroSlides.length >= 0) {
      setDisplayedSlides(heroSlides);
    }
  }, [heroSlides]);

  // Sync stats from store to display state
  useEffect(() => {
    if (stats && stats.length >= 0) {
      setDisplayedStats(stats);
    }
  }, [stats]);

  // ==================== HERO SLIDES HANDLERS ====================

  const handleAddSlide = () => {
    setImageUploadMode("url");
    setSelectedSlideFile(null);
    setPreviewImageUrl("");
    setEditingSlide({
      id: Date.now(),
      title: "",
      subtitle: "",
      description: "",
      imageUrl: "",
      ctaText: "",
      ctaLink: "",
    });
    setIsSlideDialogOpen(true);
  };

  const handleEditSlide = (slide: HeroSlide) => {
    setImageUploadMode("url");
    setSelectedSlideFile(null);
    setPreviewImageUrl(getImageUrl(slide.imageUrl));
    setEditingSlide({ ...slide });
    setIsSlideDialogOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate it's an image
      if (!file.type.startsWith("image/")) {
        toast.error("শুধুমাত্র ছবি ফাইল আপলোড করা যায়");
        return;
      }

      setSelectedSlideFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSlide = async () => {
    if (!editingSlide?.title) {
      toast.error("শিরোনাম আবশ্যক");
      return;
    }

    if (imageUploadMode === "url" && !editingSlide.imageUrl) {
      toast.error("ছবির URL প্রয়োজন");
      return;
    }

    if (imageUploadMode === "upload" && !selectedSlideFile && !previewImageUrl) {
      toast.error("ছবি আবশ্যক");
      return;
    }

    setIsSavingSlide(true);

    try {
      let finalImageUrl = editingSlide.imageUrl;
      const oldImageUrl = displayedSlides.find(
        (s) => s.id === editingSlide.id
      )?.imageUrl;

      // Upload new image if file selected
      if (selectedSlideFile && imageUploadMode === "upload") {
        const response = await homeService.uploadImage(selectedSlideFile);
        finalImageUrl = response.data.imageUrl;

        // Delete old uploaded image if exists and is different
        if (oldImageUrl && oldImageUrl.startsWith("/uploads/")) {
          try {
            await homeService.deleteImage(oldImageUrl);
          } catch (error) {
            console.error("Failed to delete old image:", error);
          }
        }
      }

      // Update slides array
      const updatedSlides = displayedSlides.map((s) =>
        s.id === editingSlide.id
          ? { ...editingSlide, imageUrl: finalImageUrl }
          : s
      );

      // If it's a new slide
      if (!displayedSlides.find((s) => s.id === editingSlide.id)) {
        updatedSlides.push({ ...editingSlide, imageUrl: finalImageUrl });
      }

      // Save to backend
      await homeService.updateSlides({ heroSlides: updatedSlides });

      setDisplayedSlides(updatedSlides);
      setIsSlideDialogOpen(false);
      setEditingSlide(null);
      setSelectedSlideFile(null);
      setPreviewImageUrl("");

      toast.success("স্লাইড সফলভাবে সংরক্ষণ করা হয়েছে");
      await fetchSlides();
    } catch (error) {
      console.error("Error saving slide:", error);
      toast.error("স্লাইড সংরক্ষণে ব্যর্থ হয়েছে");
    } finally {
      setIsSavingSlide(false);
    }
  };

  const moveSlide = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === displayedSlides.length - 1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...displayedSlides];
    [updated[index], updated[newIndex]] = [
      updated[newIndex],
      updated[index],
    ];
    setDisplayedSlides(updated);
  };

  const handleDeleteSlide = async () => {
    if (deleteSlideIndex === null) return;

    try {
      const slideToDelete = displayedSlides[deleteSlideIndex];
      const oldImageUrl = slideToDelete.imageUrl;

      // Delete uploaded image if exists
      if (oldImageUrl && oldImageUrl.startsWith("/uploads/")) {
        try {
          await homeService.deleteImage(oldImageUrl);
        } catch (error) {
          console.error("Failed to delete image:", error);
        }
      }

      // Remove from array and save
      const updatedSlides = displayedSlides.filter(
        (_, i) => i !== deleteSlideIndex
      );
      await homeService.updateSlides({ heroSlides: updatedSlides });

      setDisplayedSlides(updatedSlides);
      setDeleteSlideIndex(null);
      toast.success("স্লাইড সফলভাবে মুছে ফেলা হয়েছে");
      await fetchSlides();
    } catch (error) {
      console.error("Error deleting slide:", error);
      toast.error("স্লাইড মুছতে ব্যর্থ হয়েছে");
    }
  };

  // ==================== STATS HANDLERS ====================

  const handleAddStat = () => {
    setEditingStat({
      id: Date.now(),
      label: "",
      value: "",
      suffix: "",
      icon: "Users",
    });
    setIsStatDialogOpen(true);
  };

  const handleEditStat = (stat: Stat) => {
    setEditingStat({ ...stat });
    setIsStatDialogOpen(true);
  };

  const handleSaveStat = async () => {
    if (!editingStat?.label || !editingStat?.value) {
      toast.error("লেবেল ও মান আবশ্যক");
      return;
    }

    setIsSavingStat(true);

    try {
      const updatedStats = displayedStats.map((s) =>
        s.id === editingStat.id ? editingStat : s
      );

      // If it's a new stat
      if (!displayedStats.find((s) => s.id === editingStat.id)) {
        updatedStats.push(editingStat);
      }

      // Save to backend
      await homeService.updateStats({ stats: updatedStats });

      setDisplayedStats(updatedStats);
      setIsStatDialogOpen(false);
      setEditingStat(null);

      toast.success("পরিসংখ্যান সফলভাবে সংরক্ষণ করা হয়েছে");
      await fetchStats();
    } catch (error) {
      console.error("Error saving stat:", error);
      toast.error("পরিসংখ্যান সংরক্ষণে ব্যর্থ হয়েছে");
    } finally {
      setIsSavingStat(false);
    }
  };

  const handleDeleteStat = async () => {
    if (deleteStatIndex === null) return;

    try {
      const updatedStats = displayedStats.filter((_, i) => i !== deleteStatIndex);
      await homeService.updateStats({ stats: updatedStats });

      setDisplayedStats(updatedStats);
      setDeleteStatIndex(null);
      toast.success("পরিসংখ্যান সফলভাবে মুছে ফেলা হয়েছে");
      await fetchStats();
    } catch (error) {
      console.error("Error deleting stat:", error);
      toast.error("পরিসংখ্যান মুছতে ব্যর্থ হয়েছে");
    }
  };

  const moveStat = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === displayedStats.length - 1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...displayedStats];
    [updated[index], updated[newIndex]] = [
      updated[newIndex],
      updated[index],
    ];
    setDisplayedStats(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">হোম পেজ ব্যবস্থাপনা</h1>
        <p className="text-muted-foreground">
          হোম পেজের বিভিন্ন অংশ কাস্টমাইজ করুন
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hero">
            <Layout className="mr-2 h-4 w-4" />
            হিরো স্লাইড
          </TabsTrigger>
          <TabsTrigger value="stats">
            <BarChart3 className="mr-2 h-4 w-4" />
            পরিসংখ্যান
          </TabsTrigger>
        </TabsList>

        {/* Hero Slides Tab */}
        <TabsContent value="hero" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">হিরো স্লাইডসমূহ</h2>
            <Button onClick={handleAddSlide} disabled={isSlidesLoading}>
              <Plus className="mr-2 h-4 w-4" />
              নতুন স্লাইড
            </Button>
          </div>

          <div className="space-y-3">
            {displayedSlides.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border rounded-lg">
                কোনো স্লাইড নেই। নতুন স্লাইড যোগ করতে বাটনে ক্লিক করুন।
              </div>
            ) : (
              displayedSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      disabled={index === 0}
                      onClick={() => moveSlide(index, "up")}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      disabled={index === displayedSlides.length - 1}
                      onClick={() => moveSlide(index, "down")}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="relative h-16 w-24 rounded overflow-hidden bg-muted">
                    {slide.imageUrl ? (
                      <Image
                        src={getImageUrl(slide.imageUrl)}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{slide.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {slide.subtitle || "কোনো সাবটাইটেল নেই"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditSlide(slide)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => setDeleteSlideIndex(
                        displayedSlides.indexOf(slide)
                      )}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">পরিসংখ্যান</h2>
            <Button onClick={handleAddStat} disabled={isStatsLoading}>
              <Plus className="mr-2 h-4 w-4" />
              নতুন পরিসংখ্যান
            </Button>
          </div>

          <div className="space-y-3">
            {displayedStats.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border rounded-lg">
                কোনো পরিসংখ্যান নেই। নতুন যোগ করতে বাটনে ক্লিক করুন।
              </div>
            ) : (
              displayedStats.map((stat, index) => (
                <div
                  key={stat.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      disabled={index === 0}
                      onClick={() => moveStat(index, "up")}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      disabled={index === displayedStats.length - 1}
                      onClick={() => moveStat(index, "down")}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{stat.label}</h3>
                      {stat.suffix && (
                        <Badge variant="outline">{stat.suffix}</Badge>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-sm text-muted-foreground ml-1">
                          {stat.suffix}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditStat(stat)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => setDeleteStatIndex(
                        displayedStats.indexOf(stat)
                      )}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Slide Edit Dialog */}
      <Dialog open={isSlideDialogOpen} onOpenChange={setIsSlideDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingSlide && displayedSlides.find((s) => s.id === editingSlide.id)
                ? "স্লাইড সম্পাদনা"
                : "নতুন স্লাইড"}
            </DialogTitle>
          </DialogHeader>
          {editingSlide && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>শিরোনাম *</Label>
                <Input
                  value={editingSlide.title}
                  onChange={(e) =>
                    setEditingSlide({ ...editingSlide, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>সাবটাইটেল</Label>
                <Input
                  value={editingSlide.subtitle || ""}
                  onChange={(e) =>
                    setEditingSlide({
                      ...editingSlide,
                      subtitle: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>বিবরণ</Label>
                <Textarea
                  value={editingSlide.description || ""}
                  onChange={(e) =>
                    setEditingSlide({
                      ...editingSlide,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              {/* Image Upload Mode Selection */}
              <div className="space-y-3 border-t pt-4">
                <Label className="text-base font-semibold">ছবি যোগ করুন *</Label>
                <div className="flex gap-2">
                  <Button
                    variant={imageUploadMode === "url" ? "default" : "outline"}
                    onClick={() => {
                      setImageUploadMode("url");
                      setSelectedSlideFile(null);
                    }}
                    className="flex-1"
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    URL
                  </Button>
                  <Button
                    variant={imageUploadMode === "upload" ? "default" : "outline"}
                    onClick={() => setImageUploadMode("upload")}
                    className="flex-1"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    আপলোড
                  </Button>
                </div>
              </div>

              {/* URL Mode */}
              {imageUploadMode === "url" && (
                <div className="space-y-3">
                  {previewImageUrl && (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden border">
                      <Image
                        src={previewImageUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <Input
                    value={editingSlide.imageUrl}
                    onChange={(e) => {
                      setEditingSlide({
                        ...editingSlide,
                        imageUrl: e.target.value,
                      });
                      setPreviewImageUrl(e.target.value);
                    }}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    সম্পূর্ণ ছবির URL এখানে দিন।
                  </p>
                </div>
              )}

              {/* Upload Mode */}
              {imageUploadMode === "upload" && (
                <div className="space-y-3">
                  {previewImageUrl && (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden border">
                      <Image
                        src={previewImageUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    শুধুমাত্র ছবি ফাইল (.jpg, .png, .gif, ইত্যাদি) আপলোড করা যায়।
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CTA টেক্সট</Label>
                  <Input
                    value={editingSlide.ctaText || ""}
                    onChange={(e) =>
                      setEditingSlide({
                        ...editingSlide,
                        ctaText: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>CTA লিংক</Label>
                  <Input
                    value={editingSlide.ctaLink || ""}
                    onChange={(e) =>
                      setEditingSlide({
                        ...editingSlide,
                        ctaLink: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSlideDialogOpen(false);
                    setEditingSlide(null);
                    setSelectedSlideFile(null);
                    setPreviewImageUrl("");
                  }}
                  className="flex-1"
                >
                  বাতিল
                </Button>
                <Button
                  onClick={handleSaveSlide}
                  className="flex-1"
                  disabled={isSavingSlide}
                >
                  {isSavingSlide ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      সংরক্ষণ করছে...
                    </>
                  ) : (
                    "সংরক্ষণ করুন"
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Stat Edit Dialog */}
      <Dialog open={isStatDialogOpen} onOpenChange={setIsStatDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingStat && displayedStats.find((s) => s.id === editingStat.id)
                ? "পরিসংখ্যান সম্পাদনা"
                : "নতুন পরিসংখ্যান"}
            </DialogTitle>
          </DialogHeader>
          {editingStat && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>লেবেল *</Label>
                <Input
                  value={editingStat.label}
                  onChange={(e) =>
                    setEditingStat({ ...editingStat, label: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>মান *</Label>
                <Input
                  value={editingStat.value}
                  onChange={(e) =>
                    setEditingStat({ ...editingStat, value: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>সফিক্স (যেমন: +, %)</Label>
                <Input
                  value={editingStat.suffix || ""}
                  onChange={(e) =>
                    setEditingStat({ ...editingStat, suffix: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>আইকন</Label>
                <Input
                  value={editingStat.icon || ""}
                  onChange={(e) =>
                    setEditingStat({ ...editingStat, icon: e.target.value })
                  }
                  placeholder="যেমন: Users, BookOpen, GraduationCap"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsStatDialogOpen(false);
                    setEditingStat(null);
                  }}
                  className="flex-1"
                >
                  বাতিল
                </Button>
                <Button
                  onClick={handleSaveStat}
                  className="flex-1"
                  disabled={isSavingStat}
                >
                  {isSavingStat ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      সংরক্ষণ করছে...
                    </>
                  ) : (
                    "সংরক্ষণ করুন"
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Slide Alert */}
      <AlertDialog
        open={deleteSlideIndex !== null}
        onOpenChange={() => setDeleteSlideIndex(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>স্লাইড মুছে ফেলুন</AlertDialogTitle>
            <AlertDialogDescription>
              আপনি কি নিশ্চিত যে এই স্লাইডটি মুছে ফেলতে চান?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteSlideIndex(null)}>
              বাতিল
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSlide}
              className="bg-red-500 hover:bg-red-600"
            >
              মুছে ফেলুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Stat Alert */}
      <AlertDialog
        open={deleteStatIndex !== null}
        onOpenChange={() => setDeleteStatIndex(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>পরিসংখ্যান মুছে ফেলুন</AlertDialogTitle>
            <AlertDialogDescription>
              আপনি কি নিশ্চিত যে এই পরিসংখ্যানটি মুছে ফেলতে চান?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteStatIndex(null)}>
              বাতিল
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteStat}
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
