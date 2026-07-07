import type { Metadata } from 'next'
import {
  ScanLine,
  Camera,
  Video,
  Mic,
  FileSearch,
  TrendingUp,
  MessageSquareText,
  BrainCircuit,
  PhoneCall,
  Plug,
  ShieldCheck,
  Coins,
} from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Faq } from '@/components/ui/Faq'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  CtaButton,
  GhostButton,
  HexIcon,
  SectionHeading,
  TierBadge,
} from '@/components/ui/primitives'
import { KiChatDemo } from '@/components/demos/KiChatDemo'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { site, creditPakete } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Craft AI – KI für Handwerksbetriebe',
  description:
    'Belegscan, Foto-/Video-Analyse, Sprachdiktat, KI-Chat-Agent und Vorhersagen: Craft AI arbeitet mit Ihren echten Betriebsdaten – DSGVO-konform, Pay-as-you-go.',
  alternates: { canonical: `${site.url}/craft-ai` },
}

// Live-KI (im Code verifiziert)
const heute = [
  {
    icon: MessageSquareText,
    title: 'KI-Chat-Agent',
    desc: 'Fragen zu Projekten, Rechnungen und Zeiten stellen – der Agent liest Ihre Betriebsdaten und antwortet belegt. Rollen- und rechtssicher.',
  },
  {
    icon: ScanLine,
    title: 'Belegscan (OCR)',
    desc: 'Eingangsrechnung fotografieren – Lieferant, Beträge und Positionen werden automatisch erkannt und verbucht.',
  },
  {
    icon: Camera,
    title: 'Foto-Analyse',
    desc: 'Baustellenfoto hochladen – Craft AI erkennt Materialien, Mengen und Maße für Ihre Kalkulation.',
  },
  {
    icon: Video,
    title: 'Video- & Raumanalyse',
    desc: 'Besichtigungsvideo aufnehmen – die KI wertet Räume strukturiert aus und liefert die Basis fürs Angebot.',
  },
  {
    icon: FileSearch,
    title: 'PDF- & LV-Analyse',
    desc: 'Leistungsverzeichnisse und Baudokumente automatisch auslesen statt abtippen.',
  },
  {
    icon: Mic,
    title: 'Sprachdiktat (Deutsch)',
    desc: 'Zeiten, Notizen und Berichte diktieren – präzise deutsche Transkription, ideal mit Handschuhen.',
  },
  {
    icon: TrendingUp,
    title: 'Vorhersagen',
    desc: 'Cashflow, Fertigstellungstermin, Preis-Plausibilität und Saisonspitzen – deterministisch berechnet.',
  },
]

const launch = [
  {
    icon: BrainCircuit,
    title: 'KI-Firmengedächtnis',
    desc: '„Was war das Problem in der Xstraße?" – semantische Suche über alle Projekte, Dokumente und sogar Besichtigungsvideos, mit Quellenangabe.',
  },
  {
    icon: MessageSquareText,
    title: 'Schreibende Agent-Aktionen',
    desc: 'Der Agent bereitet Aktionen als Entwurf vor: Zeiten buchen, Angebote anlegen, Einsätze planen – Sie bestätigen mit einem Klick.',
  },
]

const visionItems = [
  {
    icon: PhoneCall,
    title: 'Telefon-Agent',
    desc: 'Eine KI nimmt Anrufe an, erfasst das Anliegen, erkennt Bestandskunden und legt Aufgaben an – Ihr Front-Office schläft nie.',
  },
  {
    icon: Plug,
    title: 'Offener MCP-Server',
    desc: 'Ihre eigene KI (ChatGPT, Claude & Co.) sicher an CraftOS andocken – mit denselben Rechten und Grenzen wie der eingebaute Agent.',
  },
]

const faqItems = [
  {
    q: 'Was kostet Craft AI?',
    a: 'Craft AI rechnet Pay-as-you-go ab: 1 Credit = 1 Cent, 150 Credits Startguthaben inklusive. Credit-Pakete gibt es von 10 € bis 100 € mit bis zu 20 % Bonus – kein KI-Abo nötig.',
  },
  {
    q: 'Halluziniert die KI meine Zahlen?',
    a: 'Nein. Preise, Löhne und Steuern berechnet immer die deterministische Kalkulations-Engine – die KI liefert Vorschläge und liest Daten, rechnet aber nie final.',
  },
  {
    q: 'Kann die KI Dinge ohne mein Wissen ändern?',
    a: 'Nein. Craft AI arbeitet nach dem Draft-First-Prinzip: Die KI bereitet vor, der Mensch bestätigt. Jeder Agent-Zugriff wird protokolliert und respektiert Ihre Rollen und Rechte.',
  },
  {
    q: 'Sind meine Daten sicher?',
    a: 'Ja. Der Agent sieht nur, was die jeweilige Rolle sehen darf (RLS-gesichert), alle Zugriffe werden auditiert, und die Verarbeitung ist DSGVO-konform.',
  },
]

