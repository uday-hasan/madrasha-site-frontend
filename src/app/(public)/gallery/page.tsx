"use client";
import { useEffect } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { useGalleryStore } from "@/stores/galleryStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageIcon } from "lucide-react";
import { formatBanglaDate } from "@/lib/utils/helpers";

export default function GalleryPage() {
  const { images, categories, activeCategory, fetchGallery, setActiveCategory } = useGalleryStore();

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const filteredImages = activeCategory === "all"
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
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group rounded-xl overflow-hidden border bg-card hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center p-4">
                    <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                    <p className="text-xs text-muted-foreground">{image.imageUrl}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">{image.category}</Badge>
                    <span className="text-xs text-muted-foreground">{formatBanglaDate(image.date)}</span>
                  </div>
                  <h3 className="font-semibold text-sm">{image.title}</h3>
                  {image.description && (
                    <p className="text-xs text-muted-foreground mt-1">{image.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p>এই বিভাগে কোনো ছবি নেই</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
