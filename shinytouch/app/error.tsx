'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console (could be sent to monitoring service)
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -left-20 w-60 h-60 bg-primary-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative text-center px-4 py-16 animate-fade-in">
        {/* Error Icon */}
        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-4">
          Etwas ist schiefgelaufen
        </h1>

        <p className="text-lg text-secondary-600 max-w-md mx-auto mb-10 leading-relaxed">
          Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut
          oder kontaktieren Sie uns, wenn das Problem weiterhin besteht.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-semibold rounded-2xl shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Erneut versuchen</span>
          </button>

          <a
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-secondary-700 text-lg font-semibold rounded-2xl border-2 border-secondary-200 hover:border-primary-300 hover:text-primary-600 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Zur Startseite</span>
          </a>
        </div>

        {/* Error Details (for development) */}
        {process.env.NODE_ENV === 'development' && error.digest && (
          <div className="mt-8 p-4 bg-secondary-100 rounded-xl text-left max-w-md mx-auto">
            <p className="text-xs font-mono text-secondary-500">
              Error Digest: {error.digest}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
