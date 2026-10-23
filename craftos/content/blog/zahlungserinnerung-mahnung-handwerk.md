---
title: "Zahlungserinnerung und Mahnung: offene Rechnungen geordnet nachfassen"
description: "Mit Fälligkeitsprüfung, Zahlungsabgleich und einem sachlichen Muster vermeiden Sie falsche Mahnungen und behalten offene Beträge im Blick."
answer: "Gleichen Sie vor jeder Zahlungserinnerung Rechnung, Fälligkeit und tatsächliche Zahlungseingänge ab und mahnen Sie nur den wirklich offenen Betrag. Danach folgen Zahlungserinnerung, erste und zweite Mahnung in festen Abständen, die Sie einmal für Ihren Betrieb festlegen."
category: "rechnungen"
publishedAt: "2026-09-09"
updatedAt: "2026-10-23"
author: "CraftOS Redaktion"
draft: false
relatedFeatures: ["mahnwesen", "rechnungen", "bankabgleich"]
relatedArticles: ["/hilfe/mahnwesen-einrichten", "/hilfe/zahlungen-erfassen", "/blog/offene-posten-liquiditaet"]
sources: [{"url": "https://www.gesetze-im-internet.de/bgb/__286.html", "label": "§ 286 BGB: Verzug des Schuldners", "checkedAt": "2026-10-23"}, {"url": "https://www.gesetze-im-internet.de/bgb/__288.html", "label": "§ 288 BGB: Verzugszinsen und sonstiger Verzugsschaden", "checkedAt": "2026-10-23"}]
platforms: ["web"]
---

## Welche Informationen brauchen Sie vor dem Nachfassen?

Sie brauchen das ausgegebene Rechnungsdokument, den vereinbarten Zahlungstermin und alle bekannten Zahlungen. Prüfen Sie außerdem, ob eine Korrektur, eine Gutschrift oder eine Reklamation vorliegt, damit kein Kunde trotz Zahlung oder offener Klärung eine Mahnung erhält.

Hat der Kunde bereits eine neue Rechnung erhalten, nehmen Sie das alte Dokument aus dem Mahnlauf. Ein strittiger Nachtrag ist keine unbestrittene Forderung und braucht zuerst eine Klärung.

Ein klarer interner Vermerk hilft: Wer hat zuletzt mit wem gesprochen, welche Zusage wurde gemacht und wann wird erneut geprüft? Eine Farbe in einer Liste trägt diese Information nicht.

## Wie ergibt sich der tatsächlich offene Betrag?

Ziehen Sie vom Rechnungsbetrag nur die tatsächlich eingegangenen Zahlungen ab. Im fiktiven Projekt Wohnung Lindenstraße beträgt die Rechnung 4.760 € brutto, 2.000 € sind eingegangen, eine weitere Zahlung ist angekündigt, aber noch nicht da.

| Information | Behandlung |
|---|---:|
| Rechnungsbetrag | 4.760 € |
| Tatsächlich eingegangene Zahlung | −2.000 € |
| Offener Betrag | 2.760 € |
| Nur angekündigte Zahlung | Noch kein Zahlungseingang |

Die Erinnerung bezieht sich auf 2.760 € und erwähnt die bereits erhaltene Zahlung. Eine angekündigte Überweisung ist eine Gesprächsinformation; den Zahlungsstand ändert erst der Eingang.

## Wie formulieren Sie eine sachliche erste Erinnerung?

Nennen Sie Rechnungsnummer, erhaltene Teilzahlung, offenen Betrag und Frist und bitten Sie um Prüfung. Ein eigenes Muster für den genannten Fall:

> Zur Rechnung RE-2026-042 für die Arbeiten in der Lindenstraße haben wir Ihre Teilzahlung von 2.000 € erhalten. Nach unserem aktuellen Stand sind noch 2.760 € offen. Bitte prüfen Sie den Betrag und veranlassen Sie die Zahlung bis zum vereinbarten Termin beziehungsweise teilen Sie uns mit, falls Angaben fehlen. Sollte sich Ihre Zahlung mit dieser Nachricht überschnitten haben, berücksichtigen wir sie beim nächsten Abgleich.

Passen Sie Rechnungsnummer, Betrag und Frist an den tatsächlichen Vorgang an. Setzen Sie Gebühren nur ein, wenn ihre Grundlage geklärt ist, und bleiben Sie im Ton sachlich.

## Sind Zahlungserinnerung und Verzug dasselbe?

