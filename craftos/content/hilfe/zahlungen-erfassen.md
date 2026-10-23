---
title: "Eine Zahlung zu einer Rechnung erfassen"
description: "So buchen Sie tatsächlich eingegangene Teil- oder Vollzahlungen mit Datum und Referenz am Rechnungsdokument."
category: "belege"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Eine eingegangene Zahlung erfassen Sie an der Rechnung im Abschnitt „Zahlungen“ mit „Zahlung erfassen“. Zahlungen aus importierten Bankumsätzen ordnen Sie unter „Buchhaltung → Bankumsätze“ zu; alle erfassten Zahlungen listet „Buchhaltung → Belege → Zahlungseingänge“."
relatedFeatures: ["bankabgleich", "rechnungen", "buchhaltung"]
relatedArticles: ["/blog/offene-posten-liquiditaet", "/hilfe/schlussrechnung-erstellen", "/hilfe/rechnung-fertigstellen"]
sources: []
platforms: ["web"]
---

## Voraussetzungen

- Web-App mit Voll-Lizenz; der Bereich „Buchhaltung“ erscheint mit Finanzrechten („Globale Finanzbereiche“).
- Eine fertiggestellte Rechnung mit Rechnungsnummer.
- Betrag, Zahlungsdatum und Verwendungszweck aus Ihrem Kontoauszug.

## Schritt für Schritt

1. Öffnen Sie unter „Rechnungen“ die betreffende Rechnung.
2. Klicken Sie im Abschnitt „Zahlungen“ auf „Zahlung erfassen“.
3. Tragen Sie unter „Betrag (€)“ den eingegangenen Betrag ein.
4. Wählen Sie das „Zahlungsdatum“.
5. Ergänzen Sie „Zahlungsart / Bank“ und „Referenz / Verwendungszweck“.
6. Setzen Sie „Einbehalt gezogen“, wenn der Kunde einen vereinbarten Einbehalt abgezogen hat.
7. Klicken Sie auf „Zahlung speichern“.

Haben Sie Ihre Bankumsätze importiert, erfassen Sie die Zahlung über die Bank: Öffnen Sie „Buchhaltung → Bankumsätze“, wählen Sie beim Umsatz „Zuordnen“ und bestätigen Sie die passende Rechnung mit „Zuordnung bestätigen“. CraftOS erfasst die Zahlung dabei aus dem Bankumsatz („Zahlung aus Bankumsatz erfassen“). Den Ablauf beschreibt [Bankumsätze abgleichen](/hilfe/bankumsaetze-abgleichen).

## Ergebnis prüfen

Der Abschnitt „Zahlungen“ zeigt „Erfasste Zahlungen“ und die „Offene Forderung“. Beispiel: Bei einer Rechnung über 4.760 € und einer Teilzahlung von 2.000 € beträgt die offene Forderung 2.760 €. Unter „Buchhaltung → Belege → Zahlungseingänge“ erscheint die Zahlung mit ihrem Zahlungsdatum.

## Häufige Probleme

### Wie erfasse ich eine Teilzahlung?

Tragen Sie den tatsächlich eingegangenen Teilbetrag ein. Teilzahlungen reduzieren den offenen Rest; die nächste Zahlung erfassen Sie bei ihrem Eingang auf dieselbe Weise.

### Wie korrigiere ich eine falsch erfasste Zahlung?

Löschen Sie die Zahlung im Abschnitt „Zahlungen“ über „Zahlung löschen“ und erfassen Sie sie mit den richtigen Werten neu. Prüfen Sie danach die „Offene Forderung“.

### Wo sehe ich alle Zahlungen eines Zeitraums?

Unter „Buchhaltung → Belege → Zahlungseingänge“ zählen erfasste Zahlungen nach ihrem Zahlungsdatum. Mit „Zahlung ab“ und „Zahlung bis“ grenzen Sie den Zeitraum ein; offene Rechnungen finden Sie unter „Ausgangsbelege“.

### Wie hängen Zahlungen und Schlussrechnung zusammen?

Die Schlussrechnung weist die Zeile „Abzüglich erhaltener Abschlagszahlungen“ aus. Erfassen Sie deshalb jede Abschlagszahlung an ihrer Abschlagsrechnung. Die [Schlussrechnung](/hilfe/schlussrechnung-erstellen) und [Offene Posten und Liquidität](/blog/offene-posten-liquiditaet) führen das Thema weiter.
