'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface AIOverviewResult {
  hasAIOverview: boolean
  aiOverview?: {
    type: string
    references?: Array<{
      domain: string
      url: string
      title: string
    }>
  }
  featuredSnippet?: {
    title: string
    description: string
    url: string
  }
  totalResults: number
}

interface LLMMentionResult {
  found: boolean
  mentions?: Array<{
    prompt: string
    response: string
    sentiment: string
  }>
}

function AIVisibilityContent() {
  const searchParams = useSearchParams()
  const initialBrand = searchParams.get('brand') || 'ShinyTouch'

  const [keyword, setKeyword] = useState('Gebäudereinigung Bamberg')
  const [brand, setBrand] = useState(initialBrand)
  const [loading, setLoading] = useState(false)
  const [aiOverviewResult, setAiOverviewResult] = useState<AIOverviewResult | null>(null)
  const [llmResult, setLlmResult] = useState<LLMMentionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function checkAIOverview() {
    if (!keyword.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ai-overview',
          params: { keyword },
        }),
      })
      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setAiOverviewResult(data)
      }
    } catch (err) {
      setError('Fehler bei AI Overview Check')
    }

    setLoading(false)
  }

  async function checkLLMMentions() {
    if (!brand.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'llm-mentions',
          params: { brand },
        }),
      })
      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        // Parse LLM mentions response
        const tasks = data.tasks?.[0]?.result || []
        setLlmResult({
          found: tasks.length > 0,
          mentions: tasks,
        })
      }
    } catch (err) {
      setError('Fehler bei LLM Mentions Check')
    }

    setLoading(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">AI Visibility</h1>
        <p className="text-secondary-600 mt-1">
          Überwache deine Sichtbarkeit in Google AI Overviews und KI-Systemen (ChatGPT, Claude,
          etc.)
        </p>
      </div>

      {/* AI Overview Check */}
      <div className="bg-white rounded-xl border border-secondary-200 p-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Google AI Overview Check</h2>
        <p className="text-sm text-secondary-600 mb-4">
          Prüft, ob für ein Keyword ein AI Overview angezeigt wird und welche Quellen zitiert
          werden.
        </p>
        <div className="flex gap-4">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="z.B. Gebäudereinigung Bamberg"
            className="flex-1 px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            onKeyDown={(e) => e.key === 'Enter' && checkAIOverview()}
          />
          <button
            onClick={checkAIOverview}
            disabled={loading || !keyword.trim()}
            className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Prüfe...' : 'AI Overview prüfen'}
          </button>
        </div>
      </div>

      {/* AI Overview Result */}
      {aiOverviewResult && (
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                aiOverviewResult.hasAIOverview
                  ? 'bg-green-100 text-green-600'
                  : 'bg-secondary-100 text-secondary-400'
              }`}
            >
              {aiOverviewResult.hasAIOverview ? '✓' : '✗'}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-secondary-900">
                {aiOverviewResult.hasAIOverview
                  ? 'AI Overview vorhanden'
                  : 'Kein AI Overview gefunden'}
              </h3>
              <p className="text-secondary-600">
                für "{keyword}" ({aiOverviewResult.totalResults.toLocaleString()} Ergebnisse)
              </p>
            </div>
          </div>

          {aiOverviewResult.aiOverview?.references && (
            <div className="mb-6">
              <h4 className="font-medium text-secondary-900 mb-3">Zitierte Quellen:</h4>
              <div className="space-y-2">
                {aiOverviewResult.aiOverview.references.map((ref, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border ${
                      ref.domain?.includes('shinytouch')
                        ? 'bg-green-50 border-green-200'
                        : 'bg-secondary-50 border-secondary-200'
                    }`}
                  >
                    <div className="font-medium text-secondary-900">{ref.title}</div>
                    <div className="text-sm text-secondary-500">{ref.domain}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {aiOverviewResult.featuredSnippet && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-2">Featured Snippet gefunden:</h4>
              <p className="text-sm text-yellow-800">{aiOverviewResult.featuredSnippet.title}</p>
              <p className="text-xs text-yellow-600 mt-1">
                {aiOverviewResult.featuredSnippet.url}
              </p>
            </div>
          )}
        </div>
      )}

      {/* LLM Mentions Check */}
      <div className="bg-white rounded-xl border border-secondary-200 p-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">LLM Mentions Tracking</h2>
        <p className="text-sm text-secondary-600 mb-4">
          Überwacht, wie KI-Systeme (ChatGPT, Claude, Perplexity) über deine Marke sprechen.
        </p>
        <div className="flex gap-4">
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="z.B. ShinyTouch"
            className="flex-1 px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            onKeyDown={(e) => e.key === 'Enter' && checkLLMMentions()}
          />
          <button
            onClick={checkLLMMentions}
            disabled={loading || !brand.trim()}
            className="px-6 py-3 bg-secondary-100 text-secondary-700 font-medium rounded-lg hover:bg-secondary-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Prüfe...' : 'LLM Mentions prüfen'}
          </button>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Hinweis:</strong> LLM Mentions Tracking kostet ca. $0.10 pro Request. Nutze es
            sparsam für wichtige Brand-Checks.
          </p>
        </div>
      </div>

      {/* LLM Result */}
      {llmResult && (
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <h3 className="font-semibold text-secondary-900 mb-4">
            LLM Mentions für "{brand}"
          </h3>
          {llmResult.found && llmResult.mentions ? (
            <div className="space-y-4">
              {llmResult.mentions.map((mention, idx) => (
                <div key={idx} className="p-4 bg-secondary-50 rounded-lg">
                  <div className="text-sm text-secondary-500 mb-2">Prompt:</div>
                  <div className="text-secondary-900 mb-3">{mention.prompt}</div>
                  <div className="text-sm text-secondary-500 mb-2">Antwort:</div>
                  <div className="text-secondary-700 text-sm">{mention.response}</div>
                  {mention.sentiment && (
                    <div className="mt-2">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          mention.sentiment === 'positive'
                            ? 'bg-green-100 text-green-700'
                            : mention.sentiment === 'negative'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {mention.sentiment}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary-600">Keine Erwähnungen gefunden.</p>
          )}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>
      )}

      {/* GEO Tips */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6">
        <h2 className="text-lg font-semibold text-purple-900 mb-3">
          GEO 2026: Tipps für AI Sichtbarkeit
        </h2>
        <ul className="text-sm text-purple-800 space-y-2">
          <li>
            <strong>1. 300-Zeichen-Regel:</strong> Beantworte Fragen direkt nach H2-Überschriften in
            max. 300 Zeichen.
          </li>
          <li>
            <strong>2. FAQPage Schema:</strong> Nutze strukturierte Daten für häufige Fragen auf
            jeder Seite.
          </li>
          <li>
            <strong>3. Faktische Aussagen:</strong> KIs bevorzugen klare, belegbare Informationen.
          </li>
          <li>
            <strong>4. Expertise zeigen:</strong> Author-Schema und E-E-A-T Signale stärken.
          </li>
          <li>
            <strong>5. robots.txt:</strong> GPTBot, ClaudeBot und andere KI-Crawler erlauben.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default function AIVisibilityPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-secondary-500">Laden...</div>}>
      <AIVisibilityContent />
    </Suspense>
  )
}
