---
title: "Daten aus der bisherigen Software importieren"
description: "So übernehmen Sie Kunden, Projekte und Stammdaten aus Exportdateien: Dateien wählen, Spalten zuordnen, Dubletten prüfen und importieren."
answer: "Die Datenübernahme starten Sie in der Web-App unter Einstellungen → „Daten importieren mit KI“: Exportdateien hinzufügen, Spalten kostenlos mit KI zuordnen lassen, Vorschau und Dubletten prüfen und den Import starten. Die KI-Kosten für den Import übernimmt CraftOS."
category: "einrichtung"
publishedAt: "2026-10-23"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
scene: "import"
relatedFeatures: ["datenuebernahme", "projektverwaltung"]
relatedArticles: ["/hilfe/kunden-ansprechpartner-anlegen", "/hilfe/artikel-stammdaten-anlegen", "/hilfe/gaeb-importieren", "/hilfe/firmenprofil-einrichten"]
sources: []
platforms: ["web"]
---

Mit der Datenübernahme bringen Sie Kunden, Projekte, Artikel und Leistungen aus Ihrer bisherigen Software in CraftOS. Sie prüfen jede Zuordnung, bevor Daten übernommen werden.

## Voraussetzungen

- Sie arbeiten in der Web-App mit der Rolle Admin oder Büro-Leitung.
- Sie haben Exportdateien als CSV, TSV, TXT, XLSX, flaches JSON oder XML oder vCard, höchstens 10 MiB je Datei und 30 MiB zusammen.
- Für die Import-KI hinterlegen Sie keine Zahlungsdaten; sie ist kostenlos.

## Schritt für Schritt in der Web-App

1. Öffnen Sie „Einstellungen“ und wählen Sie „Daten importieren mit KI“.
2. Klicken Sie „Dateien oder ZIP hinzufügen“ und wählen Sie die Exporte Ihrer bisherigen Software.
3. Prüfen Sie je Datei das „Ziel für diese Datei“ und klicken Sie „Kostenlos mit KI zuordnen“.
4. Klicken Sie „Tabelle prüfen und korrigieren“.
5. Kontrollieren Sie die vorgeschlagene Zuordnung jeder Spalte und klicken Sie „Daten prüfen“.
6. Entscheiden Sie bei Dubletten zwischen „Neu anlegen“, „Überspringen“ und „Ändern“.
7. Wählen Sie unter „Bisheriger Datenbestand“ den Bestand aus oder legen Sie ihn mit „Datenbestand anlegen“ an.
8. Klicken Sie „Übernahme vorbereiten“ und danach die Schaltfläche, die die Anzahl der Datensätze nennt.

## Ergebnis prüfen

Nach dem Import meldet CraftOS „Übernahme abgeschlossen“ und zeigt je Zeile, was angelegt, zusammengeführt oder übersprungen wurde. Mit „Importierte Daten öffnen“ springen Sie zu den übernommenen Kunden, Projekten oder Stammdaten. Frühere Importe finden Sie unter „Bisherige Datenübernahmen“.

## Häufige Probleme

### Welche Daten sieht die KI beim Zuordnen?

Spaltenüberschriften und zusammengefasste Statistiken; nur diese gehen an das Modell. Die Vorschläge prüfen und bestätigen Sie selbst.

### Wie mache ich einen Import rückgängig?

Öffnen Sie den Import, klicken Sie „Rücknahme prüfen“ und danach „Rücknahme bestätigen“. Das gilt für Tabellen-Importe von Kunden, Projekten, Artikeln und Leistungen, solange die Datensätze seitdem nicht geändert wurden.

### Wo importiere ich DATANORM-, GAEB- oder Bankdateien?

Im jeweiligen Fachimport. Für solche Dateien bietet die Datenübernahme „DATANORM-Fachimport öffnen“, „GAEB-Fachimport öffnen“ oder „Bankimport öffnen“ an. Details stehen im Artikel zum [DATANORM-Import](/hilfe/datanorm-katalog-importieren).

### Warum nennt CraftOS einen bisherigen Datenbestand?

Damit spätere Exporte aus derselben Quelle wiedererkannt werden. Wählen Sie bei späteren Importen denselben Datenbestand; bekannte Datensätze werden dann zugeordnet statt doppelt angelegt.
