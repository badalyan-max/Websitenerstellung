---
title: "Eine Abschlagsrechnung aus dem Projekt erstellen"
description: "So wählen Sie den passenden Abschlagstyp und prüfen vorherige Rechnungen sowie den Projektmodus."
category: "rechnungen"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Eine Abschlagsrechnung erstellen Sie in der Web-App aus dem Auftrag oder Angebot des Projekts über „Rechnung erstellen“ und „Pauschaler Abschlag“ oder „Kumulativer Abschlag“. Nach einer Teilabnahme startet „Abschlagsrechnung vorschlagen“ den Abschlag mit vorgeschlagenem Nettobetrag."
relatedFeatures: ["rechnungen", "projektverwaltung"]
relatedArticles: ["/hilfe/schlussrechnung-erstellen", "/hilfe/abnahme-dokumentieren", "/blog/abschlagsrechnung-schlussrechnung"]
sources: [{"url": "https://www.gesetze-im-internet.de/bgb/__650m.html", "label": "Bürgerliches Gesetzbuch § 650m – Abschlagszahlungen beim Verbraucherbauvertrag", "checkedAt": "2026-10-23"}, {"url": "https://www.gesetze-im-internet.de/ustg_1980/__14.html", "label": "Umsatzsteuergesetz § 14 – Ausstellung von Rechnungen", "checkedAt": "2026-10-23"}]
platforms: ["web"]
---

## Voraussetzungen

- Voll-Lizenz (Admin oder Büro) und Zugriff auf das Projekt in der Web-App.
- Das Projekt ist mindestens beauftragt und mit einem Auftrag oder Angebot verknüpft.
- Die Schlussabnahme steht noch aus; danach rechnen Sie mit der [Schlussrechnung](/hilfe/schlussrechnung-erstellen) ab.

## Schritt für Schritt in der Web-App

1. Öffnen Sie das Projekt und wechseln Sie zum Reiter „Dokumente“.
2. Öffnen Sie den Auftrag oder das angenommene Angebot.
3. Klicken Sie auf „Rechnung erstellen“.
4. Wählen Sie „Pauschaler Abschlag“ für einen festen Betrag oder Prozentsatz.
5. Wählen Sie alternativ „Kumulativer Abschlag“ für eine positionsweise Abrechnung des Leistungsstands.
6. Legen Sie beim pauschalen Abschlag unter „Eingabe“ Prozent, Betrag netto oder Betrag brutto fest.
7. Tragen Sie den „Leistungsstand (Pflichtangabe)“ ein, zum Beispiel „Rohbau fertig“.
8. Prüfen Sie „Bisher angefordert“ und „Verbleibend nach diesem Abschlag“.
9. Öffnen Sie den Entwurf, prüfen Sie die Vorschau und klicken Sie auf „Fertigstellen“.

## Schritt für Schritt nach einer Teilabnahme

1. Öffnen Sie das Projekt im Reiter „Übersicht“.
2. Klicken Sie beim Hinweis zur unterschriebenen Teilabnahme auf „Abschlagsrechnung vorschlagen“.
3. Wählen Sie bei mehreren Verträgen unter „Vertragsgrundlage wählen“ den Auftrag oder das Angebot.
4. Prüfen Sie im Rechnungsdialog den vorgeschlagenen Nettobetrag und den Leistungsstand.
5. Öffnen Sie den Entwurf und stellen Sie ihn nach der Prüfung fertig.

## Ergebnis prüfen

Der Abschlag steht mit Nummer unter „Dokumente“ des Projekts. Der Rechnungsdialog zeigt danach oben den „Abrechnungsmodus“ des Projekts, etwa „Pauschale Teilrechnungen“; diesen Modus behalten alle weiteren Abschläge. Die Steuerart, etwa eine Rechnung nach § 13b, übernimmt der Abschlag aus dem Auftrag; sie gilt für die ganze Rechnungsfolge bis zur Schlussrechnung.

Bei Verbraucherbauverträgen begrenzt CraftOS die Abschläge auf 90 % der Auftragssumme (§ 650m BGB). Die Summe aller Abschläge bleibt innerhalb der Auftragssumme.

## Häufige Probleme

### Warum ist ein Abschlagstyp nicht wählbar?

Der Dialog nennt den Grund. Häufig ist der Abrechnungsmodus schon festgelegt, das Projekt noch nicht beauftragt oder die Abnahme bereits erfolgt; dann steht dort „Abnahme bereits erfolgt — nur noch Schlussrechnung“.

### Warum fehlt der Hinweis zur Teilabnahme in der Übersicht?

Der Hinweis erscheint für Rollen mit Rechnungsrecht, sobald ein Teilabnahmeprotokoll unterschrieben ist. Ein ausgeblendeter Hinweis gilt nur in Ihrem Browser; das Protokoll bleibt in der Baudokumentation.

### Wie berücksichtige ich eine Zahlung auf den Abschlag?

Erfassen Sie die Zahlung an der Abschlagsrechnung mit „Zahlung erfassen“. Rechnungsbetrag und erhaltene Zahlung sind getrennte Angaben; die [Zahlungserfassung](/hilfe/zahlungen-erfassen) zeigt den Ablauf.

Der [Ratgeber zu Abschlag und Schlussrechnung](/blog/abschlagsrechnung-schlussrechnung) erklärt die Zusammenhänge; [Abnahme dokumentieren](/hilfe/abnahme-dokumentieren) beschreibt die Teilabnahme.
