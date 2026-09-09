import Link from "next/link";
import { CraftOSLogo } from "@/components/CraftOSLogo";
import { site } from "@/lib/site";
const columns = [
  [
    "Produkt",
    [
      ["Funktionen", "/funktionen"],
      ["Mobile-App", "/app"],
      ["Craft AI", "/craft-ai"],
      ["Preise", "/preise"],
      ["Warum CraftOS?", "/vergleich"],
    ],
  ],
  [
    "Für Ihren Betrieb",
    [
      ["Gewerke", "/gewerke"],
      ["GoBD & Nachvollziehbarkeit", "/gobd"],
      ["Fakten zu CraftOS", "/fakten-ueber-craftos"],
    ],
  ],
  [
    "Wissen & Hilfe",
    [
      ["Ratgeber", "/blog"],
      ["Hilfezentrum", "/hilfe"],
      ["Kostenlose Rechner", "/rechner"],
      ["Kontakt", "/support"],
    ],
  ],
] as const;
export function Footer() {
  return (
    <footer className="dark-section pt-16 pb-8">
      <div className="site-container">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              aria-label="CraftOS Startseite"
              className="block w-40"
            >
              <CraftOSLogo />
            </Link>
            <p className="mt-5 max-w-xs text-sm">
              Ihr Betrieb. Ein System.
              <br />
              Im Büro und auf der Baustelle.
            </p>
            <a
              className="mt-4 inline-block text-sm text-white"
              href={"mailto:" + site.email}
            >
              {site.email}
            </a>
          </div>
          {columns.map(([title, links]) => (
            <div key={title}>
              <h2 className="text-base font-semibold mb-5">{title}</h2>
              <ul className="space-y-3">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      className="text-sm text-zinc-400 hover:text-amber-300"
                      href={href}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-3 text-xs text-zinc-400">
          <span>© {new Date().getFullYear()} CraftOS</span>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">AGB</Link>
          <a href="/feed.xml">RSS-Feed</a>
          <span className="md:ml-auto">Mit Sorgfalt fürs Handwerk.</span>
        </div>
      </div>
    </footer>
  );
}
