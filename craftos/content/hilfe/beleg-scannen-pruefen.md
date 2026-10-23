---
title: "Einen Beleg hochladen, auslesen und prüfen"
description: "So erfassen Sie Eingangsrechnungen und kontrollieren per KI vorgeschlagene Rechnungsdaten vor der Bestätigung."
category: "belege"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Eingangsbelege laden Sie in der Web-App unter „Buchhaltung → Belege → Eingangsbelege“ mit „Neue Eingangsrechnung“ hoch und lassen sie auf Anforderung mit „Mit KI auslesen“ auslesen; mobil nutzen Sie „Beleg scannen“. Die Werte vergleichen Sie mit dem Original und bestätigen danach die Prüfung."
relatedFeatures: ["eingangsrechnungen", "buchhaltung"]
relatedArticles: ["/hilfe/beleg-kontieren-zuordnen", "/blog/ki-belegscan-pruefen"]
sources: []
platforms: ["web", "mobile"]
---

## Voraussetzungen

- Web-App mit Voll-Lizenz und Finanzrechten („Globale Finanzbereiche“) für den Bereich „Buchhaltung“.
- Für „Mit KI auslesen“ freigegebene KI-Funktionen und verfügbare Credits; E-Rechnungen im XML-Format liest CraftOS mit „E-Rechnung einlesen“ ohne KI-Credits.
- Der Beleg als Foto, PDF oder E-Rechnung (XML).

## Schritt für Schritt in der Web-App

1. Öffnen Sie „Buchhaltung → Belege → Eingangsbelege“.
2. Klicken Sie auf „Neue Eingangsrechnung“.
3. Laden Sie die Datei über „Beleg hochladen (Foto/PDF)“ hoch.
4. Klicken Sie auf „Mit KI auslesen“, bei einer XML-Datei auf „E-Rechnung einlesen“.
5. Vergleichen Sie Lieferant, „Rechnungsnummer“, „Rechnungsdatum“, „Nettobetrag (€)“ und „MwSt (%)“ mit dem Original.
6. Korrigieren Sie abweichende Werte direkt im Formular.
7. Wählen Sie unter „Zuweisung“ das Projekt oder den Bereich.
8. Klicken Sie auf „Eingangsrechnung speichern“.

Belege mit dem Kennzeichen „Zu prüfen“ schließen Sie nach Ihrer Kontrolle mit „Speichern & Prüfung bestätigen“ im Beleg oder mit „Prüfung bestätigen“ in der Liste ab. Zuweisung und DATEV-Konto beschreibt [Beleg kontieren und zuordnen](/hilfe/beleg-kontieren-zuordnen).

## Schritt für Schritt in der Mobile-App

1. Tippen Sie unter „Mehr“ auf „Beleg scannen“ oder im Projekt auf die Kachel „Beleg scannen“.
2. Tippen Sie auf „Beleg aufnehmen oder wählen“.
3. Fotografieren Sie den Beleg oder wählen Sie eine PDF-Datei.
4. Prüfen Sie die übernommenen Daten und das gewählte Projekt.
5. Wählen Sie unter „Speichern als“ die Option „Neuen Beleg erfassen“.
6. Tippen Sie auf „Beleg speichern“.

Mit Freigabe und verfügbaren KI-Credits liest die App den aufgenommenen Beleg per KI aus; E-Rechnungsdaten übernimmt sie ohne KI-Credits. Den gespeicherten Beleg prüfen und bestätigen Sie anschließend in der Web-App.

## Ergebnis prüfen

Der Beleg steht unter „Eingangsbelege“ und bleibt mit der Originaldatei verbunden. Rechnen Sie den Bruttobetrag nach: 350 € netto mit 19 % Umsatzsteuer ergeben 416,50 €. Offene Prüfungen zeigt der Hinweis „Belege zur Prüfung“ oben in der Liste.

## Häufige Probleme

### Was tun, wenn Werte unvollständig ausgelesen sind?

Tragen Sie die fehlenden Werte selbst ein oder laden Sie eine besser lesbare Datei hoch. Die Originaldatei bleibt am Beleg gespeichert und dient als Vergleich.

### Was bedeutet der Hinweis „Mögliche Dublette“?

CraftOS hat einen vorhandenen Beleg mit gleicher Rechnungsnummer, gleichem Datum, Betrag oder Lieferanten gefunden. Vergleichen Sie beide Belege und speichern Sie nur einen echten neuen Eingang.

### Wie korrigiere ich einen bereits geprüften Beleg?

Geprüfte Belege sind festgeschrieben. Öffnen Sie den Beleg und wählen Sie „Erfassung korrigieren“; CraftOS legt einen Ersatz an, der auf den Originalbeleg verweist und den Sie erneut prüfen.

### Wann erscheint „Mit KI auslesen“?

Die Schaltfläche erscheint, wenn die KI-Funktionen für Ihren Betrieb freigegeben sind. Ohne KI-Freigabe tragen Sie die Werte selbst ein; E-Rechnungen lesen Sie mit „E-Rechnung einlesen“ ein. Mehr dazu in der [Eingangsrechnungsfunktion](/funktionen/eingangsrechnungen).
