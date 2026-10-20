# Linkplan craftos.eu – Verweisaufbau mit Statusregister

Stand: 20.10.2026 · Quelle: SE Ranking Backlink-Gap (`data/2026-10-20-backlink-gap.json`), KI-Quellenanalyse (`data/2026-10-20-ai-prompts-wettbewerber.json`), Befund `SE-RANKING-BEFUND-2026-10-20.md` §3–§4 und Portalstand des Browser-Agenten des Inhabers vom 20.10.2026.
Statusregister (maßgeblich, maschinenlesbar): `docs/seo/backlink-register.json` · Regelprüfung: `tests/backlink-plan.test.ts`.

## 1. Ziel

Bis zum Ende von Meilenstein v2.0 gewinnt craftos.eu **mindestens 15 neue seriöse verweisende Domains**, sichtbar in SE Ranking (Backlinks-Zusammenfassung für craftos.eu). Ausgangsstand 20.10.2026: 12 verweisende Domains, alle Spam, Domain-InLink-Rank 3. Vorrang haben Bewertungs- und Vergleichsportale sowie die Quellen, die KI-Suchen bei Fragen zu Handwerkersoftware zitieren, weil sie zugleich Links und KI-Sichtbarkeit bringen.

Das Meilensteinziel (≥ 15) wird mit dem Messbericht je Etappe verfolgt; Phase 5 startet den Verweisaufbau (Übergabe 1), schließt ihn aber nicht ab.

## 2. Regeln

- **Nichts kaufen:** Jeder Browser-Prompt enthält „Kaufe nichts und schließe keine kostenpflichtigen Pakete ab.“ Bezahlte Einträge, Advertorials, Lead- oder CPC-Programme werden als „nicht möglich“ mit Kosten „nur bezahlt“ geführt.
- **Keine gekauften Links und keine Linknetzwerke**, kein Linktausch, keine Artikelverzeichnisse, keine automatisierten Einträge.
- **Keine Zugangsdaten im Chat:** „Gib keine Zugangsdaten in den Chat ein.“ Passwörter, Schlüssel und Codes gibt der Inhaber selbst im Browser ein.
- **Konten legt ausschließlich der Inhaber an:** „Konten legt ausschließlich der Inhaber an; halte an, wenn eine Registrierung nötig ist.“ Registrierung mit support@craftos.eu.
- **Faktenquelle:** Firmen- und Produktangaben stammen ausschließlich aus https://craftos.eu/llms.txt und https://craftos.eu/impressum (Preise, Lizenzen, Funktionen sind dort gegen das Produktregister geprüft). Keine erfundenen Zahlen, Kunden oder Funktionen.
- **E-Mails** versendet ausschließlich der Inhaber von support@craftos.eu; der Browser-Agent entwirft nur.
- **Spam-Backlinks beobachten, nicht reflexhaft entwerten:** Die 12 vorhandenen Spam-Domains werden im Messbericht beobachtet. Eine Disavow-Datei in der Google Search Console wird nur bei nachweisbarem Schaden (manuelle Maßnahme oder belegter Rankingverlust im Zusammenhang mit diesen Links) eingereicht – nicht vorsorglich.
- **DNS:** Falls ein Portal eine Domainbestätigung verlangt, werden ausschließlich TXT-Einträge hinzugefügt; bestehende Einträge werden nicht verändert oder gelöscht.

### Filterregel für den Backlink-Gap

Der Gap-Rohsatz enthält 548 Domains, die mindestens zwei Wettbewerber, aber nicht craftos.eu verlinken. Aufgenommen wurden nur Domains mit redaktionellem oder fachlichem Bezug (Handwerk, Bau, SHK, Elektro, Software, Gründung/Mittelstand, Kammern, Großhandel) oder mit Nennung in Befund §3/§4. Nicht aufgenommen werden:

