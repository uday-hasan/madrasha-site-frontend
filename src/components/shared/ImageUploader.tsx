"use client";

import { useState, useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { homeService } from "@/api/home/home.service";
import { toast } from "react-toastify";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
}

export function ImageUploader({ onUpload, currentUrl }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("সর্বশক্তিমান ছবি ফাইল আপলোড করুন (JPEG, PNG, WebP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("ছবির আকার সর্বোচ্চ ৫ এমবি হতে পারে");
      return;
    }

    setIsUploading(true);
    try {
      const response = await homeService.uploadImage(file);
      if (response.success && response.data?.imageUrl) {
        onUpload(response.data.imageUrl);
        toast.success("ছবি সফলভাবে আপলোড হয়েছে");
      } else {
        toast.error(response.message || "ছবি আপলোড করতে সমস্যা হয়েছে");
      }
    } catch (error) {
      toast.error("ছবি আপলোড করতে সমস্যা হয়েছে");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="image-upload"
      />
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            আপলোড হচ্ছে...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            ছবি আপলোড করুন
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground">
        সর্বোচ্চ ৫ এমবি। সমর্থিত ফরম্যাট: JPEG, PNG, WebP
      </p>
    </div>
  );
}
