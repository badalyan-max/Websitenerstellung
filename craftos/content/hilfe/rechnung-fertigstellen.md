---
title: "Eine Rechnung prüfen und endgültig fertigstellen"
description: "So kontrollieren Sie einen Rechnungsentwurf, vergeben die endgültige Nummer und erhalten einen gesperrten Dokumentstand."
category: "rechnungen"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Mit „Dokument fertigstellen“ vergibt CraftOS die endgültige Rechnungsnummer, legt den Dokumentstand als Version ab und sperrt die Rechnung für Änderungen. Prüfen Sie vorher Empfänger, Positionen, Steuerart und Zahlungsziel im Entwurf."
relatedFeatures: ["rechnungen", "e-rechnung", "mahnwesen"]
relatedArticles: ["/hilfe/leistungszeitraum-rechnung", "/blog/reverse-charge-bauleistungen", "/hilfe/mahnwesen-einrichten", "/hilfe/rechnung-stornieren"]
sources: [{"url": "https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html", "label": "Bundesfinanzministerium: GoBD im Amtlichen AO-Handbuch 2025", "checkedAt": "2026-10-23"}, {"url": "https://www.gesetze-im-internet.de/ustg_1980/__14.html", "label": "Umsatzsteuergesetz § 14 – Ausstellung von Rechnungen", "checkedAt": "2026-10-23"}, {"url": "https://www.gesetze-im-internet.de/ustg_1980/__13b.html", "label": "Umsatzsteuergesetz § 13b – Leistungsempfänger als Steuerschuldner", "checkedAt": "2026-10-23"}]
platforms: ["web"]
---

## Voraussetzungen

- Voll-Lizenz (Admin oder Büro) mit Zugriff auf Rechnungen in der Web-App.
- Ein gespeicherter Rechnungsentwurf mit Kunde und Positionen.
- Vollständige Firmendaten in den Einstellungen, damit alle Pflichtangaben auf der Rechnung stehen.

## Schritt für Schritt

1. Öffnen Sie die Rechnung unter „Dokumente“ im Editor.
2. Prüfen Sie Rechnungsempfänger, Projekt, Leistungszeitpunkt und Positionen.
3. Vergleichen Sie Mengen, Netto-, Steuer- und Bruttosummen mit dem tatsächlichen Auftrag.
4. Prüfen Sie den Schalter „Rechnung nach § 13b (ohne USt.)“, wenn Sie Bauleistungen an einen Bauleister abrechnen.
5. Legen Sie das „Zahlungsziel“ fest.
6. Speichern Sie den Entwurf und prüfen Sie die „PDF-Vorschau“.
7. Öffnen Sie im Editor das Menü „Weitere Aktionen“ und wählen Sie „Dokument fertigstellen“.
8. Ergänzen Sie gemeldete Angaben im Entwurf, wenn der Dialog „Pflichtangaben fehlen“ erscheint.
9. Bestätigen Sie den Abschluss, wenn der Dialog „Vor dem Festschreiben prüfen“ nur Hinweise zeigt.

## Ergebnis prüfen

Die Rechnung trägt ihre endgültige Nummer und ist gesperrt; CraftOS hat den Dokumentstand als Version abgelegt. Abschlags- und Schlussrechnungen prüfen Sie zusätzlich gegen bisherige Rechnungen, Zahlungen und den Projektstatus.

Nach dem Zahlungsziel gilt die Rechnung als überfällig. Sind unter „Einstellungen → Mahnwesen“ die „Automatische Mahnungen“ eingeschaltet, mahnt CraftOS überfällige normale Rechnungen täglich nach Ihren Fristen per E-Mail. Die Einrichtung zeigt [Mahnwesen einrichten](/hilfe/mahnwesen-einrichten).

## Wie stelle ich eine Rechnung nach § 13b fertig?

Schalten Sie im Editor „Rechnung nach § 13b (ohne USt.)“ ein, bevor Sie fertigstellen. Die Rechnung weist dann keine Umsatzsteuer aus und trägt den Hinweis „Steuerschuldnerschaft des Leistungsempfängers gemäß § 13b UStG.“

Der Schalter steht umsatzsteuerpflichtigen Betrieben zur Verfügung. Bei Kunden mit „Bauleister nach § 13b“ ist er für neue Belege vorbelegt. Die Steuerart gilt für die ganze Rechnungsfolge: Seit der ersten festgeschriebenen Rechnung zeigt der Editor „Die Steuerart ist seit der ersten festgeschriebenen Rechnung festgelegt.“

## Häufige Probleme

### Was tun, wenn „Pflichtangaben fehlen“ erscheint?

Der Dialog nennt die fehlenden Angaben nach § 14 Absatz 4 UStG. Ergänzen Sie sie im Entwurf oder in den Firmendaten und wählen Sie danach erneut „Dokument fertigstellen“.

### Warum meldet CraftOS „Entwurf gespeichert“ statt der fertigen Rechnung?

CraftOS hat zuerst Ihre letzten Änderungen gespeichert. Klicken Sie erneut auf „Fertigstellen“, um die Rechnung festzuschreiben.

### Wie korrigiere ich eine fertiggestellte Rechnung?

Über ein Storno mit Gegenbeleg; mit „Rechnung neu ausstellen“ öffnet CraftOS danach einen neuen Entwurf. Die Schritte stehen unter [Rechnung stornieren](/hilfe/rechnung-stornieren).

### Wie unterstützt das Fertigstellen die GoBD?

Nummernvergabe, Versionierung und Sperre machen den Ablauf nachvollziehbar. Ihre betrieblichen Abläufe und Kontrollen beschreiben Sie zusätzlich in Ihrer Verfahrensdokumentation; die [GoBD](https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html) nennen die Anforderungen.

Weitere Informationen finden Sie unter [GoBD in CraftOS](/gobd) und beim [E-Rechnungsdownload](/hilfe/e-rechnung-herunterladen).
