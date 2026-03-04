import { HeroBanner } from "@/components/home/HeroBanner";
import { MarqueeNotice } from "@/components/home/MarqueeNotice";
import { AboutSummary } from "@/components/home/AboutSummary";
import { StatsCounter } from "@/components/home/StatsCounter";
import { DepartmentsOverview } from "@/components/home/DepartmentsOverview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { LatestNews } from "@/components/home/LatestNews";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <MarqueeNotice />
      <AboutSummary />
      <StatsCounter />
      <DepartmentsOverview />
      <LatestNews />
      <GalleryPreview />
    </>
  );
}
