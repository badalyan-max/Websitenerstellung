---
title: "Abschlags- und Schlussrechnung: Leistungen und Zahlungen sauber auseinanderhalten"
description: "Ein verständliches Beispiel zeigt, wie Abschläge, Gesamtleistung und vereinnahmte Zahlungen bei einer Schlussrechnung zusammenhängen."
answer: "Eine Abschlagsrechnung rechnet während des Auftrags einen Zwischenstand oder einen vereinbarten Betrag ab; die Schlussrechnung stellt nach der Abnahme die gesamte Leistung dar und zieht alle gestellten Abschläge ab. In CraftOS steht die Schlussrechnung bereit, sobald die Abnahme vermerkt ist."
category: "rechnungen"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["rechnungen", "projektverwaltung", "baudokumentation"]
relatedArticles: ["/hilfe/abschlagsrechnung-erstellen", "/hilfe/schlussrechnung-erstellen", "/hilfe/abnahme-dokumentieren"]
faq:
  - q: "Wann darf ich die Schlussrechnung stellen?"
    a: "Nach der Abnahme. Nach § 650g Abs. 4 BGB ist die Vergütung zu entrichten, wenn der Kunde das Werk abgenommen hat und eine prüffähige Schlussrechnung vorliegt. In CraftOS wird die Schlussrechnung deshalb erst nach der vermerkten Abnahme freigegeben."
  - q: "Was muss eine Schlussrechnung enthalten?"
    a: "Die gesamte erbrachte Leistung, die bereits gestellten Abschläge mit ihren Steuerbeträgen und den verbleibenden Betrag. Nach § 14 Abs. 5 UStG setzen Sie vereinnahmte Teilentgelte und die darauf entfallende Umsatzsteuer ab, wenn über sie Rechnungen ausgestellt wurden."
  - q: "Wann gilt eine Schlussrechnung als prüffähig?"
    a: "Wenn sie die erbrachten Leistungen übersichtlich aufstellt und für den Kunden nachvollziehbar ist. Erhebt der Kunde nicht innerhalb von 30 Tagen nach Zugang begründete Einwendungen, gilt sie nach § 650g Abs. 4 BGB als prüffähig."
  - q: "Wie hoch darf ein Abschlag sein?"
    a: "So hoch wie der Wert der erbrachten und vertraglich geschuldeten Leistungen, wenn der Vertrag nichts anderes regelt. Das sieht § 632a BGB vor; die Leistungen weisen Sie mit einer nachvollziehbaren Aufstellung nach."
  - q: "Kann ich nach einer Teilabnahme einen Abschlag stellen?"
    a: "Ja. Die Web-App schlägt nach einer Teilabnahme einen Nettobetrag aus den Positionen der abgenommenen Arbeitsabschnitte vor, abzüglich bereits gestellter Abschläge. Betrag und Leistungsstand prüfen und ändern Sie vor dem Erstellen."
sources: [{"url": "https://www.gesetze-im-internet.de/ustg_1980/__14.html", "label": "§ 14 UStG: Ausstellung von Rechnungen", "checkedAt": "2026-10-23"}, {"url": "https://www.gesetze-im-internet.de/bgb/__650g.html", "label": "§ 650g BGB: Zustandsfeststellung bei Verweigerung der Abnahme; Schlussrechnung", "checkedAt": "2026-10-23"}, {"url": "https://www.gesetze-im-internet.de/bgb/__632a.html", "label": "§ 632a BGB: Abschlagszahlungen", "checkedAt": "2026-10-23"}]
platforms: ["web", "mobile"]
---

## Was unterscheidet Abschlag und Schlussrechnung?

Eine Abschlagsrechnung betrifft einen Zwischenstand oder einen vereinbarten Betrag während der Ausführung. Die Schlussrechnung stellt die endgültige Gesamtleistung dar und verrechnet alle Abschläge. Die Bezeichnung allein entscheidet nicht über die vertraglichen Voraussetzungen.

Abschläge entlasten Ihren Betrieb bei längeren Aufträgen: Material und geleistete Arbeit müssen nicht bis zum Projektende vorfinanziert werden. Vereinbaren Sie den Zahlungsplan schon bei der Beauftragung und halten Sie fest, auf welchen Meilenstein sich ein Abschlag bezieht.

Erwartet das Büro einen Abschlag, der mit dem Kunden nicht vereinbart ist, wird die Liquiditätsplanung unzuverlässig. Notieren Sie deshalb auch, welche Nachweise der Kunde zu jedem Abschlag erhält.

## Wie lässt sich ein einfaches Beispiel prüfen?

Im fiktiven Auftrag Wohnung Lindenstraße beträgt die endgültige Leistung 10.000 € netto. Zwei Abschläge über je 3.000 € netto wurden gestellt und vollständig bezahlt. Zur Veranschaulichung gelten durchgängig 19 % Umsatzsteuer.

