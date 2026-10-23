---
title: "Leistungszeitraum und Leistungsdatum auf der Rechnung angeben"
description: "Wann ein Leistungsdatum genügt, wann ein Zeitraum auf die Rechnung gehört und wie Sie die Angabe in CraftOS erfassen und vor dem Fertigstellen prüfen."
category: "rechnungen"
publishedAt: "2026-10-23"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["rechnungen", "baudokumentation"]
relatedArticles: ["/hilfe/rechnung-fertigstellen", "/hilfe/berichte-abrechnen", "/blog/handwerkerrechnung-schreiben", "/hilfe/schlussrechnung-erstellen"]
sources: [{"url": "https://www.gesetze-im-internet.de/ustg_1980/__14.html", "label": "§ 14 UStG: Ausstellung von Rechnungen", "checkedAt": "2026-10-23"}, {"url": "https://www.gesetze-im-internet.de/ustdv_1980/__31.html", "label": "§ 31 UStDV: Angaben in der Rechnung", "checkedAt": "2026-10-23"}, {"url": "https://www.gesetze-im-internet.de/ustg_1980/__13.html", "label": "§ 13 UStG: Entstehung der Steuer", "checkedAt": "2026-10-23"}]
platforms: ["web"]
answer: "Der Leistungszeitraum zeigt, wann Sie die abgerechnete Arbeit ausgeführt haben, und gehört nach § 14 Absatz 4 Nummer 6 UStG zu den Pflichtangaben einer Rechnung. Für eine Arbeit an einem Tag genügt das Leistungsdatum, als Zeitpunkt darf auch der Kalendermonat der Ausführung stehen."
faq:
  - q: "Darf statt eines genauen Datums der Monat auf der Rechnung stehen?"
    a: "Ja. Nach § 31 Absatz 4 UStDV kann als Zeitpunkt der Leistung der Kalendermonat angegeben werden, in dem Sie die Leistung ausgeführt haben, zum Beispiel Oktober 2026."
  - q: "Was steht bei einer Anzahlung vor Arbeitsbeginn auf der Rechnung?"
    a: "Der Zeitpunkt, an dem Sie die Anzahlung erhalten haben, sofern er feststeht und vom Ausstellungsdatum abweicht. So regelt es § 14 Absatz 4 Nummer 6 UStG für Rechnungen über noch nicht ausgeführte Leistungen."
  - q: "Übernimmt CraftOS den Zeitraum aus Bautagesberichten?"
    a: "Ja. Erstellen Sie eine Rechnung aus Berichten, belegt CraftOS den Leistungszeitraum mit dem ersten und dem letzten Berichtstag vor. Im Rechnungsentwurf können Sie ihn danach anpassen."
  - q: "Was zeigt CraftOS, wenn das Ende vor dem Beginn liegt?"
    a: "Der Editor meldet „Ende liegt vor dem Beginn.“ und das Fertigstellen hält mit „Leistungszeitraum prüfen“ an. Korrigieren Sie die beiden Daten im Entwurf und starten Sie das Fertigstellen erneut."
---

Rechnungsdatum und Leistungsdatum sind zwei getrennte Angaben. Das Rechnungsdatum nennt den Tag, an dem Sie die Rechnung ausstellen. Der Leistungszeitraum nennt die Tage, an denen Ihr Team die Arbeit ausgeführt hat.

## Was verlangt das Umsatzsteuergesetz?

Eine Rechnung muss nach [§ 14 Absatz 4 Satz 1 Nummer 6 UStG](https://www.gesetze-im-internet.de/ustg_1980/__14.html) den Zeitpunkt der Lieferung oder sonstigen Leistung enthalten. Dauert die Arbeit mehrere Tage, nennen Sie den Zeitraum vom ersten bis zum letzten Arbeitstag.

Als Zeitpunkt darf nach [§ 31 Absatz 4 UStDV](https://www.gesetze-im-internet.de/ustdv_1980/__31.html) auch der Kalendermonat stehen, in dem die Leistung ausgeführt wurde. Für Anzahlungen auf eine noch nicht ausgeführte Leistung nennt die Rechnung nach § 14 Absatz 4 Nummer 6 UStG den Zeitpunkt der Vereinnahmung, sofern er feststeht und vom Ausstellungsdatum abweicht.

## Was zählt für die Umsatzsteuer: Rechnungsdatum oder Leistungsdatum?

Bei der Besteuerung nach vereinbarten Entgelten entsteht die Umsatzsteuer mit Ablauf des Voranmeldungszeitraums, in dem Sie die Leistung ausgeführt haben. Bei der Besteuerung nach vereinnahmten Entgelten zählt der Monat des Zahlungseingangs.

Beides regelt [§ 13 Absatz 1 Nummer 1 UStG](https://www.gesetze-im-internet.de/ustg_1980/__13.html) in den Buchstaben a und b. Für die Einordnung in Ihrer Einkommensteuer oder in Sonderfällen lassen Sie sich im Einzelfall steuerlich beraten.

## Wie geben Sie den Leistungszeitraum richtig an?

Nennen Sie für jede Rechnung genau die Tage oder den Monat, in denen die abgerechnete Arbeit stattfand. Die folgenden Beispiele zeigen typische Fälle aus dem Handwerk.

| Auftrag | Angabe auf der Rechnung |
|---|---|
| Reparatur an einem Tag | Leistungsdatum: 14.10.2026 |
| Badsanierung über drei Wochen | Leistungszeitraum: 05.10.2026 bis 23.10.2026 |
| Wartungseinsätze im Laufe eines Monats | Leistungszeitraum: Oktober 2026 |
| Anzahlung vor Arbeitsbeginn | Zeitpunkt der Vereinnahmung, wenn er feststeht und vom Rechnungsdatum abweicht |

Legen Sie den Zeitraum an den Bautagesberichten oder Zeiteinträgen des Projekts fest. So stimmt die Angabe mit Ihrer Dokumentation überein.

## So unterstützt CraftOS

Im Dokumenteditor der Web-App wählen Sie unter „Leistung“ zwischen „Zeitraum“ mit Beginn und Ende und „Einzelner Tag“ mit dem „Leistungsdatum“. Die Angabe erscheint auf dem Rechnungs-PDF als Leistungszeitraum oder Leistungsdatum.

Vor dem Festschreiben prüft CraftOS die Pflichtangaben nach § 14 Absatz 4 UStG. Fehlt der Leistungszeitpunkt, nennt der Dialog „Pflichtangaben fehlen“ den Punkt „Leistungszeitpunkt bzw. -zeitraum fehlt“, und Sie ergänzen ihn im Entwurf. Erstellen Sie die Rechnung über [Berichte abrechnen](/hilfe/berichte-abrechnen), ist der Zeitraum aus den Berichtstagen bereits vorbelegt.

## Schritt für Schritt in der Web-App

1. Öffnen Sie den Rechnungsentwurf im Dokumenteditor.
2. Wählen Sie unter „Leistung“ die Option „Zeitraum“ oder „Einzelner Tag“.
3. Tragen Sie Beginn und Ende der Ausführung oder das „Leistungsdatum“ ein.
4. Prüfen Sie in der Vorschau die Zeile mit dem Leistungszeitraum.
5. Klicken Sie „Fertigstellen“ und ergänzen Sie gemeldete Pflichtangaben im Entwurf.

Weitere Schritte bis zur festgeschriebenen Rechnung beschreibt [Rechnung fertigstellen](/hilfe/rechnung-fertigstellen).
