# Eingefrorene Produktbasis Phase 9 (Plan 09-15)

Stand: 23.10.2026. Dieses Dokument legt die Produktbasis fest, gegen die alle Inhaltspakete der Phase 9 prüfen (D-04, K-8, W8), und das Format der paketeigenen Prüfdateien (D-11, W4). Ein späterer Release-Sprung wird nicht hier, sondern nur als Delta im Integrationsplan 09-09 geprüft (Pitfall 8).

Produktfakten kommen ausschließlich aus `lib/product-register.ts`, `lib/funktionen.ts`, `lib/site.ts`, `lib/funktionsdetails/**`, `docs/product-pricing-snapshot.json` und den Release-Pfaden unten. Gelesen wird nur lokal und nur lesend (`git -C <repo> show <commit>:<pfad>`, `git -C <repo> grep`), ohne `fetch` und ohne `checkout`.

## Eingefrorene Basis

| Produkt | Repo | Ref | Tag | Commit | Commit-Datum |
|---|---|---|---|---|---|
| Web-App | `C:/Projekte/craft-connect-buddy` | `origin/release` | `v4.0.0-test.245` | `6686d05e0aed9d9ed1a9959ddc2142928e874e84` | 22.10.2026 23:16 +02 |
| Mobile-App | `C:/Projekte/CraftOS - Mobile/craftos-mobile` | `origin/release` | `mobile-v1.0.0-test.96` | `837aab4f5c1d3cd5411f41e1d720b2aa274e2cac` | 22.10.2026 21:23 +02 |

Diese Commits stehen gleichlautend in:

- `lib/product-register.ts` → `productBasis.web` / `productBasis.mobile` (Tag und Commit, `checkedAt` 2026-10-23),
- `docs/product-pricing-snapshot.json` → `source` / `mobileSource` (geprüft von `tests/pricing-parity.test.ts` und `npm run sync:product:check`),
- `docs/product-source-snapshot.json` → `basis.web` / `basis.mobile`; daraus liest `scripts/content-pruefen.mjs --zitate` die Commits. Die SHA-256-Werte der 37 Belegdateien sind am jeweiligen Basis-Commit neu berechnet (Git-Blob, Zeilenenden wie im Repository; der frühere Stand vom 9. September 2026 war über ausgecheckte Dateien mit CRLF gerechnet). Alle 37 Pfade existieren am Basis-Commit.
- `docs/PRODUCT-REGISTER.md` → Tabelle „Erfasste Produktstände“.

### Faktenabgleich (09-15)

| Prüfung | Ergebnis |
|---|---|
| `origin/release` Web (lokal bekannter Ref, kein Fetch) | `6686d05e…` = Register = Preis-Snapshot |
| `origin/release` Mobile | `837aab4f…` = Register = Preis-Snapshot |
| Register-Abgleich | bereits erfolgt in `82c82e6` (Abgleich auf test.244 und Mobile `837aab4f`, nach 08-13) und `62f4478` (test.245 und Mobile test.96, nach 08-14); 09-15 dokumentiert nur und hebt `product-source-snapshot.json` sowie `PRODUCT-REGISTER.md` nach |
| Preise, Testtage, Credits: `git diff a9319e5 origin/release -- src/lib/constants.ts src/lib/subscription` | leer (auch ab `1e9c8bc`/test.240 leer) → 29,95 € / 299,50 € Voll-Lizenz, 9,95 € / 99,50 € App-Lizenz, 10 Testtage unverändert |
| Flags und KI-Verfügbarkeit: `src/lib/featureFlags.ts`, `src/lib/ai/` | unverändert |
| Neue Migrationen im Delta | `20261022140000_paragraf_13b_r13`, `20261022150000_kassenbuch_kb`, `20261022160000_zeit_sperre_abgerechnet_sz`, `20261022170000_belegschutz_status_sz`, `20261022180000_datev_stammdaten_dx1`, `20261022190000_gutschrift_festschreiben_gs1`, `20261022200000_kasse_monatssummen_kbe` – keine Preis-, Test- oder Lizenzmigration |
| Belegdateien aus `product-source-snapshot.json` im Delta geändert | `src/pages/DocumentEditorPage.tsx` (§ 13b), `src/pages/SteuerberaterExport.tsx` (DATEV-Stammdaten Pflicht, kein stiller SKR03-Rückfall), `supabase/functions/generate-einvoice/index.ts` (§ 13b und USt-ID in der E-Rechnung); keine Mobile-Belegdatei |

