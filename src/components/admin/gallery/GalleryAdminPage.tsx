// components/admin/gallery/GalleryAdminPage.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { GalleryItem, GalleryQuery } from "@/types/gallery";
import { galleryService } from "@/api/gallery/gallery.service";
import { GalleryCard } from "./GalleryCard";
import { GalleryFormModal } from "./GalleryFormModal";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, ImageIcon } from "lucide-react";
import { toast } from "react-toastify";
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

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchGallery = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await galleryService.getAll({ page: 1, limit: 50 });
      setItems(res.data || []);
    } catch (error) {
      toast.error("লোড করতে সমস্যা হয়েছে");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      if (selectedItem) {
        const res = await galleryService.update(selectedItem.id, formData);
        setItems((prev) =>
          prev.map((item) => (item.id === selectedItem.id ? res.data : item)),
        );
        toast.success("আপডেট সফল হয়েছে");
      } else {
        const res = await galleryService.create(formData);
        setItems((prev) => [res.data, ...prev]);
        toast.success("তৈরি সফল হয়েছে");
      }
      setIsFormOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await galleryService.delete(deleteId);
      setItems((prev) => prev.filter((item) => item.id !== deleteId));
      toast.success("মুছে ফেলা হয়েছে");
      setDeleteId(null);
    } catch (error) {
      toast.error("মুছতে ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-200">
      {/* Updated Header: Dark background with green accents */}
      <div className="flex justify-between items-center backdrop-blur-md p-6  border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold text-white">মিডিয়া গ্যালারি</h1>
          <p className="text-sm text-slate-400">
            ম্যানেজ করুন আপনার মাদ্রাসার ছবি ও ভিডিও
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedItem(null);
            setIsFormOpen(true);
          }}
          className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white border-none px-6"
        >
          <Plus className="mr-2 h-4 w-4" /> নতুন মিডিয়া
        </Button>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="animate-spin h-10 w-10 text-emerald-500" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl ">
          <ImageIcon className="h-12 w-12 mx-auto opacity-10 text-white" />
          <p className="mt-2 ">কোনো ডাটা পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              onEdit={(i) => {
                setSelectedItem(i);
                setIsFormOpen(true);
              }}
              onDelete={(id) => setDeleteId(id)}
              onView={(i) => window.open(i.imageUrl || i.videoUrl, "_blank")}
            />
          ))}
        </div>
      )}

      {/* Modal should also be dark-themed */}
      <GalleryFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={selectedItem}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>মিডিয়া মুছে ফেলুন</AlertDialogTitle>
            <AlertDialogDescription>
              আপনি কি নিশ্চিত যে এই মিডিয়া আইটেমটি মুছে ফেলতে চান? এই কাজটি
              অপরিবর্তনীয়।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>
              বাতিল
            </AlertDialogCancel>
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
