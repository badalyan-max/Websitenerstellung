# Phase 7: Funktionsdetailseiten und Mobile-App-Seite – Pattern Map

**Mapped:** 2026-10-21
**Files analyzed:** 47 (13 neu, 34 geändert; Inhaltsmodule je Gruppe als 6 Dateien gezählt)
**Analogs found:** 46 / 47 (ohne Analog nur `components/funktionen/PlattformRollen.tsx`, Teilanalog vorhanden)

Alle Pfade relativ zu `C:/Projekte/Websitenerstellung/craftos/`. Zeilenangaben beziehen sich auf den Stand von Commit `6e9cc7b` (Phase-6-Code ist vollständig eingebaut). Muster, die schon in `06-PATTERNS.md` beschrieben sind (HeaderShell, MegaMenu, FeatureList-CSS, DevicePair compact, Budget-Sammeltest), werden hier nur referenziert, nicht wiederholt.

**Leitgedanke:** Phase 6 hat für jede Rolle dieser Phase ein direktes Vorbild geliefert. Die Detailseite ist „Startseite in klein“: `HomeHero` → `FunktionsKopf`, `lib/home-content.ts` → `lib/funktionsdetails/*` bzw. `lib/app-content.ts`, `app/page.tsx` → `FunktionsDetail`/`app/app/page.tsx`, `tests/home.test.ts` → `tests/funktionsdetails.test.ts`/`tests/app-seite.test.ts`, `measureHero` in `home-navigation.pw.cjs` → neue E2E-Datei.

---

## File Classification

### Neue Dateien

| Neue Datei | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `lib/funktionsdetails/types.ts` | model (Typen) | – | `lib/scenes.ts:16–44` (Typen `FrameScene`, `Visual`, `FrameVisual`), `lib/funktionsgruppen.ts:47–86` (Interfaces) | exact |
| `lib/funktionsdetails/{angebot,planung,baustelle,rechnung,buchhaltung,team}.ts` | content-Modul (Daten statt JSX) | transform (Konstanten + Werte aus site/tarife/Register) | `lib/home-content.ts` (ganzer Aufbau), `lib/funktionsgruppen.ts:208–313` (`ZUSATZ`-Tabelle mit Kommentar-Budgets) | exact |
| `lib/funktionsdetails/index.ts` (server-only) | service/builder | transform (Inhalt + Keyword-Map + Register → geprüftes Detailobjekt) | `lib/funktionsgruppen.ts:1, 330–464` (`buildFunktionsgruppen` + `getFunktionsgruppen`) | exact |
| `lib/app-content.ts` | content-Modul | transform | `lib/home-content.ts` | exact |
| `components/funktionen/FunktionsKopf.tsx` | component (RSC) | request-response (statisch) | `components/home/HomeHero.tsx` | exact (parametrisierte Kopie) |
| `components/funktionen/FunktionsKopf.module.css` | style | – | `components/home/HomeHero.module.css` + Unterkante aus `components/funktionen/FunktionenHead.module.css:7` | exact |
| `components/funktionen/FunktionsDetail.tsx` | component (sync RSC, testbar) | request-response | `app/page.tsx:38–174` (Abschnitte, `HomeSection`-Wrapper, FAQ + JSON-LD) und `app/funktionen/page.tsx:51–68` (FeatureCard-Raster) | exact |
| `components/funktionen/PlattformRollen.tsx` | component (RSC) | transform | `components/v2/Badges.tsx` (BadgeGroup/LicenseBadge), `components/v2/BentoGrid.tsx:96–102` (Icon-Feld) | partial |
| `components/funktionen/PlattformRollen.module.css` | style | – | `components/v2/FeatureList.module.css` / `FeatureCard.module.css` (flach, Rahmen, Fokus) | role-match |
| `tests/funktionsdetails.test.ts` | test (Vitest) | batch | `tests/home.test.ts` + `tests/funktionsgruppen.test.ts:1–35` + `tests/funktionen-seite.test.ts` | exact |
| `tests/app-seite.test.ts` | test (Vitest) | batch | `tests/home.test.ts` | exact |
| `tests/e2e/funktionsdetails.pw.cjs` | test (Playwright) | E2E | `tests/e2e/home-navigation.pw.cjs:1–40, 139–166, 226–305` | exact |
| `docs/releases/PHASE-07-ROLLOUT.md` | Doku | – | `docs/releases/PHASE-06-ROLLOUT.md` | exact |

### Geänderte Dateien

| Geänderte Datei | Role | Data Flow | Analog / Muster | Match Quality |
|---|---|---|---|---|
| `app/funktionen/[slug]/page.tsx` | route (dünn) | request-response | Bestand `:12–25` (`generateStaticParams`, `generateMetadata` mit `params: Promise`) | exact |
| `app/app/page.tsx` | page (RSC) | request-response | `app/page.tsx` (Startseite v2) | exact |
| `lib/funktionen.ts` | model | transform | Bestand `Definition :56–71`, Mapping `:673–697` | exact |
| `lib/product-register.ts` | model (server-only) | – | Bestand `evidence :52–129`, `mobileEvidence :130–176`, `liveExtras :184–335`, `limitations :400–408` | exact |
| `lib/funktionsgruppen.ts` | model/builder | transform | Bestand `ZusatzZiel :59–63`, `DETAIL_ZUORDNUNG :164–171`, `REGISTER_IDS :180–195`, `ZUSATZ :209–313` | exact |
| `lib/scenes.ts` | content (statisch) | – | Bestand Szenen `:46–121`, `allScenes :124–131`, `cardScenes :137–143` | exact |
| `components/v2/mini/MiniUi.tsx` + `MiniUi.module.css` | component/style | – | Bestand `MiniStatusName :76–88`, CSS `:63–80` | exact |
| `components/v2/budgets.ts` | utility | – | Bestand `TEXT_BUDGET :7–33` | exact |
| `components/v2/KeyFacts.tsx` (D-13) | component | – | `components/v2/evidence.ts` (Regex + Assert) | exact |
| `components/v2/FeatureList.tsx` (F5 `kind: "seite"`) | component | – | Bestand `:18, 28–30` | exact |
| `lib/home-content.ts`, `lib/styleguide-content.ts` (D-13) | content | – | Bestand `home-content.ts:110–118` | exact |
| `lib/schema.ts` (`webPageSchema`, `mobileApplicationSchema`) | utility | transform | Bestand `softwareApplicationSchema :20–55`, `itemListSchema :80–92` | exact |
| `app/sitemap.ts` | config | – | Bestand `pageUpdated :8–17`, Detail `:48–51` | exact |
| `docs/seo/keyword-map.json`, `docs/seo/KEYWORD-MAP.md` | config/Doku | – | Bestand (Statusfeld, `target`) | exact |
| `content/hilfe/*.md`, `content/blog/*.md` (Frontmatter) | content | – | z. B. `content/hilfe/gaeb-importieren.md:9` | exact |
| `scripts/live-check.mjs` | script | request-response | Bestand `:164–240` | exact |
| `scripts/visual-audit.mjs`, `scripts/performance-audit.mjs` | script | – | Bestand Routenlisten (`:9, 11` bzw. `:8`) | exact |
| `docs/DESIGN-V2.md` § 16 | Doku | – | §§ 12–15 (Kaskadennachweis Phase 5/6) | exact |
| Bestandstests (siehe Tabelle „Bestandstests anpassen“) | test | – | jeweils Bestand | exact |

