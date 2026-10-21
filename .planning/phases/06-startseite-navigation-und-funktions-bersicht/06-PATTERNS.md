# Phase 6: Startseite, Navigation und Funktionsübersicht – Pattern Map

**Mapped:** 2026-10-21
**Files analyzed:** 34 (13 neu, 21 geändert)
**Analogs found:** 33 / 34 (eine Datei nur mit Teilanalog: `components/layout/ActiveLink.tsx`)

Alle Pfade relativ zu `C:/Projekte/Websitenerstellung/craftos/`. Zeilenangaben beziehen sich auf den Stand vom Commit `30a29f7`.

---

## File Classification

### Neue Dateien

| Neue Datei | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `lib/funktionsgruppen.ts` (server-only) | model/utility (Datenmodul) | transform (Register + funktionen → 6 Gruppen) | `lib/styleguide-content.ts` (Helfer `funktion()`, `featureCard()`), `lib/product-register.ts` (server-only, `getProductRegister()`) | role-match |
| `lib/home-content.ts` | config/content-Modul | transform (site/tarife/Register → Texte) | `lib/styleguide-content.ts` | exact |
| `lib/scenes.ts` | content-Modul | statische Daten | `lib/styleguide-content.ts:62–156` (wird dorthin verschoben) | exact (Extraktion) |
| `components/v2/SceneContent.tsx` | component (RSC) | transform (Szene → Mini-UI) | `app/styleguide/page.tsx:93–143` (`SceneContent`, `Frame`) | exact (Extraktion) |
| `components/layout/HeaderShell.tsx` (`"use client"`) | component/provider (Client-Insel) | event-driven | `components/layout/Header.tsx` (ganzer Bestand) | exact |
| `components/layout/MegaMenu.tsx` (Server) | component (RSC) | request-response (statisches Rendern) | `components/layout/Footer.tsx:4–32` (Server-Linkspalten) + `Header.tsx:11–26` (Gruppenmodell) + `BentoGrid.tsx:96–102` (Icon-Feld) | role-match |
| `components/layout/ActiveLink.tsx` (`"use client"`) | component (Blatt) | event-driven (Pfadwechsel) | `components/Analytics.tsx:1–17` (`usePathname`), `Header.tsx:169` (Link) | partial |
| `components/v2/FeatureList.tsx` | component (RSC, v2-Baustein) | transform | `components/v2/FeatureCard.tsx` | exact (Geschwister) |
| `components/v2/FeatureList.module.css` | style | – | `components/v2/FeatureCard.module.css` | exact |
| `tests/funktionsgruppen.test.ts` | test (Vitest) | batch/Parität | `tests/product-register.test.ts` + `tests/styleguide.test.ts:65–114` | exact |
| `tests/home.test.ts` | test (Vitest, `renderToString`) | batch | `tests/styleguide.test.ts` + `tests/design-v2-budgets.test.ts` | exact |
| `tests/e2e/home-navigation.pw.cjs` | test (Playwright) | event-driven/E2E | `tests/e2e/navigation.pw.cjs` + `tests/e2e/design-v2.pw.cjs` | exact |
| `docs/releases/PHASE-06-ROLLOUT.md` | Doku | – | `docs/releases/PHASE-05-ROLLOUT.md` (Abschnitte 1–10) | exact |

### Geänderte Dateien

| Geänderte Datei | Role | Data Flow | Analog / Muster | Match Quality |
|---|---|---|---|---|
| `components/layout/Header.tsx` | component → Server | request-response | wird Server-Hülle; Logik wandert nach `HeaderShell.tsx` | exact |
| `components/layout/Header.module.css` | style | – | Bestand (44 Zeilen) | exact |
| `components/v2/DevicePair.tsx` (+ `layout`) | component | transform | Bestand, Muster `tone`-Prop | exact |
| `components/v2/Frames.module.css` (`compact`) | style | – | Bestand `:221–259` | exact |
| `components/v2/BrowserFrame.tsx`, `PhoneFrame.tsx`, `DevicePair.tsx` (E3 `data-evidence` Kurzform) | component | transform | Bestand `BrowserFrame.tsx:60`, `PhoneFrame.tsx:91`, `DevicePair.tsx:24,29` | exact |
| `components/v2/budgets.ts` | utility | – | Bestand `TEXT_BUDGET` | exact |
| `lib/funktionen.ts` (+ `benefit`) | model | transform | Bestand `Definition`/`Funktion` `:29–68`, Mapping `:637–660` | exact |
| `lib/styleguide-content.ts` | content | – | importiert künftig Szenen aus `lib/scenes.ts` | exact |
| `app/styleguide/page.tsx` | page | – | importiert `SceneContent`/`Frame` aus `components/v2` | exact |
| `app/page.tsx` | page (RSC) | request-response | `app/styleguide/page.tsx` (Bausteinverwendung) + Bestand `:25–51, 302` (Metadaten/FAQ-Schema) | exact |
| `components/home/Hero.tsx` | component | – | Bestand (wird ersetzt/gelöscht) | exact |
| `app/funktionen/page.tsx` | page (RSC) | request-response | `app/funktionen/[slug]/page.tsx:1–25` (Breadcrumb-Schema-Import, Metadaten) + `app/styleguide/page.tsx:290–307` (FeatureCard-Raster) | exact |
| `app/sitemap.ts` | config | – | Bestand `pageUpdated` `:8–17` | exact |
| `lib/site.ts` (`demoUrl`, ggf. `nav` entfernen) | config | – | Bestand | exact |
| `app/globals.css` | style | – | Bestand `:72–79/446–451` (h1), `:521–545` (`.home-hero`) | exact |
| `tests/seo-brand.test.ts` | test | – | Bestand `:7–11` | exact |
| `tests/pricing-parity.test.ts` | test | – | Bestand `:101–121` Dateiliste | exact |
| `tests/keyword-map.test.ts` (D-12) | test | – | Bestand `:143–153` | exact |
| `tests/design-v2-frames.test.ts` (E3) | test | – | Bestand `:225, 251, 284–285` | exact |
| `tests/e2e/navigation.pw.cjs` | test | – | Bestand (6 Tests) | exact |
| `tests/e2e/design-v2.pw.cjs` | test | – | Bestand `:16, 84` | exact |
| `tests/e2e/function-illustrations.pw.cjs` | test | – | Block ab `:501` entfernen | exact |
| `tests/e2e/playwright.config.cjs` | config | – | Bestand `:7` `testMatch` | exact |