Nein. Ob der Kunde in Verzug ist, hängt von den gesetzlichen und vertraglichen Voraussetzungen ab; eine Mahnung ist dabei oft, aber nicht immer nötig. Die maßgebliche Regelung ist [§ 286 BGB](https://www.gesetze-im-internet.de/bgb/__286.html).

Ohne Mahnung tritt Verzug zum Beispiel ein, wenn der Zahlungstermin nach dem Kalender bestimmt ist. Zahlt ein Kunde nicht innerhalb von 30 Tagen nach Fälligkeit und Zugang der Rechnung, ist er in Verzug; gegenüber Verbrauchern gilt das nur, wenn die Rechnung auf diese Folge hinweist.

Für Geschäftskunden sieht [§ 288 BGB](https://www.gesetze-im-internet.de/bgb/__288.html) Verzugszinsen von neun Prozentpunkten über dem Basiszinssatz und eine Pauschale von 40 € vor. Trennen Sie die freundliche Klärung des Zahlungsstands von der Entscheidung über Zinsen, Kosten oder weitere Schritte und lassen Sie Einzelfälle rechtlich prüfen.

## So unterstützt CraftOS

In der Web-App sehen Sie unter „Rechnungen“ den Zahlungsstand jeder Rechnung. Erfassen Sie eingegangene Zahlungen mit Datum und Betrag; die [Anleitung zur Zahlungserfassung](/hilfe/zahlungen-erfassen) erklärt den Ablauf, und mit dem [Bankabgleich](/funktionen/bankabgleich) ordnen Sie Bankumsätze Ihren Rechnungen zu.

Die Mahnstufen richten Sie einmal unter „Einstellungen → Mahnwesen“ ein. Fristen, Gebühren und Stufen legt der Inhaber des Betriebs fest:

1. Öffnen Sie „Einstellungen → Mahnwesen“.
2. Legen Sie unter „Mahn-Fristen“ für jede Stufe die „Tage überfällig“ fest.
3. Tragen Sie bei Bedarf eine „Mahngebühr“ ein und schalten Sie jede gewünschte Stufe mit „Stufe aktiv“ ein.
4. Setzen Sie den „Verzugszinssatz (jährlich)“ oder wählen Sie „Rechtliche Vorschläge übernehmen“.
5. Passen Sie unter „Mahn-Vorlagen“ Betreff und Text für jede Stufe an.
6. Klicken Sie auf „Einstellungen speichern“.
7. Prüfen Sie im Dialog „Automatische Mahnungen einschalten?“ die Vorschau und wählen Sie „Einschalten“.

Die Stufen heißen „Zahlungserinnerung“, „1. Mahnung“ und „2. Mahnung“ und folgen immer nacheinander. Eingeschaltet mahnt CraftOS überfällige Rechnungen täglich nach Ihren Fristen per E-Mail. Automatische Mahnungen gelten für normale Rechnungen; Abschlags- und Schlussrechnungen begleiten Sie über ihren Zahlungsstand.

An jeder Rechnung zeigt der „Mahnverlauf“, welche Stufe „Geplant“, „Gesendet“ oder „Abgebrochen“ ist. Die Einrichtung im Detail beschreibt die Anleitung [Mahnwesen einrichten](/hilfe/mahnwesen-einrichten); einen Überblick gibt die Funktion [Mahnwesen](/funktionen/mahnwesen).

## Welche Routine bewährt sich im kleinen Betrieb?

Reservieren Sie einen festen Termin pro Woche für offene Posten. Prüfen Sie zuerst neue Zahlungseingänge, danach überfällige Rechnungen und zuletzt zugesagte Rückmeldungen, damit keine Nachricht aus einer veralteten Liste hinausgeht.

Ordnen Sie jedem Vorgang einen nächsten Schritt zu: auf die vereinbarte Zahlung warten, fehlende Unterlagen senden, die Rechnung sachlich klären oder rechtliche Unterstützung einholen. Eine weitere Mahnung ist nur einer dieser Wege.

Die [Rechnungsverwaltung](/funktionen/rechnungen) liefert Dokumente und Zahlungsstände. Wie Sie daraus eine vorsichtige Liquiditätsübersicht ableiten, zeigt der Ratgeber [Offene Posten und Liquidität](/blog/offene-posten-liquiditaet).

## Wie behandeln Sie eine Rückfrage des Kunden?

Ordnen Sie die Rückmeldung einer konkreten Rechnung und möglichst einer Position zu. Fehlt nur ein Leistungsnachweis, senden Sie ihn über den vereinbarten Weg; bestreitet der Kunde den Umfang, prüfen Sie zuerst den zugrunde liegenden Auftrag.

Legen Sie eine feste Zuständigkeit für den Vorgang fest. So reicht nicht eine Person Unterlagen nach, während eine andere weitermahnt.

Nach einer Einigung aktualisieren Sie Rechnungskorrekturen und Zahlungsstände, bevor der nächste Mahnlauf beginnt. Eine geplante Stufe beenden Sie im „Mahnverlauf“ der Rechnung mit „Stufe abbrechen“.
