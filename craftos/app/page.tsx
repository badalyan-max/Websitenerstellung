import Link from 'next/link'
import {
  FolderKanban,
  Users,
  FileText,
  Clock,
  CalendarRange,
  HardHat,
  Sparkles,
  Smartphone,
  ArrowRight,
  Check,
  ShieldCheck,
  Server,
  Receipt,
} from 'lucide-react'
import { Hero } from '@/components/home/Hero'
import { Faq } from '@/components/ui/Faq'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  Eyebrow,
  SectionHeading,
  HexIcon,
  CtaButton,
  GhostButton,
} from '@/components/ui/primitives'
import { branchen, site, tarife } from '@/lib/site'
import { faqSchema } from '@/lib/schema'

const features = [
  {
    icon: FolderKanban,
    title: 'Projektverwaltung',
    desc: 'Von der Anfrage bis zur Abnahme – Status, Dokumente, Ausgaben und Nachrichten je Projekt an einem Ort.',
  },
  {
    icon: Users,
    title: 'Kunden & Kontakte',
    desc: 'Zentrale Kundendatenbank mit Historie, Projektzuordnung und Schnellanlage direkt aus dem Auftrag.',
  },
  {
    icon: FileText,
    title: '9 Dokumenttypen',
    desc: 'Angebot, Auftragsbestätigung, Rechnung, Abschlag, Schlussrechnung, Lieferschein, Gutschrift, Storno & Brief – als PDF.',
  },
  {
    icon: Clock,
    title: 'Zeiterfassung',
    desc: 'Projektbezogene Zeiten per Timer, manuell oder per Sprache – für Lohn, Abrechnung und Auswertung.',
  },
  {
    icon: CalendarRange,
    title: 'Plantafel',
    desc: 'Visuelle Einsatzplanung per Drag-and-drop. Team und Nachunternehmer zuweisen, Konflikte sofort erkennen.',
  },
  {
    icon: HardHat,
    title: 'Team & Nachunternehmer',
    desc: 'Mitarbeiter mit Rollen und Rechten, Nachunternehmer nach Gewerk – inklusive eigenem Portal.',
  },
]

const workflow = [
  { step: 'Anfrage', desc: 'Kunde & Projekt anlegen – oder per Foto/PDF von Craft AI erfassen lassen.' },
  { step: 'Angebot', desc: 'Leistungen & Artikel aus dem Katalog, KI-Entwurf in Sekunden, als PDF versendet.' },
  { step: 'Auftrag', desc: 'Angebot wird zum Auftrag. Team & Nachunternehmer über die Plantafel einplanen.' },
  { step: 'Rechnung', desc: 'Abschlag, Schluss- oder Komplettrechnung mit MwSt., §13b und GiroCode – DATEV-fertig.' },
]

