import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RouteCard, type GeneratedRoute } from "@/components/RouteCard";
import { Landmark, Building2, Palette, UtensilsCrossed, Sparkles, Loader2 } from "lucide-react";

export const Route = createFileRoute("/routes")({
  head: () => ({
    meta: [
      { title: "Personalized Routes — Echoes of Heritage" },
      { name: "description", content: "Pick your interests and let AI craft a personalized heritage itinerary." },
    ],
  }),
  component: Routes,
});

const interestOptions = [
  { id: "history", label: "History", icon: Landmark, hue: "bg-gradient-hero text-primary-foreground", desc: "Stories, dynasties, and pivotal moments." },
  { id: "architecture", label: "Architecture", icon: Building2, hue: "bg-gradient-gold text-gold-foreground", desc: "Domes, spires, and structural marvels." },
  { id: "culture", label: "Culture", icon: Palette, hue: "bg-accent text-accent-foreground", desc: "Rituals, music, and living traditions." },
  { id: "food", label: "Food Heritage", icon: UtensilsCrossed, hue: "bg-secondary text-secondary-foreground", desc: "Recipes, markets, and culinary lore." },
];

const sampleRoutes: Record<string, GeneratedRoute> = {
  default: {
    title: "Colonial Kolkata: A Half-Day Walk",
    duration: "4 hrs · 6.2 km",
    vibe: "Architecture · History",
    stops: [
      { name: "Victoria Memorial", time: "9:00 AM", highlight: "Begin at this marble masterpiece — watch the morning light hit the Angel of Victory." },
      { name: "St. Paul's Cathedral", time: "10:30 AM", highlight: "A short walk away — admire the Burne-Jones stained glass." },
      { name: "Town Hall", time: "11:45 AM", highlight: "Pause at the Roman Doric facade and the Kolkata Panorama inside." },
      { name: "Prinsep Ghat", time: "1:00 PM", highlight: "End at the riverside Palladian porch with a quiet ferry view." },
    ],
  },
  food: {
    title: "Taste of Old Calcutta",
    duration: "5 hrs · 4.8 km",
    vibe: "Food · Culture",
    stops: [
      { name: "Marble Palace", time: "10:00 AM", highlight: "Begin with grandeur before the city wakes." },
      { name: "Mullick Bazaar", time: "11:30 AM", highlight: "Hunt down century-old kosha mangsho and luchi." },
      { name: "Indian Museum", time: "1:00 PM", highlight: "Rest among artefacts and Egyptian galleries." },
      { name: "Park Street Cafés", time: "3:00 PM", highlight: "Close with a slice of nostalgia at Flurys." },
    ],
  },
  spiritual: {
    title: "Sacred Banks of the Hooghly",
    duration: "6 hrs · Ferry inclusive",
    vibe: "Culture · History",
    stops: [
      { name: "Dakshineswar Temple", time: "8:00 AM", highlight: "Catch the morning aarti at Rani Rashmoni's temple." },
      { name: "Belur Math", time: "10:30 AM", highlight: "Cross by ferry to Vivekananda's universal sanctuary." },
      { name: "Howrah Bridge", time: "1:00 PM", highlight: "Walk the lifeline of the twin cities." },
      { name: "Prinsep Ghat", time: "5:00 PM", highlight: "Close with sunset on the Hooghly." },
    ],
  },
};

function pickRoute(ids: string[]): GeneratedRoute {
  if (ids.includes("food")) return sampleRoutes.food;
  if (ids.includes("culture") && ids.length === 1) return sampleRoutes.spiritual;
  return sampleRoutes.default;
}

function Routes() {
  const [selected, setSelected] = useState<string[]>([]);
  const [route, setRoute] = useState<GeneratedRoute | null>(null);
  const [loading, setLoading] = useState(false);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const generate = () => {
    if (selected.length === 0) return;
    setLoading(true);
    setRoute(null);
    setTimeout(() => {
      setRoute(pickRoute(selected));
      setLoading(false);
    }, 1100);
  };

  return (
    <div className="bg-gradient-warm min-h-screen">
      <section className="mx-auto max-w-6xl px-5 lg:px-8 pt-16 pb-10">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Personalized Routes</span>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-semibold text-balance leading-[1.05]">
            Tell us what moves you. We'll <span className="italic">draw the path</span>.
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed">
            Choose one or more interests below. Our AI weaves together a thoughtful, walkable journey through
            the heritage that speaks to you.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {interestOptions.map((opt) => {
            const active = selected.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggle(opt.id)}
                className={`group relative text-left rounded-3xl p-6 border-2 transition-all duration-300 ${
                  active
                    ? "border-accent shadow-elegant -translate-y-1 bg-card"
                    : "border-border bg-card hover:border-accent/50 hover:shadow-soft"
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${opt.hue} shadow-soft`}>
                  <opt.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{opt.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{opt.desc}</p>
                {active && (
                  <span className="absolute top-4 right-4 h-6 w-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">✓</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={generate}
            disabled={selected.length === 0 || loading}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-hero text-primary-foreground px-8 py-4 text-sm font-semibold shadow-elegant hover:scale-[1.03] transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-gold" />}
            {loading ? "Crafting your journey…" : "Generate my route"}
          </button>
          <p className="text-xs text-muted-foreground">
            {selected.length === 0 ? "Pick at least one interest to begin." : `${selected.length} interest${selected.length > 1 ? "s" : ""} selected`}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 lg:px-8 pb-24">
        {loading && (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center animate-fade-up">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-accent" />
            <p className="mt-4 text-sm text-muted-foreground">Weaving stops, stories, and timings into your itinerary…</p>
          </div>
        )}
        {!loading && route && <RouteCard route={route} />}
        {!loading && !route && (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <div className="text-5xl">🗺️</div>
            <h3 className="mt-4 font-display text-2xl font-semibold">Your journey awaits</h3>
            <p className="mt-2 text-sm text-muted-foreground">Choose your interests above and we'll draft a beautiful day of heritage.</p>
          </div>
        )}
      </section>
    </div>
  );
}
