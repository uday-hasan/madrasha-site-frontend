"use client";
import { useState } from "react";
import { HeroSlide } from "@/types/home";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Upload, X } from "lucide-react";
import Image from "next/image";
import { homeService } from "@/api/home/home.service";
import { toast } from "react-toastify";

interface HeroSlideFormProps {
  slide?: HeroSlide;
  onSubmit: (slide: HeroSlide, uploadedImageUrl?: string) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function HeroSlideForm({
  slide,
  onSubmit,
  onCancel,
  isLoading = false,
}: HeroSlideFormProps) {
  const [formData, setFormData] = useState<Partial<HeroSlide>>(
    slide || {
      title: "",
      subtitle: "",
      description: "",
      imageUrl: "",
      ctaText: "",
      ctaLink: "",
    },
  );

  const [localImagePreview, setLocalImagePreview] = useState<string | null>(
    slide?.imageUrl || null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("অনুগ্রহ করে শুধুমাত্র ছবি ফাইল নির্বাচন করুন");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("ছবির সাইজ ৫ মেগাবাইটের চেয়ে কম হওয়া উচিত");
      return;
    }

    setSelectedFile(file);
    setUploadError("");

    // Create local preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setLocalImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setLocalImagePreview(null);
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError("");

    // Validate required fields
    if (!formData.title) {
      setUploadError("শিরোনাম প্রয়োজন");
      return;
    }

    // If new file selected, upload it first
    if (selectedFile) {
      setIsUploadingImage(true);
      try {
        const response = await homeService.uploadImage(selectedFile);
        const uploadedUrl = response.data.imageUrl;

        onSubmit(
          {
            ...formData,
            id: slide?.id || Date.now(),
            imageUrl: uploadedUrl,
          } as HeroSlide,
          uploadedUrl,
        );
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "ছবি আপলোড করতে সমস্যা হয়েছে";
        setUploadError(message);
        toast.error(message);
      } finally {
        setIsUploadingImage(false);
      }
    } else {
      // No new image, just use existing or provided URL
      if (!formData.imageUrl) {
        setUploadError("অনুগ্রহ করে একটি ছবি নির্বাচন করুন");
        return;
      }

      onSubmit({
        ...formData,
        id: slide?.id || Date.now(),
      } as HeroSlide);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {slide ? "স্লাইড সম্পাদনা করুন" : "নতুন স্লাইড যোগ করুন"}
        </CardTitle>
        <CardDescription>
          হোম পেজের জন্য হিরো ব্যানার স্লাইড তৈরি করুন
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Alert */}
          {uploadError && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive p-3 rounded-md flex gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{uploadError}</p>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">শিরোনাম *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              placeholder="স্লাইড শিরোনাম"
              required
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label htmlFor="subtitle">উপশিরোনাম</Label>
            <Input
              id="subtitle"
              name="subtitle"
              value={formData.subtitle || ""}
              onChange={handleInputChange}
              placeholder="স্লাইড উপশিরোনাম"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">বিবরণ</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="স্লাইডের বিস্তারিত বিবরণ"
              rows={4}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>ছবি *</Label>
            {localImagePreview ? (
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={localImagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  disabled={isUploadingImage}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  ছবি নির্বাচন করতে ক্লিক করুন
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={isUploadingImage}
                />
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, GIF - সর্বোচ্চ ৫ MB
                </p>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ctaText">বাটন টেক্সট</Label>
              <Input
                id="ctaText"
                name="ctaText"
                value={formData.ctaText || ""}
                onChange={handleInputChange}
                placeholder="যেমন: আরও জানুন"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaLink">বাটন লিংক</Label>
              <Input
                id="ctaLink"
                name="ctaLink"
                value={formData.ctaLink || ""}
                onChange={handleInputChange}
                placeholder="যেমন: /admission"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2 pt-6 border-t">
            <Button
              type="submit"
              disabled={isLoading || isUploadingImage}
              className="flex-1"
            >
              {isUploadingImage
                ? "ছবি আপলোড হচ্ছে..."
                : isLoading
                  ? "সংরক্ষণ করছে..."
                  : "সংরক্ষণ করুন"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading || isUploadingImage}
              >
                বাতিল করুন
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