const faqItems = [
  {
    q: 'Für wen ist CraftOS gemacht?',
    a: 'CraftOS ist die Software für deutsche Handwerksbetriebe – vom Ein-Mann-Betrieb bis zum mittelständischen Betrieb mit Team und Nachunternehmern. Elektro, SHK, Maler, Tischler, Dachdecker, Bau und mehr.',
  },
  {
    q: 'Was kostet CraftOS?',
    a: 'Es gibt drei Lizenzen pro Nutzer: App für 14 €, Büro für 32 € und Admin für 44 € im Monat. Jeder Betrieb braucht mindestens eine Admin-Lizenz. Im Jahresabo sparen Sie rund 17 % und erhalten zusätzlichen Speicher.',
  },
  {
    q: 'Was kann die Craft AI?',
    a: 'Craft AI analysiert Fotos und PDFs, transkribiert Sprache, füllt Felder per Diktat, erstellt Angebotsentwürfe und vermisst Räume per Video. Mit der Admin-Lizenz sind 150 KI-Credits pro Monat inklusive.',
  },
  {
    q: 'Sind meine Daten sicher und DSGVO-konform?',
    a: 'Ja. CraftOS wird auf EU-Servern gehostet, die Datenübertragung ist verschlüsselt und alle Prozesse sind DSGVO-konform. Auf Wunsch stellen wir einen AV-Vertrag (AVV) bereit.',
  },
  {
    q: 'Gibt es eine App fürs Handy?',
    a: 'Ja, CraftOS gibt es als App für iOS und Android. Damit erfassen Monteure Zeiten, Fotos und Dokumente direkt auf der Baustelle – mit Face ID, Kamera und Offline-Fähigkeit.',
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />
      <Hero />

      {/* Branchen / Trust-Leiste */}
      <section className="border-y border-ink-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <p className="spec-label text-center text-ink-400">
            Für jedes Gewerk im deutschen Handwerk
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {branchen.map((b) => (
              <span key={b} className="text-sm font-semibold text-ink-500">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem → Lösung */}
      <section className="bg-blueprint relative">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow>Das Problem</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.12] text-ink-900 sm:text-4xl">
                Excel, E-Mail, Zettel und fünf Programme, die nicht miteinander reden.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-600">
                Angebote im einen Tool, Zeiten im anderen, Rechnungen im dritten – und die
                Baustelle ruft an. Doppelte Eingaben, verlorene Stunden, vergessene
                Nachträge. Das kostet bares Geld.
              </p>
            </div>
            <div className="rounded-2xl border border-primary-100 bg-white p-8 shadow-sm">
              <Eyebrow tone="node">Die Lösung</Eyebrow>
              <h3 className="mt-4 font-display text-2xl font-extrabold text-ink-900">
                Ein System für den ganzen Betrieb.
              </h3>
              <ul className="mt-6 space-y-3.5">
                {[
                  'Ein Datensatz – vom Angebot bis zur Schlussrechnung',
                  'Büro und Baustelle arbeiten in Echtzeit zusammen',
                  'KI übernimmt Aufmaß, Angebot und Doku',
                  'DATEV-Export statt Schuhkarton',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" strokeWidth={2.5} />
                    <span className="text-[15px] font-medium text-ink-700">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature-Highlights */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionHeading
            eyebrow="Module"
            title="Alles, was ein Handwerksbetrieb braucht"
            intro="Sechs Kernbereiche, die nahtlos zusammenspielen – statt Insellösungen, die Sie selbst verbinden müssen."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <article
                key={f.title}
                className="card-hover group rounded-2xl border border-ink-200 bg-white p-7"
              >
                <HexIcon icon={f.icon} />
                <h3 className="mt-5 font-display text-xl font-bold text-ink-900">{f.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-600">{f.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/funktionen"
              className="inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:text-primary-700"
            >
              Alle Funktionen ansehen
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-ink-950 text-white">
        <div className="bg-blueprint-dark mask-fade absolute" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionHeading
            tone="light"
            eyebrow="Der Auftrags-Lebenszyklus"
            title="Von der Anfrage bis zur Rechnung – in einem Fluss"
            intro="Jeder Schritt baut auf dem vorherigen auf. Nichts wird doppelt erfasst."
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-4">
            {workflow.map((w, i) => (
              <li
                key={w.step}
                className="relative rounded-2xl border border-ink-800 bg-ink-900/50 p-6"
              >
                <span className="font-mono text-sm font-semibold text-node-400">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{w.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{w.desc}</p>
                {i < workflow.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-ink-700 md:block" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Craft AI Teaser */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow tone="node">Craft AI</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.12] text-ink-900 sm:text-4xl">
                Die KI, die Ihr Handwerk versteht
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-600">
                Foto von der Baustelle hochladen, sprechen statt tippen, PDF einlesen – und
                Craft AI macht daraus Aufmaß, Doku oder ein fertiges Angebot. Optimiert für
                deutsche Handwerksbegriffe.
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  'Foto-Analyse',
                  'PDF-Analyse',
                  'Sprach-Transkription',
                  'Angebots-Generierung',
                  'Video-Raumvermessung',
                  'Diktat in jedes Feld',
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-[15px] font-medium text-ink-700">
                    <Sparkles className="h-4 w-4 flex-shrink-0 text-node-500" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <GhostButton href="/craft-ai">Wie Craft AI funktioniert</GhostButton>
              </div>
            </div>

            <div className="rounded-3xl border border-node-300/40 bg-gradient-to-br from-node-300/10 via-primary-50 to-white p-8">
              <div className="space-y-3">
                <AiStep label="Eingang" text="Baustellenfoto + Sprachnotiz" tone="node" />
                <AiStep label="Craft AI" text="Flächen erkannt · Leistungen zugeordnet" tone="primary" />
                <AiStep label="Ergebnis" text="Angebotsentwurf bereit zur Freigabe" tone="cta" />
              </div>
              <p className="mt-6 rounded-xl bg-white px-4 py-3 font-mono text-xs text-ink-500 ring-1 ring-ink-100">
                150 Credits/Monat mit Admin-Lizenz inklusive
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Teaser */}
      <section className="border-t border-ink-200 bg-ink-50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="mx-auto flex max-w-xs items-end justify-center gap-4">
                <PhoneMock />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Eyebrow>CraftOS Mobile</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.12] text-ink-900 sm:text-4xl">
                Das Büro in der Hosentasche
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-600">
                Die App für iOS und Android bringt Projekte, Zeiten und Doku direkt auf die
                Baustelle. Anmeldung per Face ID, Fotos per Kamera, auch offline.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {['Face ID / Touch ID', 'Kamera-Integration', 'Push-Benachrichtigungen', 'Offline-fähig'].map(
                  (t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700"
                    >
                      <Smartphone className="h-4 w-4 text-primary-500" />
                      {t}
                    </span>
                  ),
                )}
              </div>
              <div className="mt-9">
                <GhostButton href="/app">Mehr zur App</GhostButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionHeading
            align="center"
            eyebrow="Preise"
            title="Faire Lizenzen pro Nutzer"
            intro="Drei Rollen, ein Preis pro Mitarbeiter. Keine versteckten Kosten, jederzeit kündbar."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {tarife.map((t) => (
              <div
                key={t.id}
                className={
                  t.id === 'buero'
                    ? 'relative rounded-2xl border-2 border-primary-500 bg-white p-8 shadow-lg'
                    : 'relative rounded-2xl border border-ink-200 bg-white p-8'
                }
              >
                {t.badge && (
                  <span
                    className={
                      t.id === 'buero'
                        ? 'absolute -top-3 left-8 rounded-full bg-primary-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white'
                        : 'spec-label absolute -top-3 left-8 rounded-full bg-ink-900 px-3 py-1 text-[10px] text-node-300'
                    }
                  >
                    {t.badge}
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-ink-900">CraftOS {t.name}</h3>
                <p className="mt-1 text-sm text-ink-500">{t.fuer}</p>
                <p className="mt-5 font-display text-4xl font-extrabold text-ink-900">
                  {t.monat} €
                  <span className="text-base font-medium text-ink-500">/Monat</span>
                </p>
                <p className="mt-1 font-mono text-xs text-ink-400">
                  oder {t.jahr} €/Jahr · {t.speicher} Speicher
                </p>
                <a
                  href={site.ctaUrl}
                  className={
                    t.id === 'buero'
                      ? 'btn-cta mt-6 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold'
                      : 'mt-6 inline-flex w-full items-center justify-center rounded-xl border border-ink-300 px-5 py-3 text-sm font-semibold text-ink-800 transition-colors hover:border-ink-400 hover:bg-ink-50'
                  }
                >
                  Testen
                </a>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/preise"
              className="inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:text-primary-700"
            >
              Alle Details &amp; Vergleich
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust-Badges */}
      <section className="border-y border-ink-200 bg-ink-50">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:grid-cols-3 sm:px-8">
          {[
            { icon: ShieldCheck, t: 'DSGVO-konform', d: 'Verschlüsselt & rechtssicher, AVV verfügbar' },
            { icon: Server, t: 'EU-Hosting', d: 'Daten auf Servern in der Europäischen Union' },
            { icon: Receipt, t: 'DATEV-Export', d: 'Saubere Übergabe an die Steuerberatung' },
          ].map((b) => (
            <div key={b.t} className="flex items-start gap-4">
              <HexIcon icon={b.icon} tone="primary" />
              <div>
                <p className="font-display font-bold text-ink-900">{b.t}</p>
                <p className="text-sm text-ink-600">{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionHeading align="center" eyebrow="FAQ" title="Häufige Fragen" />
          <div className="mt-12">
            <Faq items={faqItems} />
          </div>
        </div>
      </section>

      {/* Schluss-CTA */}
      <FinalCta />
    </>
  )
}

function AiStep({
  label,
  text,
  tone,
}: {
  label: string
  text: string
  tone: 'node' | 'primary' | 'cta'
}) {
  const dot = { node: 'bg-node-400', primary: 'bg-primary-500', cta: 'bg-cta' }[tone]
  return (
    <div className="flex items-center gap-4 rounded-xl border border-ink-200 bg-white px-5 py-4">
      <span className={`h-2.5 w-2.5 flex-shrink-0 rotate-45 ${dot}`} />
      <div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">{label}</p>
        <p className="text-sm font-semibold text-ink-800">{text}</p>
      </div>
    </div>
  )
}

function PhoneMock() {
  return (
    <div className="relative w-full max-w-[240px] rounded-[2.2rem] border-[6px] border-ink-900 bg-ink-900 shadow-2xl">
      <div className="overflow-hidden rounded-[1.7rem] bg-ink-950">
        <div className="bg-blueprint-dark p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-ink-500">09:41</span>
            <span className="h-1.5 w-10 rounded-full bg-ink-700" />
          </div>
          <p className="spec-label mt-6 text-node-400">// Heute</p>
          <div className="mt-3 space-y-2.5">
            {[
              ['Zeiterfassung', '6,5 h'],
              ['Bad Müller', 'läuft'],
              ['Foto-Doku', '3 neu'],
            ].map(([a, b]) => (
              <div
                key={a}
                className="flex items-center justify-between rounded-lg border border-ink-800 bg-ink-900/70 px-3.5 py-3"
              >
                <span className="text-xs font-medium text-ink-100">{a}</span>
                <span className="font-mono text-[10px] text-node-400">{b}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-cta px-3.5 py-3 text-center text-xs font-bold text-white">
            + Zeit starten
          </div>
        </div>
      </div>
    </div>
  )
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-primary-600">
      <div className="bg-blueprint-dark absolute inset-0 opacity-30" aria-hidden="true" />
      <div
        className="absolute -right-20 -top-20 h-96 w-96 rounded-full opacity-40 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
        <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
          Bringen Sie Ihren Betrieb auf ein System.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-primary-100">
          Starten Sie kostenlos – ohne Einrichtungsgebühr, ohne Risiko. Oder sehen Sie sich
          zuerst die Live-Demo mit Beispieldaten an.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <CtaButton href={site.ctaUrl}>Kostenlos testen</CtaButton>
          <a
            href={site.demoUrl}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            Live-Demo ansehen
          </a>
        </div>
      </div>
    </section>
  )
}
