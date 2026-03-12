import { DashboardLayout } from "@/components/admin/DashboardLayout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
}
