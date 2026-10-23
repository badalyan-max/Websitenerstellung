import { ContentKopf } from '@/components/content/ContentKopf'
import type { Crumb } from '@/lib/breadcrumbs'
import s from './Legal.module.css'

/**
 * Rahmen der Rechtsseiten auf v2 (Phase 10, D-09, D-17; 10-UI-SPEC § 3.1): heller `ContentKopf` mit Brotkrumen aus
 * crumbsFor (einzige BreadcrumbList), danach der Rechtstext auf Weiß in `data-rechtstext` (Schutztest
 * tests/rechtstexte-wortlaut.test.ts). Am Wortlaut ändert sich nichts; die Darstellung kommt aus Legal.module.css.
 */
export function LegalShell({
  title,
  updated,
  eyebrow = 'Rechtliches',
  crumbs,
  children,
}: {
  title: string
  updated?: string
  eyebrow?: string
  /** Kette aus crumbsFor(pfad) – einzige BreadcrumbList der Seite. */
  crumbs: Crumb[]
  children: React.ReactNode
}) {
  return (
    <>
      <ContentKopf
        crumbs={crumbs}
        eyebrow={eyebrow}
        h1={title}
        id="rechtstext-titel"
        stand={updated ? `Stand: ${updated}` : undefined}
      />
      <section data-abschnitt="rechtstext" className={s.flaeche}>
        <div className="site-container">
          <div data-rechtstext="" className={s.prosa}>
            {children}
          </div>
        </div>
      </section>
    </>
  )
}

export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className={s.abschnitt}>
      <h2 className={s.titel}>{heading}</h2>
      <div className={s.inhalt}>{children}</div>
    </section>
  )
}

/** Hervorgehobener Datenblock (Anbieter, Kontakt): erste Zeile 600, weitere 400, warme Fläche. */
export function DataBlock({ lines }: { lines: string[] }) {
  return (
    <div className={s.daten}>
      {lines.map((l, i) => (
        <p key={i} className={i === 0 ? s.datenErste : undefined}>
          {l}
        </p>
      ))}
    </div>
  )
}

/** Hinweisabsatz der Rechtsseiten (14/400/1.4 #62626E, 6,01 : 1 auf Weiß; 10-UI-SPEC § 3.1/§ 3.2). */
export function LegalHinweis({ children }: { children: React.ReactNode }) {
  return <p className={s.hinweis}>{children}</p>
}
