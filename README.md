# দারুল উলুম মাদ্রাসা - ওয়েবসাইট ফ্রন্টএন্ড

একটি সম্পূর্ণ বাংলাদেশী মাদ্রাসা ওয়েবসাইট ফ্রন্টএন্ড, Next.js 16, TypeScript, Tailwind CSS দিয়ে তৈরি।

## 🌟 বৈশিষ্ট্যসমূহ

- **সম্পূর্ণ বাংলা UI** — সকল টেক্সট বাংলায়
- **হিন্দ সিলিগুড়ি ফন্ট** — Google Fonts থেকে বাংলা ফন্ট
- **৪টি কালার স্কিম** — সবুজ (সক্রিয়), নীল, কালো-সাদা, টিল (কমেন্টে)
- **লাইট/ডার্ক মোড** — next-themes দিয়ে
- **Google Translate** — বাংলা, ইংরেজি, আরবি
- **GSAP অ্যানিমেশন** — সূক্ষ্ম স্ক্রোল অ্যানিমেশন
- **Zustand স্টেট ম্যানেজমেন্ট** — ফেক API প্যাটার্ন সহ
- **অ্যাডমিন প্যানেল** — proxy.ts দিয়ে সুরক্ষিত
- **১০০% রেসপন্সিভ** — সকল ডিভাইসে
- **SEO অপটিমাইজড** — metadata, sitemap, robots.txt

## 📁 ফোল্ডার স্ট্রাকচার

```
src/
├── app/
│   ├── (public)/          # পাবলিক পেজসমূহ
│   │   ├── page.tsx       # হোম পেজ
│   │   ├── about/         # আমাদের সম্পর্কে
│   │   ├── departments/   # বিভাগসমূহ (সহ [slug])
│   │   ├── teachers/      # শিক্ষকমণ্ডলী
│   │   ├── admission/     # ভর্তি তথ্য
│   │   ├── results/       # পরীক্ষার ফলাফল
│   │   ├── gallery/       # ফটো গ্যালারি
│   │   ├── notices/       # নোটিশ বোর্ড (সহ [slug])
│   │   └── contact/       # যোগাযোগ
│   ├── (protected)/       # সুরক্ষিত অ্যাডমিন পেজ
│   │   └── admin/
│   │       ├── login/     # লগইন
│   │       └── dashboard/ # ড্যাশবোর্ড
│   ├── layout.tsx         # রুট লেআউট
│   └── not-found.tsx      # ৪০৪ পেজ
├── components/
│   ├── ui/                # ShadCN-স্টাইল UI কম্পোনেন্ট
│   ├── shared/            # শেয়ার্ড কম্পোনেন্ট
│   ├── layout/            # Navbar, Footer, MobileMenu
│   ├── home/              # হোম পেজ কম্পোনেন্ট
│   └── admin/             # অ্যাডমিন কম্পোনেন্ট
├── lib/
│   ├── api/               # API লেয়ার (ভবিষ্যতের জন্য)
│   ├── constants/         # সাইট কনফিগ, নেভিগেশন
│   ├── fake-data/         # ডেমো ডেটা
│   └── utils/             # cn, helpers
├── providers/             # ThemeProvider
├── stores/                # Zustand স্টোর (১১টি)
├── types/                 # TypeScript টাইপ (১০টি)
└── proxy.ts           # অ্যাডমিন রুট সুরক্ষা
```

## 🚀 ইনস্টলেশন

```bash
# ক্লোন করুন
git clone https://github.com/uday-hasan/madrasha-site-frontend.git
cd madrasha-site-frontend

# ডিপেনডেন্সি ইনস্টল করুন
npm install

# ডেভেলপমেন্ট সার্ভার চালু করুন
npm run dev
```

## 🔧 পরিবেশ পরিবর্তনশীল

```bash
cp .env.local.example .env.local
```

`.env.local` এডিট করুন:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## 🔐 অ্যাডমিন লগইন (ডেমো)

- **URL:** `/admin/login`
- **ইমেইল:** `admin@darululoom.edu.bd`
- **পাসওয়ার্ড:** `admin123`

## 🎨 কালার স্কিম পরিবর্তন

`src/app/globals.css` ফাইলে ৪টি কালার স্কিম আছে। অন্য স্কিম ব্যবহার করতে কমেন্ট আনকমেন্ট করুন:

1. **সবুজ (সক্রিয়)** — ইসলামিক সবুজ থিম
2. **নীল** — প্রফেশনাল নীল থিম
3. **কালো-সাদা** — মিনিমাল থিম
4. **টিল** — আধুনিক টিল থিম

## 📡 ব্যাকএন্ড সংযোগ

ব্যাকএন্ড (Express.js) রেডি হলে:

1. `src/lib/api/client.ts` এ axios আনকমেন্ট করুন
2. `next.config.ts` এ API proxy আনকমেন্ট করুন
3. Zustand স্টোরে `// TODO` কমেন্টের ফেক কল রিপ্লেস করুন

## 🚀 ডেপ্লয়মেন্ট

### Vercel (সহজতম)
```bash
# Vercel CLI দিয়ে
npm i -g vercel
vercel
```

### Hostinger VPS
`next.config.ts` এ আনকমেন্ট করুন:
```typescript
output: 'standalone',
```

### স্ট্যাটিক হোস্টিং
```typescript
output: 'export',
images: { unoptimized: true },
```

## 🛠️ ব্যবহৃত প্রযুক্তি

- **Next.js 16** — App Router, Server Components
- **TypeScript** — টাইপ সেফটি
- **Tailwind CSS** — স্টাইলিং
- **Zustand** — স্টেট ম্যানেজমেন্ট
- **GSAP** — অ্যানিমেশন
- **next-themes** — ডার্ক মোড
- **Radix UI** — হেডলেস UI কম্পোনেন্ট
- **Lucide React** — আইকন
- **class-variance-authority** — ভেরিয়েন্ট-ভিত্তিক স্টাইলিং

## 📞 যোগাযোগ

দারুল উলুম মাদ্রাসা  
৪২, মাদ্রাসা রোড, পুরান ঢাকা  
ফোন: ০১৭১২-৩৪৫৬৭৮  
ইমেইল: info@darululoom.edu.bd
