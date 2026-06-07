import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getLandmark, landmarks } from "@/data/landmarks";
import { LandmarkCard } from "@/components/LandmarkCard";
import { ArrowLeft, Bot, MapPin, Sparkles } from "lucide-react";

export const Route = createFileRoute("/explorer/$id")({
  loader: ({ params }) => {
    const landmark = getLandmark(params.id);
    if (!landmark) throw notFound();
    return { landmark };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.landmark.name} — Echoes of Heritage` },
          { name: "description", content: loaderData.landmark.shortDescription },
          { property: "og:title", content: loaderData.landmark.name },
          { property: "og:description", content: loaderData.landmark.shortDescription },
          { property: "og:image", content: loaderData.landmark.image },
        ]
      : [{ title: "Landmark — Echoes of Heritage" }],
  }),
  component: LandmarkDetails,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center">
      <h1 className="font-display text-3xl font-semibold">Landmark not found</h1>
      <Link to="/explorer" className="mt-6 inline-flex items-center gap-2 text-accent font-semibold">
        <ArrowLeft className="h-4 w-4" /> Back to Explorer
      </Link>
    </div>
  ),
});

function LandmarkDetails() {
  const { landmark } = Route.useLoaderData();
  const related = landmark.related.map((id) => landmarks.find((l) => l.id === id)).filter(Boolean) as typeof landmarks;

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={landmark.image} alt={landmark.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />

        <div className="relative h-full mx-auto max-w-7xl px-5 lg:px-8 flex flex-col justify-end pb-16">
          <Link to="/explorer" className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white mb-6 w-fit">
            <ArrowLeft className="h-4 w-4" /> All landmarks
          </Link>
          <span className="inline-flex w-fit items-center rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white ring-1 ring-white/20">
            {landmark.category}
          </span>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-semibold text-white max-w-3xl leading-[1.05] text-balance">
            {landmark.name}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-white/80">
            <MapPin className="h-4 w-4" /> {landmark.location}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 lg:px-8 py-20 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="font-display text-3xl font-semibold mb-4">Historical Overview</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{landmark.overview}</p>
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold mb-4">Cultural Significance</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{landmark.significance}</p>
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold mb-6">Interesting Facts</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {landmark.facts.map((f, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-gold text-sm font-bold text-gold-foreground mb-3">
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed">{f}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold mb-6">Historical Timeline</h2>
            <ol className="relative border-l-2 border-border ml-3 space-y-6">
              {landmark.timeline.map((t, i) => (
                <li key={i} className="pl-6 relative">
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-gradient-hero ring-4 ring-background" />
                  <div className="font-display text-2xl font-semibold text-accent">{t.year}</div>
                  <p className="mt-1 text-muted-foreground leading-relaxed">{t.event}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit space-y-6">
          <div className="rounded-3xl bg-gradient-hero text-primary-foreground p-7 shadow-elegant">
            <Sparkles className="h-6 w-6 text-gold" />
            <h3 className="mt-3 font-display text-2xl font-semibold">Curious to know more?</h3>
            <p className="mt-2 text-sm text-primary-foreground/80 leading-relaxed">
              Ask our AI guide anything about {landmark.name} — its legends, architects, or hidden corners.
            </p>
            <Link
              to="/ai-guide"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold shadow-gold hover:scale-[1.03] transition-transform"
            >
              <Bot className="h-4 w-4" /> Ask AI Guide
            </Link>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h4 className="font-display text-lg font-semibold">Visit Information</h4>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Best time</dt><dd className="font-medium">Morning</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Duration</dt><dd className="font-medium">~ 2 hrs</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Entry</dt><dd className="font-medium">₹ 30 onwards</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="bg-gradient-warm border-t border-border py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">Related landmarks</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((l) => <LandmarkCard key={l.id} landmark={l} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
