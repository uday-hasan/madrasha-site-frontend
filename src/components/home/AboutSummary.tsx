import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { siteConfig } from "@/lib/constants/site-config";
import { BookOpen, Users, Award, Heart } from "lucide-react";

const values = [
  {
    icon: BookOpen,
    title: "তালীম",
    desc: "রসূলুল্লহ সল্লাল্লহু আলাইহি ওয়া সাল্লাম বলেন, তোমাদের মধ্যে শ্রেষ্ঠ সেই, যে নিজে কুরআন শেখে এবং অন্যকে তা শেখায়। (সহীহ বুখারী, হাদীস ৫০২৭) দ্বীনের মৌলিক জ্ঞান অর্জন করা ফরযে আইন, যা সকল মুসলমানের জন্য আবশ্যিক। (ইবনু মাজাহ হা/২২৪; মিশকাত হা/২১৮) তাই আসুন আমরা সকলে মিলে কোরআন শিখি এবং তা অন্যের কাছে পৌছে দিয় একটি কোরআন ও হাদীস তথা ইসলামী সমাজ গঠনে সচেষ্ট হই। ",
  },
  {
    icon: Heart,
    title: "তাযকীয়া",
    desc: `অর্থ আত্মশুদ্ধী।  আল্লাহ বলেন নিঃসন্দেহে সে-ই সফলকাম হয়েছে, যে নিজ আত্মাকে পরিশুদ্ধ করেছে। আর সে-ই ব্যর্থ হয়েছে, যে নিজ আত্মাকে কলুষিত করেছে। 
-আল কোরআন (সুরা: আশ-শামস)
 এবং আল্লাহর কথা স্মরণ করে নামাযে দণ্ডায়মান হয়েছে। সুতরাং ইলম শিখে আপন আত্মশুদ্ধী করে কায়মনোবাক্যে নামাজ আদায় করা আত্মশুদ্ধীর একটি অন্যতম নিদর্শন। 
`,
  },
  {
    icon: Users,
    title: "খেদমত",
    desc: "অর্থ সেবা করা। আর সবচেয়ে বড় সেবা হলো আল্লাহর সাথে মানুষের সম্পর্ক তৈরী করিয়ে দেয়া।   সে মর্মে আল্লাহ বলেন, তোমরা পরস্পরে সৎকর্মে এবং পরস্পর গোনাহ এবং শত্রুতার কাজে কাজে সহযোগীতা করো না। তাই কোরআন ও হাদীসের শিক্ষার আলোকে আত্মশুদ্ধী করে মহান আল্লাহর এ বাণী বিশ্বময় দাওয়াতের মাধ্যমে পৌছে দিয়ে মানব জাতিকে জান্নামের লেলিহান অগ্নিশিখা থেকে রক্ষা করার সেবাই আমাদের অন্যতম লক্ষ্য। ",
  },
  {
    icon: Award,
    title: "দাওয়াত",
    desc: "আল্লাহ বলেছেন, ঐ ব্যাক্তি চেয়ে উত্তম কথা আর কাহার হইতে পারে ? যে মানুষকে আল্লাহর দিকে আহবান করে।  রসূলুল্লহ সল্লাল্লহু আলাইহি ওয়া সাল্লাম বলেন, বলেছেন অন্যত্রে ভালো কাজের পথ দেখানো তা করার মতই। অন্যত্র আল্লাহ বলেন, তোমার কাছে একটি বাণী হলেও তা অন্যের কাছে পৌছে দাও।তাই আসুন আমরা আপন আপন অস্থান থেকে দাওয়াতের মত উত্তম কাজে নিজেকে আত্মনিয়োগ করি। ",
  },
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
              {siteConfig.foundedYear} সালে প্রতিষ্ঠিত {siteConfig.name}{" "}
              বাংলাদেশের অন্যতম প্রধান ইসলামী শিক্ষা প্রতিষ্ঠান। কুরআন, হাদিস ও
              আধুনিক শিক্ষার সমন্বয়ে আমরা গড়ে তুলছি আলোকিত প্রজন্ম।
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {siteConfig.yearsOfExcellence} বছরেরও বেশি সময় ধরে এই প্রতিষ্ঠান
              হাজারো শিক্ষার্থীকে ইসলামী জ্ঞানে সমৃদ্ধ করে আসছে। আমাদের অভিজ্ঞ
              শিক্ষক মণ্ডলী প্রতিটি শিক্ষার্থীর সার্বিক বিকাশে নিবেদিত।
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
