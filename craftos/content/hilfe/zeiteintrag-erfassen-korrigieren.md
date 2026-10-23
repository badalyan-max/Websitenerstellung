---
title: "Einen Zeiteintrag nachtragen oder korrigieren"
description: "So tragen Sie Zeiten in Web-App und Mobile-App nach und korrigieren Beginn, Ende und Pause eines bestehenden Eintrags."
category: "zeiten"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Öffnen Sie den Eintrag unter „Zeiten“ und korrigieren Sie Beginn, Ende und Pause; CraftOS berechnet die Arbeitszeit daraus, in der Web-App wie in der Mobile-App. Zeiten aus einer ausgestellten Rechnung korrigieren Sie nach einem Storno der Rechnung."
relatedFeatures: ["zeiterfassung"]
relatedArticles: ["/hilfe/zeiten-pruefen-exportieren", "/hilfe/mobilen-timer-bedienen", "/hilfe/rechnung-stornieren", "/blog/projektbezogene-zeiterfassung"]
sources: []
platforms: ["web", "mobile"]
---

Korrigieren Sie den vorhandenen Eintrag, statt dieselbe Arbeit ein zweites Mal zu erfassen. So bleiben Summe, Projektbezug und Standortangaben an einer Stelle.

## Voraussetzungen

- Web-App: Voll-Lizenz (Admin oder Büro) mit Zugriff auf „Zeiten“. Sie sehen die Personen und Projekte, die Ihre Rolle und Projektzuordnung freigeben.
- Mobile-App: App-Lizenz oder Voll-Lizenz und ein mit Ihrem Konto verknüpftes Mitarbeiterprofil.
- Für einen neuen Eintrag in der Mobile-App geben Sie den Standort frei.

## Schritt für Schritt in der Web-App

### Eine Zeit nachtragen

1. Öffnen Sie in der Seitenleiste „Zeiten“.
2. Klicken Sie auf „Zeit erfassen“.
3. Wählen Sie Datum und Projekt, bei Bedarf auch den „Arbeitsabschnitt (optional)“.
4. Tragen Sie „Beginn“, „Ende“ und „Pause (Min.)“ ein.
5. Wählen Sie den „Typ“ und ergänzen Sie die „Beschreibung“.
6. Klicken Sie auf „Speichern“.

Mit Beginn und Ende berechnet der Dialog die Stunden selbst („Aus Beginn, Ende und Pause berechnet.“). Für Arbeit ohne Uhrzeiten lassen Sie beide Felder leer und tragen die „Stunden“ direkt ein. Mit der Berechtigung für alle Projekte wählen Sie unter „Für wen?“ eine andere Person.

### Einen Eintrag korrigieren

1. Öffnen Sie „Zeiten“ und grenzen Sie Zeitraum oder Suche auf den Eintrag ein.
2. Klicken Sie in der Zeile des Eintrags auf „Zeiteintrag bearbeiten“.
3. Korrigieren Sie „Beginn“ und „Ende“.
4. Tragen Sie unter „Pause (Minuten)“ die Pause in ganzen Minuten ein.
5. Prüfen Sie die angezeigte Arbeitszeit sowie Datum, Projekt und Arbeitsabschnitt.
6. Klicken Sie auf „Änderungen speichern“.

Der Dialog „Zeiteintrag bearbeiten“ arbeitet nach dem Grundsatz „Uhrzeiten und Pause korrigieren; die Arbeitszeit wird daraus berechnet.“ Endet die Arbeit nach Mitternacht, rechnet CraftOS mit dem Folgetag und zeigt „Ende am Folgetag“. Die Pause im Dialog gilt für diesen Eintrag; eigene Pauseneinträge bearbeiten Sie jeweils für sich.

Einträge, die nur mit einer Dauer erfasst wurden, korrigieren Sie über das Feld „Stunden“. Mobil erfasste Start- und Endpunkte sehen Sie unter „Erfasste Standorte“; sie bleiben bei der Korrektur erhalten.

## Schritt für Schritt in der Mobile-App

### Eine Zeit nachtragen

1. Tippen Sie unten auf „Zeiten“.
2. Tippen Sie auf „Nachtragen“.
3. Wählen Sie „Arbeit“ oder „Fahrt“ und das Datum.
4. Tragen Sie „Von“ und „Bis“ ein und stellen Sie die „Pause“ ein.
5. Prüfen Sie die „Summe“ und wählen Sie das Projekt.
6. Ergänzen Sie die „Beschreibung“ und tippen Sie auf „Zeit erfassen“.

