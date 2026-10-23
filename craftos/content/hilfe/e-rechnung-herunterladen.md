---
title: "Eine XRechnung oder ZUGFeRD-Rechnung herunterladen"
description: "So wählen Sie das Ausgabeformat, ergänzen Empfängerreferenzen und kontrollieren die erzeugte E-Rechnungsdatei."
category: "rechnungen"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Öffnen Sie die Rechnung in der Web-App, wählen Sie unter „Weitere Aktionen“ den Punkt „E-Rechnung herunterladen (XRechnung/ZUGFeRD)“ und entscheiden Sie sich für „XRechnung“ als XML oder „ZUGFeRD“ als hybrides PDF. CraftOS prüft vor dem Download die Pflichtangaben."
relatedFeatures: ["e-rechnung", "rechnungen"]
relatedArticles: ["/blog/xrechnung-zugferd-pdf-unterschiede", "/hilfe/rechnung-fertigstellen", "/hilfe/kunden-ansprechpartner-anlegen"]
sources: [{"url": "https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html", "label": "Bundesfinanzministerium: FAQ zur E-Rechnung, Stand März 2026", "checkedAt": "2026-10-23"}, {"url": "https://www.gesetze-im-internet.de/ustg_1980/__14a.html", "label": "Umsatzsteuergesetz § 14a – Rechnungsangabe bei § 13b", "checkedAt": "2026-10-23"}]
platforms: ["web"]
---

## Voraussetzungen

- Voll-Lizenz (Admin oder Büro) mit Zugriff auf Rechnungen in der Web-App.
- Eine fertiggestellte Rechnung, zum Beispiel eine normale Rechnung, Schlussrechnung oder Stornorechnung.
- Vollständige Firmendaten in den Einstellungen und eine E-Mail-Adresse des Kunden als elektronische Zustelladresse.
- Bei einer Rechnung nach § 13b: die USt-IdNr. des Kunden in den Kundendaten.

## Schritt für Schritt

1. Öffnen Sie die Rechnung in den Dokumentdetails.
2. Öffnen Sie das Menü „Weitere Aktionen“ mit den drei Punkten.
3. Wählen Sie „E-Rechnung herunterladen (XRechnung/ZUGFeRD)“.
4. Wählen Sie „XRechnung“ für die XML-Datei oder „ZUGFeRD“ für das hybride PDF.
5. Tragen Sie unter „Leitweg-ID / Käuferreferenz“ die Referenz ein, die Ihr Kunde vorgibt.
6. Ergänzen Sie bei Bedarf Bestellnummer, Auftragsnummer und Kontaktdaten des Käufers.
7. Schalten Sie „VOB/B-Bauleistung“ ein, wenn der Auftrag nach VOB/B vereinbart ist.
8. Klicken Sie auf „XRechnung herunterladen“ bzw. „ZUGFeRD herunterladen“.

## Ergebnis prüfen

XRechnung liefert eine XML-Datei im Format XRechnung 3.0 (UBL 2.1). ZUGFeRD erzeugt ein lesbares PDF/A-3 mit eingebetteten Rechnungsdaten.

Öffnen Sie die Datei in einem E-Rechnungs-Viewer und vergleichen Sie Empfänger, Leistung, Datum und Beträge mit der Rechnung in CraftOS. Bei öffentlichen Auftraggebern gehören Leitweg-ID und Lieferantennummer in die Datei.

## Wie erstelle ich eine E-Rechnung nach § 13b?

Schalten Sie im Rechnungs-Editor „Rechnung nach § 13b (ohne USt.)“ ein und hinterlegen Sie beim Kunden die USt-IdNr. Die E-Rechnung trägt dann den Hinweis „Steuerschuldnerschaft des Leistungsempfängers“ und die USt-IdNr. des Kunden.

Für Bauleister-Kunden legen Sie im Kundendialog „Bauleister nach § 13b“ fest; neue Belege dieses Kunden sind dann ohne Umsatzsteuer vorbelegt. Das Feld „USt-IdNr.“ zeigt dort den Hinweis „Für E-Rechnungen nach § 13b erforderlich.“

## Häufige Probleme

### Was bedeutet „Für eine gültige E-Rechnung fehlen noch Pflichtangaben“?

Der Dialog listet die fehlenden Angaben, etwa die Käuferreferenz, die E-Mail-Adresse des Kunden oder die „USt-IdNr. des Kunden für § 13b (Kundenstammdaten)“. Ergänzen Sie sie und erzeugen Sie die Datei erneut.

### Wie ergänze ich fehlende Firmendaten?

Klicken Sie im Dialog auf „Firmendaten öffnen“ bzw. „Einstellungen öffnen“ und vervollständigen Sie die genannten Stammdaten. Danach öffnen Sie den Download erneut aus der Rechnung.

### Was tun, wenn der Empfänger die Datei zurückweist?

Vergleichen Sie seine Meldung mit Referenz, Format und Pflichtangaben und korrigieren Sie die Quelle in CraftOS. Erzeugen Sie die Datei danach neu aus dem gespeicherten Rechnungsstand.

Der [Formatratgeber](/blog/xrechnung-zugferd-pdf-unterschiede) und die [FAQ des Bundesfinanzministeriums](https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html) erklären die Einordnung; die [E-Rechnungsfunktion](/funktionen/e-rechnung) zeigt den Ablauf in CraftOS.
