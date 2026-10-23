---
title: "Materialliste für Baustelle und Auftrag: Vorlage und Ablauf"
description: "Welche Angaben in eine Materialliste gehören, wie Sie Mengen aus dem Angebot ableiten und Entnahmen später dem Projekt zuordnen, mit Vorlage als Tabelle."
category: "projekte"
publishedAt: "2026-10-23"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["angebote", "lager"]
relatedArticles: ["/blog/materialverbrauch-baustelle-zuordnen", "/hilfe/material-entnehmen-zurueckbuchen", "/hilfe/angebot-entwurf-anlegen"]
sources: []
platforms: ["web"]
answer: "Eine Materialliste nennt für einen Auftrag jedes benötigte Material mit Artikelnummer, Menge und Einheit, gegliedert nach Positionen. Leiten Sie die Mengen aus dem Angebot ab und nutzen Sie die Liste als Vorgabe für Einkauf, Kommissionierung und Baustelle."
faq:
  - q: "Wo bekommen Sie eine Materialliste-Vorlage?"
    a: "Die Tabellen in diesem Artikel zeigen alle Spalten einer Materialliste zum Übernehmen. In CraftOS entsteht die Liste als PDF direkt aus Angebot oder Auftrag."
  - q: "Wofür ist eine Materialliste ohne Preise gedacht?"
    a: "Für das Team auf der Baustelle und im Lager. Sie zeigt Material, Menge und Einheit je Position; die Kalkulation bleibt im Büro."
  - q: "Wie kommt das verbrauchte Material ins Projekt?"
    a: "Über die Entnahme im Lager. Die Materialliste plant den Bedarf, die Entnahme buchen Sie im Lager auf das Projekt."
  - q: "Was zeigen die Gesamtmengen?"
    a: "Die Summe je Material über alle Positionen. So planen Sie Einkauf und Kommissionierung in einem Schritt."
---

Fehlt auf der Baustelle Material, steht das Team. Eine Materialliste verhindert das: Sie übersetzt das Angebot in eine Packliste, die Einkauf, Lager und Monteure gleich lesen.

## Was gehört in eine Materialliste?

In eine Materialliste gehören Kopfangaben zum Auftrag und je Position das benötigte Material mit Artikelnummer, Menge und Einheit. Eine Spalte zum Abhaken zeigt, was bereits kommissioniert oder verbaut ist.

Die folgende Tabelle können Sie als Vorlage für die Kopfangaben übernehmen.

| Kopfangabe | Beispiel |
|---|---|
| Projekt | Familie Weber, Dachgeschossausbau |
| Baustelle | Lindenstraße 12, 70173 Stuttgart |
| Kunde | Familie Weber |
| Beleg | Auftrag A-2026-118 vom 12.10.2026 |
| Verantwortlich | Vorarbeiter M. Krause |

Darunter folgt das Material je Position.

| Pos. | Material / Artikel | Art.-Nr. | Menge | Einheit | Erledigt |
|---|---|---|---:|---|---|
| 1.1 | Gipskartonplatte 12,5 mm | GK-125 | 63 | m² | |
| 1.1 | CW-Profil 50 mm | CW-50 | 48 | m | |
| 1.2 | Mineralwolle 60 mm | MW-60 | 42 | m² | |
| 2.1 | Spachtelmasse | SP-25 | 3 | Sack | |

## Wie leiten Sie die Mengen aus dem Angebot ab?

Multiplizieren Sie die Menge jeder Angebotsposition mit dem Materialbedarf je Einheit und runden Sie auf ganze Gebinde auf. Fassen Sie gleiches Material aus mehreren Positionen danach zu einer Gesamtmenge zusammen.

| Position | Menge im Angebot | Bedarf je Einheit | Materialmenge |
|---|---:|---|---:|
| 1.1 Trockenbauwand beplanken | 60 m² | 1,05 m² Platte je m² | 63 m² |
| 1.1 Unterkonstruktion | 60 m² | 0,8 m Profil je m² | 48 m |
| 1.2 Dämmung einlegen | 40 m² | 1,05 m² je m² | 42 m² |

Die Bedarfswerte im Beispiel sind fiktiv. Übernehmen Sie Ihre eigenen Werte aus der Kalkulation oder den Herstellerangaben.

## Wie nutzen Sie die Materialliste auf der Baustelle?

Geben Sie die Liste vor dem ersten Einsatz an das Team und lassen Sie jede kommissionierte Menge abhaken. Fehlmengen und Mehrbedarf notiert das Team direkt in der Liste, damit das Büro nachbestellen kann.

- Prüfen Sie die Liste vor dem Einsatz gegen Lagerbestand und Lieferungen.
- Haken Sie kommissioniertes Material in der letzten Spalte ab.
- Notieren Sie Mehrbedarf mit Menge und Grund.
- Melden Sie Restmengen nach dem Einsatz an das Lager zurück.

## Wie ordnen Sie den Materialverbrauch dem Projekt zu?

Buchen Sie jede Entnahme aus dem Lager auf das Projekt, für das sie verbraucht wird. So vergleichen Sie später geplante und tatsächliche Mengen und sehen die Materialkosten in der Nachkalkulation.

Wie Sie dabei vorgehen, zeigt der Ratgeber [Materialverbrauch der Baustelle zuordnen](/blog/materialverbrauch-baustelle-zuordnen).

## So unterstützt CraftOS

In der Web-App erzeugen Sie aus einem Angebot oder Auftrag über „Materialliste drucken (ohne Preise)“ ein PDF für Ihr Team. Es enthält die Kopfangaben zu Projekt, Baustelle, Kunde und Beleg, das „Material je Position“ mit „Art.-Nr.“, Menge und Einheit, eine Spalte zum Abhaken sowie die „Gesamtmengen“ über alle Positionen.

Die Mengen stammen aus den Materialzeilen Ihrer Kalkulation und aus Artikelpositionen. Die Entnahme buchen Sie im [Lager](/funktionen/lager) auf das Projekt, wie in [Material entnehmen und zurückbuchen](/hilfe/material-entnehmen-zurueckbuchen) beschrieben.

## Schritt für Schritt in der Web-App

1. Öffnen Sie in „Projekte“ das Projekt und wechseln Sie zu „Dokumente“.
2. Öffnen Sie beim Angebot oder Auftrag das Aktionsmenü.
3. Wählen Sie „Materialliste drucken (ohne Preise)“.
4. Prüfen Sie im PDF die „Gesamtmengen“ und geben Sie die Liste an das Team.
