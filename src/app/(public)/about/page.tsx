import AboutPage from "@/components/about/AboutPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `আমাদের সম্পর্কে | About Us`,
  description:
    "মাদরাসা দারুল আরকাম আল ইসলামিয়ার ইতিহাস, লক্ষ্য ও উদ্দেশ্য সম্পর্কে জানুন।",
};

import React from "react";

const page = () => {
  return (
    <div>
      <AboutPage />
    </div>
  );
};

export default page;
