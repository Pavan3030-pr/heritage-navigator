import type { LucideIcon } from "lucide-react";

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative rounded-3xl border border-border bg-card p-7 shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-hero shadow-soft group-hover:scale-110 transition-transform">
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
