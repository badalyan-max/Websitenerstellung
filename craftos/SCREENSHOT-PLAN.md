# Screenshot-Plan — benötigte App-Screenshots für craftos.eu

> **Stand 08.07.2026:** Alle 17 verbliebenen Slots sind mit echten App-Screenshots
> befüllt (aufgenommen per Playwright aus Web-App + Mobile-App, Demo-Account mit
> Beispieldaten). `kundenportal-freigabe` wurde ersatzlos **entfernt** (Entscheidung
> 08.07.: kein sinnvolles Motiv; die Kundenportal-Seite zeigt keine Einblick-Sektion
> mehr, Gewerke-Blöcke nutzen stattdessen `rechnung-dokument`). `lager-scan` zeigt
> statt Barcode-Scan (existiert nicht in der App) ehrlich den Wareneingang-Dialog
> mit KI-Belegscan und ist auf die Variante `fragment` umgestellt.

Die Website hat jetzt **definierte Screenshot-Plätze** (Komponente `ScreenshotFrame`).
Solange eine Datei fehlt, zeigt die Seite einen sauberen Werkbank-Platzhalter mit dem
Motiv-Namen — es bricht also nichts. Sobald ein Screenshot vorliegt:

1. Datei ablegen unter `craftos/public/images/screenshots/<key>.webp` (oder `.png`)
2. In `craftos/lib/images.ts` im `screenshots`-Objekt eintragen (src, width, height, alt)

**Formatvorgaben**
- **Desktop-Ansichten** (`fragment`/`tilt-stack`): 1600×1000 px (16:10) bzw. Dokumente 1200×1600 px (3:4), WebP, ohne Browser-Fenster drumherum (nur die App-Oberfläche), dunkles Werkbank-Theme der App
- **Handy-Ansichten** (`phone`): 900×1800 px (9:18), reiner App-Inhalt ohne Geräterahmen (der Rahmen kommt von der Website)
- Beispieldaten verwenden, die glaubwürdig wirken (echte Positionen, echte Beträge) — keine Kundennamen echter Kunden

## Benötigte Motive (18 Slots)

| # | Key (Dateiname) | Format | Motiv |
|---|---|---|---|
| 1 | `angebot-maske` | Desktop 16:10 | Angebotsmaske mit Positionen + Kalkulation, z. B. Elektro: „300m NYM-J 3×1,5 mm² verlegen", „FI-Schutzschalter 40 A" — Summen sichtbar |
| 2 | `angebot-aufmass` | Phone | Aufmaß-Erfassung in der App: Raum mit Flächen + Abzügen |
| 3 | `rechnung-dokument` | Dokument 3:4 | Fertige Rechnung als PDF-Ansicht mit GiroCode unten |
| 4 | `rechnung-mahnwesen` | Desktop 16:10 | Offene Posten / Mahnwesen mit den 3 Mahnstufen |
| 5 | `beleg-scan` | Phone | Belegscan: fotografierte Eingangsrechnung mit KI-erkannten Feldern (Betrag, Lieferant) |
| 6 | `datev-export` | Desktop 16:10 | Steuer-Cockpit oder DATEV-Export-Ansicht mit Kontierung (SKR03) |
| 7 | `plantafel-woche` | Desktop 16:10 | Plantafel-Wochenansicht: mehrere Mitarbeiter-Zeilen, farbige Einsatz-Balken |
| 8 | `plantafel-app` | Phone | Push/Einsatz-Änderung aus Sicht des Monteurs („Einsatz verschoben auf Do") |
| 9 | `zeiterfassung-app` | Phone | Laufender Timer + Tagesliste der gebuchten Zeiten |
| 10 | `zeiterfassung-konto` | Desktop 16:10 | Arbeitszeitkonto/Urlaubsübersicht im Büro |
| 11 | `lager-bestand` | Desktop 16:10 | Lagerübersicht: Bestände über Hauptlager + Montagebus |
| 12 | `lager-scan` | Desktop 16:10 | Wareneingang-Dialog mit KI-Belegscan (Barcode-Scan existiert in der App nicht) |
| 13 | `baudoku-bericht` | Phone | Bautagesbericht: Fotos + Wetter + Unterschriftenfeld |
| 14 | `baudoku-akte` | Desktop 16:10 | Digitale Projektakte mit Ordnern, Fotos, Berichten |
| 15 | `team-rollen` | Desktop 16:10 | Team-/Rollenverwaltung (Admin, Büro, Monteur, Nachunternehmer) |
| 16 | ~~`kundenportal-freigabe`~~ | — | Entfernt (08.07.2026): kein sinnvolles Motiv fürs Kundenportal |
| 17 | `nachkalkulation-dashboard` | Desktop 16:10 | Soll/Ist eines Projekts: Zeiten, Material, Marge |
| 18 | `craft-ai-chat` | Desktop 16:10 | Craft-AI-Chat mit einer Frage + Antwort inkl. Draft-Karte |

## Wo die Slots verwendet werden

- **Startseite**: Screenshot-Dock neben der Bauablauf-Rail (`plantafel-woche`, `zeiterfassung-app`, `rechnung-dokument`)
- **Funktions-Detailseiten**: Sektion „Einblick" (je 1–2 Slots pro Modul, siehe Tabelle)
- **Gewerke-Detailseiten**: Z-Pattern-Erklärblöcke (nutzen die Modul-Hauptscreenshots je nach Gewerk)

**Priorität, falls du nicht alle auf einmal machst:** 7 → 9 → 1 → 3 → 5 → 11 → 13 (die sichtbarsten Plätze zuerst).
