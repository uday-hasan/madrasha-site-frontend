"use client";
import { useEffect, useState, useRef } from "react";
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
import { GalleryItem as GalleryImage } from "@/types/gallery";

// Extracts YouTube video ID from any YouTube URL format
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Generates a thumbnail from a local video by seeking to 1s and drawing to canvas
function LocalVideoThumbnail({
  videoUrl,
  title,
}: {
  videoUrl: string;
  title: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.preload = "metadata";
    video.src = videoUrl;

    video.addEventListener("loadeddata", () => {
      video.currentTime = Math.min(1, video.duration * 0.1 || 1);
    });

    video.addEventListener("seeked", () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 360;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setReady(true);
      }
      video.src = "";
    });

    video.load();
    return () => {
      video.src = "";
    };
  }, [videoUrl]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={title}
      className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-105"
      style={{ objectFit: "cover", opacity: ready ? 1 : 0 }}
    />
  );
}

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
          {previewImages.map((item) => {
            const ytId =
              item.mediaType === "VIDEO" && item.videoUrl
                ? getYouTubeId(item.videoUrl)
                : null;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="aspect-video bg-muted border rounded-lg overflow-hidden hover:shadow-md transition-shadow group relative cursor-pointer"
              >
                {/* ── IMAGE ── */}
                {item.mediaType === "IMAGE" && item.imageUrl ? (
                  <>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                      <div>
                        <p className="text-sm text-white font-medium line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-white/70">{item.category}</p>
                      </div>
                    </div>
                  </>
                ) : item.mediaType === "IMAGE" && item.videoUrl ? (
                  <>
                    {/* Thumbnail: YouTube or local canvas */}
                    {ytId ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <LocalVideoThumbnail
                        videoUrl={item.videoUrl}
                        title={item.title}
                      />
                    )}

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />

                    {/* Play icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Always-visible title */}
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-3">
                      <p className="text-sm text-white font-medium line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-white/70">{item.category}</p>
                    </div>
                  </>
                ) : (
                  /* Fallback */
                  <div className="flex flex-col items-center justify-center h-full p-4">
                    <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                    <p className="text-sm text-muted-foreground text-center">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.category}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
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
            {selectedItem?.mediaType === "IMAGE" && selectedItem.imageUrl ? (
              <Image
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                fill
                className="object-contain"
              />
            ) : selectedItem?.mediaType === "VIDEO" && selectedItem.videoUrl ? (
              (() => {
                const ytId = getYouTubeId(selectedItem.videoUrl);
                return ytId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                    title={selectedItem.title}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <video
                    src={selectedItem.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full"
                  />
                );
              })()
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
