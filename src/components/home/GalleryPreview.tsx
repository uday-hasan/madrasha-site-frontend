"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { useGalleryStore } from "@/stores/galleryStore";
import { ImageIcon, PlayCircle, X } from "lucide-react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { GalleryImage } from "@/types/gallery";

export function GalleryPreview() {
  const { images, fetchGallery } = useGalleryStore();
  const [selectedItem, setSelectedItem] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const previewImages = images.slice(0, 3);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="ফটো গ্যালারি"
          subtitle="আমাদের বিভিন্ন কার্যক্রম ও অনুষ্ঠানের মুহূর্তগুলো"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {previewImages.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="aspect-video bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow group relative cursor-pointer"
            >
              {item.mediaType === "image" && item.imageUrl ? (
                <>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <div>
                      <p className="text-sm text-white font-medium">
                        {item.title}
                      </p>
                      <p className="text-xs text-white/70">{item.category}</p>
                    </div>
                  </div>
                </>
              ) : item.mediaType === "video" ? (
                <>
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-primary/60 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <div>
                      <p className="text-sm text-white font-medium">
                        {item.title}
                      </p>
                      <p className="text-xs text-white/70">{item.category}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.category}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild>
            <Link href="/gallery">সম্পূর্ণ গ্যালারি দেখুন</Link>
          </Button>
        </div>
      </div>

      {/* Media Preview Modal */}
      <AlertDialog
        open={!!selectedItem}
        onOpenChange={() => setSelectedItem(null)}
      >
        <AlertDialogContent className="max-w-3xl p-0 overflow-hidden">
          <AlertDialogHeader className="flex flex-row items-center justify-between px-5 pt-4 pb-2">
            <div>
              <AlertDialogTitle className="text-lg">
                {selectedItem?.title}
              </AlertDialogTitle>
              {selectedItem?.category && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {selectedItem.category}
                </p>
              )}
            </div>
            <AlertDialogCancel className="h-8 w-8 p-0 rounded-full border-none shadow-none hover:bg-muted">
              <X className="h-4 w-4" />
            </AlertDialogCancel>
          </AlertDialogHeader>

          <div className="relative w-full aspect-video bg-black">
            {selectedItem?.mediaType === "image" && selectedItem.imageUrl ? (
              <Image
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                fill
                className="object-contain"
              />
            ) : selectedItem?.mediaType === "video" && selectedItem.videoUrl ? (
              <iframe
                src={selectedItem.videoUrl}
                title={selectedItem.title}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : null}
          </div>

          {selectedItem?.description && (
            <p className="text-sm text-muted-foreground px-5 py-3">
              {selectedItem.description}
            </p>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
