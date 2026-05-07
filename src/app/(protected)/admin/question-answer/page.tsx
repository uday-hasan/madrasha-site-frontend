"use client";

import { useEffect, useState } from "react";
import { useAdminQAStore } from "@/stores/useAdminQAStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  Send,
  MessageCircle,
} from "lucide-react";

interface AnswerFormState {
  questionId: string | null;
  content: string;
}

interface ReplyData {
  [key: string]: string;
}

export default function AdminQAPage() {
  const {
    questions,
    isLoading,
    isSubmitting,
    error,
    success,
    fetchAllQuestions,
    deleteQuestion,
    publishQuestion,
    unpublishQuestion,
    addAnswer,
    deleteAnswer,
    deleteReply,
    clearError,
    clearSuccess,
  } = useAdminQAStore();

  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(
    new Set(),
  );
  const [answerForm, setAnswerForm] = useState<AnswerFormState>({
    questionId: null,
    content: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [replyInputs, setReplyInputs] = useState<ReplyData>({});

  useEffect(() => {
    fetchAllQuestions();
  }, [fetchAllQuestions]);

  useEffect(() => {
    if (error && answerForm.questionId) {
      setFormError(error);
    }
  }, [error, answerForm.questionId]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        clearSuccess();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, clearSuccess]);

  const toggleQuestion = (questionId: string) => {
    const newSet = new Set(expandedQuestions);
    if (newSet.has(questionId)) {
      newSet.delete(questionId);
    } else {
      newSet.add(questionId);
    }
    setExpandedQuestions(newSet);
  };

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!answerForm.questionId || !answerForm.content.trim()) {
      setFormError("উত্তর লিখতে হবে।");
      return;
    }

    await addAnswer(answerForm.questionId, {
      content: answerForm.content,
      authorName: "প্রশাসক",
      authorRole: "ADMIN",
    });

    if (!error) {
      setAnswerForm({ questionId: null, content: "" });
      setFormError(null);
    }
  };

  const handlePublish = async (questionId: string) => {
    await publishQuestion(questionId);
  };

  const handleUnpublish = async (questionId: string) => {
    await unpublishQuestion(questionId);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    await deleteQuestion(questionId);
  };

  const handleDeleteAnswer = async (answerId: string) => {
    await deleteAnswer(answerId);
  };

  const handleDeleteReply = async (replyId: string) => {
    await deleteReply(replyId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">প্রশ্ন-উত্তর ব্যবস্থাপনা</h1>
        <p className="text-muted-foreground mt-1">
          প্রশ্ন প্রকাশ করুন, উত্তর দিন এবং প্রতিক্রিয়া পরিচালনা করুন
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-800">{success}</span>
        </div>
      )}
      {error && !answerForm.questionId && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-800">{error}</span>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">সকল প্রশ্ন</h2>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-40" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : questions.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">এখনো কোনো প্রশ্ন নেই।</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {questions.map((question) => (
              <Card key={question.id} className="overflow-hidden">
                <button
                  onClick={() => toggleQuestion(question.id)}
                  className="w-full text-left p-4 hover:bg-muted/50 transition-colors flex items-start justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          question.status === "PUBLISHED"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {question.status === "PUBLISHED" ? "প্রকাশিত" : "খসড়া"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {question.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm leading-tight mb-1">
                      {question.question}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      প্রশ্নকারী: {question.authorName} •{" "}
                      {question.answers.length} টি উত্তর
                    </p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 transition-transform ${
                      expandedQuestions.has(question.id) ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </button>

                {expandedQuestions.has(question.id) && (
                  <CardContent className="border-t bg-muted/30 p-4 space-y-4">
                    {/* Question Actions */}
                    <div className="flex gap-2 flex-wrap">
                      {question.status === "DRAFT" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePublish(question.id)}
                          disabled={isSubmitting}
                        >
                          প্রকাশ করুন
                        </Button>
                      )}
                      {question.status === "PUBLISHED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-yellow-600 hover:text-yellow-700"
                          onClick={() => handleUnpublish(question.id)}
                          disabled={isSubmitting}
                        >
                          খসড়ায় রূপান্তর করুন
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            মুছুন
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogTitle>
                            প্রশ্ন মুছে ফেলুন?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            এই প্রশ্ন এবং এর সমস্ত উত্তর মুছে ফেলা হবে। এই
                            পদক্ষেপ পূর্ববত করা যাবে না।
                          </AlertDialogDescription>
                          <div className="flex gap-2 justify-end mt-4">
                            <AlertDialogCancel>বাতিল করুন</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteQuestion(question.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              মুছুন
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    {/* Answers Section */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">
                        উত্তর ({question.answers.length})
                      </h4>

                      {question.answers.length > 0 ? (
                        <div className="space-y-3">
                          {question.answers.map((answer) => (
                            <div
                              key={answer.id}
                              className="bg-white p-3 rounded border"
                            >
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                  <p className="text-xs font-medium text-gray-900">
                                    {answer.authorName} ({answer.authorRole})
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {answer.createdAt}
                                  </p>
                                </div>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="text-red-600 hover:bg-red-50 hover:text-red-800 h-8 w-8 p-0"
                                      title="উত্তর মুছুন"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogTitle>
                                      উত্তর মুছুন?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      এই উত্তরটি এবং এর সমস্ত উত্তরসমূহ মুছে
                                      ফেলা হবে।
                                    </AlertDialogDescription>
                                    <div className="flex gap-2 justify-end mt-4">
                                      <AlertDialogCancel>
                                        বাতিল করুন
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          handleDeleteAnswer(answer.id)
                                        }
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        মুছুন
                                      </AlertDialogAction>
                                    </div>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                              <p className="text-sm text-gray-900 mb-2 whitespace-pre-wrap">
                                {answer.content}
                              </p>

                              {/* Replies */}
                              {answer.replies.length > 0 && (
                                <div className="ml-3 pt-3 border-t space-y-2">
                                  {answer.replies.map((reply) => (
                                    <div
                                      key={reply.id}
                                      className="flex items-start justify-between gap-2 p-2 bg-gray-50 rounded text-xs"
                                    >
                                      <div className="min-w-0 flex-1">
                                        <p className="font-medium text-gray-900">
                                          {reply.authorName} ({reply.authorRole}
                                          )
                                        </p>
                                        <p className="text-gray-700 line-clamp-2">
                                          {reply.content}
                                        </p>
                                      </div>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-red-600 hover:bg-red-50 hover:text-red-800 h-7 w-7 p-0 shrink-0"
                                            title="মন্তব্য মুছুন"
                                          >
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogTitle>
                                            মন্তব্য মুছুন?
                                          </AlertDialogTitle>
                                          <div className="flex gap-2 justify-end mt-4">
                                            <AlertDialogCancel>
                                              বাতিল করুন
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() =>
                                                handleDeleteReply(reply.id)
                                              }
                                              className="bg-red-600 hover:bg-red-700"
                                            >
                                              মুছুন
                                            </AlertDialogAction>
                                          </div>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          এই প্রশ্নের এখনো কোনো উত্তর নেই।
                        </p>
                      )}
                    </div>

                    {/* Add Answer Form */}
                    {answerForm.questionId === question.id ? (
                      <div className="p-3 bg-primary/5 border border-primary/30 rounded space-y-3">
                        {formError && (
                          <div className="p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-red-700 text-sm whitespace-pre-wrap">
                                {formError}
                              </p>
                            </div>
                            <button
                              onClick={() => setFormError(null)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                        <Textarea
                          placeholder="উত্তর লিখুন..."
                          value={answerForm.content}
                          onChange={(e) =>
                            setAnswerForm({
                              ...answerForm,
                              content: e.target.value,
                            })
                          }
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={handleAnswerSubmit}
                            disabled={isSubmitting}
                          >
                            <Send className="h-3 w-3 mr-2" />
                            {isSubmitting ? "প্রক্রিয়াকরণ..." : "উত্তর দিন"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setAnswerForm({
                                questionId: null,
                                content: "",
                              });
                              setFormError(null);
                            }}
                          >
                            বাতিল করুন
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          setAnswerForm({
                            questionId: question.id,
                            content: "",
                          })
                        }
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        উত্তর যোগ করুন
                      </Button>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
