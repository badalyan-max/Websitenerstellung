# Phase 9: Gewerke und Wissensinhalte – Pattern Map

**Mapped:** 2026-10-22
**Files analyzed:** 58 Einträge (14 neu bzw. neue Gruppen, 44 geändert; die 64 Bestandsartikel als vier Paketgruppen, die 19 neuen Artikel als zwei Gruppen, die sechs `lib/funktionsdetails/*.ts` als eine Gruppe gezählt)
**Analogs found:** 56 / 58 (ohne direktes Vorbild: Rehype-Schritt für Schrittliste/Tabellenhülle in `lib/content.ts` nur teilweise, Prüfdatei-Test `tests/content-pruefung.test.ts` nur teilweise)

Alle Pfade relativ zu `C:/Projekte/Websitenerstellung/craftos/`. Zeilenangaben beziehen sich auf `main` @ `727cb5b` (Code-Stand nach dem Merge von 08-12). **08-13/08-14 sind noch nicht gemergt** – der Planer prüft die Zeilen nach dem Phase-8-Rollout (D-03) kurz nach, vor allem in `scripts/live-check.mjs`, `app/sitemap.ts`, `tests/keyword-map.test.ts` und `tests/ai-prompts.test.ts`. Muster, die schon in `07-PATTERNS.md` und `08-PATTERNS.md` stehen (Abschnitts-Wrapper, `SURFACE`, CTA mit `data-track="trial"`, Budgetprüfung beim Rendern, `renderToString`-Tests, Kurzform-Belege, E2E-Kopf mit `severeAxe`), werden hier nur referenziert.

**Leitgedanke:** Phase 8 hat für jede Vorlage dieser Phase das Vorbild geliefert.
- Die **Gewerke-Detailseite** ist „`/craft-ai` mit `answer` statt `lead`“: `app/craft-ai/page.tsx` (Kopf G1 ohne Visual, `Abschnitt` mit `aria-labelledby={id}`, `StepFlow` + `figure data-figure="snippet"`, FAQ mit `answerMax={300}` und FAQPage aus demselben Array, `CtaBand`) plus das Karten-Raster aus `components/funktionen/FunktionsDetail.tsx` Z. 113–130.
- Die **Gewerke-Daten** sind „`lib/seiten/craft-ai.ts` für zwölf Einträge“ (Pfad-Konstante, Abschnittsköpfe, Wortregeln im Kopfkommentar, Test in `tests/kernseiten.test.ts`).
- Der **Artikelkopf `ContentKopf`** ist „`FunktionsKopf` hell, ohne CTA, mit Metazeile“ (`components/funktionen/FunktionsKopf.tsx`).
- **`LinkKarten`** ist „`FactList`-Prüfmuster + `FeatureCard`-Kartenoptik mit gestrecktem Link“.
- **`sceneById`** ist „`cardScenes` für Frontmatter-IDs“ (`lib/scenes.ts` Z. 505–514).
- Der **Produktwahrheitstest** ist „`tests/announcements.test.ts` mit L-1-Wortliste“.

---

## Besitz je Datei und Welle (D-27, Parallel-Worktrees)

Paketnamen wie in 09-CONTEXT `<specifics>`; Worktree `C:/Projekte/wt-09<x>`, Branch `phase09-spur-<x>`. **F** = 09-01 Fundament, **F-A1** = „09-01 Aufgabe 1“ (vorgezogener Merge laut 09-UI-SPEC § Design System, Reihenfolge 1), **a**–**h** = Pakete, **I** = 09-09 Integration.

| Datei / Gruppe | W1 | W2 | W3 | W4 | Bemerkung |
|---|---|---|---|---|---|
| `components/v2/budgets.ts` | F-A1 | – | – | – | nur additiv; (a) vor dem Merge ohne neue Felder (lokale Konstanten in `lib/gewerke.ts`) |
| `components/content/ContentKopf.tsx` + `.module.css` (neu, G8) | F-A1 | – | – | – | |
| `components/v2/LinkKarten.tsx` + `.module.css` (neu, G9) | F-A1 | – | – | – | `components/v2/**` sonst nur F und (a), additiv |
| `docs/seo/keyword-map.json`, `docs/seo/KEYWORD-MAP.md`, `tests/keyword-map.test.ts` | F (F-A1: drei H1-Kürzungen) | – | I | – | Inhaltspakete nur Übergabeliste (D-12) |
| `docs/seo/keyword-seeds.json`, `docs/seo/data/kwmap/manifest.json` | F | – | I | – | nicht in D-27 genannt → hier F zugewiesen (Provenienztest, siehe K-4) |
| `components/content/{ArticlePage,ContentIndex,ContentSearch}.tsx`, `app/globals.css` (`.article-prose`) | F | – | – | – | Artikel-CSS = Fundament |
| `lib/content.ts`, `lib/content-types.ts` | F | – | I (`answer`-Pflicht) | – | |
| `lib/scenes.ts` (`sceneById`) | F | – | – | – | (a) darf nur additiv, braucht hier nichts |
| `scripts/lib/seo-audit-core.mjs`, `tests/seo-audit-core.test.ts` | F | – | – | – | |
| `tests/content.test.ts` | F (Map-Bezug) | – | I (Endwerte 30/53, `answer`-Pflicht) | – | |
| `tests/content-produktwahrheit.test.ts` (neu) | F | – | I (Geltungsbereich + `lib/funktion*`) | – | |
| `tests/design-v2-budgets.test.ts`, `tests/funktionskopf.test.ts` bzw. neuer Vorlagentest | F | – | – | – | nicht in D-27 genannt → F |
| `lib/product-register.ts`, `docs/product-pricing-snapshot.json`, `docs/product-source-snapshot.json` | F (D-04) | – | I (nur Release-Delta) | – | |
| `docs/DESIGN-V2.md` § 18 | F | – | – | – | |
| `lib/gewerke.ts`, `lib/trade-snippet-examples.ts`, `app/gewerke/**` | a | a | – | – | |
| `docs/seo/ai-prompts-targets.json`, `tests/ai-prompts.test.ts` | a | a | – | – | siehe K-1 (Reihenfolge mit F) |
| `tests/media-ki-label.test.ts`, Gewerke-Fälle in `tests/e2e/function-illustrations.pw.cjs` | a | a | – | – | |
| `tests/gewerke.test.ts` (neu) | – | a (nach F-A1-Merge) | – | – | |
| `app/sitemap.ts` | a (Z. 16 und Z. 57–60) | a | I (`/blog`, `/hilfe` in `pageUpdated`) | – | |
| `content/blog/*` (12, Ratgeber 1) + `docs/content-pruefung/09-b.md` | – | b | – | – | |
| `content/blog/*` (12, Ratgeber 2) + `09-c.md` | – | c | – | – | |
| `content/hilfe/*` (21, Büro) + `09-d.md` | – | d | – | – | |
| `content/hilfe/*` (19, Baustelle, inkl. Teilabnahme/Arbeitsabschnitte) + `09-e.md` | – | e | – | – | |
| 10 neue `content/hilfe/*.md` + `09-f.md` | – | f | – | – | |
| `lib/funktionsdetails/*.ts`, `lib/funktionen.ts`, `lib/app-content.ts`, `tests/funktionsdetails.test.ts` | – | f | – | – | `lib/funktionen.ts` laut Orchestrator-Entscheidung 3 bei (f) |
| 9 neue Wissensseiten (3 Hilfe, 6 Ratgeber) + `09-g.md` | – | g | – | – | |
| `docs/content-pruefung/09-a.md` (Gewerke-Durchsicht, 09-UI-SPEC § 8 letzte Zeile) | a | a | – | – | |
| `tests/content-pruefung.test.ts` (neu), `tests/e2e/design-v2.pw.cjs` (neue Fälle) | – | – | I | – | |
| `scripts/live-check.mjs`, `docs/releases/PHASE-09-ROLLOUT.md` | – | – | – | h | |

**Regel für Inhaltspakete (b–g):** keine Datei außerhalb der eigenen Spalte; Map-Korrekturen, Querverweis-Wünsche und Testanpassungen landen in der Übergabeliste am Ende der eigenen Prüfdatei `docs/content-pruefung/09-<x>.md`.

---

## File Classification

### Neue Dateien

| Neue Datei | Role | Data Flow | Closest Analog | Match Quality | Besitz |
|---|---|---|---|---|---|
| `components/content/ContentKopf.tsx` + `.module.css` (G8) | component (RSC) | request-response (statisch) | `components/funktionen/FunktionsKopf.tsx:14–128` (Props, Asserts, `#antwort`) + `components/v2/Breadcrumbs.tsx` `tone="light"` | exact (helle Variante) | F-A1 |
| `components/v2/LinkKarten.tsx` + `.module.css` (G9) | component (RSC, auch in Client-Insel) | transform (Liste → Karten) | `components/v2/FactList.tsx:1–46` (Assert-Reihenfolge), `components/v2/FeatureCard.tsx:44–58` + `FeatureCard.module.css:2–13, 111–141` (gestreckter Link, Hover/Fokus) | exact (Kombination) | F-A1 |
| `tests/gewerke.test.ts` | test (Vitest) | batch | `tests/kernseiten.test.ts:1–55` (Modultexte, `abschnittsProbleme`, `renderToString`), `tests/content.test.ts:167–187` (Map-H1) | exact | a |
| `tests/content-produktwahrheit.test.ts` | test (Vitest) | batch (Dateiscan) | `tests/announcements.test.ts:1–57` (`walk`, `findHits`, `EXCEPTIONS`) | exact | F, I |
| `tests/content-pruefung.test.ts` | test (Vitest) | batch (Dateiscan) | `tests/ai-prompts.test.ts:39–47` (`fs.existsSync` je Eintrag) + `tests/funktionsdetails.test.ts:1055–1067` (Datei je Slug) | partial | I |
| Vorlagentest Artikel (`tests/content-vorlage.test.ts`, Name nach Ermessen) | test (Vitest) | batch | `tests/funktionskopf.test.ts:1–26, 42–110, 171 ff.` (`decode`/`text`/`count`, Kopf-Fälle G1) | exact | F |
| `docs/content-pruefung/09-{a,b,c,d,e,f,g}.md` | Doku/Beleg | – | `docs/content-source-audit.md:11–35, 41–60` (Produktstände, Primärquellen-Tabelle, „Artikelgruppe / Implementierungsbelege / Festgehaltene Details“) | exact | je Paket |
| 10 neue Hilfeartikel (f) | content (Markdown) | file-I/O (Build) | `content/hilfe/abnahme-dokumentieren.md` (Frontmatter Z. 1–13), Aufbau 09-UI-SPEC § 2.5 | role-match (Gliederung neu) | f |
| 3 neue Hilfe-Wissensseiten (g) | content | file-I/O | wie oben + Quellenform `content/blog/abschlagsrechnung-schlussrechnung.md:11` | role-match | g |
| 6 neue Ratgeber-Wissensseiten (g) | content | file-I/O | `content/blog/abschlagsrechnung-schlussrechnung.md` (Frontmatter Z. 1–12, `sources` mit `checkedAt`) | role-match | g |
| `docs/releases/PHASE-09-ROLLOUT.md` | Doku | – | `docs/releases/PHASE-07-ROLLOUT.md` (§§ 1–15) bzw. `PHASE-08-ROLLOUT.md`, sobald vorhanden | exact | h |
| Rehype-Schritt (`ol[role=list]`, Tabellenhülle mit H2-Label) in `lib/content.ts` | utility | transform | `lib/content.ts:122–136` (heutiger String-Ersatz für `<table>`) | partial | F |