| Bestandteil | Netto | Umsatzsteuer | Brutto |
|---|---:|---:|---:|
| Gesamtleistung | 10.000 € | 1.900 € | 11.900 € |
| Erhaltener erster Abschlag | −3.000 € | −570 € | −3.570 € |
| Erhaltener zweiter Abschlag | −3.000 € | −570 € | −3.570 € |
| Verbleibender Betrag | 4.000 € | 760 € | 4.760 € |

Die Tabelle setzt einen einheitlichen Steuerfall und vollständige Zahlungen voraus. Schon ein teilweise bezahlter Abschlag verändert die Betrachtung: Eine Rechnung über 3.570 € und eine Zahlung von 1.785 € sind zwei verschiedene Informationen.

Wie vereinnahmte Teilentgelte in der Endrechnung abzusetzen sind, regelt [§ 14 Absatz 5 UStG](https://www.gesetze-im-internet.de/ustg_1980/__14.html). Lassen Sie Mischsteuersätze oder ungewöhnliche Zahlungsfälle vor der Ausgabe von Ihrer Steuerberatung prüfen.

## Was bedeutet kumulativ?

Eine kumulative Abrechnung zeigt den fortgeschriebenen Leistungsstand und zieht die bereits gestellten Vorrechnungen ab. Ein neuer kumulierter Gesamtwert ist also keine zusätzliche Leistung, die auf den vorherigen Wert aufgeschlagen wird.

Angenommen, der erste Leistungsstand beträgt 3.000 € und der zweite 6.000 €. Die zweite Angabe beschreibt insgesamt 6.000 € erreichte Leistung. Abgerechnet werden im zweiten Abschlag also weitere 3.000 €.

Wählen Sie die Abrechnungsart zu Beginn bewusst. Ein Wechsel mitten im Auftrag erschwert die Abstimmung mit dem Kunden und mit der Buchhaltung.

## Welche Kontrollen gehören vor den Abschluss?

Legen Sie drei Listen nebeneinander: die endgültigen Leistungen mit Nachträgen, alle gestellten Abschlagsrechnungen und die dazugehörigen Zahlungen. Ergänzen Sie Stornierungen ausdrücklich, damit eine stornierte Vorrechnung nicht wie eine gültige weiterläuft.

1. Prüfen Sie die Gesamtleistung einschließlich freigegebener Nachträge.
2. Gleichen Sie jede Abschlagsrechnung mit ihrer Dokumentnummer und ihrem Bruttobetrag ab.
3. Ordnen Sie jede Zahlung mit Datum einer Rechnung zu, auch Teilzahlungen.
4. Kennzeichnen Sie stornierte Vorrechnungen.
5. Lassen Sie die Übersicht von einer zweiten zuständigen Person gegenlesen.

Prüfen Sie danach, ob Restforderungen doppelt erscheinen. Ein offener Abschlag ist weder erlassen noch zusätzlich zur vollständigen Restforderung einzuziehen. Bewahren Sie die Folge aus Auftrag, Nachträgen, Leistungsnachweisen, Abschlägen, Zahlungen und Schlussrechnung nachvollziehbar auf.

## So unterstützt CraftOS

In der Web-App öffnen Sie das Angebot oder den Auftrag eines Projekts und wählen „Rechnung erstellen“. Der Dialog bietet die Rechnungstypen an, die zum Projektstand passen, darunter „Pauschaler Abschlag“, „Kumulativer Abschlag“ und „Schlussrechnung“. Mit dem ersten Abschlag legt CraftOS den Abrechnungsmodus für das Projekt fest.

Teilabnahmen erfassen Sie in der Mobile-App mit den abgenommenen Arbeitsabschnitten. In der Web-App steht danach in der Projektübersicht „Abschlagsrechnung vorschlagen“ bereit: Im Dialog „Umfang der Teilabnahme“ sehen Sie den „Betrag (Vorschlag, netto)“ aus den abgenommenen Positionen abzüglich bereits gestellter Abschläge.

Liegt ein unterschriebenes Abnahmeprotokoll vor, übernehmen Büro-Leitung oder Inhaber es mit „Abnahme übernehmen“ und „Abnahme bestätigen“. Das geht, solange das Projekt „Beauftragt“ oder „In Ausführung“ ist. Danach gibt CraftOS die Schlussrechnung frei; vorher trägt sie den Hinweis „Erst nach Abnahme möglich“.

Die Schritte im Einzelnen zeigen die Anleitungen [Abschlagsrechnung erstellen](/hilfe/abschlagsrechnung-erstellen), [Abnahme dokumentieren](/hilfe/abnahme-dokumentieren) und [Schlussrechnung erstellen](/hilfe/schlussrechnung-erstellen). Einen Überblick über die Rechnungstypen gibt die Funktion [Rechnungen](/funktionen/rechnungen); der [Projektordner](/funktionen/projektverwaltung) hält Auftrag, Abnahme und Rechnungen zusammen.
