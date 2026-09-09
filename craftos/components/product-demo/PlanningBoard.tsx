"use client";

import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { ArrowRight, Check, Copy, GripVertical, Move } from "lucide-react";
import {
  DEMO_DAYS,
  DEMO_MEMBERS,
  formatNumber,
  type DemoDay,
  type DemoMember,
} from "../../lib/demo/data";
import { type DemoAction, type DemoState } from "../../lib/demo/machine";
import s from "./PlanningBoard.module.css";

type Target = { day: DemoDay; member: DemoMember };
type Drag = { x: number; y: number; target: Target | null; move: boolean };
const person = (id: DemoMember) => DEMO_MEMBERS.find((m) => m.id === id)!;
const dayName = (id: DemoDay) => DEMO_DAYS.find((d) => d.id === id)!.label;

/** A deliberately bounded walkthrough of the real board's move/copy rules. */
export function PlanningBoard({
  state,
  send,
  compact = false,
}: {
  state: DemoState;
  send: (action: DemoAction) => void;
  compact?: boolean;
}) {
  const plan = state.planning;
  const assignment = plan.assignment;
  const root = useRef<HTMLDivElement>(null);
  const gesture = useRef<{
    x: number;
    y: number;
    id: number;
    active: boolean;
  } | null>(null);
  const dropClick = useRef<{ x: number; y: number; at: number } | null>(null);
  const [drag, setDrag] = useState<Drag | null>(null);
  const forceMove = plan.forceMove;
  const [picked, setPicked] = useState(false);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && gesture.current) {
        e.preventDefault();
        gesture.current = null;
        setDrag(null);
        setPicked(false);
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  const instructionId = useId();
  const targetMemberId = useId();
  const enabled = !!assignment && plan.timer === "idle";
  const occupied = (t: Target) =>
    (assignment?.day === t.day && assignment.member === t.member) ||
    plan.copies.some((a) => a.day === t.day && a.member === t.member);
  const copyTo = (t: Target, move: boolean) =>
    !!assignment && t.member !== assignment.member && !move;
  const actionLabel = (t: Target, move: boolean) =>
    copyTo(t, move) ? "Zusätzlich einplanen" : "Verschieben";
  const targetAt = (x: number, y: number): Target | null => {
    const node = document
      .elementFromPoint(x, y)
      ?.closest<HTMLElement>("[data-planning-target]");
    if (!node || !root.current?.contains(node)) return null;
    const t = {
      day: node.dataset.day as DemoDay,
      member: node.dataset.member as DemoMember,
    };
    return occupied(t) ? null : t;
  };
  const place = (target: Target, move = forceMove) => {
    if (!enabled || occupied(target)) return;
    send({ type: "move-assignment", ...target, copy: copyTo(target, move) });
    setPicked(false);
  };
  const start = (e: PointerEvent<HTMLButtonElement>) => {
    if (!enabled || e.button !== 0 || !e.isPrimary) return;
    e.currentTarget.focus({ preventScroll: true });
    gesture.current = {
      x: e.clientX,
      y: e.clientY,
      id: e.pointerId,
      active: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    send({ type: "pause" });
  };
  const moving = (e: PointerEvent<HTMLButtonElement>) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    if (!g.active && Math.hypot(e.clientX - g.x, e.clientY - g.y) < 6) return;
    g.active = true;
    const rect = root.current!.getBoundingClientRect();
    setDrag({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      target: targetAt(e.clientX, e.clientY),
      move: forceMove || e.altKey || e.ctrlKey || e.metaKey,
    });
  };
  const cancel = () => {
    gesture.current = null;
    setDrag(null);
  };
  const end = (e: PointerEvent<HTMLButtonElement>) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    if (g.active) {
      // PointerUp can move the source button before the browser sends Click.
      // Consume that one compatibility click so it cannot activate a new target.
      dropClick.current = { x: e.clientX, y: e.clientY, at: performance.now() };
      const target = targetAt(e.clientX, e.clientY);
      if (target)
        place(target, forceMove || e.altKey || e.ctrlKey || e.metaKey);
    } else setPicked(true);
    cancel();
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
  };
  const card = assignment && (
    <button
      key="assignment"
      type="button"
      className={s.assignment}
      disabled={!enabled}
      data-planning-assignment
      aria-describedby={instructionId}
      aria-label={`Beispieleinsatz Bäckerei Krause, ${person(assignment.member).name}, ${dayName(assignment.day)}, ${formatNumber(assignment.hours)} Stunden`}
      onPointerDown={start}
      onPointerMove={moving}
      onPointerUp={end}
      onPointerCancel={cancel}
      onLostPointerCapture={cancel}
      onClick={(e) => {
        if (e.detail === 0) setPicked(true);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          cancel();
          setPicked(false);
        }
      }}
    >
      <span className={s.cardTitle}>
        <GripVertical size={15} aria-hidden="true" /> Bäckerei Krause
      </span>
      <strong>{formatNumber(assignment.hours)} Std.</strong>
      <small>Wandanstrich</small>
    </button>
  );
  const target = (t: Target, label: string) => (
    <button
      key={`target-${t.day}-${t.member}`}
      type="button"
      className={s.target}
      data-planning-target
      data-day={t.day}
      data-member={t.member}
      data-over={drag?.target?.day === t.day && drag.target.member === t.member}
      disabled={!enabled || occupied(t)}
      onClick={() => place(t)}
      aria-label={`${actionLabel(t, forceMove)}: ${person(t.member).name}, ${dayName(t.day)}`}
    >
      <span>{label}</span>
      <ArrowRight size={14} aria-hidden="true" />
    </button>
  );
  const assignments = [...(assignment ? [assignment] : []), ...plan.copies];
  const change = plan.lastChange;
  return (
    <div
      ref={root}
      className={`${s.board} ${compact ? s.compact : ""}`}
      data-planning-board
      onClickCapture={(e) => {
        const click = dropClick.current;
        if (
          click &&
          e.detail > 0 &&
          performance.now() - click.at < 350 &&
          Math.abs(e.clientX - click.x) < 2 &&
          Math.abs(e.clientY - click.y) < 2
        ) {
          e.preventDefault();
          e.stopPropagation();
          dropClick.current = null;
        }
      }}
    >
      <div className={s.heading}>
        <strong>Arbeitswoche im Beispiel</strong>
        <span>
          {formatNumber(assignments.reduce((sum, a) => sum + a.hours, 0))} Std.
          eingeplant
        </span>
      </div>
      <p id={instructionId} className={s.instructions}>
        {enabled
          ? "Ziehen oder Ziel auswählen. Die geplante Dauer bleibt erhalten."
          : assignment
            ? "Die Zeiterfassung hat begonnen. Wiederholen Sie das Beispiel, um neu zu planen."
            : "Legen Sie zuerst den Beispieleinsatz an. Danach können Sie ihn hier verschieben."}
      </p>
      {compact ? (
        <>
          {assignment && (
            <p className={s.current}>
              {person(assignment.member).name} am {dayName(assignment.day)}
            </p>
          )}
          {card}
          <label className={s.memberPicker} htmlFor={targetMemberId}>
            Zielperson
            <select
              id={targetMemberId}
              value={plan.member}
              disabled={!enabled}
              onChange={(e) =>
                send({
                  type: "planning-field",
                  field: "member",
                  value: e.target.value,
                })
              }
            >
              {DEMO_MEMBERS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </label>
          <div className={s.dayTargets}>
            {DEMO_DAYS.map((d) => (
              <div key={d.id}>
                {target({ day: d.id, member: plan.member }, d.short)}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={s.week}>
          <div className={s.weekHeader}>
            <span>Team</span>
            {DEMO_DAYS.map((d) => (
              <span key={d.id}>
                {d.short}
                <small>{d.date}</small>
              </span>
            ))}
          </div>
          {DEMO_MEMBERS.map((m) => {
            const hours = assignments
              .filter((a) => a.member === m.id)
              .reduce((sum, a) => sum + a.hours, 0);
            return (
              <div className={s.row} key={m.id}>
                <div className={s.person}>
                  <strong>{m.name.split(" ")[0]}</strong>
                  <small>{formatNumber(hours)} / 40 Std.</small>
                  <span
                    className={s.capacity}
                    aria-label={`${formatNumber(hours)} von 40 Beispielstunden verplant`}
                  >
                    <span
                      style={{ width: `${Math.min(100, (hours / 40) * 100)}%` }}
                    />
                  </span>
                </div>
                {DEMO_DAYS.map((d) => {
                  const extra = plan.copies.find(
                    (a) => a.day === d.id && a.member === m.id,
                  );
                  return (
                    <div className={s.cell} key={d.id}>
                      {assignment?.member === m.id &&
                      assignment.day === d.id ? (
                        card
                      ) : extra ? (
                        <div className={s.copy}>
                          <Copy size={13} />
                          <strong>Bäckerei Krause</strong>
                          <span>{formatNumber(extra.hours)} Std.</span>
                          <small>Zusätzlich eingeplant</small>
                        </div>
                      ) : (
                        target({ day: d.id, member: m.id }, "Hierhin")
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
      {enabled && (
        <label className={s.mode}>
          <input
            type="checkbox"
            checked={forceMove}
            onChange={(e) =>
              send({ type: "planning-mode", forceMove: e.target.checked })
            }
          />
          Bei anderer Person umplanen statt kopieren
        </label>
      )}
      <p className={s.rule}>
        <Move size={14} />
        Gleiche Person: verschieben.
        <br />
        <Copy size={14} />
        Andere Person: zusätzlich einplanen.
      </p>
      <div
        className={s.feedback}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {drag ? (
          <>
            <Move size={18} />
            <span>
              {drag.target
                ? `${actionLabel(drag.target, drag.move)}: ${person(drag.target.member).name}, ${dayName(drag.target.day)}`
                : "Über ein freies Ziel ziehen. Außerhalb loslassen oder Escape bricht ab."}
            </span>
          </>
        ) : picked ? (
          <>
            <ArrowRight size={18} />
            <span>
              Wählen Sie jetzt den gewünschten Tag und die Person als Ziel.
            </span>
          </>
        ) : change ? (
          <>
            <Check size={18} />
            <span>
              <strong>
                {change.kind === "copied"
                  ? "Zusätzlich eingeplant"
                  : change.kind === "created"
                    ? "Einsatz angelegt"
                    : change.kind === "updated"
                      ? "Einsatz aktualisiert"
                      : "Einsatz verschoben"}
              </strong>
              {change.from && (
                <span>
                  {person(change.from.member).name} / {dayName(change.from.day)}{" "}
                  <ArrowRight size={12} />{" "}
                </span>
              )}
              {person(change.to.member).name} / {dayName(change.to.day)}.{" "}
              {formatNumber(change.to.hours)} Std.
              {change.kind === "copied" &&
                " Der ursprüngliche Einsatz bleibt bestehen."}
            </span>
          </>
        ) : (
          <span>Die Wochenstunden ändern sich mit Ihrer Planung.</span>
        )}
      </div>
      {drag && (
        <div
          className={s.dragPreview}
          aria-hidden="true"
          style={{ left: drag.x + 14, top: drag.y - 30 }}
        >
          <GripVertical size={16} />
          <span>
            Bäckerei Krause
            <strong>{formatNumber(assignment?.hours ?? 0)} Std.</strong>
          </span>
        </div>
      )}
      <p className={s.scope}>
        Ein Projekt, fünf Arbeitstage, 40 Beispielstunden je Person; Kopien sind
        hier nur zur Veranschaulichung. In CraftOS gibt es auch mehrtägige
        Einsätze, Ressourcen und eine Konfliktprüfung.
      </p>
    </div>
  );
}
