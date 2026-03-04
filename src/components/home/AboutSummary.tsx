import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { siteConfig } from "@/lib/constants/site-config";
import { BookOpen, Users, Award, Heart } from "lucide-react";

const values = [
  { icon: BookOpen, title: "ইলম", desc: "জ্ঞান অর্জনে নিবেদিত" },
  { icon: Heart, title: "তাকওয়া", desc: "আল্লাহভীতির পথে" },
  { icon: Users, title: "খেদমত", desc: "সমাজ সেবায় অঙ্গীকারবদ্ধ" },
  { icon: Award, title: "আখলাক", desc: "উত্তম চরিত্র গঠনে" },
];

export function AboutSummary() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle
              title="আমাদের সম্পর্কে"
              subtitle=""
              centered={false}
            />
            <p className="text-muted-foreground leading-relaxed mb-4">
              {siteConfig.foundedYear} সালে প্রতিষ্ঠিত {siteConfig.name} বাংলাদেশের
              অন্যতম প্রধান ইসলামী শিক্ষা প্রতিষ্ঠান। কুরআন, হাদিস ও আধুনিক
              শিক্ষার সমন্বয়ে আমরা গড়ে তুলছি আলোকিত প্রজন্ম।
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {siteConfig.yearsOfExcellence} বছরেরও বেশি সময় ধরে এই প্রতিষ্ঠান
              হাজারো শিক্ষার্থীকে ইসলামী জ্ঞানে সমৃদ্ধ করে আসছে। আমাদের
              অভিজ্ঞ শিক্ষক মণ্ডলী প্রতিটি শিক্ষার্থীর সার্বিক বিকাশে
              নিবেদিত।
            </p>
            <Button asChild>
              <Link href="/about">বিস্তারিত জানুন</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card p-6 rounded-lg border text-center hover:shadow-md transition-shadow"
              >
                <value.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-1">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
