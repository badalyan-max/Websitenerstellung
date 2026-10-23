---
title: "DATANORM-Katalog des Großhändlers importieren"
description: "So importieren Sie DATANORM-Kataloge Ihres Großhändlers mit Rabattdatei und Preisen und nutzen die Artikel in Angeboten und Rechnungen."
answer: "DATANORM-Kataloge importieren Sie in der Web-App unter „Stammdaten“ → „Kataloge“ → „DATANORM importieren“. CraftOS liest DATANORM 4 und DATANORM 5 mit Rabattdatei ein; die Artikel finden Sie danach in der Suche des Beleg-Editors."
category: "lager"
publishedAt: "2026-10-23"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["gaeb", "angebote", "lager"]
relatedArticles: ["/hilfe/artikel-stammdaten-anlegen", "/hilfe/angebotspositionen-leistungsvorlagen", "/hilfe/gaeb-importieren", "/hilfe/daten-importieren"]
sources: []
platforms: ["web"]
---

Mit einem DATANORM-Katalog übernehmen Sie die Artikel und Preise Ihres Großhändlers, statt sie einzeln anzulegen. Der Katalog bleibt als eigener Bestand unter „Kataloge“ und lässt sich jederzeit aktualisieren.

## Voraussetzungen

- Sie arbeiten in der Web-App mit der Rolle Admin oder Büro-Leitung.
- Sie haben die DATANORM-Dateien Ihres Großhändlers, bei getrennten Rabatten auch die Rabattdatei DATANORM.RAB.
- Je Import wählen Sie die Dateien eines Lieferanten.

## Schritt für Schritt in der Web-App

1. Öffnen Sie „Stammdaten“ und wechseln Sie zum Reiter „Kataloge“.
2. Klicken Sie „DATANORM importieren“.
3. Klicken Sie „Dateien auswählen“ und wählen Sie Artikel- und Rabattdatei gemeinsam aus.
4. Ergänzen Sie bei Bedarf eine Rabattdatei über „Rabattdatei hinzufügen (DATANORM.RAB)“.
5. Prüfen oder ergänzen Sie den „Katalogname (Lieferant)“.
6. Aktivieren Sie „Preise übernehmen“, wenn die Preise aus der Datei gelten sollen.
7. Prüfen Sie die „Artikelvorschau“ und wählen Sie mit „Alle auswählen“ oder einzeln die Artikel.
8. Klicken Sie unten die Schaltfläche, die die Anzahl der gewählten Artikel nennt.

## Ergebnis prüfen

CraftOS meldet „Datanorm-Import erfolgreich“ mit der Zahl der importierten Artikel, und der Katalog steht im Reiter „Kataloge“. Im Beleg-Editor finden Sie die Katalogartikel über die Suche und übernehmen sie in Angebote und Rechnungen. Über „Artikel ansehen“ übernehmen Sie markierte Katalogartikel in Ihre eigenen Artikel; dann stehen sie auch für Verbrauchsmaterial und Kalkulation bereit.

## Häufige Probleme

### Welche DATANORM-Versionen liest der Import?

DATANORM 4 und DATANORM 5. Den Zeichensatz CP850, ISO-8859-1 oder UTF-8 erkennt der Import selbst.

### Wie aktualisiere ich die Preise eines Katalogs?

Importieren Sie den neuen Katalog desselben Lieferanten. Ein erneuter Import aktualisiert die Artikel und Preise des Katalogs, ohne Dubletten anzulegen.

### Wie importiere ich Kataloge mehrerer Großhändler?

Jeden Lieferanten in einem eigenen Import. Wählen Sie Dateien verschiedener Lieferanten gemeinsam aus, meldet CraftOS „Die Dateien nennen unterschiedliche Lieferanten“; importieren Sie die Dateien dann nacheinander.

### Was zeigt „Fehlerhafte Zeilen anzeigen“?

Die Zeilen der Datei, die der Import nicht lesen konnte, jeweils mit Dateiname, Zeilennummer und Grund. Prüfen Sie die betroffenen Artikel beim Großhändler und importieren Sie die übrigen aus der „Artikelvorschau“.
