import type { ReactNode } from "react";
import { BrowserDevice } from "./BrowserFrame";
import { FrameCaption } from "./IllustrationLabel";
import { PhoneDevice, type PhoneTab } from "./PhoneFrame";
import s from "./Frames.module.css";

export interface DevicePairProps {
  browser: { title: string; evidence: string; children: ReactNode };
  phone: { title: string; evidence: string; activeTab?: PhoneTab; children: ReactNode };
  /** Ein Screenreadersatz ≤ 140 Zeichen für beide Geräte. */
  description: string;
  tone?: "light" | "dark";
}

/**
 * Browser und Phone überlappend (UI-SPEC §6, DevicePair): ab 768 px nebeneinander mit 48 px Überlappung
 * und 24 px Versatz, darunter gestapelt. Statisch – kein Umschalten, Reduced Motion sieht identisch aus.
 * Genau eine Kennzeichnung für beide Geräte; jeder Rahmen trägt seinen eigenen Beleg.
 */
export function DevicePair({ browser, phone, description, tone = "light" }: DevicePairProps) {
  return (
    <figure className={`${s.figure} ${s.pairFigure}`} data-tone={tone} data-figure="pair">
      <div className={s.pair}>
        <div className={s.pairBrowser} data-evidence={browser.evidence}>
          <BrowserDevice title={browser.title} evidence={browser.evidence} owner="DevicePair">
            {browser.children}
          </BrowserDevice>
        </div>
        <div className={s.pairPhone} data-evidence={phone.evidence}>
          <PhoneDevice title={phone.title} evidence={phone.evidence} activeTab={phone.activeTab} owner="DevicePair">
            {phone.children}
          </PhoneDevice>
        </div>
      </div>
      <FrameCaption description={description} className={s.caption} />
    </figure>
  );
}
