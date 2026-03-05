"use client";

import { useEffect, useMemo } from "react";
import { useQAStore } from "@/stores/useQAStore";
import QAQuestionCard from "@/components/qa/QAQuestionCard";
import QACategoryFilter from "@/components/qa/QACategoryFilter";
import QASearchBar from "@/components/qa/QASearchBar";

import { MessageSquarePlus, HelpCircle } from "lucide-react";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { PageHeader } from "../shared/PageHeader";

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
    <main>
      <PageHeader
        title={data.pageTitle}
        subtitle={data.pageDescription}
        // breadcrumbs={[
        //   { label: 'হোম', href: '/' },
        //   { label: 'প্রশ্ন-উত্তর' },
        // ]}
      />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-3 md:p-5 text-center">
            <p className="text-2xl md:text-3xl font-bold text-primary">
              {totalQuestions}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              মোট প্রশ্ন
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 md:p-5 text-center">
            <p className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">
              {resolvedQuestions}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              উত্তর দেওয়া হয়েছে
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 md:p-5 text-center">
            <p className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">
              {pendingQuestions}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              উত্তরের অপেক্ষায়
            </p>
          </div>
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
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <MessageSquarePlus className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold text-foreground mb-1">
                আপনার প্রশ্ন জিজ্ঞাসা করুন
              </h3>
              <p className="text-sm text-muted-foreground">
                দ্বীনি যেকোনো বিষয়ে প্রশ্ন করতে পারেন। আমাদের অভিজ্ঞ
                শিক্ষকমণ্ডলী যথাসম্ভব দ্রুত উত্তর দেবেন ইনশাআল্লাহ।
              </p>
            </div>
            <button
              className="w-full sm:w-auto px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              onClick={() => {
                // TODO: Replace with real modal/form when backend is ready
                alert("পরবর্তীতে এখান থেকে প্রশ্ন করতে পারবেন।");
              }}
            >
              <MessageSquarePlus className="w-4 h-4" />
              প্রশ্ন করুন
            </button>
          </div>
        </div>

        {/* Questions list */}
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
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {searchQuery
                  ? `"${searchQuery}" অনুসন্ধানে কোনো প্রশ্ন পাওয়া যায়নি। অন্য কিছু দিয়ে চেষ্টা করুন।`
                  : "এই বিভাগে এখনো কোনো প্রশ্ন নেই।"}
              </p>
              {(searchQuery || selectedCategory !== "সকল") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("সকল");
                  }}
                  className="mt-4 px-4 py-2 bg-muted text-foreground rounded-lg text-sm hover:bg-muted/80 transition-colors"
                >
                  ফিল্টার রিসেট করুন
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer note */}
        {filteredQuestions.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-xs md:text-sm text-muted-foreground">
              মোট {filteredQuestions.length} টি প্রশ্ন প্রদর্শিত হচ্ছে
              {selectedCategory !== "সকল" && ` — বিভাগ: ${selectedCategory}`}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
