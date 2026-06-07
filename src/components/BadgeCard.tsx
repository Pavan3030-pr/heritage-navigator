import type { Badge } from "@/data/badges";

const tierStyles = {
  bronze: "from-amber-700/20 to-amber-500/10 ring-amber-700/30",
  silver: "from-slate-400/20 to-slate-200/10 ring-slate-400/30",
  gold: "from-amber-400/30 to-yellow-300/10 ring-amber-400/40",
};

export function BadgeCard({ badge }: { badge: Badge }) {
  const pct = Math.round((badge.progress / badge.total) * 100);
  return (
    <div
      className={`relative rounded-3xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant transition-all ${
        badge.unlocked ? "animate-pulse-glow" : "opacity-90"
      }`}
    >
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${tierStyles[badge.tier]} ring-1 ring-inset`} />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${badge.unlocked ? "bg-gradient-gold shadow-gold" : "bg-muted grayscale"}`}>
            {badge.icon}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${badge.unlocked ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
            {badge.tier}
          </span>
        </div>
        <h3 className="font-display text-lg font-semibold">{badge.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{badge.description}</p>
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium">{badge.progress} / {badge.total}</span>
            <span className="text-muted-foreground">{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-gold transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
