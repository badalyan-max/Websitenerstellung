'use client'

import Link from 'next/link'
import { COMPANY_DATA } from '@/lib/company'
import { CITIES_COUNT } from '@/lib/cities'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Animated Background Elements - Animationen nur auf Desktop (GPU-intensiv auf Mobile) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs - hidden on mobile, animated on desktop */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/40 rounded-full blur-3xl hidden sm:block sm:animate-pulse" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-primary-300/30 rounded-full blur-3xl hidden sm:block sm:animate-pulse delay-1000" />
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-secondary-200/40 rounded-full blur-2xl hidden sm:block sm:animate-pulse delay-500" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        {/* Floating Sparkles - hidden on mobile */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full hidden sm:block sm:animate-ping opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-primary-500 rounded-full hidden sm:block sm:animate-ping delay-700 opacity-50" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary-300 rounded-full hidden sm:block sm:animate-ping delay-1000 opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary-100 shadow-sm mb-8 animate-fade-in">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-secondary-900">{COMPANY_DATA.rating.value}/5</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-secondary-900 mb-6">
              <span className="block">Professionelle</span>
              <span className="block bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 bg-clip-text text-transparent">
                Gebäudereinigung
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 text-secondary-700">
                in ganz Deutschland
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-secondary-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Wir sorgen für makellose Sauberkeit in Ihrem Unternehmen.
              <span className="font-semibold text-primary-600">30 Tage risikofrei & preisermäßigt testen</span> –
              jederzeit kündbar, kostenlose Nachreinigung bei Unzufriedenheit.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Kostenlose Beratung</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Festpreisgarantie</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Flexible Termine</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-semibold rounded-2xl shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Kostenlos anfragen</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="/service"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-secondary-700 text-lg font-semibold rounded-2xl border-2 border-secondary-200 hover:border-primary-300 hover:text-primary-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Unsere Leistungen</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative mt-8 lg:mt-0 lg:pl-8">
            {/* Main Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-secondary-900/10 p-4 sm:p-6 lg:p-8 border border-secondary-100">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl rotate-12 opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-secondary-300 to-secondary-500 rounded-2xl -rotate-12 opacity-10" />

              {/* Service Icons Grid */}
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {[
                  { icon: '🏢', label: 'Büroreinigung' },
                  { icon: '🪟', label: 'Glasreinigung' },
                  { icon: '✨', label: 'Grundreinigung' },
                  { icon: '🔄', label: 'Unterhaltsreinigung' },
                ].map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-br from-secondary-50 to-white rounded-xl border border-secondary-100 hover:border-primary-200 hover:shadow-md transition-all duration-300 group cursor-pointer"
                  >
                    <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">{service.icon}</span>
                    <span className="text-xs sm:text-sm font-medium text-secondary-700 group-hover:text-primary-600 transition-colors">
                      {service.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-secondary-100">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary-600">500+</div>
                  <div className="text-[10px] sm:text-xs text-secondary-500">Zufriedene Kunden</div>
                </div>
                <div className="text-center border-l border-secondary-100">
                  <div className="text-xl sm:text-2xl font-bold text-primary-600">{CITIES_COUNT}+</div>
                  <div className="text-[10px] sm:text-xs text-secondary-500">Einsatzorte</div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg shadow-primary-500/30 flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">30 Tage risikofrei</span>
              </div>
            </div>

            {/* Floating Contact Card */}
            <div className="absolute -right-4 top-1/4 bg-white rounded-2xl shadow-xl p-4 border border-secondary-100 hidden xl:block animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-secondary-500">Jetzt anrufen</div>
                  <div className="text-sm font-semibold text-secondary-900">{COMPANY_DATA.contact.phoneDisplay}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 text-white" viewBox="0 0 1440 54" fill="none" preserveAspectRatio="none">
          <path d="M0 22L60 16.7C120 11 240 1.00001 360 0.700012C480 1.00001 600 11 720 19.3C840 27 960 33 1080 30.7C1200 27 1320 17 1380 11.7L1440 6.70001V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z" fill="currentColor"/>
        </svg>
      </div>
    </section>
  )
}
