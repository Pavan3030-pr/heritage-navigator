/**
 * ai-service.ts
 * Reusable Gemini AI integration.
 * Exports two functions consumed by the AI Guide and Route Generator pages.
 */

import type { Landmark } from "@/data/landmarks";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

function apiKey(): string {
  const key = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!key) {
    throw new Error(
      "Missing VITE_GEMINI_API_KEY environment variable. " +
        "Add it to your .env file to enable AI features.",
    );
  }
  return key;
}

async function callGemini(prompt: string): Promise<string> {
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      `Gemini API error ${response.status}: ${JSON.stringify(err)}`,
    );
  }

  const data = await response.json();
  const text: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  if (!text) throw new Error("Gemini returned an empty response.");
  return text.trim();
}

// ─── Heritage Guide ───────────────────────────────────────────────────────────

/**
 * Ask the AI heritage guide a question.
 * @param question  User's question.
 * @param landmark  Optional landmark context — narrows the answer.
 */
export async function askHeritageGuide(
  question: string,
  landmark?: Landmark | null,
): Promise<string> {
  const context = landmark
    ? `You are answering specifically about "${landmark.name}" (${landmark.location}).
Context: ${landmark.overview ?? ""}
Cultural significance: ${landmark.significance}
Key facts: ${(landmark.facts ?? []).join("; ")}`
    : `You are a knowledgeable guide covering the cultural heritage landmarks of Kolkata, India.`;

  const prompt = `You are an expert AI Heritage Guide specialising in the historical and cultural landmarks of Kolkata, India.
${context}

Always respond with warmth, depth, and storytelling flair. Keep answers under 200 words unless a longer response genuinely adds value.
If you mention a specific year or fact, be accurate — do not invent.

User question: ${question}

Answer:`;

  return callGemini(prompt);
}

// ─── Route Generator ─────────────────────────────────────────────────────────

export type RouteStop = { name: string; time: string; highlight: string };
export type GeneratedRoutePayload = {
  title: string;
  duration: string;
  vibe: string;
  stops: RouteStop[];
};

/**
 * Generate a personalised heritage route based on the user's selected interests.
 * Returns a structured JSON object ready for <RouteCard />.
 */
export async function generateHeritageRoute(
  interests: string[],
): Promise<GeneratedRoutePayload> {
  const interestList = interests.join(", ");

  const prompt = `You are an expert heritage travel planner for Kolkata, India.
Create a personalised one-day heritage itinerary for someone whose interests are: ${interestList}.

Use ONLY landmarks from this list (use exact names):
Victoria Memorial, Howrah Bridge, Indian Museum, Marble Palace, Dakshineswar Temple,
Belur Math, Fort William, St. Paul's Cathedral, Town Hall, Prinsep Ghat.

Return ONLY valid JSON — no markdown fences, no extra text — matching this exact structure:
{
  "title": "Short evocative route title",
  "duration": "X hrs · Y km",
  "vibe": "Comma-separated interest tags matching the user's selection",
  "stops": [
    { "name": "Landmark Name", "time": "HH:MM AM/PM", "highlight": "One sentence why to stop here." }
  ]
}

Rules:
- Include 3–5 stops that best match the interests.
- Times must be realistic and sequential starting from 9:00 AM.
- Title must be creative and Kolkata-specific.
- Respond with JSON only.`;

  const raw = await callGemini(prompt);

  // Strip accidental markdown fences before parsing
  const clean = raw.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();

  try {
    return JSON.parse(clean) as GeneratedRoutePayload;
  } catch {
    throw new Error(
      "Gemini returned malformed JSON for the route. Please try again.",
    );
  }
}
