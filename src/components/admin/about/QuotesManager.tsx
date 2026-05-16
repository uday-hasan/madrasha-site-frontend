"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Plus, Trash2, Edit, Loader2 } from "lucide-react";
import { aboutService, AboutQuote } from "@/api/about/about.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default function QuotesManager() {
  const [quotes, setQuotes] = useState<AboutQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    quote: "",
    author: "",
    authorRole: "Founder",
    displayOrder: 0,
  });

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const res = await aboutService.getAllQuotes();
      setQuotes(res.data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to load quotes");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (quote?: AboutQuote) => {
    if (quote) {
      setIsEditing(true);
      setEditingId(quote.id);
      setFormData({
        quote: quote.quote,
        author: quote.author,
        authorRole: quote.authorRole,
        displayOrder: quote.displayOrder,
      });
    } else {
      setIsEditing(false);
      setEditingId(null);
      setFormData({
        quote: "",
        author: "",
        authorRole: "Founder",
        displayOrder: 0,
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      quote: "",
      author: "",
      authorRole: "Founder",
      displayOrder: 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      if (isEditing && editingId) {
        await aboutService.updateQuote(editingId, formData);
        toast.success("Quote updated successfully");
      } else {
        await aboutService.createQuote(formData);
        toast.success("Quote created successfully");
      }

      handleCloseDialog();
      fetchQuotes();
    } catch (error: any) {
      toast.error(error.message || "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি নিশ্চিত?")) return;
    try {
      await aboutService.deleteQuote(id);
      toast.success("Quote deleted successfully");
      fetchQuotes();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Quotes (প্রতিষ্ঠাতার বাণী)</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Quote
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Quote" : "Add New Quote"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="quote">Quote</Label>
                <Textarea
                  id="quote"
                  value={formData.quote}
                  onChange={(e) =>
                    setFormData({ ...formData, quote: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="authorRole">Author Role</Label>
                  <Input
                    id="authorRole"
                    value={formData.authorRole}
                    onChange={(e) =>
                      setFormData({ ...formData, authorRole: e.target.value })
                    }
                    placeholder="e.g., Founder, Teacher"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      displayOrder: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {quotes.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No quotes yet. Create one to get started.
        </Card>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Quote</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-medium">{quote.author}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {quote.authorRole}
                  </TableCell>
                  <TableCell className="text-sm truncate max-w-xs">
                    {quote.quote}
                  </TableCell>
                  <TableCell className="text-center">
                    {quote.displayOrder}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDialog(quote)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(quote.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