---

## Pattern Assignments

### `lib/funktionsgruppen.ts` (model/utility, transform, server-only)

**Analoga:** `lib/product-register.ts` (server-only-Schutz, Datenrückgabe), `lib/styleguide-content.ts` (Helfer, die bei fehlenden Einträgen mit UI-SPEC-Fehlertext werfen).

**Server-only-Kopf** (`lib/product-register.ts:1`):
```ts
import "server-only";
```
Vitest löst `server-only` über `vitest.config.ts` auf den Stub `tests/server-only.ts` auf – Tests dürfen das Modul also direkt importieren:
```ts
resolve: { alias: { '@': path.resolve(import.meta.dirname, '.'), 'server-only': path.resolve(import.meta.dirname, 'tests/server-only.ts') } },
```

**Quelle der Zusatzfunktionen** – `liveExtras` ist **nicht exportiert**, nur über `getProductRegister()` erreichbar (`lib/product-register.ts:184–189, 370–398`):
```ts
const liveExtras: {
  name: string;
  platforms: ProductPlatform[];
  evidence: Evidence[];
  advertised: boolean;
}[] = [ … ];
…
export function getProductRegister() {
  return {
    basis: productBasis,
    …
    liveExtras,
    notLive,
```
→ Im Gruppenmodul `getProductRegister().liveExtras.filter((x) => x.advertised)` verwenden (Pitfall 10: „Vorhersagen“ ist `advertised: false`, `:328–334`). Der Sprachen-Eintrag hat einen berechneten Namen (`:313` `` `${mobileLocales.length} Sprachen in der Mobile-App` ``) → Zuordnungstabelle über denselben Ausdruck bilden (UI-SPEC Z. 544–562).

**Helfer-Muster mit Entwicklerfehler** (`lib/styleguide-content.ts:40–50`):
```ts
function tarif(id: "voll" | "app") {
  const entry = tarife.find((t) => t.id === id);
  if (!entry) throw new Error(`styleguide-content: Tarif ${id} fehlt in lib/site.ts.`);
  return entry;
}

function funktion(slug: string) {
  const entry = getFunktion(slug);
  if (!entry) throw new Error(`styleguide-content: Funktion ${slug} fehlt in lib/funktionen.ts.`);
  return entry;
}
```
Fehlertexte für das Gruppenmodul wörtlich aus UI-SPEC Z. 626–627 übernehmen („Funktionsgruppen: {Name} aus dem Produktregister ist keiner Gruppe zugeordnet – Eintrag in lib/funktionsgruppen.ts ergänzen.“).

**Abgeleitetes Inhaltsobjekt aus Funktion** (`lib/styleguide-content.ts:287–290`):
```ts
function featureCard(slug: string, benefit: string, scene: FeatureCardContent["scene"]): FeatureCardContent {
  const f = funktion(slug);
  return { slug, name: f.name, icon: f.icon, benefit, platforms: [...f.platforms], href: `/funktionen/${slug}`, scene };
}
```
Gleiches Muster für Gruppeneinträge: Name, Icon, Plattformen immer aus `funktionen.ts`/Register, nie doppelt pflegen (D-07).

**Hinweis Icons:** Die Gruppen-Icons laut UI-SPEC (`FileText`, `CalendarDays`, `HardHat`, `Receipt`, `Calculator`, `Users`) weichen von `stepContent` in `lib/styleguide-content.ts:258–265` ab (dort `ClipboardCheck`/`BookOpenCheck` für Rechnung/Buchhaltung). Für Startseite und Menü die Gruppen-Icons aus dem Gruppenmodul verwenden; `stepContent` der Musterseite bleibt unverändert.

---

### `lib/home-content.ts` (content, transform)

**Analog:** `lib/styleguide-content.ts` (exakt dieselbe Rolle für `/styleguide`).

**Kopf/Imports** (`:1–25`):
```ts
/**
 * Inhalte der internen Musterseite /styleguide (UI-SPEC Phase 5, Blöcke 0–13).
 * Alle Zahlen stammen aus site.ts (tarife, trialDays, startCredits) und dem Produktregister;
 * Preise werden nie als Literal geschrieben. …
 */
import { BookOpenCheck, CalendarDays, … , type LucideIcon } from "lucide-react";
import type { KeyFact } from "@/components/v2/KeyFacts";
import type { ComparisonColumn, ComparisonRow } from "@/components/v2/ComparisonTable";
import type { Step } from "@/components/v2/StepFlow";
import { getFunktion, type ProductPlatform } from "@/lib/funktionen";
import { mobileLocales, productBasis } from "@/lib/product-register";
import { creditUmrechnung, site, startCredits, tarife } from "@/lib/site";

const NBSP = " ";
```

**Formatierer wiederverwenden statt neu bauen** (`:29–38`) – `euro()` und `germanDate()` sind exportiert:
```ts
export function euro(value: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
}
export function germanDate(iso: string): string { … }
```
→ `import { euro, germanDate } from "@/lib/styleguide-content"` oder beide in ein neutrales Modul verschieben (dann Styleguide-Import nachziehen).

**KeyFacts mit `source`-Kennung** (`:267–275`) – 1:1 für Abschnitt 1 der Startseite:
```ts
export const keyFactsContent: { facts: KeyFact[]; note: string } = {
  facts: [
    { value: trial, label: "kostenlos testen", source: "site.trialDays" },
    { value: euro(voll.monat), label: "Voll-Lizenz pro Monat", source: "tarife.voll.monat" },
    { value: euro(app.monat), label: "App-Lizenz pro Monat", source: "tarife.app.monat" },
    { value: String(mobileLocales.length), label: "Sprachen in der Mobile-App", source: "product-register: mobileLocales" },
  ],
  note: `Preise netto zzgl. USt. Stand: ${standDatum}.`,
};
```

**Vergleichstabelle** (`:329–351`, `comparisonContent`) – Startseiten-Abschnitt 5 nutzt denselben Inhalt (UI-SPEC Z. 216); entweder importieren oder hierher verschieben.

**FAQ-Werte aus Datenmodulen** – Bestand `app/page.tsx:30–51` (Werte über `voll`, `app`, `site.trialDays`) als Vorlage, Texte gemäß UI-SPEC Z. 314–320 kürzen. Testtage nur über `${site.trialDays}` (pricing-parity Testphasen-Scan).

