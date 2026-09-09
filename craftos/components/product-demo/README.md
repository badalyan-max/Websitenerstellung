# CraftOS Produktdemos

```tsx
import { ProductDemo } from '@/components/product-demo/ProductDemo'

<ProductDemo />
<ProductDemo initialScene="angebot" compact />
```

`initialScene` ist `dashboard | angebot | planung | rechnung | beleg | ki`.
`compact` reduziert nur Innenabstände; das Layout richtet sich über Container
Queries nach der tatsächlichen Breite der Einbettung. Es skaliert keine komplette
Desktopoberfläche auf Smartphonegröße. Unter 600 px erscheinen Projektkarten,
native Formulare und die mobile Zeiterfassung statt der Desktop-Plantafel.

## Verhalten

- Alle Werte sind fiktiv; es gibt keine Backend-, Tracking- oder KI-Aufrufe.
- Das gemeinsame Beispielprojekt heißt „Umbau Bäckerei Krause“.
- Eingaben, Szenenwechsel und Fokus in der App pausieren die Wiedergabe.
- Autoplay verwendet dieselben Reducer-Aktionen wie die sichtbaren Schaltflächen.
- Die Wiedergabe läuft nur bei sichtbarer Demo und sichtbarem Browser-Tab.
- Bei `prefers-reduced-motion` bleibt Autoplay deaktiviert; einzelne Schritte
  funktionieren weiterhin.
- Am geprüften KI-Entwurf wartet die Demo immer auf die ausdrückliche Bestätigung.
  Auch „Nächster Schritt“ kann diese Bestätigung nicht ersetzen.
- Wiederholen und Szenenwechsel setzen den jeweiligen Beispielablauf zurück.
- Die Planung unterstützt Tag-/Person-Auswahl zusätzlich zu Drag & Drop.
- Die mobile Uhr ist ausdrücklich als vorgespulte Beispielzeit gekennzeichnet.

## Nachvollziehbare Zahlen

48 m² Wandfläche minus 6 m² Öffnungen ergeben 42 m² Angebotsmenge.
8,50 € Material und 0,25 Stunden × 48 € Lohnkosten je m² ergeben mit 20 %
Zuschlag 24,60 € je m²: 1.033,20 € netto, 196,31 € Steuer, 1.229,51 € brutto.
Der Materialbeleg beträgt 357,00 € netto. Sieben vorhandene Projektstunden
plus 3,5 neu gebuchte Stunden ergeben 504,00 € Lohnkosten und zusammen mit
dem Material 861,00 € erfasste Kosten. Diese Werte beziehen sich auf den
Wandanstrich; das gesamte fiktive Projektbudget beträgt 18.450,00 € netto.

## Referenzierte Produktabläufe

Die Desktopübersicht orientiert sich an `src/pages/Dashboard.tsx` im Web-App-Repo;
Flächenerfassung an `RoomMeasurementDialog.tsx`, Berichtabrechnung an
`ReportInvoiceDialog.tsx` und die Bestätigung an `AiAgentDraftCard.tsx`.
Der mobile Timer orientiert sich am Mobile-Dashboard und dessen GPS-Prüfung.
Die Demo benutzt eigene Beispieldaten und importiert keinen Anwendungscode.

## Prüfung

`npx vitest run tests/demo.test.ts` prüft Geldbeträge, veränderte Eingaben,
Rechnungsnummern, Buchungsreihenfolge, Belegprüfung, KI-Bestätigung, Reset,
reduzierte Bewegung sowie das serverseitige Rendern aller sechs Szenen.
Die visuelle Browserabnahme erfolgt nach Integration durch den Hauptagenten.
