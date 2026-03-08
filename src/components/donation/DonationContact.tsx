import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Info } from "lucide-react";

interface DonationContactProps {
  contact: {
    phone: string;
    email: string;
    note: string;
  };
}

export function DonationContact({ contact }: DonationContactProps) {
  return (
    <Card>
      <CardContent className="p-6 md:p-8 space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-card-foreground text-center">
          দান সংক্রান্ত যোগাযোগ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone */}
          <div className="flex items-center gap-3 bg-muted rounded-lg p-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">ফোন নম্বর</p>
              <p className="text-sm font-semibold text-foreground">
                {contact.phone}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 bg-muted rounded-lg p-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">ইমেইল</p>
              <p className="text-sm font-semibold text-foreground break-all">
                {contact.email}
              </p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="flex gap-3 bg-primary/5 border border-primary/20 rounded-lg p-4">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            {contact.note}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
