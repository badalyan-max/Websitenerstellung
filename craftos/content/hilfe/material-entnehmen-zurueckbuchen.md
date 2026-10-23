---
title: "Material für einen Auftrag entnehmen und zurückbuchen"
description: "So buchen Sie Material per Warenausgang auf Kunde und Auftrag und führen nicht verbrauchtes Material mit Bezug zur ursprünglichen Entnahme zurück."
category: "lager"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["lager", "nachkalkulation"]
relatedArticles: ["/blog/materialverbrauch-baustelle-zuordnen", "/hilfe/inventur-durchfuehren", "/hilfe/wareneingang-buchen"]
sources: []
platforms: ["web", "mobile"]
answer: "Material entnehmen Sie in der Web-App unter „Lager“ mit „Buchen“ → „Warenausgang“ und wählen „Kunde“ und „Auftrag / Projekt“; das belastet die Nachkalkulation. Nicht verbrauchtes Material buchen Sie mit „Rückbuchung vom Auftrag“ zur ursprünglichen Entnahme zurück."
---

Ein Warenausgang ordnet Material einem Auftrag zu; die Rückbuchung führt nicht verbrauchtes Material ins Lager zurück und entlastet die Nachkalkulation. Auf der Baustelle buchen Sie beides auch in der Mobile-App.

## Voraussetzungen

- Das Menü „Buchen“ in der Web-App nutzen Admin und Büro-Leitung (Voll-Lizenz mit globalen Finanzbereichen).
- Kunde und Auftrag sind angelegt, der Artikel hat Bestand im gewählten Lager.
- In der Mobile-App sehen Sie die Lager, die für Sie freigegeben sind.

## Schritt für Schritt in der Web-App

### Material entnehmen

1. Öffnen Sie „Lager“ und klicken Sie auf „Buchen“ → „Warenausgang“.
2. Wählen Sie unter „Artikel / Material“ den Artikel und tragen Sie die Menge ein.
3. Wählen Sie das Lager und bei Bedarf den Lagerplatz.
4. Wählen Sie den „Kunde“ und danach unter „Auftrag / Projekt“ den Auftrag.
5. Ergänzen Sie bei Bedarf eine „Notiz (optional)“ und klicken Sie auf „Ausbuchen“.

### Nicht verbrauchtes Material zurückbuchen

1. Öffnen Sie „Lager“ und klicken Sie auf „Buchen“ → „Rückbuchung vom Auftrag“.
2. Wählen Sie Artikel, Kunde und Auftrag.
3. Wählen Sie unter „Ursprüngliche Materialentnahme“ die passende Entnahme.
4. Tragen Sie die zurückgebrachte Menge ein und wählen Sie das Ziel-Lager.
5. Klicken Sie auf „Zurückbuchen“.

Die Rückbuchung verwendet den damaligen Materialwert der Entnahme; die Menge reicht höchstens bis zur entnommenen Menge.

## Schritt für Schritt in der Mobile-App

1. Öffnen Sie „Mehr“ → „Lager“ und den Artikel oder scannen Sie seinen Barcode.
2. Tippen Sie auf „Ausgabe, Rücknahme oder Bewegung“.
3. Wählen Sie unter „Aktion“ „Entnehmen“ oder „Rückbuchen“ und danach das „Projekt“.
4. Wählen Sie beim Rückbuchen die „Ursprüngliche Entnahme“.
5. Erfassen Sie die Menge und tippen Sie auf „Buchung bestätigen“.

Ohne Netz merkt die App die Buchung auf dem Gerät vor; der Server prüft den Bestand nach der Verbindung. Den Scan beschreibt [Lager-Scan-App nutzen](/hilfe/lager-scan-app).

## Ergebnis prüfen

- Im Reiter „Bewegungen“ steht die Buchung als „Warenausgang“ oder „Rückbuchung“ mit Menge, Lager und Seriennummer.
- Der Bestand im Reiter „Bestand“ ist entsprechend gesunken oder gestiegen.
- Beispiel: Acht Gebinde entnommen, zwei zurückgebucht; die Nachkalkulation des Auftrags zeigt sechs Gebinde Verbrauch.

## Häufige Probleme

### Warum lässt sich kein Auftrag auswählen?

Das Feld „Auftrag / Projekt“ zeigt „Erst Kunde wählen“. Wählen Sie zuerst den „Kunde“; danach erscheinen dessen Aufträge.

### Wie buche ich Material zwischen zwei Lagern um?

Nutzen Sie „Buchen“ → „Umlagerung“ und wählen Sie „Von Lager“ und „Nach Lager“. Eine Umlagerung verschiebt Bestand, ohne einen Auftrag zu belasten.

### Was tun, wenn die App „Buchung nicht übernommen“ meldet?

Laden Sie mit „Aktuellen Stand laden“ den Bestand neu und prüfen Sie Menge, Lager und Projekt. Buchen Sie danach erneut.