Ergebnis: Keine Aussage auf der Website wird durch das Delta falsch; es kommen belegte Funktionen hinzu (unten). Preise bleiben gleich.

## Delta ab Recherchebasis (W8)

Berechnet immer ab Web `a9319e5` (v4.0.0-test.241) und Mobile `6cac366` (mobile-v1.0.0-test.95), unabhängig vom Registerstand:
`git -C C:/Projekte/craft-connect-buddy log --oneline a9319e5..origin/release` bzw. `git -C "C:/Projekte/CraftOS - Mobile/craftos-mobile" log --oneline 6cac366..origin/release`.

### Web `a9319e5..6686d05` (19 Commits ohne Merge, 4 Release-Tags)

| Commit | Tag | Inhalt | Wirkung auf Website-Inhalte | Paket |
|---|---|---|---|---|
| `6164ea4` | test.242 | feat(rechnung): Rechnung nach § 13b auffindbar und vollständig (R13a) | neue Funktion § 13b | 09-17 (d2) |
| `e0cabae` | test.242 | fix(rechnung): § 13b einheitlich je Rechnungsfolge, nicht bei § 19 | Steuerart je Rechnungsfolge fest; Schalter nur für umsatzsteuerpflichtige Betriebe | 09-17 (d2) |
| `3ae0cae` | test.242 | feat(kassenbuch): schlankes GoBD-Kassenbuch Stufe 1 (KB) | neue Funktion Kassenbuch | 09-07 / 09-14 (f) |
| `44f1d3b` | test.242 | fix(kassenbuch): Bestand serverseitig, DATEV-Stammdaten und -Format | Kassenbuch mit DATEV-Export | 09-07 / 09-14 (f) |
| `b5b415d` | test.242 | fix(kassenbuch): DATEV-Stammdaten nur des aktiven Betriebs (KBc) | wie oben | 09-07 / 09-14 (f) |
| `13c72e0` | test.242 | Migration `paragraf_13b_r13`, `kassenbuch_kb` | Datenbasis der beiden Funktionen | – |
| `59ad84a` | test.243 | fix(zeiten): abgerechnete Zeiten serverseitig sperren (SZ) | neue Regel: abgerechnete Zeiten gesperrt | 09-06 (e) |
| `0ab4e9e`, `3c1f83f`, `2e2f332`, `9aebfe3`, `f03f825` | test.243 | fix(zeiten): Sperre an ausgestellten Rechnungen, Belegschutz, Freigabe gelöschter Entwürfe | Feinschliff der Sperre; Korrekturweg über Storno der Rechnung | 09-06 (e) |
| `bf08314`, `c4d4945` | test.243 | fix(datev): Stammdaten je Betrieb, kein stiller SKR03-Rückfall | DATEV-Export verlangt hinterlegte DATEV-Einstellungen (Kontenrahmen) | 09-05 (d) `hilfe/datev-export-erstellen`; Hinweis an 09-04 (c) `blog/datev-export-vorbereiten` |
| `142732d` | test.243 | fix(kassenbuch): DATEV-Export wie übrige Exporte | Kassenbuch-Export folgt den DATEV-Einstellungen | 09-07 / 09-14 (f) |
| `9f0c700` | test.243 | Migrationen `zeit_sperre_abgerechnet_sz`, `belegschutz_status_sz`, `datev_stammdaten_dx1`, `gutschrift_festschreiben_gs1` | Datenbasis; Gutschriften zu einfachen Rechnungen festschreibbar | – (Hinweis 09-17, falls Gutschrift erwähnt) |
| `b6ea3ec` | test.244 | fix(kassenbuch): Monatssummen ohne Anfangsbestand, Storno auf richtigem Monat | Monatsübersicht „Einnahmen“, „Ausgaben“, „Bestand Monatsende“ | 09-07 / 09-14 (f) |
| `cd41985` | test.244 | Migration `kasse_monatssummen_kbe` | Datenbasis | – |
| `6686d05` | test.245 | fix: Nebenbefunde Abnahme 238/243 – Fehlertexte, Toasts, Kalender | nur Fehlertexte, Toasts, Kalender; keine neue Aussage | – |

