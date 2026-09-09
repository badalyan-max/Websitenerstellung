---
title: "Material für einen Auftrag entnehmen und zurückbuchen"
description: "So erfassen Sie Projektverbrauch und ungenutzte Rückgaben mit den vorgesehenen Lagerbewegungen."
category: "lager"
publishedAt: "2026-09-09"
updatedAt: "2026-09-09"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["lager", "nachkalkulation"]
relatedArticles: ["/blog/materialverbrauch-baustelle-zuordnen", "/hilfe/inventur-durchfuehren"]
sources: []
platforms: ["web"]
---

Eine Entnahme ordnet Material einem Auftrag zu; eine Rückbuchung führt nicht verbrauchtes Material wieder ins Lager.

Sie benötigen Zugriff auf Lager und Projekt in der Web-App. Prüfen Sie die tatsächlich entnommene beziehungsweise zurückgebrachte Menge.

## Material entnehmen

1. Öffnen Sie „Lager → Buchen → Warenausgang“.
2. Wählen Sie Artikel und Menge.
3. Prüfen Sie Lager und gegebenenfalls Lagerplatz.
4. Wählen Sie unter „Auftrag / Projekt“ den tatsächlichen Verwendungszweck.
5. Ergänzen Sie eine Notiz, wenn sie den Vorgang erklärt.
6. Wählen Sie „Ausbuchen“.
7. Kontrollieren Sie Bestand und Bewegung.

Der Warenausgang belastet den zugeordneten Auftrag in der vorgesehenen Nachkalkulation. Prüfen Sie den Projektbezug deshalb besonders sorgfältig.

## Nicht verbrauchtes Material zurückbuchen

1. Öffnen Sie „Lager → Buchen → Rückbuchung vom Auftrag“.
2. Wählen Sie den betreffenden Artikel und die zurückgebrachte Menge.
3. Prüfen Sie das ursprüngliche Projekt.
4. Wählen Sie das Ziel-Lager und gegebenenfalls den Lagerplatz.
5. Wählen Sie „Zurückbuchen“ und kontrollieren Sie die Bewegung.

## Beispiel und Ergebnis

Acht Gebinde wurden entnommen, zwei ungenutzte Gebinde kommen zurück. Der projektbezogene Nettoverbrauch beträgt dann sechs Gebinde. Eine bloße Umlagerung zwischen zwei Orten ist dagegen noch kein endgültiger Projektverbrauch.

## Häufige Probleme

Verwenden Sie für Rückgaben nicht einfach eine negative Menge in einem beliebigen Eingangsformular. Der vorgesehene Rückbuchungsweg hält den Bezug zum Auftrag fest.

Prüfen Sie bei unerwarteten Projektkosten, ob ein Lieferantenbeleg und eine bewertete Entnahme denselben Materialanteil doppelt berücksichtigen.

Wenn die Buchung verzögert reagiert, kontrollieren Sie vorhandene Bewegungen vor einer Wiederholung.

Der [Materialratgeber](/blog/materialverbrauch-baustelle-zuordnen) erklärt die Abgrenzung; die [Lagerfunktion](/funktionen/lager) verbindet Mengen und Projektbezug.

Prüfen Sie bei Serienartikeln zusätzlich die tatsächlich ausgegebene Seriennummer, damit Rückgabe und ursprünglicher Vorgang zusammenpassen.
