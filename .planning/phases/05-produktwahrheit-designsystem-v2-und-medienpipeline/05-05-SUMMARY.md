---
phase: 05-produktwahrheit-designsystem-v2-und-medienpipeline
plan: 05
subsystem: designsystem
tags: [design-system, components, ui, device-frames]
requires:
  - "05-UI-SPEC.md (freigegeben, Richtung „Werkbank-Präzision“) §5–§9"
  - "components/v2/budgets.ts aus Plan 05-04 (TEXT_BUDGET, assertTextBudget, assertCount)"
  - "lib/funktionen.ts (tier, platforms)"
provides:
  - "components/v2/{ComparisonTable, Badges, FeatureCard, IllustrationLabel, MediaFigure} als Server Components"
  - "components/v2/{BrowserFrame, PhoneFrame, DevicePair} mit BrowserDevice/PhoneDevice, PHONE_TABS, FrameCaption"
  - "components/v2/mini/{MiniUi, limits}: MiniList, MiniRow, MiniStat, MiniStatus, MiniWeek, MiniTimer, MINI_BUDGET"
  - "tests/design-v2-frames.test.ts (18 Fälle)"
  - "Bestandskorrektur: Tab „Zeiten“ in components/feature-snippet/DeviceFrame.tsx"
affects: [05-06, 05-08, phase-06, phase-07, phase-08, phase-09]
tech-stack:
  added: []
  patterns:
    - "Geräterahmen erzwingen Beleg (data-evidence) und Kennzeichnung beim Rendern; das Gerät ist aria-hidden und inert"
    - "Gerätekörper (BrowserDevice/PhoneDevice) getrennt von figure/figcaption, damit DevicePair genau eine Kennzeichnung trägt"
    - "Live-Prüfung im Baustein: FeatureCard prüft tier und Plattformen gegen lib/funktionen.ts"
    - "Dunkle Varianten über data-tone/data-surface=\"dark\" am Vorfahren (:where-Selektor, keine Zusatzprops)"
key-files:
  created:
    - craftos/components/v2/ComparisonTable.tsx
    - craftos/components/v2/ComparisonTable.module.css
    - craftos/components/v2/Badges.tsx
    - craftos/components/v2/Badges.module.css
    - craftos/components/v2/FeatureCard.tsx
    - craftos/components/v2/FeatureCard.module.css
    - craftos/components/v2/IllustrationLabel.tsx
    - craftos/components/v2/MediaFigure.tsx
    - craftos/components/v2/MediaFigure.module.css
    - craftos/components/v2/BrowserFrame.tsx
    - craftos/components/v2/PhoneFrame.tsx
    - craftos/components/v2/DevicePair.tsx
    - craftos/components/v2/Frames.module.css
    - craftos/components/v2/mini/MiniUi.tsx
    - craftos/components/v2/mini/MiniUi.module.css
    - craftos/components/v2/mini/limits.ts
    - craftos/tests/design-v2-frames.test.ts
  modified:
    - craftos/components/feature-snippet/DeviceFrame.tsx
    - craftos/components/feature-snippet/ConnectedScene.tsx
    - craftos/components/feature-snippet/SupplementalScene.tsx
    - craftos/docs/DESIGN-V2.md
key-decisions:
  - "FeatureCard hat genau einen Link („Mehr zu {name}“) als gestreckten Klickbereich; der h3-Titel bleibt reiner Text (ein Tabstopp je Karte, eindeutiger Linktext)"
  - "FeatureCard prüft zusätzlich, dass jede übergebene Plattform in funktionen[].platforms belegt ist"
  - "MediaFigure übersetzt die UI-SPEC-Prop priority in loading=eager + fetchPriority=high, weil next/image priority in Next.js 16 abgekündigt ist"
  - "Mini-UI-Statusnamen auf die im Web-Release belegten Dokumentstatus begrenzt: Entwurf, Offen, Gesendet, Bezahlt, Überfällig, Storniert (web:src/pages/Dokumente.tsx)"
  - "MiniList mit mehr als 5 Zeilen wirft „MiniList: höchstens 5 Zeilen erlaubt – Inhalte in lib/… kürzen.“; die Zeichenüberschreitung wirft den UI-SPEC-Text für mini.row"
  - "Das ganze Gerät (Fensterleiste, Titel, Inhalt, Tabs) ist aria-hidden und inert; Bedeutung trägt allein der sr-only-Satz in der figcaption"
