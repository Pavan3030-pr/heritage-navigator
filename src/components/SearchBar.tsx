import { Search } from "lucide-react";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search landmarks, eras, stories…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-border bg-card pl-12 pr-5 py-4 text-sm shadow-soft outline-none focus:ring-2 focus:ring-ring focus:border-accent transition-all"
      />
    </div>
  );
}
