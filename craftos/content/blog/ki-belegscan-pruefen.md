---
title: "KI-Belegscan prüfen: welche Angaben Sie vor dem Speichern vergleichen sollten"
description: "Eine konkrete Prüfroutine für KI-erkannte Rechnungsdaten, Steuersätze, Dubletten und Projektzuordnung."
category: "belege"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Prüfen Sie einen KI-Belegscan, indem Sie Lieferant, Rechnungsnummer, Datum, Beträge und Projekt mit dem Original vergleichen. Die KI liefert auf Anforderung Vorschläge; Sie prüfen den Vorschlag und bestätigen jeden Schritt selbst."
relatedFeatures: ["eingangsrechnungen", "buchhaltung"]
relatedArticles: ["/hilfe/beleg-scannen-pruefen", "/hilfe/beleg-kontieren-zuordnen"]
sources: []
platforms: ["web", "mobile"]
---

## Wie bereiten Sie das Original vor?

Verwenden Sie eine vollständige, gut lesbare Datei: Bei einem Foto sind alle Ränder sichtbar und Reflexionen vermieden, mehrseitige Rechnungen liegen vollständig vor. Ein gerade aufgenommenes, glattes Dokument verkürzt die Prüfung.

Liegt eine strukturierte E-Rechnung als XML-Datei vor, laden Sie diese hoch. CraftOS liest E-Rechnungsdaten mit „E-Rechnung einlesen“ ohne KI-Credits ein, und die Datei bleibt als Original am Vorgang.

## Welche fünf Prüfungen sind besonders wichtig?

Die fünf wichtigsten Prüfungen betreffen Lieferant, Rechnungsnummer, Datum, Beträge und Projekt. Prüfen Sie sie bei jedem Beleg in derselben Reihenfolge, dann wird daraus eine kurze Routine.

| Prüffeld | Typischer Fehler | Ihre Kontrolle |
|---|---|---|
| Lieferant | Briefkopf wird mit Lieferadresse verwechselt. | Name und Anschrift vergleichen. |
| Rechnungsnummer | Buchstabe und Ziffer werden vertauscht. | Zeichenfolge im Original lesen. |
| Datum | Lieferdatum wird als Rechnungsdatum verwendet. | Feldbezeichnung prüfen. |
| Beträge | Brutto wird als netto übernommen. | Netto plus Steuer nachrechnen. |
| Projekt | Plausibler, aber falscher Auftrag wird ausgewählt. | Leistung und Baustelle zuordnen. |

## Wie sieht ein konkreter Erkennungsfehler aus?

Ein typischer Fehler ist ein Bruttobetrag im Nettofeld. Der Materialbeleg nennt 350 € netto, 66,50 € Umsatzsteuer und 416,50 € brutto, die Erkennung übernimmt 416,50 € als Nettobetrag, und eine erneute Steuerberechnung ergäbe einen zu hohen Gesamtwert.

Vergleichen Sie deshalb mindestens die drei Summen miteinander. Stimmen Netto und Steuer nicht mit Brutto überein, prüfen Sie auch Rundungen und mehrere Steuersätze. Korrigieren Sie die zugrunde liegende Aufteilung, nicht nur die Gesamtsumme.

Ein zweiter möglicher Fehler ist die Zuordnung zum Musterprojekt Lindenstraße, obwohl der Beleg Material für das allgemeine Lager enthält. Diese Zuordnung verzerrt die Nachkalkulation, selbst wenn jede erkannte Zahl stimmt.

## Was entscheidet die KI und was entscheiden Sie?

Die KI schlägt Angaben aus dem Beleg vor, die Entscheidung treffen Sie: Sie prüfen den Vorschlag und bestätigen jeden Schritt selbst. Ob eine Lieferung sachlich richtig ist oder ein Konto passt, beurteilen Sie mit Ihrem Wissen über den Auftrag.