**CTA-Band-Texte** (`:383–386`):
```ts
export const ctaContent = {
  title: "Machen Sie Platz für Ihr Handwerk.",
  text: "Ohne Zahlungsdaten – Sie entscheiden nach dem Test.",
} as const;
```

---

### `lib/scenes.ts` (content, statisch) und `components/v2/SceneContent.tsx` (component)

**Analog:** Extraktion aus `lib/styleguide-content.ts:62–156` (Typen `MiniRowContent`, `FrameScene`, `Visual` und die Szenen `plantafelScene`, `zeitenScene`, `maengelScene`, `aufmassScene`, `rechnungenScene`, `einsaetzeScene`) sowie `app/styleguide/page.tsx:93–143`.

**Szenen-Typ** (`lib/styleguide-content.ts:69–85`):
```ts
export interface FrameScene {
  /** Seitentitel in der Web-App bzw. Mobile-App (Mini-Budget 24 Zeichen). */
  title: string;
  /** Beleg am Release, Form "web:<pfad>" bzw. "mobile:<pfad>". */
  evidence: string;
  /** Screenreadersatz ≤ 140 Zeichen. */
  description: string;
  activeTab?: PhoneTab;
  rows?: MiniRowContent[];
  week?: MiniWeekEntry[];
  timer?: { label: string; value: string };
}

export type Visual =
  | { kind: "icon"; icon: LucideIcon }
  | { kind: "browser"; scene: FrameScene }
  | { kind: "phone"; scene: FrameScene };
```
Für E3 ein Feld für die Kurzform ergänzen (z. B. `screen: "Plantafel"` + Repo-Präfix), Kurzformen verbindlich: `web:Plantafel`, `web:Rechnungen`, `app:Einsätze`, `app:Zeiterfassung`, `app:Mängel`, `app:Aufmaß` (UI-SPEC Z. 103). Der volle Pfad bleibt in `evidence` für `tests/styleguide.test.ts:74–87`.

**Renderer** (`app/styleguide/page.tsx:93–143`) – unverändert als Server Component verschieben:
```tsx
function SceneContent({ scene }: { scene: FrameScene }) {
  return (
    <>
      {scene.timer ? <MiniTimer label={scene.timer.label} value={scene.timer.value} /> : null}
      {scene.week ? <MiniWeek entries={scene.week} /> : null}
      {scene.rows ? (
        <MiniList>
          {scene.rows.map((row, index) => (
            <MiniRow key={index} primary={row.primary} secondary={row.secondary} value={row.value}
              status={row.status ? <MiniStatus status={row.status} /> : undefined} />
          ))}
        </MiniList>
      ) : null}
    </>
  );
}

function Frame({ visual, width, tone = "light" }: {
  visual: Extract<Visual, { kind: "browser" | "phone" }>; width?: 160 | 194 | 240; tone?: "light" | "dark";
}) {
  const { scene } = visual;
  if (visual.kind === "browser") {
    return (
      <BrowserFrame title={scene.title} evidence={scene.evidence} description={scene.description} tone={tone}>
        <SceneContent scene={scene} />
      </BrowserFrame>
    );
  }
  return (
    <PhoneFrame title={scene.title} evidence={scene.evidence} description={scene.description}
      activeTab={scene.activeTab} width={width}>
      <SceneContent scene={scene} />
    </PhoneFrame>
  );
}
```
Nachziehen: `tests/design-v2-budgets.test.ts:36–43` (`scenes()` liest `content.bentoContent`, `featureCardContent`, `frameContent`) bleibt gültig, solange `styleguide-content.ts` die Szenen weiter referenziert; zusätzlich Szenen aus `home-content.ts`/`funktionsgruppen.ts` in eine analoge Budgetprüfung aufnehmen.

---

### `components/layout/HeaderShell.tsx` (Client-Insel, event-driven)

