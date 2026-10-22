# Phase 8: SEO und KI-Sichtbarkeit – Context

**Gathered:** 2026-10-22
**Status:** Ready for planning
**Quelle der Entscheidungen:** Inhaberauftrag 20.10.2026 („wir brauchen einfach noch SEO“, SE Ranking voll ausnutzen), Freigabe 21.10.2026 „ja mach einfach bis du sie alle fertig hast“ (keine Rückfragen; offene Details entscheidet der Orchestrator). Diese Freigabe gilt auch für die früher „zur Freigabe“ erstellten Entwürfe in `craftos/docs/entwuerfe/` (Alternativen-Seiten, Preise answer-first, Titel/Descriptions) – sie dürfen umgesetzt werden, nachdem alle Fakten neu geprüft und datiert sind. Ausgenommen bleibt `datenschutz-webanalyse.md` (Rechtstext, separate Inhaberfreigabe; nicht Teil dieser Phase).

<domain>
## Phase Boundary

- Vier Alternativen-Seiten `/vergleich/plancraft-alternative`, `/vergleich/craftnote-alternative`, `/vergleich/hero-alternative`, `/vergleich/tooltime-alternative` (SEO-03).
- Preisseite `/preise` answer-first mit Preistabelle aus dem Produktregister (SEO-04) und v2-Gestaltung.
- Sitewide: Titel ≤ 60 Zeichen mit Hauptkeyword, Description 120–155 Zeichen, genau eine H1, sichtbare Breadcrumbs mit BreadcrumbList-Schema, individuelle OG-Grafik je Seite, Test gegen doppelte Titel/Descriptions (SEO-05) – für ALLE indexierten Seiten inkl. Gewerke, Hilfe, Blog, Rechner, Rechtliches.
- Antwort-zuerst (≤ 300 Zeichen) unter jeder Frage-Überschrift auf zentralen Seiten; `llms.txt`, Sitemap, IndexNow je Release (SEO-06).
- KI-Sichtbarkeit (SEO-09, kommerzieller Teil): zitierfähige Zielseiten/Abschnitte für die 16 im SE-Ranking-AI-Tracker verfolgten Prompts (u. a. „beste Handwerkersoftware für kleine Betriebe“, „Handwerkersoftware Vergleich“, „Alternative zu Plancraft/HERO/ToolTime“, „günstige Handwerkersoftware mit App“, „Was ist CraftOS?“, „Was kostet eine Handwerkersoftware pro Monat?“).
- Umbau der übrigen kommerziellen Seiten auf v2-Bausteine (DESIGN-02-Fortsetzung): `/preise`, `/vergleich`, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd`.

Nicht in dieser Phase: Gewerke-Seiten-Umbau und Wissens-/Hilfe-/Blog-Inhalte inkl. der KD<20-Wissenslücken (Schlussrechnung, Leistungszeitraum, Regiebericht, Bedenkenanzeige …) → Phase 9 (dort wird SEO-09 abgeschlossen); Backlinks/Portale laufen parallel als Inhaberaufgabe (SEO-08); Abschlussaudit → Phase 10.
</domain>

<decisions>
## Implementation Decisions

### Alternativen-Seiten (SEO-03)
- **D-01:** Grundlage sind die Entwürfe `craftos/docs/entwuerfe/{plancraft,craftnote,hero,tooltime}-alternative.md`; alle Wettbewerberangaben werden neu recherchiert und mit Quelle (URL) und Abrufdatum belegt (offizielle Herstellerseiten, Preisseiten, AGB/Impressum; Portale nur ergänzend). Unbelegte Angaben entfallen.
- **D-02:** Rechtlich zulässige vergleichende Werbung (UWG § 6): nur objektive, nachprüfbare, wesentliche Eigenschaften; keine Herabsetzung, keine Marken-Logos ohne Recht (Wortnennung ist zulässig), Stand-Datum sichtbar, Hinweis „Angaben ohne Gewähr, Stand <Datum>, Quelle“. Faire Darstellung inkl. Stärken des Wettbewerbers.
- **D-03:** Aufbau mit v2-Bausteinen: Kopf (H1 = Keyword „<Name> Alternative“ natürlich), Antwort zuerst (≤ 300 Zeichen), ComparisonTable (belegte Kriterien, Ja/Nein ohne Rot/Grün), „Für wen passt was“, Umstieg (Datenübernahme-Seite verlinken), FAQ (FAQPage), CtaBand; BreadcrumbList; verlinkt von `/vergleich` und Footer.
- **D-04:** Ein Datenmodul je Wettbewerber mit Pflichtfeldern `quelle`, `abgerufenAm`; Test verlangt Quelle+Datum für jede Wettbewerberangabe und ein Stand-Datum ≤ 60 Tage beim Build (Warnung) – kein Build-Abbruch durch Alter, aber sichtbarer Testhinweis.

### Preise (SEO-04)
- **D-05:** `/preise` beginnt mit einem zitierfähigen Antwortsatz (Entwurf `preise-answer-first.md`, Werte aus `site.ts`/Snapshot) und der Preistabelle; v2-Bausteine; FAQ zu Kosten; Paritätstest bleibt maßgeblich.

### Sitewide-Metadaten (SEO-05, SEO-02-Abschluss)
- **D-06:** Titel/Descriptions aller Seiten folgen der Keyword-Map (Entwurf `titel-descriptions.md` als Startpunkt, gegen aktuelle Keyword-Map abgleichen); Seiten ohne Suchvolumen-Keyword bekommen beschreibende, eindeutige Titel. Test über alle Sitemap-URLs (gerendert/gebaut): Titel ≤ 60, Description 120–155, genau eine H1, keine Duplikate (Titel und Description), Hauptkeyword im Titel, wo die Map eines hat.
- **D-07:** Sichtbare Breadcrumbs als Baustein (v2-Stil) auf allen Seiten außer Startseite, mit BreadcrumbList-Schema aus derselben Quelle.
- **D-08:** Individuelle OG-Grafik je Seite über Next `opengraph-image` je Routen-Segment (statisch generiert, Marke/Titel/Seitentyp, ≤ 300 KB, 1200×630); bestehende OG-Routen (Root, Blog, Hilfe) wiederverwenden und vereinheitlichen.

### Antwort zuerst und KI-Sichtbarkeit (SEO-06, SEO-09-Teil)
- **D-09:** Zentrale Seiten (Startseite-FAQ, Preise, Vergleich, Alternativen, Funktionsübersicht, Fakten, App, Craft AI, GoBD): jede Frage-Überschrift (H2/H3 mit „?“) hat direkt darunter eine Antwort ≤ 300 Zeichen; Test.
- **D-10:** Für jeden der 16 AI-Tracker-Prompts eine Zielseite oder ein Abschnitt (Mapping-Datei `docs/seo/ai-prompts-targets.json` mit Prompt → URL#Anker), Test prüft Existenz und Antwort-zuerst. Neue Seite „Beste Handwerkersoftware für kleine Betriebe“ (Pfad laut Keyword-Map bzw. `/vergleich/handwerkersoftware-kleine-betriebe` falls nicht vorhanden) mit belegten Kriterien, ohne Selbstüberhöhung.
- **D-11:** Wissenslücken (KD < 20, Hilfe/Blog) werden im Mapping als „Phase 9“ geführt; SEO-09 wird erst in Phase 9 abgeschlossen (Traceability anpassen).

### Gestaltung (DESIGN-02-Fortsetzung)
- **D-12:** `/preise`, `/vergleich`, `/fakten-ueber-craftos`, `/craft-ai`, `/gobd` auf v2-Bausteine nach 05/06/07-UI-SPEC; Texte kürzen erlaubt (Inhaberauftrag), keine URL entfällt. DESIGN-02 wird in Phase 9 abgeschlossen (Gewerke/Wissen); Traceability anpassen.

### SE Ranking
- **D-13:** SE Ranking gezielt nutzen (Test bis 03.11.2026, ~65.000 Units): SERP-/Keyword-Daten für Alternativen- und Kostenkeywords, Fragen (PAA-ähnlich) für FAQ, AI-Search-Daten für Prompt-Zielseiten; Abrufe drosseln, Rohdaten unter `docs/seo/data/` mit Datum, Schlüssel nie ausgeben. Nach Rollout `se-ranking-sync.mjs --check` und `seo-report.mjs --etappe rollout-phase08`.

### Qualität, Rollout
- **D-14:** Wie Phase 7: strikt sequentielle Wellen, TDD für Datenmodule/Tests, schwere Läufe lokal einzeln (Port 3100, eigene PID), Code-Review-Gate durch Orchestrator vor dem Rollout-Plan, Ship-Gate, `gh workflow list --all` vor jedem Push, Vercel READY, `live-check.mjs` erweitern, IndexNow, Rollout-Nachweis `docs/releases/PHASE-08-ROLLOUT.md`.
- **D-15:** Anforderungsstatus: nur im Rollout-Plan markieren – SEO-03, SEO-04, SEO-05, SEO-06 und SEO-02 (Abschluss Keyword-Map-Metadaten sitewide); DESIGN-02 und SEO-09 bleiben „In Progress“ bis Phase 9. Alle anderen Pläne: `requirements-completed: []`.

### Claude's Discretion
- Reihenfolge und Zuschnitt der Pläne; Auswahl der Kriterien in Vergleichstabellen (nur belegte); Gestaltung der OG-Grafik innerhalb der Marke.
</decisions>

<canonical_refs>
## Canonical References
- `craftos/docs/entwuerfe/*-alternative.md`, `preise-answer-first.md`, `titel-descriptions.md`
- `craftos/docs/seo/KEYWORD-MAP.md`, `keyword-map.json`, `lib/keyword-map.ts`, `SE-RANKING-BEFUND-2026-10-20.md`, `docs/seo/data/`, `docs/seo/reports/`
- Designverträge: `.planning/phases/05-…/05-UI-SPEC.md`, `06-…/06-UI-SPEC.md`, `07-…/07-UI-SPEC.md`, `craftos/docs/DESIGN-V2.md`
- Produkt: `craftos/lib/product-register.ts`, `lib/site.ts`, `docs/product-pricing-snapshot.json`, `lib/funktionen.ts`, `lib/funktionsdetails/**`
- Bestand: `craftos/app/vergleich/**`, `app/preise/page.tsx`, `app/fakten-ueber-craftos`, `app/craft-ai`, `app/gobd`, `app/opengraph-image.tsx`, `app/blog/[slug]/opengraph-image.tsx`, `app/hilfe/[slug]/opengraph-image.tsx`, `lib/metadata.ts`, `lib/schema.ts`, `lib/llms.ts`, `app/sitemap.ts`, `components/layout/Footer.tsx`
- Skripte/Tests: `scripts/route-audit.mjs`, `live-check.mjs`, `se-ranking-sync.mjs`, `seo-report.mjs`, `scripts/lib/se-ranking-mcp.mjs`, `tests/**`, `tests/e2e/**`
- Rollout-Muster: `craftos/docs/releases/PHASE-07-ROLLOUT.md`
- Offene Punkte aus Phase 7: `PHASE-07-ROLLOUT.md` §13/§14, `.planning/phases/07-…/deferred-items.md`
</canonical_refs>

<deferred>
## Deferred Ideas
- Gewerke-Seiten und Wissenslücken → Phase 9.
- Datenschutz-Abschnitt Webanalyse → Inhaberfreigabe.
- Optik-Feinschliff (Icon-Kachel-Leerraum, Snippet-Dimmstufe), product-demo-Entscheidung → Phase 10.
</deferred>

---

*Phase: 08-seo-und-ki-sichtbarkeit*
*Context gathered: 2026-10-22*
