import type { Metadata } from 'next'
import {
  Camera,
  FileSearch,
  Mic,
  Keyboard,
  FileSignature,
  Video,
  Coins,
  ArrowRight,
} from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { HexIcon, CtaButton, SectionHeading } from '@/components/ui/primitives'
import { Faq } from '@/components/ui/Faq'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Craft AI – KI für das Handwerk: Foto, PDF, Sprache & Angebote',
  description:
    'Craft AI analysiert Fotos und PDFs, transkribiert Sprache, erstellt Angebotsentwürfe und vermisst Räume per Video. Optimiert für deutsche Handwerksbegriffe – 150 Credits/Monat inklusive.',
  alternates: { canonical: `${site.url}/craft-ai` },
}

const abilities = [
  {
    icon: FileSearch,
    title: 'PDF-Analyse',
    credits: '1 Credit',
    desc: 'Leistungsverzeichnisse, Verträge und Baupläne einlesen und die wichtigen Daten automatisch extrahieren.',
  },
  {
    icon: Camera,
    title: 'Foto-Analyse',
    credits: '2 Credits',
    desc: 'Baustellenfotos analysieren – Flächen, Öffnungen und Objekte erkennen für Doku und Aufmaß.',
  },
  {
    icon: Mic,
    title: 'Sprach-Transkription',
    credits: '1 Credit/Min.',
    desc: 'Sprachnotizen werden zu Text – mit Whisper, optimiert für deutsche Handwerksbegriffe.',
  },
  {
    icon: Keyboard,
    title: 'Spracheingabe',
    credits: '1 Credit',
    desc: 'In jedes Feld diktieren statt tippen. Ideal mit Handschuhen oder unterwegs.',
  },
  {
    icon: FileSignature,
    title: 'KI-Angebotserstellung',
    credits: '6 Credits',
    desc: 'Aus Projektbeschreibung und Aufnahmen entsteht ein fertiger Angebotsentwurf zur Freigabe.',
  },
  {
    icon: Video,
    title: 'Video-Raumanalyse',
    credits: '10 Credits',
    desc: 'Raum per Video aufnehmen – Craft AI unterstützt bei Vermessung und Dokumentation.',
  },
]

const faqItems = [
  {
    q: 'Wie funktioniert das Credit-System?',
    a: 'Jede KI-Funktion kostet eine bestimmte Anzahl Credits (1 Credit = 1 Cent). Mit der Admin-Lizenz sind 150 Credits pro Monat gratis enthalten. Zusätzliche Credits gibt es als Paket (10, 25, 50 oder 100 €) mit Bonus.',
  },
  {
    q: 'Ist Craft AI auf Deutsch optimiert?',
    a: 'Ja. Die Spracherkennung und Analyse sind auf deutsche Handwerksbegriffe und Gewerke abgestimmt – von Leistungsverzeichnis bis Aufmaß.',
  },
  {
    q: 'Kann ich das Budget pro Mitarbeiter begrenzen?',
    a: 'Ja. Pro Teammitglied lässt sich ein KI-Budget festlegen (z. B. 5–50 € oder unbegrenzt), damit die Kosten planbar bleiben.',
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
        title="KI, die Ihr Handwerk versteht"
        intro="Foto, PDF oder Sprache rein – Aufmaß, Doku oder fertiges Angebot raus. Craft AI nimmt Ihnen die Schreibtischarbeit ab, damit Sie arbeiten können."
      />

      {/* Beispiel-Flow */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
          <div className="rounded-3xl border border-node-300/40 bg-gradient-to-br from-node-300/10 via-primary-50 to-white p-8 sm:p-10">
            <p className="spec-label text-node-500">// So läuft es ab</p>
            <div className="mt-6 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
              <FlowCard label="01 · Eingang" text="Baustellenfoto + Sprachnotiz hochladen" />
              <ArrowRight className="mx-auto hidden h-6 w-6 text-primary-400 sm:block" />
              <FlowCard label="02 · Craft AI" text="Flächen erkannt, Leistungen zugeordnet" highlight />
              <ArrowRight className="mx-auto hidden h-6 w-6 text-primary-400 sm:block" />
              <FlowCard label="03 · Ergebnis" text="Angebotsentwurf bereit zur Freigabe" />
            </div>
          </div>
        </div>
      </section>

      {/* Fähigkeiten */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:pb-24">
          <SectionHeading
            align="center"
            eyebrow="6 KI-Funktionen"
            title="Was Craft AI für Sie erledigt"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {abilities.map((a) => (
              <article key={a.title} className="card-hover rounded-2xl border border-ink-200 bg-white p-7">
                <div className="flex items-center justify-between">
                  <HexIcon icon={a.icon} tone="node" />
                  <span className="rounded-full bg-node-300/15 px-3 py-1 font-mono text-[11px] font-semibold text-node-600">
                    {a.credits}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{a.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{a.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="border-y border-ink-200 bg-ink-50">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <HexIcon icon={Coins} tone="cta" className="h-14 w-14" />
            <div className="flex-1">
              <h2 className="font-display text-2xl font-extrabold text-ink-900">
                150 KI-Credits pro Monat inklusive
              </h2>
              <p className="mt-2 text-ink-600">
                Mit der Admin-Lizenz starten Sie jeden Monat mit 150 Gratis-Credits (1 Credit =
                1 Cent). Mehr Bedarf? Credit-Pakete mit Bonus gibt es ab 10 €. Budgets pro
                Mitarbeiter halten die Kosten im Griff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
          <SectionHeading align="center" eyebrow="FAQ" title="Fragen zu Craft AI" />
          <div className="mt-12">
            <Faq items={faqItems} />
          </div>
          <div className="mt-12 text-center">
            <CtaButton />
          </div>
        </div>
      </section>
    </>
  )
}

function FlowCard({
  label,
  text,
  highlight,
}: {
  label: string
  text: string
  highlight?: boolean
}) {
  return (
    <div
      className={
        highlight
          ? 'rounded-xl border-2 border-primary-300 bg-white px-5 py-4 shadow-sm'
          : 'rounded-xl border border-ink-200 bg-white px-5 py-4'
      }
    >
      <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">{label}</p>
      <p className="mt-1.5 text-sm font-semibold text-ink-800">{text}</p>
    </div>
  )
}
