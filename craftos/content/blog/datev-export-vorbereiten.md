---
title: "DATEV-Export vorbereiten: Belege prüfen, Zeitraum abstimmen und Übergabe kontrollieren"
description: "So bereiten Sie einen nachvollziehbaren DATEV-Export mit richtigen Zuordnungen, vollständigen Belegen und dokumentierten Rückfragen vor."
category: "belege"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Bereiten Sie einen DATEV-Export vor, indem Sie Zeitraum, Belege und Kontierung prüfen und die geprüften Belege festschreiben. In CraftOS führt „Buchhaltung → Steuerberater“ durch Zeitraum, Prüfung, Festschreiben und Übergabe-Paket."
relatedFeatures: ["buchhaltung", "eingangsrechnungen"]
relatedArticles: ["/hilfe/datev-export-erstellen", "/blog/eingangsrechnungen-digital-organisieren"]
sources: [{"url": "https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html", "label": "Bundesfinanzministerium: GoBD im Amtlichen AO-Handbuch 2025", "checkedAt": "2026-10-23"}, {"url": "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2025-07-14-GoBD-2-aenderung.html", "label": "Bundesfinanzministerium: zweite GoBD-Änderung vom 14. Juli 2025", "checkedAt": "2026-10-23"}]
platforms: ["web"]
---

## Was sollten Sie mit der Kanzlei vorab abstimmen?

Stimmen Sie Kontenrahmen, Berater- und Mandantennummer, Exportumfang und Übergabeweg vor dem ersten Export mit der Kanzlei ab. In CraftOS hinterlegen Sie diese Angaben einmal in den DATEV-Einstellungen; jeder Export nutzt danach dieselben Werte.

| Angabe | Herkunft | Feld in CraftOS |
|---|---|---|
| Kontenrahmen SKR03 oder SKR04 | Kanzlei | „Standard-Kontenrahmen“ |
| Beraternummer und Mandantennummer | Kanzlei | „DATEV-Stammdaten (vom Steuerberater)“ |
| Wirtschaftsjahr und Kontenlänge | Kanzlei | „Wirtschaftsjahr-Beginn“, „Sachkontenlänge“ |
| Übergabeweg und Ansprechperson | Betrieb und Kanzlei | interne Ablaufnotiz |

Notieren Sie den vereinbarten Ablauf an einer für das Büro zugänglichen Stelle. Wenn die zuständige Person im Urlaub ist, weiß die Vertretung so, welcher Zeitraum zuletzt übergeben wurde und welche Punkte offen sind.

## Welche Prüfungen gehören vor den Export?

Prüfen Sie vor dem Export Zeitraum, Ausgangsrechnungen, Eingangsbelege, Kontierung und Zahlungen. Jede offene Frage in diesen Bereichen klären Sie, bevor die Belege festgeschrieben werden.

| Bereich | Vor der Übergabe kontrollieren |
|---|---|
| Zeitraum | Anfang und Ende entsprechen dem vereinbarten Abrechnungslauf. |
| Ausgangsrechnungen | Richtiger Fertigstellungs- und Korrekturstand. |
| Eingangsbelege | Angaben geprüft und Original vorhanden. |
| Kontierung | Fehlende oder unklare Zuordnungen geklärt. |
| Zahlungen | Tatsächliche Bewegungen nachvollziehbar erfasst. |
| Wiederholung | Frühere Exporte und Nachlieferungen kenntlich gemacht. |

Prüfen Sie nicht nur die letzte Seite einer Liste. Nutzen Sie Filter für ungeprüfte oder unvollständige Vorgänge und bearbeiten Sie die Ursachen.

## Wie sieht ein typischer Monatsfall aus?

Der Musterbetrieb übergibt den September mit zwölf Ausgangsrechnungen und 27 Eingangsbelegen. Zwei Belege sind noch ungeprüft, bei einem fehlt die Kontenzuordnung und bei einer Rechnung liegt eine Korrektur vor.

Prüfen Sie zuerst die zwei Belege, ergänzen Sie die Kontierung und kontrollieren Sie den Zusammenhang der Rechnungskorrektur. Erst danach lässt sich beurteilen, ob die Datenmenge vollständig ist.