### Geänderte Dateien

| Geänderte Datei | Role | Data Flow | Analog / Muster | Match Quality | Besitz |
|---|---|---|---|---|---|
| `lib/gewerke.ts` | data-Modul | transform | Bestand Z. 1–185 + `lib/seiten/craft-ai.ts:1–59` (Kopfkommentar, Pfad-/Abschnittskonstanten) | exact | a |
| `app/gewerke/[slug]/page.tsx` | page (RSC, `generateStaticParams`) | request-response | `app/craft-ai/page.tsx:1–107` + `FunktionsDetail.tsx:113–130` | exact | a |
| `app/gewerke/page.tsx` | page (RSC, **synchron**) | request-response | `app/craft-ai/page.tsx` (Kopf, Abschnitt) + `LinkKarten` | exact | a |
| `lib/trade-snippet-examples.ts` | data | – | Bestand Z. 1–66 (nur falls Beispieltext und Snippet-Projekt angeglichen werden müssen) | exact | a |
| `app/sitemap.ts` | config | – | Bestand Z. 8–20 (`pageUpdated`), Z. 57–60 (Gewerke fest `2026-09-09`) | exact | a / I |
| `docs/seo/ai-prompts-targets.json`, `tests/ai-prompts.test.ts` | config + test | – | Bestand; Test Z. 60–96 | exact | a |
| `tests/media-ki-label.test.ts` | test | – | Bestand Z. 30–44 (Erwartung `:42`) | exact | a |
| `tests/e2e/function-illustrations.pw.cjs` (Gewerke-Fall ab Z. 341) | test (E2E) | – | unverändert grün halten | exact | a |
| `components/content/ArticlePage.tsx` | component (async RSC) | request-response | Bestand Z. 1–175; Abschnittsmuster `FunktionsDetail.tsx:19–37, 113–133` | exact | F |
| `components/content/ContentIndex.tsx` | component (async RSC) | request-response | Bestand Z. 1–101; Raster `LinkKarten`; Abschnitt `app/craft-ai/page.tsx:37–47` | exact | F |
| `components/content/ContentSearch.tsx` | component (Client-Insel) | event-driven (Filter) | Bestand Z. 1–128 (funktionsgleich), Karten → `LinkKarten` ohne Hooks | exact | F |
| `lib/content.ts` | utility (server-only) | file-I/O + transform | Bestand `parseContent` Z. 31–85 (Validierungsmuster `sources` Z. 49–61) | exact | F |
| `lib/content-types.ts` | model | – | Bestand Z. 1–48 (`ContentSummary`, `categories`) | exact | F |
| `app/globals.css` (`.article-prose` Z. 293 ff.) | style | – | `components/v2/StepFlow.module.css:28–61` (Knoten, Maßlinie) | exact | F |
| `lib/scenes.ts` (`sceneById`) | data | – | `cardScenes` Z. 505–514, `allScenes` Z. 423–456 | exact | F |
| `components/v2/budgets.ts` | utility | – | Bestand Z. 7–52, Erweiterungen je Phase als kommentierte Gruppe | exact | F-A1 |
| `scripts/lib/seo-audit-core.mjs` | utility (rein) | transform | Bestand Z. 241–248 (`istZentral`), Z. 366–367 (Regel), Z. 438 (Phase-9-Ausnahme Prompts) | exact | F |
| `tests/seo-audit-core.test.ts` | test | batch (Fixtures) | Bestand Z. 360–366, Z. 428–455 | exact | F |
| `docs/seo/keyword-map.json`, `KEYWORD-MAP.md`, `keyword-seeds.json`, `data/kwmap/manifest.json` | config | – | Eintrag `/hilfe/regiebericht` (Form mit `target`), `KEYWORD-MAP.md` § 2 „Geplante Seiten“ Z. 208, § 3 Z. 270, § 6 Z. 449 ff. | exact | F / I |
| `tests/keyword-map.test.ts` | test | batch | Bestand Z. 19–34, 79–193 | exact | F / I |
| `tests/content.test.ts` | test | batch | Bestand Z. 13–46 (feste Mengen), Z. 98–188 (Map) | exact | F / I |
| `tests/design-v2-budgets.test.ts` | test | batch | Bestand Z. 197–224 (Budget-Asserts je Phase), Z. 356–440 (Sammeltest mit `checks`/`countViolation`) | exact | F |
| `lib/product-register.ts`, Snapshots | data | – | Bestand `productBasis` Z. 11–22; Test `tests/pricing-parity.test.ts:261–270` | exact | F |
| `lib/funktionsdetails/{angebot,baustelle,planung,team,rechnung,buchhaltung}.ts` | data | – | Sekundärlink `buchhaltung.ts:49`, Kachel-`href` `baustelle.ts:203–209` | exact | f |
| `lib/funktionen.ts` (GAEB-`note` Z. 340, `help`-Felder) | data | – | Bestand | exact | f |
| `lib/app-content.ts` (Kachel Projekt-Chat Z. 232–239, Link-Muster Z. 96) | data | – | Bestand | exact | f |
| `tests/funktionsdetails.test.ts` | test | batch | `ERWARTET` Z. 255–275 ff., Prüfung `hrefs` Z. 918–920, Sitemap Z. 1028–1037, Hilfe-Datei Z. 1055–1067 | exact | f |
| 24 Ratgeber (b, c), 40 Hilfeartikel (d, e) | content | file-I/O | jeweils der Artikel selbst + 09-RESEARCH Korrekturtabellen | exact | b–e |
| `tests/e2e/design-v2.pw.cjs` (`BUDGET_ROUTES` Z. 16, neue Fälle) | test (E2E) | – | Bestand Z. 16, Z. 127–168 | exact | I |
| `scripts/live-check.mjs` | script | request-response | Bestand `check(...)`-Blöcke Z. 57–325 (z. B. Z. 111–117, Z. 252–273) | exact | h |

---

## Pattern Assignments

### `lib/gewerke.ts` (data-Modul, Paket a)

**Analog 1 – Bestand:** Tupel-Definitionen Z. 14–147 und Mapping Z. 148–182. Die Tupelform trägt die neuen Felder (`kopfwort`, `answer`, `teaser`, `ablauf`, `faq`, `artikel`) schlecht; **auf Objektliterale je Gewerk umstellen** (wie `INHALTE` in `lib/funktionsdetails/*.ts`). Entfallen laut 09-UI-SPEC § 1.3: `heroTitle` (Z. 7, 164), `heroIntro` (Z. 8, 165), `hatVorlagen` (Z. 5, 153, 163, 172–174). Die gemeinsamen FAQ Z. 169–180 entfallen als alleinige FAQ; höchstens eine Frage (z. B. „Kann mein Team die Handy-App nutzen?“, Z. 177–178) darf in allen zwölf stehen.

**Analog 2 – Kopf und Konstanten:** `lib/seiten/craft-ai.ts:1–33`:
```ts
/**
 * Inhalte der Seite `/craft-ai` (08-UI-SPEC § 5.3; D-09, D-12). Credits, Credit-Pakete und Stand kommen aus
 * lib/site.ts; keine Preis- oder Credit-Literale. Wortregeln (T-08-32): … Prüfung: tests/kernseiten.test.ts, …
 */
export const CRAFT_AI_PFAD = "/craft-ai" as const;
…
export const craftAiKopf = {
  eyebrow: "Craft AI",
  kopfwort: "Handwerk:",
  lead: "…",
  secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/ki-entwurf-pruefen-uebernehmen" },
} as const;
```
→ in `lib/gewerke.ts`: Kopfkommentar (Quellen = Register/Release, Leitlinie L-1, „keine vorbereiteten Leistungsvorlagen“, Test `tests/gewerke.test.ts`), `GEWERKE_KOPFWORT = "Branchensoftware"`, Abschnittsköpfe als Konstante (`GEWERK_ABSCHNITTE` mit H2/Lead aus 09-UI-SPEC § 1.1: „So läuft ein Auftrag in Ihrem Gewerk“, „Passende Funktionen“, „Häufige Fragen: {name}“, „Weiterlesen“) und `CTA_GEWERK` analog `CTA_DETAIL` (`lib/funktionsdetails/index.ts:95–99`) mit „Testen Sie CraftOS mit Ihrem Auftrag.“.

**Typ laut 09-UI-SPEC § 1.3** (verbindlich): `slug, name, kurz, kopfwort, answer, teaser, ablauf[{title,text,funktion}], exampleTitle, example, funktionen, faq, artikel`. Inhalte je Gewerk aus 09-RESEARCH „Ablauf je Gewerk“ (Z. 269–286), SHK-Beispiel „Projektphasen“ → „Arbeitsabschnitte“ (Bestand Z. 34).

