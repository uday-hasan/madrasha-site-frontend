export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { label: "হোম", href: "/" },
  { label: "আমাদের সম্পর্কে", href: "/about" },
  {
    label: "বিভাগসমূহ",
    href: "/departments",
    children: [
      { label: "হিফজ বিভাগ", href: "/departments/hifz" },
      { label: "কিতাব বিভাগ", href: "/departments/kitab" },
      { label: "নাজেরা বিভাগ", href: "/departments/nazera" },
      { label: "মক্তব বিভাগ", href: "/departments/maktab" },
    ],
  },
  { label: "শিক্ষকমণ্ডলী", href: "/teachers" },
  { label: "ভর্তি তথ্য", href: "/admission" },
  { label: "ফলাফল", href: "/results" },
  { label: "গ্যালারি", href: "/gallery" },
  { label: "নোটিশ", href: "/notices" },
  { label: "প্রশ্ন ও উত্তর", href: "/question-answer" },
  { label: "অনুদান", href: "/donation" },
  { label: "যোগাযোগ", href: "/contact" },
];

export const adminNavItems: NavItem[] = [
  { label: "ড্যাশবোর্ড", href: "/admin/dashboard" },
  { label: "নোটিশ", href: "/admin/notices" },
  { label: "গ্যালারি", href: "/admin/gallery" },
  { label: "শিক্ষক", href: "/admin/teachers" },
  { label: "ফলাফল", href: "/admin/results" },
];
