import { getFunktionsgruppen, menuFooterLinks } from "@/lib/funktionsgruppen";
import { getHauptnavigation } from "@/lib/navigation";
import { HeaderShell, type HeaderNavItem } from "./HeaderShell";
import { LinkPanel, MegaMenu } from "./MegaMenu";

/**
 * Ohne JavaScript (D-13, 06-UI-SPEC „Ohne JavaScript“): Menü- und Untermenü-Schalter ausblenden, mobil die
 * Hauptpunkte und Aktionen statisch unter dem Header zeigen. Statische Konstante ohne Daten (T-06-08);
 * Panels bleiben über das hidden-Attribut verborgen.
 */
const NOSCRIPT_CSS =
  "<style>[data-nav-toggle],[data-nav-disclosure]{display:none!important}" +
  "@media (max-width:1120px){[data-site-header]{position:static}[data-header-inner]{flex-wrap:wrap}" +
  "#hauptnavigation{display:block;position:static;flex-basis:100%;max-height:none;overflow:visible}}</style>";

/**
 * Hauptnavigation als Server Component: Das Mega-Menü „Funktionen“ (aus lib/funktionsgruppen.ts) und die
 * Link-Panels werden hier gerendert und als Slot an die Client-Hülle übergeben. So stehen alle Menülinks im
 * Server-HTML, und keine Datenmodule gelangen ins Client-Bundle.
 */
export function Header() {
  const items: HeaderNavItem[] = getHauptnavigation().map((item) => ({
    id: item.id,
    label: item.label,
    href: item.href,
    matchPrefixes: item.matchPrefixes,
    // Nur das Mega-Menü ist breit und am Header zentriert; Gewerke, Wissen und Hilfe hängen an ihrem Hauptpunkt.
    wide: item.panel?.kind === "funktionen",
    panel:
      item.panel === null ? undefined : item.panel.kind === "funktionen" ? (
        <MegaMenu groups={getFunktionsgruppen()} footerLinks={menuFooterLinks} />
      ) : (
        <LinkPanel links={item.panel.links} columns={item.panel.columns} />
      ),
  }));
  return (
    <>
      <HeaderShell items={items} />
      <noscript dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />
    </>
  );
}
