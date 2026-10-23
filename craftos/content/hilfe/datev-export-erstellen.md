---
title: "Einen DATEV-Export für die Steuerkanzlei erstellen"
description: "So führen Sie Zeitraumprüfung, Festschreibung und Dateiausgabe durch und kontrollieren die tatsächliche Übergabe."
category: "belege"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Den DATEV-Export starten Sie unter „Buchhaltung → Steuerberater“ oder im „Buchungsjournal“ mit „An Steuerberater übergeben“: Zeitraum wählen, prüfen, festschreiben und das Paket herunterladen. Voraussetzung sind hinterlegte DATEV-Einstellungen mit Kontenrahmen."
relatedFeatures: ["buchhaltung", "eingangsrechnungen"]
relatedArticles: ["/blog/datev-export-vorbereiten", "/hilfe/kassenbuch-fuehren", "/hilfe/beleg-kontieren-zuordnen", "/hilfe/firmenprofil-einrichten"]
sources: [{"url": "https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html", "label": "Bundesfinanzministerium: GoBD im Amtlichen AO-Handbuch 2025", "checkedAt": "2026-10-23"}, {"url": "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2025-07-14-GoBD-2-aenderung.html", "label": "Bundesfinanzministerium: zweite GoBD-Änderung vom 14. Juli 2025", "checkedAt": "2026-10-23"}]
platforms: ["web"]
---

## Voraussetzungen

- Web-App mit Voll-Lizenz und Finanzrechten („Globale Finanzbereiche“) für den Bereich „Buchhaltung“.
- Hinterlegte DATEV-Einstellungen unter „Einstellungen → DATEV-Export“: „Standard-Kontenrahmen“ (SKR03 oder SKR04) sowie „Beraternummer“ und „Mandantennummer“ von Ihrer Steuerkanzlei.
- Geprüfte Eingangsbelege und fertiggestellte Rechnungen im gewünschten Zeitraum.

## Schritt für Schritt

1. Öffnen Sie „Buchhaltung → Steuerberater“ oder klicken Sie im „Buchungsjournal“ auf „An Steuerberater übergeben“.
2. Wählen Sie unter „Welchen Zeitraum übergibst du?“ den Zeitraum, zum Beispiel „Letzter Monat“.
3. Lesen Sie im Schritt „Prüfung“ die Ergebnisse unter „Ist alles vollständig?“.
4. Beheben Sie gemeldete Punkte, etwa Eingangsbelege mit dem Kennzeichen „Zu prüfen“.
5. Klicken Sie auf „Weiter zum Festschreiben“.
6. Setzen Sie den Haken bei „Ich verstehe, dass die Belege endgültig festgeschrieben werden.“
7. Klicken Sie auf „Jetzt festschreiben“.
8. Klicken Sie unter „Übergabe-Paket herunterladen“ auf „Steuerberater-Paket (ZIP) — empfohlen“ oder „Nur Buchungsdaten (CSV)“.
9. Übergeben Sie die heruntergeladene Datei Ihrer Steuerkanzlei.

Das Steuerberater-Paket enthält fünf Bausteine: DATEV-Buchungsstapel (EXTF), Belege (Rechnungs-PDFs, Belegbilder, XRechnung), Buchungsjournal, Offene-Posten-Liste und Zeiten-Nachweis. Exportiert werden die festgeschriebenen Belege des Zeitraums nach dem hinterlegten Kontenrahmen. Zahlungen erfassen Sie auch nach dem Festschreiben weiter.

## Ergebnis prüfen

CraftOS meldet „Fertig!“ mit der Zahl der Rechnungen und Belege und der Gesamtsumme. Kontrollieren Sie Zeitraum und Anzahl in der Datei. Mit „Per E-Mail ankündigen“ öffnen Sie einen E-Mail-Entwurf; die heruntergeladene Datei hängen Sie selbst an. Über der Übergabe zeigt CraftOS „Zuletzt übergeben“ mit dem Monat des letzten Exports.

## Häufige Probleme

### Was bedeutet „DATEV-Einstellungen fehlen. Bitte Inhaber fragen.“?

Für den Export braucht CraftOS den Kontenrahmen Ihres Betriebs. Hinterlegen Sie unter „Einstellungen → DATEV-Export“ den „Standard-Kontenrahmen“ und speichern Sie mit „Einstellungen speichern“.

### Was bedeutet „Berater-/Mandantennummer fehlt“?

Beraternummer und Mandantennummer stehen im Kopf jeder DATEV-Datei, damit die Kanzlei den Export zuordnen kann. Tragen Sie beide unter „DATEV-Stammdaten (vom Steuerberater)“ ein.

### Warum fehlen Belege im Export?

Der Export enthält festgeschriebene Belege. Bestätigen Sie offene Prüfungen unter „Buchhaltung → Belege → Eingangsbelege“ und stellen Sie Rechnungs-Entwürfe fertig; danach durchlaufen Sie die Übergabe für den Zeitraum erneut.

### Wer erstellt die Umsatzsteuer-Voranmeldung?

Die Umsatzsteuer-Voranmeldung erstellt Ihre Steuerkanzlei oder Sie selbst aus den exportierten Daten. Die Organisation der Übergabe erklärt [DATEV-Export vorbereiten](/blog/datev-export-vorbereiten), Festschreibung und Nachvollziehbarkeit erklärt [GoBD in CraftOS](/gobd) mit Bezug auf die [amtlichen Grundsätze](https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html).
