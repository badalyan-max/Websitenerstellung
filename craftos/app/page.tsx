import Link from 'next/link'
import { ArrowRight, Sparkles, Smartphone, Check } from 'lucide-react'
import { Hero } from '@/components/home/Hero'
import { Faq } from '@/components/ui/Faq'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  Eyebrow,
  SectionHeading,
  HexIcon,
  CtaButton,
  GhostButton,
  TierBadge,
} from '@/components/ui/primitives'
import { AngebotDemo } from '@/components/demos/AngebotDemo'
import { KiChatDemo } from '@/components/demos/KiChatDemo'
import { site, tarife, zahlung } from '@/lib/site'
import { gewerke } from '@/lib/gewerke'
import { funktionen, vision } from '@/lib/funktionen'
import { faqSchema } from '@/lib/schema'

const faqItems = [
  {
    q: 'Was ist CraftOS?',
    a: 'CraftOS ist eine All-in-One Handwerkersoftware: Angebote, Rechnungen, E-Rechnung, Plantafel, Zeiterfassung, Lager, Baudokumentation und KI – als Web-App und Mobile-App für iOS & Android.',
  },
  {
    q: 'Für welche Gewerke eignet sich CraftOS?',
    a: 'CraftOS ist für alle Bau- und Ausbaugewerke gemacht – von Elektro über SHK, Maler und Tischler bis zum Bauunternehmen. Für Elektro, SHK, Maler, Schreiner und Allrounder gibt es fertige Leistungsvorlagen.',
  },
  {
    q: 'Was kostet CraftOS?',
    a: 'Die Admin-Lizenz kostet 29,95 €/Monat (Pflicht, 1× pro Betrieb), weitere Büro-Lizenzen 29,95 €, App-Lizenzen für Monteure 9,95 €. Im Jahresabo sparen Sie rund 17 %. 14 Tage kostenlos testen.',
  },
  {
    q: 'Sind meine Daten sicher?',
    a: 'Ja. CraftOS wird auf EU-Servern gehostet, ist DSGVO-konform und trennt Betriebe strikt voneinander. Nachunternehmer und Kunden sehen nur, was Sie freigeben.',
  },
  {
    q: 'Funktioniert CraftOS auch offline auf der Baustelle?',
    a: 'Ja. Die Mobile-App arbeitet offline weiter – Zeiten, Fotos und Berichte synchronisieren automatisch, sobald wieder Verbindung besteht.',
  },
]

