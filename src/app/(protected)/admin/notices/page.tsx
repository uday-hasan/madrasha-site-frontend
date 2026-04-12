"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Loader2,
  Plus,
  Trash2,
  Edit,
  Eye,
  ChevronLeft,
  ChevronRight,
  Star,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";

import { useNoticeStore } from "@/stores/noticeStore";
import { Notice, NoticeQuery } from "@/types/notice";
import { formatBanglaDate } from "@/lib/utils/helpers";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const CATEGORIES = [
  { value: "general", label: "সাধারণ" },
  { value: "academic", label: "একাডেমিক" },
  { value: "admission", label: "ভর্তি" },
  { value: "exam", label: "পরীক্ষা" },
  { value: "event", label: "অনুষ্ঠান" },
  { value: "holiday", label: "ছুটি" },
] as const;

export default function NoticesAdminPage() {
  // --- STORE ---
  const {
    notices,
    isLoading,
    meta,
    fetchNotices,
    createNotice,
    updateNotice,
    deleteNotice,
  } = useNoticeStore();

  // --- STATE ---
  const [query, setQuery] = useState<NoticeQuery>({ page: 1, limit: 10 });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Notice>>({
    title: "",
    content: "",
    excerpt: "",
    category: "general",
    featured: false,
    isActive: true,
    isImportant: false,
    attachmentUrl: "",
  });

  // --- EFFECTS ---
  useEffect(() => {
    fetchNotices(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // --- HANDLERS ---
  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: "general",
      featured: false,
      isActive: true,
      isImportant: false,
      attachmentUrl: "",
    });
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.content) {
      toast.error("শিরোনাম ও বিষয়বস্তু আবশ্যক");
      return;
    }

    const success = await createNotice(formData);
    if (success) {
      toast.success("নোটিশ সফলভাবে তৈরি হয়েছে");
      setIsAddOpen(false);
      resetForm();
    }
  };

  const handleUpdate = async () => {
    if (!selectedNotice) return;
    if (!formData.title || !formData.content) {
      toast.error("শিরোনাম ও বিষয়বস্তু আবশ্যক");
      return;
    }

    const success = await updateNotice(selectedNotice.id, formData);
    if (success) {
      toast.success("নোটিশ সফলভাবে আপডেট হয়েছে");
      setIsEditOpen(false);
      resetForm();
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const success = await deleteNotice(deleteId);
    if (success) {
      toast.success("নোটিশ মুছে ফেলা হয়েছে");
      setDeleteId(null);
    }
  };

  const openEdit = (notice: Notice) => {
    setSelectedNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      excerpt: notice.excerpt || "",
      category: notice.category,
      featured: notice.featured,
      isActive: notice.isActive,
      isImportant: notice.isImportant,
      attachmentUrl: notice.attachmentUrl || "",
    });
    setIsEditOpen(true);
  };

  const openDetails = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsDetailsOpen(true);
  };

  // --- RENDER ---
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">নোটিশ ব্যবস্থাপনা</h1>
          <p className="text-muted-foreground">
            সকল নোটিশ তৈরি, সম্পাদনা এবং মুছে ফেলুন
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              নতুন নোটিশ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>নতুন নোটিশ তৈরি করুন</DialogTitle>
            </DialogHeader>
            <NoticeForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleCreate}
              isLoading={isLoading}
              submitText="তৈরি করুন"
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="নোটিশ অনুসন্ধান..."
          className="max-w-sm"
          value={query.search || ""}
          onChange={(e) =>
            setQuery({ ...query, search: e.target.value, page: 1 })
          }
        />
        <Select
          value={query.category || "all"}
          onValueChange={(v) =>
            setQuery({
              ...query,
              category: v === "all" ? undefined : v,
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ক্যাটেগরি" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব ক্যাটেগরি</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={query.isActive === undefined ? "all" : String(query.isActive)}
          onValueChange={(v) =>
            setQuery({
              ...query,
              isActive: v === "all" ? undefined : v === "true",
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="স্ট্যাটাস" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
            <SelectItem value="true">সক্রিয়</SelectItem>
            <SelectItem value="false">নিষ্ক্রিয়</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left">শিরোনাম</th>
              <th className="p-3 text-left">ক্যাটেগরি</th>
              <th className="p-3 text-center">স্ট্যাটাস</th>
              <th className="p-3 text-center">গুরুত্বপূর্ণ</th>
              <th className="p-3 text-center">ফিচার্ড</th>
              <th className="p-3 text-left">তারিখ</th>
              <th className="p-3 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                </td>
              </tr>
            ) : notices.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-muted-foreground"
                >
                  কোনো নোটিশ পাওয়া যায়নি
                </td>
              </tr>
            ) : (
              notices.map((notice) => (
                <tr key={notice.id} className="border-t hover:bg-muted/50">
                  <td className="p-3">
                    <div className="font-medium">{notice.title}</div>
                    {notice.excerpt && (
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {notice.excerpt}
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <Badge variant="outline">
                      {CATEGORIES.find((c) => c.value === notice.category)
                        ?.label || notice.category}
                    </Badge>
                  </td>
                  <td className="p-3 text-center">
                    {notice.isActive ? (
                      <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="mx-auto h-5 w-5 text-red-500" />
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {notice.isImportant ? (
                      <AlertCircle className="mx-auto h-5 w-5 text-orange-500" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {notice.featured ? (
                      <Star className="mx-auto h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {formatBanglaDate(notice.createdAt)}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDetails(notice)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(notice)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => setDeleteId(notice.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={query.page === 1}
            onClick={() => setQuery({ ...query, page: (query.page || 1) - 1 })}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            পৃষ্ঠা {meta.page} / {meta.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={query.page === meta.totalPages}
            onClick={() => setQuery({ ...query, page: (query.page || 1) + 1 })}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>নোটিশ সম্পাদনা করুন</DialogTitle>
          </DialogHeader>
          <NoticeForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleUpdate}
            isLoading={isLoading}
            submitText="আপডেট করুন"
          />
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>নোটিশ বিবরণ</DialogTitle>
          </DialogHeader>
          {selectedNotice && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge>
                  {
                    CATEGORIES.find((c) => c.value === selectedNotice.category)
                      ?.label
                  }
                </Badge>
                {selectedNotice.isImportant && (
                  <Badge variant="destructive">গুরুত্বপূর্ণ</Badge>
                )}
                {selectedNotice.featured && (
                  <Badge variant="secondary">ফিচার্ড</Badge>
                )}
                <Badge
                  variant={selectedNotice.isActive ? "default" : "outline"}
                >
                  {selectedNotice.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                </Badge>
              </div>
              <h2 className="text-xl font-bold">{selectedNotice.title}</h2>
              {selectedNotice.excerpt && (
                <p className="text-muted-foreground">
                  {selectedNotice.excerpt}
                </p>
              )}
              <div className="prose max-w-none bg-muted p-4 rounded-lg">
                <div
                  dangerouslySetInnerHTML={{ __html: selectedNotice.content }}
                />
              </div>
              {selectedNotice.attachmentUrl && (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <FileText className="h-5 w-5" />
                  <Link
                    href={selectedNotice.attachmentUrl}
                    target="_blank"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    সংযুক্তি দেখুন
                    <LinkIcon className="h-3 w-3" />
                  </Link>
                </div>
              )}
              <div className="text-sm text-muted-foreground">
                স্ল্যাগ: {selectedNotice.slug} | প্রকাশিত:{" "}
                {formatBanglaDate(selectedNotice.createdAt)}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Alert */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>নোটিশ মুছে ফেলুন</AlertDialogTitle>
            <AlertDialogDescription>
              আপনি কি নিশ্চিত যে এই নোটিশটি মুছে ফেলতে চান? এই কাজটি
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

// Form Component
function NoticeForm({
  formData,
  setFormData,
  onSubmit,
  isLoading,
  submitText,
}: {
  formData: Partial<Notice>;
  setFormData: (data: Partial<Notice>) => void;
  onSubmit: () => void;
  isLoading: boolean;
  submitText: string;
}) {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">শিরোনাম *</Label>
        <Input
          id="title"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="নোটিশের শিরোনাম"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">সারসংক্ষেপ</Label>
        <Input
          id="excerpt"
          value={formData.excerpt || ""}
          onChange={(e) =>
            setFormData({ ...formData, excerpt: e.target.value })
          }
          placeholder="ছোট সারসংক্ষেপ (ঐচ্ছিক)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">ক্যাটেগরি</Label>
        <Select
          value={formData.category || "general"}
          onValueChange={(v: string) =>
            setFormData({ ...formData, category: v })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="ক্যাটেগরি নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">বিষয়বস্তু *</Label>
        <Textarea
          id="content"
          value={formData.content || ""}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          placeholder="নোটিশের পূর্ণ বিবরণ"
          rows={8}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="attachmentUrl">সংযুক্তি URL</Label>
        <Input
          id="attachmentUrl"
          value={formData.attachmentUrl || ""}
          onChange={(e) =>
            setFormData({ ...formData, attachmentUrl: e.target.value })
          }
          placeholder="https://example.com/file.pdf"
        />
      </div>

      <div className="flex flex-wrap gap-6 py-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(v: boolean) =>
              setFormData({ ...formData, isActive: v })
            }
          />
          <Label htmlFor="isActive">সক্রিয়</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="isImportant"
            checked={formData.isImportant}
            onCheckedChange={(v) =>
              setFormData({ ...formData, isImportant: v })
            }
          />
          <Label htmlFor="isImportant">গুরুত্বপূর্ণ</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(v: boolean) =>
              setFormData({ ...formData, featured: v })
            }
          />
          <Label htmlFor="featured">ফিচার্ড</Label>
        </div>
      </div>

      <Button onClick={onSubmit} disabled={isLoading} className="w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          submitText
        )}
      </Button>
    </div>
  );
}