requirements-completed: []
metrics:
  duration: "ca. 17 min"
  completed: "2026-10-20"
---

# Phase 5 Plan 05: Designsystem v2, Teil B – Summary

**Inhaltsbausteine (Vergleichstabelle, Badges, Funktionskarte, Kennzeichnung, Bild) und statische Geräterahmen mit Mini-UI als Server Components. Beleg, Kennzeichnung, Live-Prüfung und Mini-Budget werden im Code erzwungen. Außerdem ist der Bestandstab „Zeit“ auf „Zeiten“ korrigiert.**

## Ergebnis

- **ComparisonTable** (§7): Der Scrollbereich `div role="region"` hat `aria-label` = Caption und `tabindex="0"`. Darin liegt eine echte `table` mit sichtbarer `caption` (20/600 Clash) sowie `th scope="col"` und `th scope="row"`.
  - **Zellwerte:** `true` wird zu `Check` + `<span class="sr-only">Ja</span>`, `false` zu `Minus` in `ink-400` + „Nein“, `"teilweise"` zu „Teilweise“ 14/600. Rot und Grün kommen nicht vor.
  - **Hervorgehobene Spalte:** Sie ist warm `#F7F3EB`, hat eine Amber-Oberkante von 3 px im Kopf und Haken auf einem `primary-100`-Kreis von 28 px.
  - **Unter 768 px:** Die erste Spalte steht fest (sticky), und der Hinweis „Zum Vergleichen seitlich wischen“ erscheint nur dort.
  - **Regeln:** Mengen 4/12 aus `TEXT_BUDGET.count.comparison`, höchstens eine hervorgehobene Spalte, `note` ist Pflicht, Budgets für Zeile und Zelle gelten.
- **Badges** (§8): `PlatformBadge` (Monitor/Smartphone, „Web-App“/„Mobile-App“) und `LicenseBadge` (KeyRound, „Voll-Lizenz“/„App-Lizenz“). Hinzu kommen `BadgeGroup` als `ul aria-label` und `PlatformBadges` direkt aus `platforms`. Die Farben hell und dunkel entsprechen dem UI-SPEC.
- **FeatureCard** (§5): Die Bühne hat 4:3 und ist warm. Ohne `visual` zeigt sie ein Icon von 48 px im Sechseck-Umriss mit Logo-Proportion. Darunter folgen Badges, `h3`, ein Satz Nutzen und der Link „Mehr zu {name}“ ohne Pfeilglyphe als gestreckter Klickbereich.
  - **Laufzeitprüfung:** `funktionen.find(slug)?.tier === "heute"`, sonst der Fehler „FeatureCard: {slug} ist keine Live-Funktion – nur tier heute zulässig.“
