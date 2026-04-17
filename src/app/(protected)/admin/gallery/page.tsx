// "use client";

// import { useCallback, useEffect, useState } from "react";
// import type { MediaType } from "@/types/gallery";
// import Image from "next/image";
// import { toast } from "react-toastify";
// import {
//   Loader2,
//   Plus,
//   Trash2,
//   Video,
//   Image as ImageIcon,
//   Edit,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   Upload,
//   X,
// } from "lucide-react";

// import { galleryService } from "@/api/gallery/gallery.service";
// import { GalleryItem, GalleryQuery } from "@/types/gallery";
// import { formatBanglaDate } from "@/lib/utils/helpers";

// // UI Components (Shadcn)
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // Config
// const ASSET_URL = process.env.NEXT_PUBLIC_ASSET_URL || "http://localhost:5000";

// export default function GalleryAdminPage() {
//   // --- STATE ---
//   const [items, setItems] = useState<GalleryItem[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [meta, setMeta] = useState<any>(null);
//   const [query, setQuery] = useState<GalleryQuery>({ page: 1, limit: 12 });

//   // Modal States
//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [isDetailsOpen, setIsDetailsOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

//   // Form States
//   const [addMediaType, setAddMediaType] = useState<MediaType>("IMAGE");
//   const [addUploadMethod, setAddUploadMethod] = useState<"file" | "url">(
//     "file",
//   );
//   const [editMediaType, setEditMediaType] = useState<MediaType>("IMAGE");
//   const [editUploadMethod, setEditUploadMethod] = useState<"file" | "url">(
//     "file",
//   );

//   // --- API CALLS ---
//   const fetchGallery = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const res = await galleryService.getAll(query);
//       setItems(res.data || []);
//       setMeta(res.meta || null);
//     } catch (error: any) {
//       toast.error(error.message || "ফাইল লোড করতে সমস্যা হয়েছে");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [query]);

//   useEffect(() => {
//     fetchGallery();
//   }, [fetchGallery]);

//   // --- FILE SIZE VALIDATION ---
//   const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
//   const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 10MB

//   const validateFileSize = (
//     file: File,
//     mediaType: MediaType,
//   ): string | null => {
//     const isVideo = mediaType === "VIDEO";
//     const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
//     const maxSizeLabel = isVideo ? "10MB" : "5MB";

//     if (file.size > maxSize) {
//       return `${isVideo ? "ভিডিও" : "ছবি"} এর সর্বোচ্চ সাইজ ${maxSizeLabel} হতে পারবে। আপনার ফাইলের সাইজ ${(file.size / 1024 / 1024).toFixed(2)}MB।`;
//     }
//     return null;
//   };

//   // --- HANDLERS ---
//   const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     const formData = new FormData(e.currentTarget);

//     // Validate file size if file is being uploaded
//     const fileInput = e.currentTarget.querySelector(
//       'input[type="file"]',
//     ) as HTMLInputElement;
//     if (fileInput?.files?.[0]) {
//       const mediaType = addMediaType;
//       const error = validateFileSize(fileInput.files[0], mediaType);
//       if (error) {
//         toast.error(error);
//         setIsSubmitting(false);
//         return;
//       }
//     }

//     try {
//       await galleryService.create(formData);
//       toast.success("সফলভাবে আপলোড করা হয়েছে");
//       setIsAddOpen(false);
//       fetchGallery();
//     } catch (error: any) {
//       toast.error(error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!selectedItem) return;
//     setIsSubmitting(true);
//     const formData = new FormData(e.currentTarget);

//     // Validate file size if new file is being uploaded
//     const fileInput = e.currentTarget.querySelector(
//       'input[type="file"]',
//     ) as HTMLInputElement;
//     if (fileInput?.files?.[0] && editUploadMethod === "file") {
//       const mediaType = editMediaType || selectedItem.mediaType;
//       const error = validateFileSize(fileInput.files[0], mediaType);
//       if (error) {
//         toast.error(error);
//         setIsSubmitting(false);
//         return;
//       }
//     }

//     try {
//       await galleryService.update(selectedItem.id, formData);
//       toast.success("তথ্য আপডেট করা হয়েছে");
//       setIsEditOpen(false);
//       fetchGallery();
//     } catch (error: any) {
//       toast.error(error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("আপনি কি নিশ্চিতভাবে এটি মুছে ফেলতে চান?")) return;
//     try {
//       await galleryService.delete(id);
//       setItems((prev) => prev.filter((item) => item.id !== id));
//       toast.success("মুছে ফেলা হয়েছে");
//     } catch (error: any) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
//       {/* Header Section */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">
//             গ্যালারি ম্যানেজমেন্ট
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             মাদ্রাসার ছবি ও ভিডিওগুলো এখান থেকে নিয়ন্ত্রণ করুন
//           </p>
//         </div>

