"use client";
import { useEffect, useState, useMemo } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { useGalleryStore } from "@/stores/galleryStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, PlayCircle, X, Loader2 } from "lucide-react";
import { formatBanglaDate } from "@/lib/utils/helpers";
import Image from "next/image";
import { GalleryItem } from "@/types/gallery";
// import { ASSET_URL } from "@/config/env";
import {
  Dialog,
  DialogContent,
  // DialogHeader,
  // DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export default function GalleryPage() {
  const { images, activeCategory, fetchGallery, setActiveCategory, isLoading } =
    useGalleryStore();

  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  // Extract unique categories from backend data
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(images.map((img) => img.category)));
    return ["all", ...uniqueCats];
  }, [images]);

  const filteredImages = useMemo(() => {
    return activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);
  }, [activeCategory, images]);

  return (
    <>
      <PageHeader
        title="ফটো গ্যালারি"
        subtitle="মাদ্রাসার বিভিন্ন কার্যক্রম ও অনুষ্ঠানের স্মৃতি"
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="আমাদের মুহূর্তগুলো" />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                className="capitalize"
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "all" ? "সবগুলো" : cat}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group rounded-xl overflow-hidden border bg-card hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {item.imageUrl ? (
                      <>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_ASSET_URL}${item.imageUrl}`}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-800">
                        <PlayCircle className="h-14 w-14 text-white/70" />
                      </div>
                    )}

                    {/* Media type badge */}
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={
                          item.mediaType === "VIDEO" ? "default" : "secondary"
                        }
                        className="text-[10px]"
                      >
                        {item.mediaType === "VIDEO" ? "ভিডিও" : "ছবি"}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="outline"
                        className="text-[10px] capitalize"
                      >
                        {item.category}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {/* Note: backend uses createdAt */}
                        {formatBanglaDate(item.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm line-clamp-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredImages.length === 0 && (
            <div className="text-center text-muted-foreground py-20 border rounded-2xl border-dashed">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>এই বিভাগে কোনো মিডিয়া খুঁজে পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </section>

      {/* Media Preview Dialog (Using Dialog for better responsiveness) */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
          <div className="absolute top-4 right-4 z-50">
            {/* <DialogClose className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
              <X className="h-5 w-5" />
            </DialogClose> */}
          </div>

          <div className="relative w-full aspect-video flex items-center justify-center">
            {selectedItem?.mediaType === "IMAGE" && selectedItem.imageUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSET_URL}${selectedItem.imageUrl}`}
                alt={selectedItem.title}
                fill
                className="object-contain"
                unoptimized
              />
            ) : selectedItem?.mediaType === "VIDEO" ? (
              selectedItem.videoUrl?.includes("youtube.com") ||
              selectedItem.videoUrl?.includes("youtu.be") ? (
                <iframe
                  src={selectedItem.videoUrl.replace("watch?v=", "embed/")}
                  title={selectedItem.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              ) : (
                <video
                  src={
                    selectedItem.videoUrl?.startsWith("http")
                      ? selectedItem.videoUrl
                      : `${process.env.NEXT_PUBLIC_ASSET_URL}${selectedItem.videoUrl}`
                  }
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              )
            ) : null}
          </div>

          <div className="bg-white p-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedItem?.title}
                </h2>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{selectedItem?.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {selectedItem && formatBanglaDate(selectedItem.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            {selectedItem?.description && (
              <p className="text-slate-600 mt-4 text-sm leading-relaxed border-t pt-4">
                {selectedItem.description}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
