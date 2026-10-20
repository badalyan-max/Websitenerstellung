import type { ReactNode } from "react";
import { BatteryFull, CalendarDays, Clock3, FolderOpen, MoreHorizontal, Signal, Wifi } from "lucide-react";
import { assertTextBudget } from "./budgets";
import { FrameCaption } from "./IllustrationLabel";
import { MINI_BUDGET } from "./mini/limits";
import s from "./Frames.module.css";

/**
 * Tab-Leiste exakt wie im Mobile-Release für Mitarbeitende (Reihenfolge assignments, time, projects, more;
 * Beleg mobile:src/shared/lib/navigation.ts und de/common.json nav.time = „Zeiten“).
 */
export const PHONE_TABS = [
  { label: "Einsätze", icon: CalendarDays },
  { label: "Zeiten", icon: Clock3 },
  { label: "Projekte", icon: FolderOpen },
  { label: "Mehr", icon: MoreHorizontal },
] as const;

export type PhoneTab = (typeof PHONE_TABS)[number]["label"];

export interface PhoneFrameProps {
  title: string;
  /** Mini-UI */
  children: ReactNode;
  /** Pflicht: Belegpfad am Release, z. B. "mobile:src/features/time-tracking/screens/TimeTrackingScreen.tsx". */
  evidence: string;
  /** Screenreadersatz ≤ 140 Zeichen: was zeigt die Ansicht? */
  description: string;
  activeTab?: PhoneTab;
  /** Breite über --phone-w; das Seitenverhältnis 194/410 bleibt. */
  width?: 160 | 194 | 240;
}

export interface PhoneDeviceProps {
  title: string;
  children: ReactNode;
  evidence: string;
  activeTab?: PhoneTab;
  width?: 160 | 194 | 240;
  /** Baustein für den Fehlertext */
  owner?: string;
}

/** Gerät ohne figure/figcaption – für PhoneFrame und DevicePair; aria-hidden und inert. */
export function PhoneDevice({
  title,
  children,
  evidence,
  activeTab = "Einsätze",
  width = 194,
  owner = "PhoneFrame",
}: PhoneDeviceProps) {
  if (!evidence.trim()) {
    throw new Error(`${owner}: evidence fehlt – Belegpfad aus origin/release angeben.`);
  }
  assertTextBudget("mini.row", title, MINI_BUDGET.row);
  return (
    <div className={s.phone} data-frame="phone" data-width={width} aria-hidden="true" inert>
      <div className={s.screen}>
        <div className={s.status}>
          <span>09:41</span>
          <i className={s.notch} />
          <span className={s.statusIcons}>
            <Signal size={10} />
            <Wifi size={10} />
            <BatteryFull size={13} />
          </span>
        </div>
        <div className={s.mobileTitle}>
          <strong>{title}</strong>
        </div>
        <div className={s.mobileContent}>{children}</div>
        <div className={s.tabs}>
          {PHONE_TABS.map(({ label, icon: Icon }) => (
            <span key={label} data-tab={label} data-active={label === activeTab ? "true" : "false"}>
              <Icon size={15} strokeWidth={1.75} />
              <small>{label}</small>
            </span>
          ))}
        </div>
        <div className={s.homeIndicator} />
      </div>
    </div>
  );
}

/** Statischer Phone-Rahmen v2 (UI-SPEC §6): Proportion 194:410, echte Tabs, Beleg und Kennzeichnung. */
export function PhoneFrame({ title, children, evidence, description, activeTab, width }: PhoneFrameProps) {
  return (
    <figure className={s.figure} data-evidence={evidence} data-figure="phone">
      <PhoneDevice title={title} evidence={evidence} activeTab={activeTab} width={width}>
        {children}
      </PhoneDevice>
      <FrameCaption description={description} className={s.caption} />
    </figure>
  );
}
