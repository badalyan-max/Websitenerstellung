import type { ReactNode } from "react";
import { BrowserDevice } from "./BrowserFrame";
import { FrameCaption } from "./IllustrationLabel";
import { PhoneDevice, type PhoneTab } from "./PhoneFrame";
import s from "./Frames.module.css";

export interface DevicePairProps {
  /** evidence: Kurzform web:<Bildschirm> bzw. app:<Bildschirm>; voller Beleg nur in lib/scenes.ts. */
  browser: { title: string; evidence: string; children: ReactNode };
  /** evidence: Kurzform web:<Bildschirm> bzw. app:<Bildschirm>; voller Beleg nur in lib/scenes.ts. */
  phone: { title: string; evidence: string; activeTab?: PhoneTab; children: ReactNode };
  /** Ein Screenreadersatz ≤ 140 Zeichen für beide Geräte. */
  description: string;
  tone?: "light" | "dark";
  /**
   * Lage (06-UI-SPEC E1): "default" wie bisher; "compact" mit 160-px-Phone, das unter 768 px rechts
   * unten über dem Browser liegt statt darunter gestapelt (Hero oberhalb der Falz, D-20).
   */
  layout?: "default" | "compact";
}

/**
 * Browser und Phone überlappend (UI-SPEC §6, DevicePair): ab 768 px nebeneinander mit 48 px Überlappung
 * und 24 px Versatz, darunter gestapelt bzw. in der Lage compact überlagert. Statisch – kein Umschalten,
 * Reduced Motion sieht identisch aus. Genau eine Kennzeichnung für beide Geräte; jeder Rahmen trägt
 * seinen eigenen Beleg.
 */
export function DevicePair({ browser, phone, description, tone = "light", layout = "default" }: DevicePairProps) {
  return (
    <figure
      className={`${s.figure} ${s.pairFigure}`}
      data-tone={tone}
      data-figure="pair"
      data-layout={layout}
    >
      <div className={s.pair}>
        <div className={s.pairBrowser} data-evidence={browser.evidence}>
          <BrowserDevice title={browser.title} evidence={browser.evidence} owner="DevicePair">
            {browser.children}
          </BrowserDevice>
        </div>
        <div className={s.pairPhone} data-evidence={phone.evidence}>
          <PhoneDevice
            title={phone.title}
            evidence={phone.evidence}
            activeTab={phone.activeTab}
            width={layout === "compact" ? 160 : undefined}
            owner="DevicePair"
          >
            {phone.children}
          </PhoneDevice>
        </div>
      </div>
      <FrameCaption description={description} className={s.caption} />
    </figure>
  );
}