**Budgets vor dem F-A1-Merge:** keine neuen `TEXT_BUDGET`-Felder benutzen; vorhandene Felder genügen für Schritte (`TEXT_BUDGET.step` 28/80), FAQ (`faq.question` 90, `faq.answerCentral` 300) und Antwort (`TEXT_BUDGET.answer` 300). Für `teaser` (100) und Beispiel (40/200) bis zum Merge lokale Konstanten in `lib/gewerke.ts`, danach auf `TEXT_BUDGET.gewerk.*` umstellen.

**Wortregeln:** Muster `lib/funktionsdetails/index.ts:101–102, 165–183` (`VERBOTENE_WOERTER`, „automatisch“ nur mit „auf Wunsch“) – für Gewerke gilt zusätzlich die L-1-Wortliste aus 09-UI-SPEC § 5 (Test im Fundament, Geltungsbereich `lib/gewerke.ts` ab Welle 2). „Bauphase“ nur als Suchbegriff, sonst „Arbeitsabschnitte“.

**Abhängige Leser (bleiben grün, nur `slug`/`name`):** `lib/breadcrumbs.ts:79–83`, `lib/llms.ts:61`, `lib/navigation.ts:42`, `app/sitemap.ts:57–60`, `tests/llms.test.ts:44–45`, `tests/breadcrumbs.test.ts:89–90, 196–200`.

---

### `app/gewerke/[slug]/page.tsx` (page, Paket a)

**Analog:** `app/craft-ai/page.tsx` (ganze Datei) – Kopf G1 ohne Visual, Abschnitt-Wrapper mit H2-`id` = Abschnitts-`id`, Snippet-`figure`, FAQ-Raster.

**Imports** (Vorbild `app/craft-ai/page.tsx:1–26`; bisherige `PageHero`, `TrialCta`, `Faq`, `Link`-Liste aus Z. 7–11, 66–92 entfallen):
```ts
import type { ReactNode } from "react";
import { FeatureSnippet } from "@/components/feature-snippet/FeatureSnippet";
import { FunktionsKopf } from "@/components/funktionen/FunktionsKopf";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/v2/CtaBand";
import { FaqList } from "@/components/v2/FaqList";
import { FeatureCard } from "@/components/v2/FeatureCard";
import { IllustrationLabel } from "@/components/v2/IllustrationLabel";
import { Frame } from "@/components/v2/SceneContent";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { StepFlow } from "@/components/v2/StepFlow";
import { crumbsFor } from "@/lib/breadcrumbs";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { metaFor, zielwerte } from "@/lib/seo-meta";
```

**Abschnitt-Wrapper** (`app/craft-ai/page.tsx:37–47`; Konvention `DESIGN-V2.md` § 17.1: `aria-labelledby={id}` und H2-`id` = Abschnitts-`id`, **nicht** `${id}-titel` wie `FunktionsDetail.tsx:27–37`):
```tsx
const SURFACE = { white: "bg-white", warm: "bg-[#f7f3eb]" } as const;
function Abschnitt({ id, children }: { id: …; children: ReactNode }) {
  return (
    <section data-abschnitt={id} aria-labelledby={id} className={`${SURFACE[surface]} py-12 md:py-16 lg:py-24`}>
      <div className="site-container">{children}</div>
    </section>
  );
}
```
Flächen laut 09-UI-SPEC § 1.1: Kopf dunkel → `ablauf` Weiß → `funktionen` Warm → `faq` Weiß → `weiterlesen` Warm → CTA dunkel.

**Kopf** (`app/craft-ai/page.tsx:53–61`, aber `answer` statt `lead` wie `app/preise/page.tsx:62` bzw. `components/vergleich/AlternativePage.tsx:51`):
```tsx
<FunktionsKopf
  id="gewerk-titel"
  eyebrow="Gewerke"
  h1={z.h1}                     // zielwerte("/gewerke/" + slug).h1, ≤ 60 (pageHead.h1)
  keyword={g.kopfwort}          // muss wörtlich in z.h1 stehen, sonst wirft FunktionsKopf.tsx:72–75
  answer={g.answer}             // rendert <p id="antwort" data-answer> (FunktionsKopf.tsx:122–125)
  secondary={{ label: "So läuft ein Auftrag", href: "#ablauf" }}
  crumbs={crumbsFor("/gewerke/" + slug)}
/>
```
Bindungen aus `FunktionsKopf.tsx`: `pageHead.h1` ≤ 60 (Z. 70) → die H1 von `bauunternehmen` und `allrounder` werden in **F-A1** gekürzt (09-UI-SPEC § 1.3); `answer` 1–2 Sätze (Z. 79–84); `lead` und `answer` nie zusammen (Z. 76–78); `secondary` Pflicht (Z. 94–96). CTA „{trialDays} Tage kostenlos testen“ kommt aus dem Baustein (Z. 135–138).

**Ablauf + Snippet** (`app/craft-ai/page.tsx:63–76` bzw. `FunktionsDetail.tsx:63–74`), erweitert um die Beispielkachel laut 09-UI-SPEC § 1.2:
```tsx
<SectionHeader id="ablauf" title={…} lead={…} />
<StepFlow steps={g.ablauf.map((s) => ({ title: s.title, text: s.text, href: "/funktionen/" + s.funktion }))} tone="light" label={…} />
<figure data-figure="snippet" className="mt-12 max-w-[640px]">
  <FeatureSnippet variant={example.variant} example={example} headingLevel={3} />
  <figcaption className="mt-2"><IllustrationLabel kind="vereinfacht" /></figcaption>
</figure>
```
`StepFlow` prüft `count.steps` 3–6 (`StepFlow.tsx:28`); die engere Regel 4–5 prüft `tests/gewerke.test.ts` bzw. ab F-A1 `TEXT_BUDGET.count.gewerkSteps`. `example` weiter aus `tradeSnippetExamples[slug]` mit dem Fehlerwurf aus Bestand Z. 36–37. `headingLevel={3}` wie Craft AI (Bestand Z. 60–63 übergibt keinen `headingLevel`).

**Funktionen-Raster** (`FunktionsDetail.tsx:113–130` bzw. `app/funktionen/page.tsx:42–58`): Daten je Slug aus `getFunktionsgruppen()` (`DetailEintrag`: `name`, `icon`, `benefit`, `platforms`, `href`) und Karten-Szene aus `cardScenes[slug]` (`lib/scenes.ts:509–514`):
```tsx
<ul role="list" className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
  {details.map((d) => (
    <li key={d.slug} data-funktion={d.slug} className="flex">
      <FeatureCard slug={d.slug} name={d.name} icon={d.icon} benefit={d.benefit} platforms={d.platforms} href={d.href}
        visual={<Frame visual={cardScenes[d.slug]!} width={160} karte />} />
    </li>
  ))}
</ul>
```
`FeatureCard` wirft bei Nicht-Live-Funktion und unbelegter Plattform (`FeatureCard.tsx:30–40`). Fehlende Karten-Szene → Fehlertext nach `lib/funktionsdetails/index.ts:388–391`.

**FAQ** (`app/craft-ai/page.tsx:92–98`):
```tsx
<div className="grid gap-y-0 lg:grid-cols-[5fr_7fr] lg:gap-x-12">
  <SectionHeader id="faq" title={`Häufige Fragen: ${g.name}`} lead={…} />
  <FaqList items={g.faq} headingLevel={3} answerMax={300} />
</div>
<JsonLd data={faqSchema(g.faq)} />
```
**Weiterlesen:** `LinkKarten surface="white"` (2–3) mit Titel = Frontmatter-`title`, Text = `description`, Meta aus `readingMinutes` (`getContentList`, `lib/content.ts:105–121`); die Seite wird dafür `async` (ist sie heute schon, Bestand Z. 28–35). Bis zur Integration nur **bestehende** Artikel verlinken (09-UI-SPEC Reihenfolge 4).

**CTA + WebPage** (`app/craft-ai/page.tsx:100–104`): `<div data-abschnitt="cta"><CtaBand … /></div>` und `webPageSchema({ path, name: z.h1, description: z.description })`.

**Metadaten:** unverändert `generateMetadata` → `metaFor("/gewerke/" + slug)` (Bestand Z. 18–27); `generateStaticParams` Z. 15–17 bleibt. OG-Route `app/gewerke/[slug]/opengraph-image.tsx` (17 Zeilen) bleibt unverändert.

---

### `app/gewerke/page.tsx` (page, Paket a)

**Analog:** Kopf wie oben (`FunktionsKopf` ohne Visual, `answer` aus 09-UI-SPEC § 1b, Kopfwort `GEWERKE_KOPFWORT`, Sekundärlink „Zu den Gewerken“ → `#gewerke`), dann **ein** Abschnitt mit `LinkKarten surface="warm" columns={3}` (12 Karten: `icon={<GewerkIcon slug={g.slug} />}`, Titel `name`, Text `teaser`), dann `CtaBand`. Entfallen: `PageHero` (Z. 15–20), Liste mit `ArrowUpRight` (Z. 23–43), Vorlagen-Hinweis (Z. 36–40), `MediaFigure werkstatt-2026` + Textblock (Z. 46–74, Entscheidung A1/H8), `TrialCta` (Z. 75).

**Harte Bindung:** Die Seite muss **synchron** bleiben (`export default function Page()`), weil `tests/content.test.ts:176` `uebersicht.default()` ohne `await` aufruft und `tests/breadcrumbs.test.ts:196` `createElement(…default)` rendert. `LinkKarten` braucht hier keine Artikeldaten, also kein `async`.

`metadata = metaFor("/gewerke")` bleibt (Z. 11). „zwölf“ im Antwortsatz und in der H2 muss `gewerke.length` entsprechen (Test).

---

### `app/sitemap.ts` (config, Paket a; Integration für `/blog`, `/hilfe`)

**Analog:** Bestand. (a) setzt `pageUpdated["/gewerke"]` (Z. 16) auf das Änderungsdatum und ersetzt den festen Wert `"2026-09-09"` der Gewerke-Detailseiten (Z. 57–60) durch ein Datum aus den Daten (z. B. Konstante `GEWERKE_STAND` in `lib/gewerke.ts`, Muster `lastModified: f.checkedAt` in Z. 53–56). Die Integration ergänzt `"/blog"` und `"/hilfe"` in `pageUpdated` (fallen heute auf `"2026-09-09"`, Z. 48). Artikel kommen automatisch über `getContentList` (Z. 22–25, 72–75).

