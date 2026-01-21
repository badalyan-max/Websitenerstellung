'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ConnectionStatus {
  connected: boolean
  checking: boolean
  error?: string
}

export default function SEODashboard() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    connected: false,
    checking: true,
  })

  useEffect(() => {
    checkConnection()
  }, [])

  async function checkConnection() {
    setConnectionStatus({ connected: false, checking: true })
    try {
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test-connection' }),
      })
      const data = await response.json()
      setConnectionStatus({
        connected: data.success === true,
        checking: false,
        error: data.error,
      })
    } catch (error) {
      setConnectionStatus({
        connected: false,
        checking: false,
        error: 'Verbindung fehlgeschlagen',
      })
    }
  }

  const features = [
    {
      title: 'Keyword-Recherche',
      description: 'Finde verwandte Keywords und People Also Ask Fragen für neue Content-Ideen.',
      href: '/admin/seo/keywords',
      icon: '🔍',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'SERP Tracking',
      description: 'Überwache die Position deiner Seiten für wichtige Keywords.',
      href: '/admin/seo/serp',
      icon: '📈',
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'OnPage Audit',
      description: 'Prüfe deine Seiten auf technische SEO-Fehler und Schema-Markup.',
      href: '/admin/seo/audit',
      icon: '🔬',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'AI Visibility',
      description: 'Tracke deine Sichtbarkeit in AI Overviews und LLM-Erwähnungen.',
      href: '/admin/seo/ai-visibility',
      icon: '🤖',
      color: 'bg-orange-50 text-orange-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">SEO Dashboard</h1>
        <p className="text-secondary-600 mt-1">
          Überwache und optimiere die SEO-Performance deiner Website.
        </p>
      </div>

      {/* Connection Status */}
      <div className="bg-white rounded-xl border border-secondary-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`w-3 h-3 rounded-full ${
                connectionStatus.checking
                  ? 'bg-yellow-400 animate-pulse'
                  : connectionStatus.connected
                  ? 'bg-green-400'
                  : 'bg-red-400'
              }`}
            />
            <div>
              <h3 className="font-semibold text-secondary-900">DataForSEO API</h3>
              <p className="text-sm text-secondary-500">
                {connectionStatus.checking
                  ? 'Verbindung wird geprüft...'
                  : connectionStatus.connected
                  ? 'Verbunden und bereit'
                  : connectionStatus.error || 'Nicht verbunden'}
              </p>
            </div>
          </div>
          <button
            onClick={checkConnection}
            disabled={connectionStatus.checking}
            className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors disabled:opacity-50"
          >
            {connectionStatus.checking ? 'Prüfe...' : 'Erneut prüfen'}
          </button>
        </div>

        {!connectionStatus.connected && !connectionStatus.checking && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Hinweis:</strong> Stelle sicher, dass DATAFORSEO_LOGIN und
              DATAFORSEO_PASSWORD in deiner .env.local Datei konfiguriert sind.
            </p>
          </div>
        )}
      </div>

      {/* Feature Cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group bg-white rounded-xl border border-secondary-200 p-6 hover:border-primary-300 hover:shadow-lg transition-all"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${feature.color} mb-4`}
            >
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
              {feature.title}
            </h3>
            <p className="text-secondary-600 mt-2">{feature.description}</p>
            <span className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm mt-4">
              Öffnen
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
            </span>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-secondary-200 p-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Schnellaktionen</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/seo/keywords?keyword=Gebäudereinigung"
            className="px-4 py-2 text-sm font-medium bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
          >
            Keyword: "Gebäudereinigung"
          </Link>
          <Link
            href="/admin/seo/serp?keyword=Gebäudereinigung+Bamberg"
            className="px-4 py-2 text-sm font-medium bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
          >
            SERP: "Gebäudereinigung Bamberg"
          </Link>
          <Link
            href="/admin/seo/audit?url=https://www.shinytouchgebaeudereinigung.de"
            className="px-4 py-2 text-sm font-medium bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
          >
            Audit: Homepage
          </Link>
          <Link
            href="/admin/seo/ai-visibility?brand=ShinyTouch"
            className="px-4 py-2 text-sm font-medium bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
          >
            AI: "ShinyTouch"
          </Link>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200 p-6">
        <h2 className="text-lg font-semibold text-primary-900 mb-2">
          GEO 2026: Generative Engine Optimization
        </h2>
        <p className="text-primary-700 text-sm leading-relaxed">
          Dieses Dashboard unterstützt die SEO-Strategie für 2026, inklusive AI Overview
          Optimierung, LLM Mentions Tracking und die 300-Zeichen-Regel für Fan-out
          Optimierung. Nutze die Tools, um deine Sichtbarkeit in KI-Systemen zu maximieren.
        </p>
      </div>
    </div>
  )
}