### Vorgeschichte `1e9c8bc..a9319e5` (bereits Recherchebasis, zur Vollständigkeit)

| Commit | Tag | Inhalt | Wirkung | Paket |
|---|---|---|---|---|
| `437808a` | test.241 | feat(zeiten): Beginn, Ende und Pausen im Web korrigieren (RZ1) | Zeitkorrektur im Web | 09-06 (e) `hilfe/zeiteintrag-erfassen-korrigieren`; 09-04 (c) `blog/projektbezogene-zeiterfassung` |
| `a9319e5` | test.241 | fix(zeiten): Texte, Bezüge und Rundung der Zeitkorrektur (RZ2) | wie oben | wie oben |

### Mobile `6cac366..837aab4` (2 Commits)

| Commit | Tag | Inhalt | Wirkung | Paket |
|---|---|---|---|---|
| `ea2fcdf` | test.96 | fix(app): Hinweis bei abgerechneten Zeiten statt stiller Fehlversuche (SZA) | App zeigt Hinweis, wenn eine abgerechnete Zeit geändert werden soll | 09-06 (e) `hilfe/zeiteintrag-erfassen-korrigieren`, ggf. `hilfe/mobile-offline-synchronisierung` |
| `837aab4` | test.96 | fix(app): Abrechnungshinweis auch neben wartenden Änderungen und im Sync-Toast (SZAb) | wie oben, auch bei wartenden Änderungen | 09-06 (e) |

## Neue Live-Funktionen und Zuordnung (D-32)

Inhabervorgabe: Es wird nur genannt, was unterstützt wird (Leitlinie L-1). Grenzen erscheinen positiv als Voraussetzung oder Ablauf.

| Funktion | Seit | Plattform | Zuständiges Paket | Auftrag |
|---|---|---|---|---|
| GoBD-Kassenbuch Stufe 1 mit DATEV-Export | test.242 (Feinschliff bis test.244) | Web | 09-07 bzw. 09-14 (f) | mindestens ein neuer Hilfeartikel „Kassenbuch führen“ (CONTENT-04); Keyword-Map-Eintrag über die Übergabeliste an 09-09 |
| Rechnung nach § 13b | test.242 | Web | 09-17 (d2) | in die passenden Rechnungsartikel (`hilfe/rechnung-fertigstellen`, `hilfe/e-rechnung-herunterladen`) einarbeiten; 09-08 (g) darf `blog/reverse-charge-bauleistungen` darauf verlinken |
| Zeitkorrektur von Beginn, Ende und Pause im Web | test.241 | Web | 09-06 (e) | `hilfe/zeiteintrag-erfassen-korrigieren`; 09-04 (c) `blog/projektbezogene-zeiterfassung` |
| Sperre abgerechneter Zeiten | test.243 (Mobile-Hinweis test.96) | Web + Mobile | 09-06 (e) | Korrekturweg über Storno der Rechnung in `hilfe/zeiteintrag-erfassen-korrigieren` (und ggf. `hilfe/zeiten-pruefen-exportieren`) |

### Belegte Bezeichnungen (Release-Pfade für die Prüfdateien)

**Kassenbuch (Web):**
- Navigation „Buchhaltung“ → „Kasse“ (`src/components/buchhaltung/AccountingNavigation.tsx` Z. 7), Route `/buchhaltung/kasse`, geschützt über die Lizenzfunktion `finanzen` (`src/App.tsx` Z. 271); ohne Finanzrechte: „Für das Kassenbuch brauchst du Finanzrechte.“ (`src/pages/Kassenbuch.tsx`).
- Einrichtung: „Kasse eröffnen“, „Anfangsbestand (€)“, Hinweis „Zähle das Bargeld. Der Anfangsbestand wird Buchung Nr. 1 und ist danach fest.“ (`src/pages/Kassenbuch.tsx`).
- Laufend: „Buchung erfassen“, Arten „Einnahme“, „Ausgabe“, „Privateinlage“, „Privatentnahme“, „Bank → Kasse“, „Kasse → Bank“ (`src/lib/cashBook.ts`); „Gespeicherte Buchungen sind unveränderbar. Fehler per Storno korrigieren.“, „Kassensturz“, „Kassensturz speichern“, „Stornieren“ (`src/components/buchhaltung/kassenbuch/CashBookDialogs.tsx`).
- Monatsübersicht: „Einnahmen“, „Ausgaben“, „Bestand Monatsende“, „Vormonat“, „Folgemonat“; Export „DATEV“ und „CSV“ (`src/pages/Kassenbuch.tsx`). Der DATEV-Export setzt hinterlegte DATEV-Einstellungen voraus: „DATEV-Einstellungen fehlen. Bitte Inhaber fragen.“ (`src/lib/datevSettings.ts`).
- Mobile-App: kein Kassenbuch (keine Datei im Mobile-Release).

