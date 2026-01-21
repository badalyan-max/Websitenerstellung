'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface SERPResult {
  keyword: string
  found: boolean
  position: number | null
  error?: string
  items?: Array<{
    rank: number
    domain: string
    url: string
    title: string
  }>
}

const DEFAULT_KEYWORDS = [
  'Gebäudereinigung Bamberg',
  'Gebäudereinigung Nürnberg',
  'Gebäudereinigung München',
  'Büroreinigung Bamberg',
  'Glasreinigung Bamberg',
  'Unterhaltsreinigung Bamberg',
]

const DOMAIN = 'shinytouchgebaeudereinigung.de'

function SERPTrackingContent() {
  const searchParams = useSearchParams()
  const initialKeyword = searchParams.get('keyword') || ''

  const [singleKeyword, setSingleKeyword] = useState(initialKeyword)
  const [results, setResults] = useState<SERPResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function checkSingleKeyword() {
    if (!singleKeyword.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'serp-position',
          params: { keyword: singleKeyword, domain: DOMAIN },
        }),
      })
      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setResults([{ keyword: singleKeyword, ...data }])
      }
    } catch (err) {
      setError('Fehler bei der SERP-Abfrage')
    }

    setLoading(false)
  }

  async function checkBatchKeywords() {
    setLoading(true)
    setError(null)
    setResults([])

    try {
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'batch-serp',
          params: { keywords: DEFAULT_KEYWORDS, domain: DOMAIN },
        }),
      })
      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setResults(data)
      }
    } catch (err) {
      setError('Fehler bei der Batch-SERP-Abfrage')
    }

    setLoading(false)
  }

  function getPositionBadge(position: number | null, found: boolean) {
    if (!found) {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded">Nicht gefunden</span>
    }
    if (position === null) {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">-</span>
    }
    if (position <= 3) {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">#{position}</span>
    }
    if (position <= 10) {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded">#{position}</span>
    }
    return <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded">#{position}</span>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">SERP Tracking</h1>
        <p className="text-secondary-600 mt-1">
          Überwache deine Positionen für wichtige Keywords in den Google Suchergebnissen.
        </p>
      </div>

      {/* Single Keyword Check */}
      <div className="bg-white rounded-xl border border-secondary-200 p-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Einzelnes Keyword prüfen</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={singleKeyword}
            onChange={(e) => setSingleKeyword(e.target.value)}
            placeholder="z.B. Gebäudereinigung München"
            className="flex-1 px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            onKeyDown={(e) => e.key === 'Enter' && checkSingleKeyword()}
          />
          <button
            onClick={checkSingleKeyword}
            disabled={loading || !singleKeyword.trim()}
            className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Prüfe...' : 'Position prüfen'}
          </button>
        </div>
      </div>

      {/* Batch Check */}
      <div className="bg-white rounded-xl border border-secondary-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-secondary-900">Standard Keywords prüfen</h2>
            <p className="text-sm text-secondary-500">
              Prüft {DEFAULT_KEYWORDS.length} wichtige Keywords auf einmal
            </p>
          </div>
          <button
            onClick={checkBatchKeywords}
            disabled={loading}
            className="px-6 py-3 bg-secondary-100 text-secondary-700 font-medium rounded-lg hover:bg-secondary-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Prüfe...' : 'Alle prüfen'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_KEYWORDS.map((kw) => (
            <span
              key={kw}
              className="px-3 py-1 text-sm bg-secondary-100 text-secondary-600 rounded-full"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            Ergebnisse für {DOMAIN}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">
                    Keyword
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-secondary-500">
                    Position
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, idx) => (
                  <tr key={idx} className="border-b border-secondary-100 hover:bg-secondary-50">
                    <td className="py-3 px-4 text-secondary-900 font-medium">{result.keyword}</td>
                    <td className="py-3 px-4 text-center">
                      {getPositionBadge(result.position, result.found)}
                    </td>
                    <td className="py-3 px-4 text-secondary-600">
                      {result.error ? (
                        <span className="text-red-600">{result.error}</span>
                      ) : result.found ? (
                        <span className="text-green-600">In Top 100</span>
                      ) : (
                        <span className="text-secondary-400">Außerhalb Top 100</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-700">
                {results.filter((r) => r.position !== null && r.position <= 10).length}
              </div>
              <div className="text-sm text-green-600">Top 10</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-700">
                {results.filter((r) => r.position !== null && r.position > 10 && r.position <= 50).length}
              </div>
              <div className="text-sm text-yellow-600">Top 11-50</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-700">
                {results.filter((r) => !r.found || r.position === null || r.position > 50).length}
              </div>
              <div className="text-sm text-red-600">Nicht Top 50</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SERPTrackingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-secondary-500">Laden...</div>}>
      <SERPTrackingContent />
    </Suspense>
  )
}
