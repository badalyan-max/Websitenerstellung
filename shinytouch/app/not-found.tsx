import Link from 'next/link'
import { COMPANY_DATA } from '@/lib/company'

export default function NotFound() {
  return (
    <main className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -left-20 w-60 h-60 bg-primary-300/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="relative text-center px-4 py-16 animate-fade-in">
        {/* 404 Number */}
        <div className="relative mb-6">
          <h1 className="text-[10rem] sm:text-[14rem] font-bold leading-none bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent select-none">
            404
          </h1>
          {/* Sparkle decoration */}
          <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-primary-400 rounded-full animate-ping opacity-60" />
        </div>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-4">
          Seite nicht gefunden
        </h2>

        <p className="text-lg text-secondary-600 max-w-md mx-auto mb-10 leading-relaxed">
          Diese Seite wurde entfernt, umbenannt oder existiert nicht mehr.
          Vielleicht finden Sie was Sie suchen auf unserer Startseite.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-semibold rounded-2xl shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Zur Startseite</span>
          </Link>

          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-secondary-700 text-lg font-semibold rounded-2xl border-2 border-secondary-200 hover:border-primary-300 hover:text-primary-600 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Kontakt aufnehmen</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-secondary-200">
          <p className="text-sm text-secondary-500 mb-4">Beliebte Seiten:</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/service" className="text-secondary-600 hover:text-primary-600 transition-colors">
              Leistungen
            </Link>
            <Link href="/einsatzorte" className="text-secondary-600 hover:text-primary-600 transition-colors">
              Einsatzorte
            </Link>
            <Link href="/about" className="text-secondary-600 hover:text-primary-600 transition-colors">
              Über uns
            </Link>
            <Link href="/faq" className="text-secondary-600 hover:text-primary-600 transition-colors">
              FAQ
            </Link>
          </div>
        </div>

        {/* Phone Contact */}
        <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-secondary-200 shadow-sm">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-xs text-secondary-500">Direkt anrufen</div>
            <a href={`tel:${COMPANY_DATA.contact.phone}`} className="text-sm font-semibold text-secondary-900 hover:text-primary-600 transition-colors">
              {COMPANY_DATA.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