//         <Dialog
//           open={isAddOpen}
//           onOpenChange={(open) => {
//             setIsAddOpen(open);
//             if (!open) {
//               setAddMediaType("IMAGE");
//               setAddUploadMethod("file");
//             }
//           }}
//         >
//           <DialogTrigger asChild>
//             <Button className="gap-2 shadow-lg hover:shadow-primary/20">
//               <Plus className="h-4 w-4" /> নতুন মিডিয়া যুক্ত করুন
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-md">
//             <DialogHeader>
//               <DialogTitle>নতুন মিডিয়া আপলোড</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleCreate} className="space-y-4 pt-2">
//               <div className="space-y-2">
//                 <Label htmlFor="title">টাইটেল</Label>
//                 <Input
//                   id="title"
//                   name="title"
//                   required
//                   placeholder="অনুষ্ঠানের নাম"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="description">বিবরণ</Label>
//                 <Input
//                   id="description"
//                   name="description"
//                   required
//                   placeholder="অনুষ্ঠানের বিবরণ"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label>টাইপ</Label>
//                   <Select
//                     name="mediaType"
//                     defaultValue="IMAGE"
//                     onValueChange={(value) =>
//                       setAddMediaType(value as MediaType)
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="IMAGE">ছবি</SelectItem>
//                       <SelectItem value="VIDEO">ভিডিও</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label>ক্যাটেগরি</Label>
//                   <Input name="category" defaultValue="General" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label>আপলোড পদ্ধতি</Label>
//                 <Select
//                   value={addUploadMethod}
//                   onValueChange={(value) =>
//                     setAddUploadMethod(value as "file" | "url")
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="file">ফাইল আপলোড</SelectItem>
//                     <SelectItem value="url">URL লিংক</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               {addUploadMethod === "file" ? (
//                 <div className="space-y-2">
//                   <Label>ফাইল নির্বাচন করুন</Label>
//                   <p className="text-xs text-muted-foreground">
//                     সর্বোচ্চ সাইজ: ছবি 5MB, ভিডিও 10MB
//                   </p>
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
//                         <p className="text-xs text-muted-foreground">
//                           ক্লিক করে ফাইল সিলেক্ট করুন
//                         </p>
//                       </div>
//                       <input name="file" type="file" className="hidden" />
//                     </label>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor={addMediaType === "IMAGE" ? "imageUrl" : "videoUrl"}
//                   >
//                     {addMediaType === "IMAGE" ? "ছবির URL" : "ভিডিওর URL"}
//                   </Label>
//                   <Input
//                     id={addMediaType === "IMAGE" ? "imageUrl" : "videoUrl"}
//                     name={addMediaType === "IMAGE" ? "imageUrl" : "videoUrl"}
//                     type="url"
//                     placeholder={
//                       addMediaType === "IMAGE"
//                         ? "https://example.com/image.jpg"
//                         : "https://youtube.com/watch?v=..."
//                     }
//                     required
//                   />
//                 </div>
//               )}
//               <Button type="submit" className="w-full" disabled={isSubmitting}>
//                 {isSubmitting ? (
//                   <Loader2 className="animate-spin mr-2 h-4 w-4" />
//                 ) : (
//                   "আপলোড শুরু করুন"
//                 )}
//               </Button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Grid Section */}
//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center py-32 space-y-4">
//           <Loader2 className="h-12 w-12 animate-spin text-primary" />
//           <p className="text-muted-foreground animate-pulse">লোড হচ্ছে...</p>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {items.length === 0 ? (
//               <div className="col-span-full py-20 text-center border-2 border-dashed rounded-2xl">
//                 <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
//                 <p className="mt-4 text-muted-foreground">
//                   কোনো ডাটা পাওয়া যায়নি
//                 </p>
//               </div>
//             ) : (
//               items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="group relative bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
//                 >
//                   {/* Image Preview */}
//                   <div className="relative aspect-video bg-muted overflow-hidden">
//                     {item.imageUrl ? (
//                       <Image
//                         src={
//                           item.imageUrl.startsWith("http")
//                             ? item.imageUrl
//                             : `${ASSET_URL}${item.imageUrl}`
//                         }
//                         alt={item.title}
//                         fill
//                         className="object-cover transition-transform duration-500 group-hover:scale-110"
//                         unoptimized
//                       />
//                     ) : item.videoUrl ? (
//                       <div className="w-full h-full flex items-center justify-center bg-slate-800">
//                         <Video className="h-10 w-10 text-white/50" />
//                         <div className="absolute inset-0 flex items-center justify-center">
//                           <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
//                             <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[12px] border-l-white border-b-[6px] border-b-transparent ml-1" />
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center bg-slate-800">
//                         <ImageIcon className="h-10 w-10 text-white/50" />
//                       </div>
//                     )}

