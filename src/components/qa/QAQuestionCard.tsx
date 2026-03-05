"use client";

import { useState } from "react";
import { QAQuestion } from "@/types/qa";
import QAAnswerBlock from "./QAAnswerBlock";
import {
  MessageCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Tag,
} from "lucide-react";

export default function QAQuestionCard({ question }: { question: QAQuestion }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Question header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 md:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                <Tag className="w-3 h-3" />
                {question.category}
              </span>
              {question.isResolved ? (
                <span className="inline-flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  সমাধান হয়েছে
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
                  <Clock className="w-3 h-3" />
                  উত্তরের অপেক্ষায়
                </span>
              )}
            </div>

            {/* Question text */}
            <h3 className="text-base md:text-lg font-semibold text-foreground leading-relaxed mb-2">
              {question.question}
            </h3>

            {/* Author & date */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-muted-foreground">
              <span>
                প্রশ্নকারী: <strong>{question.authorName}</strong>
              </span>
              <span>{question.createdAt}</span>
              <span className="inline-flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                {question.answers.length} টি উত্তর
              </span>
            </div>
          </div>

          {/* Expand icon */}
          <div className="shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded answers */}
      {isExpanded && (
        <div className="border-t border-border bg-muted/30 p-4 md:p-6 space-y-4">
          {question.answers.length > 0 ? (
            question.answers.map((answer) => (
              <QAAnswerBlock key={answer.id} answer={answer} />
            ))
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                এখনো কোনো উত্তর দেওয়া হয়নি। শীঘ্রই উত্তর দেওয়া হবে
                ইনশাআল্লাহ।
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
