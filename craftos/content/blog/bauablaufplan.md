---
title: "Bauablaufplan und Bauzeitenplan: Abschnitte, Abhängigkeiten und Termine"
description: "Wie Sie einen Bauablaufplan erstellen, Bauphasen, Abhängigkeiten und Puffer festlegen und den Bauzeitenplan im Handwerksbetrieb aktuell halten."
category: "projekte"
publishedAt: "2026-10-23"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["terminplanung", "plantafel", "projektverwaltung"]
relatedArticles: ["/hilfe/projekt-phasen-anlegen", "/blog/baustellen-einsatzplanung", "/hilfe/plantafel-einsatz-planen"]
sources: [{"url": "https://www.fib-bund.de/Inhalt/Vergabe/VOB/VOB-B_2016_nichtamtliche_Fassung.pdf", "label": "VOB/B Ausgabe 2016, § 5 Ausführungsfristen (Fachinformation Bundesbau, BMWSB)", "checkedAt": "2026-10-23"}]
platforms: ["web", "mobile"]
answer: "Ein Bauablaufplan legt fest, welche Arbeitsschritte in welcher Reihenfolge, mit welcher Dauer und mit welchen Abhängigkeiten ausgeführt werden; der Bauzeitenplan ordnet diese Schritte festen Terminen zu. Planen Sie Puffer ein und passen Sie den Plan bei jeder Änderung an."
faq:
  - q: "Welches Programm eignet sich für einen Bauzeitenplan?"
    a: "Ein Programm mit Zeitleiste und Abhängigkeiten zwischen den Abschnitten. In CraftOS planen Sie Arbeitsabschnitte in der Web-App unter „Terminplanung“ und sehen sie als Liste oder Zeitleiste."
  - q: "Wann sollte der Bauzeitenplan stehen?"
    a: "Vor Beginn der Arbeiten, damit Termine, Personal und Material abgestimmt sind. Ändert sich ein Termin, passen Sie den Plan sofort an und informieren die Beteiligten."
  - q: "Wie heißen Bauphasen in CraftOS?"
    a: "Bauphasen heißen in CraftOS Arbeitsabschnitte. Ein Arbeitsabschnitt beschreibt, was wann gemacht wird, zum Beispiel Abbruch, Elektro oder Fliesen."
  - q: "Sieht das Team auf der Baustelle den Plan?"
    a: "Ja. Die Mobile-App zeigt die Arbeitsabschnitte mit Status im Projekt und am Einsatz; geplant und geändert wird in der Web-App."
---

Ein Bauablaufplan beantwortet die Frage, wer wann was auf der Baustelle macht. Er verbindet Gewerke, Personal und Material zu einer Reihenfolge, die alle Beteiligten kennen.

## Was ist der Unterschied zwischen Bauablaufplan und Bauzeitenplan?

Der Bauablaufplan beschreibt die Reihenfolge der Arbeitsschritte und ihre Abhängigkeiten. Der Bauzeitenplan setzt diese Schritte auf konkrete Kalendertermine. In der Praxis werden beide Begriffe oft für denselben Plan verwendet.

## Was gehört in einen Bauzeitenplan?

In einen Bauzeitenplan gehören die Bauphasen mit Beginn, Dauer und Ende, die Abhängigkeiten zwischen ihnen, die zuständigen Gewerke oder Personen und feste Termine wie Lieferungen oder Abnahmen.

- Bauphasen oder Arbeitsabschnitte mit Bezeichnung
- Beginn, Dauer und Ende jedes Abschnitts
- Vorgänger, nach denen ein Abschnitt starten kann
- Zuständiges Gewerk, Team oder Nachunternehmer
- Puffer für Trocknungszeiten und Lieferungen
- Feste Termine wie Anlieferung, Prüfung oder Abnahme

Das Beispiel zeigt den Ablauf einer Badsanierung über drei Wochen.

| Nr. | Abschnitt | Dauer | Startet nach | Gewerk |
|---|---|---|---|---|
| 1 | Abbruch und Entsorgung | 2 Tage | – | Sanitär |
| 2 | Rohinstallation Wasser und Abwasser | 3 Tage | 1 | Sanitär |
| 3 | Elektroinstallation | 2 Tage | 1 | Elektro |
| 4 | Estrich und Trocknung | 5 Tage | 2 und 3 | Estrich |
| 5 | Fliesenarbeiten | 4 Tage | 4 | Fliesen |
| 6 | Endmontage und Abnahme | 2 Tage | 5 | Sanitär, Elektro |

## Wer erstellt den Bauzeitenplan?

Wer den Bauzeitenplan für das gesamte Bauvorhaben aufstellt, regelt der Vertrag. Für die eigenen Arbeiten planen Sie als Betrieb zusätzlich einen internen Ablauf, damit Personal und Material rechtzeitig bereitstehen.

## Ist ein Bauzeitenplan verbindlich?

Das hängt vom Vertrag ab. Bei vereinbarter VOB/B gelten Einzelfristen aus einem Bauzeitenplan nach § 5 Absatz 1 VOB/B nur dann als Vertragsfristen, wenn das im Vertrag ausdrücklich vereinbart ist.

Die Ausführung ist nach derselben Vorschrift nach den verbindlichen Fristen zu beginnen, angemessen zu fördern und zu vollenden. Den vollständigen Text der VOB/B 2016 finden Sie unter den Quellen. Ihre konkreten Vertragsfristen lassen Sie im Einzelfall rechtlich prüfen.

## Wie erstellen Sie einen Bauzeitenplan?

Gehen Sie vom Endtermin oder vom Arbeitsbeginn aus und legen Sie Abschnitt für Abschnitt mit Dauer und Vorgängern an. Prüfen Sie danach, ob Personal und Material zu den Terminen verfügbar sind.

1. Teilen Sie den Auftrag in Bauphasen mit klaren Bezeichnungen.
2. Schätzen Sie die Dauer jeder Phase aus Mengen und Erfahrungswerten.
3. Legen Sie fest, welche Phase auf welche andere warten muss.
4. Planen Sie Puffer für Trocknung, Lieferungen und Prüfungen ein.
5. Setzen Sie Beginn und Ende jeder Phase in den Kalender.
6. Prüfen Sie Personal, Geräte und Material für jeden Abschnitt.
7. Stimmen Sie den Plan mit Auftraggeber und anderen Gewerken ab.

## So unterstützt CraftOS

In der Web-App planen Sie im Projekt unter „Terminplanung“ die Bauphasen, in CraftOS Arbeitsabschnitte genannt. Mit „Abschnitt anlegen“ erfassen Sie Zeitraum und „Reihenfolge“; passt ein Termin nicht zu den Vorgängern, zeigt CraftOS den Hinweis „Termin passt nicht zur Reihenfolge“.

Den Plan sehen Sie als „Liste“ oder „Zeitleiste“. Eingeplante Personen erscheinen in der Plantafel, und das Team sieht die Arbeitsabschnitte mit Status in der Mobile-App. Mehr dazu unter [Terminplanung](/funktionen/terminplanung) und in der Anleitung [Projektphasen anlegen](/hilfe/projekt-phasen-anlegen).
