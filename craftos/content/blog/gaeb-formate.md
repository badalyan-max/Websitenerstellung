---
title: "GAEB-Formate erklärt: Versionen, Endungen und Austauschphasen"
description: "Was X81, X83, X84 und X86 bedeuten, welche GAEB-Versionen es gibt, welche Phase der Ausschreibung eine Datei abbildet und wie Sie GAEB-Dateien öffnen."
category: "kalkulation"
publishedAt: "2026-10-23"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["gaeb", "angebote"]
relatedArticles: ["/hilfe/gaeb-importieren", "/blog/handwerkerangebot-erstellen", "/blog/aufmass-angebot-mengen-abzuege"]
sources: [{"url": "https://www.gaeb.de/de/service/faq/gaeb-datenaustausch-faq/", "label": "GAEB: GAEB-Datenaustausch-FAQ", "checkedAt": "2026-10-23"}, {"url": "https://www.gaeb.de/de/produkte/gaeb-datenaustausch/versionen/gaeb-da-xml-version-3-3-stand-2021-05/", "label": "GAEB: GAEB DA XML Version 3.3 Stand 2021-05", "checkedAt": "2026-10-23"}, {"url": "https://www.gaeb.de/de/produkte/gaeb-datenaustausch/", "label": "GAEB: GAEB-Datenaustausch", "checkedAt": "2026-10-23"}]
platforms: ["web"]
answer: "GAEB-Formate sind standardisierte Dateien für den Austausch von Leistungsverzeichnissen im Bauwesen; die Endung zeigt Version und Austauschphase, etwa X83 für die Angebotsaufforderung und X84 für die Angebotsabgabe. Aktueller Standard ist GAEB DA XML."
faq:
  - q: "Wofür steht die Abkürzung GAEB?"
    a: "GAEB steht für Gemeinsamer Ausschuss Elektronik im Bauwesen. Er legt die Regeln fest, nach denen Bauinformationen wie Leistungsverzeichnisse elektronisch ausgetauscht werden."
  - q: "Was bedeutet die Zahl hinter X, D oder P?"
    a: "Sie bezeichnet die Austauschphase, zum Beispiel 83 für die Angebotsaufforderung und 84 für die Angebotsabgabe. Die Benennung der Phasen 81 bis 86 ist laut GAEB in allen Versionen gleich."
  - q: "Was ist GAEB X86?"
    a: "X86 ist die Austauschphase Auftragserteilung. Sie gehört in GAEB DA XML 3.3 zum Paket der Phasen X80 bis X87."
  - q: "Welche GAEB-Dateien liest CraftOS ein?"
    a: "CraftOS liest Leistungsverzeichnisse als X83 im Format GAEB DA XML 3.2 und 3.3 ein, bis 5 MiB und in UTF-8. Angebote geben Sie als X84 ab."
---

Wer an öffentlichen oder größeren privaten Ausschreibungen teilnimmt, bekommt Leistungsverzeichnisse meist als GAEB-Datei. Die Endung verrät, aus welcher Generation des Standards die Datei stammt und in welcher Phase der Ausschreibung sie steht.

## Was ist ein GAEB-Format?

Ein GAEB-Format ist eine strukturierte Datei nach den Regeln des Gemeinsamen Ausschusses Elektronik im Bauwesen. Sie lässt sich unabhängig von Hard- und Software austauschen und enthält Bauinformationen wie das Leistungsverzeichnis.

Der heutige Standard GAEB DA XML ist laut GAEB nicht genormt, gilt aber als nationaler Standard und ist in der PAS 1067 dokumentiert. Die aktuelle Version ist [GAEB DA XML 3.3](https://www.gaeb.de/de/produkte/gaeb-datenaustausch/).

## Welche GAEB-Formate gibt es?

Es gibt drei Generationen: GAEB 90 mit Endungen wie .D83, GAEB 2000 mit .P83 und GAEB DA XML mit .X83. Die Ziffern hinter dem Buchstaben bezeichnen die Austauschphase, der Buchstabe die Version.

| Endung | Version laut GAEB | Beispiel |
|---|---|---|
| .D83 | GAEB 1990, kurz GAEB 90 | Datei.D83 |
| .P83 | GAEB DA 2000, kurz GAEB 2000 | Datei.P83 |
| .X83 | GAEB DA XML | Datei.X83 |

Die Phasen 81 bis 86 heißen in allen Versionen gleich. Quelle der Endungen ist die [GAEB-Datenaustausch-FAQ](https://www.gaeb.de/de/service/faq/gaeb-datenaustausch-faq/).

## Was ist GAEB D83?

D83 ist die Angebotsaufforderung im Format GAEB 90. Die Datei ist zeilenorientiert: Jede Zeile hat eine eigene Kennung mit zugehörigem Inhalt, zum Beispiel für den Langtext einer Position.

GAEB DA XML ist dagegen elementorientiert und laut GAEB mit dem Datenaustausch 1990 nicht kompatibel. Für Inhalte, die in beiden Formaten vorkommen, bieten verschiedene Softwarehäuser Module zur Umwandlung an.

## Welche Austauschphasen gibt es?

Jede Austauschphase steht für einen Schritt zwischen Ausschreibung und Auftrag. Die folgende Übersicht zeigt das Paket der Phasen für Leistungsverzeichnisse in GAEB DA XML 3.3.

| Phase | Bedeutung |
|---|---|
| X80 | Universelle LV-Daten |
| X81 | Leistungsbeschreibung |
| X82 | Kostenanschlag |
| X83 | Angebotsaufforderung |
| X84 | Angebotsabgabe |
| X85 | Nebenangebot |
| X86 | Auftragserteilung |
| X87 | Auftragsbestätigung |

Seit Version 3.3 gibt es außerdem X89 für die Rechnung und X89B für die rechnungsbegründende Unterlage, siehe [GAEB DA XML 3.3](https://www.gaeb.de/de/produkte/gaeb-datenaustausch/versionen/gaeb-da-xml-version-3-3-stand-2021-05/).

## Was ist eine X83-Datei?

Eine X83-Datei ist die Angebotsaufforderung: Mit ihr übergibt der Auftraggeber die Daten des Leistungsverzeichnisses an den Bieter. Der Bieter trägt seine Preise ein und gibt sein Angebot als X84 zurück.

## Wie können Sie eine GAEB-Datei öffnen?

Mit einer AVA- oder Kalkulationssoftware, die eine GAEB-Schnittstelle enthält. Ohne solche Software reicht zum Ansehen ein Anzeigewerkzeug, ein sogenannter Viewer; zum Bearbeiten braucht der Viewer eine Ausfüllfunktion.

Welche Programme die Schnittstelle korrekt umgesetzt haben, zeigt laut GAEB die Zertifizierung durch den Bundesverband Bausoftware.

## So unterstützt CraftOS

CraftOS liest Leistungsverzeichnisse als X83 im Format GAEB DA XML 3.2 und 3.3 ein, bis 5 MiB und in UTF-8. Im Dialog „GAEB-Import“ prüfen Sie die Positionen in der „Positionsvorschau“ und übernehmen sie ins Angebot.

Über „GAEB exportieren“ geben Sie das Leistungsverzeichnis als X83 und Ihr Angebot als „X84 — Angebotsabgabe“ aus. Für die X84 übernehmen Sie die Original-Ausschreibung vollständig und bestätigen vor dem Export, dass alle Preise geprüft sind. Die Anleitung finden Sie unter [GAEB importieren](/hilfe/gaeb-importieren), den Überblick unter [GAEB und DATANORM](/funktionen/gaeb).