**Rechnung nach § 13b (Web):**
- Kunde: Schalter „Bauleister nach § 13b“ mit „Für E-Rechnungen nach § 13b erforderlich.“ (`src/components/customers/CustomerDialog.tsx` Z. 449), gespeichert als Kundenstandard zusammen mit der USt-ID.
- Rechnung: Schalter „Rechnung nach § 13b (ohne USt.)“ mit „Für Bauleistungen mit Steuerschuld des Kunden. Beim Ausschalten gilt der Firmensteuersatz.“ bzw. nach der ersten festgeschriebenen Rechnung „Die Steuerart ist seit der ersten festgeschriebenen Rechnung festgelegt.“ (`src/components/DocumentEditor/DocumentCanvas.tsx` Z. 1792).
- Rechnungshinweis „Steuerschuldnerschaft des Leistungsempfängers gemäß § 13b UStG.“ (`src/lib/invoiceNoticeTexts.ts` Z. 39); E-Rechnung mit USt-ID des Kunden (`supabase/functions/generate-einvoice/index.ts`, `supabase/functions/_shared/invoiceMandatoryFields.ts`).
- Positiv formuliert: Der Schalter steht umsatzsteuerpflichtigen Betrieben zur Verfügung; die Steuerart gilt für die ganze Rechnungsfolge (Abschläge und Schlussrechnung).

**Zeitkorrektur und Sperre abgerechneter Zeiten:**
- Web: Dialog „Zeiteintrag bearbeiten“, Felder „Beginn“, „Ende“, „Pause (Minuten)“, Hinweis „Uhrzeiten und Pause korrigieren; die Arbeitszeit wird daraus berechnet.“ (`src/components/time/EditTimeEntryDialog.tsx` Z. 192).
- Sperre Web: „Diese Zeit gehört zu einer ausgestellten Rechnung – Datum, Uhrzeit, Pause und Stunden nur nach einem Storno der Rechnung ändern.“ (`src/lib/billedTimeEntryLock.ts` Z. 14).
- Sperre Mobile: „Diese Zeit ist bereits abgerechnet. Änderungen nur nach Storno der Rechnung.“ (`src/shared/i18n/locales/de/common.json`, Schlüssel `timeEntryBilled`).

## Leitlinie L-1 und Prüfwerkzeug

Leitlinie L-1 (Inhaber, 22.10.2026): Die Website nennt nur, was unterstützt wird. Einzige Quelle der Wörter, Altbegriffe und Ausnahmen ist `lib/leitlinie-l1.json` (Suche in `lib/leitlinie.ts`); Formulierungsregeln in 09-UI-SPEC § 5.

Prüfwerkzeug je Paket (ohne Sperre lauffähig, liest nur Git-Objekte und Dateien, schreibt nichts):

```
cd craftos
node scripts/content-pruefen.mjs --ausnahmen docs/content-pruefung/09-<x>.md --zitate --l1 --antwort <dateien…>
```

- `--zitate`: jeder Begriff in „…“ (an „→“ geteilt) muss im eingefrorenen Web-Commit (`src`, `supabase/functions`) oder Mobile-Commit (`src`, Sprachdateien nur `de`) wörtlich vorkommen. Begriffe unter 4 Zeichen erscheinen nur als Hinweis (Pitfall 2: Substring-Treffer belegen nichts; für Navigation die Navigationsquelle lesen).
- `--ausnahmen`: nimmt die Begriffe aus dem Abschnitt „Zitat-Ausnahmen“ der Prüfdatei aus (nur Zeilen mit Begründung).
- `--l1`: Wörter und Altbegriffe aus `lib/leitlinie-l1.json` ohne Übergangsliste; Markdown zeilenweise, `.ts` nur über String-Literale (`scripts/lib/ts-literale.mjs`); Ausnahmen laut JSON.
- `--antwort`: Frontmatter `answer` ≤ 300 Zeichen und unter jeder H2/H3 mit „?“ der erste Absatz ≤ 300 Zeichen.
- Ausgabe `datei: befund`, Exitcode 1 bei mindestens einem Befund.

