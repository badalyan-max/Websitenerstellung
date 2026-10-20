// Reine Hilfsfunktionen für die Analytics-Ereignisse (keine URLs oder Eingaben werden übertragen).
export type AiSource = "chatgpt" | "perplexity" | "copilot" | "gemini" | "claude";

const aiHosts: [string, AiSource][] = [
  ["chatgpt.com", "chatgpt"],
  ["chat.openai.com", "chatgpt"],
  ["perplexity.ai", "perplexity"],
  ["copilot.microsoft.com", "copilot"],
  ["gemini.google.com", "gemini"],
  ["claude.ai", "claude"],
];

const aiUtmMarkers: [string, AiSource][] = [
  ["chatgpt", "chatgpt"],
  ["openai", "chatgpt"],
  ["perplexity", "perplexity"],
  ["copilot", "copilot"],
  ["gemini", "gemini"],
  ["claude", "claude"],
];

const appHost = "app.craftos.eu";

function hostOf(url: string): string | null {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

/** Begrenzt eine URL auf Ursprung und Pfad; Suchparameter und Fragmente werden nie übertragen. */
export function pathOnly(url: string): string {
  try {
    const u = new URL(url);
    return u.origin + u.pathname;
  } catch {
    return url.split(/[?#]/)[0];
  }
}

/** beforeSend-Filter für Web Analytics und Speed Insights. */
export const stripQuery = <T extends { url: string }>(event: T): T => ({
  ...event,
  url: pathOnly(event.url),
});

type AnalyticsWindow = Pick<Window, "va" | "vaq">;

/**
 * Legt die Warteschlange von Vercel Analytics an, falls das Skript noch nicht geladen ist.
 * Ohne sie verwirft `track()` Ereignisse beim ersten Seitenaufruf stillschweigend.
 * Der Query-Filter steht vorn, damit gepufferte Ereignisse nie mit Suchparametern gesendet werden.
 */
export function ensureAnalyticsQueue(win: AnalyticsWindow): void {
  if (win.va) return;
  win.va = (event, properties) => {
    (win.vaq ??= []).push([event, properties]);
  };
  win.va("beforeSend", stripQuery);
}

/** Erkennt Besuche aus KI-Suchen anhand des Referrers oder von utm_source. */
export function detectAiSource(referrer: string, search: string): AiSource | null {
  const host = hostOf(referrer);
  if (host) {
    const hit = aiHosts.find(([d]) => host === d || host.endsWith("." + d));
    if (hit) return hit[1];
  }
  const utm = new URLSearchParams(search).get("utm_source")?.toLowerCase();
  if (!utm) return null;
  return aiUtmMarkers.find(([marker]) => utm.includes(marker))?.[1] ?? null;
}

/** Unterscheidet Klicks auf die Web-App in Testen und Anmelden (`data-track="login"`). */
export function classifyAppLink(
  href: string,
  track: string | null,
): "trial_click" | "login_click" | null {
  if (hostOf(href) !== appHost) return null;
  return track === "login" ? "login_click" : "trial_click";
}
