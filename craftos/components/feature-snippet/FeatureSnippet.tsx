"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { MousePointer2, Pause, Play } from "lucide-react";
import type { SnippetExample } from "@/lib/snippet-examples";
import { IllustrationScene } from "./IllustrationScene";
import s from "./FeatureSnippet.module.css";

export type SnippetVariant = "dashboard" | "angebot" | "planung" | "rechnung" | "beleg" | "ki" | "zeit" | "lager" | "aufmass";

const content: Record<SnippetVariant, { title: string; summary: string }> = {
  dashboard: { title: "Alles beim Auftrag", summary: "Im Büro eine Datei in der Projektakte hinterlegen, auf der Baustelle denselben Plan auf dem Handy öffnen." },
  angebot: { title: "Vom Angebot zur Unterschrift", summary: "Das Angebot im Web vorbereiten und mobil vom Kunden unterschreiben lassen. Die gespeicherte Unterschrift bleibt beim Dokument sichtbar." },
  planung: { title: "Vom Büro auf die Baustelle", summary: "Der Einsatz wandert auf einen anderen Tag und erscheint in der App. Mitarbeiter und geplante Dauer bleiben erhalten." },
  rechnung: { title: "Vom Entwurf zur Rechnung", summary: "Auf dem Handy Leistungen unterschreiben lassen, im Büro in einen Rechnungsentwurf übernehmen und nach Prüfung fertigstellen." },
  beleg: { title: "Ein Beleg findet seinen Platz", summary: "Den Beleg mobil scannen, Angaben prüfen und beim Projekt speichern. Im Büro folgt die weitere Bearbeitung unter Eingangsrechnungen." },
  ki: { title: "Vom Bericht zum Angebotsentwurf", summary: "Der Bericht wird auf der Baustelle diktiert. Im Büro bereitet der Angebotschat einen Angebotsentwurf vor, den Sie prüfen und übernehmen." },
  zeit: { title: "Arbeitszeit bleibt beim Auftrag", summary: "GPS erfasst den Standort beim Starten und Stoppen. Beim Start wird ein passendes Projekt im Umkreis zugeordnet. Die Zeitanzeige läuft im Zeitraffer." },
  lager: { title: "Material mit Überblick", summary: "Sechs Eimer gehen auf die Baustelle, zwei kommen zurück. Der Bestand verändert sich von 24 auf 18 und anschließend 20." },
  aufmass: { title: "Aus Maßen wird eine Menge", summary: "Das mobile Aufmaß liefert 33 m² für die Angebotsposition im Web. Der Preis wird anschließend ergänzt; er wird nicht aus den Maßen ermittelt." },
};
const phaseDuration = [1200, 900, 1500, 1000, 1700, 1000, 1800, 3000];

/** Endzustand sofort setzen; endlose Animationen lassen sich nicht beenden und werden abgebrochen. */
function finishAnimation(animation: Animation) {
  try {
    animation.finish();
  } catch {
    animation.cancel();
  }
}

/** headingLevel 3 nur innerhalb eines Abschnitts mit eigener H2 (Funktionsdetailseiten, 07-04); Standard 2 wie im Bestand. */
export function FeatureSnippet({ variant, example, className = "", headingLevel = 2 }: { variant: SnippetVariant; example?: SnippetExample; className?: string; headingLevel?: 2 | 3 }) {
  return <Illustration key={`${variant}:${example?.id ?? "default"}`} variant={variant} example={example} className={className} headingLevel={headingLevel} />;
}

function Illustration({ variant, example, className, headingLevel }: { variant: SnippetVariant; example?: SnippetExample; className: string; headingLevel: 2 | 3 }) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
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
    const node = root.current;
    const timer = setTimeout(() => setPhase((current) => (current + 1) % phaseDuration.length), phaseDuration[phase]);
    // Beobachtbarer Timer-Zustand für Browser-Tests mit eingefrorener Uhr: Die Bereinigung läuft erst nach dem
    // Commit von data-running, "cleared" belegt, dass kein alter Timer mehr aussteht.
    node?.setAttribute("data-timer", `armed-${phase}`);
    return () => {
      clearTimeout(timer);
      node?.setAttribute("data-timer", "cleared");
    };
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
      pointer.dataset.pointerKind = target?.closest('[data-illustration-platform="mobile"]') ? "touch" : "mouse";
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
      // Bei reduzierter Bewegung sofort den Endzustand setzen statt anhalten: WebKit startet bei der Hydration
      // Übergänge (globale 0,01-ms-Regel); angehalten blieben sie dauerhaft pausiert im DOM (Befund 07-08).
      else if (reduced) finishAnimation(animation);
      else animation.pause();
    });
  }, [running, shownPhase, reduced]);

  return <section ref={root} className={`${s.snippet} ${className}`} aria-labelledby={`${id}-title`}
    data-feature-snippet={variant} data-feature-illustration="true" data-snippet-example={matchingExample?.id}
    data-phase={shownPhase} data-stage={stage} data-running={running} data-reduced-motion={reduced}>
    <header className={s.header}><Heading id={`${id}-title`}>{c.title}</Heading><span>So funktioniert’s</span></header>
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
