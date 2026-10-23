---
title: "Einen Beleg kontieren und Projekten zuordnen"
description: "So verteilen Sie eine Eingangsrechnung auf Projekte oder Betriebsbereiche und bestätigen erst danach die Prüfung."
category: "belege"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
answer: "Im Beleg unter „Buchhaltung → Belege → Eingangsbelege“ verteilen Sie den Nettobetrag unter „Zuweisung“ auf Projekte oder Bereiche und wählen in den „Buchungsdetails“ das „DATEV-Konto (Kontierung)“. Danach bestätigen Sie die Prüfung; damit ist der Beleg festgeschrieben."
relatedFeatures: ["eingangsrechnungen", "buchhaltung", "nachkalkulation"]
relatedArticles: ["/hilfe/datev-export-erstellen", "/blog/materialverbrauch-baustelle-zuordnen", "/hilfe/beleg-scannen-pruefen"]
sources: [{"url": "https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html", "label": "Bundesfinanzministerium: GoBD im Amtlichen AO-Handbuch 2025", "checkedAt": "2026-10-23"}, {"url": "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2025-07-14-GoBD-2-aenderung.html", "label": "Bundesfinanzministerium: zweite GoBD-Änderung vom 14. Juli 2025", "checkedAt": "2026-10-23"}]
platforms: ["web"]
---

## Voraussetzungen

- Web-App mit Voll-Lizenz und Finanzrechten („Globale Finanzbereiche“) für den Bereich „Buchhaltung“.
- Ein Eingangsbeleg mit dem Kennzeichen „Zu prüfen“ oder ein neuer Beleg ([Beleg hochladen und prüfen](/hilfe/beleg-scannen-pruefen)).
- Hinterlegte DATEV-Einstellungen mit Kontenrahmen unter „Einstellungen → DATEV-Export“.

## Schritt für Schritt

1. Öffnen Sie „Buchhaltung → Belege → Eingangsbelege“.
2. Klicken Sie auf den betreffenden Beleg.
3. Prüfen Sie „Nettobetrag (€)“, „MwSt (%)“, „Lieferant / Anbieter“ und „Rechnungsnummer“ am Original.
4. Wählen Sie unter „Zuweisung“ ein Projekt oder einen Bereich.
5. Verteilen Sie den Beleg bei Bedarf mit „Zuweisung hinzufügen“ auf weitere Projekte mit Teilbeträgen.
6. Prüfen Sie, dass CraftOS „Vollständig verteilt“ anzeigt.
7. Wählen Sie unter „Buchungsdetails“ das „DATEV-Konto (Kontierung)“.
8. Klicken Sie auf „Speichern & Prüfung bestätigen“.

Erkennt die KI im Beleg eine Projektnummer, zeigt CraftOS einen „KI-Vorschlag“ zum Projekt, den Sie selbst bestätigen. Beim DATEV-Konto steht, woher die Auswahl stammt, etwa „KI-Vorschlag übernommen“ oder „Selbst gewählt“.

## Ergebnis prüfen

In der Liste zeigt der Beleg das Projekt und „Konto zugeordnet“; nach der Prüfung trägt er das Kennzeichen „Festgeschrieben“. Mit der Festschreibung bleiben die Belegdaten unverändert und nachvollziehbar, wie es die [GoBD](https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html) für elektronische Bücher verlangen; die [Änderung vom Juli 2025](https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2025-07-14-GoBD-2-aenderung.html) ergänzt den Umgang mit E-Rechnungen.

## Häufige Probleme

### Was bedeuten „Unverteilt“ und „Zu viel“?

Die Teilbeträge unter „Zuweisung“ ergeben noch nicht den Nettobetrag des Belegs. Passen Sie die Beträge an, bis CraftOS „Vollständig verteilt“ anzeigt; danach speichern Sie den Beleg.

### Was bedeutet „Konto zu klären“?

Dem Beleg fehlt noch ein DATEV-Konto. Wählen Sie es unter „Buchungsdetails“ im Feld „DATEV-Konto (Kontierung)“ und stimmen Sie unklare Konten mit Ihrer Steuerkanzlei ab.

### Wie ändere ich einen festgeschriebenen Beleg?

Öffnen Sie den Beleg und wählen Sie „Erfassung korrigieren“. CraftOS legt einen Ersatz an, der auf den unveränderlichen Originalbeleg verweist; diesen Ersatz prüfen und bestätigen Sie erneut. Mehr dazu unter [GoBD in CraftOS](/gobd).