- URL-Kürzer und Weiterleitungsdienste (z. B. urls-shortener.eu, bye.fyi, shortenurls.eu),
- Link-, SEO- und Artikelverzeichnisse ohne Redaktion (Domains mit „directory“, „seo“, „ranks“, „links“, „articles“ im Namen, z. B. topbilliondirectory.com, kingranks.com, proseoarticles.com),
- automatisch erzeugte Nachrichten- und Linkfarmen (z. B. sitesnewses.com, linksnewses.com, news-blast.com),
- dynamische DNS-/Hosting-Subdomains (z. B. sites.loseyourip.com, websites.freemyip.com),
- Domains ohne deutschsprachigen Fachbezug oder mit unklarer Herkunft.

DR-Werte stammen aus dem Gap-Rohsatz (`drQuelle: "backlink-gap"`, Domain dort teils mit „www.“), sonst aus dem Befund (`"befund"`) oder fehlen (`null`).

## 3. Priorisierte Liste

Priorität 1 = Bewertungs- und Vergleichsportale sowie von KIs zitierte Quellen; 2 = Fachmedien, Kammern/Digitalisierungsstellen und Großhandel; 3 = Verzeichnisse und Presseportale. Umfang: 65 Ziele (Priorität 1: 16, Priorität 2: 35, Priorität 3: 14). Status: offen 61, angefragt 1, live 0, nicht möglich 3.

