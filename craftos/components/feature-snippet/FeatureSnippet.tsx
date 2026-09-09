"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, FileText, LockKeyhole, Package, Pause, Play, Plus, RotateCcw, Sparkles } from "lucide-react";
import { MiniPlanning } from "./MiniPlanning";
import s from "./FeatureSnippet.module.css";

export type SnippetVariant = "dashboard" | "angebot" | "planung" | "rechnung" | "beleg" | "ki" | "zeit" | "lager" | "aufmass";
const content: Record<SnippetVariant, { title: string; steps: [string, string, string]; hints: [string, string, string] }> = {
  dashboard: { title: "Vom Überblick ins Projekt", steps: ["Überblick", "Projekt", "Kosten"], hints: ["Öffnen Sie das Beispielprojekt.", "Die Projektakte hält den Auftrag zusammen.", "Material und erfasste Zeit ergeben die bisherigen Kosten."] },
  angebot: { title: "Ein Angebot wächst mit", steps: ["Positionen", "Auswahl", "Summe"], hints: ["Tippen Sie Leistungen an und stellen Sie Ihr Beispiel zusammen.", "Jede Auswahl verändert direkt die Angebotssumme.", "Die ausgewählten Positionen ergeben den Nettobetrag."] },
  planung: { title: "Ein Handgriff. Neu geplant.", steps: ["Dienstag", "Mittwoch", "Donnerstag"], hints: ["Ein Ausschnitt der Plantafel für dieselbe Person.", "Der Termin ändert sich, die geplante Dauer bleibt gleich.", "Ein Einsatz, ein neuer Tag. Es wurde keine Arbeitszeit gebucht."] },
  rechnung: { title: "Vom Entwurf zur Rechnung", steps: ["Entwurf", "Prüfen", "Fertig"], hints: ["Der Entwurf hat noch keine Rechnungsnummer.", "Empfänger, Leistungen und Beträge sind im Beispiel geprüft.", "Beim Fertigstellen entstehen Nummer und geschützter Stand."] },
  beleg: { title: "Ein Beleg findet seinen Platz", steps: ["Beleg", "Prüfen", "Zuordnen"], hints: ["Ein fiktiver Materialbeleg als Ausgangspunkt.", "Erkannte Angaben werden vor der Übernahme geprüft.", "Der geprüfte Beleg gehört jetzt zum Beispielprojekt."] },
  ki: { title: "Eine Frage. Mehr Überblick.", steps: ["Fragen", "Antwort", "Belege"], hints: ["Probieren Sie die vorbereitete Frage aus.", "Die Beispielantwort fasst offene Beträge zusammen.", "Die zugrunde liegenden Beispielrechnungen bleiben nachvollziehbar."] },
  zeit: { title: "Arbeitszeit bleibt beim Auftrag", steps: ["Start", "Läuft", "Erfasst"], hints: ["Starten Sie den Beispielablauf am Projekt.", "Die Zeit läuft hier im Zeitraffer zur Veranschaulichung.", "Die Beispielzeit ist dem Auftrag zugeordnet."] },
  lager: { title: "Material mit Überblick", steps: ["Bestand", "Entnahme", "Rückgabe"], hints: ["Wählen Sie die Beispielmenge für die Baustelle.", "Die Entnahme reduziert den Lagerbestand.", "Nicht verbrauchtes Material erhöht den Bestand wieder."] },
  aufmass: { title: "Aus Maßen wird eine Menge", steps: ["Fläche", "Abzug", "Menge"], hints: ["Verändern Sie die Breite der Beispielwand.", "Eine Öffnung mit 2 m² wird von der Fläche abgezogen.", "Die geprüfte Nettofläche kann ins Angebot übernommen werden."] },
};
const positions = [
  { title: "Wand streichen", detail: "35 m² × 10,50 €", cents: 36750 },
  { title: "Untergrund vorbereiten", detail: "35 m² × 4,00 €", cents: 14000 },
  { title: "Boden abdecken", detail: "20 m² × 2,80 €", cents: 5600 },
];
const eur = (cents: number) => (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
const num = (n: number) => n.toLocaleString("de-DE", { maximumFractionDigits: 2 });

export function FeatureSnippet({ variant, className = "" }: { variant: SnippetVariant; className?: string }) {
  return <Snippet key={variant} variant={variant} className={className} />;
}

function Snippet({ variant, className }: { variant: SnippetVariant; className: string }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [amount, setAmount] = useState(6);
  const [width, setWidth] = useState(7);
  const [playing, setPlaying] = useState(false);
  const [resetVersion, setResetVersion] = useState(0);
  const [reduced, setReduced] = useState(true);
  const playTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const root = useRef<HTMLElement>(null);
  const id = useId();
  const c = content[variant];
  const choose = (next: number) => {
    setStep(next);
    if (variant === "angebot") setSelected(next === 0 ? [] : next === 1 ? [0, 1] : [0, 1, 2]);
  };
  const pause = useCallback(() => {
    if (playTimer.current !== null) clearTimeout(playTimer.current);
    playTimer.current = null;
    setPlaying(false);
  }, []);
  const manual = (next: number) => { pause(); choose(next); };
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReduced(media.matches); if (media.matches) pause(); };
    update(); media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) pause(); }, { threshold: 0 });
    if (root.current) observer.observe(root.current);
    const hidden = () => { if (document.hidden) pause(); };
    document.addEventListener("visibilitychange", hidden);
    return () => { media.removeEventListener("change", update); observer.disconnect(); document.removeEventListener("visibilitychange", hidden); };
  }, [pause]);
  useEffect(() => {
    if (!playing || reduced) return;
    playTimer.current = setTimeout(() => {
      playTimer.current = null;
      const next = Math.min(2, step + 1);
      setStep(next);
      if (variant === "angebot") setSelected(next === 1 ? [0, 1] : [0, 1, 2]);
      if (next === 2) setPlaying(false);
    }, 1800);
    return () => { if (playTimer.current !== null) clearTimeout(playTimer.current); playTimer.current = null; };
  }, [playing, reduced, step, variant]);
  const reset = () => { pause(); choose(0); setAmount(6); setWidth(7); setResetVersion((version) => version + 1); };
  const action = (label: string, next = Math.min(2, step + 1)) => <button type="button" className={s.action} onClick={() => manual(next)}>{label}<ArrowRight size={16} aria-hidden="true" /></button>;
  const total = selected.reduce((sum, index) => sum + positions[index].cents, 0);
  let surface;
  switch (variant) {
    case "angebot": surface = <>
      <div className={s.documentTitle}><FileText size={19} /><strong>Bäckerei Krause</strong><span>Entwurf</span></div>
      <div className={s.positions}>{positions.map((p, index) => <button type="button" key={p.title} aria-pressed={selected.includes(index)} className={s.position} onClick={() => {
        setPlaying(false);
        const next = selected.includes(index) ? selected.filter((i) => i !== index) : [...selected, index];
        setSelected(next); setStep(next.length === 0 ? 0 : next.length === 3 ? 2 : 1);
      }}><span className={s.tick}>{selected.includes(index) ? <Check size={16} /> : <Plus size={16} />}</span><span><strong>{p.title}</strong><small>{p.detail}</small></span><b>{eur(p.cents)}</b></button>)}</div>
      <dl className={s.totals} aria-live="polite"><div><dt>Netto</dt><dd>{eur(total)}</dd></div><div><dt>19 % Umsatzsteuer</dt><dd>{eur(Math.round(total * .19))}</dd></div><div><dt>Gesamt</dt><dd>{eur(total + Math.round(total * .19))}</dd></div></dl>
    </>; break;
    case "planung": surface = <MiniPlanning key={resetVersion} day={step} onChange={manual} onInteract={pause} />; break;
    case "dashboard": surface = <>
      <div className={s.stats}><div><small>Aktive Projekte</small><strong>3</strong></div><div><small>Offene Beträge</small><strong>7.200 €</strong></div></div>
      <div className={s.project} key={step}><span className={s.badge}>{step === 0 ? "Aktuelles Projekt" : "Bäckerei Krause"}</span><h3>{step === 0 ? "Bäckerei Krause" : step === 1 ? "Alles beim Auftrag" : "Kosten im Blick"}</h3>
        {step === 0 ? <div className={s.chart} aria-label="Beispielumsatz steigt über vier Monate" role="img">{[32, 52, 43, 76].map((height, i) => <span key={i} style={{ height: `${height}%` }} />)}</div> : step === 1 ? <div className={s.fileList}><span><Check size={15} /> Angebot angenommen</span><span><FileText size={15} /> Plan und Unterlagen</span><span><Check size={15} /> Nächster Einsatz geplant</span></div> : <dl className={s.totals}><div><dt>Material</dt><dd>1.200 €</dd></div><div><dt>Erfasste Zeit</dt><dd>600 €</dd></div><div><dt>Bisherige Kosten</dt><dd>1.800 €</dd></div></dl>}
      </div>{action(step === 0 ? "Projekt öffnen" : step === 1 ? "Kosten ansehen" : "Zum Überblick", step === 2 ? 0 : step + 1)}
    </>; break;
    case "rechnung": surface = <>
      <div className={`${s.paper} ${step === 2 ? s.finished : ""}`}><div className={s.documentTitle}>{step === 2 ? <LockKeyhole size={20} /> : <FileText size={20} />}<strong>{step === 2 ? "Rechnung" : "Rechnungsentwurf"}</strong></div><p>Bäckerei Krause<br /><strong>{step === 2 ? "RE-BEISPIEL-001" : "Noch ohne Rechnungsnummer"}</strong></p><div className={s.paperLines}><span>Wandanstrich und Vorbereitung</span><span>3 Positionen</span></div><dl className={s.totals}><div><dt>Netto</dt><dd>563,50 €</dd></div><div><dt>Gesamt inkl. 19 % USt.</dt><dd>670,57 €</dd></div></dl><span className={s.badge}>{step === 0 ? "Bearbeitbar" : step === 1 ? "Angaben geprüft" : "Festgeschrieben im Beispiel"}</span></div>
      {step < 2 && action(step === 0 ? "Entwurf prüfen" : "Beispiel fertigstellen")}
    </>; break;
    case "beleg": surface = <>
      <div className={s.receipt}><FileText size={26} /><strong>Materialbeleg</strong><span>Baustoffhandel Muster</span><b>119,00 €</b></div>
      <div className={s.fileList} key={step}>{step === 0 ? <span>Ein Beispielbeleg liegt bereit.</span> : <><span><Check size={16} /> Netto 100,00 € · USt. 19,00 €</span><span><Check size={16} /> Lieferant und Betrag geprüft</span>{step === 2 && <span><Check size={16} /> Projekt: Bäckerei Krause</span>}</>}</div>
      {step < 2 && action(step === 0 ? "Angaben ansehen" : "Dem Projekt zuordnen")}
    </>; break;
    case "ki": surface = <>
      <div className={s.question}>Welche Rechnungen sind noch offen?</div>
      <div className={s.answer} key={step}><Sparkles size={20} /><div>{step === 0 ? <p>Eine vorbereitete Frage an Craft AI ausprobieren.</p> : <><strong>3 Rechnungen, zusammen 7.200 €.</strong><p>Hier sehen Sie die offenen Beträge im fiktiven Musterbetrieb.</p>{step === 2 && <ul><li>Krause <b>2.400 €</b></li><li>Weber <b>1.800 €</b></li><li>Schmidt <b>3.000 €</b></li></ul>}</>}</div></div>
      {step < 2 && action(step === 0 ? "Beispielfrage stellen" : "Belege ansehen")}
    </>; break;
    case "zeit": surface = <>
      <div className={s.timer}><span className={s.badge}>Bäckerei Krause</span><strong>{["00:00", "01:30", "03:30"][step]}</strong><span>{["Bereit zum Start", "Beispielzeit im Zeitraffer", "3,5 Stunden im Beispiel erfasst"][step]}</span><div className={s.track}><span style={{ transform: `scaleX(${step / 2})` }} /></div></div>
      {step < 2 && action(step === 0 ? "Timer starten" : "Beispielzeit erfassen")}
    </>; break;
    case "lager": surface = <>
      <div className={s.stock}><Package size={34} /><div><span>Wandfarbe, 10 Liter</span><strong>{24 - (step > 0 ? amount : 0) + (step === 2 ? Math.min(amount, 2) : 0)} <small>Eimer im Lager</small></strong></div></div>
      <label className={s.range} htmlFor={`${id}-amount`}>Entnahmemenge <b>{amount} Eimer</b><input id={`${id}-amount`} type="range" min="1" max="12" value={amount} onChange={(event) => { setPlaying(false); setAmount(Number(event.target.value)); }} /></label>
      <p className={s.hint}>{step === 0 ? "Ausgangsbestand: 24 Eimer." : step === 1 ? `${amount} Eimer sind dem Beispielprojekt zugeordnet.` : `${Math.min(amount, 2)} unbenutzte Eimer kommen zurück ins Lager.`}</p>
      {step < 2 && action(step === 0 ? `${amount} Eimer entnehmen` : `${Math.min(amount, 2)} Eimer zurückgeben`)}
    </>; break;
    case "aufmass": surface = <>
      <div className={s.measure}><div className={s.wall} style={{ width: `${55 + width * 3}%` }}><strong>{num(width * 5)} m²</strong>{step > 0 && <span className={s.opening}>−2 m²</span>}</div><span>5 m Höhe</span></div>
      <label className={s.range} htmlFor={`${id}-width`}>Wandbreite <b>{num(width)} m</b><input id={`${id}-width`} type="range" min="3" max="9" step="0.5" value={width} onChange={(event) => { setPlaying(false); setWidth(Number(event.target.value)); }} /></label>
      <div className={s.result}><span>{step === 0 ? "Bruttofläche" : "Nettofläche"}</span><strong>{num(width * 5 - (step > 0 ? 2 : 0))} m²</strong></div>
      {step < 2 && action(step === 0 ? "Öffnung abziehen" : "Menge übernehmen")}
    </>; break;
  }
  return <section ref={root} className={`${s.snippet} ${className}`} aria-labelledby={`${id}-title`} data-feature-snippet={variant} data-step={step}
    onPointerDownCapture={(event) => { if (!(event.target as Element).closest("[data-snippet-play]")) pause(); }}
    onKeyDownCapture={(event) => { if (!(event.target as Element).closest("[data-snippet-play]")) pause(); }}>
    <header className={s.header}><h2 id={`${id}-title`}>{c.title}</h2><span>Funktionsbeispiel</span></header>
    <nav className={s.steps} aria-label="Beispielschritte">{c.steps.map((label, index) => <button type="button" key={label} aria-current={step === index ? "step" : undefined} onClick={() => manual(index)}><span>{index + 1}</span>{label}</button>)}</nav>
    <div className={s.surface}>{surface}</div>
    <div className={s.caption}><p role="status">{c.hints[step]}</p><div className={s.controls}>
      <button type="button" data-snippet-play aria-label={playing ? "Animation pausieren" : "Animation abspielen"} disabled={reduced} onClick={() => { if (playing) pause(); else { if (step === 2) choose(0); setPlaying(true); } }}>{playing ? <Pause size={16} /> : <Play size={16} />}<span>{playing ? "Pause" : "Abspielen"}</span></button>
      <button type="button" aria-label="Beispiel zurücksetzen" onClick={reset}><RotateCcw size={16} /></button>
    </div></div>
    <p className={s.disclaimer}>Vereinfacht dargestellt, mit fiktiven Daten. Keine echte Produktoberfläche.{reduced && <span> Animation aus. Alle Schritte sind antippbar.</span>}</p>
  </section>;
}
