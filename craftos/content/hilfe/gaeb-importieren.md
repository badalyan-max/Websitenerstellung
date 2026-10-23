---
title: "Ein GAEB-Leistungsverzeichnis in ein Angebot importieren"
description: "So prüfen Sie GAEB-Datei, Positionsauswahl und Mengen vor dem Import in den Dokumenteditor und geben Angebote als X84 ab."
category: "angebote"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "CraftOS importiert Leistungsverzeichnisse als X83 im Format GAEB DA XML 3.2 (2013-10) oder 3.3 (2021-05) über „GAEB importieren“ im Angebotseditor. Nach dem Bepreisen geben Sie das Angebot mit „GAEB exportieren“ als X84 ab."
relatedFeatures: ["gaeb", "angebote"]
relatedArticles: ["/hilfe/angebotspositionen-leistungsvorlagen", "/hilfe/position-tiefenkalkulieren", "/hilfe/angebot-entwurf-anlegen"]
sources: []
platforms: ["web"]
---

## Voraussetzungen

- Voll-Lizenz (Admin oder Büro) und ein bearbeitbarer Angebotsentwurf in der Web-App.
- Die Original-Ausschreibung als X83 im Format GAEB DA XML 3.2 (2013-10) oder 3.3 (2021-05), UTF-8-codiert und bis 5 MiB groß.
- Die Dateiauswahl nimmt Dateien mit der Endung `.x83` oder `.gaeb` an. Die Formate erklärt der Ratgeber [GAEB-Formate](/blog/gaeb-formate).

## Schritt für Schritt: X83 importieren

1. Öffnen Sie das Angebot im Dokumenteditor.
2. Öffnen Sie das Menü „Weitere Aktionen“ und wählen Sie „GAEB importieren“.
3. Klicken Sie auf „Datei auswählen“ oder ziehen Sie die X83-Datei in das Feld.
4. Prüfen Sie Projekt, Auftraggeber und LV-Nummer aus der Datei.
5. Lesen Sie die „Hinweise“ zur eingelesenen Datei.
6. Öffnen Sie die „Positionsvorschau“ und kontrollieren Sie Titel, Positionen, Mengen und Einheiten.
7. Wählen Sie Positionen einzeln oder mit „Alle auswählen“ bzw. „Alle abwählen“.
8. Klicken Sie auf die Schaltfläche zum Importieren der gewählten Positionen.

## Schritt für Schritt: Angebot als X84 abgeben

1. Kalkulieren Sie die Preise der importierten Positionen im Editor.
2. Öffnen Sie das Menü „Weitere Aktionen“ und wählen Sie „GAEB exportieren“.
3. Wählen Sie die Austauschphase „X84 — Angebotsabgabe“.
4. Prüfen Sie unter „Bieteradresse prüfen“ Firmenname und Anschrift.
5. Bestätigen Sie, dass Sie alle Preise einschließlich der Nullpreise geprüft haben.
6. Erstellen Sie die X84-Datei und übermitteln Sie sie auf dem Weg, den der Auftraggeber vorgibt.

## Ergebnis prüfen

Die gewählten Positionen stehen im Angebot. Vergleichen Sie Anzahl, Reihenfolge und Mengen mit dem Original sowie die Gesamtsumme in der Vorschau.

Für die X84-Abgabe übernehmen Sie das Original-LV vollständig einschließlich aller Titel; der Dialog weist darauf hin, solange nicht alle Positionen gewählt sind. Als X83 exportieren Sie Mengen, Einheiten und Leistungstexte ohne Angebotspreise.

## Häufige Probleme

### Was tun, wenn „Datei kann nicht übernommen werden“ erscheint?

Die Meldung nennt den Grund, etwa Dateigröße, Zeichencodierung oder fehlendes GAEB-XML. Fordern Sie beim Absender die originale X83-Datei als GAEB DA XML 3.2 oder 3.3 in UTF-8 an.

### Warum lässt sich X84 nicht auswählen?

Für X84 braucht CraftOS die vollständig übernommene X83-Originalausschreibung. Importieren Sie das Original-LV mit allen Titeln und Positionen in das Angebot und öffnen Sie danach den Export erneut.

### Wie vermeide ich doppelte Positionen?

Prüfen Sie vor dem Import, ob das Angebot schon Positionen enthält. Nach der Erfolgsmeldung importieren Sie dieselbe Datei nicht erneut, sondern vergleichen die Liste mit dem Original.

Die [GAEB-Funktion](/funktionen/gaeb) zeigt den Ablauf von der Ausschreibung bis zur Angebotsabgabe; [Positionen und Leistungsvorlagen](/hilfe/angebotspositionen-leistungsvorlagen) erklärt die weitere Kalkulation.
