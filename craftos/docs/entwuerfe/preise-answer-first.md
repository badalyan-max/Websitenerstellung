# Entwurf: Answer-first-Block für /preise

> Status: Textentwurf zur Freigabe durch den Inhaber. Noch nicht gebaut.
> Einbauort: ganz oben auf der bestehenden Preisseite (`app/preise/page.tsx`), direkt unter dem `PageHero` und vor `PricingTable`, als echter Fließtext und echte HTML-Tabelle (`<table>`), nicht als Bild.
> Datengrundlage: ausschließlich `lib/site.ts` (`tarife`, `zahlung`, `speicherPool`, `trialDays`, `checkedAt` = 2026-09-09). Beim Bau die Werte aus `site.ts` einsetzen statt sie fest in den Text zu schreiben, damit Preisänderungen automatisch übernommen werden.

---

## Antwortsatz (220 Zeichen, ein Satz)

CraftOS kostet 29,95 € netto pro Person und Monat für die Voll-Lizenz mit Web-App und Mobile-App oder 299,50 € im Jahresabo; die App-Lizenz für Mitarbeitende auf der Baustelle kostet 9,95 € im Monat oder 99,50 € im Jahr.

## Kompakte Preistabelle

| Lizenz | Für wen | Monatsabo netto | Jahresabo netto | Jahresabo je Monat netto |
|---|---|---:|---:|---:|
| Voll-Lizenz | Inhaber, Büro und Bauleitung; Web-App und Mobile-App für dieselbe Person | 29,95 € | 299,50 € | 24,96 € |
| App-Lizenz | Mitarbeitende auf der Baustelle; Mobile-App, ergänzt die Voll-Lizenz des Betriebs | 9,95 € | 99,50 € | 8,29 € |

Preise pro Person. Jahresabo: rund 17 % günstiger als 12 Monatszahlungen. Testphase: 10 Tage, ohne Zahlungsdaten. Zahlung per SEPA-Lastschrift oder Kreditkarte. Speicher: 50 GB Speicher-Pool pro Betrieb. Stand der Preise: 9. September 2026.

---

## Hinweise für die Freigabe

- **„netto“:** `lib/site.ts` enthält das Wort nicht. Die Nettoangabe stammt aus der bestehenden Preisseite (Metadaten und FAQ in `app/preise/page.tsx`) und den AGB § 4 („zzgl. der gesetzlichen Umsatzsteuer“). Bitte bestätigen.
- **Jahresabo je Monat:** rechnerischer Wert (299,50 € ÷ 12 = 24,958 € und 99,50 € ÷ 12 = 8,292 €, kaufmännisch gerundet), keine monatliche Abbuchung. Auf der Seite so kennzeichnen, wie es `/vergleich` bereits tut.
- **„Für wen“ und Leistungsumfang:** aus den Feldern `fuer`, `badge` und `highlights` in `tarife` übernommen.
- **Bewusst nicht im Block:** Credit-Pakete (`creditPakete`) und KI-Verbrauch, weil `site.ts` den Verwendungszweck der Credits nicht beschreibt. Die bestehende FAQ der Preisseite erklärt ihn bereits.
- **Prüfdatum:** `site.checkedAt` steht auf 2026-09-09. Vor Veröffentlichung die Preise bestätigen und das Datum aktualisieren.
- **Schema (optional):** Die beiden Lizenzen lassen sich zusätzlich als `Offer` mit `price`, `priceCurrency` „EUR“ und `UnitPriceSpecification` (`referenceQuantity` 1 Monat bzw. 1 Jahr, `valueAddedTaxIncluded` false) im bestehenden `SoftwareApplication`- oder `Product`-Schema auszeichnen, sofern ein solches Schema vorhanden ist.
