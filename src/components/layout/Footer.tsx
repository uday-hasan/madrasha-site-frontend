import Link from "next/link";
import { siteConfig } from "@/lib/constants/site-config";
import { navItems } from "@/lib/constants/navigation";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Clock, Facebook, Youtube } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">
              {siteConfig.name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {siteConfig.description}
            </p>
            <p className="text-xs text-muted-foreground">
              প্রতিষ্ঠাকাল: {siteConfig.foundedYear}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">দ্রুত লিংক</h3>
            <ul className="space-y-2">
              {navItems.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">যোগাযোগ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>
                  {siteConfig.address}, {siteConfig.city}
                </span>
              </li>
              {siteConfig.phone.map((phone) => (
                <li
                  key={phone}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span dir="ltr">{phone}</span>
                </li>
              ))}
              {siteConfig.email.slice(0, 1).map((email) => (
                <li
                  key={email}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span>{email}</span>
                </li>
              ))}
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>{siteConfig.officeHours}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Image
                  src="/images/whatsapp.svg"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="h-4 w-4 mt-0.5 text-primary shrink-0"
                />

                <span>{siteConfig.phone[1]}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Facebook className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <a href={siteConfig.socialLinks.facebook} target="_blank">
                  Facebook
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Youtube className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <a href={siteConfig.socialLinks.youtube} target="_blank">
                  Youtube
                </a>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">গুরুত্বপূর্ণ লিংক</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admission"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  ভর্তি তথ্য
                </Link>
              </li>
              <li>
                <Link
                  href="/results"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  পরীক্ষার ফলাফল
                </Link>
              </li>
              <li>
                <Link
                  href="/notices"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  নোটিশ বোর্ড
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  ফটো গ্যালারি
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  যোগাযোগ করুন
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} {siteConfig.name}। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-xs text-muted-foreground">
            প্রতিষ্ঠাতা: {siteConfig.founderName}
          </p>
        </div>
      </div>
    </footer>
  );
}
