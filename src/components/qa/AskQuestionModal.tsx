"use client";

import { useState } from "react";
import { qaService } from "@/api/qa/qa.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle, CheckCircle, X } from "lucide-react";

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onSuccess?: () => void;
}

export function AskQuestionModal({
  isOpen,
  onClose,
  categories,
  onSuccess,
}: AskQuestionModalProps) {
  const [formData, setFormData] = useState({
    question: "",
    category: categories[0] || "সাধারণ মাসায়েল",
    authorName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.question.trim()) {
      setError("প্রশ্ন লিখতে হবে।");
      return;
    }

    if (!formData.authorName.trim()) {
      setError("আপনার নাম লিখতে হবে।");
      return;
    }

    setIsSubmitting(true);
    try {
      await qaService.createQuestion(formData);
      setSuccess(true);
      setFormData({
        question: "",
        category: categories[0] || "সাধারণ মাসায়েল",
        authorName: "",
      });

      setTimeout(() => {
        onClose();
        setSuccess(false);
        onSuccess?.();
      }, 2000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "প্রশ্ন জমা দিতে ব্যর্থ হয়েছে।";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogTitle>প্রশ্ন জিজ্ঞাসা করুন</AlertDialogTitle>
        <AlertDialogDescription>
          দ্বীনি যেকোনো বিষয়ে আপনার প্রশ্ন করুন। আপনার প্রশ্ন খসড়া হিসেবে
          সংরক্ষিত হবে এবং প্রশাসক অনুমোদনের পরে প্রকাশিত হবে।
        </AlertDialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-800 text-sm">
                প্রশ্ন সফলভাবে জমা দেওয়া হয়েছে। শীঘ্রই প্রকাশিত হবে।
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="authorName">আপনার নাম *</Label>
            <Input
              id="authorName"
              name="authorName"
              placeholder="আপনার নাম লিখুন"
              value={formData.authorName}
              onChange={handleInputChange}
              disabled={isSubmitting || success}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">বিভাগ *</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                disabled={isSubmitting || success}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="question">আপনার প্রশ্ন *</Label>
            <Textarea
              id="question"
              name="question"
              placeholder="আপনার প্রশ্ন বিস্তারিতভাবে লিখুন"
              value={formData.question}
              onChange={handleInputChange}
              disabled={isSubmitting || success}
              rows={5}
              required
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting || success}
            >
              বাতিল করুন
            </Button>
            <Button type="submit" disabled={isSubmitting || success}>
              {isSubmitting ? "প্রক্রিয়াকরণ..." : "প্রশ্ন জমা দিন"}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