//                     {/* Overlay Actions */}
//                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
//                       <Button
//                         size="icon"
//                         variant="secondary"
//                         className="h-9 w-9"
//                         onClick={() => {
//                           setSelectedItem(item);
//                           setIsDetailsOpen(true);
//                         }}
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         size="icon"
//                         variant="secondary"
//                         className="h-9 w-9"
//                         onClick={() => {
//                           setSelectedItem(item);
//                           setIsEditOpen(true);
//                         }}
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         size="icon"
//                         variant="destructive"
//                         className="h-9 w-9"
//                         onClick={() => handleDelete(item.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>

//                   {/* Info */}
//                   <div className="p-4">
//                     <h3 className="font-bold text-sm line-clamp-1">
//                       {item.title}
//                     </h3>
//                     <div className="flex items-center justify-between mt-3">
//                       <Badge
//                         variant="outline"
//                         className="text-[10px] py-0 px-2 uppercase font-semibold"
//                       >
//                         {item.category}
//                       </Badge>
//                       <span className="text-[10px] text-muted-foreground">
//                         {formatBanglaDate(item.createdAt)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Pagination Section */}
//           {meta && meta.totalPages > 1 && (
//             <div className="flex justify-center items-center gap-6 pt-10">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 disabled={Number(meta.page) <= 1}
//                 onClick={() =>
//                   setQuery((p) => ({ ...p, page: Number(meta.page) - 1 }))
//                 }
//               >
//                 <ChevronLeft className="h-4 w-4 mr-1" /> আগেরটি
//               </Button>
//               <div className="text-sm font-medium">
//                 পৃষ্ঠা{" "}
//                 <span className="text-primary font-bold">{meta.page}</span> /{" "}
//                 {meta.totalPages}
//               </div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 disabled={Number(meta.page) >= meta.totalPages}
//                 onClick={() =>
//                   setQuery((p) => ({ ...p, page: Number(meta.page) + 1 }))
//                 }
//               >
//                 পরেরটি <ChevronRight className="h-4 w-4 ml-1" />
//               </Button>
//             </div>
//           )}
//         </>
//       )}

