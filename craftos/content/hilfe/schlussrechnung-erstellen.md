---
title: "Eine Schlussrechnung mit bisherigen Abschlägen erstellen"
description: "So prüfen Sie Abnahme, Gesamtleistung und erhaltene Zahlungen vor der endgültigen Projektabrechnung."
category: "rechnungen"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Eine Schlussrechnung erstellen Sie in der Web-App nach der Abnahme: Öffnen Sie Auftrag, Angebot oder Abschlagsrechnung des Projekts, klicken Sie auf „Rechnung erstellen“ und wählen Sie „Schlussrechnung“. CraftOS setzt die gestellten Abschläge ab und weist den Restbetrag aus."
faq:
  - q: "Wann kann ich in CraftOS eine Schlussrechnung erstellen?"
    a: "Nach der Abnahme des Projekts. Bis dahin zeigt die Option „Schlussrechnung“ den Hinweis „Erst nach Abnahme möglich“. Die Abnahme dokumentieren Sie im Projekt unter „Baudokumentation“ oder übernehmen ein in der Mobile-App unterschriebenes Protokoll."
  - q: "Wie verrechnet CraftOS die Abschläge in der Schlussrechnung?"
    a: "Unter „Verrechnung der Abschläge“ steht jede Abschlagsrechnung mit Netto, Umsatzsteuer und Brutto. CraftOS zieht sie von der Gesamtleistung ab und weist den „Restbetrag“ aus; noch offene Vorrechnungen nennt ein Hinweis mit dem offenen Betrag."
  - q: "Gibt es ein Muster für die Schlussrechnung?"
    a: "Ja. Die Tabelle in dieser Anleitung zeigt die Pflichtangaben nach § 14 UStG mit Beispielwerten. Firmendaten, Kunde, Positionen und Steuerbeträge übernimmt CraftOS aus Einstellungen, Kundendaten und Auftrag; die Rechnungsnummer vergibt das Fertigstellen."
  - q: "Wer darf eine Abnahme aus der Mobile-App übernehmen?"
    a: "Büro-Leitung oder Inhaber. Sie übernehmen das unterschriebene Protokoll in der Projektübersicht mit „Abnahme übernehmen“, solange das Projekt „Beauftragt“ oder „In Ausführung“ ist. Danach gibt CraftOS die Schlussrechnung frei."
  - q: "Gilt eine Rechnung nach § 13b auch für die Schlussrechnung?"
    a: "Ja. Die Steuerart gilt für die ganze Rechnungsfolge aus Abschlägen und Schlussrechnung. Seit der ersten festgeschriebenen Rechnung ist sie festgelegt; der Schalter „Rechnung nach § 13b (ohne USt.)“ zeigt das im Editor an."
relatedFeatures: ["rechnungen", "projektverwaltung"]
relatedArticles: ["/hilfe/abschlagsrechnung-erstellen", "/hilfe/abnahme-dokumentieren", "/hilfe/zahlungen-erfassen", "/blog/abschlagsrechnung-schlussrechnung"]
sources: [{"url": "https://www.gesetze-im-internet.de/ustg_1980/__14.html", "label": "Umsatzsteuergesetz § 14 – Ausstellung von Rechnungen", "checkedAt": "2026-10-23"}, {"url": "https://www.gesetze-im-internet.de/bgb/__650g.html", "label": "Bürgerliches Gesetzbuch § 650g – Abnahme und Schlussrechnung", "checkedAt": "2026-10-23"}, {"url": "https://www.gesetze-im-internet.de/ustg_1980/__14a.html", "label": "Umsatzsteuergesetz § 14a – zusätzliche Pflichten, u. a. bei § 13b", "checkedAt": "2026-10-23"}]
platforms: ["web"]
---

## Voraussetzungen

- Voll-Lizenz (Admin oder Büro) und Zugriff auf das Projekt in der Web-App.
- Das Projekt hat einen Auftrag oder ein angenommenes Angebot.
- Die Abnahme ist erfasst. Vorher zeigt die Option „Schlussrechnung“ den Hinweis „Erst nach Abnahme möglich“.
- Die Abnahme erfassen Sie im Projekt unter „Baudokumentation“ mit „Abnahme durchführen“; sie erscheint dort als „Schlussabnahme“.
- Ein in der Mobile-App unterschriebenes Protokoll übernehmen Büro-Leitung oder Inhaber in der Projektübersicht mit „Abnahme übernehmen“, solange das Projekt „Beauftragt“ oder „In Ausführung“ ist.

## Schritt für Schritt

