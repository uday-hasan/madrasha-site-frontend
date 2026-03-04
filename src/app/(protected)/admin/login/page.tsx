import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "অ্যাডমিন লগইন",
};

export default function AdminLoginPage() {
  return <LoginForm />;
}
