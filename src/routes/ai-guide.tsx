import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, User, MapPin } from "lucide-react";
import { landmarks } from "@/data/landmarks";

export const Route = createFileRoute("/ai-guide")({
  head: () => ({
    meta: [
      { title: "AI Heritage Guide — Echoes of Heritage" },
      { name: "description", content: "Chat with an intelligent guide that knows every story, era and craft behind India's landmarks." },
    ],
  }),
  component: AIGuide,
});

type Msg = { role: "user" | "ai"; text: string };

const suggestions = [
  "Tell me the history of Victoria Memorial.",
  "Why is Howrah Bridge important?",
  "Show hidden heritage sites nearby.",
  "Explain the cultural significance of Belur Math.",
];

const seed: Msg[] = [
  {
    role: "ai",
    text: "Namaste! I'm your AI Heritage Guide. Ask me anything — a landmark's story, an architectural style, a forgotten legend, or where to find the city's best terracotta artisans.",
  },
];

function craftReply(q: string): string {
  const lower = q.toLowerCase();
  const match = landmarks.find((l) => lower.includes(l.name.toLowerCase().split(" ")[0]));
  if (match) {
    return `${match.name} (${match.location}) — ${match.overview}\n\n✨ Cultural note: ${match.significance}\n\nDid you know? ${match.facts[0]}`;
  }
  if (lower.includes("hidden") || lower.includes("nearby")) {
    return "Some lesser-known gems near central Kolkata: the Armenian Church (1724) on Armenian Street, the Nakhoda Mosque inspired by Akbar's tomb, and the quiet Mullick Ghat flower market at dawn. Each has stories rarely told to tourists.";
  }
  if (lower.includes("cultural") || lower.includes("significance")) {
    return "Cultural significance lives in continuity — in the rituals still performed, the songs still sung, and the crafts still made. Tell me a specific landmark and I'll trace its threads through music, food, and community life.";
  }
  return "That's a beautiful question. Heritage is layered — give me a landmark, an era, or a craft, and I'll weave together its history, architecture, and the people who keep it alive today.";
}

function AIGuide() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: craftReply(text) }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="bg-gradient-warm min-h-screen">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 grid lg:grid-cols-[1fr_320px] gap-8">
        {/* Main chat */}
        <div className="flex flex-col rounded-3xl border border-border bg-card shadow-elegant overflow-hidden h-[80vh]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-hero text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                  <Bot className="h-5 w-5 text-gold-foreground" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 ring-2 ring-primary" />
              </div>
              <div>
                <div className="font-display text-lg font-semibold leading-none">Heritage Guide AI</div>
                <div className="text-[11px] opacity-70 mt-1 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-gold" /> Trained on centuries of culture
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""} animate-fade-up`}>
                <div className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center ${m.role === "ai" ? "bg-gradient-hero text-primary-foreground" : "bg-muted"}`}>
                  {m.role === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === "ai" ? "bg-muted text-foreground rounded-tl-sm" : "bg-gradient-hero text-primary-foreground rounded-tr-sm shadow-soft"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-hero text-primary-foreground flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-5 py-4 flex gap-1">
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-border p-4">
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="shrink-0 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 rounded-full border border-border bg-background pl-5 pr-1.5 py-1.5 shadow-soft focus-within:ring-2 focus-within:ring-ring"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a landmark, era, or tradition…"
                className="flex-1 bg-transparent outline-none text-sm py-2"
              />
              <button
                type="submit"
                className="h-10 w-10 rounded-full bg-gradient-gold text-gold-foreground flex items-center justify-center shadow-gold hover:scale-105 transition-transform disabled:opacity-50"
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Side panel */}
        <aside className="space-y-5">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" /> Landmark Focus
            </h3>
            <p className="mt-2 text-xs text-muted-foreground">Tap to ask about a specific place.</p>
            <div className="mt-4 space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {landmarks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => send(`Tell me about ${l.name}.`)}
                  className="w-full flex items-center gap-3 rounded-2xl border border-border p-2.5 hover:border-accent hover:bg-muted/50 transition-colors text-left"
                >
                  <img src={l.image} alt={l.name} className="h-12 w-12 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{l.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{l.category}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
