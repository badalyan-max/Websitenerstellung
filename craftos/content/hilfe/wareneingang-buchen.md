---
title: "Einen Wareneingang ins Lager buchen"
description: "So erfassen Sie gelieferte Mengen mit Artikel, Lagerort und optionalem Einkaufspreis, auf Wunsch per Belegscan, und buchen mobil mit „Zubuchen“."
category: "lager"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["lager", "eingangsrechnungen"]
relatedArticles: ["/hilfe/material-entnehmen-zurueckbuchen", "/hilfe/artikel-stammdaten-anlegen", "/hilfe/lagerorte-lagerplaetze-einrichten"]
sources: []
platforms: ["web", "mobile"]
answer: "Einen Wareneingang buchen Sie in der Web-App unter „Lager“ mit „Buchen“ → „Wareneingang“: Artikel, gelieferte Menge, Lager und optional den Einkaufspreis eintragen und „Einbuchen“ wählen. In der Mobile-App buchen Sie Ware am Artikel mit „Zubuchen“ zu."
---

Ein Wareneingang erhöht den Bestand des gewählten Lagers. Erfassen Sie die tatsächlich gelieferte Menge laut Lieferschein.

## Voraussetzungen

- Das Menü „Buchen“ in der Web-App nutzen Admin und Büro-Leitung (Voll-Lizenz mit globalen Finanzbereichen).
- Artikel und Lager sind angelegt, siehe [Artikel anlegen](/hilfe/artikel-stammdaten-anlegen) und [Lagerorte einrichten](/hilfe/lagerorte-lagerplaetze-einrichten).
- Für „Beleg scannen“ ist die KI-Belegerkennung für Sie freigegeben; sie verbraucht Credits.

## Schritt für Schritt in der Web-App

1. Öffnen Sie „Lager“ und klicken Sie auf „Buchen“ → „Wareneingang“.
2. Klicken Sie bei Bedarf auf „Beleg scannen“ und fotografieren Sie den Lieferschein.
3. Tippen Sie unter „Erkannte Positionen“ die Position an, die Sie übernehmen möchten.
4. Prüfen oder wählen Sie unter „Artikel / Material“ den Artikel.
5. Tragen Sie die gelieferte Menge in der Einheit des Artikels ein.
6. Ergänzen Sie bei Bedarf „Seriennummer (optional)“ und „Einkaufspreis (EK, optional)“.
7. Wählen Sie das Lager und bei Bedarf den Lagerplatz.
8. Ergänzen Sie eine „Notiz (optional)“ und klicken Sie auf „Einbuchen“.

Die erkannten Positionen sind Vorschläge: Menge und Einzelpreis übernimmt CraftOS aus dem Beleg, den Artikel prüfen Sie selbst. Findet CraftOS keinen passenden Artikel, wählen Sie ihn manuell.

## Schritt für Schritt in der Mobile-App

1. Öffnen Sie „Mehr“ → „Lager“ und den Artikel.
2. Tippen Sie auf „Zubuchen“.
3. Erfassen Sie die gelieferte Menge und das Ziellager.
4. Tippen Sie auf „Buchung bestätigen“.

## Ergebnis prüfen

- Im Reiter „Bewegungen“ steht die Buchung als „Wareneingang“ mit Menge und Lager.
- Im Reiter „Bestand“ ist der Bestand des Artikels im gewählten Lager gestiegen.
- Im Reiter „Bestellungen“ verfolgen Sie Bestellungen mit den Status „Bestellt“, „Teilgeliefert“ und „Geliefert“.

## Häufige Probleme

### Was buche ich bei einer Teillieferung?

Buchen Sie die gelieferte Menge laut Lieferschein. Bestellt sind zehn Stück, geliefert sechs: Sie buchen sechs Stück ein und die restlichen vier mit der nächsten Lieferung.

### Warum ist der Bestand zu hoch?

Prüfen Sie im Reiter „Bewegungen“, ob der Eingang doppelt gebucht wurde oder Gebinde und Stück verwechselt sind. Gleichen Sie die Menge mit „Buchen“ → „Bestandskorrektur“ aus.

### Wo sehe ich Artikel, die nachbestellt werden müssen?

Im Reiter „Meldungen“ stehen Artikel unter ihrem Meldebestand. CraftOS prüft das nach jeder Buchung und einmal täglich; mit „Nachbestellen“ legen Sie daraus eine Bestellung an.

### Wo prüfe ich die Lieferantenrechnung?

Die Rechnung des Lieferanten erfassen und prüfen Sie getrennt in der Buchhaltung unter „Belege“. Die Lagerbuchung hält Menge und Einkaufspreis fest.
