---
title: "XRechnung, ZUGFeRD oder PDF: welches Rechnungsformat passt?"
description: "So unterscheiden Sie lesbare PDF-Rechnungen von strukturierten E-Rechnungen und bereiten den Austausch mit Kunden vor."
answer: "Ein einfaches PDF zeigt die Rechnung nur zum Ansehen; XRechnung liefert die Daten als strukturierte XML-Datei, und ZUGFeRD verbindet ein lesbares PDF mit eingebetteten Daten. Welches Format Sie liefern, hängt von den Übergangsfristen für Ihren Betrieb und den Vorgaben des Empfängers ab."
category: "rechnungen"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["e-rechnung", "rechnungen"]
relatedArticles: ["/hilfe/e-rechnung-herunterladen", "/blog/handwerkerrechnung-schreiben"]
sources: [{"url": "https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html", "label": "Bundesfinanzministerium: FAQ zur E-Rechnung, Stand März 2026", "checkedAt": "2026-10-23"}, {"url": "https://www.gesetze-im-internet.de/ustg_1980/__27.html", "label": "§ 27 UStG: Allgemeine Übergangsvorschriften (Absatz 38)", "checkedAt": "2026-10-23"}, {"url": "https://www.gesetze-im-internet.de/ustg_1980/__14.html", "label": "§ 14 UStG: Ausstellung von Rechnungen", "checkedAt": "2026-10-23"}]
platforms: ["web"]
---

## Wie unterscheiden sich die drei Formate?

Ein PDF ist eine visuelle Darstellung, XRechnung ein reiner XML-Datensatz und ZUGFeRD ein PDF mit eingebettetem XML. Nur XRechnung und ZUGFeRD lassen sich maschinell verarbeiten; ein PDF wird auch durch den Versand per E-Mail nicht zur E-Rechnung.

| Format | Was enthält die Datei? | Wie prüfen Menschen sie? |
|---|---|---|
| Einfaches PDF | Eine visuelle Darstellung der Rechnung. | Im PDF-Programm. |
| XRechnung | Strukturierte Rechnungsdaten in XML. | Mit einem geeigneten Viewer. |
| ZUGFeRD | Lesbare PDF-Darstellung mit eingebetteten strukturierten Daten. | PDF und Dateninhalt müssen zusammenpassen. |

Bei ZUGFeRD kommt es auf das verwendete Profil und die tatsächlich eingebetteten Daten an. Die Dateiendung genügt deshalb nicht als Qualitätsprüfung.

## Welche Übergangsfristen gelten für Rechnungsaussteller?

Bis zum 31. Dezember 2026 dürfen alle Unternehmen statt einer E-Rechnung noch eine sonstige Rechnung ausstellen, ein PDF per E-Mail aber nur mit Zustimmung des Empfängers. Bei einem Vorjahresumsatz bis 800.000 € verlängert sich diese Frist bis Ende 2027.

