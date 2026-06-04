import Link from 'next/link'
import { CraftOSLogo } from '@/components/CraftOSLogo'
import { site } from '@/lib/site'

const cols = [
  {
    title: 'Produkt',
    links: [
      { label: 'Funktionen', href: '/funktionen' },
      { label: 'Craft AI', href: '/craft-ai' },
      { label: 'Mobile-App', href: '/app' },
      { label: 'Preise', href: '/preise' },
    ],
  },
  {
    title: 'Loslegen',
    links: [
      { label: 'Kostenlos testen', href: site.ctaUrl, external: true },
      { label: 'Demo ansehen', href: site.demoUrl, external: true },
      { label: 'Anmelden', href: site.appUrl, external: true },
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
      { label: 'AGB', href: '/agb' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-ink-800 bg-ink-950 text-ink-300">
      <div className="bg-blueprint-dark absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <CraftOSLogo size="md" tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-ink-400">
              {site.tagline}. Projekte, Kunden, Dokumente, Zeiterfassung und KI –
              entwickelt für das deutsche Handwerk, gehostet auf EU-Servern.
            </p>
            <p className="spec-label mt-6 text-node-400">100 % DSGVO-konform · EU-Hosting</p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-ink-500">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        className="text-sm text-ink-300 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-ink-300 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ink-800 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} CraftOS · Alle Rechte vorbehalten
          </p>
          <p className="font-mono text-xs text-ink-600">app.craftos.eu · v1.0</p>
        </div>
      </div>
    </footer>
  )
}
