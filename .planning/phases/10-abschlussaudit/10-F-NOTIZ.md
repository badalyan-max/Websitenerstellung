# 10-F Notiz: Einrichtungsservice (D-41) und Datenstandort

Spur f, Worktree `C:/Projekte/wt-10f`, Branch `phase10-spur-f`, 23.10.2026.
Auftrag: Inhaber-Nachtrag D-41 (10-CONTEXT.md, „Nachtrag Inhaber (23.10.2026)“) und Zusatzauftrag des Orchestrators zum Datenstandort, dem der Inhaber am 23.10.2026 zugestimmt hat.

## Commits

- `8e592f3` test(10-f): Einrichtungsservice und Datenstandort aus zentraler Quelle (rot)
- `bfcf9b3` feat(10-f): Einrichtungsservice (D-41) und Datenstandort auf der Website
- diese Notiz: docs(10-f): Notiz Einrichtungsservice

## Zentrale Quellen

Beide Dateien kommen ohne Importe aus. `lib/site.ts` ist unverändert.

- `craftos/lib/einrichtung.ts` (Konstante `einrichtung`)
- `craftos/lib/datenstandort.ts` (Konstante `datenstandort`)

## Endgültiger Wortlaut

### Einrichtungsservice (`lib/einrichtung.ts`)

| Schlüssel | Wortlaut |
|---|---|
| `kern` (215 Zeichen, 2 Sätze) | Die Einrichtung ist kostenlos: Sie senden uns die Exportdateien Ihrer bisherigen Software, wir übernehmen Ihre Daten und richten Ihr Konto ein. So legen Sie direkt los, und bei Fragen sind wir persönlich für Sie da. |
| `wechsel` | Die Einrichtung ist kostenlos: Auf Wunsch übernehmen wir Ihre Daten und richten Ihr Konto ein. |
| `importSatz` | Auf Wunsch übernimmt das CraftOS-Team den Import kostenlos für Sie: Sie senden uns die Exportdateien, wir übernehmen Ihre Daten und richten Ihr Konto ein. |
| `tarifHinweis` | Einrichtung und Datenübernahme kostenlos. |
| `faqPreise.q` | Was kostet die Einrichtung? |
| `faqFakten.q` | Was kostet die Einrichtung von CraftOS? |
| `faqWechsel.q` | Wie gelingt der Wechsel zu CraftOS? |

Gegenüber dem Vorschlag heißt es „bei Fragen sind wir persönlich für Sie da“ statt „direkt für Sie da“. So steht „direkt“ nicht zweimal im Satz, und „persönlich“ greift die Inhaberangabe „begleitet persönlich“ auf. Die Formulierung enthält kein messbares Versprechen.

### Datenstandort (`lib/datenstandort.ts`)

| Schlüssel | Wortlaut |
|---|---|
| `kern` | CraftOS läuft in der Cloud: Ihre Daten liegen in einer Datenbank in Frankfurt am Main, Dateien speichern wir in europäischen Rechenzentren. |
| `faqPreise.q` | Wo liegen meine Daten? |
| `faqFakten.q` | Wo speichert CraftOS die Daten? |

Belege (vom Orchestrator geprüft, im Kopfkommentar der Datei festgehalten):

- Die Datenbank liegt bei Supabase im Projekt craft-connect-buddy, Region eu-central-1 (Frankfurt am Main).
- Dateien und Medien liegen in Cloudflare R2 mit dem Standorthinweis EEUR bzw. WEUR. Die Jurisdiktion steht auf „default“. Deshalb sagt die Website nur „europäische Rechenzentren“ und macht keine EU- oder Deutschland-Zusage.
- Die Web-App selbst zeigt den Hinweis „Hosting in der EU“ (QuoteSigning.tsx).
- CraftOS ist Cloud-Software.

Bewusst nicht genannt werden KI-Anbieter, E-Mail-Versand und Unterauftragnehmer. Ebenso fehlen die Aussagen „Server in Deutschland“, „ausschließlich“ und „deutsche Server“.

## Geänderte Orte

