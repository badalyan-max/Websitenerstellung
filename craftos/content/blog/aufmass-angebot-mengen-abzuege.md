---
title: "Aufmaß ins Angebot übernehmen: Mengen, Einheiten und Abzüge richtig prüfen"
description: "So wird aus Raummaßen eine nachvollziehbare Angebotsmenge, ohne Bodenfläche, Wandfläche und technische Abzüge zu vermischen."
category: "kalkulation"
publishedAt: "2026-09-09"
updatedAt: "2026-09-09"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["aufmass", "angebote"]
relatedArticles: ["/hilfe/raumaufmass-angebot-uebernehmen", "/blog/handwerkerangebot-erstellen"]
sources: []
platforms: ["web"]
---

Ein digitales Aufmaß spart Übertragungsarbeit, wenn Raum, Flächenart und Einheit eindeutig sind. Der wichtige Schritt liegt zwischen der Messung und der Angebotsposition: Welche berechnete Menge wird für welche Leistung verwendet? Eine richtige Raumgeometrie führt nicht automatisch zu einer richtigen Abrechnungsmenge.

## Was sollten Sie vor Ort erfassen?

Benennen Sie den Raum verständlich, etwa „Wohnzimmer Erdgeschoss“. Erfassen Sie Länge, Breite und Höhe in einer einheitlichen Maßeinheit. Notieren Sie Öffnungen, Sonderflächen und Besonderheiten, die den Arbeitsumfang beeinflussen.

Ein Foto kann den Zustand und die Lage einer Öffnung zeigen. Es ersetzt keine verlässliche Messung. Bei unregelmäßigen Räumen teilen Sie die Geometrie nachvollziehbar auf, statt einen groben Rechteckwert ohne Kennzeichnung zu verwenden.

## Wie unterscheiden sich Bodenfläche und Wandfläche?

Für einen rechteckigen Raum mit 5 m Länge, 4 m Breite und 2,8 m Höhe ergibt sich:

| Größe | Berechnung | Ergebnis |
|---|---|---:|
| Bodenfläche | 5 m × 4 m | 20 m² |
| Umfang | 2 × (5 m + 4 m) | 18 m |
| Wandfläche ohne Öffnungen | 18 m × 2,8 m | 50,4 m² |
| Beispielöffnung | 1 m × 2,4 m | 2,4 m² |
| Geometrische Restfläche | 50,4 m² − 2,4 m² | 48 m² |

Die 20 m² Bodenfläche und die 48 m² geometrische Wandrestfläche dürfen nicht vertauscht werden. Sonst kann eine sauber berechnete Zahl in der falschen Position landen.

Dieses Beispiel beschreibt reine Geometrie. Ob eine Öffnung für die Abrechnung abzuziehen ist, hängt von der vereinbarten Leistung und den anwendbaren Abrechnungsregeln ab. Prüfen Sie diese Grundlage gesondert; ein geometrischer Abzug ist keine allgemeingültige Abrechnungsvorschrift.

## Welche Menge gehört in welche Position?

Ordnen Sie jeder Leistung eine Bezugsgröße zu. Boden verlegen bezieht sich typischerweise auf eine Bodenfläche. Sockelleisten benötigen eine Länge. Eine Wandbeschichtung braucht die passende Wandfläche. Türen oder Einbauten können Stückpositionen sein.

Halten Sie diese Zuordnung direkt im Angebot fest. Wenn mehrere Räume dieselbe Leistung erhalten, sollte erkennbar bleiben, wie die Gesamtmenge zustande kommt. Eine Summe ohne Raumbezug ist schwer nachzuprüfen, wenn der Kunde später einen Raum aus dem Auftrag nimmt.

## Wie übernehmen Sie ein Aufmaß in CraftOS?

In der Web-App finden Sie die Raumdaten im Projekt unter „Aufmaß & Massen“. Erfassen oder prüfen Sie die Flächenwerte. Über „Als Angebotspositionen“ öffnen Sie einen neuen Angebotsentwurf mit den erfassten Mengen; ergänzen Sie dort die zugehörigen Leistungen und Preise. Die [Hilfe zum Raumaufmaß](/hilfe/raumaufmass-angebot-uebernehmen) beschreibt den aktuellen Ablauf.

Prüfen Sie nach der Übernahme Einheit, Rundung und Positionspreis. Eine geänderte Raumhöhe kann die Wandfläche verändern, während die Bodenfläche unverändert bleibt. Verlassen Sie sich deshalb nicht allein auf die Gesamtsumme des Angebots.

## Wie behandeln Sie Messunsicherheit und Änderungen?

Kennzeichnen Sie vorläufige Maße als solche. Wenn ein Raum bei der Besichtigung noch nicht zugänglich ist, darf eine Schätzung nicht unbemerkt wie ein gemessener Wert weiterverarbeitet werden. Vereinbaren Sie einen Zeitpunkt für die Nachmessung.

Ändert sich der Umfang, bewahren Sie den Zusammenhang zwischen ursprünglicher Menge und neuer Messung. Ein Nachtrag sollte erkennen lassen, welche zusätzliche Fläche oder Leistung dazugekommen ist. Überschreiben Sie eine vereinbarte Angebotsmenge nicht ohne Abstimmung.

## Welche Kontrollroutine hilft auf der Baustelle?

Vergleichen Sie nach der Erfassung drei Werte: die gemessene Geometrie, die verwendete Angebotsmenge und die tatsächlich ausgeführte Menge. Diese Werte können berechtigt voneinander abweichen, müssen aber erklärbar bleiben.

Lassen Sie einen zweiten Blick über ungewöhnlich große oder kleine Flächen gehen. Häufige Ursachen sind Zentimeter statt Meter, vertauschte Höhe und Breite oder ein doppelt erfasster Raum. Die [Aufmaßfunktion](/funktionen/aufmass) macht die Herkunft einer Menge sichtbar; die [Angebotsfunktion](/funktionen/angebote) verbindet sie mit der zu kalkulierenden Leistung.

## Welche Prüfung verhindert einen falsch übernommenen Raum?

Vergleichen Sie unmittelbar nach der Übergabe Raumname, Flächenart und Menge. Werden Boden, Wand und Decke als eigene Positionen vorgeschlagen, entfernen Sie die nicht benötigten Leistungen aus dem Angebotsentwurf beziehungsweise kalkulieren nur den vereinbarten Umfang.

Eine vorhandene Netto-Wandfläche wird bei der Übernahme gegenüber der Brutto-Wandfläche bevorzugt. Deshalb muss dieser Wert bewusst gepflegt sein; eine veraltete Nettofläche kann sonst trotz neuer Bruttoangabe weiterverwendet werden. Prüfen Sie die übernommenen Mengen auf zwei Nachkommastellen und kontrollieren Sie, ob der sichtbare Positionstext bereits eine echte Leistung beschreibt oder zunächst nur die Herkunft der Fläche.
