"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { CraftOSLogo } from "@/components/CraftOSLogo";
import { site } from "@/lib/site";
import { StoreLinks } from "@/components/ui/StoreLinks";
import styles from "./Header.module.css";
const groups = [
  {
    label: "Produkt",
    href: "/funktionen",
    links: [
      ["Alle Funktionen", "/funktionen"],
      ["Web-App & Dashboard", "/funktionen/dashboard"],
      ["Mobile-App", "/app"],
      ["Craft AI", "/craft-ai"],
      ["GoBD & Nachvollziehbarkeit", "/gobd"],
      ["Warum CraftOS?", "/vergleich"],
    ],
  },
  { label: "Gewerke", href: "/gewerke" },
  { label: "Preise", href: "/preise" },
  {
    label: "Wissen",
    href: "/blog",
    links: [
      ["Ratgeber", "/blog"],
      ["Kostenlose Rechner", "/rechner"],
      ["Stundensatz berechnen", "/rechner/stundensatz"],
      ["Angebot kalkulieren", "/rechner/angebotskalkulation"],
    ],
  },
  {
    label: "Hilfe",
    href: "/hilfe",
    links: [
      ["Hilfezentrum", "/hilfe"],
      ["Kontakt & Support", "/support"],
    ],
  },
];
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" aria-label="CraftOS Startseite" className={styles.logo}>
          <CraftOSLogo />
        </Link>
        <button
          className={styles.toggle}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="hauptnavigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="hauptnavigation"
          aria-label="Hauptnavigation"
          className={`${styles.nav} ${open ? styles.open : ""}`}
        >
          {groups.map((g) => (
            <div className={styles.group} key={g.label}>
              <Link href={g.href} onClick={() => setOpen(false)}>
                {g.label}
                {g.links && <ChevronDown size={13} />}
              </Link>
              {g.links && (
                <div className={styles.dropdown}>
                  {g.links.map(([label, href]) => (
                    <Link key={href} href={href} onClick={() => setOpen(false)}>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <StoreLinks compact />
          <a href={site.appUrl} className={styles.login}>
            Anmelden
          </a>
          <a href={site.ctaUrl} className="btn-cta">
            10 Tage testen <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}
