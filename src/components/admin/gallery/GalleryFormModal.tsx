// // components/admin/gallery/GalleryFormModal.tsx
// import { useState, useEffect } from "react";
// import { GalleryItem, MediaType } from "@/types/gallery";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Loader2, Upload, Link as LinkIcon } from "lucide-react";

// interface GalleryFormModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (formData: FormData) => Promise<void>;
//   initialData?: GalleryItem | null;
//   isSubmitting: boolean;
// }

// export const GalleryFormModal = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   initialData,
//   isSubmitting,
// }: GalleryFormModalProps) => {
//   const [mediaType, setMediaType] = useState<MediaType>("IMAGE");
//   const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");

//   useEffect(() => {
//     if (initialData) {
//       setMediaType(initialData.mediaType);
//       const hasFileUrl =
//         initialData.imageUrl?.includes("uploads") ||
//         initialData.videoUrl?.includes("uploads");
//       setUploadMethod(hasFileUrl ? "file" : "url");
//     }
//   }, [initialData]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     await onSubmit(formData);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>
//             {initialData ? "তথ্য আপডেট করুন" : "নতুন মিডিয়া যুক্ত করুন"}
//           </DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4 pt-2">
//           <Input
//             name="title"
//             defaultValue={initialData?.title}
//             placeholder="টাইটেল লিখুন"
//             required
//           />

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-1">
//               <Label className="text-xs">টাইপ</Label>
//               <Select
//                 name="mediaType"
//                 defaultValue={initialData?.mediaType || "IMAGE"}
//                 onValueChange={(v) => setMediaType(v as MediaType)}
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="IMAGE">ছবি</SelectItem>
//                   <SelectItem value="VIDEO">ভিডিও</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-1">
//               <Label className="text-xs">ক্যাটেগরি</Label>
//               <Input
//                 name="category"
//                 defaultValue={initialData?.category || "General"}
//               />
//             </div>
//           </div>

//           <div className="space-y-1">
//             <Label className="text-xs">সংযুক্তি পদ্ধতি</Label>
//             <Select
//               value={uploadMethod}
//               onValueChange={(v: any) => setUploadMethod(v)}
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="file">ফাইল আপলোড</SelectItem>
//                 <SelectItem value="url">লিংক (YouTube/FB/External)</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {uploadMethod === "file" ? (
//             <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-slate-50 transition-colors relative">
//               <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
//               <p className="text-xs text-muted-foreground">
//                 ক্লিক করে ফাইল সিলেক্ট করুন
//               </p>
//               <Input
//                 name="file"
//                 type="file"
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//                 required={!initialData}
//               />
//             </div>
//           ) : (
//             <div className="space-y-1">
//               <Label className="text-xs">
//                 {mediaType === "IMAGE" ? "ছবির URL" : "ভিডিওর URL"}
//               </Label>
//               <Input
//                 name={mediaType === "IMAGE" ? "imageUrl" : "videoUrl"}
//                 type="url"
//                 defaultValue={
//                   mediaType === "IMAGE"
//                     ? initialData?.imageUrl
//                     : initialData?.videoUrl
//                 }
//                 placeholder="https://..."
//                 required
//               />
//             </div>
//           )}

//           <Button type="submit" className="w-full" disabled={isSubmitting}>
//             {isSubmitting ? (
//               <Loader2 className="animate-spin mr-2 h-4 w-4" />
//             ) : (
//               "সংরক্ষণ করুন"
//             )}
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// components/admin/gallery/GalleryFormModal.tsx

import { useState, useEffect, useRef } from "react";
import { GalleryItem, MediaType } from "@/types/gallery";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload, X, Film, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface GalleryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  initialData?: GalleryItem | null;
  isSubmitting: boolean;
}

