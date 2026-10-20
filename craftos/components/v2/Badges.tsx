import type { ReactNode } from "react";
import { KeyRound, Monitor, Smartphone } from "lucide-react";
import type { ProductPlatform } from "@/lib/funktionen";
import s from "./Badges.module.css";

export type PlatformBadgeProps = { platform: ProductPlatform };
export type LicenseBadgeProps = { license: "voll" | "app" };

const PLATFORM = {
  web: { label: "Web-App", icon: Monitor },
  mobile: { label: "Mobile-App", icon: Smartphone },
} as const;

const LICENSE = {
  voll: "Voll-Lizenz",
  app: "App-Lizenz",
} as const;

/**
 * Plattform-Badge (UI-SPEC §8). Werte kommen ausschließlich aus funktionen[].platforms.
 * Dunkle Flächen setzen data-tone="dark" an einem Vorfahren oder an der BadgeGroup.
 */
export function PlatformBadge({ platform }: PlatformBadgeProps) {
  const { label, icon: Icon } = PLATFORM[platform];
  return (
    <span className={s.badge} data-kind="platform">
      <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
      {label}
    </span>
  );
}

/** Lizenz-Badge (UI-SPEC §8). „Rollen“ werden nur als Lizenzen ausgedrückt. */
export function LicenseBadge({ license }: LicenseBadgeProps) {
  return (
    <span className={s.badge} data-kind="license">
      <KeyRound size={16} strokeWidth={1.75} aria-hidden="true" />
      {LICENSE[license]}
    </span>
  );
}

export interface BadgeGroupProps {
  /** „Plattformen“ bzw. „Enthalten in“ */
  label: string;
  /** PlatformBadge- bzw. LicenseBadge-Elemente */
  items: ReactNode[];
  tone?: "light" | "dark";
}

/** Gruppe als Liste mit aria-label, Abstand 8 px. */
export function BadgeGroup({ label, items, tone = "light" }: BadgeGroupProps) {
  return (
    <ul className={s.group} aria-label={label} data-tone={tone}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

/** Plattform-Gruppe direkt aus funktionen[].platforms. */
export function PlatformBadges({ platforms, tone }: { platforms: readonly ProductPlatform[]; tone?: "light" | "dark" }) {
  return (
    <BadgeGroup
      label="Plattformen"
      tone={tone}
      items={platforms.map((platform) => (
        <PlatformBadge key={platform} platform={platform} />
      ))}
    />
  );
}