---

## Pattern Assignments

### `components/funktionen/FunktionsKopf.tsx` (component, RSC) – F1

**Analog:** `components/home/HomeHero.tsx` (63 Zeilen, vollständig gelesen). Gleicher Aufbau, aber Props statt fester Import aus `home-content.ts` (UI-SPEC F1: `HomeHero` bleibt unverändert).

**Imports** (`HomeHero.tsx:1–8`) – ergänzen um `Frame` und `StoreLinks`/`Image` für `/app`:
```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TEXT_BUDGET, assertTextBudget, sentenceCount } from "@/components/v2/budgets";
import { DevicePair } from "@/components/v2/DevicePair";
import { SceneContent } from "@/components/v2/SceneContent";
import { site } from "@/lib/site";
import s from "./HomeHero.module.css";
```

**Budget- und Satzprüfung beim Rendern** (`HomeHero.tsx:16–23`) – Fehlertexte gemäß UI-SPEC Z. 190 (`pageHead.kopfLead`, „FunktionsKopf: Lead hat {n} Sätze …“), zusätzlich Kopfwort-Prüfung `h1.includes(keyword)`:
```tsx
const h1 = hero.h1Keyword + hero.h1Rest;
assertTextBudget("hero.h1", h1, TEXT_BUDGET.hero.h1);
assertTextBudget("hero.lead", hero.lead, TEXT_BUDGET.hero.lead);
const sentences = sentenceCount(hero.lead);
if (sentences !== 1) {
  throw new Error(`Hero: Lead hat ${sentences} Sätze – genau einen Satz schreiben.`);
}
```
→ Für den Kopf: `assertTextBudget("pageHead.h1", h1, TEXT_BUDGET.pageHead.h1)`, `assertTextBudget("pageHead.kopfLead", lead, TEXT_BUDGET.pageHead.kopfLead)`, `assertTextBudget("pageHead.eyebrow", eyebrow, TEXT_BUDGET.pageHead.eyebrow)`. Die H1 wird in drei Teile zerlegt (`vor`, `keyword`, `nach` über `h1.indexOf(keyword)`), damit das Keyword im `<span data-keyword>` steht und der gerenderte Text exakt `target.h1` bleibt (Test `keyword-map.test.ts:200–205` entfernt Tags).

**Markup** (`HomeHero.tsx:25–61`) – Datenattribut `data-funktions-kopf` statt `data-home-hero`, Eyebrow neu davor:
```tsx
<section className={s.hero} aria-labelledby="startseite-titel" data-home-hero="">
  <div className={`site-container ${s.inner}`}>
    <div className={s.copy}>
      <h1 id="startseite-titel" className={s.title}>
        <span className={s.keyword} data-keyword="">{hero.h1Keyword}</span>
        {hero.h1Rest}
      </h1>
      <p className={s.lead}>{hero.lead}</p>
      <div className={s.actions}>
        <a href={site.ctaUrl} className="v2-btn-cta" data-track="trial">
          {hero.ctaLabel}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <Link href={hero.secondary.href} className={s.secondary}>{hero.secondary.label}</Link>
      </div>
    </div>
    <div className={s.product}>
      <DevicePair layout="compact" tone="dark"
        browser={{ title: browser.title, evidence: browser.screen, children: <SceneContent scene={browser} /> }}
        phone={{ title: phone.title, evidence: phone.screen, activeTab: phone.activeTab, children: <SceneContent scene={phone} /> }}
        description={hero.pairDescription} />
    </div>
  </div>
</section>
```
- CTA-Label nur `` `${site.trialDays} Tage kostenlos testen` `` (Muster `CtaBand.tsx:26`), nie Literal.
- Eyebrow: `<p className="v2-eyebrow">` – dunkle Farbe kommt über `[data-tone="dark"] .v2-eyebrow` (`app/globals.css:216–217`); daher `data-tone="dark"` an der `section` setzen.
- Visual-Varianten: `kind: "pair"` → `DevicePair` wie oben; `kind: "browser"` → `<Frame visual={…} tone="dark" />` in `<div className="w-full">` (Muster `app/page.tsx:115–119`, sonst schrumpft der Browser); `kind: "phone"` → `<Frame visual={…} width={240} />` (Muster `app/page.tsx:139`). `Frame` aus `components/v2/SceneContent.tsx:36–64` setzt nur die Kurzform `scene.screen` als Beleg.
- `/app` (`stores`): `StoreLinks` (`components/ui/StoreLinks.tsx`, Server Component) unter dem CTA; QR-Codes aus Bestand `app/app/page.tsx:42–70` übernehmen (`next/image` mit `width`/`height`, Alt-Texte „QR-Code zum App Store“/„… Google Play Store“), Größe 96 statt 116 und `hidden lg:flex` statt `md:flex` (Abweichung B8).

---

### `components/funktionen/FunktionsKopf.module.css` (style)

**Analog:** `components/home/HomeHero.module.css` (121 Zeilen) – nahezu 1:1 übernehmen.

Übernehmen: `.hero` Padding-Stufen (`:4–9`, `:93–95`, `:113–115`), `.inner` Raster (`:21–26`, `:116–120`), `.title` 28 px + `hyphens: manual` (`:32–42`), `.keyword` nowrap (`:43–46`), `.lead` (`:47–55`, `:96–99`), `.actions` (`:58–64`, `:100–107`), `.secondary` 44 px + Unterstrich (`:65–82`), `@media (min-width: 400px)` Display-Stufe (`:87–91`).

**Weglassen:** das 72-px-Linienraster `.hero::before` (`:10–20`) – UI-SPEC Z. 201 („bleibt Startseiten-Motiv“).

**Ergänzen** aus `components/funktionen/FunktionenHead.module.css:7`:
```css
border-bottom: 3px solid #f2af38;
```
Eyebrow → H1 24 px (UI-SPEC Z. 196): eigene Klasse `.eyebrow { margin: 0 0 24px; }`.

---

### `components/funktionen/FunktionsDetail.tsx` (sync Server Component)

**Analog:** `app/page.tsx` (Startseite) – Abschnitts-Wrapper, Bausteinverwendung, FAQ + JSON-LD; plus `app/funktionen/page.tsx:51–68` für das Karten-Raster „Passende Funktionen“.

**Imports** (`app/page.tsx:1–28`, auf benötigte Bausteine reduziert):
```tsx
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { BentoGrid, BentoTile, TileIcon } from "@/components/v2/BentoGrid";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { FeatureCard } from "@/components/v2/FeatureCard";
import { Frame } from "@/components/v2/SceneContent";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow } from "@/components/v2/StepFlow";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
```
`FeatureSnippet` (`@/components/feature-snippet/FeatureSnippet`, Client-Komponente) nur für die 8 Slugs laut D-19 – die Variantenwahl aus Bestand `app/funktionen/[slug]/page.tsx:34–43` (zeiterfassung→zeit, lager→lager, aufmass→aufmass, sonst `f.demo`) als Tabelle im Datenmodul statt verschachteltem Ternary führen; `nachkalkulation→dashboard` entfällt (nicht in der D-19-Liste).

