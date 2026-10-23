---
phase: 09-gewerke-und-wissensinhalte
plan: 05
subsystem: content-hilfe
tags: [inhalt, paket-d, hilfe, buero, einrichtung, belege, rollen, lizenzen, datev, leitlinie-l1]
requires:
  - phase: 09-gewerke-und-wissensinhalte
    provides: "09-01: Frontmatter answer/faq, Hilfe-Gliederung, Antwortregel; 09-15: eingefrorene Basis (Web 6686d05e, Mobile 837aab4f), content-pruefen.mjs"
provides:
  - "9 Hilfeartikel (Einrichtung 5, Belege 4) gegen den eingefrorenen Release geprüft, korrigiert und auf die Hilfe-Gliederung D-13 umgestellt"
  - "Prüfdatei docs/content-pruefung/09-d.md mit 9 Artikelzeilen, Belegpfaden, Zitatprüfung, Paketende und Übergabeliste"
affects: [09-09, 09-16, 09-17, 09-04]
tech-stack:
  added: []
  patterns:
    - "Bedienbegriffe per content-pruefen.mjs --belege gegen den Basis-Commit, danach Ansicht im Release gezielt nachgelesen (Pitfall 2)"
    - "Mehrere kurze Schrittlisten unter einer H2 statt einer langen Liste (Anlage, dann Ansprechpartner bzw. Code-Anmeldung)"
key-files:
  created:
    - craftos/docs/content-pruefung/09-d.md
  modified:
    - craftos/content/hilfe/anmelden-web-mobile.md
    - craftos/content/hilfe/firmenprofil-einrichten.md
    - craftos/content/hilfe/kunden-ansprechpartner-anlegen.md
    - craftos/content/hilfe/mitarbeiter-einladen-lizenz-zuweisen.md
    - craftos/content/hilfe/rollen-zugriffsrechte-einstellen.md
    - craftos/content/hilfe/beleg-kontieren-zuordnen.md
    - craftos/content/hilfe/beleg-scannen-pruefen.md
    - craftos/content/hilfe/datev-export-erstellen.md
    - craftos/content/hilfe/zahlungen-erfassen.md
key-decisions:
  - "Phase 9 (09-05): Schalternamen je Ansicht – unter Rollen & Rechte „Alle Projekte“/„Teamzeiten“, im Dialog Mitarbeiter hinzufügen „Alle Projekte sehen“/„Teamzeiten im Projekt“; beide Varianten im Artikel zugeordnet"
  - "Phase 9 (09-05): Kundenzahlungen per Bank über Buchhaltung → Bankumsätze → Zuordnen („Zahlung aus Bankumsatz erfassen“); „Zahlung über Bankumsatz erfassen“ gehört zu den Eingangsbelegen"
  - "Phase 9 (09-05): „Skonto gezogen“ aus zahlungen-erfassen gestrichen – im Release-Dialog ausgeblendet, nur Code-Kommentar"
  - "Phase 9 (09-05): Navigation zu Mitarbeitern als Seitenleiste unter „Team“ der Eintrag „Mitarbeiter“ (aufklappbare Gruppe), ohne Pfadschreibweise"
requirements-completed: []
duration: 30min
completed: 2026-10-23
---

# Phase 9 Plan 05: Hilfe Büro – Einrichtung und Belege Summary

**Neun Büro-Hilfeartikel gegen Web v4.0.0-test.245 / Mobile test.96 geprüft und auf Antwort → Voraussetzungen → Schritt für Schritt → Ergebnis prüfen → Häufige Probleme umgestellt; Mitarbeiter- und Rollenartikel korrigiert, Belege auf „Buchhaltung → Belege → Eingangsbelege“, DATEV-Export mit DATEV-Einstellungen als Voraussetzung, Zahlungen mit Bankweg statt Negativsatz.**

## Performance

- **Duration:** ca. 30 min
- **Started:** 2026-10-23T00:12Z (Worktree auf `main` 682d86b, `git merge main` bereits aktuell)
- **Completed:** 2026-10-23T00:42Z
- **Tasks:** 2 von 2
- **Files:** 1 neu, 9 geändert

## Accomplishments

