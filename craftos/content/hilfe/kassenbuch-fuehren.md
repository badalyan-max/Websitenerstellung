---
title: "Ein Kassenbuch führen"
description: "So eröffnen Sie die Kasse, erfassen Bargeldbuchungen, machen einen Kassensturz und exportieren den Monat für DATEV oder als CSV."
answer: "Das Kassenbuch führen Sie in der Web-App unter „Buchhaltung“ → „Kasse“: Kasse mit dem gezählten Anfangsbestand eröffnen, Einnahmen und Ausgaben mit „Buchung erfassen“ eintragen und den Monat als DATEV- oder CSV-Datei exportieren. Gespeicherte Buchungen korrigieren Sie per Storno."
category: "belege"
publishedAt: "2026-10-23"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: true
relatedFeatures: ["buchhaltung", "eingangsrechnungen"]
relatedArticles: ["/hilfe/datev-export-erstellen", "/hilfe/beleg-kontieren-zuordnen", "/hilfe/bankumsaetze-abgleichen"]
sources: []
platforms: ["web"]
---

Im Kassenbuch erfassen Sie jede Bareinnahme und -ausgabe mit laufendem Bestand. Gespeicherte Buchungen bleiben unverändert; Korrekturen laufen über eine Gegenbuchung, damit die Kassenführung nachvollziehbar bleibt.

## Voraussetzungen

- Sie arbeiten in der Web-App mit Finanzrechten (Admin oder Büro-Leitung).
- Für den DATEV-Export sind die DATEV-Einstellungen unter Einstellungen → „DATEV-Export“ hinterlegt; diese pflegt der Inhaber.
- Sie haben das Bargeld der Kasse gezählt.

## Schritt für Schritt in der Web-App

### Kasse eröffnen

1. Öffnen Sie „Buchhaltung“ und wechseln Sie zu „Kasse“.
2. Tragen Sie bei „Eröffnet am“ das Datum ein.
3. Tragen Sie bei „Anfangsbestand (€)“ den gezählten Betrag ein.
4. Klicken Sie „Kasse eröffnen“.

### Buchung erfassen

1. Klicken Sie „Buchung erfassen“.
2. Wählen Sie die Art, zum Beispiel „Einnahme“, „Ausgabe“, „Privateinlage“ oder „Privatentnahme“.
3. Tragen Sie „Datum“, „Betrag brutto (€)“ und „Text“ ein.
4. Wählen Sie bei Einnahmen und Ausgaben den „USt-Satz“.
5. Ergänzen Sie bei Bedarf „Belegnummer (optional)“ oder „Eingangsrechnung als Beleg (optional)“.
6. Prüfen Sie „Bestand danach“ und klicken Sie „Buchen“.

Geld zwischen Bankkonto und Kasse buchen Sie mit den Arten „Bank → Kasse“ und „Kasse → Bank“.

### Kassensturz machen

1. Klicken Sie „Kassensturz“.
2. Tragen Sie die gezählten Scheine und Münzen im „Zählprotokoll (Stückzahl)“ ein oder nutzen Sie „Oder gezählter Betrag (€)“.
3. Vergleichen Sie „Soll (Buch)“ mit „Ist (gezählt)“.
4. Klicken Sie „Kassensturz speichern“.

### Monat exportieren

1. Blättern Sie mit den Pfeilen neben dem Monatsnamen zum gewünschten Monat.
2. Klicken Sie „DATEV“ für die Übergabe an die Steuerkanzlei oder „CSV“ für eine Tabelle.

## Ergebnis prüfen

Die Monatsübersicht zeigt „Anfangsbestand“, „Einnahmen“, „Ausgaben“, „Kassendifferenz“ und „Bestand Monatsende“. Darunter stehen der aktuelle Kassenbestand und der letzte Kassensturz. Jede Buchung trägt eine laufende Nummer; der Anfangsbestand ist Buchung Nr. 1.

## Häufige Probleme

### Wie korrigiere ich eine falsche Buchung?

Klicken Sie bei der Buchung „Storno“, tragen Sie den „Grund“ ein und klicken Sie „Stornieren“. CraftOS legt eine Gegenbuchung mit heutigem Datum an; die Originalbuchung bleibt sichtbar und trägt den Hinweis „storniert“.

### Ab welchem Datum buche ich nach einem Kassensturz?

Ab dem Tag des Kassensturzes. Der gespeicherte Kassensturz schließt den Zeitraum davor ab; eine Differenz zwischen Soll und Ist bucht CraftOS dabei als Kassendifferenz.

### Welche Beträge nimmt das Kassenbuch an?

Buchungen mit einem Datum zwischen der Eröffnung der Kasse und heute sowie Ausgaben bis zum aktuellen Kassenbestand. Übersteigt eine Ausgabe den Bestand, meldet das Formular „Mehr als in der Kasse ist.“

### Was tun, wenn der DATEV-Export nicht startet?

Erscheint „DATEV-Einstellungen fehlen. Bitte Inhaber fragen.“, hinterlegt der Inhaber zuerst die DATEV-Einstellungen unter Einstellungen → „DATEV-Export“. Danach exportieren Sie den Monat erneut.
