import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-primary mb-4">৪০৪</div>
        <h1 className="text-2xl font-bold mb-4">পৃষ্ঠাটি পাওয়া যায়নি</h1>
        <p className="text-muted-foreground mb-8">
          আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে, নামকরণ করা হয়েছে বা
          অস্থায়ীভাবে অনুপলব্ধ।
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              হোম পেজে যান
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/notices">
              <Search className="h-4 w-4 mr-2" />
              নোটিশ দেখুন
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