// Die 6 stärksten Funktionen für die Startseite
const topFunktionen = funktionen.filter((f) =>
  ['angebote', 'rechnungen', 'plantafel', 'zeiterfassung', 'lager', 'baudokumentation'].includes(
    f.slug,
  ),
)

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />
      <Hero />

      {/* ---------- Gewerke ---------- */}
      <section className="relative py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Gewerke"
            title="Gemacht für Ihr Handwerk"
            intro="Ob Elektro, SHK oder Holzbau: CraftOS spricht die Sprache Ihres Gewerks – mit fertigen Leistungsvorlagen für den schnellen Start."
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {gewerke.map((g) => (
              <Link
                key={g.slug}
                href={`/gewerke/${g.slug}`}
                className="card-hover group flex min-h-[5.5rem] flex-col justify-between rounded-xl border border-ink-200 bg-ink-100 p-4"
              >
                <span className="font-display text-sm font-semibold text-ink-800 group-hover:text-ink-900">
                  {g.kurz}
                </span>
                <span className="mt-2 flex items-center gap-1 text-xs text-ink-400 transition-colors group-hover:text-primary-400">
                  Mehr
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="anriss mx-auto max-w-7xl" aria-hidden="true" />

      {/* ---------- Funktionen ---------- */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Das System"
            title="Ein System statt sieben Insellösungen"
            intro="Vom ersten Angebot bis zum DATEV-Export: Jedes Modul greift ins nächste – ohne Doppel-Eingabe, ohne Excel-Brücken."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topFunktionen.map((f) => (
              <Link
                key={f.slug}
                href={`/funktionen/${f.slug}`}
                className="card-hover group rounded-2xl border border-ink-200 bg-ink-100 p-6"
              >
                <HexIcon icon={f.icon} />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{f.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.kurz}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-400">
                  Im Detail
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <GhostButton href="/funktionen">Alle Funktionen ansehen</GhostButton>
          </div>
        </div>
      </section>

      {/* ---------- Interaktive Demos ---------- */}
      <section className="relative overflow-hidden bg-ink-950 py-20 lg:py-28">
        <div className="bg-werkbank absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="glow-amber absolute inset-x-0 top-0 h-64" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Anfassen erlaubt"
            title="Probieren Sie es aus – direkt hier"
            intro="Keine Screenshots, keine Versprechen: So fühlt sich CraftOS an. Tippen, ziehen, testen."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div>
              <AngebotDemo />
              <p className="mt-3 px-1 text-sm text-ink-400">
                <span className="font-semibold text-ink-600">Angebote:</span> Positionen aus
                Vorlagen übernehmen – Summen und MwSt. rechnen live mit.
              </p>
            </div>
            <div>
              <KiChatDemo />
              <p className="mt-3 px-1 text-sm text-ink-400">
                <span className="font-semibold text-ink-600">Craft AI:</span> Der KI-Assistent
                kennt Ihre Projekte, Rechnungen und Zeiten – und antwortet in Sekunden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Craft AI ---------- */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Craft AI"
                title="KI, die anpackt – nicht nur plaudert"
                intro="Belege auslesen, Baustellenfotos analysieren, Zeiten per Sprache buchen, Fragen zum Betrieb beantworten: Craft AI arbeitet mit Ihren echten Daten – und der Mensch behält das letzte Wort."
              />
              <ul className="mt-8 space-y-3">
                {[
                  'Belegscan: Eingangsrechnungen automatisch erfassen',
                  'Foto-, Video- & PDF-Analyse für Baustelle und LV',
                  'Sprachdiktat auf Deutsch – ideal mit Handschuhen',
                  'KI-Chat-Agent mit Zugriff auf Ihre Betriebsdaten',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-ink-600">
                    <Check className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-primary-400" strokeWidth={2.5} />
                    <span className="text-[15px]">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <GhostButton href="/craft-ai">
                  <Sparkles className="h-4.5 w-4.5 text-primary-400" />
                  Craft AI entdecken
                </GhostButton>
              </div>
            </div>

            {/* Vision-Karte */}
            <div className="rounded-2xl border border-ink-200 bg-ink-100 p-6 sm:p-8">
              <Eyebrow tone="muted">Und das ist erst der Anfang</Eyebrow>
              <ul className="mt-6 space-y-5">
                {vision.map((v) => (
                  <li key={v.name} className="flex flex-col gap-1.5">
                    <span className="flex items-center gap-2.5">
                      <span className="font-display text-base font-semibold text-ink-800">
                        {v.name}
                      </span>
                      <TierBadge tier="vision" />
                    </span>
                    <p className="text-sm leading-relaxed text-ink-500">{v.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="anriss mx-auto max-w-7xl" aria-hidden="true" />

      {/* ---------- Mobile-App ---------- */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-ink-200 bg-ink-100 p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
                <div className="rounded-[1.6rem] border border-ink-200 bg-ink-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-semibold text-ink-900">
                      Meine Einsätze
                    </span>
                    <span className="spec-label text-[0.55rem] text-primary-500">Heute</span>
                  </div>
                  {[
                    { p: 'Baustelle Müller', t: '07:00–12:00', s: 'Läuft' },
                    { p: 'Umbau Bäckerei Krause', t: '13:00–16:30', s: 'Geplant' },
                  ].map((e) => (
                    <div
                      key={e.p}
                      className="mt-3 rounded-xl border border-ink-200 bg-ink-100 p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium text-ink-800">{e.p}</span>
                        <span
                          className={
                            e.s === 'Läuft'
                              ? 'rounded bg-success/15 px-1.5 py-0.5 font-mono text-[0.58rem] text-success'
                              : 'rounded bg-ink-200/60 px-1.5 py-0.5 font-mono text-[0.58rem] text-ink-500'
                          }
                        >
                          {e.s}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-[0.65rem] tabular-nums text-ink-400">
                        {e.t}
                      </p>
                    </div>
                  ))}
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-primary-500/10 p-3">
                    <span className="text-xs font-medium text-primary-400">
                      Zeiterfassung läuft …
                    </span>
                    <span className="font-mono text-xs tabular-nums text-primary-400">02:14:36</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading
                eyebrow="Mobile-App"
                title="Die Baustelle hat jetzt ein Büro in der Tasche"
                intro="Zeiten, Fotos, Berichte, Aufmaß und Mängel – direkt vor Ort erfasst. Offline-fähig, mit Face ID und Push-Benachrichtigungen. Für iOS und Android."
              />
              <ul className="mt-8 space-y-3">
                {[
                  'Offline arbeiten – synchronisiert automatisch',
                  'Bautagesberichte mit Foto, GPS & Unterschrift',
                  'Aufmaß vor Ort – fließt direkt ins Angebot',
                  'Face ID / Touch ID & Push-Benachrichtigungen',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-ink-600">
                    <Check className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-primary-400" strokeWidth={2.5} />
                    <span className="text-[15px]">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <GhostButton href="/app">
                  <Smartphone className="h-4.5 w-4.5 text-primary-400" />
                  Mehr zur App
                </GhostButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Preise-Teaser ---------- */}
      <section className="relative overflow-hidden bg-ink-950 py-20 lg:py-24">
        <div className="bg-werkbank absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Preise"
            title="Faire Lizenzen. Keine versteckten Kosten."
            intro={`${zahlung.trial}.`}
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {tarife.map((t) => (
              <div
                key={t.id}
                className={
                  t.badge === 'Beliebt'
                    ? 'card-hover rounded-2xl border border-primary-500/50 bg-ink-100 p-6'
                    : 'card-hover rounded-2xl border border-ink-200 bg-ink-100 p-6'
                }
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-ink-900">{t.name}</h3>
                  {t.badge && (
                    <span className="rounded-full bg-primary-500/15 px-2.5 py-0.5 font-mono text-[0.62rem] font-medium uppercase tracking-wider text-primary-400">
                      {t.badge}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-ink-400">{t.fuer}</p>
                <p className="mt-4 font-mono text-3xl font-semibold tabular-nums text-ink-900">
                  {t.monat.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                  <span className="text-sm font-normal text-ink-400"> /Monat</span>
                </p>
                <p className="mt-1 text-xs text-ink-400">
                  oder {t.jahr.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €/Jahr
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <CtaButton href="/preise">Alle Preise & Leistungen</CtaButton>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Häufige Fragen"
            align="center"
            className="mb-10"
          />
          <Faq items={faqItems} />
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="relative overflow-hidden bg-ink-950 py-20 lg:py-28">
        <div className="bg-werkbank mask-fade absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -bottom-40 left-1/2 h-[24rem] w-[40rem] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #f2af38 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-bold leading-tight text-ink-900 sm:text-5xl">
            Werkzeug gehört in die Hand.
            <br />
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #ffc438, #f19800)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Nicht in den Aktenordner.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-500">
            Testen Sie CraftOS 14 Tage kostenlos – voller Funktionsumfang, keine Kreditkarte
            nötig.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton>14 Tage kostenlos testen</CtaButton>
            <GhostButton href={site.demoUrl}>Demo ansehen</GhostButton>
          </div>
        </div>
      </section>
    </>
  )
}
