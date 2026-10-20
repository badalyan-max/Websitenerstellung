"use client";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@vercel/analytics";
import {
  classifyAppLink,
  detectAiSource,
  ensureAnalyticsQueue,
  stripQuery,
} from "@/lib/tracking";
const aiVisitKey = "craftos_ai_visit";
export function Analytics() {
  const pathname = usePathname();
  const enabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
  useEffect(() => {
    if (!enabled) return;
    const source = detectAiSource(document.referrer, window.location.search);
    if (!source) return;
    try {
      if (sessionStorage.getItem(aiVisitKey)) return;
      sessionStorage.setItem(aiVisitKey, source);
    } catch {
      // Ohne Speicherzugriff (z. B. Privatmodus) wird pro Seitenaufruf gezählt.
    }
    ensureAnalyticsQueue(window);
    track("ai_visit", { source });
  }, [enabled]);
  useEffect(() => {
    if (!enabled) return;
    let calculatorUsed = false;
    const calculatorUsage = (event: Event) => {
      if (calculatorUsed || !(event.target instanceof Element)) return;
      const calculator = event.target
        .closest("[data-calculator]")
        ?.getAttribute("data-calculator");
      if (calculator !== "stundensatz" && calculator !== "angebot") return;
      calculatorUsed = true;
      track("calculator_use", { calculator });
    };
    const click = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const illustration = event.target.closest("[data-feature-illustration]");
      if (illustration && event.target.closest("button"))
        track("illustration_control", {
          scene: illustration.getAttribute("data-feature-snippet") || "dashboard",
        });
      const link = event.target.closest("a");
      if (!link) return;
      const appClick = classifyAppLink(link.href, link.getAttribute("data-track"));
      if (appClick) track(appClick);
      if (link.href.startsWith("https://apps.apple.com/"))
        track("store_click", { store: "ios" });
      if (link.href.startsWith("https://play.google.com/store/apps/"))
        track("store_click", { store: "android" });
    };
    document.addEventListener("click", click);
    document.addEventListener("input", calculatorUsage);
    document.addEventListener("change", calculatorUsage);
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("input", calculatorUsage);
      document.removeEventListener("change", calculatorUsage);
    };
  }, [enabled, pathname]);
  if (!enabled) return null;
  return (
    <>
      <VercelAnalytics beforeSend={stripQuery} />
      <SpeedInsights beforeSend={stripQuery} />
    </>
  );
}
