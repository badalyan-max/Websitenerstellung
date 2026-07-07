'use client'

import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X, ArrowUpRight, ArrowRight, ChevronDown, Sparkles, Smartphone } from 'lucide-react'
import { CraftOSLogo } from '@/components/CraftOSLogo'
import { GewerkIcon } from '@/components/ui/GewerkIcon'
import { site } from '@/lib/site'
import { funktionen, getFunktion } from '@/lib/funktionen'
import { gewerke } from '@/lib/gewerke'
import { cn } from '@/lib/utils'

// Mega-Menü-Gruppierung der Funktionen: Büro vs. Baustelle & App
const BUERO_SLUGS = ['angebote', 'rechnungen', 'buchhaltung', 'plantafel', 'nachkalkulation', 'kundenportal']
const BAUSTELLE_SLUGS = ['zeiterfassung', 'baudokumentation', 'lager', 'team']

const buero = BUERO_SLUGS.map(getFunktion).filter((f): f is NonNullable<typeof f> => Boolean(f))
const baustelle = BAUSTELLE_SLUGS.map(getFunktion).filter(
  (f): f is NonNullable<typeof f> => Boolean(f),
)

type MenuId = 'funktionen' | 'gewerke'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState<MenuId | null>(null)
  const [mobileSection, setMobileSection] = useState<MenuId | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Escape schließt das Mega-Menü, Fokus außerhalb ebenso
  useEffect(() => {
    if (!megaOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(null)
    }
    const onFocus = (e: FocusEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMegaOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('focusin', onFocus)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('focusin', onFocus)
    }
  }, [megaOpen])

  const openMega = useCallback((id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMegaOpen(id)
  }, [])

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(null), 160)
  }, [])

  const closeAll = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMegaOpen(null)
    setOpen(false)
  }, [])

  const megaTrigger = (id: MenuId, label: string) => (
    <button
      type="button"
      aria-expanded={megaOpen === id}
      aria-haspopup="true"
      onMouseEnter={() => openMega(id)}
      onMouseLeave={scheduleClose}
      onClick={() => setMegaOpen((v) => (v === id ? null : id))}
      className={cn(
        'flex cursor-pointer items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
        megaOpen === id
          ? 'bg-ink-150 text-ink-900'
          : 'text-ink-600 hover:bg-ink-150 hover:text-ink-900',
      )}
    >
      {label}
      <ChevronDown
        className={cn(
          'h-3.5 w-3.5 transition-transform duration-200',
          megaOpen === id && 'rotate-180',
        )}
        strokeWidth={2.5}
      />
    </button>
  )

  return (
    <>
    <header
      ref={headerRef}
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled || megaOpen
          ? 'bg-ink-50/90 backdrop-blur-md border-b border-ink-200/70 shadow-[0_1px_0_rgba(0,0,0,0.3)]'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="CraftOS Startseite" className="shrink-0" onClick={closeAll}>
          <CraftOSLogo size="md" />
        </Link>

        {/* Desktop-Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {megaTrigger('funktionen', 'Funktionen')}
          {megaTrigger('gewerke', 'Gewerke')}
          {[
            { label: 'Craft AI', href: '/craft-ai' },
            { label: 'App', href: '/app' },
            { label: 'Preise', href: '/preise' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeAll}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-150 hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href={site.appUrl}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-ink-600 transition-colors hover:text-primary-400"
          >
            Anmelden
          </a>
          <a
            href={site.ctaUrl}
            className="btn-cta inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold"
          >
            Kostenlos testen
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </div>

        {/* Mobile-Toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-800 hover:bg-ink-150 lg:hidden"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* ---------- Mega-Menü-Panels (Desktop) ---------- */}
      {megaOpen && (
        <div
          className="absolute inset-x-0 top-full hidden lg:block"
          onMouseEnter={() => openMega(megaOpen)}
          onMouseLeave={scheduleClose}
        >
          <div className="mx-auto max-w-6xl px-8">
            <div className="animate-fade-up overflow-hidden rounded-2xl border border-ink-200 bg-[#17171a]/[0.98] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl [animation-duration:0.25s]">
              <div className="anriss anriss-amber" aria-hidden="true" />

              {megaOpen === 'funktionen' && (
                <div className="grid gap-10 p-8 lg:grid-cols-[1fr_1fr_280px]">
                  <div>
                    <p className="spec-label text-[0.6rem] text-ink-400">Büro</p>
                    <ul className="mt-3 space-y-0.5">
                      {buero.map((f) => (
                        <li key={f.slug}>
                          <Link
                            href={`/funktionen/${f.slug}`}
                            onClick={closeAll}
                            className="group flex items-start gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-ink-150"
                          >
                            <f.icon
                              className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-primary-400"
                              strokeWidth={1.8}
                            />
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-ink-800 transition-colors group-hover:text-ink-900">
                                {f.name}
                              </span>
                              <span className="mt-0.5 line-clamp-1 block text-xs text-ink-400">
                                {f.kurz}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="spec-label text-[0.6rem] text-ink-400">Baustelle & App</p>
                    <ul className="mt-3 space-y-0.5">
                      {baustelle.map((f) => (
                        <li key={f.slug}>
                          <Link
                            href={`/funktionen/${f.slug}`}
                            onClick={closeAll}
                            className="group flex items-start gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-ink-150"
                          >
                            <f.icon
                              className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-primary-400"
                              strokeWidth={1.8}
                            />
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-ink-800 transition-colors group-hover:text-ink-900">
                                {f.name}
                              </span>
                              <span className="mt-0.5 line-clamp-1 block text-xs text-ink-400">
                                {f.kurz}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/app"
                      onClick={closeAll}
                      className="group mt-4 inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-ink-600 transition-colors hover:text-primary-400"
                    >
                      <Smartphone className="h-4 w-4" />
                      Mehr zur Mobile-App
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                  {/* Craft-AI-Teaser */}
                  <Link
                    href="/craft-ai"
                    onClick={closeAll}
                    className="group flex flex-col justify-between rounded-xl border border-primary-500/30 bg-primary-500/[0.07] p-5 transition-colors hover:border-primary-500/60"
                  >
                    <div>
                      <span className="inline-flex items-center gap-2 font-mono text-[0.6rem] font-medium uppercase tracking-[0.18em] text-primary-400">
                        <Sparkles className="h-3.5 w-3.5" />
                        Craft AI
                      </span>
                      <p className="mt-3 font-display text-base font-semibold leading-snug text-ink-900">
                        KI, die anpackt — nicht nur plaudert
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-ink-500">
                        Belegscan, Foto-Analyse, Sprachdiktat und ein Chat-Agent mit Zugriff auf
                        Ihre echten Betriebsdaten.
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-400">
                      Mehr erfahren
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </div>
              )}

              {megaOpen === 'gewerke' && (
                <div className="p-8">
                  <ul className="grid gap-x-6 gap-y-0.5 sm:grid-cols-2 lg:grid-cols-3">
                    {gewerke.map((g) => (
                      <li key={g.slug}>
                        <Link
                          href={`/gewerke/${g.slug}`}
                          onClick={closeAll}
                          className="group flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-ink-150"
                        >
                          <GewerkIcon
                            slug={g.slug}
                            className="h-5 w-5 flex-shrink-0 text-ink-400 transition-colors group-hover:text-primary-400"
                          />
                          <span className="text-sm font-medium text-ink-700 transition-colors group-hover:text-ink-900">
                            {g.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink-200 pt-4 text-sm text-ink-500">
                    Ihr Gewerk ist nicht dabei? CraftOS passt sich an.
                    <Link
                      href="/gewerke"
                      onClick={closeAll}
                      className="inline-flex items-center gap-1 font-semibold text-primary-400 transition-colors hover:text-primary-300"
                    >
                      Alle Einsatzbereiche
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </header>

    {/* Mobile-Menü — bewusst AUSSERHALB des Headers: dessen backdrop-blur
        macht ihn sonst zum Containing Block und kollabiert das fixed-Overlay */}
      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-ink-50 px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            {/* Akkordeon: Funktionen */}
            <button
              type="button"
              aria-expanded={mobileSection === 'funktionen'}
              onClick={() => setMobileSection((v) => (v === 'funktionen' ? null : 'funktionen'))}
              className="flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-semibold text-ink-800 hover:bg-ink-150"
            >
              Funktionen
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-ink-400 transition-transform duration-200',
                  mobileSection === 'funktionen' && 'rotate-180',
                )}
              />
            </button>
            {mobileSection === 'funktionen' && (
              <ul className="mb-2 space-y-0.5 border-l border-ink-200 pl-4">
                {funktionen.map((f) => (
                  <li key={f.slug}>
                    <Link
                      href={`/funktionen/${f.slug}`}
                      onClick={closeAll}
                      className="block rounded-lg px-3 py-2.5 text-base text-ink-600 hover:bg-ink-150 hover:text-ink-900"
                    >
                      {f.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/funktionen"
                    onClick={closeAll}
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-primary-400"
                  >
                    Alle Funktionen →
                  </Link>
                </li>
              </ul>
            )}

            {/* Akkordeon: Gewerke */}
            <button
              type="button"
              aria-expanded={mobileSection === 'gewerke'}
              onClick={() => setMobileSection((v) => (v === 'gewerke' ? null : 'gewerke'))}
              className="flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-semibold text-ink-800 hover:bg-ink-150"
            >
              Gewerke
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-ink-400 transition-transform duration-200',
                  mobileSection === 'gewerke' && 'rotate-180',
                )}
              />
            </button>
            {mobileSection === 'gewerke' && (
              <ul className="mb-2 space-y-0.5 border-l border-ink-200 pl-4">
                {gewerke.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`/gewerke/${g.slug}`}
                      onClick={closeAll}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-base text-ink-600 hover:bg-ink-150 hover:text-ink-900"
                    >
                      <GewerkIcon slug={g.slug} className="h-4.5 w-4.5 text-ink-400" />
                      {g.kurz}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/gewerke"
                    onClick={closeAll}
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-primary-400"
                  >
                    Alle Einsatzbereiche →
                  </Link>
                </li>
              </ul>
            )}

            {[
              { label: 'Craft AI', href: '/craft-ai' },
              { label: 'App', href: '/app' },
              { label: 'Preise', href: '/preise' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeAll}
                className="rounded-xl px-4 py-3.5 text-lg font-semibold text-ink-800 hover:bg-ink-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3 border-t border-ink-200 pt-6">
            <a
              href={site.appUrl}
              className="rounded-xl border border-ink-200 px-4 py-3.5 text-center text-base font-semibold text-ink-800"
            >
              Anmelden
            </a>
            <a
              href={site.ctaUrl}
              className="btn-cta inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-3.5 text-base font-semibold"
            >
              Kostenlos testen
              <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      )}
    </>
  )
}
