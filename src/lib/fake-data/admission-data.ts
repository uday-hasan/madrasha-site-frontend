import { AdmissionInfo } from "@/types/admission";

export const fakeAdmissionInfo: AdmissionInfo = {
  isOpen: true,
  session: "২০২৫-২০২৬",
  startDate: "২০২৫ সালের ১ ফেব্রুয়ারি",
  endDate: "২০২৫ সালের ২৮ ফেব্রুয়ারি",
  requirements: [
    {
      department: "মক্তব বিভাগ",
      minimumAge: "৪-৬ বছর",
      minimumQualification: "কোনো পূর্ব যোগ্যতার প্রয়োজন নেই",
      documents: ["জন্মনিবন্ধন সনদ", "পাসপোর্ট সাইজ ছবি ২ কপি"],
      fees: "মাসিক ৫০০ টাকা",
      seats: 60,
    },
    {
      department: "নাজেরা বিভাগ",
      minimumAge: "৬-১০ বছর",
      minimumQualification: "আলিফ-বা-তা জানা",
      documents: ["জন্মনিবন্ধন সনদ", "পাসপোর্ট সাইজ ছবি ২ কপি"],
      fees: "মাসিক ৬০০ টাকা",
      seats: 50,
    },
    {
      department: "হিফজ বিভাগ",
      minimumAge: "৭-১৩ বছর",
      minimumQualification: "নাজেরা সম্পন্ন",
      documents: [
        "জন্মনিবন্ধন সনদ",
        "নাজেরা সনদ",
        "পাসপোর্ট সাইজ ছবি ২ কপি",
        "অভিভাবকের জাতীয় পরিচয়পত্র",
      ],
      fees: "মাসিক ১০০০ টাকা",
      seats: 40,
    },
    {
      department: "ইবতেদায়ী বিভাগ",
      minimumAge: "৬-১০ বছর",
      minimumQualification: "নাজেরা সম্পন্ন অথবা সমতুল্য",
      documents: [
        "জন্মনিবন্ধন সনদ",
        "পূর্ববর্তী পরীক্ষার সনদ",
        "পাসপোর্ট সাইজ ছবি ২ কপি",
      ],
      fees: "মাসিক ৮০০ টাকা",
      seats: 50,
    },
  ],
  process: [
    "অফিসে এসে ভর্তি ফরম সংগ্রহ করুন (ফরমের মূল্য: ৫০ টাকা)",
    "প্রয়োজনীয় কাগজপত্র সহ ফরম পূরণ করুন",
    "ভর্তি পরীক্ষায় অংশগ্রহণ করুন",
    "ফলাফল প্রকাশের পর ভর্তি নিশ্চিত করুন",
    "ভর্তি ফি পরিশোধ করুন",
  ],
  importantDates: [
    { event: "ভর্তি ফরম বিতরণ শুরু", date: "১ ফেব্রুয়ারি ২০২৫" },
    { event: "ফরম জমা দেওয়ার শেষ তারিখ", date: "২০ ফেব্রুয়ারি ২০২৫" },
    { event: "ভর্তি পরীক্ষা", date: "২৫ ফেব্রুয়ারি ২০২৫" },
    { event: "ফলাফল প্রকাশ", date: "২৬ ফেব্রুয়ারি ২০২৫" },
    { event: "ক্লাস শুরু", date: "১ মার্চ ২০২৫" },
  ],
};
