---
title: "Materialverbrauch einer Baustelle zuordnen: Einkauf, Entnahme und Rückgabe unterscheiden"
description: "So bleiben Lagerbestand und Projektkosten nachvollziehbar, wenn Material eingekauft, verbraucht oder zurückgebracht wird."
category: "projekte"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Ordnen Sie Materialverbrauch über Entnahmen aus dem Lager einem Auftrag zu und buchen Sie unverbrauchtes Material mit Bezug auf die ursprüngliche Entnahme zurück. Der Einkauf erhöht nur den Bestand, erst die Entnahme belastet das Projekt."
relatedFeatures: ["lager", "nachkalkulation"]
relatedArticles: ["/hilfe/material-entnehmen-zurueckbuchen", "/hilfe/lager-scan-app", "/blog/materialliste-vorlage", "/blog/nachkalkulation-handwerk"]
sources: []
platforms: ["web", "mobile"]
---

## Was unterscheidet Einkauf und Verbrauch?

Ein Einkauf erhöht den Materialbestand, eine Entnahme ordnet eine Menge einem Auftrag zu, und eine Rückgabe verringert den zuvor gebuchten Verbrauch. Die Zahlung an den Lieferanten ist wiederum ein eigener Vorgang.

Ein Großeinkauf von 100 Einheiten kann mehrere Baustellen versorgen. Ordnen Sie deshalb dem ersten Projekt nur die Menge zu, die es tatsächlich verbraucht, nicht die gesamte Rechnung.

## Wie sieht ein einfacher Materialfluss aus?

Ein einfacher Materialfluss besteht aus Wareneingang, Entnahme für das Projekt und Rückgabe. Im Musterlager sind 20 Gebinde vorhanden, zehn weitere werden geliefert, acht gehen an die Lindenstraße, und zwei ungeöffnete kommen zurück.

| Bewegung | Lagerbestand danach | Projektbezogener Nettoverbrauch |
|---|---:|---:|
| Ausgangsbestand | 20 | 0 |
| Wareneingang von 10 | 30 | 0 |
| Entnahme von 8 | 22 | 8 |
| Rückgabe von 2 | 24 | 6 |

Die Rechnung beschreibt Mengen, keine steuerliche Bewertung. Welche Kostenwerte Sie verwenden, richtet sich nach Ihrer betrieblichen Auswertungsgrundlage.

## Welche Angaben gehören zu einer Bewegung?

Zu einer Bewegung gehören Artikel, Menge, Einheit, Lager und der Projektbezug. Eine kurze Notiz hilft bei ungewöhnlichen Vorgängen, etwa ‚Restmaterial nach Abschluss zurückgebracht‘.

Achten Sie besonders auf Gebinde und Einzelmengen. Ein Karton mit zwölf Stück ist nicht dasselbe wie ein Stück. Weichen Einkaufs- und Verbrauchseinheit voneinander ab, halten Sie die Umrechnung nachvollziehbar fest, damit der Bestand stimmt.

## Wie gehen Sie mit Baustellen- und Fahrzeuglagern um?

Ein Fahrzeug kann ein eigenes Lager sein, wenn dort regelmäßig Material vorgehalten wird. Die Umlagerung ins Fahrzeug ist noch kein Verbrauch eines Projekts; erst die Entnahme für den Auftrag stellt den Projektbezug her.

Beginnen Sie mit den Orten, an denen tatsächlich getrennt gezählt und disponiert wird. Eine Struktur hilft, wenn das Team sie konsequent pflegen kann.

## Wie verhindern Sie doppelte Kosten in der Nachkalkulation?

Legen Sie fest, welche Daten als Projektkosten zählen. Ein direkt zugeordneter Lieferantenbeleg und eine bewertete Entnahme können denselben Materialanteil enthalten; zählen beide, erscheint der Auftrag zu teuer.

Prüfen Sie bei ungewöhnlich hohen Materialkosten die zugrunde liegenden Vorgänge, nicht nur die Summe. Eine Rückgabe berücksichtigen Sie, wenn das Material wieder verwendbar ist und tatsächlich ins Lager zurückkam.

## Wie buchen Sie Entnahme und Rückgabe in CraftOS?

In der Web-App buchen Sie Material unter „Lager“ mit „Buchen“: „Warenausgang“ entnimmt Material für einen Auftrag, „Rückbuchung vom Auftrag“ bringt Unverbrauchtes zurück. Beide Buchungen wirken direkt auf die Nachkalkulation.

1. Öffnen Sie in der Web-App „Lager“ und klicken Sie auf „Buchen“.
2. Wählen Sie „Warenausgang“.
3. Wählen Sie Artikel, Lager und Menge.
4. Wählen Sie unter „Kunde“ den Kunden und unter „Auftrag / Projekt“ den Auftrag.
5. Klicken Sie auf „Ausbuchen“.

Für eine Rückgabe wählen Sie „Rückbuchung vom Auftrag“ und unter „Ursprüngliche Materialentnahme“ die Entnahme, zu der die Menge gehört. So bleibt die Rückgabe mit dem richtigen Auftrag verbunden.

## Wie buchen Sie Material mit der Mobile-App?

In der Mobile-App öffnen Sie „Mehr → Lager“, tippen auf „Barcode scannen“ und wählen danach „Ausgabe, Rücknahme oder Bewegung“. Eine Rücknahme verknüpfen Sie dabei mit der „Ursprüngliche Entnahme“.

Ohne Netz wird die Buchung auf dem Gerät vorgemerkt; der Server prüft den verfügbaren Bestand, sobald die Verbindung zurück ist. Wie die Lager-App Schritt für Schritt funktioniert, zeigt die Anleitung [Lager-App: Material per Barcode buchen](/hilfe/lager-scan-app).

## Welche Routine hält die Daten glaubwürdig?

Buchen Sie Bewegungen zeitnah, am besten direkt bei der Entnahme. Werden Entnahmen erst am Freitag aus dem Gedächtnis rekonstruiert, leiden Projektzuordnung und Menge.

Klären Sie Abweichungen einzeln und prüfen Sie regelmäßig einige häufig verwendete Artikel physisch. Eine Inventur macht Differenzen sichtbar; die Ursache finden Sie über die einzelnen Bewegungen.

## Wie behandeln Sie beschädigtes oder nicht mehr verwendbares Restmaterial?

Buchen Sie nur das zurück, was wieder verwendbar ist. Ein teilweise verbrauchtes oder beschädigtes Gebinde kehrt nicht wie ein neuer Artikel in den verfügbaren Bestand zurück.

Halten Sie die Behandlung solcher Fälle einheitlich und dokumentieren Sie den Anlass in der Notiz, damit die Differenz später nachvollziehbar bleibt. Für die Nachkalkulation zählt, dass verbrauchtes Material dem Auftrag zugerechnet bleibt.

## So unterstützt CraftOS

Die [Lagerfunktion](/funktionen/lager) verbindet Wareneingang, Entnahme und Rückbuchung mit Kunde und Auftrag, in der Web-App und in der Mobile-App. Die [Nachkalkulation](/funktionen/nachkalkulation) übernimmt die gebuchten Entnahmen und Rückgaben.

Die [Hilfe zur Materialentnahme und Rückgabe](/hilfe/material-entnehmen-zurueckbuchen) beschreibt die Bedienung im Detail, neue Lieferungen buchen Sie mit [Wareneingang buchen](/hilfe/wareneingang-buchen).
