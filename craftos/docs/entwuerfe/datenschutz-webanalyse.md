# Entwurf: Abschnitt „Webanalyse“ der Datenschutzerklärung

> Status: Am 23.10.2026 auf Inhaberanweisung in `app/datenschutz/page.tsx` umgesetzt (Abschnitt „Webanalyse und Ladezeitmessung“, Fakten aus Vercel-Doku und Privacy Notice vom 01.06.2026 geprüft). Ersetzt den heutigen Abschnitt „Webanalyse“ in `app/datenschutz/page.tsx`.
> Anlass: Web Analytics ist auf craftos.eu bereits aktiv; mit Paket 1 kommen Speed Insights (kostenlose Stufe) und die Ereignisse `trial_click`, `login_click` und `ai_visit` hinzu. Der heutige Text nennt weder den Dienst noch den Anbieter.
> Mit [PRÜFEN] markierte Stellen konnte ich nicht selbst belegen.

## Vorschlag

**Webanalyse und Ladezeitmessung**

Um zu verstehen, wie unsere Website genutzt wird und wie schnell sie lädt, setzen wir Vercel Web Analytics und Vercel Speed Insights ein. Anbieter ist die Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA [PRÜFEN: aktuelle Anschrift laut Vercel-Impressum/DPA], die unsere Website auch hostet.

Beide Dienste setzen keine Cookies und speichern nichts auf Ihrem Endgerät. Erfasst werden die aufgerufene Seite ohne Suchparameter, die verweisende Website, Gerätetyp, Betriebssystem, Browser und das aus der IP-Adresse abgeleitete Land; die IP-Adresse selbst wird nach Angaben des Anbieters nicht gespeichert [PRÜFEN gegen die aktuelle Vercel-Dokumentation zum Datenschutz von Web Analytics]. Speed Insights misst zusätzlich Ladezeit-Kennzahlen der Seite.

Außerdem zählen wir ohne weitere Angaben, ob Besucher auf „10 Tage testen“, „Anmelden“ oder einen App-Store-Link klicken, ob ein Rechner benutzt wird und ob ein Besuch über einen KI-Dienst wie ChatGPT oder Perplexity kam. Eingaben in Rechnern und Formularen werden nicht übertragen.

Rechtsgrundlage ist unser berechtigtes Interesse an einer bedarfsgerechten und technisch funktionsfähigen Website (Art. 6 Abs. 1 lit. f DSGVO) [PRÜFEN: Einordnung nach § 25 TDDDG]. Für die Übermittlung in die USA stützen wir uns auf [PRÜFEN: EU-US Data Privacy Framework-Zertifizierung von Vercel oder Standardvertragsklauseln im Vercel-DPA]. Sie können der Verarbeitung jederzeit widersprechen; wenden Sie sich dazu an support@craftos.eu.
