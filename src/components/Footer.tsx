import { Link } from "@tanstack/react-router";
import { Sparkles, Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-warm">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold">Echoes of Heritage</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            Bringing history back to life through AI. Discover, learn, and preserve the
            cultural soul of India — one landmark at a time.
          </p>
          <div className="mt-6 flex gap-3">
            {[Github, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/explorer" className="hover:text-foreground">Heritage Explorer</Link></li>
            <li><Link to="/ai-guide" className="hover:text-foreground">AI Guide</Link></li>
            <li><Link to="/routes" className="hover:text-foreground">Routes</Link></li>
            <li><Link to="/achievements" className="hover:text-foreground">Achievements</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About</li>
            <li>Partners</li>
            <li>Press</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Echoes of Heritage. Preserving stories for tomorrow.</p>
          <p>Crafted with reverence for India's cultural legacy.</p>
        </div>
      </div>
    </footer>
  );
}
