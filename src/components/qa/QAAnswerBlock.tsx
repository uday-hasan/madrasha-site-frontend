import { QAAnswer } from "@/types/qa";
import { QAReplyBlock } from "./QAReplyBlock";
import { Badge } from "@/components/ui/badge";
import { Shield, GraduationCap, User } from "lucide-react";

const roleConfig = {
  admin: { label: "প্রশাসন", icon: Shield },
  teacher: { label: "শিক্ষক", icon: GraduationCap },
  user: { label: "সদস্য", icon: User },
};

interface QAAnswerBlockProps {
  answer: QAAnswer;
}

export function QAAnswerBlock({ answer }: QAAnswerBlockProps) {
  const role = roleConfig[answer.authorRole];
  const RoleIcon = role.icon;

  return (
    <div className="space-y-3">
      {/* Main answer */}
      <div className="bg-card border border-border rounded-lg p-4 md:p-5">
        {/* Author */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <RoleIcon className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            {answer.authorName}
          </span>
          <Badge variant="outline" className="text-[10px] px-2 py-0">
            {role.label}
          </Badge>
          <span className="text-xs text-muted-foreground ml-auto">
            {answer.createdAt}
          </span>
        </div>

        {/* Content */}
        <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
          {answer.content}
        </div>
      </div>

      {/* Replies */}
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
