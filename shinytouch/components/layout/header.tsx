'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { COMPANY_DATA } from '@/lib/company'

const services = [
  { name: 'Büroreinigung', href: '/service/bueroreinigung' },
  { name: 'Glasreinigung', href: '/service/glasreinigung' },
  { name: 'Grundreinigung', href: '/service/grundreinigung' },
  { name: 'Unterhaltsreinigung', href: '/service/unterhaltsreinigung' },
  { name: 'Baureinigung', href: '/service/baureinigung' },
  { name: 'Hochdruckreinigung', href: '/service/hochdruckreinigung' },
]

const navItems = [
  { name: 'Leistungen', href: '/service', hasDropdown: true },
  { name: 'Standorte', href: '/standorte' },
  { name: 'Über uns', href: '/about' },
  { name: 'Karriere', href: '/karriere' },
  { name: 'Kontakt', href: '/contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsServicesOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-secondary-900/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 relative"
            aria-label="ShinyTouch - Zur Startseite"
          >
            <Image
              src="/logo.png"
              alt="ShinyTouch Gebäudereinigung Logo"
              width={220}
              height={55}
              className="h-12 sm:h-14 w-auto group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        pathname?.startsWith('/service')
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50'
                      }`}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                        isServicesOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white rounded-2xl shadow-xl shadow-secondary-900/10 border border-secondary-100 p-2 min-w-[220px]">
                        {services.map((service, idx) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors duration-150 group"
                            style={{ animationDelay: `${idx * 30}ms` }}
                          >
                            <div className="w-2 h-2 rounded-full bg-primary-400 group-hover:scale-125 transition-transform" />
                            {service.name}
                          </Link>
                        ))}
                        <div className="border-t border-secondary-100 mt-2 pt-2">
                          <Link
                            href="/service"
                            className="flex items-center justify-between px-4 py-3 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-xl transition-colors duration-150"
                          >
                            Alle Leistungen
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Phone Number - Desktop only */}
            <a
              href={`tel:${COMPANY_DATA.contact.phone}`}
              className="hidden xl:flex items-center gap-2 text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {COMPANY_DATA.contact.phoneDisplay}
            </a>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 group"
            >
              <span>Kostenlos anfragen</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              {/* Sparkle effect on hover */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute -top-full left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent group-hover:top-full transition-all duration-500" />
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 rounded-xl transition-colors"
              aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl shadow-secondary-900/10 border border-secondary-100 p-4">
            {/* Mobile Nav Items */}
            {navItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                    >
                      {item.name}
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-200 ${isServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-4 border-l-2 border-primary-200 ml-4 my-2 space-y-1">
                        {services.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block px-4 py-2 text-sm text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                      pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="mt-4 pt-4 border-t border-secondary-100">
              <a
                href={`tel:${COMPANY_DATA.contact.phone}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-secondary-700 hover:text-primary-600 font-medium rounded-xl border border-secondary-200 hover:border-primary-200 transition-colors mb-3"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {COMPANY_DATA.contact.phoneDisplay}
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl transition-all"
              >
                Kostenlos anfragen
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
