'use client'

import { useState, useEffect, useRef } from 'react'

interface WizardEmbedProps {
  className?: string
}

const WIZARD_URL = 'https://shinytouchprofessional.de/wizard'

export function WizardEmbed({ className = '' }: WizardEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [iframeHeight, setIframeHeight] = useState(800)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mobile Detection
  useEffect(() => {
    const checkMobile = () => {
      // Check screen width (< 768px = mobile)
      const isSmallScreen = window.innerWidth < 768
      // Also check touch capability
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsMobile(isSmallScreen && isTouchDevice)
    }

    checkMobile()
    // Don't add resize listener - we only check on mount
  }, [])

  // Intersection Observer für echtes Lazy Loading (nur für Desktop)
  useEffect(() => {
    if (isMobile) return // Skip for mobile

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isMobile])

  // PostMessage für Höhenanpassung
  useEffect(() => {
    if (isMobile) return

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://shinytouchprofessional.de') return

      if (event.data?.type === 'resize' && typeof event.data.height === 'number') {
        setIframeHeight(event.data.height)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [isMobile])

  // Timeout für Fehlerbehandlung
  useEffect(() => {
    if (!isVisible || isMobile) return

    const timeout = setTimeout(() => {
      if (isLoading) {
        setHasError(true)
        setIsLoading(false)
      }
    }, 15000)

    return () => clearTimeout(timeout)
  }, [isVisible, isLoading, isMobile])

  // Loading state while checking device
  if (isMobile === null) {
    return (
      <div className={`relative ${className}`} style={{ minHeight: '200px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  // Mobile: Show redirect button instead of iframe
  if (isMobile) {
    return (
      <div className={`${className}`}>
        <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-6 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-secondary-900 mb-2">
            Angebot in 2 Minuten erstellen
          </h3>

          <p className="text-secondary-600 mb-6 text-sm">
            Nutzen Sie unseren Konfigurator für ein individuelles Angebot - kostenlos und unverbindlich.
          </p>

          {/* CTA Button */}
          <a
            href={`${WIZARD_URL}?theme=light`}
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 active:from-primary-600 active:to-primary-700 transition-all"
          >
            <span>Zum Angebots-Konfigurator</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-secondary-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Kostenlos
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Unverbindlich
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Sofort-Angebot
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Desktop: Show iframe as before
  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ minHeight: 'min(600px, 80vh)' }}
    >
      {/* Loading State */}
      {isLoading && isVisible && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary-50 to-white rounded-2xl border border-secondary-200 z-10"
          role="status"
          aria-live="polite"
          aria-label="Angebots-Konfigurator wird geladen"
        >
          <div className="text-center p-8">
            <div className="space-y-4 max-w-md mx-auto mb-6">
              <div className="h-8 bg-secondary-200 rounded-lg animate-pulse" />
              <div className="h-4 bg-secondary-100 rounded w-3/4 mx-auto animate-pulse" />
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="h-24 bg-secondary-100 rounded-xl animate-pulse" />
                <div className="h-24 bg-secondary-100 rounded-xl animate-pulse" />
              </div>
            </div>
            <p className="text-lg font-semibold text-secondary-900 mb-2">
              Angebots-Konfigurator wird geladen...
            </p>
            <p className="text-sm text-secondary-500">
              Bitte warten Sie einen Moment
            </p>
          </div>
        </div>
      )}

      {/* Placeholder wenn nicht sichtbar */}
      {!isVisible && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-secondary-50 rounded-2xl border border-secondary-200"
          aria-hidden="true"
        >
          <div className="text-center p-8">
            <svg
              className="w-12 h-12 text-secondary-300 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-secondary-400">Konfigurator</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-white rounded-2xl border border-secondary-200 z-20"
          role="alert"
        >
          <div className="text-center p-8 max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              Konfigurator konnte nicht geladen werden
            </h3>
            <p className="text-secondary-600 mb-6">
              Bitte versuchen Sie es erneut oder nutzen Sie den direkten Link.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setHasError(false)
                  setIsLoading(true)
                }}
                className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
              >
                Erneut versuchen
              </button>
              <a
                href={WIZARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-secondary-200 text-secondary-700 rounded-xl hover:border-primary-300 hover:text-primary-600 transition-colors"
              >
                Direkt öffnen
              </a>
            </div>
          </div>
        </div>
      )}

      {/* iFrame - nur für Desktop */}
      {isVisible && !hasError && (
        <iframe
          src={`${WIZARD_URL}?theme=light`}
          title="ShinyTouch Angebots-Konfigurator"
          aria-label="Interaktiver Angebots-Konfigurator für Gebäudereinigung"
          className="w-full rounded-2xl border border-secondary-200 shadow-xl bg-white"
          style={{
            height: `${iframeHeight}px`,
            minHeight: 'min(600px, 80vh)',
            maxHeight: '1200px',
            colorScheme: 'light',
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true)
            setIsLoading(false)
          }}
          allow="clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
        />
      )}

      {/* Fallback für NoScript */}
      <noscript>
        <div className="p-8 bg-secondary-50 rounded-2xl text-center">
          <p className="text-secondary-600 mb-4">
            Der Angebots-Konfigurator benötigt JavaScript.
          </p>
          <a
            href={WIZARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
          >
            Zum Konfigurator
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </noscript>
    </div>
  )
}
