'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface KeywordResult {
  keyword: string
  keyword_info?: {
    search_volume: number
    competition: number
    cpc: number
  }
}

interface PAAItem {
  title: string
  items?: Array<{
    title: string
    expanded_element?: Array<{
      description: string
    }>
  }>
}

function KeywordResearchContent() {
  const searchParams = useSearchParams()
  const initialKeyword = searchParams.get('keyword') || ''

  const [keyword, setKeyword] = useState(initialKeyword)
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [relatedKeywords, setRelatedKeywords] = useState<KeywordResult[]>([])
  const [paaQuestions, setPaaQuestions] = useState<PAAItem[]>([])
  const [error, setError] = useState<string | null>(null)

  async function searchRelatedKeywords() {
    if (!keyword.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'related-keywords',
          params: { keyword, city },
        }),
      })
      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        const results = data.tasks?.[0]?.result?.[0]?.items || []
        setRelatedKeywords(results)
      }
    } catch (err) {
      setError('Fehler bei der Keyword-Recherche')
    }

    setLoading(false)
  }

  async function searchPAA() {
    if (!keyword.trim()) return

    setLoading(true)
    setError(null)

    try {
      const searchTerm = city ? `${keyword} ${city}` : keyword
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'people-also-ask',
          params: { keyword: searchTerm },
        }),
      })
      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setPaaQuestions(data)
      }
    } catch (err) {
      setError('Fehler bei People Also Ask')
    }

    setLoading(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Keyword-Recherche</h1>
        <p className="text-secondary-600 mt-1">
          Finde verwandte Keywords und People Also Ask Fragen für Content-Ideen.
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl border border-secondary-200 p-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Haupt-Keyword
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="z.B. Gebäudereinigung"
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              onKeyDown={(e) => e.key === 'Enter' && searchRelatedKeywords()}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Stadt (optional)
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="z.B. München"
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={searchRelatedKeywords}
            disabled={loading || !keyword.trim()}
            className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Suche...' : 'Related Keywords'}
          </button>
          <button
            onClick={searchPAA}
            disabled={loading || !keyword.trim()}
            className="px-6 py-3 bg-secondary-100 text-secondary-700 font-medium rounded-lg hover:bg-secondary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Suche...' : 'People Also Ask'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}
      </div>

      {/* Related Keywords Results */}
      {relatedKeywords.length > 0 && (
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            Verwandte Keywords ({relatedKeywords.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">
                    Keyword
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-secondary-500">
                    Suchvolumen
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-secondary-500">
                    Competition
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-secondary-500">
                    CPC
                  </th>
                </tr>
              </thead>
              <tbody>
                {relatedKeywords.map((kw, idx) => (
                  <tr key={idx} className="border-b border-secondary-100 hover:bg-secondary-50">
                    <td className="py-3 px-4 text-secondary-900">{kw.keyword}</td>
                    <td className="py-3 px-4 text-right text-secondary-600">
                      {kw.keyword_info?.search_volume?.toLocaleString() || '-'}
                    </td>
                    <td className="py-3 px-4 text-right text-secondary-600">
                      {kw.keyword_info?.competition
                        ? (kw.keyword_info.competition * 100).toFixed(0) + '%'
                        : '-'}
                    </td>
                    <td className="py-3 px-4 text-right text-secondary-600">
                      {kw.keyword_info?.cpc ? '€' + kw.keyword_info.cpc.toFixed(2) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* People Also Ask Results */}
      {paaQuestions.length > 0 && (
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">
            People Also Ask - Fragen für H2-Überschriften
          </h2>
          <div className="space-y-4">
            {paaQuestions.map((paa, idx) =>
              paa.items?.map((item, itemIdx) => (
                <div
                  key={`${idx}-${itemIdx}`}
                  className="p-4 bg-secondary-50 rounded-lg border border-secondary-200"
                >
                  <h3 className="font-medium text-secondary-900 mb-2">{item.title}</h3>
                  {item.expanded_element?.[0]?.description && (
                    <p className="text-sm text-secondary-600">
                      {item.expanded_element[0].description}
                    </p>
                  )}
                  <button
                    onClick={() => navigator.clipboard.writeText(item.title)}
                    className="mt-2 text-xs text-primary-600 hover:text-primary-700"
                  >
                    Kopieren
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Tipp:</strong> Nutze diese Fragen als H2-Überschriften und beantworte sie
              direkt in den ersten 300 Zeichen danach für optimale AI Overview Sichtbarkeit.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function KeywordResearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-secondary-500">Laden...</div>}>
      <KeywordResearchContent />
    </Suspense>
  )
}
