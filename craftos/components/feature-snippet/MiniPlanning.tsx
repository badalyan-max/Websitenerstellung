"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { GripVertical, Plus } from "lucide-react";
import s from "./FeatureSnippet.module.css";

const days = ["Dienstag", "Mittwoch", "Donnerstag"];

/** One person's assignment: changing the day moves it, never copies it. */
export function MiniPlanning({ day, onChange, onInteract }: {
  day: number;
  onChange: (day: number) => void;
  onInteract: () => void;
}) {
  const board = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ id: number; x: number; y: number; active: boolean } | null>(null);
  const dropped = useRef<{ x: number; y: number; at: number } | null>(null);
  const [drag, setDrag] = useState<{ x: number; y: number; target: number | null } | null>(null);
  const targetAt = (x: number, y: number) => {
    const el = document.elementFromPoint(x, y)?.closest<HTMLElement>("[data-snippet-day]");
    return el && board.current?.contains(el) ? Number(el.dataset.snippetDay) : null;
  };
  const cancel = () => { gesture.current = null; setDrag(null); };
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && gesture.current) {
        event.preventDefault();
        gesture.current = null;
        setDrag(null);
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  const start = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || !event.isPrimary) return;
    onInteract();
    event.currentTarget.focus({ preventScroll: true });
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, active: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    const g = gesture.current;
    if (!g || g.id !== event.pointerId) return;
    if (!g.active && Math.hypot(event.clientX - g.x, event.clientY - g.y) < 6) return;
    g.active = true;
    const rect = board.current!.getBoundingClientRect();
    setDrag({ x: event.clientX - rect.left, y: event.clientY - rect.top, target: targetAt(event.clientX, event.clientY) });
  };
  const end = (event: PointerEvent<HTMLButtonElement>) => {
    const g = gesture.current;
    if (!g || g.id !== event.pointerId) return;
    if (g.active) {
      dropped.current = { x: event.clientX, y: event.clientY, at: event.timeStamp };
      const target = targetAt(event.clientX, event.clientY);
      if (target !== null) onChange(target);
    }
    cancel();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return <div>
    <div className={s.person}><span className={s.avatar}>MS</span><div><strong>Mila Schneider</strong><small>Ein Einsatz mit 3,5 Stunden</small></div></div>
    <div ref={board} className={s.plan} onClickCapture={(event) => {
      const drop = dropped.current;
      if (drop && event.detail > 0 && event.timeStamp - drop.at < 350 && Math.abs(event.clientX - drop.x) < 2 && Math.abs(event.clientY - drop.y) < 2) {
        event.preventDefault(); event.stopPropagation(); dropped.current = null;
      }
    }}>
      {days.map((label, index) => <div key={label} className={s.day} data-snippet-day={index} data-over={drag?.target === index}>
        <span>{label.slice(0, 2)}</span>
        {day === index ? <button key="assignment" type="button" className={s.assignment} data-snippet-assignment
          aria-label={`Einsatz Bäckerei Krause am ${label}, 3,5 Stunden. Mit Pfeiltasten verschieben.`}
          onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={cancel} onLostPointerCapture={cancel}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault(); onChange(Math.max(0, Math.min(2, day + (event.key === "ArrowRight" ? 1 : -1))));
              requestAnimationFrame(() => board.current?.querySelector<HTMLButtonElement>("[data-snippet-assignment]")?.focus({ preventScroll: true }));
            }
          }}>
          <GripVertical size={15} aria-hidden="true" /><strong>Wand streichen</strong><span>3,5 Std.</span>
        </button> : <button key="target" type="button" className={s.dayTarget} aria-label={`Einsatz auf ${label} verschieben`} onClick={(event) => {
          onChange(index);
          if (event.detail === 0) requestAnimationFrame(() => board.current?.querySelector<HTMLButtonElement>("[data-snippet-assignment]")?.focus({ preventScroll: true }));
        }}><Plus size={18} aria-hidden="true" /><span>Hierhin</span></button>}
      </div>)}
      {drag && <div aria-hidden="true" className={s.dragGhost} style={{ left: drag.x, top: drag.y }}>Wand streichen<span>{drag.target === null ? "Ziel auswählen" : days[drag.target]}</span></div>}
    </div>
    <p className={s.hint}>Ziehen Sie die Karte oder tippen Sie einen Tag an.</p>
  </div>;
}
