"use client";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@vercel/analytics";
export function Analytics() {
  const pathname = usePathname();
  const enabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
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
      if (link.href.startsWith("https://app.craftos.eu"))
        track("registration_click");
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
    <VercelAnalytics
      beforeSend={(event) => ({
        ...event,
        url: new URL(event.url).origin + new URL(event.url).pathname,
      })}
    />
  );
}