---

### `docs/seo/ai-prompts-targets.json` + `tests/ai-prompts.test.ts` (Paket a)

**Ziele:** `/gewerke/elektriker` → `/gewerke/elektriker#antwort`, `/gewerke/maler` → `/gewerke/maler#antwort`, `phase` bleibt 9 (D-10). Test Z. 86–87 auf `toMatchObject({ target: "/gewerke/elektriker#antwort", phase: 9 })` umstellen; Z. 49–58 („Sitemap-Pfad oder geplanter Phase-8-Pfad“) bleibt grün, weil `ohneAnker` den Pfad prüft. Zusätzlich laut 09-UI-SPEC § 8: Antworttext enthält `kurz` („Elektro“, „Maler“) – als Vitest-Fall in `tests/ai-prompts.test.ts` oder `tests/gewerke.test.ts` (beides (a)).

**Achtung K-1 und K-2** (Konflikte unten): Z. 90–96 und die Phase-9-Ausnahme im Audit.

---

### `tests/media-ki-label.test.ts` (Paket a)

Z. 42 `expect(fundorte).toContain("app/gewerke/page.tsx: werkstatt-2026")` wird rot, sobald das Bild entfällt (A1). Erwartung ersetzen: `fundorte` enthält `app/gewerke/page.tsx` nicht mehr; Z. 27 (MEDIA.md nennt beide Motive) bleibt, die Datei bleibt in `public/images`. Wenn danach kein Fundort mehr existiert, bleibt `ohne` = `[]` sinnvoll; einen zweiten Fundort (z. B. `team-baustelle-2026`) nur dann als Positivfall nehmen, wenn er im Bestand vorkommt (vor dem Umstellen per Grep prüfen).

---

### `tests/gewerke.test.ts` (neu, Paket a, nach dem F-A1-Merge)

**Analog:** `tests/kernseiten.test.ts:1–55` – Imports, `texte(mod)`-Walker für Wortregeln, `abschnittsProbleme` für H2/Lead; Seitenrender über `renderToString`.
```ts
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { TEXT_BUDGET, charCount, sentenceCount } from "@/components/v2/budgets";
import { zielwerte } from "@/lib/seo-meta";
import { GEWERKE_KOPFWORT, gewerke } from "@/lib/gewerke";
```
**Fälle laut 09-UI-SPEC § 8 Zeile 1** (Fehlertexte wörtlich aus § 5 „Error state“):
- Budgets § 4 je Gewerk (`answer` ≤ 300 und 1–2 Sätze; `teaser` ≤ 100 und genau 1 Satz; Ablauf 4–5, Titel ≤ 28, Text ≤ 80 und 1 Satz; Beispiel ≤ 40/≤ 200, ≤ 2 Sätze; FAQ 3–4, Frage ≤ 90 mit „?“, Antwort ≤ 300).
- `ablauf[].funktion` ∈ `funktionen` („Gewerk {slug}: Schritt ‚{titel}‘ verlinkt {funktion}, das nicht unter funktionen steht – …“); 4–6 Funktionen mit ≥ 1 Phase-7-Slug. Phase-7-Liste als lokale Konstante: die sechs aus `tests/funktionsdetails.test.ts:1040` plus `kundenportal` (D-05).
- höchstens eine gemeinsame FAQ-Frage über alle zwölf (Muster `ersteDoppelung`, `lib/funktionsdetails/index.ts:104–112`).
- `Object.hasOwn(g, "heroTitle" | "heroIntro" | "hatVorlagen")` = false (Muster `tests/content.test.ts:180` und `tests/funktionsdetails.test.ts:1050–1052`).
- H1 === `zielwerte(pfad).h1` und `kopfwort` wörtlich darin; für `/gewerke` `GEWERKE_KOPFWORT`; „zwölf“ ⇔ `gewerke.length === 12`.
- `artikel`-Ziele existieren (Muster `tests/funktionsdetails.test.ts:1055–1067`, Pfad `content/{blog,hilfe}/<slug>.md`).
- Gerenderte Seite: genau eine FAQPage mit denselben Fragen wie sichtbar, `#antwort` vorhanden, keine `img` außer `/icons/gewerke/*.svg` innerhalb `<main>` (Medien-Zeile § 8).

**Nicht in `tests/design-v2-budgets.test.ts` schreiben** (Fundament-Datei); die Gewerke-Budgets leben in diesem Test.

---

### `components/content/ContentKopf.tsx` + `.module.css` (G8, Fundament Aufgabe 1)

**Analog:** `components/funktionen/FunktionsKopf.tsx`.

**Props und Asserts** (Z. 14–42, 70–96): gleiche Reihenfolge – Budget H1 (hier neues `TEXT_BUDGET.artikel.h1` = 100 statt `pageHead.h1`), Eyebrow 24, `lead`/`answer` exklusiv mit wörtlichem Fehlertext „ContentKopf: lead und answer gleichzeitig gesetzt – nur answer verwenden.“ (Vorbild Z. 76–78), `answer` 1–2 Sätze über `sentenceCount` (Z. 79–84). Kein Kopfwort-Span (09-UI-SPEC H5: Silbentrennung statt Span), kein CTA, kein `secondary`.

**Markup** (Z. 100–128, hell statt dunkel):
```tsx
<section className={s.kopf} aria-labelledby={id} data-abschnitt="kopf" data-tone="light">
  <div className={`site-container ${s.crumbs}`}><Breadcrumbs items={crumbs} tone="light" /></div>
  <div className={`site-container ${s.inner}`}>
    <p className={`v2-eyebrow ${s.eyebrow}`}>{eyebrow}</p>
    <h1 id={id} className={s.title}>{h1}</h1>
    {answer !== undefined ? <p id="antwort" data-answer="" className={s.answer}>{answer}</p>
      : lead !== undefined ? <p className={s.lead}>{lead}</p> : null}
    {meta ? <ul aria-label="Angaben zum Artikel" className={s.meta}>{meta.map((m) => <li key={m}>{m}</li>)}</ul> : null}
    {stand ? <p data-stand="" className={s.stand}>{stand}</p> : null}
    {platforms?.length ? <PlatformBadges platforms={platforms} /> : null}
  </div>
</section>
```
`Breadcrumbs` erzeugt die einzige BreadcrumbList (`components/v2/Breadcrumbs.tsx:23–55`); `ArticlePage` ruft heute `crumbsFor(path, a.title)` (Z. 28–31) – so beibehalten. Silbentrennung (`hyphens: auto`, `hyphenate-limit-chars: 10 4 4`, `overflow-wrap: break-word`) nur in `.title`. Abstände/Farben aus 09-UI-SPEC § 2.1.

**Test:** Muster `tests/funktionskopf.test.ts:171 ff.` („FunktionsKopf ohne Visual mit Antwort und Stand“) mit `decode`/`text`/`count` (Z. 18–26).

---

### `components/v2/LinkKarten.tsx` + `.module.css` (G9, Fundament Aufgabe 1)

**Analog 1 – Prüfmuster:** `components/v2/FactList.tsx:1–31`:
```ts
import { TEXT_BUDGET, assertCount, assertTextBudget, sentenceCount } from "./budgets";
export function FactList({ items, note }: FactListProps) {
  assertCount("FactList", items.length, TEXT_BUDGET.count.factList, "Einträge");
  for (const item of items) {
    assertTextBudget("factList.term", item.term, TEXT_BUDGET.factList.term);
    …
```
→ `assertCount("LinkKarten", items.length, TEXT_BUDGET.count.linkKarten, "Einträge")` erzeugt exakt den UI-SPEC-Text „LinkKarten: mindestens 1 Einträge erforderlich – Inhalte in lib/… ergänzen.“ (`budgets.ts:81–93`); Feldprüfungen `assertTextBudget("linkKarte.title", …)` ergeben „Textbudget überschritten: linkKarte.title hat {n} von 100 Zeichen – Satz kürzen.“ (`budgets.ts:60–65`).

**Analog 2 – Karte mit gestrecktem Link:** `components/v2/FeatureCard.tsx:44–58` (`<article>`, Titel als `h3`, ein Link) und `FeatureCard.module.css`:
```css
.card { position: relative; … border: 1px solid #dedee3; border-radius: var(--radius-tile, 16px); }  /* Z. 2–10 */
.card:focus-within { … }                                                                          /* Z. 13 */
.link::after { content: ""; position: absolute; inset: 0; border-radius: inherit; }              /* Z. 122–127 */
@media (hover: hover) { .card:hover { border-color: #99600b; } … }                                 /* Z. 131–141 */
```
Abweichend von `FeatureCard`: Link sitzt **im `h3`** (Titel ist der Link), kein „Mehr zu …“-Text, Rahmen `#E7DCC9`, keine Bühne. Liste `<ul role="list" aria-label={label}>` wie `app/funktionen/page.tsx:42` bzw. `FunktionsDetail.tsx:115`.

**Server- und Client-tauglich:** keine Hooks, kein `"use client"`, kein `server-only`-Import – sonst kann `ContentSearch` (Client-Insel, `"use client"` Z. 1) sie nicht rendern. `ReactNode` für `icon` (GewerkIcon oder Lucide im Icon-Feld).

---

### `components/v2/budgets.ts` (Fundament Aufgabe 1)

**Analog:** Bestand Z. 7–52 – jede Phase ergänzt eine kommentierte Gruppe, Bestand bleibt unverändert (geprüft in `tests/design-v2-budgets.test.ts:184–224`). Additiv laut 09-UI-SPEC: `linkKarte`, `gewerk`, `artikel` sowie `count.linkKarten`, `count.gewerkSteps`, `count.gewerkFunktionen`, `count.gewerkFaq`, `count.gewerkArtikel`, `count.artikelSchritte`, `count.artikelFunktionen`, `count.artikelVerwandt`. Test: neuer Fall „Phase 9 (09-UI-SPEC G8–G10)“ nach Muster Z. 207–224 inkl. „Bestand unverändert“.

---

### `components/content/ArticlePage.tsx` (Fundament)

**Analog:** Bestand + Abschnittsmuster aus `FunktionsDetail.tsx`.

