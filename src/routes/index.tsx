import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Bot, Route as RouteIcon, Award, Sparkles, MapPin, ArrowRight, Quote } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { LandmarkCard } from "@/components/LandmarkCard";
import { landmarks } from "@/data/landmarks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Echoes of Heritage — Bringing History Back to Life Through AI" },
      { name: "description", content: "Discover cultural landmarks, talk to an AI heritage guide, and follow personalized routes through India's living history." },
    ],
  }),
  component: Landing,
});

const stats = [
  { value: "120+", label: "Heritage sites mapped" },
  { value: "10K+", label: "Stories preserved" },
  { value: "98%", label: "Visitor satisfaction" },
  { value: "30+", label: "Local artisans featured" },
];

const features = [
  { icon: Compass, title: "Heritage Explorer", description: "Browse curated landmarks with rich historical context, imagery, and cultural significance." },
  { icon: Bot, title: "AI Heritage Guide", description: "Chat with an intelligent guide trained on centuries of culture, art, and oral history." },
  { icon: RouteIcon, title: "Personalized Routes", description: "Tell us what moves you and get a thoughtful, walkable itinerary in seconds." },
  { icon: Award, title: "Earn Achievements", description: "Unlock badges as you explore — celebrate your journey through living heritage." },
];

const steps = [
  { n: "01", t: "Discover", d: "Browse landmarks across regions, eras, and crafts curated by historians and locals." },
  { n: "02", t: "Converse", d: "Ask our AI anything — from architectural style to the legend behind a temple bell." },
  { n: "03", t: "Journey", d: "Generate a personalized route, follow it offline, and unlock achievements as you go." },
];

function Landing() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558431382-27e303142255?w=2000&q=80')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-24 pb-32 lg:pt-32 lg:pb-44">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-medium text-white/90 ring-1 ring-white/20">
              <Sparkles className="h-3.5 w-3.5 text-gold" /> AI-powered heritage tourism
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white text-balance leading-[1.05]">
              Bringing history <span className="italic text-gold">back to life</span> through AI.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80 leading-relaxed">
              Echoes of Heritage uncovers the stories behind every stone, spire, and street —
              guiding you through India's cultural soul with the warmth of a local and the depth of a historian.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/explorer"
                className="group inline-flex items-center gap-2 rounded-full bg-white text-foreground px-6 py-3.5 text-sm font-semibold shadow-elegant hover:scale-[1.03] transition-transform"
              >
                Explore Heritage
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/ai-guide"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-semibold text-gold-foreground shadow-gold hover:scale-[1.03] transition-transform"
              >
                <Bot className="h-4 w-4" /> Meet the AI Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative -mt-20 z-10 mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-3xl bg-card border border-border shadow-elegant p-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-semibold bg-gradient-hero bg-clip-text text-transparent">{s.value}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-28">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">What we do</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold text-balance">
            A new way to experience the past.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Four thoughtful tools, woven together to make heritage personal, accessible, and unforgettable.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => <FeatureCard key={f.title} {...f} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gradient-warm border-y border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs uppercase tracking-widest text-accent font-semibold">How it works</span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold text-balance">Three steps to a deeper journey.</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
                Whether you're a first-time visitor or a lifelong local, Echoes meets you where curiosity begins.
              </p>
            </div>
            <div className="space-y-4">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-6 rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant transition-shadow">
                  <div className="font-display text-4xl font-semibold text-accent w-16 shrink-0">{s.n}</div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{s.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED LANDMARKS */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-28">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">Featured</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold text-balance">
              Begin with the icons of <span className="italic">Kolkata</span>.
            </h2>
          </div>
          <Link to="/explorer" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {landmarks.slice(0, 6).map((l) => <LandmarkCard key={l.id} landmark={l} />)}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="mx-auto max-w-5xl px-5 lg:px-8 pb-28">
        <div className="relative rounded-3xl bg-gradient-hero p-12 lg:p-16 text-primary-foreground overflow-hidden shadow-elegant">
          <Quote className="absolute top-8 right-8 h-20 w-20 text-white/10" />
          <p className="font-display text-2xl md:text-3xl leading-relaxed text-balance">
            "I've lived in this city for forty years and never knew the story of my own street.
            Echoes turned my morning walk into a love letter to home."
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-gold flex items-center justify-center font-semibold text-gold-foreground">A</div>
            <div>
              <div className="text-sm font-semibold">Anjali Roy</div>
              <div className="text-xs opacity-70 flex items-center gap-1"><MapPin className="h-3 w-3" /> Kolkata, India</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