Beim Speichern eines neuen Eintrags erfasst die App den aktuellen Standort des Geräts. Bei einem Nachtrag für einen vergangenen Tag ist das der Ort, an dem Sie nachtragen. Liegt ein Projekt in der Nähe, wählt die App es vor („Automatisch zugeordnet“); ein aus dem Projekt übernommener Bezug bleibt erhalten. Mit Teamzeiten-Berechtigung wählen Sie unter „Zeit erfassen für“ eine Person des gewählten Projekts.

### Einen Eintrag korrigieren

1. Tippen Sie unter „Zeiten“ auf den Eintrag in der Liste.
2. Tippen Sie in der Ansicht „Zeiteintrag“ auf „Bearbeiten“.
3. Korrigieren Sie „Von“, „Bis“ und „Pause“.
4. Prüfen Sie die „Summe“ und tippen Sie auf „Zeiteintrag speichern“.

Beim Bearbeiten bleiben die vorhandenen Start- und Endpunkte mit ihrer Genauigkeit unverändert. Ohne Netz speichert die App die Änderung auf dem Gerät und überträgt sie später; die [Offline-Hilfe](/hilfe/mobile-offline-synchronisierung) erklärt den Status.

## Abgerechnete Zeiten korrigieren

Zeiten aus einer ausgestellten Rechnung sind gesperrt, damit Rechnung und Zeitnachweis übereinstimmen. Den Korrekturweg öffnet ein Storno der Rechnung:

1. Öffnen Sie die Rechnung, zu der die Zeit gehört.
2. Stornieren Sie die Rechnung, wie in [Rechnung stornieren](/hilfe/rechnung-stornieren) beschrieben.
3. Korrigieren Sie danach den Zeiteintrag wie oben beschrieben.
4. Rechnen Sie die korrigierten Zeiten in einer neuen Rechnung ab.

Gehört die Zeit zu einem Rechnungsentwurf, der noch nicht ausgestellt wurde, wird sie wieder frei, sobald Sie diesen Entwurf löschen.

## Ergebnis prüfen

Der Eintrag zeigt die neuen Uhrzeiten und die daraus berechnete Arbeitszeit. Ein Beispiel: 08:00 bis 16:30 Uhr mit 30 Minuten Pause ergibt 8 Stunden.

Prüfen Sie außerdem, ob für die Arbeit genau ein Eintrag besteht und ob Projekt und Arbeitsabschnitt stimmen. In der Mobile-App ist die Korrektur nach der Synchronisierung auch im Büro sichtbar.

## Häufige Probleme

### Warum lässt sich der Eintrag in der Web-App nicht speichern?

Der Dialog nennt den Grund direkt über den Feldern. „Diese Zeit ist bereits abgerechnet. Bitte zuerst die Rechnung korrigieren.“ führt zum Storno der Rechnung; bei „Läuft noch. Bitte erst stoppen.“ stoppen Sie zuerst den laufenden Timer.

### Was bedeutet der Hinweis zur abgerechneten Zeit in der Mobile-App?

Die App meldet „Diese Zeit ist bereits abgerechnet. Änderungen nur nach Storno der Rechnung.“ Die Änderung wurde nicht übernommen. Lassen Sie die Rechnung im Büro stornieren und korrigieren Sie die Zeit danach erneut.

### Warum erscheint eine Fehlermeldung zu Beginn, Ende oder Pause?

Beginn und Ende brauchen vollständige Uhrzeiten und müssen sich unterscheiden. Die Pause tragen Sie in ganzen Minuten ab 0 ein; sie ist kürzer als die Zeitspanne zwischen Beginn und Ende.

### Welche Stundenzahl ist ohne Uhrzeiten erlaubt?

Erlaubt sind 0,25 bis 24 Stunden je Eintrag. Kleinere oder größere Werte weist der Dialog mit „Mindestens 0,25 Std.“ beziehungsweise „Maximal 24 Std.“ zurück.

### Warum ist die Summe in der Mobile-App 0?

Dann liegen Von, Bis und Pause so, dass keine Arbeitszeit übrig bleibt. Prüfen Sie die drei Angaben; einen versehentlich angelegten Eintrag löschen Sie mit „Zeiteintrag löschen“.

Weiter geht es mit [Zeiten prüfen und exportieren](/hilfe/zeiten-pruefen-exportieren); der [Ratgeber zur projektbezogenen Erfassung](/blog/projektbezogene-zeiterfassung) erklärt die Datenqualität.
