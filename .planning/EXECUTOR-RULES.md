# Verbindliche Ausführungsregeln (Orchestrator, gilt für jeden Plan)

Antwortsprache: Deutsch.

## Ablauf
- Haupt-Arbeitsbaum `C:/Projekte/Websitenerstellung` (Branch main), kein Worktree, keine parallelen Agenten.
- Workflow: `$HOME/.claude/gsd-core/workflows/execute-plan.md` (plus `templates/summary.md`, `references/checkpoints.md`, `references/tdd.md`, `references/executor-examples.md`).
- Atomare Commits mit normalen Hooks, nie `--no-verify`. Nicht pushen, außer der Plan ist ausdrücklich der Rollout-Plan.
- Reihenfolge: Tasks (TDD rot → grün, wo vorgesehen), SUMMARY.md, STATE/ROADMAP aktualisieren (gsd-tools; wenn Befehle scheitern, die Felder von Hand korrigieren), committen.
- `.planning/config.json` (lokale Änderung) nie anfassen, stagen, committen.
- Anforderungs-Markierung: Außer im Rollout-Plan im SUMMARY `requirements-completed: []` und kein `requirements.mark-complete`. Im Rollout-Plan nur die im Plan-Frontmatter genannten IDs markieren; DESIGN-02 und SEO-02 bleiben „In Progress“, bis der Plan sie ausdrücklich abschließt.

## Prozesse und schwere Läufe
- Koordinationsstatus vor schweren Läufen lesen: `node "$CRAFTOS_WORKSPACE/coordination/client/cli.mjs" status` (für die Website gibt es kein Rezept → lokal, einzeln).
- Vor Serverstart prüfen, dass Port 3100 frei ist (belegt → abbrechen und melden, fremde Prozesse nie beenden). Start z. B. `node node_modules/next/dist/bin/next start -p 3100 & SRV=$!`, nach der Warteschleife `kill -0 $SRV`, am Ende `kill $SRV`.
- Achtung (08-01): `kill $SRV` kann nur eine Hilfs-Shell beenden. Nach dem Stopp prüfen, dass Port 3100 frei ist; lauscht dort noch der eigene `next start` (PID aus netstat, Startzeit/Kommandozeile geprüft), genau diese PID beenden.
- E2E (08-02): Zeitabhängige WebKit-Fälle, die einzeln bestehen, sind bekannte Flakes (deferred-items.md). Höchstens ein voller Lauf plus Einzelwiederholung der Fehlschläge; neue, nicht zeitabhängige Fehlschläge immer beheben.
- Niemals Prozesse per Name/Image beenden (kein `taskkill /IM`, kein `pkill`). Nichts im Hintergrund zurücklassen.
- Texte mit Backticks oder `$` nie in Shell-Strings mit doppelten Anführungszeichen schreiben; Write/Edit oder Skript mit Datei-Eingabe verwenden. Ersetzungen mit `split/join` statt Regex-Ersetzungsstrings mit `$`.

## Design-Kaskade (UI-Pläne)
- frontend-design-Leitlinie read-only lesen (Glob `C:/Users/badal/.claude/plugins/cache/claude-plugins-official/frontend-design/**/SKILL.md`), nichts kopieren.
- `py -3.12 -X utf8 c:/Projekte/ai-agent-tools/skills/ui-ux-pro-max/scripts/search.py "<Begriffe>" --domain ux` laut Plan ausführen.
- 21st.dev/Context7 nur falls verfügbar, sonst vermerken; Ersatz `craftos/node_modules/next/dist/docs`.
- Genehmigte UI-SPECs der Phase und Vorphasen sind verbindlich. Nachweis in `craftos/docs/DESIGN-V2.md`.
- Sichtprüfung laut Plan; Screenshots nur in `C:/Users/badal/AppData/Local/Temp/claude/c--Projekte-Websitenerstellung/8faeabcc-263d-4f29-8287-1406748c2152/scratchpad/`, nicht committen; selbst ansehen, offensichtliche Fehler beheben.

## Inhalt und Sicherheit
- Keine Zugangsdaten ausgeben oder schreiben (nur Variablennamen). Prüfungen nur lokal, keine CI.
- Produktfakten nur aus `craftos/lib/product-register.ts`, `lib/funktionen.ts`, `lib/site.ts`, Snapshot; bei Bedarf nur lesend `git -C C:/Projekte/craft-connect-buddy show origin/release:<pfad>` bzw. `git -C "C:/Projekte/CraftOS - Mobile/craftos-mobile" show origin/release:<pfad>`.
- Keine Seiten, URLs oder Dateien der Website löschen (Ausnahme: im Plan ausdrücklich vorgesehen).

## Rückmeldung
Kurz auf Deutsch: Commits, Prüfergebnisse mit Zahlen, Abweichungen, Screenshot-Pfade (falls vorhanden), bestätigen, dass kein Server/Prozess mehr läuft.
