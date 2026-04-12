"use client";
import { useEffect, useRef } from "react";
import { useHomeStore } from "@/stores/homeStore";
import { Users, GraduationCap, BookOpen, Calendar } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  "graduation-cap": GraduationCap,
  book: BookOpen,
  calendar: Calendar,
};

export function StatsCounter() {
  const { homeData, fetchHomeData } = useHomeStore();
  const stats = homeData?.stats || [];
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  return (
    <section
      className="py-16 bg-primary text-primary-foreground"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon || ""] || BookOpen;
            return (
              <div key={stat.id} className="text-center">
                <Icon className="h-10 w-10 mx-auto mb-3 opacity-80" />
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  {stat.value}
                  {stat.suffix}
                </div>
                <p className="text-sm opacity-80">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
