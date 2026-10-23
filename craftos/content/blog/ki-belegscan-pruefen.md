---
title: "KI-Belegscan prüfen: welche Angaben Sie vor dem Speichern vergleichen sollten"
description: "Eine konkrete Prüfroutine für automatisch erkannte Rechnungsdaten, Steuersätze, Dubletten und Projektzuordnung."
category: "belege"
publishedAt: "2026-09-09"
updatedAt: "2026-09-09"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["eingangsrechnungen", "buchhaltung"]
relatedArticles: ["/hilfe/beleg-scannen-pruefen", "/hilfe/beleg-kontieren-zuordnen"]
sources: []
platforms: ["web"]
---

Ein KI-Belegscan kann das Abtippen von Rechnungsdaten reduzieren. Sein Ergebnis bleibt ein Vorschlag, den Sie gegen das Original prüfen müssen. Besonders Zahlen, die plausibel aussehen, verdienen Aufmerksamkeit: Ein falsch erkanntes Datum oder eine vertauschte Netto- und Bruttosumme fällt in einer flüchtigen Kontrolle leicht durch.

## Wie bereiten Sie das Original vor?

Verwenden Sie eine vollständige, gut lesbare Datei. Bei einem Foto sollten alle Ränder sichtbar sein und Reflexionen vermieden werden. Ein schräg aufgenommenes, zerknittertes Dokument erhöht den Prüfaufwand. Mehrseitige Rechnungen müssen vollständig vorliegen.

Wenn eine strukturierte Rechnungsdatei verfügbar ist, bewahren Sie diese mit dem Vorgang auf. Ein zusätzliches Foto der sichtbaren Rechnung kann Informationen verlieren und sollte nicht unbemerkt das Original ersetzen.

## Welche fünf Prüfungen sind besonders wichtig?

| Prüffeld | Typischer Fehler | Ihre Kontrolle |
|---|---|---|
| Lieferant | Briefkopf wird mit Lieferadresse verwechselt. | Name und Anschrift vergleichen. |
| Rechnungsnummer | Buchstabe und Ziffer werden vertauscht. | Zeichenfolge im Original lesen. |
| Datum | Lieferdatum wird als Rechnungsdatum verwendet. | Feldbezeichnung prüfen. |
| Beträge | Brutto wird als netto übernommen. | Netto plus Steuer nachrechnen. |
| Projekt | Plausibler, aber falscher Auftrag wird ausgewählt. | Leistung und Baustelle zuordnen. |

Führen Sie die Prüfung in derselben Reihenfolge durch. So wird sie zur kurzen Routine statt zu einem unsystematischen Blick auf viele Felder.

## Wie sieht ein konkreter Erkennungsfehler aus?

Ein Materialbeleg enthält 350 € netto, 66,50 € Umsatzsteuer und 416,50 € brutto. Die Erkennung übernimmt versehentlich 416,50 € als Nettobetrag. Bei einer erneuten Steuerberechnung würde daraus ein zu hoher Gesamtwert.

Vergleichen Sie deshalb mindestens die drei Summen miteinander. Stimmen Netto und Steuer nicht mit Brutto überein, prüfen Sie auch Rundungen und mehrere Steuersätze. Korrigieren Sie nicht nur die Gesamtsumme, wenn die zugrunde liegende Aufteilung falsch ist.

Ein zweiter möglicher Fehler ist die Zuordnung zur „Lindenstraße“, obwohl der Beleg Material für das allgemeine Lager enthält. Diese Zuordnung kann die Nachkalkulation verzerren, selbst wenn jede erkannte Zahl korrekt ist.

## Was entscheidet die KI und was entscheiden Sie?

Die KI kann Angaben aus dem Beleg vorschlagen. Ob eine Lieferung sachlich richtig ist, eine Rechnung bereits vorliegt oder ein Kostenkonto zum betrieblichen Vorgang passt, erfordert zusätzliche Informationen.

In CraftOS liefert der Belegscan daher Vorschläge, und Sie entscheiden über die Buchung. Prüfen Sie Vorschläge, ergänzen Sie fehlende Angaben und bestätigen Sie den vorgesehenen Schritt selbst. Eine erfolgreich erkannte Datei ist weder ein Nachweis der Zahlung noch automatisch ein vollständig geprüfter Buchungsvorgang.

## Wie gehen Sie in der Web-App vor?

Öffnen Sie „Eingangsrechnungen → Neue Eingangsrechnung“ und wählen Sie die verfügbare Erfassung. Nach der Analyse vergleichen Sie die Vorschläge mit dem Original. Speichern Sie den Vorgang erst mit verständlicher Zuordnung; offene Fragen bleiben als Prüfbedarf bestehen.

Für den Zugriff sind die passenden Finanzrechte notwendig. Fehlt die Analyseoption, prüfen Sie außerdem die aktivierten KI-Funktionen und das verfügbare Kontingent mit einer administrativen Person. Die [Schrittfolge zum Belegscan](/hilfe/beleg-scannen-pruefen) beschreibt die Bedienung.

## Was tun Sie bei einem schlechten Ergebnis?

Versuchen Sie zuerst eine bessere Quelldatei oder eine vollständigere Aufnahme. Wenn der Beleg weiterhin nicht zuverlässig erkannt wird, erfassen Sie die Angaben manuell anhand des Originals. Ein wiederholter Scan desselben schlechten Bildes ist nicht automatisch eine Verbesserung.

Vergleichen Sie bei vermuteten Dubletten Rechnungsnummer und Lieferant, bevor Sie einen zweiten Vorgang anlegen. Bei unklarer steuerlicher Einordnung klären Sie den Sachverhalt mit der zuständigen kaufmännischen Person. Die [Eingangsrechnungsfunktion](/funktionen/eingangsrechnungen) verbindet Erkennung und menschliche Kontrolle zu einem nachvollziehbaren Ablauf.

## Wie prüfen Sie die Qualität wiederkehrender Erkennung?

Sammeln Sie typische Fehlerarten ohne unnötige Kopien vertraulicher Belege: Datum verwechselt, Steueraufteilung unvollständig oder falsche Projektzuordnung. Prüfen Sie anschließend, ob eine bessere Quelldatei oder klarere interne Erfassung den Fehler vermeidet.

Bewerten Sie die Zeitersparnis einschließlich der notwendigen Kontrolle. Ein Scan, der alle Beträge falsch übernimmt, spart trotz schneller Analyse wenig Arbeit. Bei regelmäßig schwierigen Lieferantenformaten kann eine bessere digitale Originaldatei hilfreicher sein als immer neue Fotos. Bestätigen Sie den Prüfstatus erst nach dem vollständigen Abgleich; die Prüfung und spätere Festschreibung gehören zu einem nachvollziehbaren Belegprozess.