| Bestand | Ersatz laut 09-UI-SPEC § 2 |
|---|---|
| Z. 24–53 heller Kopf mit `eyebrow`, H1 `text-4xl…`, `description`, Metazeile mit „·“ | `ContentKopf` (H1 = `zielwerte(pfad).h1`, Z. 21 bleibt), `answer` oder Übergangs-`lead` = `description`; Metazeile „Stand …“, „Veröffentlicht …“ (nur wenn ≠), „{n} Min. Lesezeit“, Autor |
| Z. 54–59 zweispaltiges Raster mit `section-space` | Weißer Abschnitt, `grid-template-columns: minmax(0, 720px) 280px` ab 1024 |
| Z. 60–83 „Quellen und weiterführende Informationen“ als `ul` | H2 „Quellen“ `id="quellen"`, `<ol aria-label="Quellen">`, „{label}, geprüft am {TT.MM.JJJJ}“ (Datumsformat wie Z. 77) |
| Z. 85–104 `aside` mit Inhaltsverzeichnis (`h2` „In diesem Artikel“) | `nav aria-label="Inhaltsverzeichnis"` sticky ≥ 1024, `<details>` „Inhalt dieses Artikels“ < 1024; Label als `<p>`, nur bei ≥ 3 Einträgen |
| Z. 105–124 „Passende Funktionen“ als Textlinks im `aside` | eigener Abschnitt `id="funktionen"` mit `FeatureCard`-Raster (Muster `FunktionsDetail.tsx:113–130`), 1–3 |
| Z. 128–149 „Der passende nächste Schritt.“ | Abschnitt `id="weiterlesen"`, `LinkKarten columns={2}` (1–4), Label „Ratgeber“/„Hilfe“ wie Z. 139–141 |
| – | FAQ (optional): H2 „Häufige Fragen“ `id="faq"`, `FaqList answerMax={300}` + `JsonLd(faqSchema(a.faq))` |
| – | Szene (optional): `figure` mit `Frame` aus `sceneById[a.scene]` + `IllustrationLabel kind="vereinfacht"` (Muster `FunktionsDetail.tsx:66–73`) |
| – | `CtaBand` mit Sekundärlink „Stundensatz berechnen“ → `/rechner/stundensatz` (Ratgeber) bzw. „Support kontaktieren“ → `/support` (Hilfe) |
| Z. 150–172 JSON-LD `Article`/`TechArticle` | **unverändert** (D-16; kein HowTo) |

Die Komponente bleibt `async` (Z. 11–18, lädt `getContentList`) – `tests/content.test.ts:134` ruft `await ArticlePage(...)`.

---

### `components/content/ContentIndex.tsx` und `ContentSearch.tsx` (Fundament)

**`ContentIndex` – Analog Bestand Z. 8–30:** `pfad` und `zielwerte(pfad).h1` (Z. 17–18) bleiben die H1-Quelle (`tests/content.test.ts:153, 161`). `PageHero` (Z. 21–30) → `ContentKopf` (Übersicht mit `answer` aus 09-UI-SPEC § 5, Kategorie ohne `answer`, mit `stand`); Themen-`nav` (Z. 33–46) → `LinkKarten` mit Kategorie-Icons; Hinweisbox (Z. 60–96) → entfällt zugunsten des `CtaBand`-Sekundärlinks (H9). Die Zählungen „{n} Artikel“/„{n} Anleitungen“ aus `items` (Z. 15).

**`ContentSearch` – Analog Bestand:** Logik Z. 23–35 und Felder Z. 38–82 bleiben funktionsgleich (Labels „Artikel suchen“, „Themenbereich“); Ergebnisliste Z. 87–107 → `LinkKarten` (Titel `h3` statt `h2`, Z. 97); leerer Zustand Z. 108–125 → Karte mit `<h3>`, Texte aus 09-UI-SPEC § 5 (Hilfe mit Link „Support“), Text-Button statt `btn-secondary`. Statuszeile `role="status"` Z. 83–86 bleibt; Text je Art („Artikel“/„Anleitungen“).

---

### `lib/content.ts` und `lib/content-types.ts` (Fundament)

**Validierungsmuster** (`lib/content.ts:49–61`):
```ts
const sources = data.sources;
if (!Array.isArray(sources) || sources.some((s) => !s || typeof s.label !== "string" || … || !datePattern.test(s.checkedAt)))
  throw new Error("Invalid sources in " + slug);
```
→ gleich gebaut für `answer` (optional in Welle 1–2, ≤ 300, 1–2 Sätze via `sentenceCount` aus `components/v2/budgets.ts`), `faq` (Array `{ q, a }`, `q` ≤ 90 mit „?“, `a` ≤ 300, 3–8) und `scene` (`data.scene in sceneById`). Neue Fehlertexte **wörtlich aus 09-UI-SPEC § 5**, z. B. „Artikel {slug}: Szene ‚{id}‘ ist unbekannt – nur IDs aus sceneById verwenden.“ Rückgabeobjekt Z. 65–84 um die drei Felder erweitern; `ContentSummary` (`content-types.ts:7–22`) entsprechend. `lib/content.ts` ist `server-only` (Z. 1) – `sceneById` aus `lib/scenes.ts` darf importiert werden.

**Rehype** (`lib/content.ts:122–148`): Kette `remarkParse → remarkGfm → remarkRehype → rehypeSanitize → rehypeSlug → rehypeStringify` (Z. 123–130). Eigene Funktion für `role="list"` an `ol` der obersten Ebene und die Tabellenhülle mit `aria-label="Tabelle: {vorhergehende H2}"` **nach** `rehypeSanitize` einhängen (sonst entfernt Sanitize `role`/`tabindex`); den heutigen String-Ersatz Z. 131–136 ablösen. Achtung: Die TOC-Regex Z. 137–146 erwartet `<h2 id="…">` ohne weitere Attribute – nicht an Überschriften zusätzliche Attribute setzen oder die Regex mitziehen. Reservierte IDs (`antwort`, `faq`, `quellen`, `funktionen`, `weiterlesen`) per Test gegen `toc`-IDs prüfen.

**Kategorie-Icons:** Ablage neben `categories` (`content-types.ts:28–48`) laut 09-UI-SPEC § 3; `categories` selbst bleibt unverändert (D-18). `content-types.ts` wird von der Client-Insel `ContentSearch` importiert (Z. 5–9) – nur clientneutrale Importe (Lucide ja, `server-only` nein).

---

### `app/globals.css` – `.article-prose` (G10, Fundament)

**Analog:** `components/v2/StepFlow.module.css` (Knoten Z. 49–61, senkrechte Maßlinie Z. 39–48, Abstände Z. 28–37):
```css
.step:not(:last-child)::before { content: ""; position: absolute; top: 48px; bottom: 8px; left: 15px; width: 10px;
  border-block: 2px solid var(--sf-line);
  background: linear-gradient(var(--sf-line), var(--sf-line)) center / 2px 100% no-repeat; }
.node { width: 40px; height: 40px; clip-path: polygon(50% 0, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
  background: var(--sf-node-bg); font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; }
```
→ für `.article-prose > ol > li` mit `counter(schritt)` statt `span.node` (09-UI-SPEC § 2.4: Ausweichzeile `content: counter(schritt);` vor `content: counter(schritt) / "";`). Bestand Z. 293–330 (17/1.8, H2 29, H3 23, `list-style: revert`, Link `#805008`) auf die v2-Skala aus § 2.3 umstellen; die Tabellenregeln ab Z. 326 an die neue Hülle anpassen.

---

### `lib/scenes.ts` – `sceneById` (Fundament, additiv)

**Analog:** `cardScenes` Z. 505–514 (abgeleitete, nicht separat gepflegte Zuordnung) und `allScenes` Z. 423–456 (vollständige Liste, Kommentar mit Herkunft).
```ts
/** Funktions-Slug → Rahmen-Visual … Abgeleitet aus `kopfVisuals` …, nicht separat gepflegt. */
export const cardScenes: Readonly<Partial<Record<string, FrameVisual>>> = Object.fromEntries(
  Object.entries(kopfVisuals).map(([slug, visual]): [string, FrameVisual] => [ … ]),
);
```
→ `sceneById: Readonly<Record<string, FrameScene>>` mit Schlüssel = Exportname ohne „Scene“ (09-RESEARCH Pattern 3). Szenen haben keine String-ID; Test: `Object.values(sceneById)` enthält jedes Element von `allScenes` genau einmal. Für Artikel zusätzlich die Rahmenart (Browser/Phone) – aus `kopfVisuals`/`cardScenes` ablesbar oder als Feld in der Registry.

---

### `scripts/lib/seo-audit-core.mjs` + `tests/seo-audit-core.test.ts` (Fundament)

**Regel heute** (Z. 241–248, 366–367):
```js
const ZENTRAL_EXAKT = new Set(["/", "/preise", "/fakten-ueber-craftos", "/app", "/craft-ai", "/gobd"]);
const ZENTRAL_BAUM = ["/vergleich", "/funktionen"];
export function istZentral(path) { … }
…
if (aktiv.has("antwort") && istZentral(path))
  for (const v of answerFirstViolations(html)) add("antwort", antwortText(v.q, path), v.problem);
```
**Ausweitung:** eigene exportierte Funktion (z. B. `mitAntwortRegel(path)` = `istZentral(path) || path === "/gewerke" || /^\/(gewerke|blog|hilfe)\//.test(path)`, 09-RESEARCH Code Examples), `istZentral` bleibt unverändert (es steuert nur die Antwortregel, aber der Name ist in Tests verankert). Fehlertext unverändert `antwortText` (Z. 282–283). Test Z. 360–365: `/blog/x`, `/hilfe/x`, `/gewerke/maler` bleiben bei `istZentral` = false, neuer `describe` für `mitAntwortRegel` mit Positivliste inkl. `/gewerke` und Negativliste (`/rechner`, `/support`, `/blog/kategorie/x`? – Kategorieseiten haben keine Frage-Überschriften, Entscheidung im Plan festhalten).

**Regelmechanik beachten:** `antwortDanach` (Z. 172–178) nimmt das erste `<p>` vor der nächsten Überschrift; steht eine Liste vor dem Absatz, zählt der Absatz danach. Überschriften ohne „?“ werden nicht geprüft (Z. 184).

