export const siteConfig = {
  // === Core Identity ===
  name: "মাদরাসা দারুল আরকাম আল ইসলামিয়া",
  nameEn: "Madrasa Darul Arkam Al Islamia",
  tagline: "ইলম ও আমলের পথে আদর্শ প্রজন্ম গঠন",
  description:
    "সন্তান আপনার, তাকে খোদাভীরু, আদর্শবান অভিজ্ঞতা সম্পন্ন আদর্শ সুনাগরিক গড়ে তোলার দায়িত্ব আমাদের।",

  // === Parent Organization ===
  parentOrganization: {
    name: "আল আশরাফ ফাউন্ডেশন",
    nameEn: "Al Ashraf Foundation",
    description:
      "আল আশরাফ ফাউন্ডেশন আমাদের মাদার প্রতিষ্ঠান। এর অধীনে মাদরাসা দারুল আরকাম আল ইসলামিয়া, আল আশরাফ পাঠাগার এবং কালক্রমে আরো কিছু কার্যকরী পদক্ষেপ পরিচালিত হবে। ইনশাআল্লাহ।",
    subsidiaries: ["মাদরাসা দারুল আরকাম আল ইসলামিয়া", "আল আশরাফ পাঠাগার"],
  },

  // === Location ===
  address: "১৪, পশ্চিম শিকারপুর (সাঈদী মসজিদ সংলগ্ন)",
  city: "পিরোজপুর",
  district: "পিরোজপুর",
  postalCode: "৮৫০০",
  phone: ["01723-567282", "01704-300316"],
  email: ["darularqam1.2.24@gmail.com"],

  // === Leadership ===
  chairman: "আলহাজ্ব ক্বারী আলী আহমাদ",
  viceChairman: "আলহাজ্ব মোঃ গোলাম মোস্তফা",
  founder: "আব্দুল্লাহ আল মামুন",
  founderName: "আব্দুল্লাহ আল মামুন",
  currentPrincipal: "আব্দুল্লাহ আল মামুন (শাহীন)",
  founderDesignation: "প্রতিষ্ঠাতা ও প্রিন্সিপাল",
  foundedYear: 2024,

  // === Stats ===

  totalStudents: 90,
  totalTeachers: 5,
  totalDepartments: 3,
  yearsOfExcellence: 2,

  // === Departments ===
  departments: [
    "নূরানী কিন্ডারগার্টেন",
    "নাজেরা বিভাগ",
    "হিফজুল কোরআন বিভাগ",
    "প্রভাতী ও বৈকালীন মক্তব বিভাগ",
    "ফরজে আইন বিভাগ",
  ],

  // === Boarding Types (HIGHLIGHT on homepage) ===
  boardingTypes: ["আবাসিক", "অনাবাসিক", "ডে-কেয়ার"],

  // === Facilities ===
  facilities: [
    "আবাসিক ব্যবস্থা",
    "অনাবাসিক ব্যবস্থা",
    "ডে-কেয়ার ব্যবস্থা",
    "সার্বক্ষণিক সিসি ক্যামেরা পর্যবেক্ষণ",
    "পরিচ্ছন্ন পরিবেশে প্রত্যেকের জন্য আলাদা আবাসিক থাকার ব্যবস্থা",
    "ঘরোয়া পরিবেশে স্বাস্থ্যসম্মত ও সুস্বাদু খাবার",
    "খেলাধ��লা ও শরীরচর্চার সুব্যবস্থা",
    "কম্পিউটার প্রশিক্ষণ ল্যাব (প্রস্তাবিত)",
    "বিষয়ভিত্তিক পাঠাগার (প্রস্তাবিত)",
    "মেধাভিত্তিক শিক্ষাবৃত্তি",
    "এতিম ও দুস্থ শিক্ষার্থীদের শিক্ষাবৃত্তি",
    "নিজস্ব হাতের লেখা উন্নয়ন পদ্ধতি",
    "নিয়মিত হোমওয়ার্ক ও তদারকি",
    "প্রতি তিন মাসে ইসলাহী সেমিনার",
    "মহিলা অভিভাবিকাদের সাপ্তাহিক তালীম",
    "অভিভাবক সম্মেলন আয়োজন",
  ],

  socialLinks: {
    facebook: "https://www.facebook.com/share/1B9vWz88R7/",
    youtube: "https://youtube.com/@abumasrur6002?si=ZbzXcN6umpZKw-4Q",
  },
  officeHours: "শনি - বৃহস্পতি: সকাল ৮টা - বিকেল ৪টা",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // === Highlighted Tagline (use prominently) ===
  highlightedTagline:
    "সন্তান আপনার, তাকে শিক্ষিত, আদর্শ, খোদাভীরু সুনাগরিক করে গড়ে তোলার দায়িত্ব আমাদের। ইনশাআল্লাহ।",
};
