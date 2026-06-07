import { Clock, MapPin, Sparkles } from "lucide-react";

export type RouteStop = { name: string; time: string; highlight: string };
export type GeneratedRoute = {
  title: string;
  duration: string;
  vibe: string;
  stops: RouteStop[];
};

export function RouteCard({ route }: { route: GeneratedRoute }) {
  return (
    <div className="rounded-3xl border border-border bg-card shadow-elegant overflow-hidden animate-fade-up">
      <div className="bg-gradient-hero text-primary-foreground p-7">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-80">
          <Sparkles className="h-3.5 w-3.5" /> Personalized Itinerary
        </div>
        <h3 className="mt-2 font-display text-3xl font-semibold">{route.title}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm opacity-90">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {route.duration}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {route.stops.length} stops</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{route.vibe}</span>
        </div>
      </div>
      <ol className="relative p-7 space-y-5">
        {route.stops.map((s, i) => (
          <li key={i} className="relative flex gap-4 pl-2">
            <div className="flex flex-col items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold text-sm font-bold text-gold-foreground shadow-gold">
                {i + 1}
              </div>
              {i < route.stops.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-display text-lg font-semibold">{s.name}</h4>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{s.time}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{s.highlight}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
