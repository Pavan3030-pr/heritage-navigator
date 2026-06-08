import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { LandmarkCard } from "@/components/LandmarkCard";
import { categories } from "@/data/landmarks";
import type { Landmark } from "@/data/landmarks";
import { getLandmarks } from "@/lib/data-service";
import { SlidersHorizontal, Loader2 } from "lucide-react";

export const Route = createFileRoute("/explorer")({
  head: () => ({
    meta: [
      { title: "Heritage Explorer — Echoes of Heritage" },
      { name: "description", content: "Browse cultural landmarks across India by category, era, and significance." },
    ],
  }),
  component: Explorer,
});

function Explorer() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getLandmarks()
      .then(setLandmarks)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return landmarks.filter((l) => {
      const matchesQ = q === "" || `${l.name} ${l.location} ${l.shortDescription}`.toLowerCase().includes(q.toLowerCase());
      const matchesC = cat === "All" || l.category === cat;
      return matchesQ && matchesC;
    });
  }, [q, cat, landmarks]);

  return (
    <div className="bg-gradient-warm min-h-screen">
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-10">
        <div className="max-w-3xl animate-fade-up">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Heritage Explorer</span>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-semibold text-balance leading-[1.05]">
            Wander through living <span className="italic">history</span>.
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed">
            From colonial marvels to sacred riversides — explore landmarks curated by historians and the people who live alongside them.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <SearchBar value={q} onChange={setQ} />
          <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                  cat === c
                    ? "bg-primary text-primary-foreground border-primary shadow-soft"
                    : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-24">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        )}

        {error && !loading && (
          <div className="rounded-3xl border border-destructive/30 bg-destructive/10 p-8 text-center">
            <p className="text-sm text-destructive font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-xs underline text-muted-foreground"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
              <span>{filtered.length} {filtered.length === 1 ? "landmark" : "landmarks"} found</span>
            </div>
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display text-2xl font-semibold">No landmarks match yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">Try a different search or category.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((l) => <LandmarkCard key={l.id} landmark={l} />)}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
