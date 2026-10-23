---
title: "Eine fertige Rechnung nachvollziehbar stornieren"
description: "So prüfen Sie den Stornovorgang, erfassen einen Grund und erhalten den Zusammenhang zwischen Original und Stornorechnung."
category: "rechnungen"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Eine fertige Rechnung stornieren Sie in der Web-App über „Stornieren“ mit einem Eintrag unter „Stornogrund (Pflicht)“. CraftOS erzeugt eine festgeschriebene Stornorechnung, verknüpft sie mit dem Original und öffnet auf Wunsch mit „Rechnung neu ausstellen“ einen neuen Entwurf."
relatedFeatures: ["rechnungen", "buchhaltung"]
relatedArticles: ["/hilfe/rechnung-fertigstellen", "/hilfe/zahlungen-erfassen"]
sources: [{"url": "https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html", "label": "Bundesfinanzministerium: GoBD im Amtlichen AO-Handbuch 2025", "checkedAt": "2026-10-23"}]
platforms: ["web"]
---

## Voraussetzungen

- Voll-Lizenz (Admin oder Büro) mit Zugriff auf Rechnungen in der Web-App.
- Eine fertiggestellte Rechnung. Einen Entwurf entfernen Sie stattdessen mit „Löschen“.

## Schritt für Schritt

1. Öffnen Sie die Rechnung in den Dokumentdetails.
2. Kontrollieren Sie Nummer, Kunde, Betrag und bisherigen Zahlungsstand.
3. Öffnen Sie das Menü „Weitere Aktionen“ und wählen Sie „Stornieren“.
4. Lesen Sie im Dialog die angekündigte Aktion und den Betrag der Stornorechnung.
5. Tragen Sie unter „Stornogrund (Pflicht)“ einen konkreten Grund ein.
6. Setzen Sie bei Bedarf den Haken bei „Rechnung neu ausstellen“.
7. Klicken Sie auf „Stornorechnung erstellen“.

## Ergebnis prüfen

Es entsteht eine nummerierte, festgeschriebene Stornorechnung. Der Grund steht auf der Stornorechnung und am Original; das Original bleibt sichtbar.

Mit „Rechnung neu ausstellen“ öffnet CraftOS einen neuen Entwurf mit den Positionen des Originals. Seine Nummer erhält er erst beim [Fertigstellen](/hilfe/rechnung-fertigstellen).

Bei einer bereits bezahlten Rechnung heißt die Aktion „Stornorechnung erstellen (Betrag zurückerstatten)“. Die Rückzahlung an den Kunden veranlassen Sie selbst, zum Beispiel per Überweisung.

## Häufige Probleme

### Warum ist die Schaltfläche zum Stornieren nicht aktiv?

Der Grund fehlt noch. Ein konkreter Text hilft später bei der Prüfung, zum Beispiel falscher Rechnungsempfänger oder Position 3 nicht ausgeführt.

### Was bedeutet „Stornierung nicht möglich“?

Die Rechnung hat einen Status, der kein Storno zulässt, etwa eine bereits erstellte Stornorechnung. Die Leistung rechnen Sie dann mit einer neuen Rechnung ab; Original und Storno bleiben erhalten.

### Was passiert mit abgerechneten Zeiten?

Zeiten, die zu einer ausgestellten Rechnung gehören, ändern Sie erst nach dem Storno dieser Rechnung. Danach korrigieren Sie sie unter [Zeiten](/hilfe/zeiteintrag-erfassen-korrigieren) und rechnen neu ab.

### Wie hilft das Storno bei der GoBD?

Original, Stornorechnung und Grund bleiben verknüpft, sodass die Belegfolge nachvollziehbar ist. Die [GoBD](https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html) beschreiben den Umgang mit Änderungen; mehr steht unter [GoBD in CraftOS](/gobd).