Bleibt ein Beleg bewusst offen, dokumentieren Sie die Rückfrage. Die Kanzlei erkennt so, ob die Übergabe vollständig ist oder eine Nachlieferung folgt.

## Wie läuft die Übergabe in CraftOS ab?

In der Web-App führt „Buchhaltung → Steuerberater“ in vier Schritten durch Zeitraum, Prüfung, Festschreiben und Übergabe. Die Ansicht öffnen Personen mit Voll-Lizenz und Finanzrechten.

1. Öffnen Sie in der Web-App „Buchhaltung → Steuerberater“.
2. Wählen Sie unter „Welchen Zeitraum übergibst du?“ einen Monat, ein Quartal oder einen eigenen Zeitraum.
3. Arbeiten Sie unter „Ist alles vollständig?“ die angezeigten Hinweise zu Entwürfen und Belegen ab.
4. Schreiben Sie im Schritt „Festschreiben (GoBD)“ die geprüften Belege fest oder lassen Sie das den Inhaber erledigen.
5. Wählen Sie „Steuerberater-Paket (ZIP) — empfohlen“ oder „Nur Buchungsdaten (CSV)“.
6. Klicken Sie auf „Übergabe-Paket herunterladen“.

Das Steuerberater-Paket enthält den DATEV-Buchungsstapel, die Belege, das Buchungsjournal, die Offene-Posten-Liste und den Zeiten-Nachweis. In den Export gelangen die festgeschriebenen Belege des Zeitraums.

Den Kontenrahmen übernimmt der Export aus den DATEV-Einstellungen des Betriebs. Hinterlegen Sie diese vor dem ersten Export unter „Einstellungen → DATEV-Export“, damit die Übergabe mit den abgestimmten Werten startet.

## Was kontrollieren Sie nach dem Download?

Öffnen Sie das Paket und vergleichen Sie Dateien, Beleganzahl und Zeitraum mit Ihrer Vorbereitung. Die Bestätigung in CraftOS nennt die Zahl der Rechnungen und Belege mit Gesamtbetrag und zeigt Hinweise zu fehlenden Originaldateien direkt darunter.

Mit „Per E-Mail ankündigen“ öffnen Sie einen E-Mail-Entwurf an die Kanzlei. Hängen Sie die Datei aus Ihrem Download-Ordner an und prüfen Sie Empfänger, Anhang und Zeitraum vor dem Versand.

Bitten Sie beim ersten Export um eine Rückmeldung zur Übernahme. So werden Format- oder Kontierungsfragen früh sichtbar, bevor mehrere Monate mit demselben Thema folgen.

## Wie vermeiden Sie doppelte Übergaben?

Benennen Sie Exporte eindeutig nach Zeitraum und Stand und dokumentieren Sie, ob es sich um die erste Übergabe, eine Korrektur oder eine Ergänzung handelt. Nach einer Änderung senden Sie gezielt die Korrektur mit einem kurzen Hinweis an die Kanzlei.

Der verlässliche Prozess entsteht aus geprüften Daten, abgestimmter Zuständigkeit und einer nachvollziehbaren Kommunikation mit der Kanzlei. CraftOS hält dafür Zeitraum und Prüfstand jedes Exports im selben Ablauf zusammen.

## Warum ist die Festschreibung ein bewusster Kontrollpunkt?

Die Festschreibung sichert den geprüften Belegstand; danach ändern Sie einen Beleg über eine nachvollziehbare Korrektur. Ein fehlendes Konto oder ein falsches Original klären Sie deshalb vorher.

Bestimmen Sie, wer diesen Kontrollpunkt verantwortet und wie offene Rückfragen übergeben werden. Die betriebliche Verfahrensdokumentation beschreibt dazu, wer prüft, wer festschreibt und wie Korrekturen ablaufen.

## So unterstützt CraftOS

Die [Buchhaltung](/funktionen/buchhaltung) verbindet Eingangsbelege, Ausgangsrechnungen und die Übergabe an die Kanzlei in der Web-App. Die [Anleitung zum DATEV-Export](/hilfe/datev-export-erstellen) zeigt jeden Schritt mit den Bildschirmtexten.

[GoBD in CraftOS](/gobd) erklärt, wie Belegprüfung, festgeschriebener Dokumentstand und nachvollziehbare Korrekturen zusammenwirken. Der Export baut auf diesem geprüften Bestand auf.