- **IllustrationLabel / FrameCaption** (§9): Die Texte stehen wörtlich im Code, mit `Info`-Icon 16 px. `FrameCaption` liefert den `sr-only`-Satz (≤ 140 Zeichen) plus die Kennzeichnung „vereinfacht“.
- **MediaFigure** (§9): Hülle um `next/image`. `src`, `alt`, `width`, `height` und `sizes` sind Pflicht; die Bildunterschrift hat höchstens 90 Zeichen. Mit `label="ki"` steht die KI-Kennzeichnung in der `figcaption`.
- **BrowserFrame** (§6): Seitenverhältnis 16:10, mindestens 280 px breit, Radius 12 px. Die Fensterleiste ist 32 px hoch (`#F7F3EB`, drei Punkte in `ink-300`, „CraftOS Web-App“). Die Titelzeile zeigt `CraftOSMark` 20 px statt des „C“-Platzhalters. Der Schatten ist `--shadow-device`, bei `tone="dark"` `-dark`.
- **PhoneFrame** (§6): Proportion 194:410 über `aspect-ratio`, Breite über `--phone-w` (160/194/240 per `data-width`) und Statusleiste „09:41“. Die Tabs lauten exakt „Einsätze“, „Zeiten“, „Projekte“, „Mehr“; der aktive Tab steht in `primary-800` mit 2 px Amber-Unterstrich, `activeTab` ist typisiert.
- **DevicePair:** Unter 768 px gestapelt mit zentriertem Phone. Ab 768 px stehen beide Geräte nebeneinander, mit 48 px Überlappung und 24 px Versatz. Es gibt genau eine Kennzeichnung, `data-evidence` steht je Gerät.
- **Mini-UI** (`mini/`): `MiniList`, `MiniRow`, `MiniStat`, `MiniStatus`, `MiniWeek` und `MiniTimer` sind statisch, in General Sans 8–13 px, mit `tabular-nums` und ohne fokussierbare Elemente. `MINI_BUDGET = { row: 24, rows: 5 }` steht in `mini/limits.ts`.
- **Bestand:** `components/feature-snippet/DeviceFrame.tsx` zeigt jetzt „Zeiten“.

## Design-Kaskade Teil B

| Werkzeug | Ergebnis |
|---|---|
| frontend-design | Es gab kein Skill-Werkzeug. Die Leitlinie `a0b04d9ddcca/skills/frontend-design/SKILL.md` wurde nur gelesen und nicht kopiert. Der UI-SPEC legt die Richtung fest, die zwei Durchgänge betrafen nur freie Achsen. **Übernommen:** Kühnheit nur an den Geräterahmen, Struktur als Information, Satzschreibung, kein „→“ an Links, keine „·“-Ketten, kein Monospace. **Verworfen:** ein zweiter Link im Kartentitel, farbige Ja/Nein-Symbole, Sechseck als Dekor (nur Icon-Motiv der Karte). |
| ui-ux-pro-max | Gelaufen ist `search.py "saas comparison table device mockup trust" --domain ux` sowie `"accessibility screen reader table"`, `"images layout shift"` und `"feature card badge"`. **Übernommen:** Table Handling (Scrollbereich), Screen Reader/Heading Hierarchy (semantische Tabelle, `h3`), Content Jumping (feste `aspect-ratio`, `width`/`height`), Alt Text (Pflicht). **Verworfen:** „Card layout“ für Tabellen, weil der Spaltenvergleich verloren ginge. `"feature card badge"` lieferte keinen Treffer. |
| 21st.dev | `21st_magic_component_inspiration` war für „comparison table“, „device mockup“, „feature card“ und „badge“ nicht verfügbar. Es wurde nichts erfunden und kein builder/refiner eingesetzt. |
| Context7 | MCP-Werkzeug und `ctx7`-CLI waren nicht verfügbar. Ersatzweise wurde die Next.js-16-Doku `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` geprüft (`width`/`height`, `sizes`, `preload`, `priority`). Dabei zeigte sich: **`priority` ist abgekündigt**, deshalb `loading="eager"` + `fetchPriority="high"`. |

Der Nachweis ist zusätzlich in `craftos/docs/DESIGN-V2.md` unter §7 und §8 eingetragen (Auftrag des Orchestrators; Plan 05-06 ergänzt dort nur noch /styleguide und MobileAppGallery).

## Prüfergebnisse (lokal)

