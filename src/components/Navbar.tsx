import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/explorer", label: "Explorer" },
  { to: "/ai-guide", label: "AI Guide" },
  { to: "/routes", label: "Routes" },
  { to: "/achievements", label: "Achievements" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-soft group-hover:shadow-elegant transition-shadow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            Echoes <span className="text-accent">of Heritage</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              activeProps={{ className: "px-4 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/ai-guide"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2 text-sm font-semibold text-gold-foreground shadow-gold hover:scale-[1.03] transition-transform"
        >
          <Sparkles className="h-4 w-4" /> Try AI Guide
        </Link>

        <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col p-4 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted"
                activeProps={{ className: "px-4 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
