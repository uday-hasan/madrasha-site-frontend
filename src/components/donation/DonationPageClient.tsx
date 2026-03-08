"use client";

import { useEffect } from "react";
import { useDonationStore } from "@/stores/useDonationStore";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { DonationBanner } from "@/components/donation/DonationBanner";
import { DonationCategoryCard } from "@/components/donation/DonationCategoryCard";
import { DonationMethodCard } from "@/components/donation/DonationMethodCard";
import { DonationContact } from "@/components/donation/DonationContact";
import { Card, CardContent } from "@/components/ui/card";

export default function DonationPageClient() {
  const { data, loading, fetchDonationData } = useDonationStore();

  useEffect(() => {
    fetchDonationData();
  }, [fetchDonationData]);

  if (loading || !data) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* Hero Banner with Quranic verse */}
      <DonationBanner
        bannerText={data.bannerText}
        quranicVerse={data.quranicVerse}
      />

      {/* Donation Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="দানের খাতসমূহ"
            subtitle="আপনি নিম্নোক্ত যেকোনো খাতে দান করতে পারেন"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.categories.map((category) => (
              <DonationCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="দানের মাধ্যম"
            subtitle="নিচের যেকোনো মাধ্যমে আপনার দান পাঠাতে পারেন"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.methods.map((method) => (
              <DonationMethodCard key={method.id} method={method} />
            ))}
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-primary/20">
              <CardContent className="p-6 md:p-8 text-center">
                <p className="text-3xl mb-4">🤲</p>
                <h3 className="text-lg md:text-xl font-bold text-card-foreground mb-3">
                  গুরুত্বপূর্ণ তথ্য
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  দান পাঠানোর পর অনুগ্রহ করে ট্রানজেকশন আইডি/রেফারেন্স নম্বরসহ
                  আমাদের ফোন বা ইমেইলে জানাবেন। আপনার দানের রসিদ প্রদান করা হবে।
                  যেকোনো প্রশ্নে নিচের নম্বরে যোগাযোগ করুন।
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <DonationContact contact={data.contactForDonation} />
          </div>
        </div>
      </section>
    </>
  );
}