- `npx vitest run tests/design-v2-frames.test.ts` ergab **18 passed (18)**. Zusätzlich liefen `tests/design-v2-components.test.ts` (35 zusammen) und `tests/demo.test.ts` (53 zusammen mit frames) grün.
- `npm run typecheck` (`tsc --noEmit`) ergab 0 Fehler.
- `npm run lint` meldete „No issues found“.
- **grep-Kriterien:**
  - In `IllustrationLabel.tsx` stehen „Vereinfachte Darstellung mit Beispieldaten“ = 1 und „Darstellung, KI-gestaltet“ = 1.
  - In `tests/design-v2-frames.test.ts` stehen `kundenportal` = 0, `gibt-es-nicht` = 2 und `test-nicht-live` = 3.
  - In `ComparisonTable.tsx` stehen `scope="col"` = 2 und `scope="row"` = 1.
  - In `DeviceFrame.tsx` stehen `"Zeiten"` = 1 und `"Zeit"` = 0.
  - `data-evidence` kommt in `PhoneFrame.tsx` 1-mal und in `BrowserFrame.tsx` 1-mal vor, `inert` in `PhoneFrame.tsx` 2-mal.
  - `grep -rl "use client" components/v2` und `grep -rn "@keyframes\|opacity: 0\|visibility: hidden" components/v2` liefern keine Treffer.
- Für `grep -n "Zeit'" craftos/tests/e2e/*.pw.cjs` gab es keine Treffer. Bestehende E2E-Erwartungen sind also nicht betroffen.

## Aufgaben und Commits

| Aufgabe | Commit | Inhalt |
|---|---|---|
| 1 RED | `ef5e894` | Fälle 1–5 (Tabelle, Badges, FeatureCard mit Testattrappe, Kennzeichnung, MediaFigure), rot |
| 1 GREEN | `df411d8` | ComparisonTable, Badges, FeatureCard, IllustrationLabel, MediaFigure |
| 2 RED | `e43539a` | Fälle 6–11 (Rahmen, DevicePair, Bestandstab, Mini-Budget, keine Einblendungen), rot |
| 2 GREEN | `19afb53` | BrowserFrame, PhoneFrame, DevicePair, Frames.module.css, Mini-UI, limits.ts, Tab „Zeiten“ |
| Doku | `5d360a0` | DESIGN-V2.md §7/§8 (Kaskade und Bausteine Teil B) |

## Abweichungen vom Plan

### Automatisch behoben

**1. [Rule 1 – Bug] Aktiver Tab der Bestandsszenen nach der Umbenennung nicht mehr markiert**
- **Gefunden in:** Aufgabe 2
- **Problem:** `ConnectedScene.tsx:25` und `SupplementalScene.tsx:107` übergeben `active="Zeit"` an den Bestands-`PhoneFrame`. Nach der Umbenennung auf „Zeiten“ wäre dort kein Tab mehr aktiv gewesen.
- **Behebung:** Beide Aufrufe übergeben jetzt `active="Zeiten"`. Sonst bleiben die Szenen unverändert, `tests/demo.test.ts` ist grün.
- **Dateien:** `craftos/components/feature-snippet/ConnectedScene.tsx`, `craftos/components/feature-snippet/SupplementalScene.tsx`
- **Commit:** `19afb53`

**2. [Rule 1 – Bug] Linktext als zwei Textknoten**
- **Gefunden in:** Aufgabe 1 (GREEN)
- **Problem:** JSX `Mehr zu {name}` rendert als `Mehr zu <!-- -->Aufmaß`.
- **Behebung:** Der Text wird als Template-String gesetzt, damit er ein durchgehender Knoten ist.
- **Commit:** `df411d8`

### Ergänzungen im Rahmen von Rule 2 (Korrektheit nach UI-SPEC)

- `FeatureCard` lehnt Plattformen ab, die für den Slug nicht in `lib/funktionen.ts` belegt sind. Grundlage ist UI-SPEC §8: „Plattformwerte kommen ausschließlich aus funktionen[].platforms“.
- `ComparisonTable` verlangt höchstens eine hervorgehobene Spalte, eine nicht leere `note` und einen Wert je Zelle.
- `FrameCaption` verlangt einen nicht leeren Screenreadersatz (≤ 140 Zeichen). Rahmentitel sind auf das Mini-Budget von 24 Zeichen begrenzt.
- Eigene Fehlertexte im Stil des UI-SPEC:
  - „MiniList: höchstens 5 Zeilen erlaubt – Inhalte in lib/… kürzen.“
  - „MiniWeek: höchstens 5 Einsätze erlaubt – …“
  - „ComparisonTable: höchstens 1 hervorgehobene Spalte erlaubt – highlight anpassen.“
  - „ComparisonTable: note fehlt – Quelle und Stand angeben.“
  - „FeatureCard: Plattform {p} ist für {slug} nicht belegt – platforms aus lib/funktionen.ts übernehmen.“
  - „Geräterahmen: description fehlt – Screenreadersatz zur Ansicht angeben.“

