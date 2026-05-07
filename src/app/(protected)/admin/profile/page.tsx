"use client";

import { useEffect, useState } from "react";
import { authService } from "@/api/auth.service";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { User } from "@/types/auth";

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface EditNameForm {
  name: string;
}

export default function AdminProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState<ChangePasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [editNameMode, setEditNameMode] = useState(false);
  const [editName, setEditName] = useState<EditNameForm>({ name: "" });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await authService.getMe();
      setUser(response.data);
      setEditName({ name: response.data.name });
      setError(null);
    } catch (err) {
      setError("প্রোফাইল লোড করতে ব্যর্থ হয়েছে");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.currentPassword) {
      setError("বর্তমান পাসওয়ার্ড প্রয়োজন");
      return false;
    }

    if (!formData.newPassword) {
      setError("নতুন পাসওয়ার্ড প্রয়োজন");
      return false;
    }

    if (formData.newPassword.length < 6) {
      setError("নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হওয়া আবশ্যক");
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("নতুন পাসওয়ার্ড এবং নিশ্চয়করণ পাসওয়ার্ড মিলছে না");
      return false;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError("নতুন পাসওয়ার্ড বর্তমান পাসওয়ার্ডের মতো হতে পারে না");
      return false;
    }

    return true;
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await authService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      setSuccess("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে। দয়া করে আবার লগইন করুন");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeName = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!editName.name.trim()) {
      setError("নাম প্রয়োজন");
      return;
    }

    if (editName.name.trim().length < 2) {
      setError("নাম কমপক্ষে ২ অক্ষর হওয়া আবশ্যক");
      return;
    }

    if (editName.name === user?.name) {
      setError("নতুন নাম বর্তমান নামের মতো হতে পারে না");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await authService.updateProfile({
        name: editName.name,
      });

      setUser(response.data);
      setSuccess("নাম সফলভাবে পরিবর্তন হয়েছে");
      setEditNameMode(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("নাম পরিবর্তন ব্যর্থ হয়েছে");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">প্রোফাইল</h1>
          <p className="text-muted-foreground mt-1">
            আপনার অ্যাকাউন্ট তথ্য এবং নিরাপত্তা পরিচালনা করুন
          </p>
        </div>
        <div className="flex items-center justify-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">প্রোফাইল</h1>
        <p className="text-muted-foreground mt-1">
          আপনার অ্যাকাউন্ট তথ্য এবং নিরাপত্তা পরিচালনা করুন
        </p>
      </div>

      {/* Global Error */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
          <span className="text-red-800">{error}</span>
        </div>
      )}

      {/* Global Success */}
      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
          <span className="text-green-800">{success}</span>
        </div>
      )}

      {/* Profile Information */}
      {user && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              অ্যাকাউন্ট তথ্য
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name Field */}
            {editNameMode ? (
              <div className="space-y-2">
                <Label htmlFor="name">নাম</Label>
                <div className="flex gap-2">
                  <Input
                    id="name"
                    type="text"
                    value={editName.name}
                    onChange={(e) => setEditName({ name: e.target.value })}
                    disabled={isSubmitting}
                    placeholder="আপনার নাম লিখুন"
                  />
                  <Button
                    size="sm"
                    onClick={handleChangeName}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "সেভ"
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditNameMode(false);
                      setEditName({ name: user.name });
                      setError(null);
                    }}
                    disabled={isSubmitting}
                  >
                    বাতিল
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  নাম
                </Label>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-lg font-semibold">{user.name}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditNameMode(true)}
                  >
                    সম্পাদন করুন
                  </Button>
                </div>
              </div>
            )}

            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                ইমেইল
              </Label>
              <p className="text-lg font-semibold mt-1">{user.email}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Change Password Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            পাসওয়ার্ড পরিবর্তন করুন
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">বর্তমান পাসওয়ার্ড</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  placeholder="আপনার বর্তমান পাসওয়ার্ড লিখুন"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords((prev) => ({
                      ...prev,
                      current: !prev.current,
                    }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">নতুন পাসওয়ার্ড</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  placeholder="নতুন পাসওয়ার্ড লিখুন (কমপক্ষে ৬ অক্ষর)"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords((prev) => ({
                      ...prev,
                      new: !prev.new,
                    }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  placeholder="নতুন পাসওয়ার্ড আবার লিখুন"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords((prev) => ({
                      ...prev,
                      confirm: !prev.confirm,
                    }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  পাসওয়ার্ড পরিবর্তন করছি...
                </>
              ) : (
                "পাসওয়ার্ড পরিবর্তন করুন"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
