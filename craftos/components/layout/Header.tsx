'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { CraftOSLogo } from '@/components/CraftOSLogo'
import { nav, site } from '@/lib/site'
import { cn } from '@/lib/utils'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-ink-50/85 backdrop-blur-md border-b border-ink-200/70 shadow-[0_1px_0_rgba(0,0,0,0.3)]'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="CraftOS Startseite" className="shrink-0">
          <CraftOSLogo size="md" />
        </Link>

        {/* Desktop-Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
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

      {/* Mobile-Menü */}
      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-ink-50 px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
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
    </header>
  )
}