### Bewusste Auslegungen

- **Props-Vertrag:** `BrowserFrame` und `PhoneFrame` haben zusätzlich die Pflicht-Prop `description` für den `sr-only`-Satz, den der Plan verlangt. Der UI-SPEC-Vertrag in §6 nennt sie nicht.
- **Hilfsbausteine:** `BrowserDevice`, `PhoneDevice`, `PHONE_TABS`, `FrameCaption`, `BadgeGroup` und `PlatformBadges` werden zusätzlich exportiert, damit `DevicePair` und die Musterseite sie wiederverwenden können.
- **Ablage der Kennzeichnungs-Styles:** Sie liegen in `MediaFigure.module.css`. Der Plan sieht für `IllustrationLabel` kein eigenes CSS-Modul vor.
- **Rahmen-Sonderwerte:** Die Rahmen nutzen die UI-SPEC-Ausnahmewerte 12 px (Browser-Radius, Abstände) und 31/24 px (Phone-Radien) aus dem Bestand.
- **Ablage des Kaskadennachweises:** Laut Plan wäre er nur im SUMMARY und erst durch 05-06 in DESIGN-V2.md gelandet. Auf ausdrücklichen Auftrag des Orchestrators wurde er jetzt direkt dort ergänzt (05-04 ist abgeschlossen, es gibt keinen Dateikonflikt).

### Werkzeugbedingte Abweichungen der Kaskade

- frontend-design wurde gelesen statt über das Skill-Werkzeug aufgerufen. 21st.dev und Context7 waren nicht verfügbar. Alles ist oben und in DESIGN-V2.md vermerkt.

## Nicht geprüft in diesem Plan

- Es gab keine visuelle Browserprüfung (fünf Breiten, axe, CLS, Reduced Motion). Sie folgt mit `/styleguide` in Plan 05-06 und im Gesamt-ship-gate in Plan 05-08.
- Build, volle Unit-Suite und E2E liefen bewusst nicht: Der Plan verlangt nur Einzeltest, Typcheck und Lint, und schwere Läufe unterliegen der Koordinationsregel.
- Die Sichtbarkeit der Tailwind-Klasse `sr-only` im ausgelieferten CSS wird erst im Browser auf `/styleguide` (05-06) geprüft. Tailwind 4 erkennt Klassen automatisch; `sr-only` wird bisher nirgends sonst im Repo genutzt.

## Anforderungen

- **DESIGN-02:** Teil B der Grundlage steht. Die Anforderung ist **nicht** als erledigt markiert, weil die Umsetzung auf den Seiten in den Phasen 6–8 folgt.
- **DESIGN-04:** Im Code erzwungen: keine Keyframes, kein `opacity: 0`/`visibility: hidden`, Mini-UI inert (Test 11, grep leer). Nicht abgehakt, weil die Anforderung phasenübergreifend gilt.
- **MEDIA-03:** Für Rahmen und Karten technisch abgesichert (Beleg und Kennzeichnung Pflicht, nur `tier "heute"`, Tabs wie im Release). Nicht abgehakt, weil Musterseite und Seitenumsetzung noch ausstehen.

## Known Stubs

Keine.

## Self-Check: PASSED

- Alle 21 Dateien aus `key-files` sind vorhanden.
- Die Commits `ef5e894`, `df411d8`, `e43539a`, `19afb53` und `5d360a0` stehen in `git log`.
- TDD-Gates: Auf jeden `test(05-05)`-Commit folgt ein `feat(05-05)`-Commit.
