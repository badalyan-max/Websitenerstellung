import Link from 'next/link'
import { COMPANY_DATA } from '@/lib/company'
import { SERVICES } from '@/lib/services'

const quickLinks = [
  { name: 'Über uns', href: '/about' },
  { name: 'Leistungen', href: '/service' },
  { name: 'Standorte', href: '/standorte' },
  { name: 'Kontakt', href: '/contact' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Karriere', href: '/karriere' },
]

const legalLinks = [
  { name: 'Impressum', href: '/impressum' },
  { name: 'Datenschutz', href: '/datenschutz' },
]

const topCities = [
  { name: 'Bamberg', href: '/bamberg' },
  { name: 'Nürnberg', href: '/nuernberg' },
  { name: 'München', href: '/muenchen' },
  { name: 'Berlin', href: '/berlin' },
  { name: 'Frankfurt', href: '/frankfurt' },
  { name: 'Hamburg', href: '/hamburg' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-secondary-900 text-secondary-100">
      {/* Decorative top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Company Info & Contact */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 group mb-6">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                <div className="absolute inset-0.5 bg-secondary-900 rounded-[6px] rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                <svg
                  className="relative w-5 h-5 text-primary-400 transform rotate-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">
                  Shiny<span className="text-primary-400">Touch</span>
                </span>
                <span className="text-[9px] font-medium text-secondary-400 tracking-widest uppercase -mt-0.5">
                  Gebäudereinigung
                </span>
              </div>
            </Link>

            {/* Address - Schema-friendly */}
            <address
              className="not-italic text-sm text-secondary-300 space-y-3"
              itemScope
              itemType="https://schema.org/LocalBusiness"
            >
              <meta itemProp="name" content={COMPANY_DATA.name} />

              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-primary-500 mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <span itemProp="streetAddress">{COMPANY_DATA.address.street}</span>
                  <br />
                  <span itemProp="postalCode">{COMPANY_DATA.address.zip}</span>{' '}
                  <span itemProp="addressLocality">{COMPANY_DATA.address.city}</span>
                </span>
              </div>

              <a
                href={`tel:${COMPANY_DATA.contact.phone}`}
                className="flex items-center gap-3 text-secondary-300 hover:text-primary-400 transition-colors group"
                itemProp="telephone"
              >
                <svg
                  className="w-5 h-5 text-primary-500 shrink-0 group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {COMPANY_DATA.contact.phoneDisplay}
              </a>

              <a
                href={`mailto:${COMPANY_DATA.contact.email}`}
                className="flex items-center gap-3 text-secondary-300 hover:text-primary-400 transition-colors group"
                itemProp="email"
              >
                <svg
                  className="w-5 h-5 text-primary-500 shrink-0 group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="break-all">{COMPANY_DATA.contact.email}</span>
              </a>
            </address>

            {/* Opening Hours */}
            <div className="mt-6 pt-6 border-t border-secondary-800">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Öffnungszeiten
              </h3>
              <ul className="text-sm text-secondary-400 space-y-1">
                <li className="flex justify-between">
                  <span>Mo - Fr</span>
                  <span className="text-secondary-300">08:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Samstag</span>
                  <span className="text-secondary-300">08:00 - 16:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sonntag</span>
                  <span className="text-secondary-500">Geschlossen</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Leistungen
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/service/${service.slug}`}
                    className="text-sm text-secondary-400 hover:text-primary-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links & Cities */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2.5 mb-8">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-400 hover:text-primary-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Top Standorte
            </h3>
            <ul className="space-y-2.5">
              {topCities.map((city) => (
                <li key={city.href}>
                  <Link
                    href={city.href}
                    className="text-sm text-secondary-400 hover:text-primary-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Gebäudereinigung {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Trust & CTA */}
          <div>
            {/* Trust Badge */}
            <div className="bg-secondary-800/50 rounded-2xl p-5 mb-6 border border-secondary-700/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-bold text-white">
                  {COMPANY_DATA.rating.value.toFixed(1)}/5
                </span>
              </div>
              <p className="text-sm text-secondary-400 mb-2">
                Basierend auf {COMPANY_DATA.rating.count} Bewertungen
              </p>
              <a
                href={COMPANY_DATA.social.provenExpert}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-1"
              >
                Auf ProvenExpert ansehen
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 group"
            >
              Kostenlos anfragen
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={COMPANY_DATA.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-secondary-800 hover:bg-secondary-700 rounded-lg transition-colors group"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5 text-secondary-400 group-hover:text-primary-400 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={COMPANY_DATA.social.google}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-secondary-800 hover:bg-secondary-700 rounded-lg transition-colors group"
                aria-label="Google Maps"
              >
                <svg
                  className="w-5 h-5 text-secondary-400 group-hover:text-primary-400 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0C7.31 0 3.07 3.05 1.17 7.41L5.42 10.87C6.47 7.81 9.01 5.5 12 5.5c1.62 0 3.06.55 4.21 1.48l3.75-3.63C17.77 1.39 15.06 0 12 0zM1.17 7.41C.42 9.12 0 11.01 0 13c0 1.99.42 3.88 1.17 5.59l4.25-3.46C4.93 14.11 4.5 13.09 4.5 12c0-1.09.43-2.11.92-3.13L1.17 7.41zM12 18.5c-2.99 0-5.53-2.31-6.58-5.37L1.17 16.59C3.07 20.95 7.31 24 12 24c2.93 0 5.65-1.25 7.68-3.29l-4.11-3.19c-1.05.63-2.28 1.02-3.57 1.02v-.04zM23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l4.11 3.19c2.33-2.14 3.81-5.31 3.81-8.86-.05-.05-.05-.1-.05-.15h-.45z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-secondary-500">
              © {currentYear} {COMPANY_DATA.name}. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-secondary-500 hover:text-secondary-300 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