**Analog:** `components/layout/Header.tsx` – die gesamte Zustandslogik wird übernommen (Research „Don't Hand-Roll“: `Header.tsx:38–115`).

**Imports** (`Header.tsx:1–9`), ohne Datenmodule (`gewerke` bleibt erlaubt, ist klein; `funktionen`/Register **nie**):
```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { CraftOSLogo } from "@/components/CraftOSLogo";
import { site } from "@/lib/site";
import { StoreLinks } from "@/components/ui/StoreLinks";
import styles from "./Header.module.css";
```
Zusätzlich `import { usePathname } from "next/navigation";` (Muster `components/Analytics.tsx:4, 15`).

**Zustand und Refs** (`:30–42`):
```tsx
const [open, setOpen] = useState(false);
const [activeGroup, setActiveGroup] = useState<string | null>(null);
const headerRef = useRef<HTMLElement>(null);
const toggleRef = useRef<HTMLButtonElement>(null);
const navRef = useRef<HTMLElement>(null);
const groupButtons = useRef<Record<string, HTMLButtonElement | null>>({});
const openSource = useRef<"hover" | "press" | null>(null);

function closeNavigation() {
  setOpen(false);
  setActiveGroup(null);
  openSource.current = null;
}
```

**Breakpoint-Reset** (`:63–73`) und **Scroll-Lock mit Rückstellung** (`:75–88`) – unverändert übernehmen:
```tsx
useEffect(() => {
  if (!open || !window.matchMedia(mobileQuery).matches) return;
  const root = document.documentElement;
  const previousRootOverflow = root.style.overflow;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  root.style.overflow = "hidden";
  return () => {
    root.style.overflow = previousRootOverflow;
    if (window.scrollX !== scrollX || window.scrollY !== scrollY) {
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
    }
  };
}, [open]);
```

**Außenklick / Fokus außerhalb / Escape mit Fokusrückgabe** (`:90–115`) – unverändert:
```tsx
function onEscape(event: KeyboardEvent) {
  if (event.key !== "Escape") return;
  event.preventDefault();
  close();
  const button = open ? toggleRef.current : activeGroup ? groupButtons.current[activeGroup] : null;
  button?.focus({ preventScroll: true });
}
document.addEventListener("pointerdown", onOutside);
document.addEventListener("focusin", onOutside);
document.addEventListener("keydown", onEscape);
```

**Hover nur Maus + `wasHover`-Logik + ArrowDown** (`:136–167`) – verbindlich laut UI-SPEC Z. 445–447; Auslöser wird das `<li>` statt `div.group`:
```tsx
onPointerEnter={(event) => {
  if (event.pointerType !== "mouse" || window.matchMedia(mobileQuery).matches || !group.links) return;
  openSource.current = "hover";
  setActiveGroup(group.id);
}}
…
onClick={() => {
  const wasHover = openSource.current === "hover";
  openSource.current = "press";
  setActiveGroup((current) => current === group.id && !wasHover ? null : group.id);
  keepGroupVisible(group.id);
}}
onKeyDown={(event) => {
  if (event.key !== "ArrowDown") return;
  event.preventDefault();
  openSource.current = "press";
  setActiveGroup(group.id);
  requestAnimationFrame(() => document.getElementById(`navigation-${group.id}`)?.querySelector("a")?.focus());
}}
```

**Menü-Schalter mit Bestandsnamen** (`:121–132`) – Namen „Menü öffnen“/„Menü schließen“ und `aria-controls="hauptnavigation"` bleiben (Tests). Neu laut D-17: beim Öffnen `setActiveGroup("funktionen")` statt `null` (mobil vorgeöffnet).

**Aktionen** (`:174–178`) – `data-track="login"` am Login, CTA ohne `data-track="login"`, Klasse auf `v2-btn-cta` umstellen:
```tsx
<a href={site.appUrl} className={styles.login} data-track="login" onClick={closeNavigation}>Anmelden</a>
<a href={site.ctaUrl} className="btn-cta" onClick={closeNavigation}>10 Tage testen <ArrowUpRight size={16} aria-hidden="true" /></a>
```

**Neu gegenüber Bestand (Research Pattern 1/3, Pitfall 4):**
- Hauptpunkt = `<Link href>` + separater `<button aria-label="Untermenü …" aria-expanded aria-controls>`; Panel-ID-Schema `navigation-<id>` beibehalten (Tests nutzen `#navigation-gewerke`), für Funktionen laut UI-SPEC `nav-funktionen` – im Plan **eine** Konvention festlegen und Tests angleichen.
- Server-Slot schließen: Delegation `onClick` am `nav` (`(e.target as Element).closest("a")`) und `useEffect(() => closeNavigation(), [pathname])`.
- `<noscript><style>` gemäß Research Z. 405–411.

---

### `components/layout/Header.tsx` (wird Server Component)

**Analog für Server-Rendering von Linkspalten:** `components/layout/Footer.tsx:1–32` (kein `"use client"`, `as const`-Spalten, `next/link`):
```tsx
import Link from "next/link";
import { CraftOSLogo } from "@/components/CraftOSLogo";
import { site } from "@/lib/site";
const columns = [
  [ "Produkt", [ ["Funktionen", "/funktionen"], ["Mobile-App", "/app"], ["Craft AI", "/craft-ai"], … ] ],
  …
] as const;
```
**Gruppenmodell für Gewerke/Wissen/Hilfe** unverändert aus `Header.tsx:17–25` übernehmen (Tests erwarten 13 Gewerke-Links, erster „Alle Gewerke“, Wissen → „Ratgeber“):
```tsx
{ id: "gewerke", label: "Gewerke", href: "/gewerke", links: [
  ["Alle Gewerke", "/gewerke"], ...gewerke.map((gewerk) => [gewerk.name, `/gewerke/${gewerk.slug}`] as const),
] },
{ id: "preise", label: "Preise", href: "/preise" },
{ id: "wissen", label: "Wissen", href: "/blog", links: [ ["Ratgeber", "/blog"], ["Kostenlose Rechner", "/rechner"], … ] },
{ id: "hilfe", label: "Hilfe", href: "/hilfe", links: [["Hilfezentrum", "/hilfe"], ["Kontakt & Support", "/support"]] },
```
Einbindung im Layout bleibt unverändert (`app/layout.tsx:5, 130`: `import { Header } …` / `<Header />`). Server-Header liest `lib/funktionsgruppen.ts` und übergibt `<MegaMenu groups={…} />` als Prop/Children an `HeaderShell` (Next-16-Interleaving, Research Pattern 3).

---

### `components/layout/MegaMenu.tsx` (Server, Links + Icons)

**Analoga:** `Footer.tsx` (Server-Linkliste), `Header.tsx:168–170` (Panel-Markup), `components/v2/BentoGrid.tsx:95–102` (Icon-Feld):
```tsx
/** Icon-Visual: Lucide 24 px im 48 × 48-px-Feld; Fläche passt sich der Kachelfläche an. */
export function TileIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className={s.icon} aria-hidden="true">
      <Icon size={24} strokeWidth={1.75} />
    </span>
  );
}
```
→ Für Menü und `FeatureList` 40 × 40-Feld, Icon 20 px (UI-SPEC Abweichung A5), sonst identisch (`aria-hidden`, `strokeWidth={1.75}`).

**Panel-Link-Bestand** (`Header.tsx:169`): `<Link key={href} href={href} …>{label}</Link>` → im MegaMenu durch `<ActiveLink>` ersetzen, kein `onClick` (Server), Schließen via Delegation in `HeaderShell`. Optional `prefetch={false}` (Pitfall 11). Semantik `ul/li` statt `div`, keine Überschriften im Menü (UI-SPEC Z. 670).

---

### `components/layout/ActiveLink.tsx` (Client-Blatt, nur `aria-current`)

**Teilanalog:** `components/Analytics.tsx:1–5, 15` (`"use client"` + `usePathname`):
```tsx
"use client";
import { usePathname } from "next/navigation";
…
const pathname = usePathname();
```
Kein bestehender Link-Wrapper im Projekt. Props laut UI-SPEC Z. 454: nur `href`, `className?`, `children`; Vergleich ohne Hash und ohne abschließenden Schrägstrich; Links mit `#` nie aktuell; keine Datenmodul-Imports.

---

### `components/v2/FeatureList.tsx` + `.module.css` (v2-Baustein, transform)

**Analog:** `components/v2/FeatureCard.tsx` und `FeatureCard.module.css`.

**Imports und Budgetprüfung beim Rendern** (`FeatureCard.tsx:1–7, 41–42`):
```tsx
import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { funktionen, type ProductPlatform } from "@/lib/funktionen";
import { PlatformBadges } from "./Badges";
import { TEXT_BUDGET, assertTextBudget } from "./budgets";
import s from "./FeatureCard.module.css";
…
assertTextBudget("featureCard.title", name, TEXT_BUDGET.featureCard.title);
assertTextBudget("featureCard.benefit", benefit, TEXT_BUDGET.featureCard.benefit);
```
→ FeatureList: `assertTextBudget("featureList.name", …)` / `("featureList.benefit", …)` plus `assertCount("FeatureList", items.length, TEXT_BUDGET.count.featureList, "Einträge")` (1–7). FeatureList darf `funktionen` **nicht** importieren (Einträge sind Zusatzfunktionen); Plattform-Prüfung stattdessen im Gruppenmodul/Test.

**Plattformprüfung mit UI-SPEC-Fehlertext** (`FeatureCard.tsx:34–40`) – als Vorlage für die Prüfung gegen `liveExtras[].platforms`:
```tsx
for (const platform of platforms) {
  if (!funktion.platforms.includes(platform)) {
    throw new Error(
      `FeatureCard: Plattform ${platform} ist für ${slug} nicht belegt – platforms aus lib/funktionen.ts übernehmen.`,
    );
  }
}
```

**Badges** (`FeatureCard.tsx:50`): `{platforms.length > 0 ? <PlatformBadges platforms={platforms} /> : null}`

**Gestreckter Klickbereich, ein Tabstopp** (`FeatureCard.module.css:104–113` und `:13–16`):
```css
.link::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
}
.link:focus-visible {
  outline: none;
}
.card:focus-within {
  outline: 3px solid #bb7609;
  outline-offset: 4px;
}
```
**Hover nur bei `hover: hover`, 150 ms** (`:114–124`) und Textfarben `#17171c` / `#62626e` (`:79, 92`). Zeilen ohne `target` rendern den Namen als Text (kein Link, kein Hinweis).

---

### `components/v2/DevicePair.tsx` + `Frames.module.css` (E1 `layout="compact"`, E3 Belege)

**Bestand** (`DevicePair.tsx:7–37`):
```tsx
export interface DevicePairProps {
  browser: { title: string; evidence: string; children: ReactNode };
  phone: { title: string; evidence: string; activeTab?: PhoneTab; children: ReactNode };
  description: string;
  tone?: "light" | "dark";
}
export function DevicePair({ browser, phone, description, tone = "light" }: DevicePairProps) {
  return (
    <figure className={`${s.figure} ${s.pairFigure}`} data-tone={tone} data-figure="pair">
      <div className={s.pair}>
        <div className={s.pairBrowser} data-evidence={browser.evidence}>
          …
        <div className={s.pairPhone} data-evidence={phone.evidence}>
```
→ Neue Prop `layout?: "default" | "compact"` nach demselben Muster wie `tone` (Standardwert, als `data-layout` an der `figure`), CSS-Varianten über `[data-layout="compact"]`.

**CSS-Bestand, auf dem `compact` aufsetzt** (`Frames.module.css:226–259`):
```css
.pair { display: flex; flex-direction: column; align-items: center; gap: 24px; min-width: 0; }
.pairPhone { position: relative; z-index: 1; display: flex; justify-content: center; }
@media (min-width: 768px) {
  .pair { flex-direction: row; align-items: flex-start; gap: 0; }
  .pairBrowser { flex: 1 1 auto; padding-top: 0; }
  .pairPhone { flex: none; margin-top: 24px; margin-left: -48px; }
}
```
`compact` < 768 px: `align-items: stretch`, Phone `align-self: flex-end; margin-top: -64px; margin-right: 16px` mit `--phone-w: 160px` (UI-SPEC Z. 249–251).

**E3 Kurzform:** `data-evidence` steht an drei Stellen (`BrowserFrame.tsx:60`, `PhoneFrame.tsx:91`, `DevicePair.tsx:24, 29`); die Pflichtprüfung `evidence.trim()` in `BrowserDevice` (`BrowserFrame.tsx:34–36`) bleibt. Mitzuziehen: `tests/design-v2-frames.test.ts:225, 251, 284–285` (erwarten heute den vollen Pfad im HTML), `tests/e2e/design-v2.pw.cjs:84` (Regex → `^(web|app):[^\s/]+$`).

---

### `components/v2/budgets.ts` (Phase-6-Budgets)

**Bestand** (`:7–25`), erweitern nach demselben Schema (UI-SPEC Z. 634–643):
```ts
export const TEXT_BUDGET = {
  sectionHeader: { eyebrow: 24, title: 60, lead: 140 },
  …
  featureCard: { title: 32, benefit: 100 },
  …
  count: {
    bento: { min: 3, max: 7 },
    …
  },
} as const;
```
Neu z. B. `hero: { h1: 60, lead: 110 }`, `funktionenHero: { lead: 140 }`, `menuGroup: { description: 60 }`, `featureList: { name: 32, benefit: 100 }`, `count.featureList: { min: 1, max: 7 }`, `count.homeSections: { min: 6, max: 8 }`. Fehlertexte über die bestehenden `assertTextBudget`/`assertCount` (`:33–53`) – nicht neu formulieren.

---

### `lib/funktionen.ts` (+ Feld `benefit`)

**Bestand** – `Definition` (`:54–68`) und Abbildung auf `Funktion` (`:637–660`):
```ts
interface Definition {
  slug: string;
  name: string;
  icon: LucideIcon;
  title: string;
  intro: string;
  platforms: ProductPlatform[];
  …
}
…
export const funktionen: Funktion[] = definitions.map((d) => ({
  slug: d.slug,
  name: d.name,
  icon: d.icon,
  tier: "heute",
  kurz: d.intro,
  …
  checkedAt: "2026-10-20",
}));
```
→ `benefit: string` in `Definition` **und** `Funktion` ergänzen, im `map` durchreichen. Texte (genau 1 Satz, ≤ 100) aus UI-SPEC Z. 500–517. `kurz`/`intro` nicht ändern (Detailseiten, `seoDescription`, Register `summary`).

---

### `app/page.tsx` (Startseite, RSC)

**Analog Bausteinverwendung:** `app/styleguide/page.tsx:243–401`; **Analog Metadaten/FAQ-Schema:** Bestand `app/page.tsx:15–18, 25–29, 302`.

**Imports** (Musterseite `:3–17` als Vorlage, nur benötigte Bausteine):
```tsx
import { BentoGrid, BentoTile, TileIcon } from "@/components/v2/BentoGrid";
import { ComparisonTable } from "@/components/v2/ComparisonTable";
import { CtaBand } from "@/components/v2/CtaBand";
import { DevicePair } from "@/components/v2/DevicePair";
import { FaqList } from "@/components/v2/FaqList";
import { KeyFacts } from "@/components/v2/KeyFacts";
import { PhoneFrame } from "@/components/v2/PhoneFrame";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow } from "@/components/v2/StepFlow";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
```

**Metadaten (Root-Segment, Template greift nicht – Pitfall 1)** – Bestandsform `:25–29`, Werte laut Research Z. 430–434:
```tsx
export const metadata = pageMetadata(
  "Handwerkersoftware für Büro und Baustelle | CraftOS",
  `CraftOS ist die Handwerkersoftware für Angebote, … ${site.trialDays} Tage testen.`,
  "/",
);
```
`pageMetadata` (`lib/metadata.ts:3–33`) setzt Title, Canonical, OG, Twitter – kein eigenes `<head>`.

**Bausteine je Abschnitt** (Musterseite):
```tsx
<SectionHeader {...sectionHeaderContent} />                                   // :244
<BentoGrid label="Kernfunktionen (Muster)">                                   // :252–274
  {bentoContent.map((tile) => { const dark = tile.surface === "dark"; return (
    <BentoTile key={tile.title} size={tile.size} surface={tile.surface} title={tile.title} text={tile.text}
      visualPosition={tile.visualPosition}
      badges={<PlatformBadges platforms={platformsOf(tile.slug)} tone={dark ? "dark" : "light"} />}
      visual={tile.visual.kind === "icon" ? <TileIcon icon={tile.visual.icon} /> : <Frame visual={tile.visual} width={160} tone={dark ? "dark" : "light"} />}
    /> ); })}
</BentoGrid>
<StepFlow steps={stepContent} tone="amber" label="Arbeitsablauf in CraftOS (Amber)" />   // :281
<KeyFacts facts={keyFactsContent.facts} note={keyFactsContent.note} />                  // :287
<ComparisonTable caption={…} columns={…} rows={…} note={…} />                         // :342–347
<FaqList items={faqContent} headingLevel={3} />                                         // :380
<CtaBand title={ctaContent.title} text={ctaContent.text} />                             // :400
<DevicePair browser={{ title, evidence, children: <SceneContent scene={…} /> }}         // :323–336
  phone={{ title, evidence, activeTab, children: <SceneContent scene={…} /> }} description={…} />
```
`platformsOf` (Musterseite `:145–149`) wirft bei unbekanntem Slug – mitnehmen oder über das Gruppenmodul lösen.

**FAQ-Schema nur aus demselben Array** (Bestand `:302`): `<JsonLd data={faqSchema(faqs)} />` – mit dem Array, das `FaqList` erhält.

**Hero-Struktur:** Bestand `components/home/Hero.tsx:12–14` (`dark-section home-hero`, `site-container`, `grid … lg:grid-cols-[…]`) als Gerüst; laut UI-SPEC: kein Eyebrow, keine Amberfarbe in der H1, keine Store-Badges, kein `FeatureSnippet`, kein `#produktdemo`, Raster 1:1 ab 1024 px, `.v2-btn-cta` statt `.btn-cta`. Der radiale Amber-Verlauf in `globals.css:521–524` entfällt, das 72-px-Linienraster `:526–536` bleibt.

---

### `app/funktionen/page.tsx` (Übersicht, RSC)

**Analog Metadaten + Breadcrumb-Import:** `app/funktionen/[slug]/page.tsx:4–11`:
```tsx
import { getFunktion, funktionen } from "@/lib/funktionen";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
```
**Breadcrumb-Helfer** (`lib/schema.ts:67–78`) – Namen wie Detailseiten („Start“, „Funktionen“):
```ts
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((i, n) => ({ "@type": "ListItem", position: n + 1, name: i.name, item: site.url + i.path })) };
}
```
ItemList-JSON nach Research Z. 419–423 (16 URLs = `funktionen`, nur Einträge mit eigener URL); als neuer Helfer `itemListSchema()` neben `breadcrumbSchema` in `lib/schema.ts` ist konsistent mit dem Bestand.

**FeatureCard-Raster** (`app/styleguide/page.tsx:292–306`):
```tsx
<ul role="list" className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
  {featureCardContent.map((card) => (
    <li key={card.slug} className="flex">
      <FeatureCard slug={card.slug} name={card.name} icon={card.icon} benefit={card.benefit}
        platforms={card.platforms} href={card.href} visual={<Frame visual={card.scene} width={160} />} />
    </li>
  ))}
</ul>
```
Ohne Szene `visual` weglassen → `HexIcon` (`FeatureCard.tsx:46–47, 61–71`). `data-funktion="<slug>"` am `li` ergänzen (E2E Zwei-Klick).

**Gruppenanker:** `SectionHeader` hat bereits `id` auf der Überschrift und `scroll-margin-top: 100px` (`SectionHeader.tsx:15, 36`; `SectionHeader.module.css` `.title`). Abschnitt als `<section aria-labelledby={anker} data-gruppe={anker}>` (Muster `Block` in `app/styleguide/page.tsx:57–83`).

**Seitenkopf:** `components/ui/PageHero.tsx` ist der Bestand (Alt-`.eyebrow`, `text-4xl…lg:text-6xl`) und wird laut UI-SPEC durch einen v2-Seitenkopf ersetzt (dunkel, Unterkante 3 px Amber, H1 Display-Stufe, Sprungnavigation `<nav aria-label="Funktionsgruppen">`). Vorlage für Typo: `SectionHeader.module.css` `.title`/`.lead` mit `tone="dark"`-Farben (`#f4f4f5`/`#bcbcc6`).

Entfallen: `TrialCta`, Hinweisbox `.notice`, `.feature-grid`/`.feature-link` (Bestand `:28–59`).

---

### `tests/funktionsgruppen.test.ts` (Vitest, Parität)

**Analog:** `tests/product-register.test.ts` (Register-Zugriff) + `tests/styleguide.test.ts` (Sitemap-/Inhaltsprüfungen).

**Imports und Registerzugriff** (`product-register.test.ts:1–8, 55–77`):
```ts
import { describe, it, expect } from "vitest";
import { getProductRegister, productBasis, mobileLocales } from "@/lib/product-register";
…
const register = getProductRegister();
for (const extra of register.liveExtras) { … }
```
**Sitemap als Routenquelle** (`styleguide.test.ts:12, 45–47`):
```ts
import sitemap from "@/app/sitemap";
const list = await sitemap();
expect(list.some((entry) => entry.url.includes("/styleguide"))).toBe(false);
```
→ Jedes `href` des Gruppenmodells muss als Pfad in `sitemap()` vorkommen oder ein Anker `/funktionen#<gruppe>` sein (Fehlertext UI-SPEC Z. 627 „Menü: Ziel {href} ist keine Route der Sitemap – …“). Plus: 16 + 14 Einträge, „Vorhersagen“ fehlt, Reihenfolge der Gruppen, genau ein Satz je `benefit` (Satzende-Zählung), `renderToString` von `/funktionen` für JSON-LD (Muster `styleguide.test.ts:116–141`).

---

### `tests/home.test.ts` (Vitest, Seite + Budgets)

**Analog:** `tests/styleguide.test.ts` und `tests/design-v2-budgets.test.ts`.

**Seitenrendern** (`styleguide.test.ts:5–10, 117–137`):
```ts
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import StyleguidePage, { metadata } from "@/app/styleguide/page";
…
const html = renderToString(createElement(StyleguidePage));
const positions = blocks.map((b) => html.indexOf(`data-block="${b}"`));
expect([...positions].sort((a, b) => a - b)).toEqual(positions);
```
Achtung: `Home` rendert kein Layout → Header nicht im HTML; Abschnittszählung über `<h2` bzw. `data-…`-Marker.

**KeyFacts-Herkunft** (`styleguide.test.ts:89–101`) – 1:1 für `home-content.keyFactsContent`.

**Keine Preisliterale im Quelltext** (`styleguide.test.ts:110–112`):
```ts
const source = fs.readFileSync(path.resolve(import.meta.dirname, "../lib/styleguide-content.ts"), "utf8");
expect(source).not.toMatch(/29,95|9,95|299,50|99,50/);
expect(source).not.toMatch(/\d\s*€/);
```

**Budget-Verstöße sammeln** (`design-v2-budgets.test.ts:10–33`):
```ts
type Check = [field: string, value: string | undefined, max: number];
function violations(checks: Check[]): string[] {
  const out: string[] = [];
  for (const [field, value, max] of checks) {
    if (value === undefined) continue;
    try { assertTextBudget(field, value, max); } catch (error) { out.push((error as Error).message); }
  }
  return out;
}
```

---

### `tests/e2e/home-navigation.pw.cjs` (Playwright)

**Analog:** `tests/e2e/navigation.pw.cjs` (Menübedienung) und `tests/e2e/design-v2.pw.cjs` (Breiten, axe, No-JS, CLS).

**Kopf** (`navigation.pw.cjs:1–2`, `design-v2.pw.cjs:3`):
```js
/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser regression suite. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')
const AxeBuilder = require('@axe-core/playwright').default
```
**Touch vs. Klick und Sticky-Toggle** (`navigation.pw.cjs:4–24`) – `activate()`, `atScroll()`, `toggleVisibleMenu()` wiederverwenden.

**Breitenschleife + axe** (`design-v2.pw.cjs:57–72`):
```js
const widths = testInfo.project.use.hasTouch ? [testInfo.project.use.viewport.width] : WIDTHS
for (const width of widths) {
  if (!testInfo.project.use.hasTouch) await page.setViewportSize({ width, height: 1000 })
  await page.goto('/styleguide')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow, `Seitenscroll bei ${width} px`).toBeLessThanOrEqual(1)
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  …
}
```
**Ohne JavaScript** (`design-v2.pw.cjs:144–160`): `browser.newContext({ javaScriptEnabled: false, viewport: …, reducedMotion: 'reduce' })` + externe Requests abbrechen.

**WebKit-Tab** (`design-v2.pw.cjs:95, 113–117`): `const key = browserName === 'webkit' ? 'Alt+Tab' : 'Tab'`; in WebKit Fokusfähigkeit per `.focus()` prüfen.

**Externe Requests blocken** (`design-v2.pw.cjs:21–24`) – `test.beforeEach` mit `page.route`.

Die Above-the-fold-Viewports (360×640, 390×844, 768×1024, 1024×768, 1440×900) per `page.setViewportSize` im Desktop-Projekt (Pitfall 2), Kriterien aus UI-SPEC Z. 255–263.

---

### Bestandstests anpassen

| Datei | Stelle | Muster |
|---|---|---|
| `tests/seo-brand.test.ts:7–11` | `expect(metadata.title).toBe("CraftOS – Handwerkersoftware für Büro & Baustelle")` | Wert auf „Handwerkersoftware für Büro und Baustelle \| CraftOS“ |
| `tests/pricing-parity.test.ts:101–121` | `files = ["components/home/Hero.tsx", …, "app/page.tsx", …]` | `Hero.tsx` entfernen, falls gelöscht (sonst `read()` wirft); `lib/home-content.ts`, `lib/funktionsgruppen.ts`, `components/layout/HeaderShell.tsx` ergänzen |
| `tests/keyword-map.test.ts:143–153` | Zielwert-Test über `keywordMap` | neuer Fall D-12: `metadata` aus `@/app/page` und `@/app/funktionen/page` importieren (Muster `seo-brand.test.ts:2`), gerenderten Title = `target.title` (für `/` direkt, sonst `+ " \| CraftOS"`), H1 per `renderToString` |
| `tests/design-v2-frames.test.ts:225, 251, 284–285` | `data-evidence="${…evidence}"` mit vollem Pfad | auf Kurzform umstellen (E3) |
| `tests/e2e/navigation.pw.cjs` | Button „Produkt“, Link „Alle Funktionen“ (`:31–34, 51–56, 129–130`) | auf Link „Funktionen“ + Button „Untermenü Funktionen“; Gewerke-/Wissen-Erwartungen (`:57–58, 118`) bleiben |
| `tests/e2e/design-v2.pw.cjs:16, 84` | `BUDGET_ROUTES`, Evidence-Regex | `/funktionen` ergänzen; Regex `^(web\|app):[^\s/]+$` |
| `tests/e2e/function-illustrations.pw.cjs:501–529` | Test „Startseite: Hero und Büro-Handy-Illustration …“ | entfernen (Szenen entfallen auf `/`) |
| `tests/e2e/playwright.config.cjs:7` | `testMatch: ['browser-functional.pw.cjs', 'function-illustrations.pw.cjs', 'navigation.pw.cjs', 'design-v2.pw.cjs']` | `'home-navigation.pw.cjs'` eintragen |
| `app/sitemap.ts:8–17` | `pageUpdated` `""`/`"/funktionen"` = `"2026-10-20"` | auf Rollout-Datum |

---

## Shared Patterns

### Server Components als Standard, Client nur für Menü
**Quelle:** `components/v2/*` (kein `"use client"`), `components/layout/Footer.tsx`; Client-Ausnahmen `Header.tsx:1`, `Analytics.tsx:1`.
**Gilt für:** alle neuen Dateien außer `HeaderShell.tsx` und `ActiveLink.tsx`. `lib/funktionsgruppen.ts`, `lib/funktionen.ts`, `lib/product-register.ts` dürfen nie in eine `"use client"`-Datei importiert werden (Build-Bruch durch `server-only`).

### Budgetprüfung beim Rendern + Vitest
**Quelle:** `components/v2/budgets.ts:28–53`, Anwendung z. B. `SectionHeader.tsx:28–31`, `StepFlow.tsx:28–32`, `FaqList.tsx:21–30`.
```ts
const budget = TEXT_BUDGET.sectionHeader;
if (eyebrow !== undefined) assertTextBudget("sectionHeader.eyebrow", eyebrow, budget.eyebrow);
assertTextBudget("sectionHeader.title", title, budget.title);
assertTextBudget("sectionHeader.lead", lead, budget.lead);
```
**Gilt für:** `FeatureList`, Hero der Startseite, Seitenkopf `/funktionen`, Menügruppen-Kurzbeschreibungen; Inhalte zusätzlich in Vitest (Pitfall 8).

### Produktfakten nur aus Datenmodulen
**Quelle:** `lib/styleguide-content.ts:1–5, 40–56` (`tarife.find`, `site.trialDays`, `mobileLocales.length`, `productBasis.checkedAt`).
**Gilt für:** `home-content.ts`, `funktionsgruppen.ts`, `app/page.tsx`, `app/funktionen/page.tsx`. Preise nie als Literal (`pricing-parity.test.ts:110`-Regex), Testtage nur `${site.trialDays}`.

### Keine Ankündigungen
**Quelle:** `tests/announcements.test.ts:9–11`:
```ts
const CODE_PATTERN =
  /Geplant:|Demnächst|demnächst|In Vorbereitung|Bald verfügbar|Telefon-Agent|MCP-Server|Agent-Aktionen/;
```
**Gilt für:** alle Texte in `app/`, `components/`, `lib/` (Ausnahme nur `lib/product-register.ts`). Zusatzfunktionen ohne Link erscheinen ohne Platzhalter.

### CTA und Tracking
**Quelle:** `lib/tracking.ts:76–82` und `components/v2/CtaBand.tsx:26, 41–44`:
```ts
export function classifyAppLink(href: string, track: string | null): "trial_click" | "login_click" | null {
  if (hostOf(href) !== appHost) return null;
  return track === "login" ? "login_click" : "trial_click";
}
```
```tsx
const buttonLabel = `${site.trialDays} Tage kostenlos testen`;
<a href={site.ctaUrl} className={`v2-btn-cta ${s.primary}`}>
  {buttonLabel}
  <ArrowUpRight size={16} aria-hidden="true" />
</a>
```
**Gilt für:** Hero-CTA, Header-/Drawer-CTA, CtaBand. Jeder Test-CTA zeigt auf `site.ctaUrl` ohne `data-track="login"`; `data-track="trial"` optional. Login nur mit `data-track="login"`.

### Strukturierte Daten
**Quelle:** `components/seo/JsonLd.tsx:2–8` (escapt `<`), `lib/schema.ts:56–78` (`faqSchema`, `breadcrumbSchema`); Organization/SoftwareApplication bleiben im Layout (`app/layout.tsx:123–124`).
**Gilt für:** `app/page.tsx` (FAQPage aus dem sichtbaren Array), `app/funktionen/page.tsx` (BreadcrumbList + ItemList).

### Metadaten
**Quelle:** `lib/metadata.ts:3–33` (`pageMetadata(title, description, path)`), Template `app/layout.tsx:65` (`"%s | CraftOS"`, gilt nicht für `/`).
**Gilt für:** `/` (vollständiger Title mit Marke) und `/funktionen` (Title ohne Marke).

### Fokus, Farben, Bewegung
**Quelle:** `FeatureCard.module.css:13–16` (Fokusring `3px solid #bb7609`, Offset 4 px), `:114` (`@media (hover: hover)`), `Header.module.css:44` (reduced motion für Chevron). Der Bestand `Header.module.css:11, 13, 14` (Amber-Text, 2-px-Ring `#f2af38`) wird gemäß UI-SPEC Z. 187–198 ersetzt.
**Gilt für:** `Header.module.css`, `FeatureList.module.css`, MegaMenu-Styles.

### Überschriften ohne Silbentrennung (H1)
**Quelle:** globale Regel `app/globals.css:446–452` (`h1, h2, h3, h4 { overflow-wrap: anywhere; hyphens: auto; }`).
**Gilt für:** H1 auf `/` und `/funktionen`: lokal `hyphens: manual`, Keyword-`<span>` mit `white-space: nowrap; overflow-wrap: normal` (UI-SPEC Z. 157–158). Die globale Regel nicht ändern (andere Seiten).

---

## No Analog Found

| Datei | Role | Data Flow | Grund |
|---|---|---|---|
| `components/layout/ActiveLink.tsx` | component (Client-Blatt) | event-driven | Es gibt keinen Link-Wrapper mit `aria-current`; nur das `usePathname`-Muster aus `components/Analytics.tsx:4, 15`. Vertrag aus UI-SPEC Z. 454 verwenden. |

Teilweise ohne Vorbild (Planer nutzt Research/UI-SPEC): No-JS-`<noscript><style>` im Header (Research Z. 405–411), ItemList-JSON-LD (Research Z. 419–423), `scrollbar-gutter: stable` am `html` (UI-SPEC Z. 453), Messung „Keyword-Span ≤ Containerbreite“ im E2E.

---

## Metadata

**Analog search scope:** `craftos/app`, `craftos/components/{layout,v2,home,ui,seo}`, `craftos/lib`, `craftos/tests`, `craftos/tests/e2e`, `craftos/scripts`, `craftos/docs/releases`
**Files scanned:** 38
**Pattern extraction date:** 2026-10-21
