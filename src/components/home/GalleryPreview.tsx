"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { useGalleryStore } from "@/stores/galleryStore";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

export function GalleryPreview() {
  const { images, fetchGallery } = useGalleryStore();
  const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(
    null,
  );

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const previewImages = images.slice(0, 6);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="ফটো গ্যালারি"
          subtitle="আমাদের বিভিন্ন কার্যক্রম ও অনুষ্ঠানের মুহূর্তগুলো"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {previewImages.map((image) => (
            <div
              key={image.id}
              onClick={() => image.imageUrl && setSelectedImage(image)}
              className="aspect-video bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow group relative cursor-pointer"
            >
              {image.imageUrl ? (
                <>
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <div>
                      <p className="text-sm text-white font-medium">
                        {image.title}
                      </p>
                      <p className="text-xs text-white/70">{image.category}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                  <p className="text-sm text-muted-foreground">{image.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {image.category}
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

      {/* Image Preview Modal */}
      <AlertDialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <AlertDialogContent className="max-w-3xl p-0 overflow-hidden">
          <AlertDialogHeader className="flex flex-row items-center justify-between px-5 pt-4 pb-2">
            <div>
              <AlertDialogTitle className="text-lg">
                {selectedImage?.title}
              </AlertDialogTitle>
              {selectedImage?.category && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {selectedImage.category}
                </p>
              )}
            </div>
            <AlertDialogCancel className="h-8 w-8 p-0 rounded-full border-none shadow-none hover:bg-muted">
              <X className="h-4 w-4" />
            </AlertDialogCancel>
          </AlertDialogHeader>

          {selectedImage?.imageUrl && (
            <div className="relative w-full aspect-video">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                fill
                className="object-contain bg-black"
              />
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
