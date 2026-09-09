# Anbieterlogos im Vergleich

Stand: 9. September 2026.

Die Vergleichsseite `/vergleich` verwendet die Logos zur sichtbaren Zuordnung der Kostenbeispiele, Anbieterabschnitte und Tabellenspalten. Die bestehenden Preise, Vergleichsfakten und Quellenangaben wurden dabei nicht verändert.

## Herkunft

| Marke | Offizielle Fundstelle | Verwendete Datei | Herkunft und Prüfsumme |
| --- | --- | --- | --- |
| CraftOS | Vorhandene `components/CraftOSLogo.tsx` | `CraftOSMark`, ergänzt um die vorhandene Wortmarke in Clash Display | Markenpfad laut bestehender Komponente aus CraftOS Web, Commit `66b9534b`; keine Neuzeichnung. |
| plancraft | [Offizielle Startseite](https://plancraft.com/de-de), Logo im Kopfbereich | `public/images/brands/plancraft.svg` | [Originaldatei auf dem eingebundenen Anbieter-CDN](https://cdn.prod.website-files.com/6721edec2a463887e742a101/6721edec2a463887e742a172_plancraft%20logo.svg); SHA256 `aa14451f727ea282d863b813bd9255118f3303efc55b00308461f880b0fa92ed`. |
| Craftnote | [Offizielle Startseite](https://craftnote.de/), Logo im Kopfbereich | `public/images/brands/craftnote.png` | [Originaldatei](https://craftnote.de/wp-content/uploads/2025/06/250211_Logos_Craftnote_RGB.png); SHA256 `17ecaf8ccfb46dd83cd3ab582ea585cc8fd3fe26968cf83c053411b48df0aa73`. |

Die beiden Anbieterdateien wurden am 9. September 2026 unverändert aus den offiziellen Websites übernommen. Die SVG-Datei enthält ausschließlich statische Vektorzeichnung und keine Skripte oder externen Referenzen. Das Craftnote-PNG hat 1277 × 335 Pixel und ist bei der angezeigten Breite von 160 Pixeln auch auf hochauflösenden Displays ausreichend scharf. SVG und PNG umfassen zusammen rund 18 KB. Die Dateien werden lokal ausgeliefert, sodass zum Anzeigen keine Verbindung zum jeweiligen Anbieter erforderlich ist.

## Gestaltung und Zugänglichkeit

- Alle drei Logos stehen in derselben Fläche von 160 × 44 Pixeln und behalten ihre Farben und Proportionen. Es gibt keine Entfärbung oder Beschneidung.
- Die vorhandene helle Vergleichsgestaltung bietet den dunklen Wortmarken einen lesbaren Hintergrund; CraftOS behält seinen Amber-Akzent. Das offizielle plancraft-Logo enthält eine weiße Wortmarke und erhält deshalb eine dunkle Fläche, ohne die Originalzeichnung umzufärben.
- Jede Darstellung hat genau einen zugänglichen Markennamen. Die Tarifüberschriften und Tabellenspalten behalten ihre semantische Struktur.
- Die Kostenkarten bleiben auf schmalen Bildschirmen untereinander angeordnet. Die Vergleichstabelle behält ihren eigenen per Tastatur bedienbaren horizontalen Scrollbereich.
- Im Quellenbereich wird die Markeninhaberschaft und die fehlende Aussage über eine Partnerschaft erklärt; eine Freigabe oder Empfehlung durch Wettbewerber wird nicht behauptet.

`logo_search` und 21st.dev waren in dieser Sitzung nicht verfügbar; deshalb wurden die tatsächlichen Assets der offiziellen Anbieter-Websites recherchiert. UI-Pipeline, Frontend-Design und UI/UX Pro Max wurden auf die vorhandene Gestaltung angewendet; Next.js-Image-Dokumentation wurde über Context7 geprüft.

## Prüfung

- ESLint für die geänderte Seite und die neue Logokomponente erfolgreich.
- Lokale Browserprüfung in Chromium und WebKit bei 360, 390, 768 und 1440 Pixeln: alle Logos geladen, kein horizontaler Seitenüberlauf, keine JavaScript-Fehler; acht zugängliche Markendarstellungen pro Ansicht.
- Überschriftennamen und Tastaturbedienung des horizontalen Vergleichsbereichs separat geprüft.
- Desktop- und Mobile-Aufnahmen visuell geprüft. Der zunächst zu geringe Kontrast der weißen plancraft-Wortmarke wurde durch die passende dunkle Fläche korrigiert und erneut geprüft.
- SVG auf aktive Inhalte geprüft; kein Script, Event-Handler, fremdes eingebettetes HTML oder externer Ressourcenbezug vorhanden.
- Kein Commit, Push oder Deployment aus diesem Teilauftrag; Gesamtprüfung und Integration erfolgen durch den Hauptagenten.
