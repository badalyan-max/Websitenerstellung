"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { MousePointer2, Pause, Play } from "lucide-react";
import type { SnippetExample } from "@/lib/snippet-examples";
import { IllustrationScene } from "./IllustrationScene";
import s from "./FeatureSnippet.module.css";

export type SnippetVariant = "dashboard" | "angebot" | "planung" | "rechnung" | "beleg" | "ki" | "zeit" | "lager" | "aufmass";

const content: Record<SnippetVariant, { title: string; summary: string }> = {
  dashboard: { title: "Alles beim Auftrag", summary: "Vom Überblick zum Projekt: Unterlagen, Material und erfasste Zeit bleiben zusammen." },
  angebot: { title: "Position für Position zum Angebot", summary: "Leistungen werden ergänzt. Mengen und Einzelpreise ergeben automatisch die Angebotssumme." },
  planung: { title: "Vom Büro auf die Baustelle", summary: "Der Einsatz wandert auf einen anderen Tag und erscheint in der App. Mitarbeiter und geplante Dauer bleiben erhalten." },
  rechnung: { title: "Vom Entwurf zur Rechnung", summary: "Angaben prüfen und fertigstellen: Die Rechnung erhält ihre Nummer und einen geschützten Stand." },
  beleg: { title: "Ein Beleg findet seinen Platz", summary: "Erkannte Belegdaten werden geprüft und korrigiert. Anschließend wird der Beleg dem Projekt zugeordnet." },
  ki: { title: "Eine Frage. Mehr Überblick.", summary: "Craft AI fasst offene Rechnungen zusammen. Die zugrunde liegenden Belege bleiben nachvollziehbar." },
  zeit: { title: "Arbeitszeit bleibt beim Auftrag", summary: "Timer starten, Zeit erfassen und dem Auftrag zuordnen. Die Uhr läuft hier zur Veranschaulichung im Zeitraffer." },
  lager: { title: "Material mit Überblick", summary: "Sechs Eimer gehen auf die Baustelle, zwei kommen zurück. Der Bestand verändert sich von 24 auf 18 und anschließend 20." },
  aufmass: { title: "Aus Maßen wird eine Menge", summary: "35 m² Wandfläche abzüglich einer Öffnung von 2 m² ergeben 33 m² für die Angebotsposition." },
};
const phaseDuration = [800, 700, 1000, 700, 1200, 700, 1600, 2200];

export function FeatureSnippet({ variant, example, className = "" }: { variant: SnippetVariant; example?: SnippetExample; className?: string }) {
  return <Illustration key={`${variant}:${example?.id ?? "default"}`} variant={variant} example={example} className={className} />;
}

function Illustration({ variant, example, className }: { variant: SnippetVariant; example?: SnippetExample; className: string }) {
  const root = useRef<HTMLElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(false);
  const id = useId();
  const c = content[variant];
  const matchingExample = example?.variant === variant ? example : undefined;
  const running = !reduced && inView && visible && !paused;
  const shownPhase = reduced ? 7 : phase;
  const stage = Math.min(3, Math.floor(shownPhase / 2));

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const motionChanged = () => setReduced(media.matches);
    const visibilityChanged = () => setVisible(!document.hidden);
    motionChanged();
    visibilityChanged();
    media.addEventListener("change", motionChanged);
    document.addEventListener("visibilitychange", visibilityChanged);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= .15), { threshold: [.15] });
    if (root.current) observer.observe(root.current);
    return () => {
      media.removeEventListener("change", motionChanged);
      document.removeEventListener("visibilitychange", visibilityChanged);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setPhase((current) => (current + 1) % phaseDuration.length), phaseDuration[phase]);
    return () => clearTimeout(timer);
  }, [phase, running]);

  // Measure the actual target in its current layout, including on mobile.
  useLayoutEffect(() => {
    const area = surface.current;
    const pointer = cursor.current;
    if (!area || !pointer) return;
    const update = () => {
      const bounds = area.getBoundingClientRect();
      const targetName = shownPhase <= 2 ? "first" : shownPhase <= 4 ? "second" : "third";
      const target = area.querySelector<HTMLElement>(`[data-cursor-target="${targetName}"]`);
      const rect = target?.getBoundingClientRect();
      const entering = shownPhase === 0;
      const x = entering || !rect ? bounds.width * .88 : rect.left - bounds.left + rect.width * .6;
      const y = entering || !rect ? bounds.height * .88 : rect.top - bounds.top + rect.height * .55;
      pointer.style.setProperty("--cursor-x", `${Math.min(bounds.width - 28, Math.max(4, x))}px`);
      pointer.style.setProperty("--cursor-y", `${Math.min(bounds.height - 28, Math.max(4, y))}px`);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(area);
    return () => observer.disconnect();
  }, [shownPhase]);

  // Pause CSS motion too, including a cursor stopped halfway to its target.
  useEffect(() => {
    root.current?.getAnimations({ subtree: true }).forEach((animation) => {
      if (running) animation.play();
      else animation.pause();
    });
  }, [running, shownPhase]);

  return <section ref={root} className={`${s.snippet} ${className}`} aria-labelledby={`${id}-title`}
    data-feature-snippet={variant} data-feature-illustration="true" data-snippet-example={matchingExample?.id}
    data-phase={shownPhase} data-stage={stage} data-running={running} data-reduced-motion={reduced}>
    <header className={s.header}><h2 id={`${id}-title`}>{c.title}</h2><span>So funktioniert’s</span></header>
    <div ref={surface} className={s.surface} aria-hidden="true">
      <IllustrationScene variant={variant} example={matchingExample} stage={stage} phase={shownPhase} reduced={reduced} />
      <div ref={cursor} className={s.cursor} data-illustration-cursor="true" data-visible={!reduced && shownPhase > 0 && shownPhase < 7} aria-hidden="true">
        <MousePointer2 size={25} strokeWidth={1.6} />
        {[2, 4, 6].includes(shownPhase) && <span key={shownPhase} className={s.clickRing} />}
      </div>
    </div>
    <p className={s.summary} data-illustration-summary>{c.summary}</p>
    <footer className={s.footer}>
      <p>Animiertes Funktionsbeispiel mit fiktiven Daten. Die Darstellung ist vereinfacht und weicht von der echten Oberfläche ab.</p>
      {!reduced && <button type="button" aria-label={paused ? "Animation fortsetzen" : "Animation pausieren"} aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>}
    </footer>
  </section>;
}