| Ort | Datei | Änderung |
|---|---|---|
| /preise | `lib/seiten/preise.ts` | Neue FAQ „Was kostet die Einrichtung?“ (`kern`) und neue FAQ „Wo liegen meine Daten?“ (Datenstandort), beide im FAQPage-JSON-LD. Die Preise-FAQ hat jetzt 8 Fragen, das Budget erlaubt höchstens 8. Die Anmerkung der Lizenztabelle endet jetzt mit „Einrichtung und Datenübernahme kostenlos.“ |
| /fakten-ueber-craftos | `lib/seiten/fakten.ts` | Neue FAQs „Was kostet die Einrichtung von CraftOS?“ und „Wo speichert CraftOS die Daten?“, beide im JSON-LD. Die Fakten-FAQ hat jetzt 6 Fragen. |
| llms.txt | `lib/llms.ts` | Nach „Testphase“ stehen zwei neue Zeilen: `- Einrichtung: …` und `- Datenstandort: …` |
| 4 Alternativen-Seiten | `lib/seiten/alternativen/index.ts` | Die Antwort unter „Wie wechseln Sie von {Name} zu CraftOS?“ endet jetzt mit dem Satz `wechsel`. |
| /vergleich/plancraft-alternative | `lib/seiten/alternativen/plancraft.ts` | Die bestehende Wechsel-FAQ „Kann ich von plancraft zu CraftOS wechseln?“ endet jetzt mit dem Satz `wechsel` (im JSON-LD). |
| /vergleich | `lib/seiten/vergleich.ts` | Neue FAQ „Wie gelingt der Wechsel zu CraftOS?“ (`kern`). Die FAQ hat jetzt 5 Fragen. |
| /vergleich/handwerkersoftware-kleine-betriebe | `lib/seiten/kleine-betriebe.ts` | Neue FAQ „Wie gelingt der Wechsel zu CraftOS?“ (`kern`). Die FAQ hat jetzt 5 Fragen. |
| /funktionen/datenuebernahme | `lib/funktionsdetails/team.ts` | Die FAQ „Was kostet die Import-KI?“ endet jetzt mit dem Satz `importSatz`. |
| /hilfe/daten-importieren | `content/hilfe/daten-importieren.md` | Der Einleitungsabsatz endet jetzt mit dem Satz `importSatz`, wörtlich übernommen. Die Schritte zum Selbst-Import mit kostenloser Import-KI bleiben unverändert. |

Alle Ergänzungen hängen an bestehende Texte an; kein bestehender Satz wurde umgeschrieben.

## Abweichungen und Entscheidungen

- **/fakten-ueber-craftos als FAQ statt FactList:** Die Produktfakten-FactList ist mit 12 Einträgen bereits am Budget (G5, `count.factList.max` = 12). Beide Faktenpunkte stehen deshalb in der FAQ. Dort erscheinen sie auch im FAQPage-JSON-LD.
- **Datenimport-FAQ:** Der Satz steht unter „Was kostet die Import-KI?“ und nicht unter „Aus welcher Software kann ich Daten übernehmen?“. Die Detailseiten-FAQ ist „zentral“ (`answerCentral` 300), und die Herkunftsantwort hätte mit dem Satz 397 Zeichen.
- **Startseiten-FAQ unverändert:** Keine der fünf Fragen handelt vom Start, vom Wechsel oder vom Datenschutz. „Wie lange kann ich CraftOS kostenlos testen?“ fragt nach der Testdauer, deshalb wurde dort nichts ergänzt.
- **Datenstandort auf Alternativen-Seiten und /vergleich nicht ergänzt:** Datenschutz und Hosting sind dort bisher kein Thema. Das einzige Vorkommen auf der Website ist die Rechtsseite /datenschutz.
- **FAQ-Leads unverändert:** Die Leads (z. B. „Kurze Antworten zu Test, Abo, Jahresrabatt und Credits.“) zählen die Themen nicht vollständig auf, wurden aber nach der Vorgabe „nicht umschreiben“ belassen. Eine Ergänzung kann 10-06 oder der Inhaber entscheiden.
- **plancraft-Seite:** Der Satz `wechsel` erscheint dort zweimal, im Abschnitt „Umstieg“ und in der Wechsel-FAQ. Der Auftrag verlangt, bestehende Wechsel-FAQs zu ergänzen.

