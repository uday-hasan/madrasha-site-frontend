"use client";
import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { useResultStore } from "@/stores/resultStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export default function ResultsPage() {
  const [rollNumber, setRollNumber] = useState("");
  const [year, setYear] = useState("");
  const { searchResults, isSearching, searchResults_fn } = useResultStore();
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    await searchResults_fn({ rollNumber, year });
  };

  return (
    <>
      <PageHeader
        title="পরীক্ষার ফলাফল"
        subtitle="রোল নম্বর দিয়ে ফলাফল খুঁজুন"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <SectionTitle title="ফলাফল অনুসন্ধান" centered={false} />

          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roll">রোল নম্বর</Label>
                    <Input
                      id="roll"
                      placeholder="যেমন: ১০০১"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">পরীক্ষার বছর</Label>
                    <Input
                      id="year"
                      placeholder="যেমন: ২০২৪"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isSearching}>
                  <Search className="h-4 w-4 mr-2" />
                  {isSearching ? "অনুসন্ধান করা হচ্ছে..." : "ফলাফল খুঁজুন"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {searched && (
            <div>
              <h3 className="font-semibold mb-4">
                {searchResults.length > 0
                  ? `${searchResults.length}টি ফলাফল পাওয়া গেছে`
                  : "কোনো ফলাফল পাওয়া যায়নি"}
              </h3>

              <div className="space-y-4">
                {searchResults.map((result) => (
                  <Card key={result.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-lg">{result.studentName}</h4>
                          <p className="text-muted-foreground text-sm">
                            রোল: {result.rollNumber} | রেজিস্ট্রেশন: {result.registration}
                          </p>
                        </div>
                        <Badge variant={result.result === "পাস" ? "default" : "destructive"}>
                          {result.result}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">বিভাগ</p>
                          <p className="font-medium">{result.department}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">পরীক্ষা</p>
                          <p className="font-medium">{result.exam}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">বছর</p>
                          <p className="font-medium">{result.year}</p>
                        </div>
                        {result.gpa && (
                          <div>
                            <p className="text-muted-foreground">জিপিএ</p>
                            <p className="font-medium text-primary">{result.gpa}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {!searched && (
            <div className="text-center text-muted-foreground py-8">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>ফলাফল দেখতে রোল নম্বর দিয়ে অনুসন্ধান করুন</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
