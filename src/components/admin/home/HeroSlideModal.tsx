"use client";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming you have these
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

export const HeroSlideModal = ({
  isOpen,
  onClose,
  initialData,
  onSave,
  isSubmitting,
}: any) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData && isOpen) setPreviewUrl(initialData.imageUrl);
    else setPreviewUrl(null);
  }, [initialData, isOpen]);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (initialData?.id) formData.append("id", initialData.id);
    // If no new file is selected, we still want to keep the old imageUrl
    if (!fileInputRef.current?.files?.[0] && initialData?.imageUrl) {
      formData.append("imageUrl", initialData.imageUrl);
    }

    await onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" border-white/10 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle>স্লাইড তথ্য</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Input
            name="title"
            defaultValue={initialData?.title}
            placeholder="শিরোনাম"
            required
            className=""
          />
          <Input
            name="subtitle"
            defaultValue={initialData?.subtitle}
            placeholder="সাবটাইটেল"
            className=""
          />
          <textarea
            name="description"
            defaultValue={initialData?.description}
            placeholder="বিবরণ"
            className="w-full  rounded-md p-2 text-sm h-20"
          />

          <div className="relative aspect-video  rounded-xl overflow-hidden border border-white/10">
            {previewUrl ? (
              <>
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 bg-red-500 p-1.5 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Upload className="w-8 h-8 text-slate-500 mb-2" />
                <p className="text-xs text-slate-500 text-center px-4">
                  ছবি সিলেক্ট করুন (১৯২০x১০৮০ সাজেস্টেড)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input
              name="ctaText"
              defaultValue={initialData?.ctaText}
              placeholder="বাটন টেক্সট"
              className=""
            />
            <Input
              name="ctaLink"
              defaultValue={initialData?.ctaLink}
              placeholder="বাটন লিংক"
              className=""
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "সংরক্ষণ করুন"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