Die KI-Auslesung starten Sie bei Bedarf selbst; sie nutzt die KI-Credits Ihres Betriebs. Ergänzen Sie fehlende Angaben und bestätigen Sie die Prüfung erst nach dem vollständigen Abgleich. Die Zahlung erfassen Sie getrennt davon, zum Beispiel über den Bankabgleich.

## Wie gehen Sie in der Web-App vor?

In der Web-App erfassen Sie den Beleg unter „Buchhaltung → Belege → Eingangsbelege“ und holen den KI-Vorschlag mit „Mit KI auslesen“. Für den Bereich brauchen Sie Finanzrechte.

1. Öffnen Sie „Buchhaltung → Belege → Eingangsbelege“.
2. Klicken Sie auf „Neue Eingangsrechnung“ und laden Sie Foto oder PDF hoch.
3. Klicken Sie auf „Mit KI auslesen“.
4. Vergleichen Sie die Vorschläge Feld für Feld mit dem Original.
5. Ergänzen Sie Projekt oder Betriebsbereich und das Buchungskonto.
6. Bestätigen Sie die Angaben mit „Prüfung bestätigen“.

Die Schaltfläche „Mit KI auslesen“ steht bereit, wenn die KI-Funktionen für Ihren Betrieb freigegeben sind. Die Freigabe steht unter „Einstellungen → KI-Funktionen“ mit „KI im Betrieb aktivieren“, den Verbrauch zeigt „KI-Verbrauch“. Die [Schrittfolge zum Belegscan](/hilfe/beleg-scannen-pruefen) beschreibt die Bedienung.

## Wie prüfen Sie einen Scan in der Mobile-App?

In der Mobile-App tippen Sie auf „Beleg scannen“, nehmen den Beleg auf oder wählen ein PDF und prüfen danach die übernommenen Daten. Zur KI-Auslesung zeigt die App an, wie sicher die Erkennung ist.

Wählen Sie anschließend das Projekt oder ordnen Sie die Datei einem bestehenden Beleg ohne Original zu. Meldet die App eine „Mögliche Dublette“, vergleichen Sie den angezeigten Beleg, bevor Sie speichern.

## Was tun Sie bei einem schlechten Ergebnis?

Bei einem schlechten Ergebnis nehmen Sie zuerst eine bessere Quelldatei oder eine vollständigere Aufnahme. Bleibt die Erkennung unzuverlässig, erfassen Sie die Angaben anhand des Originals von Hand; der Beleg bleibt dabei erhalten.

Vergleichen Sie bei vermuteten Dubletten Rechnungsnummer und Lieferant, bevor Sie einen zweiten Vorgang anlegen. Bei unklarer steuerlicher Einordnung klären Sie den Sachverhalt mit der zuständigen kaufmännischen Person.

## Wie prüfen Sie die Qualität wiederkehrender Erkennung?

Sammeln Sie typische Fehlerarten ohne Kopien vertraulicher Belege: Datum verwechselt, Steueraufteilung unvollständig oder falsche Projektzuordnung. Prüfen Sie dann, ob eine bessere Quelldatei oder eine klarere interne Erfassung den Fehler vermeidet.

Bewerten Sie die Zeitersparnis einschließlich der Kontrolle. Bei regelmäßig schwierigen Lieferantenformaten hilft oft eine digitale Originaldatei mehr als ein neues Foto. Die Prüfung und die spätere Festschreibung gehören zu einem nachvollziehbaren Belegprozess.

## So unterstützt CraftOS

Die [Eingangsrechnungsfunktion](/funktionen/eingangsrechnungen) verbindet KI-Vorschlag, Ihre Prüfung und das Original zu einem nachvollziehbaren Vorgang. Die [Buchhaltung](/funktionen/buchhaltung) übernimmt die geprüften Belege in die Übergabe an die Kanzlei.

Die [Hilfe zur Kontierung und Projektzuordnung](/hilfe/beleg-kontieren-zuordnen) zeigt, wie Sie Konto und Projekt nach dem Scan festlegen.
