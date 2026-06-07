import { Link } from "@tanstack/react-router";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Landmark } from "@/data/landmarks";

export function LandmarkCard({ landmark }: { landmark: Landmark }) {
  return (
    <Link
      to="/explorer/$id"
      params={{ id: landmark.id }}
      className="group relative overflow-hidden rounded-3xl bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={landmark.image}
          alt={landmark.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center text-[11px] font-medium uppercase tracking-wider text-accent">
            {landmark.category}
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
        </div>
        <h3 className="font-display text-xl font-semibold leading-tight mb-1">{landmark.name}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          <MapPin className="h-3 w-3" />
          {landmark.location}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{landmark.shortDescription}</p>
      </div>
    </Link>
  );
}
