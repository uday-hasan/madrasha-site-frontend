"use client";

import { useEffect, useMemo } from "react";
import { useQAStore } from "@/stores/useQAStore";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { QAQuestionCard } from "@/components/qa/QAQuestionCard";
import { QACategoryFilter } from "@/components/qa/QACategoryFilter";
import { QASearchBar } from "@/components/qa/QASearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, HelpCircle } from "lucide-react";

export default function QAPageClient() {
  const {
    data,
    loading,
    selectedCategory,
    searchQuery,
    fetchQAData,
    setSelectedCategory,
    setSearchQuery,
  } = useQAStore();

  useEffect(() => {
    fetchQAData();
  }, [fetchQAData]);

  const filteredQuestions = useMemo(() => {
    if (!data) return [];
    return data.questions.filter((q) => {
      const matchesCategory =
        selectedCategory === "সকল" || q.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        q.question.includes(searchQuery) ||
        q.authorName.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [data, selectedCategory, searchQuery]);

  if (loading || !data) {
    return <LoadingSpinner />;
  }

  const totalQuestions = data.questions.length;
  const resolvedQuestions = data.questions.filter((q) => q.isResolved).length;
  const pendingQuestions = totalQuestions - resolvedQuestions;

  return (
    <>
      <PageHeader title={data.pageTitle} subtitle={data.pageDescription} />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
          <Card>
            <CardContent className="p-3 md:p-5 text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {totalQuestions}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                মোট প্রশ্ন
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 md:p-5 text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {resolvedQuestions}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                উত্তর দেওয়া হয়েছে
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 md:p-5 text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {pendingQuestions}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                উত্তরের অপেক্ষায়
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="space-y-4 mb-8">
          <QASearchBar value={searchQuery} onChange={setSearchQuery} />
          <QACategoryFilter
            categories={data.categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Ask question CTA */}
        <Card className="border-primary/20 mb-8">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MessageSquarePlus className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-bold text-card-foreground mb-1">
                  আপনার প্রশ্ন জিজ্ঞাসা করুন
                </h3>
                <p className="text-sm text-muted-foreground">
                  দ্বীনি যেকোনো বিষয়ে প্রশ্ন করতে পারেন। আমাদের অভিজ্ঞ
                  শিক্ষকমণ্ডলী যথাসম্ভব দ্রুত উত্তর দেবেন ইনশাআল্লাহ।
                </p>
              </div>
              <Button
                className="w-full sm:w-auto"
                onClick={() => {
                  // TODO: Replace with real modal/form when backend is ready
                  alert("ব্যাকএন্ড সংযুক্ত হলে এখান থেকে প্রশ্ন করতে পারবেন।");
                }}
              >
                <MessageSquarePlus className="w-4 h-4 mr-2" />
                প্রশ্ন করুন
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <QAQuestionCard key={question.id} question={question} />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-10 h-10 text-muted-foreground/40" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                কোনো প্রশ্ন পাওয়া যায়নি
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
                {searchQuery
                  ? `"${searchQuery}" অনুসন্ধানে কোনো প্রশ্ন পাওয়া যায়নি। অন্য কিছু দিয়ে চেষ্টা করুন।`
                  : "এই বিভাগে এখনো কোনো প্রশ্ন নেই।"}
              </p>
              {(searchQuery || selectedCategory !== "সকল") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("সকল");
                  }}
                >
                  ফিল্টার রিসেট করুন
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Footer count */}
        {filteredQuestions.length > 0 && (
          <p className="mt-8 text-center text-xs md:text-sm text-muted-foreground">
            মোট {filteredQuestions.length} টি প্রশ্ন প্রদর্শিত হচ্ছে
            {selectedCategory !== "সকল" && ` — বিভাগ: ${selectedCategory}`}
          </p>
        )}
      </div>
    </>
  );
}