## Hinweis an den Inhaber (nicht geändert)

`/datenschutz` sagt unter „Hosting & Server-Standort“: „Personenbezogene Daten werden auf Servern in der EU gespeichert.“ Bei R2 steht die Jurisdiktion auf „default“, eine EU-Bindung ist also nicht zugesichert. Ob dieser Rechtstext so bleiben kann, sollte der Inhaber prüfen. Die Spur hat den Rechtstext nicht angefasst.

## Prüfergebnisse

- **Rot:** Vor der Umsetzung schlugen in `tests/einrichtung.test.ts` und `tests/datenstandort.test.ts` 9 von 12 Tests fehl; die 3 Quelltests waren grün.
- **Gezielt (ohne Sperre):** 15 Testdateien, 707 von 707 Tests grün, darunter einrichtung, datenstandort, preise-seite, kernseiten, vergleich-seiten, llms, funktionsdetails, design-v2-budgets, nur-unterstuetzt, home, content, content-pruefung, announcements, pricing-parity und wettbewerber.
- **content-pruefen `--l1 --antwort`:** Für daten-importieren.md 0 Befunde. Über alle 84 Hilfe- und Blogdateien ebenfalls 0 Befunde und 0 Hinweise.
- **Unter der Sperre (12:26–12:27 UTC):**
  - Volle Vitest-Suite: 1404 von 1405 Tests grün, 48 von 49 Dateien.
  - Der eine Fehlschlag ist `tests/seo-meta.test.ts` (Z. 75, Titel von `/hilfe/mitarbeiter-einladen-lizenz-zuweisen` endet auf „ | CraftOS“). Er hängt nicht mit dieser Spur zusammen: Die Spur hat weder `docs/seo/keyword-map.json` noch diesen Artikel geändert.
  - Der bekannte Zeitüberlauf in content-produktwahrheit.test.ts trat in diesem Lauf nicht auf.
  - `tsc --noEmit`: Exit 0.
  - `eslint .`: Exit 0.
  - `next build`: Exit 0, 319 statische Seiten.
  - `seo-audit` für die 10 geänderten Pfade (/preise, /fakten-ueber-craftos, /vergleich, die vier Alternativen, kleine Betriebe, /funktionen/datenuebernahme, /hilfe/daten-importieren): 0 Verstöße in allen Regeln, darunter faq-schema, schema, antwort und duplikate.
- Es wurde kein Server gestartet; Port 3106 ist frei.

## Übergaben an 10-06

- **Sitemap-Datum:** In `app/sitemap.ts` stehen /preise, /fakten-ueber-craftos, /vergleich, die vier Alternativen und kleine Betriebe bereits auf `2026-10-23`. Der Hilfeartikel hat `updatedAt: 2026-10-23`.
  - **Offen:** `/funktionen/datenuebernahme` nimmt das globale `checkedAt` aus `lib/funktionen.ts`, derzeit `2026-10-22`. Die FAQ wurde aber am 23.10. ergänzt; bei Bedarf in 10-06 nachziehen.
- **live-check nach dem Rollout:** Diese Punkte gegen craftos.eu prüfen:
  - /preise enthält „Was kostet die Einrichtung?“, „Wo liegen meine Daten?“ und „Einrichtung und Datenübernahme kostenlos.“, beide neuen FAQs im FAQPage-JSON-LD.
  - /fakten-ueber-craftos enthält beide neuen FAQs.
  - /llms.txt enthält die Zeilen `- Einrichtung:` und `- Datenstandort:`.
  - Jede der vier `/vergleich/*-alternative` enthält „Die Einrichtung ist kostenlos: Auf Wunsch übernehmen wir Ihre Daten und richten Ihr Konto ein.“
  - /vergleich und /vergleich/handwerkersoftware-kleine-betriebe enthalten „Wie gelingt der Wechsel zu CraftOS?“.
  - /funktionen/datenuebernahme und /hilfe/daten-importieren enthalten „Auf Wunsch übernimmt das CraftOS-Team den Import kostenlos für Sie“.
- **IndexNow:** Die genannten Pfade und `/llms.txt` beim Rollout einreichen.