Empfangen können müssen inländische Unternehmen E-Rechnungen bereits seit dem 1. Januar 2025. Ein EDI-Verfahren, das die Anforderungen an eine E-Rechnung nicht schon erfüllt, darf ebenfalls bis Ende 2027 weiterlaufen. Rechtsgrundlage ist [§ 27 Abs. 38 UStG](https://www.gesetze-im-internet.de/ustg_1980/__27.html); die Einordnung entspricht den [BMF-FAQ zur E-Rechnung](https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html) (Stand März 2026, abgerufen im Oktober 2026).

Für Ihre Entscheidung zählt der einzelne Auftrag. Fragen Sie also nicht nur, ob Sie schon müssen, sondern auch, was dieser Kunde braucht. Eine vereinbarte strukturierte Übermittlung kann sinnvoll sein, obwohl für Sie noch eine Übergangsfrist gilt. Regeln für öffentliche Auftraggeber prüfen Sie gesondert.

## Welche Angaben sollten Sie beim Kunden erfragen?

Erfragen Sie die Rechnungsempfangsadresse, den vorgesehenen Übermittlungsweg und die Referenzen, die der Kunde für die Zuordnung braucht. Dazu gehören Bestellnummer, Auftragsreferenz und Ansprechpartner; öffentliche Auftraggeber verlangen oft eine Leitweg-ID und ein bestimmtes Portal.

Tragen Sie diese Anforderungen in die Kunden- oder Projektinformationen ein. Fallen sie erst beim Versand auf, fehlt oft die Zeit für eine saubere Korrektur. Der Monteur auf der Baustelle kann den Ansprechpartner nennen; das Büro klärt die Rechnungsanforderungen direkt mit der zuständigen Stelle.

## Wie sieht ein konkreter Prüffall aus?

Ein Ausbaubetrieb stellt der fiktiven Linden Immobilien GmbH 1.500 € netto für Arbeiten im August in Rechnung. Die Hausverwaltung verlangt eine Bestellreferenz und eine strukturierte Datei; so prüfen Sie die Rechnung vor dem Versand.

1. Prüfen Sie, ob der Empfänger mit dem Auftrag übereinstimmt.
2. Erfassen Sie die Bestellreferenz im vorgesehenen Feld.
3. Formulieren Sie Leistungszeitraum und Positionen verständlich.
4. Gleichen Sie Netto-, Steuer- und Bruttosumme im Dokument ab.
5. Öffnen Sie die exportierte Datei zur Kontrolle in einem geeigneten Viewer.
6. Übermitteln Sie die Datei an den vereinbarten Eingang.

Bei einem hybriden Format muss der strukturierte Inhalt zur sichtbaren Rechnung passen. Weichen beide voneinander ab, sind laut den [BMF-FAQ](https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html) die Daten des strukturierten Teils maßgebend; bewahren Sie diesen in seiner ursprünglichen Form auf.

## Wie unterstützt CraftOS den Export?

In der Web-App öffnen Sie die fertiggestellte Rechnung und den Dialog „E-Rechnung“. Dort wählen Sie „XRechnung“ als XML-Datei im Format XRechnung 3.0 oder „ZUGFeRD“ als hybrides PDF mit eingebetteten Daten.

Unter „Rechnungsreferenzen“ tragen Sie „Leitweg-ID / Käuferreferenz“, „Bestellnummer“ und weitere Nummern ein, die der Empfänger verlangt. Fehlen Angaben zu Ihrem Unternehmen, nennt der Dialog sie vor dem Download. Die [Schrittfolge zum Herunterladen](/hilfe/e-rechnung-herunterladen) führt durch den Dialog.

Ein erfolgreicher Download ist noch keine Annahmebestätigung des Empfängers. Prüfen Sie eine technische Zurückweisung anhand ihrer konkreten Meldung und erzeugen Sie die Datei nach einer Korrektur erneut aus dem richtigen Dokumentstand.

## Wie vermeiden Sie unnötige Doppelarbeit?

Vereinbaren Sie pro Kunde genau einen verlässlichen Rechnungsweg. Wer dieselbe Rechnung an mehrere Postfächer schickt, riskiert eine doppelte Erfassung beim Kunden; kennzeichnen Sie Lesekopien deshalb eindeutig.

Testen Sie neue Empfängeranforderungen mit dem ersten echten Dokument, bevor ein großer Abrechnungslauf ansteht. Die [E-Rechnungsfunktion](/funktionen/e-rechnung) und gepflegte Kundendaten bilden dafür die Grundlage.

## Wie führen Sie einen neuen Rechnungsempfänger ein?

Legen Sie beim ersten Auftrag fest, wer die technischen Anforderungen klärt, und lassen Sie sich Format, Referenz und Eingangskanal konkret nennen. Eine Bitte, die Rechnung elektronisch zu schicken, kann im Alltag sehr unterschiedliche Erwartungen beschreiben.

Prüfen Sie nach der ersten Übermittlung die Rückmeldung des Empfängers. Dokumentieren Sie eine abweichende Referenzanforderung im Kunden- oder Projektzusammenhang, damit sie beim nächsten Auftrag sofort bereitsteht.

Ändern Sie zwischen XML und PDF keine Leistungsdaten unabhängig voneinander. Beide Ausgaben müssen aus demselben gespeicherten Rechnungsstand entstehen.