**Abschnitts-Wrapper** (`app/page.tsx:38–64`) – `data-home-section` → `data-abschnitt`, IDs `kopf | ablauf | rollen | kernpunkte | faq | verwandt | cta`:
```tsx
const SURFACE = { white: "bg-white", warm: "bg-[#f7f3eb]", amber: "bg-[#f2af38]" } as const;

function HomeSection({ id, surface, className = "", children }: { … }) {
  return (
    <section data-home-section={id} aria-labelledby={`${id}-titel`}
      className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24 ${className}`}>
      <div className="site-container">{children}</div>
    </section>
  );
}
```
`amber` entfällt (UI-SPEC Z. 150: keine Amber-Fläche auf Detailseiten). CTA-Abschluss wie `app/page.tsx:169–171` in `<div data-…="cta">` wickeln, weil `CtaBand` selbst eine `section` ist.

**Abschnitt 2 Ablauf:** `<SectionHeader id="ablauf-titel" title={…} lead={…} />` + `<StepFlow steps={…} tone="light" label={h2} />` (`app/page.tsx:93–94`, aber `tone="light"`). Bei FeatureSnippet: `<figure data-figure="snippet" className="mt-12 max-w-[640px]">` + `<figcaption><IllustrationLabel kind="vereinfacht" /></figcaption>` (`components/v2/IllustrationLabel.tsx:20–27`).

**Abschnitt 4 Kernpunkte** (`app/page.tsx:99–127`) – Kachel-Mapping übernehmen, Plattform-Badges hier weglassen (stehen in Abschnitt 3):
```tsx
<BentoGrid label="Kernfunktionen">
  {bentoContent.map((tile) => {
    const dark = tile.surface === "dark";
    return (
      <BentoTile key={tile.slug} size={tile.size} surface={tile.surface} title={tile.title} text={tile.text}
        href={tile.href} visualPosition={tile.visualPosition}
        visual={tile.visual.kind === "icon" ? <TileIcon icon={tile.visual.icon} />
          : tile.visual.kind === "browser" ? <div className="w-full"><Frame visual={tile.visual} tone={dark ? "dark" : "light"} /></div>
          : <Frame visual={tile.visual} width={160} tone={dark ? "dark" : "light"} />} />
    );
  })}
</BentoGrid>
```
`data-zusatz="<id>"` für Zusatzfunktions-Kacheln: `BentoTile` hat kein freies Attribut – entweder `BentoTile` um optionales `dataZusatz` erweitern (Muster `data-linked` in `BentoGrid.tsx:74`) oder die Kachel-ID im Test über den Titel prüfen. Im Plan **eine** Variante festlegen.

**Abschnitt 5 FAQ** (`app/page.tsx:161–167`) – dasselbe Array für Liste und Schema:
```tsx
<div className="grid gap-y-0 lg:grid-cols-[5fr_7fr] lg:gap-x-12">
  <SectionHeader id="faq-titel" title={s.faq.title} lead={s.faq.lead} />
  <FaqList items={faqContent} headingLevel={3} />
</div>
<JsonLd data={faqSchema(faqContent)} />
```

**Abschnitt 6 Verwandte** (`app/funktionen/page.tsx:51–68`) – FeatureCard-Raster mit `cardScenes`:
```tsx
<ul role="list" className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
  {group.details.map((d) => {
    const scene = cardScenes[d.slug];
    return (
      <li key={d.slug} data-funktion={d.slug} className="flex">
        <FeatureCard slug={d.slug} name={d.name} icon={d.icon} benefit={d.benefit}
          platforms={d.platforms} href={d.href}
          visual={scene ? <Frame visual={scene} width={160} /> : undefined} />
      </li>
    );
  })}
