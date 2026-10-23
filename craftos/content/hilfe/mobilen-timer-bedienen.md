---
title: "Den Timer in der Mobile-App starten und stoppen"
description: "So erfassen Sie Arbeitszeiten mit GPS, nutzen die automatische Projektzuordnung und prüfen Start- und Endstandort."
category: "zeiten"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Tippen Sie in der Mobile-App unter „Zeiten“ auf „Starten“ und am Ende auf „Stoppen“; die App speichert dabei jeweils Ihren Standort. Starten Sie ohne Projekt, ordnet CraftOS das nächstgelegene Projekt innerhalb des eingestellten Radius automatisch zu."
relatedFeatures: ["zeiterfassung"]
relatedArticles: ["/hilfe/zeiteintrag-erfassen-korrigieren", "/hilfe/mobile-offline-synchronisierung", "/hilfe/projekt-phasen-anlegen"]
sources: []
platforms: ["mobile"]
---

Der mobile Timer erfasst Arbeit oder Fahrt und speichert beim Starten und Stoppen jeweils einen Standortpunkt. So landet die Zeit direkt beim richtigen Projekt.

## Voraussetzungen

- Mobile-App mit App-Lizenz oder Voll-Lizenz und ein eingerichtetes Mitarbeiterprofil.
- Die Standortfreigabe für die App auf Ihrem Gerät.
- Sichtbare Projekte und Zeiten richten sich nach Ihren Zugriffsrechten.

## Schritt für Schritt in der Mobile-App

### Den Timer bedienen

1. Tippen Sie auf „Zeiten“; mit Voll-Lizenz finden Sie den Bereich unter „Mehr“.
2. Prüfen Sie auf dem Bildschirm „Zeiterfassung“, ob bereits ein Timer läuft.
3. Wählen Sie die Art „Arbeit“ oder „Fahrt“.
4. Tippen Sie auf „Starten“ und erlauben Sie beim ersten Mal den Standortzugriff.
5. Prüfen Sie, ob der laufende Vorgang dem richtigen Projekt zugeordnet ist.
6. Tippen Sie am Ende auf „Stoppen“.

Im Projekt selbst starten Sie die Zeit mit „Zeit für dieses Projekt erfassen“. Dieses ausdrücklich gewählte Projekt bleibt maßgeblich, auch wenn ein anderes näher liegt. Läuft ein Timer für ein anderes Projekt, zeigt die App „Timer läuft für:“ mit dem Projektnamen.

### Die automatische Projektzuordnung einstellen

1. Öffnen Sie „Einstellungen“.
2. Wählen Sie „Automatische Projektzuordnung“.
3. Stellen Sie den Radius auf 50, 100 oder 200 Meter.

Voreingestellt sind 100 Meter. Im Web legen Sie für ein Projekt einen eigenen Radius fest, der Vorrang vor dem App-Standard hat. Die Zuordnung nutzt den gespeicherten Projektstandort; die [Projektanleitung](/hilfe/projekt-phasen-anlegen) zeigt, wie Sie Adresse und Projektort pflegen.

Beim Start ohne vorgegebenes Projekt wählt CraftOS das nächstgelegene zugängliche, nicht archivierte Projekt innerhalb seines Radius. Liegt keines in der Nähe, startet der Timer ohne Projekt; den Projektbezug ergänzen Sie dann im Zeiteintrag. Beim Stoppen bleibt das Projekt unverändert.

## Ergebnis prüfen

Der gestoppte Vorgang erscheint unter „Zeiteinträge“ mit Projekt, Datum und Dauer. Eine Pause oder Korrektur tragen Sie im Eintrag nach, wie in der [Korrekturanleitung](/hilfe/zeiteintrag-erfassen-korrigieren) beschrieben.

In den Details eines Eintrags sehen Sie Start- und Endstandort mit der gemeldeten Genauigkeit. Erfasst werden einzelne Standortpunkte bei Ihrer Aktion. Nach der Synchronisierung sehen berechtigte Personen die Angaben auch in der Web-App.

## Häufige Probleme

### Warum startet oder stoppt der Timer nicht?

Die App braucht beim Starten und Stoppen einen Standort. Prüfen Sie die Standortfreigabe und die Ortungsdienste des Geräts und versuchen Sie es an einer Stelle mit besserem Empfang erneut; bis dahin läuft der Timer weiter.

### Warum wurde kein Projekt automatisch gewählt?

Prüfen Sie Projektzugriff, Archivstatus, gespeicherten Projektstandort und Radius. Liegen mehrere Baustellen nah beieinander, kontrollieren Sie das angezeigte Projekt und korrigieren Sie es im Eintrag.

### Was tue ich, wenn ich das Stoppen vergessen habe?

Stoppen Sie den Timer und korrigieren Sie danach Beginn, Ende und Pause im Eintrag. So bleibt es bei einem Eintrag statt eines zusätzlichen Nachtrags.

### Was zeigt die App ohne Internetverbindung?

Der Timer läuft auch offline, und die App überträgt die Zeit später. Die [Offline-Hilfe](/hilfe/mobile-offline-synchronisierung) erklärt den Synchronisierungsstatus.

Die [Zeiterfassung](/funktionen/zeiterfassung) zeigt den Gesamtprozess vom Timer bis zur Auswertung.