//       {/* --- EDIT MODAL --- */}
//       <Dialog
//         open={isEditOpen}
//         onOpenChange={(open) => {
//           setIsEditOpen(open);
//           if (!open) {
//             setEditMediaType("IMAGE");
//             setEditUploadMethod("file");
//           } else if (selectedItem) {
//             setEditMediaType(selectedItem.mediaType);
//           }
//         }}
//       >
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>তথ্য পরিবর্তন করুন</DialogTitle>
//           </DialogHeader>
//           {selectedItem && (
//             <form onSubmit={handleUpdate} className="space-y-4">
//               <div className="space-y-2">
//                 <Label>টাইটেল</Label>
//                 <Input
//                   name="title"
//                   defaultValue={selectedItem.title}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>ক্যাটেগরি</Label>
//                 <Input name="category" defaultValue={selectedItem.category} />
//               </div>
//               <div className="p-2 border rounded-md flex items-center gap-4 bg-muted/30">
//                 <div className="relative h-14 w-14 rounded overflow-hidden">
//                   {selectedItem.imageUrl ? (
//                     <Image
//                       src={
//                         selectedItem.imageUrl.startsWith("http")
//                           ? selectedItem.imageUrl
//                           : `${ASSET_URL}${selectedItem.imageUrl}`
//                       }
//                       fill
//                       className="object-cover"
//                       unoptimized
//                       alt="preview"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-slate-800">
//                       <Video className="h-6 w-6 text-white/50" />
//                     </div>
//                   )}
//                 </div>
//                 <div className="text-[10px] text-muted-foreground">
//                   বর্তমান মিডিয়া প্রিভিউ
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label>আপলোড পদ্ধতি</Label>
//                 <Select
//                   value={editUploadMethod}
//                   onValueChange={(value) =>
//                     setEditUploadMethod(value as "file" | "url")
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="file">ফাইল আপলোড</SelectItem>
//                     <SelectItem value="url">URL লিংক</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               {editUploadMethod === "file" ? (
//                 <div className="space-y-2">
//                   <Label>মিডিয়া পরিবর্তন করুন (ঐচ্ছিক)</Label>
//                   <p className="text-xs text-muted-foreground">
//                     সর্বোচ্চ সাইজ: ছবি 5MB, ভিডিও 10MB
//                   </p>
//                   <Input name="file" type="file" />
//                 </div>
//               ) : (
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor={
//                       editMediaType === "IMAGE"
//                         ? "editImageUrl"
//                         : "editVideoUrl"
//                     }
//                   >
//                     {editMediaType === "IMAGE" ? "ছবির URL" : "ভিডিওর URL"}
//                   </Label>
//                   <Input
//                     id={
//                       editMediaType === "IMAGE"
//                         ? "editImageUrl"
//                         : "editVideoUrl"
//                     }
//                     name={editMediaType === "IMAGE" ? "imageUrl" : "videoUrl"}
//                     type="url"
//                     defaultValue={
//                       editMediaType === "IMAGE"
//                         ? selectedItem.imageUrl || ""
//                         : selectedItem.videoUrl || ""
//                     }
//                     placeholder={
//                       editMediaType === "IMAGE"
//                         ? "https://example.com/image.jpg"
//                         : "https://youtube.com/watch?v=..."
//                     }
//                   />
//                 </div>
//               )}
//               <Button type="submit" className="w-full" disabled={isSubmitting}>
//                 {isSubmitting ? (
//                   <Loader2 className="animate-spin h-4 w-4" />
//                 ) : (
//                   "পরিবর্তন সংরক্ষণ করুন"
//                 )}
//               </Button>
//             </form>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* --- DETAILS MODAL --- */}
//       <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
//         <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background">
//           <div className="absolute top-3 right-3 z-10">
//             <DialogClose className="rounded-full bg-black/20 p-2 hover:bg-black/40 text-white transition-all">
//               <X className="h-4 w-4" />
//             </DialogClose>
//           </div>
//           {selectedItem && (
//             <div className="flex flex-col">
//               <div className="relative aspect-video w-full bg-slate-100">
//                 {selectedItem.imageUrl ? (
//                   <Image
//                     src={
//                       selectedItem.imageUrl.startsWith("http")
//                         ? selectedItem.imageUrl
//                         : `${ASSET_URL}${selectedItem.imageUrl}`
//                     }
//                     alt={selectedItem.title}
//                     fill
//                     className="object-contain"
//                     unoptimized
//                   />
//                 ) : selectedItem.videoUrl ? (
//                   selectedItem.videoUrl.includes("youtube.com") ||
//                   selectedItem.videoUrl.includes("youtu.be") ? (
//                     <iframe
//                       src={
//                         selectedItem.videoUrl
//                           .replace("watch?v=", "embed/")
//                           .replace("youtu.be/", "youtube.com/embed/")
//                           .split("&")[0]
//                           .split("?")[0]
//                       }
//                       title={selectedItem.title}
//                       className="w-full h-full"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-slate-800">
//                       <Video className="h-16 w-16 text-white/50" />
//                       <p className="absolute mt-20 text-white/70 text-sm">
//                         ভিডিও
//                       </p>
//                     </div>
//                   )
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-slate-200">
//                     <ImageIcon className="h-16 w-16 text-slate-400" />
//                   </div>
//                 )}
//               </div>
//               <div className="p-6 space-y-4">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <Badge className="mb-2">{selectedItem.mediaType}</Badge>
//                     <h2 className="text-2xl font-bold">{selectedItem.title}</h2>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t text-sm">
//                   <div className="space-y-1">
//                     <p className="text-muted-foreground">ক্যাটেগরি</p>
//                     <p className="font-medium capitalize">
//                       {selectedItem.category}
//                     </p>
//                   </div>
//                   <div className="space-y-1">
//                     <p className="text-muted-foreground">আপলোড করেছেন</p>
//                     <p className="font-medium">
//                       {selectedItem.uploader?.name || "অ্যাডমিন"}
//                     </p>
//                   </div>
//                   <div className="space-y-1">
//                     <p className="text-muted-foreground">তারিখ</p>
//                     <p className="font-medium">
//                       {formatBanglaDate(selectedItem.createdAt)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

import GalleryAdminPage from "@/components/admin/gallery/GalleryAdminPage";
import React from "react";

const page = () => {
  return (
    <div>
      <GalleryAdminPage />
    </div>
  );
};

export default page;