export default function CraftAiPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Craft AI', path: '/craft-ai' },
        ])}
      />
      <JsonLd data={faqSchema(faqItems)} />

      <PageHero
        eyebrow="Craft AI"
        title={
          <>
            KI, die anpackt.
            <br />
            <span className="text-primary-400">Nicht nur plaudert.</span>
          </>
        }
        intro="Craft AI arbeitet mit Ihren echten Betriebsdaten: Belege auslesen, Baustellen analysieren, Fragen beantworten. Der Mensch behält das letzte Wort – die KI rechnet nie final."
      />

      {/* Demo + Draft-First-Prinzip */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Der Assistent"
                title="Fragen Sie Ihren Betrieb"
                intro="Der KI-Chat-Agent kennt Projekte, Kunden, Zeiten und Dokumente – und antwortet in Sekunden, mit Beleg. Probieren Sie es aus:"
              />
              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: ShieldCheck,
                    t: 'Draft-First',
                    d: 'Die KI bereitet vor, Sie bestätigen. Nichts passiert ohne Ihr OK.',
                  },
                  {
                    icon: ShieldCheck,
                    t: 'Rollen- & rechtssicher',
                    d: 'Der Agent sieht nur, was die Rolle sehen darf – jeder Zugriff wird protokolliert.',
                  },
                  {
                    icon: ShieldCheck,
                    t: 'KI rechnet nie final',
                    d: 'Löhne, Material und Steuern bleiben in der deterministischen Engine – kein Halluzinationsrisiko in den Zahlen.',
                  },
                ].map((p) => (
                  <div key={p.t} className="flex items-start gap-3">
                    <p.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                    <div>
                      <p className="font-display text-base font-semibold text-ink-800">{p.t}</p>
                      <p className="text-sm leading-relaxed text-ink-500">{p.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <KiChatDemo />
          </div>
        </div>
      </section>

      <div className="anriss anriss-amber mx-auto max-w-7xl" aria-hidden="true" />

      {/* Live-Fähigkeiten */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <SectionHeading eyebrow="Fähigkeiten" title="Was Craft AI heute schon kann" />
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {heute.map((f) => (
              <div key={f.title} className="rounded-2xl border border-ink-200 bg-ink-100 p-6">
                <div className="flex items-start justify-between gap-3">
                  <HexIcon icon={f.icon} />
                  <TierBadge tier="heute" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Launch & Vision */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {launch.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-primary-500/25 bg-primary-500/[0.04] p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <HexIcon icon={f.icon} />
                  <TierBadge tier="launch" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.desc}</p>
              </div>
            ))}
            {visionItems.map((f) => (
              <div key={f.title} className="rounded-2xl border border-ink-200 bg-ink-100 p-6">
                <div className="flex items-start justify-between gap-3">
                  <HexIcon icon={f.icon} tone="muted" />
                  <TierBadge tier="vision" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="relative overflow-hidden bg-ink-950 py-16 lg:py-20">
        <div className="bg-werkbank absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Abrechnung"
            title="Pay-as-you-go statt KI-Abo"
            intro="1 Credit = 1 Cent. 150 Credits Startguthaben sind inklusive – danach zahlen Sie nur, was Sie wirklich nutzen."
            align="center"
          />
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {creditPakete.map((p) => (
              <div
                key={p.preis}
                className="rounded-2xl border border-ink-200 bg-ink-100 p-5 text-center"
              >
                <p className="font-display text-2xl font-bold tabular-nums text-ink-900">
                  {p.preis} €
                </p>
                <p className="mt-1 font-mono text-xs text-ink-400">
                  {p.bonus > 0 ? (
                    <>
                      <span className="text-success">+{p.bonus} % Bonus</span> → {p.guthaben.toLocaleString('de-DE')} €
                    </>
                  ) : (
                    'Einstieg'
                  )}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-center font-mono text-xs text-ink-400">
            <Coins className="h-3.5 w-3.5 text-primary-500" />
            Budget pro Mitarbeiter festlegbar · volle Kostenkontrolle
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeading eyebrow="FAQ" title="Fragen zu Craft AI" align="center" className="mb-10" />
          <Faq items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink-950 py-16 lg:py-20">
        <div className="bg-werkbank mask-fade absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            KI, die für Ihr Handwerk arbeitet
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-500">
            14 Tage kostenlos testen – inklusive KI-Startguthaben.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton>Jetzt kostenlos testen</CtaButton>
            <GhostButton href="/preise">Preise ansehen</GhostButton>
          </div>
        </div>
      </section>
    </>
  )
}
