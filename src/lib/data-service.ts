/**
 * data-service.ts
 * Centralised data-access layer. All Supabase queries live here.
 * UI components call these functions — they never import supabase directly.
 */

import { supabase } from "@/lib/supabase";
import type { Landmark } from "@/data/landmarks";
import type { GeneratedRoute } from "@/components/RouteCard";
import type { Badge } from "@/data/badges";

// ─── Types returned from Supabase ─────────────────────────────────────────────

export type DbLandmark = {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  significance: string;
  image_url: string;
  overview: string | null;
  facts: string[];
  timeline: { year: string; event: string }[];
  related: string[];
};

export type DbRoute = {
  id: string;
  interests: string[];
  generated_route: GeneratedRoute;
  duration: string | null;
  created_at: string;
};

export type DbChat = {
  id: string;
  question: string;
  answer: string;
  created_at: string;
};

export type DbAchievement = {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string | null;
  tier: "bronze" | "silver" | "gold";
  progress: number;
  total: number;
};

// ─── Mapper: DB row → app Landmark shape ─────────────────────────────────────

function dbToLandmark(row: DbLandmark): Landmark {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    location: row.location,
    shortDescription: row.description,
    image: row.image_url,
    overview: row.overview ?? "",
    significance: row.significance,
    facts: Array.isArray(row.facts) ? row.facts : [],
    timeline: Array.isArray(row.timeline) ? row.timeline : [],
    related: Array.isArray(row.related) ? row.related : [],
  };
}

// ─── LANDMARKS ───────────────────────────────────────────────────────────────

/** Fetch all landmarks ordered by name. */
export async function getLandmarks(): Promise<Landmark[]> {
  const { data, error } = await supabase
    .from("landmarks")
    .select("*")
    .order("name");

  if (error) throw new Error(`getLandmarks: ${error.message}`);
  return (data as DbLandmark[]).map(dbToLandmark);
}

/** Fetch a single landmark by slug id. Returns null if not found. */
export async function getLandmarkById(id: string): Promise<Landmark | null> {
  const { data, error } = await supabase
    .from("landmarks")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`getLandmarkById(${id}): ${error.message}`);
  if (!data) return null;
  return dbToLandmark(data as DbLandmark);
}

// ─── ROUTES ──────────────────────────────────────────────────────────────────

/** Persist a generated route to Supabase and return the saved record. */
export async function saveRoute(
  interests: string[],
  route: GeneratedRoute,
): Promise<DbRoute> {
  const { data, error } = await supabase
    .from("routes")
    .insert({
      interests,
      generated_route: route,
      duration: route.duration,
    })
    .select()
    .single();

  if (error) throw new Error(`saveRoute: ${error.message}`);
  return data as DbRoute;
}

/** Retrieve the most recent saved routes (latest 20). */
export async function getRoutes(): Promise<DbRoute[]> {
  const { data, error } = await supabase
    .from("routes")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) throw new Error(`getRoutes: ${error.message}`);
  return (data ?? []) as DbRoute[];
}

// ─── AI CHATS ────────────────────────────────────────────────────────────────

/** Save a Q&A pair to the ai_chats table. */
export async function saveChat(
  question: string,
  answer: string,
): Promise<DbChat> {
  const { data, error } = await supabase
    .from("ai_chats")
    .insert({ question, answer })
    .select()
    .single();

  if (error) throw new Error(`saveChat: ${error.message}`);
  return data as DbChat;
}

/** Retrieve the most recent AI chats (latest 50). */
export async function getChats(): Promise<DbChat[]> {
  const { data, error } = await supabase
    .from("ai_chats")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw new Error(`getChats: ${error.message}`);
  return (data ?? []) as DbChat[];
}

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────────────────

/** Fetch all achievements ordered by tier then title. */
export async function getAchievements(): Promise<Badge[]> {
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("tier")
    .order("title");

  if (error) throw new Error(`getAchievements: ${error.message}`);

  return (data as DbAchievement[]).map((row) => ({
    id: row.id,
    name: row.title,
    description: row.description,
    icon: row.icon ?? "🏛️",
    progress: row.progress,
    total: row.total,
    unlocked: row.unlocked,
    tier: row.tier,
  }));
}