export const GalleryFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: GalleryFormModalProps) => {
  const [mediaType, setMediaType] = useState<MediaType>("IMAGE");
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form when editing
  useEffect(() => {
    if (initialData && isOpen) {
      setMediaType(initialData.mediaType);
      const existingUrl = initialData.imageUrl || initialData.videoUrl;
      const isLocalFile = existingUrl?.includes("uploads");

      setUploadMethod(isLocalFile ? "file" : "url");
      if (isLocalFile) setPreviewUrl(existingUrl || null);
    } else {
      // Reset when opening "Add New"
      setPreviewUrl(null);
      setMediaType("IMAGE");
      setUploadMethod("file");
    }
  }, [initialData, isOpen]);

  // Clean up Object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const clearFile = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">
            {initialData ? "তথ্য আপডেট করুন" : "নতুন মিডিয়া যুক্ত করুন"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label className="text-xs text-slate-400">টাইটেল</Label>
            <Input
              name="title"
              defaultValue={initialData?.title}
              className=""
              placeholder="টাইটেল লিখুন"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs text-slate-400">টাইপ</Label>
              <Select
                name="mediaType"
                defaultValue={initialData?.mediaType || "IMAGE"}
                onValueChange={(v) => {
                  setMediaType(v as MediaType);
                  clearFile(); // Reset preview when type changes
                }}
              >
                <SelectTrigger className="">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem value="IMAGE">ছবি</SelectItem>
                  <SelectItem value="VIDEO">ভিডিও</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-slate-400">ক্যাটেগরি</Label>
              <Input
                name="category"
                defaultValue={initialData?.category || "General"}
                className=""
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-slate-400">সংযুক্তি পদ্ধতি</Label>
            <Select
              value={uploadMethod}
              onValueChange={(v: any) => {
                setUploadMethod(v);
                clearFile();
              }}
            >
              <SelectTrigger className="">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="file">ফাইল আপলোড</SelectItem>
                <SelectItem value="url">লিংক (YouTube/External)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* --- ফাইল আপলোড মেথড --- */}
          {uploadMethod === "file" && (
            <div className="space-y-2">
              <Label className="text-xs text-slate-400">মিডিয়া ফাইল</Label>
              <div className="relative min-h-[160px]">
                {/* প্রিভিউ লেয়ার */}
                {previewUrl && (
                  <div className="absolute inset-0 z-20 rounded-xl overflow-hidden border border-white/10 bg-slate-800 flex items-center justify-center">
                    {mediaType === "IMAGE" ? (
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <Film className="h-10 w-10 text-emerald-500 opacity-50 mb-2" />
                        <span className="text-[10px] text-slate-400">
                          ভিডিও ফাইল রেডি
                        </span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={clearFile}
                      className="absolute top-2 right-2 bg-red-500 p-1.5 rounded-full z-30"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                )}

                {/* ইনপুট লেয়ার */}
                <div
                  className={`group relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center transition-all ${previewUrl ? "opacity-0 invisible h-0" : "opacity-100 visible"}`}
                >
                  <Upload className="mx-auto h-8 w-8 text-slate-500 group-hover:text-emerald-500 mb-2" />
                  <p className="text-xs text-slate-500">ফাইল সিলেক্ট করুন</p>
                  <Input
                    ref={fileInputRef}
                    name="file"
                    type="file"
                    accept={mediaType === "IMAGE" ? "image/*" : "video/*"}
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    // শুধুমাত্র ফাইল মেথড চালু থাকলে এবং প্রিভিউ না থাকলে এটি Required হবে
                    required={
                      uploadMethod === "file" && !initialData && !previewUrl
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* --- URL মেথড --- */}
          {uploadMethod === "url" && (
            <div className="space-y-1">
              <Label className="text-xs text-slate-400">
                {mediaType === "IMAGE" ? "ছবির URL" : "ভিডিওর URL (YouTube/FB)"}
              </Label>
              <Input
                // ব্যাকএন্ড এই নামগুলোই (imageUrl/videoUrl) আশা করছে
                name={mediaType === "IMAGE" ? "imageUrl" : "videoUrl"}
                type="url"
                defaultValue={
                  mediaType === "IMAGE"
                    ? initialData?.imageUrl
                    : initialData?.videoUrl
                }
                placeholder="https://example.com/video-or-image"
                className="bg-slate-800 border-white/5"
                // শুধুমাত্র URL মেথড চালু থাকলে এটি Required হবে
                required={uploadMethod === "url"}
              />
              <p className="text-[10px] text-slate-500 mt-1">
                ইউটিউব বা ফেসবুকের সরাসরি ভিডিও লিঙ্ক এখানে দিন
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold mt-4 py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                প্রসেসিং হচ্ছে...
              </>
            ) : initialData ? (
              "পরিবর্তন সংরক্ষণ করুন"
            ) : (
              "মিডিয়া আপলোড করুন"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
