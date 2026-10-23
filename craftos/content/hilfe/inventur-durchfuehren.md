---
title: "Eine Inventur durchführen und Bestandsdifferenzen buchen"
description: "So vergleichen Sie Systembestand und gezählte Mengen je Lager und buchen Abweichungen als nachvollziehbare Bestandskorrektur."
category: "lager"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["lager"]
relatedArticles: ["/hilfe/lagerorte-lagerplaetze-einrichten", "/hilfe/material-entnehmen-zurueckbuchen"]
sources: []
platforms: ["web"]
answer: "Eine Inventur führen Sie in der Web-App unter „Lager“ im Reiter „Inventur“ durch: Lager wählen, gezählte Mengen eintragen und mit „Inventur buchen“ bestätigen. Abweichungen zwischen gezähltem Bestand und Systembestand bucht CraftOS als Bestandskorrektur."
---

Die Inventur vergleicht gezählte Mengen mit dem Systembestand eines Lagers. Jede Abweichung wird als Bestandskorrektur gebucht und bleibt in den Bewegungen nachvollziehbar.

## Voraussetzungen

- Sie arbeiten in der Web-App; die Inventur buchen Personen mit Voll-Lizenz (Admin oder Büro).
- Die Lager sind unter „Lagerorte“ angelegt, siehe [Lagerorte einrichten](/hilfe/lagerorte-lagerplaetze-einrichten).
- Während der Zählung sind Entnahmen und Umlagerungen in diesem Lager abgestimmt.

## Schritt für Schritt in der Web-App

1. Öffnen Sie „Lager“ und den Reiter „Inventur“.
2. Wählen Sie unter „Lager zählen“ das gezählte Lager.
3. Prüfen Sie je Zeile „Material“, „Lagerplatz“ und „Seriennummer“.
4. Tragen Sie die vor Ort gezählte Menge in die Spalte „Gezählt“ ein.
5. Fügen Sie vorhandene Ware, die in der Liste fehlt, mit „Artikel hinzufügen“ hinzu.
6. Kontrollieren Sie die Spalte „Differenz“.
7. Klicken Sie auf „Inventur buchen“.
8. Prüfen Sie im Dialog „System“, „Gezählt“ und „Differenz“ und bestätigen Sie mit „Inventur buchen“.

Stimmen alle Mengen überein, meldet der Dialog „Keine Abweichungen — es wird nichts gebucht.“

## Ergebnis prüfen

- Der Systembestand des Lagers entspricht dem gezählten Stand.
- Im Reiter „Bewegungen“ stehen die Abweichungen mit dem Typ „Korrektur“.
- Beispiel: System 24 Gebinde, gezählt 22 Gebinde, Differenz −2; CraftOS bucht eine Korrektur um zwei Gebinde.

## Häufige Probleme

### Was tun bei einer großen Differenz?

Prüfen Sie vor dem Buchen im Reiter „Bewegungen“, ob eine Entnahme oder Umlagerung noch fehlt. Erfassen Sie diese zuerst und zählen Sie den Artikel danach erneut.

### Was bedeutet der Hinweis, dass ein Teil noch nicht bestätigt ist?

Die Buchung wurde noch nicht vollständig bestätigt. Klicken Sie erneut auf „Inventur buchen“; CraftOS wiederholt denselben Zählauftrag, ohne doppelt zu buchen.

### Ich habe das falsche Lager gewählt. Was nun?

Klicken Sie im Bestätigungsdialog auf „Abbrechen“, wählen Sie unter „Lager zählen“ das richtige Lager und tragen Sie die Mengen dort ein.
