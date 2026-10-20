import type { ReactNode } from "react";
import { ArrowRight, BatteryFull, CalendarDays, ChevronLeft, Clock3, FolderOpen, MoreHorizontal, Signal, Wifi } from "lucide-react";
import s from "./DeviceFrame.module.css";

export function PhoneFrame({ title, children, active = "Projekte", notification }: { title: string; children: ReactNode; active?: string; notification?: ReactNode }) {
  return <div className={s.phone} data-illustration-platform="mobile" data-illustration-device="phone">
    <div className={s.screen} data-phone-screen>
      <div className={s.status}><span>09:41</span><i /><span><Signal size={10} /><Wifi size={10} /><BatteryFull size={13} /></span></div>
      <div className={s.mobileTitle}><ChevronLeft size={16} /><strong>{title}</strong><MoreHorizontal size={16} /></div>
      <div className={s.mobileContent}>{children}</div>
      <div className={s.tabs}>{[[CalendarDays, "Einsätze"], [Clock3, "Zeiten"], [FolderOpen, "Projekte"], [MoreHorizontal, "Mehr"]].map(([Icon, label]) => {
        const I = Icon as typeof Clock3;
        return <span key={label as string} data-active={label === active}><I size={15} /><small>{label as string}</small></span>;
      })}</div>
      <div className={s.homeIndicator} />
      {notification}
    </div>
  </div>;
}

export function WebFrame({ title, children }: { title: string; children: ReactNode }) {
  return <div className={s.web} data-illustration-platform="web">
    <div className={s.windowBar}><span><i /><i /><i /></span><span>CraftOS</span><span>Web</span></div>
    <div className={s.webTitle}><span className={s.brand}>C</span><strong>{title}</strong><span className={s.avatar}>LM</span></div>
    <div className={s.webContent}>{children}</div>
  </div>;
}

export function DeviceBridge({ web, phone, mobileFirst = false, stage, phase, focusPlatform, captions }: { web: ReactNode; phone: ReactNode; mobileFirst?: boolean; stage: number; phase: number; focusPlatform?: "web" | "mobile"; captions: readonly [string, string, string, string] }) {
  const focus = focusPlatform ?? (mobileFirst ? (phase >= 5 ? "web" : "mobile") : (phase >= 5 ? "mobile" : "web"));
  return <div className={s.bridge} data-device-bridge data-focus={focus} data-direction={mobileFirst ? "mobile-to-web" : "web-to-mobile"}>
    <div className={s.devices}>
      <div className={s.webSlot}>{web}</div>
      <div className={s.phoneSlot}>{phone}</div>
    </div>
    <div className={s.flow}><span>{mobileFirst ? "Mobile-App" : "Web-App"}</span><ArrowRight size={16} /><span>{mobileFirst ? "Web-App" : "Mobile-App"}</span><span className={s.flowLine} /></div>
    <p className={s.caption} data-scene-caption>{captions[stage]}</p>
  </div>;
}