**Prompt-Regel:** siehe K-2 (Z. 438).

---

### `docs/seo/keyword-map.json`, `KEYWORD-MAP.md`, `keyword-seeds.json`, `kwmap/manifest.json`, `tests/keyword-map.test.ts` (Fundament, Integration)

**Eintragsform:** wie `/hilfe/regiebericht` (vorhandener Phase-9-Eintrag mit `status: "geplant"`, `phase: 9`, `primary` mit `source.{endpoint,file,fetchedAt}`, `secondary`, `competitors`, `target.{title,h1,description}`). Die 9 Wissensseiten haben bereits vollständige `target` (09-RESEARCH Z. 295) – im Fundament nichts zu ergänzen außer den neuen 10 Einträgen, `secondary` „teilabnahme vob“ an `/hilfe/abnahme-dokumentieren` und den drei H1-Kürzungen (F-A1).

**Bearbeitung nur per Node-Skript mit eingebauter Regelprüfung** (08-04-SUMMARY „Map-Bearbeitung nur per Node-Skriptdatei mit eingebauter Regelprüfung (Längen, Eindeutigkeit, Kopfwort, Kategorie-Präfix, Überclaims) vor dem Schreiben“); Skript im Scratchpad, nicht committen; Ersetzungen mit `split/join` (EXECUTOR-RULES).

**Zielwertregeln** (`tests/keyword-map.test.ts:19–34`): Titel ≤ 60, Description 120–155, alle drei Werte, Hauptkeyword im Titel nur bei `primary`. Neu laut 09-UI-SPEC § 8: H1 neuer Phase-9-Einträge ≤ 70, Gewerke-/`/gewerke`-H1 ≤ 60, Artikel-H1 ≤ 100 – als zusätzlicher `it` nach Muster Z. 176–180.

**`KEYWORD-MAP.md`:** § 2 „Geplante Seiten (12)“ (Z. 208) um die 10 neuen Pfade, § 3 „Lücken“ (Z. 270), § 6 neuer Änderungshinweis „22.10.2026 – Phase 9“ nach Muster Z. 471–479; Integration ergänzt „… veröffentlicht“ nach Muster Z. 556.

**Provenienz neuer Hauptkeywords:** siehe K-4.

---

### `tests/content.test.ts` (Fundament: Map-Bezug; Integration: Endwerte)

**Heute:** Z. 14–17 `toHaveLength(24)` / `toHaveLength(40)`, Z. 43–46 RSS `toHaveLength(24)`. **Fundament** ersetzt das durch 09-RESEARCH Pattern 4 (jede Inhaltsdatei hat einen Map-Eintrag; jeder `bestehend`-Eintrag unter `/blog/*`, `/hilfe/*` ohne `/kategorie/` hat eine Datei; RSS-Items = Zahl der Ratgeber). Neue Fälle für Frontmatter (`answer`, `faq`, `scene`), Prosa (kein `<img`, kein `ol[start]`, Schritt ≤ 160, 2–10 je Liste, Überschrift ≤ 80, reservierte IDs, FAQ-Frage nicht zugleich Überschrift) mit den Fehlertexten aus 09-UI-SPEC § 5; Fixture-Fälle über `parseContent`/`renderMarkdown` wie Z. 47–59. **Integration** setzt 30/53 als zusätzliche Erwartung und macht `answer` zur Pflicht.

Die Map-Blöcke Z. 116–187 bleiben; sie rendern alle Artikel und Gewerke (`renderToString`) – Laufzeit 60 s je Fall (Z. 138, 165, 187).

---

### `tests/content-produktwahrheit.test.ts` (neu, Fundament; Geltungsbereich erweitert durch Integration)

**Analog:** `tests/announcements.test.ts:7–45`:
```ts
const EXCEPTIONS = new Set(["lib/product-register.ts"]);
function walk(dir: string, extensions: string[]): string[] { … }
function findHits(dirs: string[], extensions: string[], pattern: RegExp) {
  … if (pattern.test(line)) hits.push(`${rel}:${i + 1}: ${line.trim()}`);
```
→ Wortliste L-1 (09-UI-SPEC § 5, Wortgrenzen, ohne Groß-/Kleinschreibung) plus Altbegriffe aus 09-RESEARCH (u. a. „Neue Phase“, „Asset hinzufügen“, „Ressourcen verwalten“, „Keine Koordinaten“, „Konflikt erkannt“, „Finanzen sichtbar“, „Admin-Lizenz“, „Büro-Lizenz“, „.x84 und .d83“). Trefferform `datei:zeile: text` und Fehlertext „Text {pfad} enthält ‚{wort}‘ – nur Unterstütztes nennen (Leitlinie L-1).“. Ausnahmen **abschließend** (gaeb-formate-Fachteil je Abschnitt, `/gobd`-FAQ, Pflichthinweise) als benannte Konstante mit Begründung wie Z. 17–20.

**Geltungsbereich:** ab Welle 2 `content/blog`, `content/hilfe`, `lib/gewerke.ts`; ab Integration zusätzlich `lib/funktionen.ts`, `lib/funktionsdetails/*.ts`, `lib/app-content.ts`. **Achtung:** `lib/funktionsdetails/angebot.ts` enthält „Onlinezahlung“ in Kommentaren (Z. 28–29, 315). Der Test muss für `.ts`-Dateien nur Zeichenketten prüfen (z. B. über die exportierten Daten wie `texte(mod)` in `tests/kernseiten.test.ts:33–43`) oder Kommentarzeilen ausnehmen – sonst muss (f) Belegkommentare umschreiben.

---

### `lib/funktionsdetails/*.ts`, `lib/funktionen.ts`, `lib/app-content.ts`, `tests/funktionsdetails.test.ts` (Paket f)

**Sekundärlink** (Muster `lib/funktionsdetails/buchhaltung.ts:49`): `secondary: { label: "Anleitung in der Hilfe", href: "/hilfe/<slug>" }` für `kundenportal`, `mahnwesen`, `bankabgleich`, `datenuebernahme` (heute `ALLE`, z. B. `buchhaltung.ts:236, 323, 407`, `planung.ts:267`).

**Kachel-`href`** (Muster `lib/funktionsdetails/baustelle.ts:203–209`):
```ts
{ size: "sm", title: "Mängel", text: "…", visual: { kind: "icon", icon: TriangleAlert }, href: "/funktionen/maengelmanagement" },
```
→ an die vorhandenen Zusatz-Kacheln (09-RESEARCH Z. 249–257): `angebot.ts:96–101` (Angebotsunterschrift), `angebot.ts:~198–204` (Besichtigung, auf `aufmass`), `baustelle.ts:303–309` (Lager-Scan), `planung.ts:~220` (Projekt-Chat, auf `projektverwaltung`), `team.ts:~78` (Sprachen); DATANORM: die Kachel „DATANORM 4 und 5“ steht bereits auf **`angebote`** (`angebot.ts:102–107`) – `href` dort setzen oder neue Kachel auf `gaeb`, Abweichung von D-21 im Plan begründen. Builder-Regel `pruefeKachelLink` (`lib/funktionsdetails/index.ts:187–202`) erlaubt `/hilfe/{slug}`.

**`lib/app-content.ts`:** Link-Muster Z. 96 (`link: { label, href } satisfies TextLink`); Kachel „Projekt-Chat und Nachrichten“ Z. 232–239 zeigt heute auf `/funktionen/projektverwaltung`.

**L-1-Texte (Orchestrator-Entscheidung 3):** GAEB-Grenze `lib/funktionen.ts:340` (`note`) und `lib/funktionsdetails/angebot.ts:394` (Grenze-Kachel) **identisch** positiv umformulieren – `tests/funktionsdetails.test.ts:1046–1047` verlangt `f.notes === [grenze.text]`; FAQ-Antwort `angebot.ts:408` ebenso. Pflichtfrage `kundenportal` positiv (Entscheidung 2): `tests/funktionsdetails.test.ts:298` (`"Können Kunden Rechnungen im Portal online bezahlen?"`) gleichziehen.

**Test:** `ERWARTET` (ab Z. 275) je Slug `sekundaer: { label: HILFE, href: "/hilfe/<slug>" }` und `hrefs: { "<Kacheltitel>": "/hilfe/<slug>" }` (Feld Z. 265, Prüfung Z. 918–920). Grün bleiben müssen „Sekundärlink und Kachel-Links zeigen auf Pfade der Sitemap“ (Z. 1028–1037) und „jeder Hilfe-Link hat einen Artikel in content/hilfe“ (Z. 1055–1067) – beides setzt voraus, dass die zehn neuen Dateien im selben Worktree existieren und K-3 gelöst ist.

---

### Bestandsartikel (b, c, d, e) und neue Artikel (f, g) – Inhalt

**Frontmatter-Vorbild** (`content/hilfe/abnahme-dokumentieren.md:1–13`):
```yaml
---
title: "Eine Abnahme mit Prüfpunkten und Ergebnis dokumentieren"
description: "…"
category: "baudokumentation"
publishedAt: "2026-09-09"
updatedAt: "2026-09-09"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["maengelmanagement", "baudokumentation", "rechnungen"]
relatedArticles: ["/hilfe/mangel-erfassen-bearbeiten", "/hilfe/schlussrechnung-erstellen"]
sources: []
platforms: ["web", "mobile"]
---
```
Quellen-Form (`content/blog/abschlagsrechnung-schlussrechnung.md:11`): `sources: [{"url": "https://…", "label": "§ 14 UStG: Ausstellung von Rechnungen", "checkedAt": "2026-09-09"}]` – nur `https`, `checkedAt` = Abrufdatum. Neu ab Fundament: `answer: "…"` (≤ 300), optional `faq: [{ q, a }]`, optional `scene: "<id>"`. `updatedAt` = Datum der inhaltlichen Änderung, `publishedAt` bleibt (D-14); `title` nur bei sachlichem Fehler ändern (D-12). Kategorien nur aus `lib/content-types.ts:28–48`. `relatedFeatures` müssen in `lib/funktionen.ts` existieren, `relatedArticles` als Datei (`tests/content.test.ts:24–33`).

