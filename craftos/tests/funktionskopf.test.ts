/**
 * Bausteine der Funktionsdetailseiten (Phase 7, Plan 07-04; 07-UI-SPEC F1, F2; D-02, D-15, B1, B2, B8):
 * FunktionsKopf (Seitenkopf inkl. /app-Variante), PlattformRollen (Plattform-/Rollen-Panels) und die
 * BentoTile-Kennung data-zusatz für Zusatzfunktions-Kacheln.
 */
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { Calculator } from "lucide-react";
import { describe, expect, it } from "vitest";
import { FunktionsKopf } from "@/components/funktionen/FunktionsKopf";
import { PlattformRollen } from "@/components/funktionen/PlattformRollen";
import { BentoTile, TileIcon } from "@/components/v2/BentoGrid";
import { crumbsFor } from "@/lib/breadcrumbs";
import type { PlattformPanel } from "@/lib/funktionsdetails/types";
import { angebotScene, kopfVisuals, zeitenScene } from "@/lib/scenes";
import { site } from "@/lib/site";

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const text = (s: string) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const count = (html: string, needle: string) => html.split(needle).length - 1;

const H1 = "Angebotssoftware, die bis zur letzten Position passt";
const basis = {
  id: "funktion-titel",
  eyebrow: "Angebot",
  h1: H1,
  keyword: "Angebotssoftware,",
  lead: "Positionen mit Lohn, Material und Zuschlägen kalkulieren und als PDF mit Ihrem Briefpapier ausgeben.",
  secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/angebot-entwurf-anlegen" },
  visual: kopfVisuals.angebote,
  crumbs: crumbsFor("/funktionen/angebote"),
};
const kopf = (props: Partial<Parameters<typeof FunktionsKopf>[0]> = {}) =>
  renderToString(createElement(FunktionsKopf, { ...basis, ...props }));

