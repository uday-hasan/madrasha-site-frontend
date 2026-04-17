// components/admin/gallery/GalleryCard.tsx
import Image from "next/image";
import {
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Film,
  ExternalLink,
} from "lucide-react";
import { GalleryItem } from "@/types/gallery";
import { formatBanglaDate } from "@/lib/utils/helpers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GalleryCardProps {
  item: GalleryItem;
  onView: (item: GalleryItem) => void;
  onEdit: (item: GalleryItem) => void;
  onDelete: (id: string) => void;
}

export const GalleryCard = ({
  item,
  onView,
  onEdit,
  onDelete,
}: GalleryCardProps) => {
  const isExternalVideo =
    item.mediaType === "VIDEO" &&
    item.videoUrl?.includes("http") &&
    !item.videoUrl.includes("uploads");

  return (
    <div className="group border rounded-xl overflow-hidden hover:shadow-md transition-all">
      <div className="relative aspect-video bg-slate-100">
        {item.mediaType === "IMAGE" ? (
          <Image
            src={item.imageUrl!}
            alt={item.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900">
            {isExternalVideo ? (
              <ExternalLink className="text-white/40 w-8 h-8" />
            ) : (
              <Film className="text-white/40 w-8 h-8" />
            )}
          </div>
        )}

        <div className="absolute top-2 left-2">
          <Badge
            variant={item.mediaType === "VIDEO" ? "destructive" : "default"}
            className="text-[10px]"
          >
            {item.mediaType === "VIDEO" ? "ভিডিও" : "ছবি"}
          </Badge>
        </div>

        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(item)}>
                <Eye className="w-4 h-4 mr-2" /> দেখুন
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(item)}>
                <Edit className="w-4 h-4 mr-2" /> এডিট
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" /> মুছুন
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
        <p className="text-[11px] text-muted-foreground mt-1">
          {formatBanglaDate(item.createdAt)}
        </p>
      </div>
    </div>
  );
};
