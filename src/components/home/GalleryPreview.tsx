"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { useGalleryStore } from "@/stores/galleryStore";
import { ImageIcon } from "lucide-react";

export function GalleryPreview() {
  const { images, fetchGallery } = useGalleryStore();

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
              className="aspect-video bg-card border rounded-lg overflow-hidden flex items-center justify-center hover:shadow-md transition-shadow group"
            >
              <div className="text-center p-4">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                <p className="text-sm text-muted-foreground">{image.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{image.category}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild>
            <Link href="/gallery">সম্পূর্ণ গ্যালারি দেখুন</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
