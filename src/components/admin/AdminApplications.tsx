"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Loader,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { applicationService } from "@/api/application/application.service";
import { departmentService } from "@/api/department/department.service";

interface Application {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  fatherName: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  fatherPhone: string;
  department: {
    id: string;
    name: string;
  };
  status: "PENDING" | "APPROVED" | "REJECTED";
  paymentMethod: "ONLINE" | "CASH";
  payments: any[];
  createdAt: string;
}

interface Department {
  id: string;
  name: string;
}

interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export function AdminApplicationsComponent() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [departmentFilter, setDepartmentFilter] = useState<string>("ALL");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>("ALL");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  // Dialog states
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isStatusChangeOpen, setIsStatusChangeOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<
    "PENDING" | "APPROVED" | "REJECTED"
  >("PENDING");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Fetch applications
  const fetchApplications = async (pageNum = 1) => {
    try {
      setLoading(true);
      const filters: any = {};

      if (statusFilter !== "ALL") filters.status = statusFilter;
      if (departmentFilter !== "ALL") filters.departmentId = departmentFilter;
      if (paymentMethodFilter !== "ALL")
        filters.paymentMethod = paymentMethodFilter;
      if (search) filters.search = search;

      const response = (await applicationService.getApplications(
        pageNum,
        limit,
        filters,
      )) as any;
      setApplications(response.data || []);
      setTotalPages(response.meta?.totalPages || 1);
      setPage(pageNum);
    } catch (error: any) {
      console.error("Failed to fetch applications:", error);
      toast.error("আবেদন লোড করতে ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = (await applicationService.getApplicationStats()) as any;
      setStats(
        response.data || { total: 0, pending: 0, approved: 0, rejected: 0 },
      );
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = (await departmentService.getAll({
        limit: 100,
      })) as any;
      setDepartments(response.data || []);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  // Initial load
  useEffect(() => {
    Promise.all([fetchApplications(1), fetchStats(), fetchDepartments()]);
  }, []);

  // Refetch when filters change
  useEffect(() => {
    fetchApplications(1);
  }, [statusFilter, departmentFilter, paymentMethodFilter]);

  const handleStatusChange = async () => {
    if (!selectedApplication) return;

    try {
      setLoading(true);
      await applicationService.updateApplicationStatus(
        selectedApplication.id,
        newStatus,
      );
      toast.success("আবেদনের স্ট্যাটাস আপডেট করা হয়েছে");
      setIsStatusChangeOpen(false);
      fetchApplications(page);
      fetchStats();
    } catch (error: any) {
      toast.error(error?.message || "স্ট্যাটাস আপডেট করতে ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedApplication) return;

    try {
      setLoading(true);
      await applicationService.deleteApplication(selectedApplication.id);
      toast.success("আবেদন সফলভাবে মুছে ফেলা হয়েছে");
      setIsDeleteOpen(false);
      fetchApplications(page);
      fetchStats();
    } catch (error: any) {
      toast.error(error?.message || "আবেদন মুছতে ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    fetchApplications(1);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" /> মুলতুবি
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" /> অনুমোদিত
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-800">
            <XCircle className="w-3 h-3 mr-1" /> প্রত্যাখ্যাত
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentBadge = (method: string) => {
    return (
      <Badge variant={method === "ONLINE" ? "default" : "secondary"}>
        {method === "ONLINE" ? "অনলাইন" : "নগদ"}
      </Badge>
    );
  };

  const exportToCSV = () => {
    if (applications.length === 0) {
      toast.warning("রপ্তানি করার জন্য কোনো ডেটা নেই");
      return;
    }

    const headers = [
      "নাম",
      "ইমেইল",
      "ফোন",
      "পিতার নাম",
      "বিভাগ",
      "স্ট্যাটাস",
      "পেমেন্ট পদ্ধতি",
      "আবেদনের তারিখ",
    ];
    const rows = applications.map((app) => [
      app.studentName,
      app.studentEmail,
      app.studentPhone,
      app.fatherName,
      app.department.name,
      app.status,
      app.paymentMethod,
      new Date(app.createdAt).toLocaleDateString("bn-BD"),
    ]);

    let csv = headers.join(",") + "\n";
    rows.forEach((row) => {
      csv += row.map((cell) => `"${cell}"`).join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `applications_${new Date().getTime()}.csv`;
    link.click();

    toast.success("ডেটা সফলভাবে রপ্তানি করা হয়েছে");
  };

  if (loading && applications.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="শিক্ষার্থীর আবেদন পরিচালনা"
        subtitle="সকল অনলাইন আবেদন দেখুন এবং পরিচালনা করুন"
      />

      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  মোট আবেদন
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-yellow-600">
                  মুলতুবি
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-600">
                  অনুমোদিত
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.approved}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-red-600">
                  প্রত্যাখ্যাত
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {stats.rejected}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>ফিল্টার এবং অনুসন্ধান</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="নাম, ইমেইল বা ফোন দিয়ে খুঁজুন..."
                    value={search}
                    onChange={handleSearch}
                    className="flex-1"
                  />
                  <Button onClick={handleSearchSubmit}>
                    <Search className="w-4 h-4 mr-2" />
                    খুঁজুন
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>স্ট্যাটাস</Label>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">সব স্ট্যাটাস</SelectItem>
                        <SelectItem value="PENDING">মুলতুবি</SelectItem>
                        <SelectItem value="APPROVED">অনুমোদিত</SelectItem>
                        <SelectItem value="REJECTED">প্রত্যাখ্যাত</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>বিভাগ</Label>
                    <Select
                      value={departmentFilter}
                      onValueChange={setDepartmentFilter}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">সব বিভাগ</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>পেমেন্ট পদ্ধতি</Label>
                    <Select
                      value={paymentMethodFilter}
                      onValueChange={setPaymentMethodFilter}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">সব পদ্ধতি</SelectItem>
                        <SelectItem value="ONLINE">অনলাইন</SelectItem>
                        <SelectItem value="CASH">নগদ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" onClick={exportToCSV}>
                    <Download className="w-4 h-4 mr-2" />
                    রপ্তানি করুন (CSV)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications Table */}
          <Card>
            <CardHeader>
              <CardTitle>আবেদন তালিকা</CardTitle>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  কোনো আবেদন খুঁজে পাওয়া যায়নি
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>শিক্ষার্থী</TableHead>
                          <TableHead>যোগাযোগ</TableHead>
                          <TableHead>বিভাগ</TableHead>
                          <TableHead>স্ট্যাটাস</TableHead>
                          <TableHead>পেমেন্ট</TableHead>
                          <TableHead>তারিখ</TableHead>
                          <TableHead>ক্রিয়া</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{app.studentName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {app.fatherName}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <p>{app.studentEmail}</p>
                                <p className="text-muted-foreground">
                                  {app.studentPhone}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{app.department.name}</TableCell>
                            <TableCell>{getStatusBadge(app.status)}</TableCell>
                            <TableCell>
                              {getPaymentBadge(app.paymentMethod)}
                            </TableCell>
                            <TableCell>
                              {new Date(app.createdAt).toLocaleDateString(
                                "bn-BD",
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedApplication(app);
                                    setIsViewOpen(true);
                                  }}
                                >
                                  দেখুন
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedApplication(app);
                                    setNewStatus(app.status);
                                    setIsStatusChangeOpen(true);
                                  }}
                                >
                                  স্ট্যাটাস
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedApplication(app);
                                    setIsDeleteOpen(true);
                                  }}
                                >
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => fetchApplications(page - 1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        পৃষ্ঠা {page} / {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === totalPages}
                        onClick={() => fetchApplications(page + 1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* View Application Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>আবেদনের বিস্তারিত</DialogTitle>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">শিক্ষার্থীর নাম</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.studentName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">জন্ম তারিখ</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.dateOfBirth}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">ইমেইল</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.studentEmail}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">ফোন</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.studentPhone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">পিতার নাম</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.fatherName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">পিতার ফোন</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.fatherPhone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">বিভাগ</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.department.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">স্ট্যাটাস</label>
                  <p className="text-sm">
                    {getStatusBadge(selectedApplication.status)}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">বর্তমান ঠিকানা</label>
                <p className="text-sm text-muted-foreground">
                  {selectedApplication.presentAddress}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">স্থায়ী ঠিকানা</label>
                <p className="text-sm text-muted-foreground">
                  {selectedApplication.permanentAddress}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Change Status Dialog */}
      <Dialog open={isStatusChangeOpen} onOpenChange={setIsStatusChangeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>স্ট্যাটাস পরিবর্তন করুন</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>নতুন স্ট্যাটাস</Label>
              <Select
                value={newStatus}
                onValueChange={(value) =>
                  setNewStatus(value as "PENDING" | "APPROVED" | "REJECTED")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">মুলতুবি</SelectItem>
                  <SelectItem value="APPROVED">অনুমোদিত</SelectItem>
                  <SelectItem value="REJECTED">প্রত্যাখ্যাত</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStatusChangeOpen(false)}
            >
              বাতিল করুন
            </Button>
            <Button onClick={handleStatusChange} disabled={loading}>
              {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>আবেদন মুছতে চান?</AlertDialogTitle>
          <AlertDialogDescription>
            এই আবেদন মুছে ফেলা হবে এবং এটি পুনরুদ্ধার করা যাবে না। কি আপনি
            নিশ্চিত?
          </AlertDialogDescription>
          <div className="flex gap-3">
            <AlertDialogCancel>বাতিল করুন</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading ? "মুছছি..." : "মুছুন"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
