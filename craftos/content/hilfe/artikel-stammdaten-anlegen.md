---
title: "Einen Artikel in den Stammdaten anlegen"
description: "So erfassen Sie Artikelnummer, Einheit sowie Einkaufs- und Verkaufspreis und übernehmen Artikel aus DATANORM-Katalogen Ihres Großhändlers."
category: "lager"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["lager", "angebote"]
relatedArticles: ["/hilfe/wareneingang-buchen", "/hilfe/angebotspositionen-leistungsvorlagen"]
sources: []
platforms: ["web"]
answer: "Einen Artikel legen Sie in der Web-App unter „Stammdaten“ im Reiter „Artikel“ mit „Neuer Artikel“ an; Name, Einheit und Verkaufspreis sind Pflicht. Artikel Ihres Großhändlers lesen Sie als DATANORM 4 oder DATANORM 5 im Reiter „Kataloge“ ein und übernehmen sie in Ihre Artikel."
---

Ein Artikel beschreibt Material mit Einheit und Preisen. Den Lagerbestand erfassen Sie danach mit einer Buchung, zum Beispiel einem Wareneingang.

## Voraussetzungen

- Sie arbeiten in der Web-App mit Voll-Lizenz und Zugriff auf „Stammdaten“.
- Für die Übernahme aus einem Katalog haben Sie die Rolle Admin oder Büro-Leitung.
- Ihr Großhändler liefert seinen Katalog als DATANORM-Datei.

## Schritt für Schritt in der Web-App

1. Öffnen Sie „Stammdaten“ und den Reiter „Artikel“.
2. Suchen Sie nach dem Material, um eine doppelte Anlage zu vermeiden.
3. Klicken Sie auf „Neuer Artikel“.
4. Tragen Sie „Artikelnummer“, „Kategorie“ und „Name“ ein.
5. Ergänzen Sie die „Beschreibung“ so, dass das Material eindeutig ist.
6. Wählen Sie die „Einheit“.
7. Tragen Sie „EK (€)“ ein; mit „Aufschlag auf EK (%)“ berechnet CraftOS den Verkaufspreis.
8. Prüfen Sie den „VK (€)“ und klicken Sie auf „Artikel erstellen“.

### Artikel aus einem DATANORM-Katalog übernehmen

1. Öffnen Sie „Stammdaten“ und den Reiter „Kataloge“.
2. Klicken Sie auf „DATANORM importieren“ und wählen Sie die Datei Ihres Großhändlers.
3. Klicken Sie beim importierten Katalog auf „Artikel ansehen“.
4. Suchen Sie die gewünschten Artikel unter „Im Katalog suchen“ und markieren Sie sie.
5. Prüfen Sie Einheit und „EK (netto)“ und klicken Sie auf „In eigene Artikel übernehmen“.

CraftOS liest DATANORM 4 und DATANORM 5 ein. Importierte Katalogartikel finden Sie zusätzlich in der Suche des Beleg-Editors; ein erneuter Import desselben Katalogs aktualisiert dessen Artikel und Preise. Den Import erklärt [DATANORM-Katalog importieren](/hilfe/datanorm-katalog-importieren).

## Ergebnis prüfen

- Der Artikel steht im Reiter „Artikel“ und ist in Angeboten, Rechnungen und Lagerbuchungen auswählbar.
- Im Artikel führt „Im Lager buchen“ direkt zum Wareneingang für diesen Artikel.
- Beispiel: *Innenfarbe, Gebinde 12,5 l* mit der Einheit Gebinde hat Einkaufs- und Verkaufspreis je Gebinde.

## Häufige Probleme

### Warum lässt sich der Artikel nicht speichern?

CraftOS meldet „Bitte fülle alle Pflichtfelder aus (Name, Einheit, VK-Preis)“. Tragen Sie Name, Einheit und Verkaufspreis ein und speichern Sie erneut.

### Wie ändere ich Preise mehrerer Artikel?

Filtern Sie im Reiter „Artikel“ die gewünschten Artikel und klicken Sie auf „Preise anpassen“. Prüfen Sie danach Einkaufs- und Verkaufspreis gemeinsam mit der Einheit.

### Was passiert mit Artikeln, die es schon gibt?

Bei der Übernahme aus einem Katalog legt CraftOS Artikel mit vorhandener Artikelnummer nur einmal an. Die Meldung nennt, wie viele Artikel übernommen wurden und wie viele bereits vorhanden waren.
