import { createFileRoute } from "@tanstack/react-router";
import { BadgeCard } from "@/components/BadgeCard";
import { badges } from "@/data/badges";
import { landmarks } from "@/data/landmarks";
import { Trophy, Target, Flame, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Echoes of Heritage" },
      { name: "description", content: "Track your heritage journey: badges, milestones, and landmarks discovered." },
    ],
  }),
  component: Achievements,
});

const completed = ["victoria-memorial", "howrah-bridge", "indian-museum", "marble-palace", "prinsep-ghat", "town-hall", "st-pauls-cathedral"];

function Achievements() {
  const unlocked = badges.filter((b) => b.unlocked).length;
  const totalProgress = Math.round((completed.length / landmarks.length) * 100);

  return (
    <div className="bg-gradient-warm min-h-screen">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-10">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Achievements</span>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-semibold text-balance leading-[1.05]">
            Your heritage <span className="italic">odyssey</span>.
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed">
            Celebrate every story you uncover. Each badge marks a moment when the past became personal.
          </p>
        </div>

        {/* STATS */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Trophy, label: "Badges Earned", value: `${unlocked}/${badges.length}`, color: "bg-gradient-gold text-gold-foreground" },
            { icon: Target, label: "Landmarks Visited", value: `${completed.length}/${landmarks.length}`, color: "bg-gradient-hero text-primary-foreground" },
            { icon: Flame, label: "Day Streak", value: "12", color: "bg-accent text-accent-foreground" },
            { icon: CheckCircle2, label: "Overall Progress", value: `${totalProgress}%`, color: "bg-secondary text-secondary-foreground" },
          ].map((s) => (
            <div key={s.label} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${s.color} shadow-soft`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-display text-3xl font-semibold">{s.value}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* PROGRESS */}
        <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-display text-xl font-semibold">Kolkata Discoverer</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Visit all {landmarks.length} landmarks to unlock the Gold badge.</p>
            </div>
            <span className="font-display text-2xl font-semibold text-accent">{totalProgress}%</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-gold transition-all duration-1000" style={{ width: `${totalProgress}%` }} />
          </div>
        </div>
      </section>

      {/* BADGES */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-10">
        <h2 className="font-display text-3xl font-semibold mb-8">Your Badges</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b) => <BadgeCard key={b.id} badge={b} />)}
        </div>
      </section>

      {/* COMPLETED LANDMARKS */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-24 pt-10">
        <h2 className="font-display text-3xl font-semibold mb-8">Completed Landmarks</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {landmarks.map((l) => {
            const done = completed.includes(l.id);
            return (
              <div
                key={l.id}
                className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                  done ? "border-accent/30 bg-card shadow-soft" : "border-border bg-card/50 opacity-60"
                }`}
              >
                <img src={l.image} alt={l.name} className="h-14 w-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{l.name}</div>
                  <div className="text-[11px] text-muted-foreground">{l.category}</div>
                </div>
                {done ? (
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-border" />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
