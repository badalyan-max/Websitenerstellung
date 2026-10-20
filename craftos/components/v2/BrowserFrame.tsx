import type { ReactNode } from "react";
import { CraftOSMark } from "@/components/CraftOSLogo";
import { assertTextBudget } from "./budgets";
import { FrameCaption } from "./IllustrationLabel";
import { MINI_BUDGET } from "./mini/limits";
import s from "./Frames.module.css";

export interface BrowserFrameProps {
  /** Seitentitel der Web-App wie in der AppSidebar, z. B. „Plantafel“. */
  title: string;
  /** Mini-UI */
  children: ReactNode;
  /** Pflicht: Belegpfad am Release, z. B. "web:src/pages/Plantafel.tsx". */
  evidence: string;
  /** Screenreadersatz ≤ 140 Zeichen: was zeigt die Ansicht? */
  description: string;
  /** Bühnenumgebung: dunkel = stärkerer Schatten mit Amber-Saum. */
  tone?: "light" | "dark";
}

export interface BrowserDeviceProps {
  title: string;
  children: ReactNode;
  evidence: string;
  /** Baustein für den Fehlertext */
  owner?: string;
}

/**
 * Gerät ohne figure/figcaption – für BrowserFrame und DevicePair. Die gesamte Oberfläche ist
 * Illustration: aria-hidden und inert, damit nichts fokussierbar oder vorgelesen wird.
 */
export function BrowserDevice({ title, children, evidence, owner = "BrowserFrame" }: BrowserDeviceProps) {
  if (!evidence.trim()) {
    throw new Error(`${owner}: evidence fehlt – Belegpfad aus origin/release angeben.`);
  }
  assertTextBudget("mini.row", title, MINI_BUDGET.row);
  return (
    <div className={s.browser} data-frame="browser" aria-hidden="true" inert>
      <div className={s.windowBar}>
        <span className={s.dots}>
          <i />
          <i />
          <i />
        </span>
        <span>CraftOS Web-App</span>
      </div>
      <div className={s.webTitle}>
        <CraftOSMark size={20} />
        <strong>{title}</strong>
      </div>
      <div className={s.webContent}>{children}</div>
    </div>
  );
}

/** Statischer Browser-Rahmen v2 (UI-SPEC §6): 16:10, CraftOSMark in der Titelzeile, Beleg und Kennzeichnung. */
export function BrowserFrame({ title, children, evidence, description, tone = "light" }: BrowserFrameProps) {
  return (
    <figure className={s.figure} data-evidence={evidence} data-tone={tone} data-figure="browser">
      <BrowserDevice title={title} evidence={evidence}>
        {children}
      </BrowserDevice>
      <FrameCaption description={description} className={s.caption} />
    </figure>
  );
}
