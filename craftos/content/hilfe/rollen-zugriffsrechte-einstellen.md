---
title: "Rollen und Zugriffsrechte eines Teammitglieds einstellen"
description: "So steuern Sie Finanzsichtbarkeit, Projektzugriff und Teamleitungsrechte passend zur Aufgabe."
category: "einrichtung"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Rollen und Zusatzrechte stellt der Inhaber in der Web-App unter „Einstellungen → Rollen & Rechte“ ein: Person wählen, Rolle und Schalter anpassen, „Änderungen prüfen“ und speichern. CraftOS kennt fünf Rollen von Admin bis Mobil-Teammitglied."
relatedFeatures: ["team"]
relatedArticles: ["/hilfe/mitarbeiter-einladen-lizenz-zuweisen", "/blog/web-app-baustellen-app"]
sources: []
platforms: ["web"]
---

## Voraussetzungen

- Sie sind Inhaber des Betriebs; zusätzliche Admins lesen die Rollenübersicht.
- Die Person ist unter „Mitarbeiter“ angelegt.
- Für einen Wechsel der Lizenz ist ein gebuchter, freier Sitz der Ziel-Lizenz vorhanden.

Jede Rolle gehört zu einer Lizenz und bringt passende Standardwerte für die Zusatzrechte mit:

| Rolle | Lizenz | Aufgabe |
|---|---|---|
| Admin | Voll-Lizenz | Verwaltet den Betrieb; zusätzliche Admins belegen einen Büro-Sitz. |
| Büro-Leitung | Voll-Lizenz (Büro) | Arbeitet im Büro mit allen Projekten und globalen Finanzbereichen; Einstellungen lesend. |
| Büro-Projektleitung | Voll-Lizenz (Büro) | Arbeitet an zugewiesenen und selbst angelegten Projekten; Preise in zulässigen Projektbelegen bleiben sichtbar. |
| Mobil-Teamleitung | App-Lizenz | Liest, erfasst und korrigiert Teamzeiten in zugewiesenen Projekten in der App. |
| Mobil-Teammitglied | App-Lizenz | Arbeitet in der App an zugewiesenen Projekten und erfasst eigene Zeiten. |

## Schritt für Schritt

1. Öffnen Sie „Einstellungen → Rollen & Rechte“ oder klicken Sie unter „Mitarbeiter“ auf „Rollen & Rechte“.
2. Wählen Sie unter „Personen“ die betreffende Person.
3. Wählen Sie unter „Lizenz auswählen“ und „Rolle auswählen“ die passende Rolle.
4. Stellen Sie unter „Zusatzrechte und Reichweite“ die Schalter ein.
5. Prüfen Sie im Reiter „Vorschau“, was die Person sieht.
6. Klicken Sie auf „Änderungen prüfen“.
7. Kontrollieren Sie im Dialog „Rollenänderung bestätigen“ die geänderten Felder.
8. Klicken Sie auf „Bestätigen und speichern“.

Die Schalter unter „Zusatzrechte und Reichweite“ richten sich nach der Lizenz:

| Schalter | Lizenz | Wirkung |
|---|---|---|
| „Globale Finanzbereiche“ | Büro | Öffnet die globale Buchhaltung und die Finanzfunktionen. |
| „Alle Projekte“ | Büro | Erweitert den Projektumfang auf den ganzen Betrieb. |
| „Teamzeiten“ | App | Erlaubt Lesen, Erfassen und Korrigieren von Teamzeiten in Projekten, denen die Zielperson zugeordnet ist. |
| „Lagerpreise sehen“ | App | Zeigt die Preise im Lager. |

Im Dialog „Mitarbeiter hinzufügen“ heißen zwei Schalter ausführlicher: „Alle Projekte sehen“ und „Teamzeiten im Projekt“.

## Ergebnis prüfen

Nach dem Speichern meldet CraftOS „Vom Server bestätigt. Die gespeicherte Rolle wird angezeigt.“ Projektteams und Einsätze der Person bleiben erhalten. Bitten Sie die Person, die benötigte Aufgabe zu testen, zum Beispiel ein Projekt zu öffnen oder eine Teamzeit zu erfassen.

## Häufige Probleme

### Wer kann Rollen und Schalter ändern?

Rollen und Sitze vergibt der Inhaber. Zusätzliche Admins lesen die Übersicht unter „Rollen & Rechte“. Die Rolle des Inhabers bleibt Admin und ist geschützt.

### Warum fehlt einer Person ein Projekt?

Ohne „Alle Projekte“ sieht die Person die Projekte, in deren Projektteam sie steht oder in denen sie einen Einsatz hat. Tragen Sie sie im Projekt unter „Projektteam“ ein oder schalten Sie „Alle Projekte“ ein.

### Warum sieht die Person den Bereich „Buchhaltung“ nicht?

„Buchhaltung“ erscheint mit Finanzrechten. Schalten Sie für Büro-Rollen „Globale Finanzbereiche“ ein; die Rolle Büro-Leitung bringt diesen Schalter bereits mit.

### Was bedeutet „Individuelle Kombination“?

Weichen die Schalter von den Standardwerten der Rolle ab, zeigt CraftOS „Individuelle Kombination“. Mit „Standardrolle übernehmen“ setzen Sie die Schalter auf die Werte der Rolle zurück.
