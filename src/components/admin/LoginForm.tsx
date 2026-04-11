"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";
import { authService } from "@/api/auth.service";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";
import { ApiError } from "@/utils/ApiError";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Local states for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null); // Reset error state on new attempt

    try {
      // 1. Call Service
      const data = await authService.login({ email, password });

      // 2. Update Zustand (data contains { user, accessToken, refreshToken })
      // Based on your backend authService.login return:
      setAuth(data);

      toast.success("লগইন সফল হয়েছে");

      // 3. Redirect
      router.push("/admin/dashboard");
      router.refresh(); // Force refresh to update server-side segments
    } catch (error) {
      // 4. Handle Errors
      let msg = "লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";

      if (error instanceof ApiError) {
        msg = error.message; // Message from your backend AppError
      } else if (error instanceof Error) {
        msg = error.message;
      }

      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md border-t-4 border-t-primary">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4 shadow-lg">
            দ
          </div>
          <CardTitle className="text-2xl font-bold">অ্যাডমিন লগইন</CardTitle>
          <p className="text-muted-foreground text-sm">
            দারুল উলুম মাদ্রাসা পরিচালনা প্যানেল
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Inline Error Display */}
            {errorMessage && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                <AlertCircle className="h-4 w-4" />
                {errorMessage}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">ইমেইল</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@darululoom.edu.bd"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">পাসওয়ার্ড</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  লগইন হচ্ছে...
                </>
              ) : (
                "লগইন করুন"
              )}
            </Button>

            <div className="pt-2">
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-semibold">
                Test Credentials
              </p>
              <p className="text-xs text-center text-muted-foreground/80 mt-1">
                admin@darululoom.edu.bd / admin123
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
