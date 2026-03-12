"use client";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { useGalleryStore } from "@/stores/galleryStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, PlayCircle, X } from "lucide-react";
import { formatBanglaDate } from "@/lib/utils/helpers";
import Image from "next/image";
import { GalleryImage } from "@/types/gallery";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function GalleryPage() {
  const {
    images,
    categories,
    activeCategory,
    fetchGallery,
    setActiveCategory,
  } = useGalleryStore();
  const [selectedItem, setSelectedItem] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <>
      <PageHeader
        title="ফটো গ্যালারি"
        subtitle="মাদ্রাসার বিভিন্ন কার্যক্রম ও অনুষ্ঠানের স্মৃতি"
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="আমাদের মুহূর্তগুলো" />
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.slug)}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group rounded-xl overflow-hidden border bg-card hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {item.mediaType === "image" && item.imageUrl ? (
                    <>
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : item.mediaType === "video" ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <PlayCircle className="h-14 w-14 text-primary/60 group-hover:text-primary transition-colors group-hover:scale-110 duration-300" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  )}

                  {/* Media type badge */}
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={
                        item.mediaType === "video" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {item.mediaType === "video" ? "ভিডিও" : "ছবি"}
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatBanglaDate(item.date)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p>এই বিভাগে কোনো মিডিয়া নেই</p>
            </div>
          )}
        </div>
      </section>

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
              selectedItem.videoUrl.startsWith("blob:") ||
              selectedItem.videoUrl.startsWith("/") ? (
                <video
                  src={selectedItem.videoUrl}
                  controls
                  className="w-full h-full"
                />
              ) : (
                <iframe
                  src={selectedItem.videoUrl}
                  title={selectedItem.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              )
            ) : null}
          </div>

          {selectedItem?.description && (
            <p className="text-sm text-muted-foreground px-5 py-3">
              {selectedItem.description}
            </p>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
