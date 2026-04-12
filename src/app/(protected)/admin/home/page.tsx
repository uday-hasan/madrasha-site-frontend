"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Loader2,
  Plus,
  Trash2,
  Edit,
  Save,
  Image as ImageIcon,
  Type,
  BarChart3,
  Layout,
  ChevronUp,
  ChevronDown,
  GripVertical,
} from "lucide-react";
import Image from "next/image";

import { useHomeStore } from "@/stores/homeStore";
import { HeroSlide, Stat, UpdateHomeDataInput } from "@/types/home";

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

export default function HomeAdminPage() {
  const { homeData, isLoading, fetchHomeData, updateHomeData } = useHomeStore();

  const [activeTab, setActiveTab] = useState("hero");
  const [hasChanges, setHasChanges] = useState(false);

  // Hero Slides State
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isSlideDialogOpen, setIsSlideDialogOpen] = useState(false);
  const [deleteSlideIndex, setDeleteSlideIndex] = useState<number | null>(null);

  // Stats State
  const [stats, setStats] = useState<Stat[]>([]);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const [isStatDialogOpen, setIsStatDialogOpen] = useState(false);
  const [deleteStatIndex, setDeleteStatIndex] = useState<number | null>(null);

  // Content State
  const [bannerImage, setBannerImage] = useState("");
  const [marqueeText, setMarqueeText] = useState("");
  const [aboutSummary, setAboutSummary] = useState("");
  const [featuredNoticesLimit, setFeaturedNoticesLimit] = useState(3);
  const [galleryPreviewLimit, setGalleryPreviewLimit] = useState(3);

  // Load data
  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  // Sync with store data
  useEffect(() => {
    if (homeData) {
      setHeroSlides(homeData.heroSlides || []);
      setStats(homeData.stats || []);
      setBannerImage(homeData.bannerImage || "");
      setMarqueeText(homeData.marqueeText || "");
      setAboutSummary(homeData.aboutSummary || "");
      setFeaturedNoticesLimit(homeData.featuredNoticesLimit || 3);
      setGalleryPreviewLimit(homeData.galleryPreviewLimit || 3);
    }
  }, [homeData]);

  const handleSave = async () => {
    const data: UpdateHomeDataInput = {
      heroSlides,
      stats,
      bannerImage,
      marqueeText,
      aboutSummary,
      featuredNoticesLimit,
      galleryPreviewLimit,
    };

    const success = await updateHomeData(data);
    if (success) {
      toast.success("হোম পেজ সফলভাবে আপডেট হয়েছে");
      setHasChanges(false);
    }
  };

  // Hero Slide Handlers
  const handleAddSlide = () => {
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
    setEditingSlide(slide);
    setIsSlideDialogOpen(true);
  };

  const handleSaveSlide = () => {
    if (!editingSlide?.title || !editingSlide?.imageUrl) {
      toast.error("শিরোনাম ও ছবি URL আবশ্যক");
      return;
    }

    setHeroSlides((prev) => {
      const existingIndex = prev.findIndex((s) => s.id === editingSlide.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = editingSlide;
        return updated;
      }
      return [...prev, editingSlide];
    });

    setIsSlideDialogOpen(false);
    setEditingSlide(null);
    setHasChanges(true);
  };

  const handleDeleteSlide = () => {
    if (deleteSlideIndex === null) return;
    setHeroSlides((prev) => prev.filter((_, i) => i !== deleteSlideIndex));
    setDeleteSlideIndex(null);
    setHasChanges(true);
  };

  const moveSlide = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === heroSlides.length - 1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...heroSlides];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setHeroSlides(updated);
    setHasChanges(true);
  };

  // Stats Handlers
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
    setEditingStat(stat);
    setIsStatDialogOpen(true);
  };

  const handleSaveStat = () => {
    if (!editingStat?.label || !editingStat?.value) {
      toast.error("লেবেল ও মান আবশ্যক");
      return;
    }

    setStats((prev) => {
      const existingIndex = prev.findIndex((s) => s.id === editingStat.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = editingStat;
        return updated;
      }
      return [...prev, editingStat];
    });

    setIsStatDialogOpen(false);
    setEditingStat(null);
    setHasChanges(true);
  };

  const handleDeleteStat = () => {
    if (deleteStatIndex === null) return;
    setStats((prev) => prev.filter((_, i) => i !== deleteStatIndex));
    setDeleteStatIndex(null);
    setHasChanges(true);
  };

  const moveStat = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === stats.length - 1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...stats];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setStats(updated);
    setHasChanges(true);
  };

  if (isLoading && !homeData) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">হোম পেজ ব্যবস্থাপনা</h1>
          <p className="text-muted-foreground">
            হোম পেজের বিভিন্ন অংশ কাস্টমাইজ করুন
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading || !hasChanges}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          পরিবর্তন সংরক্ষণ করুন
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">
            <Layout className="mr-2 h-4 w-4" />
            হিরো স্লাইড
          </TabsTrigger>
          <TabsTrigger value="stats">
            <BarChart3 className="mr-2 h-4 w-4" />
            পরিসংখ্যান
          </TabsTrigger>
          <TabsTrigger value="content">
            <Type className="mr-2 h-4 w-4" />
            কন্টেন্ট
          </TabsTrigger>
          <TabsTrigger value="settings">
            <ImageIcon className="mr-2 h-4 w-4" />
            সেটিংস
          </TabsTrigger>
        </TabsList>

        {/* Hero Slides Tab */}
        <TabsContent value="hero" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">হিরো স্লাইডসমূহ</h2>
            <Button onClick={handleAddSlide}>
              <Plus className="mr-2 h-4 w-4" />
              নতুন স্লাইড
            </Button>
          </div>

          <div className="space-y-3">
            {heroSlides.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border rounded-lg">
                কোনো স্লাইড নেই। নতুন স্লাইড যোগ করতে বাটনে ক্লিক করুন।
              </div>
            ) : (
              heroSlides.map((slide, index) => (
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
                      disabled={index === heroSlides.length - 1}
                      onClick={() => moveSlide(index, "down")}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="relative h-16 w-24 rounded overflow-hidden bg-muted">
                    {slide.imageUrl ? (
                      <Image
                        src={
                          slide.imageUrl.startsWith("http")
                            ? slide.imageUrl
                            : `${ASSET_URL}${slide.imageUrl}`
                        }
                        alt={slide.title}
                        fill
                        className="object-cover"
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
                      onClick={() => setDeleteSlideIndex(index)}
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
            <Button onClick={handleAddStat}>
              <Plus className="mr-2 h-4 w-4" />
              নতুন পরিসংখ্যান
            </Button>
          </div>

          <div className="space-y-3">
            {stats.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border rounded-lg">
                কোনো পরিসংখ্যান নেই। নতুন যোগ করতে বাটনে ক্লিক করুন।
              </div>
            ) : (
              stats.map((stat, index) => (
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
                      disabled={index === stats.length - 1}
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
                      onClick={() => setDeleteStatIndex(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="marqueeText">
              মার্কি টেক্সট (গুরুত্বপূর্ণ ঘোষণা)
            </Label>
            <Textarea
              id="marqueeText"
              value={marqueeText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setMarqueeText(e.target.value);
                setHasChanges(true);
              }}
              placeholder="স্ক্রলিং টেক্সট লিখুন..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aboutSummary">আমাদের সম্পর্কে সারসংক্ষেপ</Label>
            <Textarea
              id="aboutSummary"
              value={aboutSummary}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setAboutSummary(e.target.value);
                setHasChanges(true);
              }}
              placeholder="মাদ্রাসা সম্পর্কে সংক্ষিপ্ত বিবরণ..."
              rows={8}
            />
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bannerImage">ব্যানার ইমেজ URL</Label>
            <Input
              id="bannerImage"
              value={bannerImage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBannerImage(e.target.value);
                setHasChanges(true);
              }}
              placeholder="https://example.com/banner.jpg"
            />
            {bannerImage && (
              <div className="relative h-40 w-full rounded-lg overflow-hidden mt-2">
                <Image
                  src={
                    bannerImage.startsWith("http")
                      ? bannerImage
                      : `${ASSET_URL}${bannerImage}`
                  }
                  alt="Banner preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="featuredNoticesLimit">ফিচার্ড নোটিশ সংখ্যা</Label>
              <Input
                id="featuredNoticesLimit"
                type="number"
                min={1}
                max={10}
                value={featuredNoticesLimit}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFeaturedNoticesLimit(parseInt(e.target.value) || 3);
                  setHasChanges(true);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="galleryPreviewLimit">
                গ্যালারি প্রিভিউ সংখ্যা
              </Label>
              <Input
                id="galleryPreviewLimit"
                type="number"
                min={1}
                max={10}
                value={galleryPreviewLimit}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setGalleryPreviewLimit(parseInt(e.target.value) || 3);
                  setHasChanges(true);
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Slide Edit Dialog */}
      <Dialog open={isSlideDialogOpen} onOpenChange={setIsSlideDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingSlide && heroSlides.find((s) => s.id === editingSlide.id)
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditingSlide({ ...editingSlide, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>সাবটাইটেল</Label>
                <Input
                  value={editingSlide.subtitle || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setEditingSlide({
                      ...editingSlide,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>ছবি URL *</Label>
                <Input
                  value={editingSlide.imageUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditingSlide({
                      ...editingSlide,
                      imageUrl: e.target.value,
                    })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CTA টেক্সট</Label>
                  <Input
                    value={editingSlide.ctaText || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEditingSlide({
                        ...editingSlide,
                        ctaLink: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <Button onClick={handleSaveSlide} className="w-full">
                সংরক্ষণ করুন
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Stat Edit Dialog */}
      <Dialog open={isStatDialogOpen} onOpenChange={setIsStatDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingStat && stats.find((s) => s.id === editingStat.id)
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditingStat({ ...editingStat, label: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>মান *</Label>
                <Input
                  value={editingStat.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditingStat({ ...editingStat, value: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>সফিক্স (যেমন: +, %)</Label>
                <Input
                  value={editingStat.suffix || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditingStat({ ...editingStat, suffix: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>আইকন</Label>
                <Input
                  value={editingStat.icon || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditingStat({ ...editingStat, icon: e.target.value })
                  }
                  placeholder="যেমন: Users, BookOpen, GraduationCap"
                />
              </div>
              <Button onClick={handleSaveStat} className="w-full">
                সংরক্ষণ করুন
              </Button>
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
