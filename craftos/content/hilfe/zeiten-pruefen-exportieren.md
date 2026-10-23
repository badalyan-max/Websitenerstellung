---
title: "Zeiten prüfen und als CSV oder Excel exportieren"
description: "So kontrollieren Sie Einträge, Pausen und Filter und exportieren die Arbeitszeiten mit passender Spaltenauswahl."
category: "zeiten"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Öffnen Sie in der Web-App „Zeiten“, setzen Sie Zeitraum und Filter und prüfen Sie die Einträge. Klicken Sie dann auf „Export“, wählen Sie die „Spalten“ und das Format „CSV“ oder „Excel (.xlsx)“ und bestätigen Sie mit „Exportieren“."
relatedFeatures: ["zeiterfassung", "team"]
relatedArticles: ["/hilfe/zeiteintrag-erfassen-korrigieren", "/blog/projektbezogene-zeiterfassung"]
sources: [{"url": "https://www.gesetze-im-internet.de/arbzg/__4.html", "label": "Arbeitszeitgesetz § 4 Ruhepausen (gesetze-im-internet.de)", "checkedAt": "2026-10-23"}]
platforms: ["web"]
---

Der Export enthält alle berechtigten, abgeschlossenen Einträge des gewählten Filters, unabhängig davon, wie weit Sie in der Liste geblättert haben. Prüfen Sie deshalb Zeitraum und Filter vor dem Download.

## Voraussetzungen

- Web-App mit Voll-Lizenz (Admin oder Büro) und Zugriff auf „Zeiten“.
- Welche Mitarbeiterzeiten Sie sehen, richtet sich nach Rolle und Projektzuordnung.

## Schritt für Schritt in der Web-App

### Zeiten prüfen

1. Öffnen Sie in der Seitenleiste „Zeiten“.
2. Wählen Sie den Zeitraum, zum Beispiel „Diese Woche“, „Dieser Monat“ oder „Letzter Monat“.
3. Setzen Sie bei Bedarf Filter für Mitarbeiter, Projekt und Standort.
4. Prüfen Sie je Tag die Zeile „Pausen des Tages“.
5. Achten Sie auf Einträge mit „Timer nicht gestoppt“ und auf falsche Projekte.
6. Korrigieren Sie unzutreffende Einträge mit „Zeiteintrag bearbeiten“.

### Zeiten exportieren

1. Klicken Sie auf „Export“.
2. Prüfen Sie im Dialog „Zeiten exportieren“ die angewendeten Filter.
3. Wählen Sie die Darstellung „Lesbare Tabelle“ oder die maschinenlesbare Variante.
4. Wählen Sie die benötigten „Spalten“.
5. Wählen Sie das Format „CSV“ oder „Excel (.xlsx)“.
6. Klicken Sie auf „Exportieren“.

Unter „Beispieldaten“ legen Sie fest, ob Beispieleinträge ausgeschlossen oder gekennzeichnet mitexportiert werden. Die Spaltenauswahl merkt sich das Gerät für spätere Exporte.

## Ergebnis prüfen

Öffnen Sie die Datei und vergleichen Sie Zeitraum, Personen und Summen mit der geprüften Liste. Eine schmale Spaltenauswahl kann Angaben weglassen, die der Empfänger braucht.

Ein Beispiel: Die August-Auswertung soll nur Zeiten des Projekts Lindenstraße enthalten. Setzen Sie dafür den Projektfilter und heben Sie einen noch gesetzten Mitarbeiterfilter auf.

## Häufige Probleme

### Was bedeutet „Pflichtpause fehlt“ in der Tagesansicht?

Die erfassten Pausen erreichen an diesem Tag nicht die gesetzliche Mindestpause. Nach § 4 Arbeitszeitgesetz sind es bei mehr als 6 bis 9 Stunden Arbeit 30 Minuten, bei mehr als 9 Stunden 45 Minuten, aufteilbar in Abschnitte ab 15 Minuten.

### Wo stelle ich die Pausenregeln ein?

Unter „Einstellungen“ → „Arbeitszeitkonto“ im Bereich „Pausenregeln (ArbZG)“. Mit „Fehlende Pause automatisch abziehen“ zieht CraftOS eine fehlende Pause im Tagesbild als „automatische Pause nach ArbZG“ ab; die erfassten Einträge bleiben unverändert.

### Was mache ich mit „Timer nicht gestoppt“?

Der Timer wurde in der App gestartet und nie gestoppt. Tragen Sie die Endzeit im Eintrag nach oder löschen Sie den Eintrag; danach zählt er im Export mit.

### Warum entsteht keine Exportdatei?

Prüfen Sie, ob der Filter passende Einträge enthält und mindestens eine Spalte gewählt ist. Ein Export umfasst bis zu 50.000 Zeilen; teilen Sie größere Zeiträume auf mehrere Exporte auf.

Die [Korrekturanleitung](/hilfe/zeiteintrag-erfassen-korrigieren) hilft bei der Bereinigung; die [Zeiterfassung](/funktionen/zeiterfassung) beschreibt den Zusammenhang mit Projekt und Nachkalkulation.
