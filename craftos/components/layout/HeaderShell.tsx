"use client";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { CraftOSLogo } from "@/components/CraftOSLogo";
import { site } from "@/lib/site";
import { StoreLinks } from "@/components/ui/StoreLinks";
import styles from "./Header.module.css";

/**
 * Einzige zustandsbehaftete Client-Insel der Hauptnavigation (Phase 6, D-06, D-13, D-17); daneben ist nur
 * `ActiveLink` als zustandsloses Client-Blatt für `aria-current` in den Panels eingebunden.
 *
 * Muster: WAI-APG „Disclosure Navigation Menu with Top-Level Links“ – je Hauptpunkt ein echter Link und,
 * falls es ein Panel gibt, ein separater Schalter „Untermenü {Hauptpunkt}“. Die Panels werden auf dem Server
 * gerendert und als Slot übergeben; hier liegen nur Zustand, Esc, Außenklick, Fokus außerhalb, Scroll-Lock,
 * Breakpoint-Reset und Schließen bei Linkklick oder Routenwechsel (Logik aus dem Bestand übernommen).
 */
export interface HeaderNavItem {
  id: string;
  label: string;
  href: string;
  matchPrefixes: string[];
  panel?: ReactNode;
  wide?: boolean;
}

const mobileQuery = "(max-width: 1120px)";
const isMobile = () => window.matchMedia(mobileQuery).matches;
/** Elemente mit eigenem Esc-Verhalten, in die der globale Esc-Handler nicht eingreift. */
const EIGENES_ESC = "input, textarea, select, dialog, [role='dialog'], [role='alertdialog'], [aria-modal='true']";
const ohneSchraegstrich =(path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

export function HeaderShell({ items }: { items: HeaderNavItem[] }) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [lastPath, setLastPath] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const groupButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const openSource = useRef<"hover" | "press" | null>(null);

  // Routenwechsel (auch Zurück-Taste) schließt Drawer und Panels; der Scroll-Lock löst sich mit.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setExpanded([]);
  }

  function closeNavigation() {
    setOpen(false);
    setExpanded([]);
    openSource.current = null;
  }

  function keepGroupVisible(id: string) {
    if (!isMobile()) return;
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
      setExpanded([]);
      openSource.current = null;
    }
    media.addEventListener("change", resetNavigation);
    return () => media.removeEventListener("change", resetNavigation);
  }, []);

  useEffect(() => {
    if (!open || !isMobile()) return;
    const root = document.documentElement;
    const previousRootOverflow = root.style.overflow;
    const previousRootGutter = root.style.scrollbarGutter;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    // Nur während des Scroll-Locks und nur, wenn eine klassische Scrollleiste gerade Platz belegt: Ihr Platz
    // bleibt reserviert, damit die Seite beim Sperren nicht seitlich springt (D-14, 07-08; vorher global in
    // globals.css, dort reservierte es auf kurzen Seiten eine leere Rinne).
    if (window.innerWidth - root.clientWidth > 0) root.style.scrollbarGutter = "stable";
    root.style.overflow = "hidden";
    // Der Drawer überdeckt die ganze Seite: Inhalt und Fußleiste für Screenreader und Tastatur sperren,
    // damit der virtuelle Cursor keinen verdeckten Inhalt vorliest (06-REVIEW IN-03).
    const header = headerRef.current;
    const gesperrt = [...(header?.parentElement?.children ?? [])].filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== header && (el.tagName === "MAIN" || el.tagName === "FOOTER") && !el.inert,
    );
    for (const el of gesperrt) el.inert = true;
    return () => {
      for (const el of gesperrt) el.inert = false;
      root.style.overflow = previousRootOverflow;
      root.style.scrollbarGutter = previousRootGutter;
      if (window.scrollX !== scrollX || window.scrollY !== scrollY) {
        window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      }
    };
  }, [open]);

  const anyExpanded = expanded.length > 0;
  const firstExpanded = expanded[0] ?? null;
  // Layout-Effekt: Die Listener hängen im selben Commit, in dem das Panel sichtbar wird. Ein passiver Effekt
  // liefe nach einer Hover-Öffnung erst in einer späteren Aufgabe, und ein schnelles Esc ginge verloren.
  useLayoutEffect(() => {
    if (!open && !anyExpanded) return;
    function close() {
      setOpen(false);
      setExpanded([]);
      openSource.current = null;
    }
    function onOutside(event: Event) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) close();
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      const active = document.activeElement;
      const focusInHeader = active !== null && (headerRef.current?.contains(active) ?? false);
      // Kein fokussiertes Element (WebKit fokussiert Schalter bei Klick/Tap nicht): Die letzte Interaktion lag
      // dann im Header, sonst hätte pointerdown außerhalb bereits geschlossen.
      const focusNowhere = active === null || active === document.body;
      const hoverOpen = !open && openSource.current === "hover";
      // WAI-APG: Nur reagieren, wenn der Fokus zur Navigation gehört oder das Panel per Hover offen ist –
      // nie Fokus oder natives Esc (Eingabe leeren, Dialog-cancel) außerhalb des Headers übernehmen.
      if (!focusInHeader && !focusNowhere && !hoverOpen) return;
      if (!focusInHeader && active instanceof HTMLElement && (active.isContentEditable || active.closest(EIGENES_ESC))) return;
      event.preventDefault();
      close();
      // Fokus nur zurückgeben, wenn er im Header lag (bzw. nirgends nach Klick/Tap im Header).
      if (!focusInHeader && !(focusNowhere && !hoverOpen)) return;
      const button = open ? toggleRef.current : firstExpanded ? groupButtons.current[firstExpanded] : null;
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
  }, [open, anyExpanded, firstExpanded]);

  function toggleGroup(id: string) {
    if (isMobile()) {
      // Im Drawer dürfen mehrere Gruppen gleichzeitig offen sein (06-UI-SPEC „Akkordeon“).
      openSource.current = "press";
      setExpanded((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));
      keepGroupVisible(id);
      return;
    }
    // Desktop: höchstens ein Panel; ein Klick nach Hover-Öffnen hält das Panel offen.
    const wasHover = openSource.current === "hover";
    openSource.current = "press";
    setExpanded((current) => (current.includes(id) && !wasHover ? [] : [id]));
  }

  const current = ohneSchraegstrich(pathname);

  return (
    <header className={styles.header} ref={headerRef} data-site-header>
      <div className={styles.inner} data-header-inner>
        <Link href="/" aria-label="CraftOS Startseite" className={styles.logo} onClick={closeNavigation}>
          <CraftOSLogo />
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          data-nav-toggle
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="hauptnavigation"
          onClick={() => {
            if (open) closeNavigation();
            else {
              // D-17: Bei jedem Öffnen ist „Funktionen“ bereits aufgeklappt.
              setOpen(true);
              setExpanded(["funktionen"]);
              openSource.current = "press";
              if (navRef.current) navRef.current.scrollTop = 0;
            }
          }}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
        <nav
          ref={navRef}
          id="hauptnavigation"
          aria-label="Hauptnavigation"
          className={`${styles.nav} ${open ? styles.open : ""}`}
          onClick={(event) => {
            // Strg/Cmd/Shift/Alt-Klick öffnet in neuem Tab bzw. Fenster: Menü bleibt für weitere Links offen.
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
            if ((event.target as Element).closest("a")) closeNavigation();
          }}
        >
          <ul className={styles.list}>
            {items.map((item) => {
              const isOpen = expanded.includes(item.id);
              const inBereich = item.matchPrefixes.some((p) => current === p || current.startsWith(`${p}/`));
              return (
                <li
                  key={item.id}
                  className={styles.item}
                  data-wide={item.wide ? "true" : undefined}
                  data-open={isOpen ? "true" : undefined}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "mouse" || isMobile() || !item.panel) return;
                    openSource.current = "hover";
                    setExpanded([item.id]);
                  }}
                  onPointerLeave={(event) => {
                    if (isMobile() || openSource.current !== "hover") return;
                    if (!event.currentTarget.contains(document.activeElement)) {
                      setExpanded((cur) => (cur.includes(item.id) ? [] : cur));
                    }
                  }}
                  onBlur={(event) => {
                    // Ohne Ziel (Klick auf nicht fokussierbare Fläche, WebKit beim Linkklick) nicht schließen:
                    // Außenklicks schließen über pointerdown, sonst verschwände das Panel vor dem Klick.
                    // Verlässt der Fokus dagegen das Dokument (Adressleiste, Tab-Wechsel), schließen, damit das
                    // Panel bei der Rückkehr nicht den Inhalt überdeckt.
                    if (isMobile()) return;
                    const next = event.relatedTarget;
                    const closeItem = () => setExpanded((cur) => (cur.includes(item.id) ? [] : cur));
                    if (next) {
                      if (!event.currentTarget.contains(next)) closeItem();
                      return;
                    }
                    window.setTimeout(() => {
                      if (!document.hasFocus()) closeItem();
                    }, 0);
                  }}
                >
                  <div className={styles.row}>
                    <Link
                      href={item.href}
                      tabIndex={0}
                      className={styles.topLink}
                      data-active={inBereich ? "true" : undefined}
                      aria-current={current === item.href ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                    {item.panel ? (
                      <button
                        ref={(button) => {
                          groupButtons.current[item.id] = button;
                        }}
                        type="button"
                        className={styles.disclosure}
                        data-nav-disclosure
                        aria-label={`Untermenü ${item.label}`}
                        aria-expanded={isOpen}
                        aria-controls={`navigation-${item.id}`}
                        onClick={() => toggleGroup(item.id)}
                        onKeyDown={(event) => {
                          if (event.key !== "ArrowDown") return;
                          event.preventDefault();
                          openSource.current = "press";
                          setExpanded((cur) => (isMobile() ? (cur.includes(item.id) ? cur : [...cur, item.id]) : [item.id]));
                          requestAnimationFrame(() =>
                            document.getElementById(`navigation-${item.id}`)?.querySelector("a")?.focus(),
                          );
                        }}
                      >
                        <ChevronDown size={16} aria-hidden="true" />
                      </button>
                    ) : null}
                  </div>
                  {item.panel ? (
                    <div
                      id={`navigation-${item.id}`}
                      hidden={!isOpen}
                      className={`${styles.panel} ${item.wide ? styles.wide : ""}`}
                      data-panel={item.id}
                    >
                      {item.panel}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <div className={styles.actions}>
            <StoreLinks compact />
            <a href={site.appUrl} className={styles.login} data-track="login">
              Anmelden
            </a>
            <a href={site.ctaUrl} className={`v2-btn-cta ${styles.cta}`} data-track="trial">
              {`${site.trialDays} Tage testen`} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
