/**
 * D-41 Einrichtungsservice (Inhaber 23.10.2026; 10-CONTEXT.md, Nachtrag Inhaber): einzige Quelle des Fakts für
 * /preise, /fakten-ueber-craftos, llms.txt, die Alternativen-Seiten, /vergleich, /vergleich/handwerkersoftware-
 * kleine-betriebe, die Datenimport-FAQ (lib/funktionsdetails/team.ts) und den Hilfeartikel daten-importieren.
 *
 * Quelle: Geschäftsangabe des Inhabers, kein Produktcode. Die Einrichtung ist kostenlos; das CraftOS-Team übernimmt
 * die aus der bisherigen Software exportierten Daten und richtet das Konto ein; bei Fragen ist CraftOS direkt
 * erreichbar. Der Selbst-Import mit kostenloser Import-KI (Datenimport.tsx) bleibt daneben beschrieben.
 *
 * Formulierung: positiv und knapp, gesiezt, ohne messbares Versprechen (keine Reaktionszeit, keine Dauer, kein
 * „rund um die Uhr“), ohne Formate über die bestehende Formatliste hinaus. Tests: tests/einrichtung.test.ts.
 * Bewusst ohne Importe, damit Inhaltsmodule, llms.txt und Tests dieselbe Quelle ohne Seiteneffekte nutzen.
 */

/** Kernsatz (FAQ-Antwort auf /preise, /fakten-ueber-craftos, /vergleich, kleine Betriebe; llms.txt). */
const kern =
  "Die Einrichtung ist kostenlos: Sie senden uns die Exportdateien Ihrer bisherigen Software, wir übernehmen Ihre Daten und richten Ihr Konto ein. So legen Sie direkt los, und bei Fragen sind wir persönlich für Sie da.";

export const einrichtung = {
  kern,
  /** Kurzform für Wechsel-Antworten mit festem Bestandssatz (Alternativen-Seiten, Antwortbudget 300). */
  wechsel: "Die Einrichtung ist kostenlos: Auf Wunsch übernehmen wir Ihre Daten und richten Ihr Konto ein.",
  /** Ergänzung der Datenimport-FAQ und des Hilfeartikels; der Selbst-Import bleibt daneben beschrieben. */
  importSatz:
    "Auf Wunsch übernimmt das CraftOS-Team den Import kostenlos für Sie: Sie senden uns die Exportdateien, wir übernehmen Ihre Daten und richten Ihr Konto ein.",
  /** Hinweis bei den Tarifen auf /preise (Anmerkung der Lizenztabelle). */
  tarifHinweis: "Einrichtung und Datenübernahme kostenlos.",
  faqPreise: { q: "Was kostet die Einrichtung?", a: kern },
  faqFakten: { q: "Was kostet die Einrichtung von CraftOS?", a: kern },
  faqWechsel: { q: "Wie gelingt der Wechsel zu CraftOS?", a: kern },
} as const;
