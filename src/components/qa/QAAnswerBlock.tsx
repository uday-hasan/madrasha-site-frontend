import { QAAnswer } from "@/types/qa";
import QAReplyBlock from "./QAReplyBlock";
import { Shield, GraduationCap, User } from "lucide-react";

const roleConfig = {
  admin: {
    label: "প্রশাসন",
    icon: Shield,
    badgeClass: "bg-primary/10 text-primary border-primary/20",
  },
  teacher: {
    label: "শিক্ষক",
    icon: GraduationCap,
    badgeClass:
      "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  },
  user: {
    label: "সদস্য",
    icon: User,
    badgeClass: "bg-muted text-muted-foreground border-border",
  },
};

export default function QAAnswerBlock({ answer }: { answer: QAAnswer }) {
  const role = roleConfig[answer.authorRole];
  const RoleIcon = role.icon;

  return (
    <div className="space-y-3">
      {/* Main answer */}
      <div className="bg-card border border-border rounded-lg p-4 md:p-5">
        {/* Author info */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <RoleIcon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="text-sm font-semibold text-foreground">
              {answer.authorName}
            </span>
            <span
              className={`ml-2 inline-flex items-center gap-1 text-[10px] md:text-xs px-2 py-0.5 rounded-full border ${role.badgeClass}`}
            >
              {role.label}
            </span>
          </div>
          <span className="text-xs text-muted-foreground ml-auto">
            {answer.createdAt}
          </span>
        </div>

        {/* Answer content */}
        <div className="text-sm md:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
          {answer.content}
        </div>
      </div>

      {/* Replies (comments) */}
      {answer.replies.length > 0 && (
        <div className="ml-4 md:ml-8 space-y-2 border-l-2 border-primary/20 pl-4">
          {answer.replies.map((reply) => (
            <QAReplyBlock key={reply.id} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