1. Erfassen Sie eingegangene Zahlungen auf den Abschlagsrechnungen, damit die Verrechnung stimmt.
2. Öffnen Sie das Projekt und wechseln Sie zum Reiter „Dokumente“.
3. Öffnen Sie den Auftrag, das angenommene Angebot oder eine Abschlagsrechnung des Projekts.
4. Klicken Sie auf „Rechnung erstellen“.
5. Wählen Sie im Dialog die Option „Schlussrechnung“.
6. Klicken Sie unten im Dialog auf „Schlussrechnung“, um den Entwurf zu öffnen.
7. Prüfen Sie im Editor die gesamte ausgeführte Leistung einschließlich vereinbarter Nachträge.
8. Prüfen Sie Vorschau, Steuerangaben und Zahlungsziel.
9. Klicken Sie auf „Fertigstellen“.

## Ergebnis prüfen

Die Schlussrechnung steht mit ihrer Nummer im Projekt unter „Dokumente“. In den Dokumentdetails listet „Verrechnung der Abschläge“ jede Abschlagsrechnung mit Netto, Umsatzsteuer und Brutto; darunter stehen „Gesamtleistung (brutto)“ und „Restbetrag“.

Die Gesamtleistung ist der Wert des ganzen Auftrags, nicht nur der offene Rest. Der Restbetrag ergibt sich erst aus Gesamtleistung minus verrechneter Abschläge.

## Welche Angaben gehören in eine Schlussrechnung?

Eine Schlussrechnung enthält alle Pflichtangaben einer Rechnung nach § 14 Absatz 4 UStG und setzt die vorab bezahlten Abschläge mit ihren Steuerbeträgen ab (§ 14 Absatz 5 UStG). Die Tabelle zeigt ein Muster mit Beispielwerten.

| Pflichtangabe | Muster |
|---|---|
| Name und Anschrift des Betriebs | Muster Bau GmbH, Hauptstraße 1, 12345 Musterstadt |
| Name und Anschrift des Kunden | Familie Weber, Lindenstraße 5, 12345 Musterstadt |
| Steuernummer oder USt-IdNr. des Betriebs | 12/345/67890 |
| Rechnungsdatum | 23.10.2026 |
| Fortlaufende Rechnungsnummer | RE-2026-0042 |
| Art und Umfang der Leistung | Badsanierung laut Auftrag AB-2026-0017 mit Nachtrag 1 |
| Zeitpunkt der Leistung | Leistungszeitraum 01.09.2026 bis 15.10.2026 |
| Entgelt nach Steuersätzen | Gesamtleistung netto 20.000,00 € |
| Steuersatz und Steuerbetrag | 19 % Umsatzsteuer: 3.800,00 € |
| Abzug bezahlter Abschläge | 2 Abschläge: netto 12.000,00 € zuzüglich 2.280,00 € Umsatzsteuer |
| Restbetrag | 9.520,00 € brutto |
| Bei Bauleistungen nach § 13b | Hinweis „Steuerschuldnerschaft des Leistungsempfängers“ statt Steuerbetrag |

Ob eine Angabe in Ihrem Fall nötig ist, klären Sie im Zweifel mit Ihrer Steuerberatung. Fällig wird die Vergütung nach § 650g BGB, wenn das Werk abgenommen ist und eine prüffähige Schlussrechnung vorliegt.

## Häufige Probleme

### Warum ist die Option „Schlussrechnung“ nicht wählbar?

Die Abnahme fehlt noch oder es gibt bereits eine Schlussrechnung. Der Dialog nennt den Grund, zum Beispiel „Abnahme muss zuerst durchgeführt werden“ oder „Schlussrechnung existiert bereits“.

### Warum stimmt der Restbetrag nicht?

Vergleichen Sie Gesamtleistung, Abschlagsrechnungen, erfasste Zahlungen und Stornos einzeln. Noch nicht vollständig bezahlte Vorrechnungen zeigt CraftOS über der Verrechnung mit dem offenen Betrag an.

### Wie korrigiere ich eine fertiggestellte Schlussrechnung?

Über ein Storno mit „Stornogrund (Pflicht)“. Mit „Rechnung neu ausstellen“ öffnet CraftOS danach einen neuen Entwurf mit denselben Positionen; die Schritte stehen unter [Rechnung stornieren](/hilfe/rechnung-stornieren).

Mehr zum Ablauf finden Sie unter [Abnahme dokumentieren](/hilfe/abnahme-dokumentieren), im [Ratgeber zu Abschlag und Schlussrechnung](/blog/abschlagsrechnung-schlussrechnung) und bei der [Rechnungsfunktion](/funktionen/rechnungen).