</ul>
```
**Achtung:** `data-funktion` auf Detailseiten **nicht** setzen – `live-check.mjs:192` und E2E zählen `data-funktion` auf `/funktionen`; auf Detailseiten stört es zwar nicht, aber eine eigene Kennung (`data-verwandt`) vermeidet Verwechslung in Tests.

**JSON-LD** (Bestand `app/funktionen/[slug]/page.tsx:174–181`) – Breadcrumb 3 Ebenen bleibt wörtlich, `faqSchema` aus dem sichtbaren Array, neu `webPageSchema`:
```tsx
<JsonLd data={breadcrumbSchema([
  { name: "Start", path: "/" },
  { name: "Funktionen", path: "/funktionen" },
  { name: f.name, path: "/funktionen/" + slug },
])} />
```

**Sync-Pflicht (Research Pattern 3):** `FunktionsDetail` darf nicht `async` sein; `renderToString` kann keine async-Komponente auflösen. Der Slug kommt als Prop, alle Daten synchron aus `getFunktionsdetail(slug)`. `CtaBand` nutzt `useId` (`CtaBand.tsx:25`) – unkritisch in `renderToString`.

---

### `app/funktionen/[slug]/page.tsx` (route, dünn)

**Analog:** Bestand `:12–33` (Gerüst bleibt), Rest (`:34–184`) entfällt.

**Behalten** (`:12–25`):
```tsx
export function generateStaticParams() {
  return funktionen.map((f) => ({ slug: f.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = getFunktion(slug);
  return f ? pageMetadata(f.seoTitle, f.seoDescription, "/funktionen/" + slug) : {};
}
```
→ `f.seoTitle`/`f.seoDescription` ersetzen durch die Zielwerte aus `lib/keyword-map.ts` (`target.title` **ohne** „ | CraftOS“, weil das Layout-Template es anhängt – Muster `app/funktionen/page.tsx:13–18`, Kommentar dort). `pageMetadata` (`lib/metadata.ts:3–33`) unverändert.

**Seite:** `if (!f) notFound();` (Bestand `:33`) bleibt, danach nur `return <FunktionsDetail slug={slug} />;`.

---

### `lib/funktionsdetails/index.ts` (builder, server-only)

**Analog:** `lib/funktionsgruppen.ts` – server-only, reine Build-Funktion mit Fremddaten testbar, Getter mit Live-Daten.

**Kopf** (`lib/funktionsgruppen.ts:1, 25–33`):
```ts
import "server-only";
import { TEXT_BUDGET, assertCount, assertOneSentence, assertTextBudget, sentenceCount } from "@/components/v2/budgets";
import { funktionen, type Funktion, type ProductPlatform } from "./funktionen";
import { getProductRegister, mobileLocales } from "./product-register";
```
Vitest löst `server-only` per Alias auf `tests/server-only.ts` auf (siehe 06-PATTERNS).

**Rein + Getter** (`lib/funktionsgruppen.ts:354–357, 462–464`):
```ts
export function buildFunktionsgruppen(input: { funktionen: Funktion[]; liveExtras: RegisterEintrag[] }): Funktionsgruppe[] { … }
export function getFunktionsgruppen(): Funktionsgruppe[] {
  return buildFunktionsgruppen({ funktionen, liveExtras: getProductRegister().liveExtras });
}
```
→ `buildFunktionsdetail(input: { slug; inhalt; funktion; ziel; gruppen })` + `getFunktionsdetail(slug)`. Fehlertexte wörtlich aus UI-SPEC Z. 593–594 („Funktionsdetail: {slug} hat kein Inhaltsmodul – Eintrag in lib/funktionsdetails/{gruppe}.ts ergänzen.“, „Funktionsdetail: Rolle ‚{name}‘ ist keine belegte Rolle – …“, „… verwandte Funktion {slug} liegt nicht in derselben oder einer benachbarten Gruppe – Auswahl ändern.“).

**Prüfreihenfolge mit Bestandshelfern** (`lib/funktionsgruppen.ts:340–348, 401–404, 432–436`):
```ts
assertTextBudget("sectionHeader.title", kopf.heading, TEXT_BUDGET.sectionHeader.title);
assertTextBudget("sectionHeader.lead", kopf.lead, TEXT_BUDGET.sectionHeader.lead);
assertOneSentence("SectionHeader", `Gruppe ${id}`, kopf.lead);
…
if (extras.length > 0) assertCount("FeatureList", extras.length, TEXT_BUDGET.count.featureList, "Einträge");
```
→ je Abschnitt `sectionHeader.title/lead` + `assertOneSentence`, `assertCount("StepFlow", n, TEXT_BUDGET.count.detailSteps, "Schritte")`, `assertCount("Verwandte Funktionen", n, TEXT_BUDGET.count.related, "Links")`, FAQ über `TEXT_BUDGET.faq`.

**Nachbargruppen-Regel:** Reihenfolge aus `GRUPPEN_REIHENFOLGE` (`lib/funktionsgruppen.ts:88–95`) importieren; „benachbart“ = Index ±1. Gruppe eines Slugs über `getFunktionsgruppen()` ermitteln, nicht doppelt pflegen.

**Doppelungsprüfung** (`lib/funktionsgruppen.ts:330–338`, `ersteDoppelung`) für Szenen je Seite („eine Szene erscheint je Seite höchstens einmal“, UI-SPEC Z. 371) und FAQ-Fragen wiederverwenden – Funktion exportieren oder lokal kopieren (klein).

**Zielwerte aus der Keyword-Map** (Research Pattern 2) – `lib/keyword-map.ts:34`:
```ts
export const keywordMap = data as KeywordAssignment[];
```
Helfer `zielwerte(path)` wirft, wenn `target.title/h1/description` fehlen. **Nur in Server-Modulen importieren** (JSON 138 KB, Research „Security“).

---

### `lib/funktionsdetails/{gruppe}.ts` und `types.ts` (content-Module)

**Analog:** `lib/home-content.ts` (216 Zeilen) – Kopfkommentar mit Quellen, Imports, `tarif()`-Helfer, `as const`-Objekte, Abschnittstexte als Daten.

**Kopfkommentar + Imports** (`lib/home-content.ts:1–24`):
```ts
/**
 * Inhalte der Startseite `/` (06-UI-SPEC „Seite 1: Startseite“; D-02, D-03, D-11, D-19).
 * Alle Zahlen stammen aus lib/site.ts (site, tarife), dem Produktregister und lib/format.ts;
 * Preise und Testtage werden nie als Literal geschrieben. …
 */
import { FileText, ScanLine } from "lucide-react";
import type { KeyFact } from "@/components/v2/KeyFacts";
import type { Step } from "@/components/v2/StepFlow";
import { euro, germanDate } from "@/lib/format";
import { mobileLocales, productBasis } from "@/lib/product-register";
import { aufmassScene, einsaetzeScene, … } from "@/lib/scenes";
import { site, tarife } from "@/lib/site";
import { comparisonContent, type BentoTileContent } from "@/lib/styleguide-content";
```

**Kachel-Typ** (`lib/home-content.ts:137–189`) – `HomeBentoTile extends BentoTileContent` mit `size`, `surface`, `title`, `text`, `visual: Visual`, `visualPosition?`, `href`. Für Kernpunkte gleiches Schema, `slug` → optional `zusatz?: string`, `href?: string` (GoBD-Link der Grenze-Kachel = `/gobd`, UI-SPEC Z. 276).

**Schritt-Typ:** `Step` aus `components/v2/StepFlow.tsx:7–13` direkt verwenden (`title`, `text`, optional `icon`, `href`).

**FAQ-Typ:** `{ q: string; a: string }[]` wie `lib/home-content.ts:195` (Signatur von `FaqList`/`faqSchema`).

**Werte aus Datenmodulen:** Tarif-Helfer `lib/home-content.ts:31–38` (wirft mit Modulname). `mobileLocales.length` für „{n} Sprachen“ (UI-SPEC Z. 280). Keine `€`-Literale (Test `home.test.ts:135–141`-Muster).

**Satzregel-Falle:** Ordinalzahlen („1. Mahnung“) zählt `sentenceCount` (`budgets.ts:49–51`, Regex `/[.!?](?=\s|$)/`) als Satzende → in Kachel-/Schritt-/Lead-Texten ausschreiben (UI-SPEC Z. 307).

**Typen-Datei:** Interfaces nach Muster `lib/scenes.ts:16–44` und `lib/funktionsgruppen.ts:49–86` (JSDoc-Kommentar mit Budget je Feld, z. B. `/** Genau ein Satz ≤ 100 Zeichen … */`). `RolleName` als String-Union laut UI-SPEC Z. 224–225; `PlattformPanel` laut Z. 226–231.

---

### `lib/app-content.ts` (content, `/app`)

**Analog:** `lib/home-content.ts` – exakt dieselbe Rolle für `/`.

- Abschnitts-IDs und -Texte wie `HOME_SECTION_IDS`/`homeSections` (`:66–107`).
- **KeyFacts** (`:110–118`) – Werte identisch ableiten, Quellen in Kurzform (D-13):
```ts
export const keyFactsContent: { facts: KeyFact[]; note: string } = {
  facts: [
    { value: euro(app.monat), label: "App-Lizenz pro Monat", source: "tarife.app.monat" },
    { value: String(mobileLocales.length), label: "Sprachen in der Mobile-App", source: "product-register: mobileLocales" },
  ],
  note: `Preise netto zzgl. USt. Stand: ${germanDate(productBasis.checkedAt)}.`,
};
```
→ `source` neu `site:tarif-app-monat`, `register:mobileLocales`, `register:mobileOffline` (UI-SPEC Z. 472–480); Note-Text laut UI-SPEC Z. 480.
- **Kacheln:** `BentoTileContent`-Schema wie `bentoContent` (`:142–189`), aber **ohne** `slug`-Pflicht: App-Funktionen ohne Slug (Besichtigung, Urlaub, Kunden) – `FeatureCard` wirft für Nicht-Slugs (`components/v2/FeatureCard.tsx:30–33`), deshalb `BentoTile`.
- **Offline-Schritte und -Lead:** belegte Formulierungen aus Bestand `app/app/page.tsx:161–203` (Grenzen „Karten, Routen, Fotos, KI und neue Downloads benötigen Verbindung“, „Nicht alle Inhalte stehen vollständig offline bereit“) als Quelle der neuen Texte; Link `/hilfe/mobile-offline-synchronisierung` (`:167`).
- **FAQ:** Antwort „Teilweise: …“ wie `lib/home-content.ts:213–215`; Lizenzfrage wie `:197–199` (Werte über `voll`, `app`, `euro()`).

---

### `app/app/page.tsx` (page, RSC – Neuaufbau)

**Analog:** `app/page.tsx` (Startseite) – vollständige Vorlage.

- Metadaten (`app/page.tsx:36`): `export const metadata = pageMetadata(appMetadata.title, appMetadata.description, "/app");` – Title **ohne** Suffix (nicht Root), Werte aus `keyword-map.json` (gleiches Muster wie Detailseiten) oder Literal im Inhaltsmodul + Test (Muster `home.test.ts:39–45`).
- Abschnitte über denselben Wrapper wie oben; `KeyFacts` mit `SectionHeader align="center"` (`app/page.tsx:86–89`).
- StepFlow „Offline vorbereiten“ mit `tone="light"` auf Warm-Fläche.
- FAQ + `JsonLd(faqSchema(...))` (`app/page.tsx:161–167`); zusätzlich `breadcrumbSchema([{Start,/},{Mobile-App,/app}])` und `mobileApplicationSchema()`.
- **Entfällt:** `MobileAppGallery` (`:6, 76`), `FeatureSnippet variant="zeit"` (`:8, 148`), `TrialCta` (`:9, 207`), Altklassen `section-title`, `eyebrow`, `soft-panel`, `rule-list` (Dateien `MobileAppGallery.*` bleiben, Vermerk Phase 10).

---

### `components/funktionen/PlattformRollen.tsx` + `.module.css` (F2, partial)

**Kein direktes Vorbild** für eine Rollenliste. Bausteine zusammensetzen:

- **Badges** (`components/v2/Badges.tsx:23–41, 52–60`): `PlatformBadge` im Panelkopf, `BadgeGroup label="Enthalten in" items={lizenzen.map(l => <LicenseBadge license={l} />)}`.
- **Icon-Feld 48 × 48** (`components/v2/BentoGrid.tsx:96–102`):
```tsx
export function TileIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className={s.icon} aria-hidden="true">
      <Icon size={24} strokeWidth={1.75} />
    </span>
  );
}
```
  → mit `Monitor`/`Smartphone` (gleiche Icons wie `Badges.tsx:9–12`); Farben `primary-100`/`primary-800` laut UI-SPEC Z. 245.
- **Panel-Raster und Fläche:** `article` mit 1 px Rahmen, Radius 16, kein Schatten – CSS-Konventionen aus `FeatureList.module.css`/`FeatureCard.module.css` (Textfarben `#17171c` / `#62626e`, siehe 06-PATTERNS „FeatureList“).
- **Plattform-Prüfung** gegen `funktionen[].platforms` wie `FeatureCard.tsx:34–40` (Fehlertext „Plattform {p} ist für {slug} nicht belegt – platforms aus lib/funktionen.ts übernehmen.“).
- Rollen-Union gegen Freitext absichern: Prüfung im Builder (`lib/funktionsdetails/index.ts`), nicht im JSX.

---

### `lib/funktionen.ts` (+ 6 Slugs, Felder ablösen)

**Bestand** – `Definition` (`:56–71`) und Mapping (`:673–697`):
```ts
export const funktionen: Funktion[] = definitions.map((d) => ({
  slug: d.slug, name: d.name, icon: d.icon, tier: "heute", kurz: d.intro, benefit: d.benefit,
  heroTitle: d.title, heroIntro: d.intro,
  bullets: d.points.map(([titel, text]) => ({ titel, text })),
  faq: [
    { q: "Wie läuft die Nutzung ab?", a: d.steps.join(" ") },
    { q: "Welchen Zugang benötigen Sie?", a: d.access },
  ],
  seoTitle: d.name + " für Handwerksbetriebe",
  seoDescription: d.intro,
  …
  checkedAt: "2026-10-20",
}));
```
- 6 neue Einträge im Schema einer bestehenden Definition (Muster `:73–108`, `dashboard`): `slug`, `name` (≤ 32, Menütext), `benefit` (1 Satz ≤ 100), `icon` (Icons der bisherigen Zusatzeinträge übernehmen: `FileInput`, `BellRing`, `CalendarRange`, `Landmark`, `Import`, `TriangleAlert` aus `lib/funktionsgruppen.ts:209–313`), `platforms` (terminplanung `["web","mobile"]` laut D-20), `access`, `note`, `help`, `related`.
- Synthetische `faq`, `seoTitle`, `seoDescription` (`:683–688`) entfallen oder bleiben ungenutzt (Research „Deprecated“); vor Entfernen Nutzer prüfen: `kurz` speist `lib/llms.ts:48`, `heroIntro`/`notes` speisen `lib/product-register.ts:384, 391`.
- `checkedAt` (`:696`) auf Rollout-Datum – fließt als `lastModified` in `app/sitemap.ts:48–51`.
- `demo` (`:22–28`, `DemoScene`) nur für die 8 FeatureSnippet-Seiten relevant.

---

### `lib/product-register.ts` (Belege umziehen, Offline-Eintrag)

**Research Pattern 4.** Muster:
- `evidence`/`mobileEvidence` sind `Record<slug, string[]>` (`:52–129`, `:130–176`) – Belege der 6 Einträge aus `liveExtras` (`:190–251, 290–301`) unter neuem Slug eintragen; `features` (`:381–397`) liest sie automatisch über `evidence[f.slug]`.
- Einträge aus `liveExtras` löschen; die Funktion `web(...)`/`mobile(...)` (`:178–181`) nur in `liveExtras` nötig.
- Neue Szenenbelege (UI-SPEC-Spalte „Register-Ergänzung“) in dieselben Maps, damit `styleguide.test.ts:74–87` („jeder Rahmenbeleg kommt im Produktregister vor“) grün bleibt.
- `register:mobileOffline` (UI-SPEC Z. 477): neuer belegter Eintrag mit den vier Mobile-Pfaden; die Limitation „Keine vollständige Offline-Zusage“ steht bereits in `:403`.
- `features`-Anzahl wird 22 → `tests/product-register.test.ts:29` anpassen; Release-Belegtest `:107–123` deckt neue Pfade automatisch ab.

---

### `lib/funktionsgruppen.ts` (Zuordnung, `ZusatzZiel.kind`)

- `DETAIL_ZUORDNUNG` (`:164–171`) um die 6 Slugs ergänzen (Gruppen laut Research Z. 343).
- `REGISTER_IDS` (`:180–195`) und `ZUSATZ` (`:209–313`) um die 6 Einträge kürzen – sonst wirft der Builder bei fehlenden Registereinträgen nicht, aber die Paritätsprüfung (`:382–394`) läuft nur über vorhandene `liveExtras`; verbleibende `ZUSATZ`-Keys ohne Registereintrag fallen still heraus → Test `funktionsgruppen.test.ts` muss `Object.keys(ZUSATZ)` gegen beworbene Einträge prüfen.
- `ZusatzZiel` (`:59–63`):
```ts
export interface ZusatzZiel { href: string; kind: "hilfe" | "funktion"; label: string; }
```
→ `kind: "hilfe" | "funktion" | "seite"`; parallel `FeatureListItem.target` (`components/v2/FeatureList.tsx:18`) und `hinweis()` (`:28–30`): `"seite"` wie `"funktion"` → „Beschrieben unter {label}“.
- Ziele der verbleibenden 8 Zusatzfunktionen laut UI-SPEC Z. 486 (alle 8 mit Ziel → 22 + 8 = 30 Einstiegslinks).
- Kommentar zu Grenzfällen (`:153–161`) um die neuen Zuordnungen ergänzen; Gruppen-Texte mit „Bauphasen“ (`:119–120`) bleiben laut B3 unverändert.

---

### `lib/scenes.ts` (neue Szenen, `allScenes`, `cardScenes`)

**Bestand-Szene als Vorlage** (`:99–109`):
```ts
export const rechnungenScene: FrameScene = {
  title: "Rechnungen",
  evidence: "web:src/pages/Rechnungen.tsx",
  screen: "web:Rechnungen",
  description: "Rechnungsliste der Web-App mit drei Rechnungen in den Status Gesendet, Bezahlt und Offen.",
  rows: [
    { primary: "RE-2026-041", secondary: "Bäckerei Krause", status: "Gesendet" },
    …
  ],
};
```
- Phone-Szenen mit `activeTab` (`:65, 78, 91, 116`); Wochenraster wie `plantafelScene.week` (`:51–57`) für `projektplanScene`.
- Neue Konstanten-Namen und Inhalte verbindlich aus UI-SPEC Z. 375–415. `maengelScene` (`:73–84`) bleibt für `/` unverändert; neue `maengelStatusScene`.
- `allScenes` (`:124–131`) und `cardScenes` (`:137–143`) erweitern: `cardScenes` = Kopf-Visual für alle 22 (bei Paar die Browser-Szene).
- `MiniWeek` wirft bei `day + span > 5` (`MiniUi.tsx:110–112`); Zeilen ≤ 24 Zeichen über `MINI_BUDGET` (`components/v2/mini/limits.ts`), ≤ 5 Zeilen (`MiniUi.tsx:24–26`).
- Kurzform muss `SCREEN_EVIDENCE` erfüllen (`components/v2/evidence.ts:6`, `^(web|app):[^\s/]+$`) → „Beleg scannen“ als `app:Belegscan`.

---

### `components/v2/mini/MiniUi.tsx` + `MiniUi.module.css` (F3)

**Bestand** (`MiniUi.tsx:76–88`):
```ts
/**
 * Nur Statusnamen, die im Web-Release existieren
 * (Beleg: web:src/pages/Dokumente.tsx, Dokumentstatus paid/pending/draft/sent/overdue/cancelled).
 */
export type MiniStatusName = "Entwurf" | "Offen" | "Gesendet" | "Bezahlt" | "Überfällig" | "Storniert";
```
→ Union um 16 Namen erweitern, Belegkommentar je Gruppe (UI-SPEC Z. 420–430). Optional ein exportiertes `MINI_STATUS_BELEGE: Record<MiniStatusName, string>` für den Vitest-Belegtest.

**CSS** (`MiniUi.module.css:63–80`) – Tonklassen nach Bestandsmuster `[data-status="…"]`:
```css
.status { … background: #ededf0; color: #393941; }          /* neutral (Standard) */
.status[data-status="Bezahlt"] { background: #ffefcc; color: #784b10; }   /* positiv */
.status[data-status="Überfällig"] { background: #17171c; color: #fff; }   /* hervorgehoben */
```
Besser als 16 Einzelselektoren: `data-tone="positiv|hervorgehoben"` an `MiniStatus` aus einer Ton-Tabelle setzen; Bestandsselektoren dann ersetzen (Tests `design-v2-components.test.ts` auf `data-status` prüfen).

---

### `components/v2/budgets.ts` (F4)

**Bestand** (`:17–19, 23–32`):
```ts
hero: { h1: 60, lead: 110 },
pageHead: { lead: 140 },
…
count: { bento: { min: 3, max: 7 }, steps: { min: 3, max: 6 }, …, featureList: { min: 1, max: 7 }, homeSections: { min: 6, max: 8 } },
```
→ `pageHead: { lead: 140, kopfLead: 110, h1: 60, eyebrow: 24 }`, `count.detailSteps: { min: 3, max: 5 }`, `count.related: { min: 2, max: 3 }` (UI-SPEC Z. 90). `pageHead.lead` bleibt für `FunktionenHead.tsx:23`. Fehlertexte nur über `assertTextBudget`/`assertCount` (`:41–74`).

---

### `components/v2/KeyFacts.tsx` (D-13 Kurzform-Quelle)

**Analog:** `components/v2/evidence.ts` (Regex-Konstante + Assert mit UI-SPEC-Text):
```ts
export const SCREEN_EVIDENCE = /^(web|app):[^\s/]+$/;
export function assertScreenEvidence(owner: string, evidence: string): void {
  if (!evidence.trim()) throw new Error(`${owner}: evidence fehlt – Belegpfad aus origin/release angeben.`);
  if (!SCREEN_EVIDENCE.test(evidence)) throw new Error(`${owner}: evidence muss die Kurzform … haben – …`);
}
```
→ In `KeyFacts.tsx:23–31` nach der Leerprüfung `if (!/^(site|register):[A-Za-z0-9.-]+$/.test(fact.source)) throw new Error("KeyFacts: Quelle ‚{source}‘ ist keine Kurzform site:… oder register:… – Schlüssel angeben.")` (Text UI-SPEC Z. 594). JSDoc-Beispiel in `:9` anpassen. Mitzuziehen: `lib/home-content.ts:112–115`, `lib/styleguide-content.ts` (KeyFacts-Quellen), `tests/home.test.ts:70–75`, `tests/styleguide.test.ts:90–95`, `tests/design-v2-components.test.ts:72–79`.

---

### `lib/schema.ts` (`webPageSchema`, `mobileApplicationSchema`)

**Analog `itemListSchema`** (`:79–92`) für die einfache Form; Codebeispiel `webPageSchema` steht wörtlich in 07-RESEARCH Z. 559–576 (`@id url#webpage`, `about {site.url}/#software`, `publisher {site.url}/#organization`).

**Analog `softwareApplicationSchema`** (`:20–55`) für `MobileApplication`:
```ts
const voll = tarife.find((t) => t.id === "voll")!;
const price = voll.monat.toFixed(2);
return {
  "@context": "https://schema.org", "@type": "SoftwareApplication", "@id": site.url + "/#software",
  …, operatingSystem: "Web, iOS, Android", sameAs: storeUrls,
  offers: { "@type": "Offer", …, priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "EUR",
    valueAddedTaxIncluded: false, referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
    unitText: "pro Person und Monat" }, url: site.url + "/preise" },
};
```
→ `@type: "MobileApplication"`, `@id: site.url + "/app#mobile-app"`, `operatingSystem: "iOS, Android"`, Tarif `app` statt `voll`, `storeUrls` (`:4`) wiederverwenden, **keine** `aggregateRating`/`review`. Globale Knoten bleiben im Layout (`app/layout.tsx:123–124`).

---

### `app/sitemap.ts`

`pageUpdated` (`:8–17`): `"/app"` auf Rollout-Datum. Detailseiten nehmen `f.checkedAt` (`:48–51`) – neue Slugs erscheinen automatisch. **Pitfall 2:** Statuswechsel in `keyword-map.json` (geplant → bestehend) im selben Commit wie die Slugs in `lib/funktionen.ts` (Test `keyword-map.test.ts:145–150`).

---

### `scripts/live-check.mjs`

**Bestand** `:172–185` (Keyword-Map-Prüfung je Route) – Routenliste um `/app` und alle Detail-Slugs aus `detailSlugs()` (`:164–170`) erweitern:
```js
for (const route of ["/", "/funktionen"]) {
  await check(`${route} Title, H1 und Description nach Keyword-Map`, async () => {
    const r = await get(route);
    const t = target(route);
    const ist = headTags(r.text);
    …
  });
}
```
→ `for (const route of ["/", "/funktionen", "/app", ...(await detailSlugs()).map((s) => `/funktionen/${s}`)])`.

**Belegpfad-Prüfung** (`:231–240`) auf Detailseiten und `/app` erweitern und um `data-source="(tarife|product-register)` ergänzen (D-13). JSON-LD-Prüfungen über `jsonLd()`/`findType()` (`:141–162`) für BreadcrumbList/FAQPage/WebPage je Detailseite und `MobileApplication` auf `/app`. `data-funktion`-Zählung (`:192–193`) bleibt 30.

---

### `tests/funktionsdetails.test.ts` (Vitest)

**Analoga:** `tests/home.test.ts` (Inhalte + gerenderte Seite), `tests/funktionsgruppen.test.ts:1–35` (Register-/Sitemap-Zugriff), `tests/funktionen-seite.test.ts:21–48` (HTML-Helfer).

**Imports/Helfer** (`funktionsgruppen.test.ts:5–29`):
```ts
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { TEXT_BUDGET, charCount, sentenceCount } from "@/components/v2/budgets";
import { funktionen, getFunktion } from "@/lib/funktionen";
import { getProductRegister, mobileLocales } from "@/lib/product-register";
async function sitemapPfade(): Promise<Set<string>> {
  return new Set((await sitemap()).map((e) => new URL(e.url).pathname));
}
```
**HTML-Helfer** (`funktionen-seite.test.ts:21–29, 46–48`): `decode`, `text`, `all`, `jsonLd()`.

**Abschnittsfolge + ≤ 1 H2** (`home.test.ts:146, 153–160`):
```ts
const sectionIds = [...html.matchAll(/data-home-section="([^"]+)"/g)].map((m) => m[1]);
expect(sectionIds).toEqual([...home.HOME_SECTION_IDS]);
const starts = sectionIds.map((id) => html.indexOf(`data-home-section="${id}"`));
starts.forEach((start, i) => {
  const chunk = html.slice(start, starts[i + 1] ?? html.length);
  expect((chunk.match(/<h2[\s>]/g) ?? []).length, sectionIds[i]).toBeLessThanOrEqual(1);
});
```
→ mit `data-abschnitt`, erwartete Folge `kopf, ablauf, rollen, kernpunkte, faq, verwandt, cta`; Schleife über alle 22 Slugs mit `renderToString(createElement(FunktionsDetail, { slug }))`.

**FAQ ↔ Schema** (`home.test.ts:162–171`):
```ts
const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const faq = blocks.filter((b) => b["@type"] === "FAQPage");
expect(faq).toHaveLength(1);
expect(faq[0].mainEntity.map((q: { name: string }) => q.name)).toEqual(inhalt.faq.map((f) => f.q));
```
**Kurzform-Belege + Kennzeichnung** (`home.test.ts:173–178`) und **CTA ohne Login-Tracking** (`:180–186`) – wörtlich übertragen; `data-feature-snippet` nur auf den 8 Seiten erwarten.

**Fremddaten-Test des Builders:** wie `buildFunktionsgruppen` (Import `:15` in `funktionsgruppen.test.ts`) – `buildFunktionsdetail` mit manipulierten Inhalten aufrufen und UI-SPEC-Fehlertexte per `toThrow("…")` prüfen (Muster `design-v2-frames.test.ts:246–247, 348–350`).

**Szenenbelege gegen Register** (`styleguide.test.ts:74–87`) – `known`-Set aus `features` + `liveExtras` über alle neuen Szenen; Status-Beleg je `MiniStatusName` per `git show`/`cat-file` nur im `describe.skipIf`-Block (Muster `product-register.test.ts:91–125`).

**Quelltext ohne Preisliterale** (`home.test.ts:135–141`) für jedes `lib/funktionsdetails/*.ts` und `lib/app-content.ts`.

---

### `tests/app-seite.test.ts` (Vitest)

**Analog:** `tests/home.test.ts` vollständig (Inhalte-`describe` + „gerendert“-`describe`). KeyFacts-Herkunft wie `:69–81` mit Kurzform-Schlüsseln; FEAT-03-Abdeckung als Liste gegen Register (`register.liveExtras`/`features`-Namen), Kacheln `href` ⊆ Sitemap (`sitemapPfade()` aus `funktionsgruppen.test.ts:27–29`). JSON-LD: `MobileApplication` ohne `aggregateRating`, kein globales `Organization`/`SoftwareApplication` im Seiten-HTML (`home.test.ts:169–170`).

---

### `tests/e2e/funktionsdetails.pw.cjs` (Playwright)

**Analog:** `tests/e2e/home-navigation.pw.cjs`.

**Kopf, externe Requests, axe** (`:1–3, 20–23, 35–40`):
```js
/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser regression suite. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')
const AxeBuilder = require('@axe-core/playwright').default
test.beforeEach(async ({ page, baseURL }) => {
  const origin = new URL(baseURL).origin
  await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
})
async function severeAxe(page) {
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  return result.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map(…)
}
```
**Above the fold** (`:228–305`, `FOLD_VIEWPORTS`, `measureHero`, Prüfschleife) – Selektor `[data-home-hero]` → `[data-funktions-kopf]`, `pair` → `figure[data-figure]` (Browser, Phone oder Paar), Kriterien aus UI-SPEC Z. 209–214 (360: H1 28 px, H1/Lead/CTA `bottom ≤ 640`; Kopfwort in einem Rechteck `keywordRects === 1`, Breite ≤ H1-Breite; `overflow ≤ 1`). Desktop-Projekt via `setViewportSize`, Touch-Projekt `test.skip` (`:271`).

**CLS + reduced motion** (`:139–166`): `page.emulateMedia({ reducedMotion: 'reduce' })`, `PerformanceObserver` auf `layout-shift`; zusätzlich `document.getAnimations()` leer (UI-SPEC Z. 601).

**Testnamen-Präfix „Detailseite:“** (Research-Testmatrix `-g "Detailseite:"`). **In `tests/e2e/playwright.config.cjs:7` `testMatch` eintragen**, sonst läuft die Datei nicht.

---

## Bestandstests anpassen (Zahlen und Erwartungen)

| Datei:Zeile | Heute | Muster der Änderung |
|---|---|---|
| `tests/funktionsgruppen.test.ts:37–…` (`ERWARTETE_GRUPPEN`), `:222–230`, `:281–289`, `:380` | details/extras je Gruppe, 16 / 14 | neue Gruppenlisten laut Research Z. 343, 22 / 8 |
| `tests/funktionen-seite.test.ts:98–114` | 30 = 16 + 14, `details` 16, 6 Gruppen mit Extras | 30 = 22 + 8; Gruppen mit Extras: angebot, baustelle, team (3) |
| `tests/funktionen-seite.test.ts:116–130` | 7 mit Ziel / 7 ohne | 8 mit Ziel / 0 ohne (UI-SPEC Z. 486) |
| `tests/funktionen-seite.test.ts:132–154` | ItemList 16 | 22 |
| `tests/navigation.test.ts:116–117` | 16 Detailfunktionen | 22 |
| `tests/product-register.test.ts:29` | `features` 16 | 22 |
| `tests/design-v2-budgets.test.ts:145–197` | 16 wörtliche Nutzensätze | 22 |
| `tests/design-v2-frames.test.ts:396–416` | `allScenes` 6, `cardScenes` 5 Slugs | neue Liste laut UI-SPEC Szenenkatalog |
| `tests/keyword-map.test.ts:28–33, 186–209` | `PHASE6_SEITEN` mit statischem `metadata` | Phase-7-Fall: `await generateMetadata({ params: Promise.resolve({ slug }) })`, Rendern über `FunktionsDetail`, H1 === `target.h1` + Kopfwort-Regel `norm(primary.keyword.split(" ")[0])` (Codebeispiel Research Z. 541–557); `/app` passt ins bestehende `PHASE6_SEITEN`-Muster |
| `tests/keyword-map.test.ts:138–151` | geplant ⇒ nicht in Sitemap | Statuswechsel + Slugs im selben Commit |
| `tests/home.test.ts:70–75`, `tests/styleguide.test.ts:90–95`, `tests/design-v2-components.test.ts:72–79` | lange `source`-Schlüssel | Kurzform `site:…`/`register:…` |
| `tests/content.test.ts:24` | `relatedFeatures` ⊆ 16 Slugs | automatisch 22 (aus `funktionen`) |
| `tests/e2e/home-navigation.pw.cjs:12–16, 101–106, 186, 414, 425, 501` | `DETAIL_SLUGS` 16, Einstiegslinks 16 + 7 | 22; 22 + 8 |
| `tests/e2e/design-v2.pw.cjs:16` | `BUDGET_ROUTES` | + eine neue Detailseite (z. B. `/funktionen/mahnwesen`) |
| `tests/e2e/function-illustrations.pw.cjs:4–9` | 8 Detailseiten + `/craft-ai` | unverändert (D-19) |
| `tests/e2e/playwright.config.cjs:7` | `testMatch` | `'funktionsdetails.pw.cjs'` ergänzen |

---

## Shared Patterns

### Server Components, keine neue Client-Insel
**Quelle:** `components/v2/*`, `components/home/HomeHero.tsx`, `components/funktionen/FunktionenHead.tsx` (alle ohne `"use client"`).
**Gilt für:** alle neuen Komponenten. Einzige Client-Anteile: `HeaderShell` (Bestand) und `FeatureSnippet` (8 Seiten, D-19). `lib/funktionsdetails/*`, `lib/product-register.ts`, `lib/keyword-map.ts` nie in Client-Dateien importieren.

### Budgetprüfung beim Rendern + im Builder + in Vitest
**Quelle:** `components/v2/budgets.ts:36–74`; Anwendung `HomeHero.tsx:16–23`, `SectionHeader.tsx:28–31`, `StepFlow.tsx:28–32`, `FaqList.tsx:21–30`, `BentoGrid.tsx:33–43, 62–65`, `lib/funktionsgruppen.ts:340–348`.
**Gilt für:** `FunktionsKopf`, `PlattformRollen`, `lib/funktionsdetails/index.ts`, `lib/app-content.ts`. Keine eigenen Längenprüfungen, `charCount` ist Unicode-sicher.

### Produktfakten nur aus Datenmodulen
**Quelle:** `lib/home-content.ts:31–38` (`tarif()`), `:47, 55, 112–117` (`site.trialDays`, `euro()`, `mobileLocales.length`, `productBasis.checkedAt`); Formatierer `lib/format.ts` (`euro`, `germanDate`).
**Gilt für:** alle Inhaltsmodule. Preis-/Testtage-Literale per Quelltext-Test ausschließen (`home.test.ts:135–141`).

### Keine Ankündigungen, keine Überclaims
**Quelle:** `tests/announcements.test.ts:9–11` (Regex `Geplant:|Demnächst|…`), Register-Limitations `lib/product-register.ts:400–408`.
**Gilt für:** alle Texte. Zusätzlich verboten (UI-SPEC Z. 309): „automatisch“ ohne Bedingung, „lückenlos“, „vollständig offline“, Online-Banking, „Bauphasen“ als UI-Begriff.

### CTA und Tracking
**Quelle:** `components/v2/CtaBand.tsx:26, 41–44`, `HomeHero.tsx:37–40`:
```tsx
<a href={site.ctaUrl} className="v2-btn-cta" data-track="trial">
  {`${site.trialDays} Tage kostenlos testen`}
  <ArrowUpRight size={16} aria-hidden="true" />
</a>
```
**Gilt für:** Kopf und CtaBand aller 23 Seiten. Nie `data-track="login"` am Test-CTA.

### Strukturierte Daten
**Quelle:** `components/seo/JsonLd.tsx` (escapt `<`), `lib/schema.ts:56–92`.
**Gilt für:** Detailseiten (Breadcrumb 3 Ebenen, FAQPage aus demselben Array, WebPage), `/app` (Breadcrumb 2 Ebenen, FAQPage, MobileApplication). Organization/SoftwareApplication bleiben im Layout.

### Metadaten über Template
**Quelle:** `lib/metadata.ts:3–33`, `app/funktionen/page.tsx:13–18` (Kommentar: Title ohne Marke, Template hängt „ | CraftOS“ an).
**Gilt für:** 22 Detailseiten und `/app` (nicht Root).

### Kurzform-Belege im HTML
**Quelle:** `components/v2/evidence.ts:6–18`, `components/v2/SceneContent.tsx:32–35` (nur `scene.screen` ins HTML), `lib/scenes.ts:4–9` (Kommentar).
**Gilt für:** alle Rahmen; analog `data-source` (D-13). Tests: `funktionen-seite.test.ts:160–162`.

### H1 ohne Silbentrennung
**Quelle:** `HomeHero.module.css:32–46, 87–91` (`hyphens: manual`, Keyword-Span `nowrap`, 28 px unter 400 px).
**Gilt für:** `FunktionsKopf` (Abweichung B1: Regel für alle Detailseiten und `/app`).

---

## No Analog Found

| Datei | Role | Data Flow | Grund |
|---|---|---|---|
| `components/funktionen/PlattformRollen.tsx` | component (RSC) | transform | Kein Baustein zeigt Rollenlisten; nur Teilmuster (Badges, Icon-Feld, Plattform-Prüfung aus FeatureCard). Vertrag UI-SPEC Z. 221–269 verwenden. |

Teilweise ohne Vorbild (Planer nutzt Research/UI-SPEC): `webPageSchema` (Codebeispiel Research Z. 559–576), Status-Tonklassen als Tabelle statt Einzelselektoren, Release-Belegtest für Statusnamen in Locale-Dateien (nur `git cat-file`-Muster aus `product-register.test.ts:94–106` vorhanden, kein Inhaltsabgleich), D-14-Gutter-Messung (`innerWidth - clientWidth`, Research Z. 594).

---

## Metadata

**Analog search scope:** `craftos/app` (`page.tsx`, `funktionen/`, `funktionen/[slug]/`, `app/`, `sitemap.ts`), `craftos/components/{home,funktionen,v2,v2/mini,ui,seo}`, `craftos/lib`, `craftos/tests`, `craftos/tests/e2e`, `craftos/scripts/live-check.mjs`
**Files scanned:** 41
**Pattern extraction date:** 2026-10-21
