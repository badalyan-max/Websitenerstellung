---
title: "Eine Abnahme mit Prüfpunkten und Ergebnis dokumentieren"
description: "So erfassen Sie Teilabnahme und Endabnahme mit Prüfpunkten, Mängeln und mobilen Unterschriften und nutzen das Protokoll in der Web-App weiter."
category: "baudokumentation"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["baudokumentation", "maengelmanagement", "rechnungen"]
relatedArticles: ["/hilfe/mangel-erfassen-bearbeiten", "/blog/maengelanzeige", "/hilfe/abschlagsrechnung-erstellen", "/hilfe/schlussrechnung-erstellen"]
sources: [{"url": "https://www.gesetze-im-internet.de/bgb/__640.html", "label": "§ 640 BGB: Abnahme", "checkedAt": "2026-10-23"}, {"url": "https://www.gesetze-im-internet.de/bgb/__641.html", "label": "§ 641 BGB: Fälligkeit der Vergütung", "checkedAt": "2026-10-23"}, {"url": "https://dejure.org/gesetze/VOB-B/12.html", "label": "§ 12 VOB/B: Abnahme", "checkedAt": "2026-10-23"}]
platforms: ["web", "mobile"]
answer: "In der Mobile-App erstellen Sie ein Abnahmeprotokoll als Teilabnahme oder Endabnahme mit Prüfpunkten, Ergebnis und beiden Unterschriften. In der Web-App führen Sie die Schlussabnahme durch und schlagen aus einer Teilabnahme eine Abschlagsrechnung vor."
---

Die Mobile-App und die Web-App benennen die Abnahmearten unterschiedlich: Die „Endabnahme“ der Mobile-App heißt in der Web-App „Schlussabnahme“, die „Teilabnahme“ heißt auf beiden Plattformen gleich.

## Voraussetzungen

- Sie haben Zugriff auf das Projekt; auf der Baustelle arbeiten Sie mit der Mobile-App (App-Lizenz oder Voll-Lizenz).
- Für eine Teilabnahme sind im Projekt Arbeitsabschnitte angelegt (Bauphasen, in CraftOS Arbeitsabschnitte), siehe [Arbeitsabschnitte anlegen](/hilfe/projekt-phasen-anlegen).
- Auftraggeber und Auftragnehmer sind vor Ort, um zu unterschreiben; die Mobile-App darf den Standort verwenden.
- Die Abnahme führen Sie bei Projekten im Status „Beauftragt“ oder „In Ausführung“ durch.
- Abschlagsrechnung und Schlussabnahme in der Web-App erledigen Personen mit Voll-Lizenz und Rechnungsrechten, meist Admin oder Büro-Leitung.

## Schritt für Schritt in der Mobile-App

1. Öffnen Sie das Projekt und tippen Sie auf „Abnahme“.
2. Tippen Sie auf „Neue Abnahme erstellen“.
3. Stellen Sie unter „Allgemeine Angaben“ die Art der Abnahme auf „Teilabnahme“ oder „Endabnahme“.
4. Prüfen Sie „Datum“, „Auftraggeber“ und „Auftragnehmer“.
5. Wählen Sie bei einer Teilabnahme unter „Abgenommene Arbeitsabschnitte“ die Abschnitte, die heute abgenommen werden.
6. Setzen Sie unter „Arbeitsschritte & Prüfpunkte“ jeden Punkt auf „OK“, „Mangel“ oder „Offen“.
7. Beschreiben Sie jeden Mangel im Feld „Mangel beschreiben“ mit Ort und Befund.
8. Tippen Sie auf „Prüfpunkt hinzufügen“ oder „Allgemeine Abnahme-Vorlage verwenden“, wenn Punkte fehlen.
9. Lassen Sie Auftragnehmer und Auftraggeber unterschreiben, zum Beispiel mit „Beide unterschreiben (Vollbild)“.
10. Tippen Sie auf „Protokoll erstellen“.

Die Arbeitsschritte der gewählten Arbeitsabschnitte erscheinen als Prüfpunkte, vorbelegt aus der Erfassung auf der Baustelle; prüfen Sie jeden Punkt gemeinsam mit dem Auftraggeber. Den Stand der Arbeitsschritte speichert die App mit dem Protokoll. Verweigert der Auftraggeber die Abnahme, schalten Sie unter „Ergebnis“ die Option „Abnahme verweigern“ ein; das Protokoll erhält dann das Ergebnis „Abgelehnt“.

## Schritt für Schritt in der Web-App

### Schlussabnahme durchführen