- **Einrichtung (`e5b1b50`):**
  - `anmelden-web-mobile`: Code-Anmeldung Web („Kein Passwort? Mit Code anmelden“, „Code senden“, „Anmeldecode“) und Mobile („Code“, „Code aus der E-Mail“), „Mit Google anmelden“, Lizenzsätze positiv (Web-App mit Voll-Lizenz, Mobile-App mit Voll- oder App-Lizenz, Hinweis „Nur in der App verfügbar“), „Ein Konto, ein Mobilgerät“.
  - `firmenprofil-einrichten`: „Steuerprofil“ („Versteuerungsart“, „USt-Voranmeldungs-Zeitraum“, „Kleinunternehmer nach §19 UStG“) ergänzt, Feldnamen aus Firmendaten/Bankverbindung/Steuern, Rolle Admin pflegt, Büro-Leitung liest.
  - `kunden-ansprechpartner-anlegen`: Ansprechpartner im gespeicherten Kunden (Dialog „Ansprechpartner hinzufügen“, „Erhält Rechnungen“, „Erhält Angebote“), „Zum Kundenportal einladen“ mit Inline-Link, Mobile-Tab „Kunden“.
  - `mitarbeiter-einladen-lizenz-zuweisen` (war falsch): Seitenleiste „Team“ → Eintrag „Mitarbeiter“, Dialog „Mitarbeiter hinzufügen“ mit allen Feldern inkl. „Sprache (App-Vorgabe)“, Einladungsaktionen, Inhaber vergibt Sitze und Rollen, Inline-Link `/hilfe/app-sprache-einstellen`.
  - `rollen-zugriffsrechte-einstellen` (war falsch): „Einstellungen → Rollen & Rechte“, Ablauf bis „Rollenänderung bestätigen“/„Bestätigen und speichern“, Schalter „Globale Finanzbereiche“, „Alle Projekte“, „Teamzeiten“, „Lagerpreise sehen“, Tabelle der fünf Rollen.
- **Belege (`c2fce72`):**
  - `beleg-kontieren-zuordnen`, `beleg-scannen-pruefen`: „Buchhaltung → Belege → Eingangsbelege“, Belegdialog-Begriffe, „Speichern & Prüfung bestätigen“ bzw. „Prüfung bestätigen“ in der Liste, Korrektur über „Erfassung korrigieren“, mobil „Beleg scannen“ (Mehr und Projektkachel).
  - `datev-export-erstellen`: zweiter Einstieg „Buchhaltung → Steuerberater“, DATEV-Einstellungen (Kontenrahmen, Berater-/Mandantennummer) als Voraussetzung samt Meldungen (Delta test.243), Schritte und Paketinhalt am Release.
  - `zahlungen-erfassen`: „ersetzt keinen Abgleich …“ positiv durch den Bankweg ersetzt, Liste „Zahlungseingänge“, Inline-Link `/hilfe/bankumsaetze-abgleichen`.
  - GoBD-Quellen beider Steuerartikel neu abgerufen (HTTP 200, `checkedAt` 2026-10-23).
- **Prüfdatei** `docs/content-pruefung/09-d.md`: 9 Zeilen mit Status, Basis, Änderungen und Belegpfaden; Zitatprüfung; Durchsicht über das Skript hinaus; „Zitat-Ausnahmen: Keine.“; Übergabeliste.

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `content-pruefen.mjs --ausnahmen 09-d.md --zitate --l1 --antwort` (5 bzw. 9 Dateien) | 0 Befunde, 0 Hinweise, Exit 0 |
| `npx vitest run tests/content-produktwahrheit.test.ts` | 10/10 grün (je Aufgabe) |
| `tests/content.test.ts` unter `.heavy-lock` | 34/34 grün (Aufgabe 1 und Paketende) |
| `npm run typecheck`, `npm run lint` | 0 Fehler (je Aufgabe) |
| Unter `.heavy-lock`: `npm run build` | grün |
| Unter `.heavy-lock`: `seo-audit.mjs --paths=<9 Pfade>` (`MSYS_NO_PATHCONV=1`) | 12 Regeln, 0 Verstöße |
| Akzeptanz-Greps | Altbegriffe Rollen 0, „Globale Finanzbereiche“ 2, „Team → Mitarbeiter“ 0, „ersetzt keinen“ 0, „Buchhaltung → Belege“ je 2, 9 Zeilen `| hilfe/`, „Übergabeliste“ vorhanden, alle 9 mit `answer:`, „## Schritt für Schritt“, „## Häufige Probleme“ |

## Task Commits

1. **Aufgabe 1: Einrichtung (5)** – `e5b1b50` `feat(09-05): Hilfe Einrichtung – fünf Artikel gegen Release geprüft und gegliedert`
2. **Aufgabe 2: Belege (4), Prüfdatei, Paketende** – `c2fce72` `feat(09-05): Hilfe Belege – vier Artikel auf Buchhaltung → Belege umgestellt, Prüfdatei abgeschlossen`

## Decisions Made

- Schalternamen je Ansicht wörtlich: In „Rollen & Rechte“ heißen sie „Alle Projekte“ und „Teamzeiten“ (`ROLE_FIELD_LABELS`), im Dialog „Mitarbeiter hinzufügen“ „Alle Projekte sehen“ und „Teamzeiten im Projekt“. Der Plan nannte für den Rollenartikel die Dialog-Varianten; der Artikel nennt beide an ihrem Ort.
- Bankweg für Kundenzahlungen über „Bankumsätze“ und „Zahlung aus Bankumsatz erfassen“ statt des in 09-RESEARCH genannten „Zahlung über Bankumsatz erfassen“ (gehört zu Eingangsbelegen, also Lieferantenzahlungen).
- Rollentabelle mit den Release-Beschreibungen, positiv gefasst (ohne „keine globalen Finanzbereiche“), Lizenzspalte mit Voll-Lizenz/App-Lizenz.
- Keine DATEV-Formatquelle ergänzt: `developer.datev.de` lädt Inhalte nur per Skript und ließ sich nicht inhaltlich prüfen; GoBD-Quellen genügen als Pflichtquelle.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 – Produktwahrheit] „Skonto gezogen“ gestrichen (`zahlungen-erfassen`)**
- **Found during:** Aufgabe 2
- **Issue:** Der Begriff besteht die Zitatprüfung nur über einen Code-Kommentar; das Feld ist im Zahlungsdialog des Releases ausgeblendet (`DocumentPaymentsSection.tsx`).
- **Fix:** Schritt entfernt, nur „Einbehalt gezogen“ bleibt. Hinweis an 09-17 in der Übergabeliste.
- **Commit:** `c2fce72`

