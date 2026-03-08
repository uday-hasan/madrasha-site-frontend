import { QAReply } from "@/types/qa";
import { Badge } from "@/components/ui/badge";
import { Shield, GraduationCap, User } from "lucide-react";

const roleConfig = {
  admin: { label: "প্রশাসন", icon: Shield },
  teacher: { label: "শিক্ষক", icon: GraduationCap },
  user: { label: "সদস্য", icon: User },
};

interface QAReplyBlockProps {
  reply: QAReply;
}

export function QAReplyBlock({ reply }: QAReplyBlockProps) {
  const role = roleConfig[reply.authorRole];
  const RoleIcon = role.icon;

  return (
    <div className="bg-card/60 border border-border/60 rounded-lg p-3 md:p-4">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
          <RoleIcon className="w-3 h-3 text-muted-foreground" />
        </div>
        <span className="text-sm font-medium text-foreground">
          {reply.authorName}
        </span>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
          {role.label}
        </Badge>
        <span className="text-xs text-muted-foreground ml-auto">
          {reply.createdAt}
        </span>
      </div>
      <p className="text-sm text-foreground/85 leading-relaxed">
        {reply.content}
      </p>
    </div>
  );
}
