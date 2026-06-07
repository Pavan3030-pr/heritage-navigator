export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  unlocked: boolean;
  tier: "bronze" | "silver" | "gold";
};

export const badges: Badge[] = [
  { id: "first-visit", name: "First Landmark Visited", description: "You stepped into history for the first time.", icon: "🗿", progress: 1, total: 1, unlocked: true, tier: "bronze" },
  { id: "heritage-explorer", name: "Heritage Explorer", description: "Visit 5 unique landmarks.", icon: "🧭", progress: 4, total: 5, unlocked: false, tier: "silver" },
  { id: "culture-enthusiast", name: "Culture Enthusiast", description: "Explore 3 cultural categories.", icon: "🎭", progress: 3, total: 3, unlocked: true, tier: "silver" },
  { id: "history-master", name: "History Master", description: "Complete all timelines.", icon: "📜", progress: 6, total: 10, unlocked: false, tier: "gold" },
  { id: "kolkata-discoverer", name: "Kolkata Discoverer", description: "Visit all 10 Kolkata landmarks.", icon: "🌆", progress: 7, total: 10, unlocked: false, tier: "gold" },
  { id: "ai-conversationalist", name: "AI Conversationalist", description: "Ask the AI guide 25 questions.", icon: "🤖", progress: 25, total: 25, unlocked: true, tier: "bronze" },
];