describe("FunktionsKopf (F1)", () => {
  const html = kopf();

  it("genau eine H1 mit exaktem Zieltext und Kopfwort im nowrap-Span", () => {
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
    expect(h1s).toHaveLength(1);
    expect(text(h1s[0][1])).toBe(H1);
    expect(h1s[0][0]).toContain('id="funktion-titel"');
    expect(html).toMatch(/<span class="[^"]*" data-keyword="">Angebotssoftware,<\/span>/);
  });

  it("section mit data-funktions-kopf, data-abschnitt kopf, dunklem Ton und aria-labelledby", () => {
    const section = html.match(/<section[^>]*>/)![0];
    expect(section).toContain("data-funktions-kopf");
    expect(section).toContain('data-abschnitt="kopf"');
    expect(section).toContain('data-tone="dark"');
    expect(section).toContain('aria-labelledby="funktion-titel"');
  });

  it("Brotkrumen (G1/G6) als erste Zeile im Kopf, dunkler Ton, eine BreadcrumbList aus crumbs", () => {
    const nav = html.indexOf('aria-label="Brotkrumen"');
    expect(count(html, 'aria-label="Brotkrumen"')).toBe(1);
    expect(nav).toBeGreaterThan(html.indexOf("<section"));
    expect(nav).toBeLessThan(html.indexOf("v2-eyebrow"));
    expect(nav).toBeLessThan(html.indexOf("<h1"));
    expect(html.slice(html.lastIndexOf("<nav", nav), nav + 200)).toContain('data-tone="dark"');
    const lists = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)]
      .map((m) => JSON.parse(m[1]))
      .filter((b) => b["@type"] === "BreadcrumbList");
    expect(lists).toHaveLength(1);
    expect(lists[0].itemListElement.map((e: { name: string }) => e.name)).toEqual(basis.crumbs.map((c) => c.name));
  });

  it("crumbsSchema={false} rendert die nav ohne BreadcrumbList", () => {
    const ohne = kopf({ crumbsSchema: false });
    expect(count(ohne, 'aria-label="Brotkrumen"')).toBe(1);
    expect(ohne).not.toContain("application/ld+json");
  });

  it("Eyebrow als v2-eyebrow mit dem Gruppennamen", () => {
    expect(html).toMatch(/<p class="v2-eyebrow[^"]*">Angebot<\/p>/);
  });

  it("CTA mit site.trialDays, site.ctaUrl und data-track trial; Sekundärlink; CTA vor dem Visual", () => {
    const cta = html.match(/<a[^>]*data-track="trial"[^>]*>([\s\S]*?)<\/a>/)!;
    expect(cta[0]).toContain(`href="${site.ctaUrl}"`);
    expect(text(cta[1])).toBe(`${site.trialDays} Tage kostenlos testen`);
    expect(html).not.toContain('data-track="login"');
    expect(html).toMatch(/<a[^>]*href="\/hilfe\/angebot-entwurf-anlegen"[^>]*>Anleitung in der Hilfe<\/a>/);
    expect(html.indexOf('data-track="trial"')).toBeLessThan(html.indexOf("<figure"));
  });

  it("Browser-Visual als Frame im dunklen Ton mit Kennzeichnung und Kurzform-Beleg", () => {
    expect(html).toContain('data-figure="browser"');
    expect(html).toMatch(/<figure[^>]*data-tone="dark"[^>]*data-figure="browser"/);
    expect(count(html, "Vereinfachte Darstellung mit Beispieldaten")).toBe(1);
    const belege = [...html.matchAll(/data-evidence="([^"]+)"/g)].map((m) => m[1]);
    expect(belege).toEqual([angebotScene.screen]);
    for (const beleg of belege) expect(beleg).toMatch(/^(web|app):[^\s/]+$/);
  });

  it("Phone-Visual als Frame mit 240 px", () => {
    const phone = kopf({ visual: { kind: "phone", scene: zeitenScene } });
    expect(phone).toContain('data-figure="phone"');
    expect(phone).toContain(`data-evidence="${zeitenScene.screen}"`);
    expect(count(phone, "Vereinfachte Darstellung mit Beispieldaten")).toBe(1);
    expect(phone).toMatch(/--phone-width:\s*240px|width:\s*240px|data-width="240"/);
  });

  it("Paar als DevicePair compact im dunklen Ton mit genau einer Kennzeichnung", () => {
    const pair = kopf({ visual: kopfVisuals.plantafel });
    expect(pair).toMatch(/<figure[^>]*data-tone="dark"[^>]*data-figure="pair"[^>]*data-layout="compact"/);
    expect(count(pair, "Vereinfachte Darstellung mit Beispieldaten")).toBe(1);
    const belege = [...pair.matchAll(/data-evidence="([^"]+)"/g)].map((m) => m[1]);
    expect(belege.length).toBeGreaterThanOrEqual(2);
    for (const beleg of belege) expect(beleg).toMatch(/^(web|app):[^\s/]+$/);
  });

  it("Kopfwort, das nicht in der H1 steht, wirft", () => {
    expect(() => kopf({ keyword: "Angebotsprogramm" })).toThrow(
      "FunktionsKopf: H1 enthält das Kopfwort ‚Angebotsprogramm‘ nicht – keyword-map.json oder Datenmodul prüfen.",
    );
  });

  it("Lead mit zwei Sätzen wirft", () => {
    expect(() => kopf({ lead: "Positionen kalkulieren. Als PDF ausgeben." })).toThrow(
      "FunktionsKopf: Lead hat 2 Sätze – genau einen Satz schreiben.",
    );
  });

  it("Lead über 110 Zeichen wirft den Budgettext pageHead.kopfLead", () => {
    expect(() => kopf({ lead: `${"Positionen kalkulieren und ausgeben ".repeat(4)}im Büro.` })).toThrow(
      /Textbudget überschritten: pageHead\.kopfLead hat \d+ von 110 Zeichen – Satz kürzen\./,
    );
  });

  it("/app-Variante: StoreLinks, zwei QR-Codes 96 × 96 ab 1024 px, kein Sekundärlink", () => {
    const app = kopf({
      eyebrow: "Mobile-App",
      h1: "Die Handwerker-App für Ihr Team auf der Baustelle",
      keyword: "Handwerker-App",
      lead: "Zeiten, Einsätze, Fotos, Mängel und Unterschriften erfasst Ihr Team direkt auf der Baustelle.",
      secondary: undefined,
      visual: { kind: "phone", scene: zeitenScene },
      stores: true,
    });
    expect(app).toContain(`href="${site.iosUrl}"`);
    expect(app).toContain(`href="${site.androidUrl}"`);
    expect(app).toContain('aria-label="CraftOS für Ihr Handy"');
    const qr = [...app.matchAll(/<img[^>]*>/g)].map((m) => m[0]).filter((img) => img.includes("qr-"));
    expect(qr).toHaveLength(2);
    for (const img of qr) {
      expect(img).toContain('width="96"');
      expect(img).toContain('height="96"');
    }
    expect(qr.some((img) => img.includes('alt="QR-Code zum App Store"'))).toBe(true);
    expect(qr.some((img) => img.includes('alt="QR-Code zum Google Play Store"'))).toBe(true);
    expect(app).toContain(">iPhone und iPad<");
    expect(app).toContain(">Android<");
    expect(app).toMatch(/class="[^"]*hidden[^"]*lg:flex[^"]*"/);
    expect(app).not.toContain("Anleitung in der Hilfe");
    expect(app).not.toContain("Alle Funktionen ansehen");
  });
});

