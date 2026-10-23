---
title: "Bankumsätze importieren und Zahlungen zuordnen"
description: "So importieren Sie Kontoauszüge als camt.053, CSV oder PDF, ordnen Bankumsätze Belegen zu und bestätigen die Zuordnung."
answer: "Bankumsätze gleichen Sie in der Web-App unter „Buchhaltung“ → „Bankumsätze“ ab: Kontoauszug als camt.053, CSV oder PDF importieren, die Vorschau prüfen und jeden Umsatz einem Beleg oder einer erfassten Zahlung zuordnen. Die Zuordnung bestätigen Sie selbst."
category: "belege"
publishedAt: "2026-10-23"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
scene: "bank"
relatedFeatures: ["bankabgleich", "buchhaltung", "rechnungen"]
relatedArticles: ["/hilfe/zahlungen-erfassen", "/hilfe/beleg-kontieren-zuordnen", "/hilfe/datev-export-erstellen", "/hilfe/mahnwesen-einrichten"]
sources: []
platforms: ["web"]
---

Der Bankabgleich verbindet die Umsätze Ihres Kontoauszugs mit Ihren Rechnungen, Eingangsbelegen und bereits erfassten Zahlungen. So sehen Sie, welche Zahlungen eingegangen sind und welche Umsätze noch offen sind.

## Voraussetzungen

- Sie arbeiten in der Web-App mit Finanzrechten (Admin oder Büro-Leitung).
- Sie haben einen Kontoauszug Ihres Euro-Kontos als camt.053 oder CSV (bis 2 MiB) oder als PDF (bis 10 MiB).
- Eine Datei enthält höchstens 2.000 Umsätze.

## Schritt für Schritt in der Web-App

### Kontoauszug importieren

1. Öffnen Sie „Buchhaltung“ und wechseln Sie zu „Bankumsätze“.
2. Klicken Sie „Bankdatei importieren“.
3. Wählen Sie die camt.053-Datei, die CSV-Datei oder den PDF-Kontoauszug aus.
4. Prüfen Sie bei CSV-Dateien unter „CSV-Spalten und Format prüfen“ die Zuordnung der Spalten.
5. Wählen Sie bei einem PDF-Auszug „KI-Auslesung aktivieren und Credit-Verbrauch bestätigen“ und klicken Sie „PDF mit KI auslesen“.
6. Prüfen Sie die Vorschau und bestätigen Sie „Vorschau geprüft“.
7. Klicken Sie „Umsätze importieren“.

### Umsatz zuordnen

1. Klicken Sie beim gewünschten Umsatz „Zuordnen“.
2. Suchen Sie im Dialog „Bankumsatz zuordnen“ unter „Beleg oder Zahlung suchen“ den passenden Beleg.
3. Wählen Sie „Zahlung aus Bankumsatz erfassen“ oder „Bestehende Zahlung verknüpfen“.
4. Prüfen Sie den Betrag und den Rest unter „Noch zuzuordnen“.
5. Klicken Sie „Zuordnung bestätigen“.

## Ergebnis prüfen

Ein fertig zugeordneter Umsatz trägt in der Liste „Vollständig zugeordnet“. Neue Zahlungen erhalten das Buchungsdatum des Bankumsatzes; bestehende Zahlungen werden nur verknüpft und zählen dadurch kein zweites Mal. Mit dem Filter „Zuordnungsstatus“ zeigen Sie gezielt die Umsätze, die noch offen sind.

## Häufige Probleme

### Wann entsteht die Zahlung am Beleg?

Mit der bestätigten Zuordnung. Der Import legt die Bankumsätze an; die Zahlung am Beleg entsteht erst, wenn Sie „Zuordnung bestätigen“ klicken.

### Was kostet das Einlesen der Kontoauszüge?

camt.053- und CSV-Dateien liest CraftOS ohne KI-Credits ein. PDF-Auszüge lesen Sie auf Anforderung mit KI aus; dafür bestätigen Sie vorher den Credit-Verbrauch und prüfen danach die Vorschau.

### Wie helfen KI-Vorschläge bei der Zuordnung?

Passende Belegnummern, Namen und Beträge hebt CraftOS ohne Credits hervor. Weitere KI-Vorschläge holen Sie auf Anforderung mit „KI-Vorschläge aktivieren und Credit-Verbrauch bestätigen“; die Zuordnung bestätigen Sie selbst.

### Wie nehme ich eine falsche Zuordnung zurück?

Öffnen Sie den Umsatz, klicken Sie „Zurücknehmen“, tragen Sie den „Grund der Rücknahme“ ein und klicken Sie „Rücknahme bestätigen“. Danach ordnen Sie den Umsatz neu zu.