1. Öffnen Sie das Projekt und den Reiter „Baudokumentation“.
2. Klicken Sie im Bereich „Abnahme“ auf „Abnahme durchführen“.
3. Tragen Sie das „Abnahmedatum“ ein.
4. Setzen Sie für jeden Prüfpunkt den Status „In Ordnung“, „Mangel“ oder „Offen“.
5. Wählen Sie unter „Art der Abnahme“ „Abnahme ohne Vorbehalte“ oder „Abnahme mit Vorbehalten“.
6. Wählen Sie bei Vorbehalten die betroffenen Mängel unter „Zu verlinkende Mängel“ und beschreiben Sie sie.
7. Prüfen Sie die Angabe zur „Gewährleistung“ und klicken Sie auf „Abnahme bestätigen“.

### Teilabnahme für eine Abschlagsrechnung nutzen

1. Öffnen Sie das Projekt im Reiter „Übersicht“; dort erscheint die unterschriebene Teilabnahme als Hinweis.
2. Klicken Sie auf „Protokoll ansehen“ und prüfen Sie das PDF.
3. Klicken Sie auf „Abschlagsrechnung vorschlagen“.
4. Wählen Sie unter „Auftrag oder Angebot“ die Vertragsgrundlage und klicken Sie auf „Weiter“.
5. Prüfen Sie im Dialog „Umfang der Teilabnahme“ die abgenommenen Arbeitsabschnitte und den „Betrag (Vorschlag, netto)“.
6. Klicken Sie auf „Pauschalen Abschlag öffnen“ und passen Sie Leistungsstand und Betrag in der Rechnung an.

Eine in der Mobile-App unterschriebene Endabnahme übernehmen Sie in der „Übersicht“ mit „Abnahme übernehmen“ und „Abnahme bestätigen“. Danach gibt CraftOS die Schlussrechnung frei, mit der Sie das Projekt abrechnen. Den Ablauf zeigen [Abschlagsrechnung erstellen](/hilfe/abschlagsrechnung-erstellen) und [Schlussrechnung erstellen](/hilfe/schlussrechnung-erstellen).

## Ergebnis prüfen

- Im Reiter „Baudokumentation“ steht das Protokoll im Bereich „Abnahme“ mit Datum, Art („Teilabnahme“ oder „Schlussabnahme“) und Ergebnis, zum Beispiel „Abgenommen“ oder „Abnahme unter Vorbehalt“.
- Ein Klick auf das Protokoll öffnet die PDF-Vorschau; mit „Als PDF herunterladen“ speichern Sie das Dokument.
- In der Mobile-App zeigt das Protokoll die „Abgenommene Arbeitsabschnitte“ und unter „Unterschrifts-Orte“ Ort und Zeitpunkt jeder Unterschrift.
- Verknüpfte Mängel erscheinen am Protokoll mit ihrem aktuellen Status.

## Häufige Probleme

### Warum lässt sich das Protokoll nicht mehr bearbeiten?

Nach beidseitiger Unterschrift ist das Protokoll gesperrt und bleibt so unverändert erhalten. Für eine neue Abnahme stornieren Sie das Protokoll in der Web-App mit Stornogrund oder löschen ein Protokoll, das noch nicht unterschrieben ist.

### Was tun, wenn die Unterschrift nicht bestätigt wird?

Die Mobile-App bestätigt eine Unterschrift erst, wenn sie den Standort ermittelt hat. Erlauben Sie den Standortzugriff, warten Sie auf Empfang und tippen Sie erneut auf „Bestätigen“; die Zeichnung bleibt dabei erhalten.

### Warum erscheinen keine Arbeitsschritte als Prüfpunkte?

Die Prüfpunkte stammen aus den Arbeitsschritten der Arbeitsabschnitte. Das Büro legt sie in der Web-App unter „Terminplanung“ an; bis dahin ergänzen Sie eigene Prüfpunkte oder nutzen „Allgemeine Abnahme-Vorlage verwenden“.

### Wann ist eine Teilabnahme nach VOB sinnvoll?

Bei abgeschlossenen Leistungsteilen: Nach § 12 Abs. 2 VOB/B sind in sich abgeschlossene Teile der Leistung auf Verlangen besonders abzunehmen. Ist die Vergütung je Teil bestimmt, wird sie nach § 641 Abs. 1 BGB mit dessen Abnahme fällig. Was in Ihrem Vertrag gilt, klärt dieser.

### Warum fehlt der Hinweis zur Teilabnahme in der Übersicht?

Den Hinweis sehen Personen mit Rechnungs- und Preisrechten. Wer ihn mit „Hinweis ausblenden“ entfernt hat, findet das Protokoll weiterhin im Reiter „Baudokumentation“ unter „Abnahme“.