## Format der Paket-Prüfdateien

Jedes Paket führt genau eine Datei `docs/content-pruefung/09-<paket>.md` (Vorbild: `09-a.md`, `docs/content-source-audit.md`). Pflichtteile:

1. Kopf: Paket, Plan, Stand, Geltungsbereich, Verweis auf diese Basis (Commits oben).
2. Tabelle je Artikel, eine Zeile je Datei, erste Spalte genau der Pfad ohne Endung:

   ```
   | Artikel | Status | Geprüft gegen | Änderungen | Belegpfade |
   |---|---|---|---|---|
   | hilfe/<slug> | überarbeitet | Web 6686d05 / Mobile 837aab4f | … | `src/…` (web), `src/…` (mobile) |
   ```

   Zeilen beginnen mit `| blog/<slug> |`, `| hilfe/<slug> |` bzw. `| gewerke/<slug> |`. Status: `überarbeitet`, `neu` oder `geprüft ohne Änderung`. Jeder Bedienbegriff in „…“ hat einen Belegpfad (D-11).
3. Abschnitt `## Zitat-Ausnahmen`: eine Zeile je Begriff im Format `- „Begriff“ – Begründung` (z. B. Gesetzeswortlaut, Fachbegriff ohne Bildschirmbezug). Ohne Begründung gilt die Zeile nicht. Leer ist zulässig („Keine.“).
4. Abschnitt `## Übergabeliste`: alles, was das Paket nicht selbst ändern darf (Keyword-Map-Korrekturen, Registereinträge, Dateien anderer Besitzer nach D-27), je Punkt mit Empfänger (in der Regel 09-09).

## Zuordnung der Prüfdateien zu Plänen

| Prüfdatei | Paket | Pläne | Worktree / Port |
|---|---|---|---|
| `09-a.md` | (a) Gewerke | 09-02, 09-11, 09-13 | wt-09a / 3102 |
| `09-b.md` | (b) Ratgeber 1 | 09-03 | wt-09b / 3103 |
| `09-c.md` | (c) Ratgeber 2 | 09-04 | wt-09c / 3104 |
| `09-d.md` | (d) Hilfe Einrichtung/Büro | 09-05 | wt-09d / 3105 |
| `09-d2.md` | (d2) Schlussrechnung und Rechnungen | 09-17 | wt-09d2 / 3109 |
| `09-e.md` | (e) Hilfe Projekte/Zeiten | 09-06 | wt-09e / 3106 |
| `09-e2.md` | (e2) Baudokumentation und Lager | 09-18 | wt-09e2 / 3110 |
| `09-f.md` | (f) neue Hilfeartikel, L-1 in Produktdaten | 09-07, 09-14 | wt-09f / 3107 |
| `09-g.md` | (g) SEO-09-Wissensseiten | 09-08 | wt-09g / 3108 |

## Übergabeliste

- An 09-07/09-14 (f): Hilfeartikel „Kassenbuch führen“ mit den belegten Bezeichnungen oben; Keyword-Map-Eintrag und ggf. Registereintrag (`liveExtras`) über die eigene Übergabeliste an 09-09.
- An 09-17 (d2): § 13b in `hilfe/rechnung-fertigstellen` und `hilfe/e-rechnung-herunterladen` (Kundenschalter, Rechnungsschalter, Steuerart je Rechnungsfolge).
- An 09-06 (e): Zeitkorrektur und Sperre abgerechneter Zeiten in `hilfe/zeiteintrag-erfassen-korrigieren` (Web und App).
- An 09-05 (d): DATEV-Export setzt hinterlegte DATEV-Einstellungen voraus (`hilfe/datev-export-erstellen`).
- An 09-04 (c): Zeitkorrektur in `blog/projektbezogene-zeiterfassung`; DATEV-Einstellungen in `blog/datev-export-vorbereiten`.
- An 09-09 (Integration): Registereinträge für Kassenbuch und § 13b (`liveExtras`, Belegpfade oben) prüfen; Release-Sprünge nach `6686d05`/`837aab4f` nur als Delta.
