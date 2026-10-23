import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  classifyAppLink,
  detectAiSource,
  ensureAnalyticsQueue,
  pathOnly,
  stripQuery,
} from "@/lib/tracking";

describe("pathOnly", () => {
  it("drops query and fragment before an event is sent", () => {
    expect(pathOnly("https://craftos.eu/rechner/stundensatz?satz=48#ergebnis")).toBe(
      "https://craftos.eu/rechner/stundensatz",
    );
  });
  it("never throws on relative or broken URLs", () => {
    expect(pathOnly("/preise?x=1#y")).toBe("/preise");
    expect(stripQuery({ url: "kein url?a=1", type: "pageview" })).toEqual({
      url: "kein url",
      type: "pageview",
    });
  });
});

describe("ensureAnalyticsQueue", () => {
  it("buffers events with the query filter first while the script is not loaded", () => {
    const win: Pick<Window, "va" | "vaq"> = {};
    ensureAnalyticsQueue(win);
    win.va?.("event", { name: "ai_visit" });
    expect(win.vaq).toEqual([
      ["beforeSend", stripQuery],
      ["event", { name: "ai_visit" }],
    ]);
  });
  it("leaves a loaded analytics script untouched", () => {
    const loaded = () => {};
    const win = { va: loaded };
    ensureAnalyticsQueue(win);
    expect(win.va).toBe(loaded);
  });
});

describe("detectAiSource", () => {
  it.each([
    ["https://chatgpt.com/", "chatgpt"],
    ["https://chat.openai.com/c/1", "chatgpt"],
    ["https://www.perplexity.ai/search", "perplexity"],
    ["https://copilot.microsoft.com/", "copilot"],
    ["https://gemini.google.com/app", "gemini"],
    ["https://claude.ai/chat", "claude"],
  ])("recognises the referrer %s", (referrer, source) => {
    expect(detectAiSource(referrer, "")).toBe(source);
  });
  it("recognises utm_source regardless of case and suffix", () => {
    expect(detectAiSource("", "?utm_source=ChatGPT.com")).toBe("chatgpt");
    expect(detectAiSource("", "?utm_source=perplexity")).toBe("perplexity");
  });
  it.each([
    ["https://www.google.com/", ""],
    ["", ""],
    ["kein-url", ""],
    ["https://craftos.eu/preise", ""],
    ["https://notchatgpt.com/", ""],
    ["", "?utm_source=newsletter"],
  ])("ignores %s %s", (referrer, search) => {
    expect(detectAiSource(referrer, search)).toBeNull();
  });
});

describe("classifyAppLink", () => {
  it("counts app links as trial clicks", () => {
    expect(classifyAppLink("https://app.craftos.eu", null)).toBe("trial_click");
    expect(classifyAppLink("https://app.craftos.eu/auth?x=1", null)).toBe(
      "trial_click",
    );
  });
  it("counts marked login links separately", () => {
    expect(classifyAppLink("https://app.craftos.eu", "login")).toBe(
      "login_click",
    );
  });
  it("ignores other hosts", () => {
    expect(classifyAppLink("https://app.craftos.eu.evil.com/", null)).toBeNull();
    expect(classifyAppLink("https://craftos.eu/preise", null)).toBeNull();
    expect(classifyAppLink("kein-url", null)).toBeNull();
  });
});

// ME-04: Die KI-Besuchserkennung speichert nichts im Browser (kein sessionStorage/localStorage, keine Cookies);
// ein Modulschutz sendet ai_visit höchstens einmal je Seitenladevorgang.
describe("aiVisitOnce (ME-04)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("liefert die Quelle nur beim ersten Aufruf je Seitenladevorgang", async () => {
    vi.resetModules();
    const { aiVisitOnce } = await import("@/lib/tracking");
    expect(aiVisitOnce("https://chatgpt.com/", "")).toBe("chatgpt");
    expect(aiVisitOnce("https://chatgpt.com/", "")).toBeNull();
    expect(aiVisitOnce("", "?utm_source=perplexity")).toBeNull();
  });

  it("lässt Besuche ohne KI-Quelle unverändert und verbraucht den Schutz nicht", async () => {
    vi.resetModules();
    const { aiVisitOnce } = await import("@/lib/tracking");
    expect(aiVisitOnce("https://www.google.com/", "")).toBeNull();
    expect(aiVisitOnce("https://claude.ai/chat", "")).toBe("claude");
  });

  it("greift weder auf sessionStorage noch localStorage noch Cookies zu", async () => {
    const zugriff = vi.fn(() => {
      throw new Error("Speicherzugriff");
    });
    const speicher = { getItem: zugriff, setItem: zugriff, removeItem: zugriff, clear: zugriff, key: zugriff, length: 0 };
    const doc = {};
    Object.defineProperty(doc, "cookie", { get: zugriff, set: zugriff });
    vi.stubGlobal("sessionStorage", speicher);
    vi.stubGlobal("localStorage", speicher);
    vi.stubGlobal("document", doc);
    vi.resetModules();
    const { aiVisitOnce } = await import("@/lib/tracking");
    expect(aiVisitOnce("https://gemini.google.com/app", "")).toBe("gemini");
    expect(aiVisitOnce("https://gemini.google.com/app", "")).toBeNull();
    expect(zugriff).not.toHaveBeenCalled();
  });

  it("die Analytics-Komponente nutzt keinen Browserspeicher", () => {
    const quelle = fs.readFileSync(path.join(__dirname, "..", "components", "Analytics.tsx"), "utf8");
    expect(quelle).not.toMatch(/sessionStorage|localStorage|document\.cookie/);
    expect(quelle).toContain("aiVisitOnce(");
  });
});
