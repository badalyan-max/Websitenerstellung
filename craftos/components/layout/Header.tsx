"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { CraftOSLogo } from "@/components/CraftOSLogo";
import { site } from "@/lib/site";
import { gewerke } from "@/lib/gewerke";
import { StoreLinks } from "@/components/ui/StoreLinks";
import styles from "./Header.module.css";

type NavigationGroup = { id: string; label: string; href: string; links?: readonly (readonly [string, string])[] };
const groups: NavigationGroup[] = [
  { id: "produkt", label: "Produkt", href: "/funktionen", links: [
    ["Alle Funktionen", "/funktionen"], ["Web-App & Dashboard", "/funktionen/dashboard"],
    ["Mobile-App", "/app"], ["Craft AI", "/craft-ai"], ["GoBD & Nachvollziehbarkeit", "/gobd"], ["Warum CraftOS?", "/vergleich"],
  ] },
  { id: "gewerke", label: "Gewerke", href: "/gewerke", links: [
    ["Alle Gewerke", "/gewerke"], ...gewerke.map((gewerk) => [gewerk.name, `/gewerke/${gewerk.slug}`] as const),
  ] },
  { id: "preise", label: "Preise", href: "/preise" },
  { id: "wissen", label: "Wissen", href: "/blog", links: [
    ["Ratgeber", "/blog"], ["Kostenlose Rechner", "/rechner"],
    ["Stundensatz berechnen", "/rechner/stundensatz"], ["Angebot kalkulieren", "/rechner/angebotskalkulation"],
  ] },
  { id: "hilfe", label: "Hilfe", href: "/hilfe", links: [["Hilfezentrum", "/hilfe"], ["Kontakt & Support", "/support"]] },
];
const mobileQuery = "(max-width: 1120px)";

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const groupButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const openSource = useRef<"hover" | "press" | null>(null);

  function closeNavigation() {
    setOpen(false);
    setActiveGroup(null);
    openSource.current = null;
  }

  function keepGroupVisible(id: string) {
    if (!window.matchMedia(mobileQuery).matches) return;
    requestAnimationFrame(() => {
      const nav = navRef.current;
      const button = groupButtons.current[id];
      if (!nav || !button || !nav.clientHeight) return;
      const menuBox = nav.getBoundingClientRect();
      const buttonBox = button.getBoundingClientRect();
      const panel = document.getElementById(`navigation-${id}`);
      const firstLink = panel?.hidden ? null : panel?.querySelector("a");
      const bottom = firstLink?.getBoundingClientRect().bottom ?? buttonBox.bottom;
      // An accordion can shrink above the current scroll position; keep its new
      // heading and first link visible without scrolling the page behind it.
      if (buttonBox.top < menuBox.top + 8 || bottom > menuBox.bottom - 8) {
        nav.scrollTo({ top: nav.scrollTop + buttonBox.top - menuBox.top - 8, behavior: "instant" });
      }
    });
  }

  // A breakpoint change must not leave an invisible menu or scroll lock behind.
  useEffect(() => {
    const media = window.matchMedia(mobileQuery);
    function resetNavigation() {
      setOpen(false);
      setActiveGroup(null);
      openSource.current = null;
    }
    media.addEventListener("change", resetNavigation);
    return () => media.removeEventListener("change", resetNavigation);
  }, []);

  useEffect(() => {
    if (!open || !window.matchMedia(mobileQuery).matches) return;
    const root = document.documentElement;
    const previousRootOverflow = root.style.overflow;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousRootOverflow;
      if (window.scrollX !== scrollX || window.scrollY !== scrollY) {
        window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open && !activeGroup) return;
    function close() {
      setOpen(false);
      setActiveGroup(null);
      openSource.current = null;
    }
    function onOutside(event: Event) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) close();
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      close();
      const button = open ? toggleRef.current : activeGroup ? groupButtons.current[activeGroup] : null;
      button?.focus({ preventScroll: true });
    }
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open, activeGroup]);

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.inner}>
        <Link href="/" aria-label="CraftOS Startseite" className={styles.logo} onClick={closeNavigation}><CraftOSLogo /></Link>
        <button ref={toggleRef} type="button" className={styles.toggle}
          aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open} aria-controls="hauptnavigation"
          onClick={() => {
            if (open) closeNavigation();
            else {
              setOpen(true);
              setActiveGroup(null);
              if (navRef.current) navRef.current.scrollTop = 0;
            }
          }}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav ref={navRef} id="hauptnavigation" aria-label="Hauptnavigation" className={`${styles.nav} ${open ? styles.open : ""}`}>
          {groups.map((group) => (
            <div className={styles.group} key={group.id}
              onPointerEnter={(event) => {
                if (event.pointerType !== "mouse" || window.matchMedia(mobileQuery).matches || !group.links) return;
                openSource.current = "hover";
                setActiveGroup(group.id);
              }}
              onPointerLeave={(event) => {
                if (window.matchMedia(mobileQuery).matches || openSource.current !== "hover") return;
                if (!event.currentTarget.contains(document.activeElement)) setActiveGroup((current) => current === group.id ? null : current);
              }}
              onBlur={(event) => {
                if (!window.matchMedia(mobileQuery).matches && !event.currentTarget.contains(event.relatedTarget)) {
                  setActiveGroup((current) => current === group.id ? null : current);
                }
              }}>
              {group.links ? <>
                <button ref={(button) => { groupButtons.current[group.id] = button; }} className={styles.groupButton}
                  type="button" aria-expanded={activeGroup === group.id} aria-controls={`navigation-${group.id}`}
                  onClick={() => {
                    const wasHover = openSource.current === "hover";
                    openSource.current = "press";
                    setActiveGroup((current) => current === group.id && !wasHover ? null : group.id);
                    keepGroupVisible(group.id);
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown") return;
                    event.preventDefault();
                    openSource.current = "press";
                    setActiveGroup(group.id);
                    requestAnimationFrame(() => document.getElementById(`navigation-${group.id}`)?.querySelector("a")?.focus());
                  }}>
                  {group.label}<ChevronDown size={15} aria-hidden="true" />
                </button>
                <div id={`navigation-${group.id}`} hidden={activeGroup !== group.id} className={`${styles.dropdown} ${group.id === "gewerke" ? styles.trades : ""}`}>
                  {group.links.map(([label, href]) => <Link key={href} href={href} tabIndex={0} onClick={closeNavigation}>{label}</Link>)}
                </div>
              </> : <Link href={group.href} tabIndex={0} onClick={closeNavigation}>{group.label}</Link>}
            </div>
          ))}
          <div className={styles.actions}>
            <StoreLinks compact />
            <a href={site.appUrl} className={styles.login} onClick={closeNavigation}>Anmelden</a>
            <a href={site.ctaUrl} className="btn-cta" onClick={closeNavigation}>10 Tage testen <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </nav>
      </div>
    </header>
  );
}
