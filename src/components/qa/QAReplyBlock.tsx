import { QAReply } from "@/types/qa";
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

export default function QAReplyBlock({ reply }: { reply: QAReply }) {
  const role = roleConfig[reply.authorRole];
  const RoleIcon = role.icon;

  return (
    <div className="bg-card/50 border border-border/60 rounded-lg p-3 md:p-4">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
          <RoleIcon className="w-3 h-3 text-muted-foreground" />
        </div>
        <span className="text-sm font-medium text-foreground">
          {reply.authorName}
        </span>
        <span
          className={`inline-flex items-center text-[10px] px-1.5 py-0.5 rounded-full border ${role.badgeClass}`}
        >
          {role.label}
        </span>
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