/** 256 Zeichen, zwei Sätze (08-UI-SPEC G1: answer ≤ 300, 1–2 Sätze). */
const ANTWORT =
  "CraftOS ist eine Handwerkersoftware für Betriebe für Angebote, Plantafel, Zeiterfassung und Rechnungen in einer Web-App und einer Mobile-App. Die Voll-Lizenz kostet 29,95 € netto je Person und Monat, die App-Lizenz für Mitarbeitende 9,95 € netto pro Monat.";

describe("FunktionsKopf ohne Visual mit Antwort und Stand (08-UI-SPEC G1, C4)", () => {
  const ohne = (props: Partial<Parameters<typeof FunktionsKopf>[0]> = {}) =>
    kopf({
      eyebrow: "Vergleich",
      h1: "Handwerkersoftware im Vergleich",
      keyword: "Handwerkersoftware",
      lead: undefined,
      answer: ANTWORT,
      visual: undefined,
      secondary: { label: "Zur Vergleichstabelle", href: "#vergleich" },
      crumbs: crumbsFor("/vergleich"),
      ...props,
    });
  const html = ohne({ stand: "Anbieterangaben Stand 22.10.2026, Quellen unter der Tabelle" });

  it("Testantwort hat 256 Zeichen und zwei Sätze", () => {
    expect(Array.from(ANTWORT).length).toBe(256);
  });

  it("ohne visual: kein Produkt-Container, einspaltiges Layout gekennzeichnet", () => {
    expect(html).not.toContain("data-visual=");
    expect(html).not.toContain("<figure");
    expect(html).toContain('data-layout="einspaltig"');
    expect(kopf()).not.toContain('data-layout="einspaltig"');
  });

  it("answer rendert genau ein <p id=\"antwort\" data-answer> direkt nach der H1, kein Lead-Absatz", () => {
    expect(count(html, 'id="antwort"')).toBe(1);
    const nachH1 = html.slice(html.indexOf("</h1>") + 5);
    expect(nachH1).toMatch(/^<p[^>]*id="antwort"[^>]*data-answer=""[^>]*>/);
    const p = nachH1.match(/^<p[^>]*>([\s\S]*?)<\/p>/)!;
    expect(text(p[1])).toBe(ANTWORT);
    expect(count(html, "data-answer")).toBe(1);
    expect(html).not.toContain(basis.lead);
  });

  it("stand rendert eine Label-Zeile direkt nach der Antwort, vor dem CTA", () => {
    const antwortEnde = html.indexOf("</p>", html.indexOf('id="antwort"'));
    const rest = html.slice(antwortEnde + 4);
    expect(rest).toMatch(/^<p[^>]*data-stand=""[^>]*>Anbieterangaben Stand 22\.10\.2026, Quellen unter der Tabelle<\/p>/);
    expect(html.indexOf("data-stand")).toBeLessThan(html.indexOf('data-track="trial"'));
    expect(ohne()).not.toContain("data-stand");
  });

  it("Brotkrumen bleiben die erste Zeile", () => {
    expect(html.indexOf('aria-label="Brotkrumen"')).toBeLessThan(html.indexOf("<h1"));
  });

  it("answer mit 301 Zeichen wirft den Budgettext answer", () => {
    expect(() => ohne({ answer: `${"x".repeat(300)}.` })).toThrow(
      "Textbudget überschritten: answer hat 301 von 300 Zeichen – Satz kürzen.",
    );
  });

  it("answer mit drei Sätzen wirft", () => {
    expect(() => ohne({ answer: "Erster Satz. Zweiter Satz. Dritter Satz." })).toThrow(
      "FunktionsKopf: Antwort hat 3 Sätze – ein bis zwei Sätze schreiben.",
    );
  });

  it("lead und answer gleichzeitig wirft den Fehlertext aus dem UI-SPEC", () => {
    expect(() => ohne({ lead: basis.lead })).toThrow(
      "FunktionsKopf: lead und answer gleichzeitig gesetzt – nur answer verwenden.",
    );
  });

  it("weder lead noch answer wirft", () => {
    expect(() => ohne({ answer: undefined })).toThrow("FunktionsKopf: lead oder answer angeben.");
  });

  it("Bestandskopf mit visual und lead bleibt unverändert (kein data-answer, kein Stand)", () => {
    const bestand = kopf();
    expect(bestand).not.toContain("data-answer");
    expect(bestand).not.toContain('id="antwort"');
    expect(bestand).toContain(basis.lead);
    expect(bestand).toContain('data-visual="browser"');
  });
});