**2. [Rule 1 – Produktwahrheit] Bankweg für Kundenzahlungen**
- **Found during:** Aufgabe 2
- **Issue:** Der Plan-Vorschlag „Zahlung über Bankumsatz erfassen“ ist die Aktion für Eingangsbelege.
- **Fix:** Weg „Buchhaltung → Bankumsätze“ → „Zuordnen“ → „Zuordnung bestätigen“ mit „Zahlung aus Bankumsatz erfassen“ (`BankAllocationDialog.tsx`).
- **Commit:** `c2fce72`

**3. [Rule 1 – Produktwahrheit] Schalternamen unter „Rollen & Rechte“**
- **Found during:** Aufgabe 1
- **Issue:** Plan nannte „Teamzeiten im Projekt“/„Alle Projekte sehen“ für die Rollenseite; dort heißen die Schalter „Teamzeiten“/„Alle Projekte“.
- **Fix:** Beide Varianten an ihrem Ort genannt.
- **Commit:** `e5b1b50`

**4. [Rule 1 – Präzisierung] Navigation „Mitarbeiter“**
- **Found during:** Aufgabe 1
- **Issue:** 09-RESEARCH nennt „Team → Mitarbeiter“ falsch; tatsächlich gibt es die aufklappbare Gruppe „Team“ mit dem Eintrag „Mitarbeiter“.
- **Fix:** „Öffnen Sie in der Seitenleiste unter „Team“ den Eintrag „Mitarbeiter““ – genau, ohne Pfadschreibweise (Akzeptanzkriterium erfüllt).
- **Commit:** `e5b1b50`

**5. [Rule 2 – L-1] Frontmatter-`description` von `beleg-scannen-pruefen`**
- „automatisch vorgeschlagene“ → „per KI vorgeschlagene“ (KI nur auf Anforderung, 09-UI-SPEC § 5). `title` unverändert; Meta-Description kommt weiter aus der Map.
- **Commit:** `c2fce72`

**6. Listen und Plattformen**
- `relatedFeatures`/`relatedArticles` innerhalb der Obergrenzen angepasst (nur existierende Ziele), `platforms` bei `kunden-ansprechpartner-anlegen` und `beleg-scannen-pruefen` um `mobile` ergänzt, weil die Artikel jetzt Mobile-Abläufe beschreiben.

---

**Total deviations:** 4 Produktwahrheits-Korrekturen, 1 L-1-Korrektur, 1 Listenpflege. **Impact:** Keine Regel abgeschwächt; Besitzgrenzen D-27 eingehalten (nur `files_modified`).

## Issues Encountered

Keine. Die Sperre war zu Beginn durch 09-03 belegt; `npm ci` lief nach deren Freigabe.

## Deferred Issues

Keine neuen. Bekannt: `tests/announcements.test.ts` (Paket a, siehe `deferred-items.md`) – hier nicht ausgeführt, da keine volle Suite im Plan.

## Known Stubs

Keine. Drei Inline-Links zeigen auf Slugs anderer Pakete (`/hilfe/kundenportal-kunden-einladen`, `/hilfe/app-sprache-einstellen`, `/hilfe/bankumsaetze-abgleichen`), laut 09-03-Regeln erlaubt; Linkcheck in 09-16, `relatedArticles`-Wünsche in der Übergabeliste.

## Threat Flags

Keine neue Angriffsfläche. T-09-17: jeder Bedienbegriff per Prüfskript gegen `6686d05e`/`837aab4f`, Rollen- und Schalternamen wörtlich aus `roles.ts`, `teamRoleManagement.ts`, `NewTeamMemberDialog.tsx`. T-09-18: keine Roh-HTML-Blöcke.

## Next Phase Readiness

- Übergabeliste in `09-d.md` an 09-09 (drei `relatedArticles`-Ergänzungen, Linkcheck), Hinweise an 09-04 (DATEV-Einstellungen) und 09-17 (Skonto).
- STATE.md und ROADMAP.md nicht geändert (Worktree-Regel); kein Merge nach main, kein Push.

## Self-Check: PASSED

- Dateien vorhanden: `craftos/docs/content-pruefung/09-d.md`, `09-05-SUMMARY.md`
- Commits vorhanden: `e5b1b50`, `c2fce72`
