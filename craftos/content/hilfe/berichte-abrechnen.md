---
title: "Leistungen aus Bautagesberichten abrechnen"
description: "So wählen Sie Berichte, prüfen Material und Stunden und erstellen einen kontrollierten Rechnungsentwurf."
category: "rechnungen"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Abgeschlossene Bautagesberichte und Regieberichte rechnen Sie in der Web-App im Projekt unter „Baudokumentation“ ab: einzeln mit „Rechnung aus Bericht erstellen“ oder mehrere zusammen über „Sammelabrechnung“. CraftOS legt daraus einen Rechnungsentwurf an, in dem Sie die Preise ergänzen."
relatedFeatures: ["baudokumentation", "rechnungen"]
relatedArticles: ["/hilfe/bautagesbericht-erstellen", "/hilfe/rechnung-fertigstellen", "/hilfe/zeiten-pruefen-exportieren"]
sources: []
platforms: ["web"]
---

## Voraussetzungen

- Voll-Lizenz (Admin oder Büro) mit Zugriff auf Projekt und Rechnungen in der Web-App.
- Dem Projekt ist ein Kunde zugeordnet.
- Die Berichte sind abgeschlossen und enthalten Material- oder Leistungstabellen. Typische Quelle ist der [Regiebericht](/hilfe/regiebericht) für Zusatzarbeiten.
- Für Arbeitszeiten ist in „Einstellungen → Lohngruppen“ ein Verrechnungssatz hinterlegt.

## Schritt für Schritt für einen Bericht

1. Öffnen Sie das Projekt und wechseln Sie zum Reiter „Baudokumentation“.
2. Klicken Sie im Bereich „Berichte“ beim gewünschten Bericht auf „Rechnung aus Bericht erstellen“.
3. Wählen Sie die übernehmbaren Positionen aus dem Bericht.
4. Prüfen Sie unter „Arbeitszeit (Zeiterfassung)“ die Stunden des Berichtstags und die Lohngruppe.
5. Entfernen Sie Zeilen, die bereits im Angebotspreis oder in einer früheren Rechnung enthalten sind.
6. Klicken Sie auf „Rechnungsentwurf erstellen“.
7. Ergänzen Sie im Rechnungs-Editor die Preise und prüfen Sie die Vorschau.

## Schritt für Schritt für mehrere Berichte

1. Klicken Sie im Bereich „Berichte“ auf „Sammelabrechnung“.
2. Wählen Sie die abgeschlossenen Berichte aus, die auf eine Rechnung sollen.
3. Prüfen Sie die Positionen aus den Berichten und entfernen Sie unzutreffende Zeilen.
4. Schalten Sie „Alle offenen Projektstunden“ nur ein, wenn diese Stunden noch nicht abgerechnet sind.
5. Klicken Sie auf „Sammelrechnung erstellen“ und ergänzen Sie im Editor die Preise.

## Ergebnis prüfen

Der Entwurf enthält die ausgewählten Zeilen mit Projektbezug und steht unter „Dokumente“ des Projekts. Kontrollieren Sie Mengen, Preise, Steuer und Leistungsbeschreibung, bevor Sie die Rechnung [fertigstellen](/hilfe/rechnung-fertigstellen).

Übernommene Stunden verknüpft CraftOS mit der Rechnung als abgerechnet.

## Häufige Probleme

### Warum ist „Rechnung aus Bericht erstellen“ nicht wählbar?

Der Hinweis an der Schaltfläche nennt den Grund, zum Beispiel „Nur für abgeschlossene Berichte (nicht Entwurf)“, „Keine übernehmbaren Positionen im Bericht“ oder „Dem Projekt ist kein Kunde zugeordnet“.

### Warum fehlen Stunden im Entwurf?

Für diese Personen ist am Standort kein Verrechnungssatz hinterlegt. Tragen Sie im Dialog einen Satz für diese Stunden ein oder hinterlegen Sie ihn unter „Einstellungen → Lohngruppen“; ohne Satz bleiben die Stunden offen.

### Wie vermeide ich doppelt berechnete Arbeitszeit?

Wählen Sie entweder die Stunden des Berichtstags oder „Alle offenen Projektstunden“, nicht beides für dieselbe Arbeit. Bereits abgerechnete Berichte kennzeichnet die Sammelabrechnung.

Die [Berichtsanleitung](/hilfe/bautagesbericht-erstellen) verbessert die Ausgangsdaten; die [Baudokumentation](/funktionen/baudokumentation) zeigt den Ablauf vom Bericht bis zur Rechnung.