const webPanel: PlattformPanel = {
  platform: "web",
  rollen: [{ name: "Admin" }, { name: "Büro-Leitung" }, { name: "Büro-Projektleitung", zusatz: "eigene Projekte" }],
  satz: "Im Büro kalkulieren Sie Positionen und geben das Angebot als PDF aus.",
  lizenzen: ["voll"],
};
const mobilePanel: PlattformPanel = {
  platform: "mobile",
  rollen: [{ name: "Mobil-Teammitglied", zusatz: "eigene Zeiten" }, { name: "Mobil-Teamleitung" }],
  satz: "Auf der Baustelle starten und stoppen Sie den Timer in der App.",
  lizenzen: ["voll", "app"],
};

describe("PlattformRollen (F2)", () => {
  const html = renderToString(createElement(PlattformRollen, { slug: "zeiterfassung", panels: [webPanel, mobilePanel] }));

  it("zwei article mit h3 „Im Büro“ und „Auf der Baustelle“", () => {
    expect(count(html, "<article")).toBe(2);
    const h3 = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => text(m[1]));
    expect(h3).toEqual(["Im Büro", "Auf der Baustelle"]);
    expect(html.indexOf('data-platform="web"')).toBeLessThan(html.indexOf('data-platform="mobile"'));
  });

  it("je Panel eine Rollenliste, Plattform-Badge und Lizenzgruppe „Enthalten in“", () => {
    expect(count(html, '<ul aria-label="Rollen"')).toBe(2);
    expect(count(html, 'aria-label="Enthalten in"')).toBe(2);
    expect(html).toContain("Web-App");
    expect(html).toContain("Mobile-App");
    expect(count(html, "Voll-Lizenz")).toBe(2);
    expect(count(html, "App-Lizenz")).toBe(1);
    expect(text(html)).toContain("Büro-Projektleitung eigene Projekte");
    expect(text(html)).toContain(webPanel.satz);
  });

  it("Rollenzusatz nur, wenn vorhanden; Icons dekorativ", () => {
    expect(count(html, "data-rolle=")).toBe(5);
    expect(html).not.toMatch(/<svg(?![^>]*aria-hidden="true")[^>]*>/);
  });

  it("Panel ohne Rollen zeigt nur den Satz", () => {
    const ohne = renderToString(
      createElement(PlattformRollen, {
        slug: "angebote",
        panels: [webPanel, { platform: "mobile", rollen: [], satz: "Dokumente unterschreiben Sie je nach Rolle und Freigabe in der App.", lizenzen: ["voll"] }],
      }),
    );
    expect(count(ohne, '<ul aria-label="Rollen"')).toBe(1);
    expect(ohne).toContain("Dokumente unterschreiben Sie je nach Rolle und Freigabe in der App.");
  });

  it("Web-only-Panel trägt die Kennung für die halbe Breite", () => {
    const einzeln = renderToString(createElement(PlattformRollen, { slug: "gaeb", panels: [webPanel] }));
    expect(einzeln).toContain('data-panels="1"');
  });

  it("Mobile-Panel für eine Web-only-Funktion wirft", () => {
    expect(() => renderToString(createElement(PlattformRollen, { slug: "gaeb", panels: [webPanel, mobilePanel] }))).toThrow(
      "Plattform mobile ist für gaeb nicht belegt – platforms aus lib/funktionen.ts übernehmen.",
    );
  });
});

describe("BentoTile data-zusatz", () => {
  const props = {
    size: "md" as const,
    title: "Lager-Scan und Wareneingang",
    text: "Artikel per Barcode scannen und Wareneingänge am Lager buchen.",
    visual: createElement(TileIcon, { icon: Calculator }),
  };

  it("mit zusatz trägt die Kachel data-zusatz", () => {
    const html = renderToString(createElement(BentoTile, { ...props, zusatz: "lager-scan" }));
    expect(html).toContain('data-zusatz="lager-scan"');
  });

  it("ohne zusatz kein data-zusatz-Attribut", () => {
    const html = renderToString(createElement(BentoTile, props));
    expect(html).not.toContain("data-zusatz");
  });
});
