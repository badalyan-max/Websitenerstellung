"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Panel-Link der Hauptnavigation mit `aria-current="page"` (Phase 6, 06-UI-SPEC „Aktuelle Seite“).
 * Kleines Client-Blatt ohne Datenmodule; `prefetch={false}` verhindert einen Prefetch-Burst beim
 * Öffnen des Mega-Menüs (Research Pitfall 11). Links mit Fragment sind nie „aktuell“.
 */
export function ActiveLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const pathname = usePathname();
  const pfad = pathname && pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const current = !href.includes("#") && pfad === href;
  return (
    <Link href={href} prefetch={false} className={className} aria-current={current ? "page" : undefined}>
      {children}
    </Link>
  );
}