| Prio | Domain | Kategorie | DR | Status | Inhaberaktion |
|---|---|---|---|---|---|
| 1 | provenexpert.com | Bewertungsportal | 91 | offen | Konto mit support@craftos.eu anlegen (kostenloser FREE-Plan; 30 Tage Premium ohne Zahlungsdaten, danach automatisch FREE), danach Browser-Prompt für das … |
| 1 | omr.com | Vergleichsportal | 90 | angefragt | Rückmeldung von OMR an support@craftos.eu abwarten; bei Antwort Kategorie „Handwerkersoftware“ nennen. Ohne Antwort bis 03.11.2026 mit dem Browser-Prompt … |
| 1 | softwareworld.co | Vergleichsportal | 85 | offen | Browser-Prompt ausführen lassen; Konto bzw. E-Mail-Versand selbst übernehmen; Eintrag vor dem Absenden freigeben. |
| 1 | kennstdueinen.de | Bewertungsportal | 84 | offen | Browser-Prompt ausführen lassen; Konto bei Bedarf selbst mit support@craftos.eu anlegen; Profil vor dem Absenden freigeben. |
| 1 | softguide.de | Vergleichsportal | 69 | nicht möglich | Keine Aktion; nur bei geänderten Bedingungen neu prüfen. |
| 1 | handwerk-digitalisieren.de | Kammer/Digitalisierung | 62 | offen | Browser-Prompt ausführen lassen; Kontaktanfrage prüfen und selbst senden. |
| 1 | software-kompass.de | Vergleichsportal | 30 | offen | Browser-Prompt ausführen lassen; Konto bzw. E-Mail-Versand selbst übernehmen; Eintrag vor dem Absenden freigeben. |
| 1 | handwerker-expertencheck.de | Vergleichsportal | 30 | offen | Browser-Prompt ausführen lassen; Konto bzw. E-Mail-Versand selbst übernehmen; Eintrag vor dem Absenden freigeben. |
| 1 | handwerker-software.org | Vergleichsportal | 7 | offen | Browser-Prompt ausführen lassen; Konto bzw. E-Mail-Versand selbst übernehmen; Eintrag vor dem Absenden freigeben. |
| 1 | vergleich-handwerkersoftware.de | Vergleichsportal | 1 | offen | Browser-Prompt ausführen lassen; Konto bzw. E-Mail-Versand selbst übernehmen; Eintrag vor dem Absenden freigeben. |
| 1 | g2.com | Vergleichsportal | – | offen | Konto im G2-Verkäuferportal (my.G2, https://www.g2.com/seller_login) selbst anlegen – Login per geschäftlicher E-Mail support@craftos.eu, Google oder … |
| 1 | softwareabc24.de | Vergleichsportal | – | offen | E-Mail an info@softwareabc24.de senden (Absender support@craftos.eu). Der fertige Mailtext vom 20.10.2026 liegt beim Browser-Agenten des Inhabers vor … |
| 1 | betriebssoftware-kompass.de | Vergleichsportal | – | offen | E-Mail an redaktion@betriebssoftware-kompass.de senden (Absender support@craftos.eu). Der fertige Mailtext vom 20.10.2026 liegt beim Browser-Agenten des … |
| 1 | trusted.de | Vergleichsportal | – | nicht möglich | Keine Aktion; nur bei geänderten Bedingungen neu prüfen. |
| 1 | youtube.com | Video | – | offen | Kanal und erstes Erklärvideo |
| 1 | de.wikipedia.org | Verzeichnis | – | nicht möglich | Keine Aktion; nur bei geänderten Bedingungen neu prüfen. |
| 2 | wuerth.de | Großhandel/Partner | 84 | offen | Browser-Prompt ausführen lassen; Partneranfrage prüfen und selbst senden. |
| 2 | deutsche-handwerks-zeitung.de | Fachmedium | 83 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | gc-gruppe.de | Großhandel/Partner | 83 | offen | Browser-Prompt ausführen lassen; Partneranfrage prüfen und selbst senden. |
| 2 | handwerksblatt.de | Fachmedium | 82 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | handwerk-magazin.de | Fachmedium | 76 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | hwk-muenster.de | Kammer/Digitalisierung | 76 | offen | Browser-Prompt ausführen lassen; Kontaktanfrage prüfen und selbst senden. |
| 2 | haustechnikdialog.de | Fachmedium | 75 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | haustec.de | Fachmedium | 75 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | ikz.de | Fachmedium | 74 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | sbz-online.de | Fachmedium | 73 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | bm-online.de | Fachmedium | 73 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | elektro.net | Fachmedium | 73 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | allgemeinebauzeitung.de | Fachmedium | 73 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | raabkarcher.de | Großhandel/Partner | 73 | offen | Browser-Prompt ausführen lassen; Partneranfrage prüfen und selbst senden. |
| 2 | unielektro.de | Großhandel/Partner | 72 | offen | Browser-Prompt ausführen lassen; Partneranfrage prüfen und selbst senden. |
| 2 | belektro.de | Fachmedium | 71 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | glaswelt.de | Fachmedium | 71 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | dds-online.de | Fachmedium | 71 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | wirsindhandwerk.de | Fachmedium | 70 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | bvbs.de | Kammer/Digitalisierung | 70 | offen | Browser-Prompt ausführen lassen; Kontaktanfrage prüfen und selbst senden. |
| 2 | si-shk.de | Fachmedium | 67 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | bauhandwerk.de | Fachmedium | 67 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | kluxen.de | Großhandel/Partner | 65 | offen | Browser-Prompt ausführen lassen; Partneranfrage prüfen und selbst senden. |
| 2 | heizungsjournal.de | Fachmedium | 63 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | digitalzentrumbau.de | Kammer/Digitalisierung | 63 | offen | Browser-Prompt ausführen lassen; Kontaktanfrage prüfen und selbst senden. |
| 2 | malerblatt.de | Fachmedium | 62 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | fliesenundplatten.de | Fachmedium | 60 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | metallbau-magazin.de | Fachmedium | 59 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | shk-profi.de | Fachmedium | 56 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | baumetall.de | Fachmedium | 53 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | sbz-monteur.de | Fachmedium | 50 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | sanitaerjournal.de | Fachmedium | 49 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | parkettmagazin.de | Fachmedium | 45 | offen | Browser-Prompt ausführen lassen; Entwurf prüfen und von support@craftos.eu an die Redaktion senden. |
| 2 | digitalzentrum-handwerk.de | Kammer/Digitalisierung | 32 | offen | Browser-Prompt ausführen lassen; Kontaktanfrage prüfen und selbst senden. |
| 2 | hwkfrm.de | Kammer/Digitalisierung | 23 | offen | Browser-Prompt ausführen lassen; Kontaktanfrage prüfen und selbst senden. |
| 3 | deutsche-startups.de | Verzeichnis | 91 | offen | Browser-Prompt ausführen lassen; Konto bei Bedarf selbst anlegen; Eintrag freigeben. |
| 3 | fuer-gruender.de | Verzeichnis | 86 | offen | Browser-Prompt ausführen lassen; Konto bei Bedarf selbst anlegen; Eintrag freigeben. |
| 3 | gruenderkueche.de | Verzeichnis | 75 | offen | Browser-Prompt ausführen lassen; Konto bei Bedarf selbst anlegen; Eintrag freigeben. |
| 3 | fair-news.de | Presseportal | 75 | offen | Browser-Prompt ausführen lassen; Pressemitteilung freigeben und Konto selbst anlegen. |
| 3 | portalderwirtschaft.de | Presseportal | 73 | offen | Browser-Prompt ausführen lassen; Pressemitteilung freigeben und Konto selbst anlegen. |
| 3 | deutscherpresseindex.de | Presseportal | 72 | offen | Browser-Prompt ausführen lassen; Pressemitteilung freigeben und Konto selbst anlegen. |
| 3 | digital-affin.de | Verzeichnis | 71 | offen | Browser-Prompt ausführen lassen; Konto bei Bedarf selbst anlegen; Eintrag freigeben. |
| 3 | mittelstandcafe.de | Verzeichnis | 69 | offen | Browser-Prompt ausführen lassen; Konto bei Bedarf selbst anlegen; Eintrag freigeben. |
| 3 | immittelstand.de | Verzeichnis | 69 | offen | Browser-Prompt ausführen lassen; Konto bei Bedarf selbst anlegen; Eintrag freigeben. |
| 3 | software-journal.de | Verzeichnis | 54 | offen | Browser-Prompt ausführen lassen; Konto bei Bedarf selbst anlegen; Eintrag freigeben. |
| 3 | neue-pressemitteilungen.de | Presseportal | 53 | offen | Browser-Prompt ausführen lassen; Pressemitteilung freigeben und Konto selbst anlegen. |
| 3 | pr-echo.de | Presseportal | 50 | offen | Browser-Prompt ausführen lassen; Pressemitteilung freigeben und Konto selbst anlegen. |
| 3 | presse-board.de | Presseportal | 49 | offen | Browser-Prompt ausführen lassen; Pressemitteilung freigeben und Konto selbst anlegen. |
| 3 | presseradar.de | Presseportal | 42 | offen | Browser-Prompt ausführen lassen; Pressemitteilung freigeben und Konto selbst anlegen. |

Die vollständigen Browser-Prompts aller Einträge stehen im Feld `browserPrompt` des Registers.

## 4. Übergabe 1 an den Inhaber (20.10.2026): Bewertungs- und Vergleichsportale

Stand laut Browser-Agent des Inhabers am 20.10.2026: OMR Reviews angefragt; ProvenExpert und G2 (Capterra/GetApp) offen, weil das Konto durch den Inhaber fehlt; softwareabc24.de und betriebssoftware-kompass.de offen, weil die E-Mail vom Inhaber zu senden ist; trusted.de und Softguide nicht möglich (nur bezahlt). Logo 512×512 PNG von craftos.eu liegt beim Browser-Agenten bereit.

Reihenfolge: 1. ProvenExpert-Konto anlegen und Prompt ausführen, 2. G2-Konto anlegen und Prompt ausführen, 3. die zwei E-Mails senden, 4. OMR nachfassen (falls bis 03.11.2026 keine Antwort), 5. kennstdueinen.de, 6. SoftwareWorld.

### ProvenExpert

Inhaberaktion: Konto mit support@craftos.eu anlegen (kostenloser FREE-Plan; 30 Tage Premium ohne Zahlungsdaten, danach automatisch FREE), danach Browser-Prompt für das Profil ausführen lassen.

```text
Ziel: CraftOS erhält ein vollständiges, kostenloses ProvenExpert-Profil (FREE-Plan) mit Link auf https://craftos.eu. Zielseite: https://www.provenexpert.com/de-de/ Schritte: 1. Warte, bis der Inhaber das Konto mit support@craftos.eu angelegt und sich angemeldet hat; lege selbst kein Konto an. 2. Fülle im Profil Firmenname, Adresse und Kontakt aus dem Impressum aus, Branche „Handwerkersoftware“, Website https://craftos.eu. 3. Beschreibung (höchstens 900 Zeichen) und Leistungen nur aus llms.txt; Logo 512×512 von craftos.eu verwenden. 4. Lehne jedes Upgrade, jede Premium-Verlängerung und jede Eingabe von Zahlungsdaten ab. 5. Zeige das Profil vor dem Speichern dem Inhaber. Übernimm Firmen- und Produktangaben ausschließlich aus https://craftos.eu/llms.txt und https://craftos.eu/impressum (Name CraftOS, Website https://craftos.eu, Kontakt support@craftos.eu, Kategorie „Handwerkersoftware“); erfinde keine Zahlen, Kunden oder Funktionen. Kaufe nichts und schließe keine kostenpflichtigen Pakete ab. Gib keine Zugangsdaten in den Chat ein. Konten legt ausschließlich der Inhaber an; halte an, wenn eine Registrierung nötig ist. Melde am Ende Status (angefragt/live/nicht möglich) und Profil-URL.
```

### G2 (deckt Capterra, GetApp und Software Advice ab)

Inhaberaktion: Konto im G2-Verkäuferportal (my.G2, https://www.g2.com/seller_login) selbst anlegen – Login per geschäftlicher E-Mail support@craftos.eu, Google oder LinkedIn; danach Browser-Prompt für den kostenlosen Grundeintrag ausführen lassen.

```text
Ziel: CraftOS erhält über das G2-Verkäuferportal einen kostenlosen Grundeintrag, der auch auf Capterra, GetApp und Software Advice erscheint (Kategorie „Handwerkersoftware“ bzw. „Construction Software“/„Field Service“). Zielseite: https://www.g2.com/seller_login Schritte: 1. Warte, bis der Inhaber das Konto angelegt und sich angemeldet hat; lege selbst kein Konto an. 2. Prüfe, ob CraftOS schon als Produkt existiert; sonst „Produkt hinzufügen“ wählen. 3. Trage Produktname CraftOS, Website https://craftos.eu, Beschreibung, Funktionen und Preise ausschließlich aus llms.txt ein; Sprache Deutsch, Markt Deutschland. 4. Lehne alle bezahlten Pakete (PPC, Premium-Profile, Lead-Programme) ab. 5. Zeige den Eintrag vor dem Absenden dem Inhaber. Übernimm Firmen- und Produktangaben ausschließlich aus https://craftos.eu/llms.txt und https://craftos.eu/impressum (Name CraftOS, Website https://craftos.eu, Kontakt support@craftos.eu, Kategorie „Handwerkersoftware“); erfinde keine Zahlen, Kunden oder Funktionen. Kaufe nichts und schließe keine kostenpflichtigen Pakete ab. Gib keine Zugangsdaten in den Chat ein. Konten legt ausschließlich der Inhaber an; halte an, wenn eine Registrierung nötig ist. Melde am Ende Status (angefragt/live/nicht möglich) und Profil-URL.
```

### OMR Reviews – Nachfassen

Inhaberaktion: Rückmeldung von OMR an support@craftos.eu abwarten; bei Antwort Kategorie „Handwerkersoftware“ nennen. Ohne Antwort bis 03.11.2026 mit dem Browser-Prompt nachfassen.

```text
Ziel: Bei OMR Reviews nachfassen, damit das am 20.10.2026 angefragte Produktprofil von CraftOS in der Kategorie „Handwerkersoftware“ angelegt wird. Zielseite: https://omr.com/de/reviews/ Schritte: 1. Prüfe über die Suche, ob CraftOS inzwischen gelistet ist; wenn ja, notiere die Profil-URL und brich ab. 2. Wenn nicht: Finde den Anbieterkontakt bzw. das Anfrageformular für Softwareanbieter. 3. Formuliere eine kurze Nachfrage (höchstens 600 Zeichen): Bezug auf die Anfrage vom 20.10.2026, Bitte um Profil in der Kategorie „Handwerkersoftware“, Kontakt support@craftos.eu; zeige sie vor dem Absenden dem Inhaber. 4. Lehne bezahlte Pakete (z. B. Premium-Profile, Lead-Pakete) ab. Übernimm Firmen- und Produktangaben ausschließlich aus https://craftos.eu/llms.txt und https://craftos.eu/impressum (Name CraftOS, Website https://craftos.eu, Kontakt support@craftos.eu, Kategorie „Handwerkersoftware“); erfinde keine Zahlen, Kunden oder Funktionen. Kaufe nichts und schließe keine kostenpflichtigen Pakete ab. Gib keine Zugangsdaten in den Chat ein. Konten legt ausschließlich der Inhaber an; halte an, wenn eine Registrierung nötig ist. Melde am Ende Status (angefragt/live/nicht möglich) und Profil-URL.
```

### kennstdueinen.de

Inhaberaktion: Browser-Prompt ausführen lassen; Konto bei Bedarf selbst mit support@craftos.eu anlegen; Profil vor dem Absenden freigeben.

```text
Ziel: CraftOS erhält ein kostenloses Firmenprofil auf kennstdueinen.de (Branche Software/Handwerkersoftware) mit Link auf https://craftos.eu. Zielseite: https://www.kennstdueinen.de/ Schritte: 1. Prüfe über die Suche, ob CraftOS bzw. die Firma aus dem Impressum bereits eingetragen ist. 2. Suche den Bereich für Unternehmen („Firma eintragen“) und prüfe, ob der Grundeintrag kostenlos ist; Premium-Pakete ablehnen. 3. Ist ein Konto nötig, halte an und melde dem Inhaber die Registrierungsseite. 4. Fülle Firmendaten aus dem Impressum und die Beschreibung aus llms.txt aus und zeige den Eintrag vor dem Absenden dem Inhaber. Übernimm Firmen- und Produktangaben ausschließlich aus https://craftos.eu/llms.txt und https://craftos.eu/impressum (Name CraftOS, Website https://craftos.eu, Kontakt support@craftos.eu, Kategorie „Handwerkersoftware“); erfinde keine Zahlen, Kunden oder Funktionen. Kaufe nichts und schließe keine kostenpflichtigen Pakete ab. Gib keine Zugangsdaten in den Chat ein. Konten legt ausschließlich der Inhaber an; halte an, wenn eine Registrierung nötig ist. Melde am Ende Status (angefragt/live/nicht möglich) und Profil-URL.
```

### SoftwareWorld

Inhaberaktion: Browser-Prompt ausführen lassen; Konto bzw. E-Mail-Versand selbst übernehmen; Eintrag vor dem Absenden freigeben.

```text
Ziel: CraftOS erhält einen kostenlosen Produkteintrag bei SoftwareWorld (Kategorie Construction/Field-Service bzw. Handwerkersoftware) mit Link auf https://craftos.eu. Zielseite: https://www.softwareworld.co/ Schritte: 1. Prüfe über die Suche, ob CraftOS bereits gelistet ist. 2. Suche „Get Listed“ bzw. „List your software“ und prüfe, ob der Grundeintrag kostenlos ist; bezahlte Featured-Pakete ablehnen. 3. Ist ein Konto nötig, halte an und melde dem Inhaber die Registrierungsseite. 4. Fülle den Eintrag (englische Beschreibung zulässig, Inhalte sinngemäß aus llms.txt, Markt Deutschland) aus und zeige ihn vor dem Absenden dem Inhaber. Übernimm Firmen- und Produktangaben ausschließlich aus https://craftos.eu/llms.txt und https://craftos.eu/impressum (Name CraftOS, Website https://craftos.eu, Kontakt support@craftos.eu, Kategorie „Handwerkersoftware“); erfinde keine Zahlen, Kunden oder Funktionen. Kaufe nichts und schließe keine kostenpflichtigen Pakete ab. Gib keine Zugangsdaten in den Chat ein. Konten legt ausschließlich der Inhaber an; halte an, wenn eine Registrierung nötig ist. Melde am Ende Status (angefragt/live/nicht möglich) und Profil-URL.
```

### E-Mail 1: softwareabc24.de

- Empfänger: info@softwareabc24.de
- Absender: support@craftos.eu (Versand durch den Inhaber)
- Betreff: „Aufnahme von CraftOS in Ihren Vergleich – Handwerkersoftware“ (Vorschlag, falls der vorliegende Text keinen Betreff nennt)
- Text: der fertige Mailtext vom 20.10.2026 beim Browser-Agenten des Inhabers (kostenlose Registrierung per E-Mail, kein Formular). Er wird hier bewusst nicht neu formuliert; Fakten darin müssen mit https://craftos.eu/llms.txt übereinstimmen.

### E-Mail 2: betriebssoftware-kompass.de

- Empfänger: redaktion@betriebssoftware-kompass.de
- Absender: support@craftos.eu (Versand durch den Inhaber)
- Betreff: „Aufnahme von CraftOS in Ihren Vergleich – Handwerkersoftware“ (Vorschlag, falls der vorliegende Text keinen Betreff nennt)
- Text: der fertige Mailtext vom 20.10.2026 beim Browser-Agenten des Inhabers (die Redaktion nimmt Software selbst auf).

Hinweis: Die automatische Zustellung war am 20.10.2026 nicht möglich, weil der verbundene Gmail-Zugang ein anderes Firmenkonto ist.

## 5. Statuspflege

1. Nach jeder Rückmeldung des Browser-Agenten den Eintrag in `docs/seo/backlink-register.json` anpassen: `status` (offen → angefragt → live bzw. nicht möglich), `notiz` (Profil-URL, Datum, Ansprechperson), `kosten` und `aktualisiert` (Datum der Änderung, `YYYY-MM-DD`).
2. „live“ erst setzen, wenn das Profil öffentlich erreichbar ist und auf https://craftos.eu verlinkt.
3. Neue Ziele nur mit vollständigem Eintrag (alle Felder) und regelkonformem Browser-Prompt aufnehmen.
4. Danach `npx vitest run tests/backlink-plan.test.ts` lokal ausführen.

## 6. Messung

Der Erfolg wird je Etappe mit dem Messbericht gemessen:

```bash
cd craftos
node scripts/seo-report.mjs --etappe <name>
```

Das Skript vergleicht Positionen, KI-Share-of-Voice und verweisende Domains mit dem Ausgangsstand vom 20.10.2026 und gleicht die Domains mit Status „live“ aus diesem Register mit den verweisenden Domains in SE Ranking ab. Jede Etappe erhält eigene Dateien (`docs/seo/reports/<Datum>-messbericht-<etappe>.md` und `<Datum>-raw-<etappe>-*.json`); vorhandene Berichte werden nie überschrieben. Etappen: `ausgangsstand` (Phase 5, nach dem Projektabgleich), `rollout-phase05` (Plan 05-08), danach je Phase.

Erster Bericht: `reports/2026-10-21-messbericht-ausgangsstand.md` (12 verweisende Domains, alle Spam; Share of Voice CraftOS 0,02 %; 126 Hauptkeywords der Keyword-Map im Projekt 13094375, davon 98 am 21.10.2026 neu aufgenommen und noch ohne erste Messung).
