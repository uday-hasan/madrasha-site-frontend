import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { siteConfig } from "@/lib/constants/site-config";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "মাদ্রাসা",
    "ইসলামী শিক্ষা",
    "কুরআন",
    "হাদিস",
    "ঢাকা",
    "বাংলাদেশ",
    siteConfig.nameEn,
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