**Gliederung:** 09-UI-SPEC § 2.5 (H2-Folgen wörtlich), Schrittregeln § 2.4/§ 5 (Sie-Imperativ, eine Handlung je Schritt, ≤ 160, 2–10 je Liste, „Schritt für Schritt in der Web-App“ / „… in der Mobile-App“), Antwort ≤ 300 direkt unter jeder Frage-Überschrift (09-RESEARCH Pattern 2). Inhalte je Artikel: 09-RESEARCH Korrekturtabellen (b Z. 142–157, c Z. 159–174, d Z. 176–200, e Z. 202–226) und Abläufe der neuen Artikel (Z. 228–243).

**Prüfdatei** `docs/content-pruefung/09-<x>.md` – Vorbild `docs/content-source-audit.md`: Abschnitt „Produktstände“ (Z. 11–22: Repo, Commit), Primärquellen-Tabelle `| Quelle | Geprüfter Inhalt | Verwendung |` (Z. 28–35), Belegtabelle `| Artikelgruppe | Implementierungsbelege | Festgehaltene Details |` (Z. 45–60). Für Phase 9 je Artikel eine Zeile: Status (ok/veraltet/falsch), geprüft gegen (`a9319e5`/`6cac366`), Änderungen, Belegpfade (Release), danach **Übergabeliste** (Map-Korrekturen, Querverweise, Testwünsche). Zitatprüfung nach 09-RESEARCH „Prüfskript-Muster“ (Skript im Scratchpad, Ergebnis in der Prüfdatei).

---

### `docs/releases/PHASE-09-ROLLOUT.md` und `scripts/live-check.mjs` (Paket h)

**Rollout-Nachweis:** Gliederung `docs/releases/PHASE-07-ROLLOUT.md` §§ 1–15 (Ausgelieferter Stand, ship-gate, Workflows vor dem Push, Push/Vercel, IndexNow, live-check, SE-Ranking-Abgleich, Analytics, Messbericht, Anforderungsstatus, neue Seiten, Vermerk Phase 10, Inhaberaktionen, Auslegungen); `PHASE-08-ROLLOUT.md` als neueres Vorbild, sobald 08-14 gemergt ist.

**live-check:** neue Blöcke nach Muster `await check("/funktionen/kundenportal ohne „In Prüfung“", …)` (Z. 111–117) und JSON-LD-Zählung (Z. 252–273): Gewerke-Antwort `#antwort` und `data-abschnitt="ablauf"` je Gewerk, je eine neue Hilfe-URL, die neun Wissensseiten, FAQPage = sichtbare Fragen, kein `HowTo`. Map-Abgleich Title/H1/Description nach Z. 146 auf die neuen Pfade erweitern.

**Skripte:** `node scripts/se-ranking-sync.mjs --check` (Z. 3 der Datei), `node scripts/seo-report.mjs --etappe rollout-phase09` (Z. 2), `npm run indexnow` (`package.json:18`).

---

## Konventionen für Tests, Budgets, Keyword-Map und seo-audit

### Tests
- **Vitest** importiert über den Alias `@/…`; `server-only` wird auf `tests/server-only.ts` aufgelöst (Module wie `lib/content.ts` sind testbar). Seiten und Bausteine werden mit `renderToString` geprüft, HTML mit `decode`/`text`/`count`-Helfern (`tests/funktionskopf.test.ts:18–26`, `tests/content.test.ts:106–114`).
- **Fehlertexte wörtlich** aus dem UI-SPEC; Tests prüfen den Text (`toThrow("Textbudget überschritten: …")`, `tests/design-v2-budgets.test.ts:201–203`).
- **Sammelprüfung statt Abbruch beim ersten Fehler:** `checks`/`violations`/`countViolation` (`tests/design-v2-budgets.test.ts:361–439`) bzw. Trefferlisten `datei:zeile` (`tests/announcements.test.ts:32–45`), Erwartung `toEqual([])`.
- **Keine Tests abschwächen** (08-PATTERNS „Kein Abschwächen des Tests“); Übergangsregeln (K-3) ausdrücklich mit Phasenbezug und Rücknahme in der Integration.
- **Läufe (D-28, EXECUTOR-RULES):** gezielte Einzeldateien ohne Sperre (`npx vitest run tests/<datei>.test.ts`), Lint und Typprüfung ohne Sperre; Build, volle Suite, E2E, `npm ci` nur unter `C:/Projekte/Websitenerstellung/.heavy-lock`, eigener Port 3101–3108, Prozess danach beenden. E2E-Gewerke: `npx playwright test tests/e2e/function-illustrations.pw.cjs -g Gewerke`.
- **E2E-Kopf** (Request-Sperre, `severeAxe`, Fold-Messung) aus `tests/e2e/funktionsdetails.pw.cjs:41–160` (07/08-PATTERNS); neue Darstellungsfälle der Integration in `tests/e2e/design-v2.pw.cjs` (Breiten 360/390/768/1024/1280/1440 laut 09-UI-SPEC § 8).

### Budgets
- Eine Quelle: `components/v2/budgets.ts` (`TEXT_BUDGET`, `charCount`, `sentenceCount`, `assertTextBudget`, `assertCount`, `assertOneSentence`). Bausteine werfen beim Rendern; Vitest prüft zusätzlich alle Daten (zweistufig wie in Phase 5–8).
- Neue Felder nur additiv und nur in F-A1; Bestand bleibt (Test „Bestand unverändert“, `tests/design-v2-budgets.test.ts:218–220`).
- Daten-Module prüfen Budgets beim Laden bzw. im Test (Muster Builder `lib/funktionsdetails/index.ts:351–365` für FAQ: Frage endet mit „?“, `faq.question`, `faq.firstSentence`, keine Doppelung).

### Keyword-Map
- Map = einzige Quelle für Title, Description, H1 (`metaFor`/`zielwerte` aus `lib/seo-meta.ts`); Seiten setzen `export const metadata = metaFor(pfad)` bzw. `generateMetadata → metaFor(pfad, { imagePath })` (`app/blog/[slug]/page.tsx:13–28`). Frontmatter-`title` nur für Brotkrumen, Listen, Feed, Schema.
- Schreiben nur F (neue Einträge, Targets, H1-Kürzungen) und I (Status „bestehend“, Korrekturen aus Übergabelisten) per Node-Skript mit Regelprüfung.
- Seiten ohne belegtes Suchvolumen: `primary: null`, `reason` mit Rohdatei, beschreibende Zielwerte (Regel 05-01; Test `tests/keyword-map.test.ts:123–139`).

### seo-audit
- `node scripts/seo-audit.mjs [--only=<regel,…>] [--paths=…]` (Kopf `scripts/seo-audit.mjs:3`, Filter Z. 29) nach `npm run build`, unter Sperre. Pakete: genau einmal am Paketende mit `--paths=<eigene Pfade>`; Integration sitewide 0 Verstöße; `node scripts/route-audit.mjs` 0 Fehler, 0 defekte Links.
- Regeln (Auswahl, `scripts/lib/seo-audit-core.mjs:291–370`): `title` ≤ 60, `description` 120–155, `h1` genau eine, `map` (Title/H1/Description = Map), `breadcrumbs` (eine `nav[aria-label="Brotkrumen"]` + eine BreadcrumbList, gleiche Glieder), `og` (eigenes Segment-Bild, im prerender-manifest), `faq-schema` (Schemafragen sichtbar), `antwort` (ab F auch `/gewerke`, `/blog/*`, `/hilfe/*`), `prompts` (siehe K-2).
- Neue Artikel brauchen keine eigene OG-Datei: `app/{blog,hilfe}/[slug]/opengraph-image.tsx` mit `generateStaticParams` erzeugen sie automatisch.

---

## Hart kodierte Bindungen und Konflikte zwischen Paketen

Diese Stellen werden durch die Paketgrenzen aus D-27 rot, wenn der Planer sie nicht ausdrücklich zuweist und in die richtige Reihenfolge bringt.

