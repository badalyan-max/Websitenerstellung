import { LayoutGrid, LifeBuoy, Tag } from 'lucide-react'
import { ContentKopf } from '@/components/content/ContentKopf'
import { Abschnitt } from '@/components/v2/Abschnitt'
import { LinkKarten } from '@/components/v2/LinkKarten'
import { SectionHeader } from '@/components/v2/SectionHeader'
import type { Crumb } from '@/lib/breadcrumbs'
import { site } from '@/lib/site'
import s from './Legal.module.css'

/**
 * Rahmen der Rechtsseiten auf v2 (Phase 10, D-09, D-17; 10-UI-SPEC § 3.1): heller `ContentKopf` mit Brotkrumen aus
 * crumbsFor (einzige BreadcrumbList), danach der Rechtstext auf Weiß in `data-rechtstext` (Schutztest
 * tests/rechtstexte-wortlaut.test.ts). Am Wortlaut ändert sich nichts; die Darstellung kommt aus Legal.module.css.
 * QA-06 (O2, O3): Unter dem Rechtstext und außerhalb von `data-rechtstext` folgt der Abschnitt „Mehr über CraftOS“
 * (Warm, LinkKarten Weiß) mit /funktionen, /preise und /support – Schutztest tests/rechtsseiten-links.test.ts.
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
      <LegalWeiter />
    </>
  )
}

/** Weiterführende Links unter dem Rechtstext (QA-06): Funktionen, Preise und Support; nur unterstützte Angebote. */
function LegalWeiter() {
  return (
    <Abschnitt id="weiter" surface="warm">
      <SectionHeader
        id="weiter"
        title="Mehr über CraftOS"
        lead="Funktionen, Preise und Support der Handwerkersoftware im Überblick."
      />
      <LinkKarten
        label="Weiterführende Seiten"
        surface="white"
        columns={3}
        items={[
          {
            href: '/funktionen',
            title: 'Funktionen',
            text: 'Angebote, Rechnungen, Plantafel, Zeiterfassung, Aufmaß, Lager und Baudokumentation.',
            icon: <LayoutGrid size={24} strokeWidth={1.75} />,
            iconFeld: true,
          },
          {
            href: '/preise',
            title: 'Preise und Lizenzen',
            text: `Voll-Lizenz mit Web-App und Mobile-App, App-Lizenz für Mitarbeitende auf der Baustelle und Jahresabo mit Rabatt. ${site.trialDays} Tage kostenlos testen.`,
            icon: <Tag size={24} strokeWidth={1.75} />,
            iconFeld: true,
          },
          {
            href: '/support',
            title: 'Kontakt und Support',
            text: 'Kontakt zum Support per E-Mail und Anleitungen im Hilfezentrum.',
            icon: <LifeBuoy size={24} strokeWidth={1.75} />,
            iconFeld: true,
          },
        ]}
      />
    </Abschnitt>
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
