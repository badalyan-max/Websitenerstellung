---
title: "Ein Projekt mit Phasen anlegen"
description: "So legen Sie ein Projekt mit Arbeitsabschnitten an, planen die Reihenfolge und sehen die Abschnitte in der Mobile-App."
category: "projekte"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Legen Sie das Projekt unter „Projekte“ an und gliedern Sie es unter „Terminplanung“ mit „Abschnitt anlegen“ in Arbeitsabschnitte (Bauphasen). Geplant wird in der Web-App; die Mobile-App zeigt die Abschnitte mit Status im Projekt und am Einsatz."
relatedFeatures: ["terminplanung", "projektverwaltung", "plantafel"]
relatedArticles: ["/hilfe/plantafel-einsatz-planen", "/hilfe/mobilen-timer-bedienen", "/hilfe/projektdateien-ordner"]
sources: []
platforms: ["web", "mobile"]
---

Ein Projekt bündelt Unterlagen, Termine und Zeiten einer Baustelle. Arbeitsabschnitte, oft Bauphasen genannt, gliedern die Ausführung: was wird wann gemacht. Wer wann vor Ort ist, planen Sie danach als Einsatz.

## Voraussetzungen

- Web-App: Voll-Lizenz (Admin oder Büro) mit Projektzugriff.
- Mobile-App: Zugriff auf das Projekt; den Projektort setzen Rollen, die Projekte bearbeiten dürfen.
- Für „Abschnitte aus Angebot vorschlagen“ liegt im Projekt ein Angebot oder eine Auftragsbestätigung mit Leistungspositionen.

## Schritt für Schritt in der Web-App

### Das Projekt anlegen

1. Öffnen Sie „Projekte“ und klicken Sie auf „Neues Projekt“.
2. Tragen Sie unter „Titel *“ einen eindeutigen Namen ein und wählen Sie den Kunden.
3. Ergänzen Sie „Gewerke“, „Beschreibung“ und die vollständige „Adresse“.
4. Prüfen Sie „Status“, „Startdatum“ und „Fälligkeitsdatum“.
5. Klicken Sie auf „Projekt erstellen“.

Aus der Adresse ermittelt CraftOS den Projektstandort für Einsatzkarte und automatische Zeitzuordnung. Im Dialog „Projekt bearbeiten“ wählen Sie dafür einen Radius von 50, 100 oder 200 Metern oder den „App-Standard“ des Mobilgeräts.

### Arbeitsabschnitte anlegen

1. Öffnen Sie das Projekt und wechseln Sie zu „Terminplanung“.
2. Klicken Sie auf „Abschnitt anlegen“.
3. Tragen Sie „Name *“, „Von *“ und „Bis *“ ein.
4. Öffnen Sie bei Bedarf „Mehr Einstellungen“ für Beschreibung, „Geschätzte Stunden“ und Farbe.
5. Tragen Sie unter „Personal- und Gerätebedarf (optional)“ ein, wer und was gebraucht wird.
6. Wählen Sie unter „Startet nach“ den Abschnitt, auf den dieser folgt.
7. Klicken Sie auf „Speichern“ oder direkt auf „Speichern und einplanen“.

Mit „Speichern und einplanen“ öffnet sich anschließend der Dialog „Einplanen“ mit Projekt, Abschnitt und Zeitraum. Reicht ein Abschnitt über den Projektzeitraum hinaus, setzen Sie „Projektzeitraum automatisch anpassen“.

### Abschnitte aus dem Angebot übernehmen

1. Klicken Sie unter „Terminplanung“ auf „Abschnitte aus Angebot vorschlagen“.
2. Wählen Sie unter „Grundlage wählen“ das Angebot oder die Auftragsbestätigung.
3. Setzen Sie „Baustart ab“ und die „Anzahl Personen“.
4. Klicken Sie auf „Aus Angebot übernehmen (ohne KI)“ oder auf „Mit KI vorschlagen“.
5. Prüfen Sie den Vorschlag und wählen Sie „Alles übernehmen“ oder „Auswahl übernehmen“.

Der Weg aus dem Angebot ist kostenlos. „Mit KI vorschlagen“ holen Sie auf Anforderung; der Dialog schätzt vorher die Credits mit „Schätzen“. Wie Sie einen Bauablauf aufbauen, erklärt der Ratgeber [Bauablaufplan](/blog/bauablaufplan).

## Schritt für Schritt in der Mobile-App

Arbeitsabschnitte planen Sie in der Web-App. Die Mobile-App zeigt sie Ihrem Team als Kontext im Projekt und am Einsatz.

1. Tippen Sie auf „Projekte“ und öffnen Sie das Projekt.
2. Öffnen Sie oben über das Menü die „Projektinfos“.
3. Prüfen Sie unter „Arbeitsabschnitte“ die Abschnitte mit ihrem Status.
4. Öffnen Sie unter „Einsätze“ einen Einsatz des Projekts.
5. Lesen Sie in der Zeile „Arbeitsabschnitt“ ab, zu welchem Abschnitt der Einsatz gehört.

Der Status lautet „Geplant“, „In Arbeit“, „Abgeschlossen“ oder „Verzögert“. Steht das Team ohne Projektort auf der Baustelle, tippt eine berechtigte Person im Projekt auf „Aktuellen Standort als Projektort setzen“. Die App fragt dafür einmal den Standort ab.

## Ergebnis prüfen

Das Projekt steht unter „Projekte“. Unter „Terminplanung“ sehen Sie die Arbeitsabschnitte in der Ansicht „Liste“ oder als „Zeitleiste“; prüfen Sie, ob die Zeiträume zum Projekt passen.

Ein Projekt wie die Wohnung Lindenstraße gliedern Sie zum Beispiel in Vorbereitung, Beschichtung und Abschluss. Benennen Sie Abschnitte nach einem verständlichen Ergebnis. In der Liste zeigt „Noch niemand eingeplant“ Abschnitte ohne Einsatz; dort planen Sie mit „Jetzt einplanen“.

## Häufige Probleme

### Was bedeutet „Termin passt nicht zur Reihenfolge“?

Der Abschnitt beginnt vor dem Ende des Abschnitts, nach dem er starten soll. Der Hinweis ist eine Empfehlung, Speichern bleibt möglich; passen Sie Zeitraum oder „Startet nach“ an.

### Warum sieht das Team in der App keine Arbeitsabschnitte?

Die App zeigt „Für dieses Projekt sind keine Arbeitsabschnitte hinterlegt.“, solange im Web keine angelegt sind. Nach dem Anlegen öffnet das Team die Projektinfos einmal mit Internetverbindung.

### Warum wird das Projekt beim Timerstart nicht automatisch gewählt?

Dem Projekt fehlt ein Standort; die App zeigt dann „Kein Standort hinterlegt, Auto-Zuordnung inaktiv“. Ergänzen Sie die Adresse im Web oder setzen Sie den Projektort vor Ort in der App.

### Warum fehlt das Projekt bei einem Teammitglied?

Die Anlage des Projekts ordnet noch keine Person zu. Planen Sie die Person als Einsatz ein oder prüfen Sie Rolle und Projektzuordnung.

Weiter geht es mit [Einsatz planen](/hilfe/plantafel-einsatz-planen); die [Terminplanung](/funktionen/terminplanung) zeigt Arbeitsabschnitte und Abhängigkeiten im Überblick.