| # | Datei:Zeile | Heute | Kollision in Phase 9 | Empfehlung |
|---|---|---|---|---|
| **K-1** | `tests/ai-prompts.test.ts:90–96` | `luecken` (9 Pfade in `ai-prompts-targets.json`) muss **genau** den Map-Einträgen mit `status: "geplant"`, `phase: 9` entsprechen; `soll.length > 0` | Fundament legt 10 weitere `geplant`/Phase-9-Einträge an → Test rot; nach der Integration (alle „bestehend“) scheitert `soll.length > 0`. Datei gehört laut D-27 (a). | (a) stellt Z. 90–96 in seinem **ersten** Commit auf eine feste Liste der 9 Wissensseiten um („`luecken` = diese 9 Pfade, jeder Eintrag Phase 9, Pfad in der Map“); der Orchestrator merged diesen Commit **vor** dem Map-Commit des Fundaments (wie F-A1 vorgezogen). Alternative nur mit dokumentierter D-27-Ausnahme: Fundament ändert genau diesen Block. |
| **K-2** | `scripts/lib/seo-audit-core.mjs:438` (`if (e.phase >= 9) continue;`), Test `tests/seo-audit-core.test.ts:433–434, 447` | Phase-9-Prompt-Ziele werden nur auf Existenz geprüft | D-10 behält `phase: 9`, 09-UI-SPEC § 8 verlangt aber die Ankerprüfung `#antwort` für Elektro/Maler → die Regel prüft sie nie. | Fundament ändert die Ausnahme auf „Phase ≥ 9 **ohne** Anker → nur Existenz; mit Anker → volle Prüfung“ (`if (e.phase >= 9 && !anker) continue;`). Das ist rückwärtskompatibel mit dem heutigen JSON (ohne Anker) und greift automatisch, sobald (a) `#antwort` setzt. Testfixture Z. 433–434 um ein Phase-9-Ziel mit Anker ergänzen. |
| **K-3** | `tests/keyword-map.test.ts:168–173` | `geplant` ⇒ Pfad **nicht** in der Sitemap, sonst ⇒ in der Sitemap | (f) und (g) legen neue, nicht als Entwurf markierte Dateien an → `getContentList` nimmt sie in die Sitemap (`app/sitemap.ts:22–25, 72–75`) → rot in den Worktrees und nach dem Merge auf `main`, bis die Integration den Status setzt. `draft: true` hilft nicht: Entwürfe haben keine Seite, kein Audit, keinen Linkcheck (`lib/content.ts:109, 153`), und `tests/funktionsdetails.test.ts:1028–1037` verlangt Sitemap-Pfade. | Fundament (Besitzer des Tests) erlaubt in seinem Map-Commit für `phase === 9` beides (Kommentar „Übergang bis 09-09“); die Integration stellt die strenge Regel wieder her, wenn alle Einträge „bestehend“ sind. |
| **K-4** | `tests/keyword-map.test.ts:103–121` (Provenienz), `:123–139` (`primary: null`), `:141–152` (Hauptkeyword-Herkunft) | Zahlen nur aus `docs/seo/data/kwmap/export--*.json` mit Manifest-Eintrag; Zeilen mit `keyword`/`volume`/`difficulty` auf gleicher Ebene; `primary: null` verlangt `pageCandidates` + `is_data_found: false` in einer Exportdatei | Die Phase-9-Rohdaten (`docs/seo/data/2026-10-22-keyword-metrics-phase09.json`) sind MCP-Format (`{ keyword, cells: { volume, difficulty, … }, dataFound }`), liegen außerhalb `kwmap/` und haben keinen Manifest-Eintrag → die 5 neuen Hauptkeywords (mahnstufen, camt 053, datenübernahme, datanorm, lager app) und die 5 Einträge ohne Daten fallen durch. | Fundament erweitert `rowsFor` um `cells` und lässt als Provenienz auch Dateien mit eigenem `source`/`fetchedAt`-Kopf zu (oder ergänzt `kwmap/manifest.json`), ergänzt `pageCandidates` in `docs/seo/keyword-seeds.json` für alle 10 neuen Pfade und akzeptiert `dataFound: false` als Beleg für `primary: null`. Kein Abschwächen der Belegpflicht. Rohdaten committet der Orchestrator (Entscheidung 6) – vor dem Map-Commit. |
| **K-5** | `tests/content.test.ts:15–16, 45` | feste Mengen 24/40/24 | (f)/(g) legen Dateien an | wie D-27: Fundament stellt auf Map-Bezug um, Integration setzt 30/53 (09-RESEARCH Pitfall 4). |
| **K-6** | `tests/content.test.ts:176`, `tests/breadcrumbs.test.ts:196` | rufen `app/gewerke/page.tsx` synchron auf | (a) baut die Übersicht um | `/gewerke` bleibt synchron (keine Artikeldaten nötig). |
| **K-7** | `tests/media-ki-label.test.ts:42` | erwartet `werkstatt-2026` auf `/gewerke` | Entscheidung A1/H8: Bild entfällt | (a) passt die Erwartung im selben Commit an. |
| **K-8** | `tests/pricing-parity.test.ts:261–270` („Snapshot ist aktuell: Commit entspricht origin/release“) | Snapshot/Register auf `1e9c8bc` | `origin/release` = `a9319e5` → in jedem Worktree rot | Fundament hebt `productBasis.web` (`lib/product-register.ts:13–17`) und Snapshot nach Faktenabgleich (09-RESEARCH Pitfall 1); Pakete der Welle 2 setzen erst danach auf. |
| **K-9** | `tests/funktionsdetails.test.ts:1046–1047` | GAEB-`note` (`lib/funktionen.ts:340`) = Grenze-Kachel (`angebot.ts:394`) | L-1-Umformulierung | (f) ändert beide Texte identisch in einem Commit. |
| **K-10** | `tests/content-produktwahrheit.test.ts` (neu) vs. Kommentare in `lib/funktionsdetails/angebot.ts:28–29, 315` | – | Wortliste „Onlinezahlung“ trifft Belegkommentare, sobald die Integration den Geltungsbereich erweitert | Fundament baut den Test für `.ts`-Dateien auf Zeichenketten (Exportwerte) statt Zeilen; sonst Kommentar-Ausnahme mit Begründung. |
| **K-11** | `app/sitemap.ts:16, 57–60` (a) und `pageUpdated` für `/blog`, `/hilfe` (I) | – | zwei Besitzer in verschiedenen Wellen | so lassen; (a) fasst nur die Gewerke-Stellen an (09-RESEARCH Z. 589). |

---

## Shared Patterns

### Antwort zuerst (`#antwort`, Frage-Überschrift → Absatz ≤ 300)
**Quelle:** `FunktionsKopf.tsx:122–125` (`<p id="antwort" data-answer>`), `SectionHeader` G2 (`components/v2/SectionHeader.tsx:58`, `data-answer` bei Frage-Titel), `FaqList answerMax={300}` (`FaqList.tsx:14, 35`), Prüfung `answerFirstViolations`/`anchorAnswer` (`seo-audit-core.mjs:172–235`).
**Gilt für:** Gewerke-Kopf und `/gewerke` (`FunktionsKopf answer`), Artikel und Übersichten (`ContentKopf answer`), jede Frage-H2/H3 in der Prosa, alle FAQ dieser Phase.

### FAQPage nur aus dem sichtbaren Array
**Quelle:** `app/craft-ai/page.tsx:95–97`, `FunktionsDetail.tsx:108–110`.
**Gilt für:** Gewerke (`g.faq`), Artikel mit Frontmatter-`faq`. Kein HowTo (D-16); Artikel-Schema `ArticlePage.tsx:150–172` bleibt.

### Eine BreadcrumbList je Seite aus `crumbsFor`
**Quelle:** `components/v2/Breadcrumbs.tsx:23–55`, `lib/breadcrumbs.ts` (Gewerke Z. 79–83, `"/gewerke": ["Gewerke"]` Z. 31). Im Kopf-Baustein (`FunktionsKopf` dunkel, `ContentKopf` hell), nirgends zusätzlich.

### Abschnitt = `SectionHeader` + genau ein Hauptbaustein, Flächenrhythmus Weiß/Warm, CTA als letzter Abschnitt
**Quelle:** `app/craft-ai/page.tsx:37–47, 100–102`; `CtaBand` (`components/v2/CtaBand.tsx:7–30`, Budget Titel 40/Text 80/Button 28, Sekundärlink-Prop). Gewerke-CTA-Texte aus 09-UI-SPEC § 5.

### Vereinfachte Darstellung kennzeichnen
**Quelle:** `figure data-figure="snippet"` + `IllustrationLabel kind="vereinfacht"` (`app/craft-ai/page.tsx:70–75`). Gilt für FeatureSnippet auf Gewerke-Seiten und optionale Szene in Artikeln; keine Bilder, Screenshots, Videos (D-02).

### Produktfakten nur aus Register/Site, Leitlinie L-1
**Quelle:** `lib/site.ts` (`trialDays`, `ctaUrl`, Preise), `lib/product-register.ts` (`productBasis`, `mobileLocales`, `limitations`), Release-Pfade nur lesend. Formulierungsmuster 09-UI-SPEC § 5 „Statt/So“; Begriffe „Voll-Lizenz“, „App-Lizenz“, fünf Rollennamen, „Arbeitsabschnitte“, „Geräte & Fahrzeuge“; Bankabgleich nie „automatisch“. Wortregel-Vorbild `lib/funktionsdetails/index.ts:101–102, 165–183`.

### Server Components ohne neue Client-Insel
Einzige Insel bleibt `ContentSearch` (`"use client"`); Schrittliste als reines CSS; `LinkKarten` hookfrei; animiert nur `FeatureSnippet` auf Gewerke-Seiten.

### Bestehende 07/08-Muster (nur Verweis)
CTA mit `data-track="trial"`, Kurzform-Belege `data-source`, Budgetprüfung im Baustein + Vitest-Sammeltest, E2E-Kopf mit `severeAxe` und Request-Sperre, OG je Segment mit `generateStaticParams` → `07-PATTERNS.md` und `08-PATTERNS.md` „Shared Patterns“.

---

## No Analog Found

| Datei | Role | Data Flow | Grund / Ersatzquelle |
|---|---|---|---|
| Rehype-Schritt `role="list"` + Tabellenhülle mit H2-Label (`lib/content.ts`) | utility | transform | Im Repo gibt es nur den String-Ersatz `lib/content.ts:131–136`; kein eigenes Rehype-Plugin. Vertrag 09-UI-SPEC § 2.3/§ 2.4, Einhängen nach `rehypeSanitize` (Registry Safety: kein neues Paket). |
| `tests/content-pruefung.test.ts` | test | batch | Kein Test prüft bisher Markdown-Prüfdateien; Teilmuster `tests/ai-prompts.test.ts:39–47` (Datei existiert, Einträge stimmen) und `tests/funktionsdetails.test.ts:1055–1067` (je Slug eine Datei). Inhalt: jede Prüfdatei `docs/content-pruefung/09-<x>.md` existiert und nennt jeden Paketartikel (Slug) genau einmal. |

---

## Metadata

**Analog search scope:** `craftos/app/{gewerke,blog,hilfe,craft-ai,funktionen,sitemap.ts}`, `craftos/components/{content,funktionen,v2,ui/GewerkIcon.tsx}`, `craftos/lib/{gewerke,trade-snippet-examples,content,content-types,scenes,funktionen,funktionsgruppen,app-content,product-register,seiten/craft-ai,funktionsdetails/{index,angebot,baustelle,planung,buchhaltung}}.ts`, `craftos/scripts/{seo-audit,live-check,seo-report,se-ranking-sync}.mjs`, `craftos/scripts/lib/seo-audit-core.mjs`, `craftos/tests/{content,keyword-map,ai-prompts,media-ki-label,seo-audit-core,funktionsdetails,design-v2-budgets,announcements,kernseiten,funktionskopf,breadcrumbs,llms,pricing-parity}.test.ts`, `craftos/tests/e2e/{function-illustrations,design-v2}.pw.cjs`, `craftos/docs/{content-source-audit.md,releases/PHASE-07-ROLLOUT.md,seo/KEYWORD-MAP.md,seo/keyword-map.json,seo/ai-prompts-targets.json,seo/data/}`, `craftos/content/{blog,hilfe}/` (Stichproben), `craftos/app/globals.css`
**Files scanned:** 52
**Pattern extraction date:** 2026-10-22
