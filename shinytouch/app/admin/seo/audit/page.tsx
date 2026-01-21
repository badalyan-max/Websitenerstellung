'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface AuditResult {
  crawl_status?: string
  fetch_time?: number
  content_type?: string
  status_code?: number
  page_timing?: {
    time_to_interactive?: number
    dom_complete?: number
  }
  meta?: {
    title?: string
    description?: string
    canonical?: string
  }
  checks?: {
    no_title?: boolean
    title_too_long?: boolean
    no_description?: boolean
    description_too_long?: boolean
    no_h1_tag?: boolean
    duplicate_h1?: boolean
    no_content?: boolean
  }
  microdata?: {
    errors?: number
    warnings?: number
    schema_types?: string[]
  }
}

const PRESET_URLS = [
  { label: 'Homepage', url: 'https://www.shinytouchgebaeudereinigung.de' },
  { label: 'Büroreinigung', url: 'https://www.shinytouchgebaeudereinigung.de/service/bueroreinigung' },
  { label: 'Bamberg', url: 'https://www.shinytouchgebaeudereinigung.de/bamberg' },
  { label: 'FAQ', url: 'https://www.shinytouchgebaeudereinigung.de/faq' },
]

function OnPageAuditContent() {
  const searchParams = useSearchParams()
  const initialUrl = searchParams.get('url') || ''

  const [url, setUrl] = useState(initialUrl)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AuditResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [taskId, setTaskId] = useState<string | null>(null)

  async function runAudit() {
    if (!url.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'audit',
          params: { url },
        }),
      })
      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        // OnPage API returns task_id for async processing
        const task = data.tasks?.[0]
        if (task?.id) {
          setTaskId(task.id)
          setResult({
            crawl_status: 'pending',
          })
          // Note: In production, you'd poll for results
          setError('Audit gestartet. Task ID: ' + task.id + ' - Ergebnisse sind in 1-2 Minuten verfügbar.')
        } else if (task?.result) {
          setResult(task.result[0])
        }
      }
    } catch (err) {
      setError('Fehler beim Audit')
    }

    setLoading(false)
  }

  function getStatusBadge(status: boolean | undefined, label: string, invertLogic = false) {
    const isOk = invertLogic ? status : !status
    return (
      <div
        className={`flex items-center gap-2 p-3 rounded-lg ${
          isOk ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}
      >
        <span className="text-lg">{isOk ? '✓' : '✗'}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">OnPage Audit</h1>
        <p className="text-secondary-600 mt-1">
          Prüfe deine Seiten auf technische SEO-Fehler mit GPTBot User-Agent Simulation.
        </p>
      </div>

      {/* URL Input */}
      <div className="bg-white rounded-xl border border-secondary-200 p-6">
        <label className="block text-sm font-medium text-secondary-700 mb-2">URL zum Prüfen</label>
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.shinytouchgebaeudereinigung.de"
            className="flex-1 px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            onKeyDown={(e) => e.key === 'Enter' && runAudit()}
          />
          <button
            onClick={runAudit}
            disabled={loading || !url.trim()}
            className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Prüfe...' : 'Audit starten'}
          </button>
        </div>

        {/* Preset URLs */}
        <div className="mt-4">
          <span className="text-sm text-secondary-500 mr-3">Schnellauswahl:</span>
          <div className="inline-flex flex-wrap gap-2 mt-2">
            {PRESET_URLS.map((preset) => (
              <button
                key={preset.url}
                onClick={() => setUrl(preset.url)}
                className="px-3 py-1 text-sm bg-secondary-100 text-secondary-600 rounded-full hover:bg-secondary-200 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-200">
          {error}
        </div>
      )}

      {/* Info about GPTBot */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Was wird geprüft?</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>GPTBot Simulation:</strong> Kann OpenAIs KI-Crawler die Seite lesen?</li>
          <li>• <strong>Schema-Markup:</strong> JSON-LD Validierung (Organization, FAQPage, etc.)</li>
          <li>• <strong>Meta-Tags:</strong> Title, Description, Canonical URL</li>
          <li>• <strong>Performance:</strong> Time to Interactive, DOM Complete</li>
          <li>• <strong>Content-Checks:</strong> H1-Tag, Content-Länge, Duplicate Content</li>
        </ul>
      </div>

      {/* Results */}
      {result && result.crawl_status !== 'pending' && (
        <div className="space-y-6">
          {/* Status Overview */}
          <div className="bg-white rounded-xl border border-secondary-200 p-6">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Crawl Status</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-secondary-50 rounded-lg">
                <div className="text-sm text-secondary-500">Status</div>
                <div className="text-xl font-bold text-secondary-900">
                  {result.status_code || '-'}
                </div>
              </div>
              <div className="p-4 bg-secondary-50 rounded-lg">
                <div className="text-sm text-secondary-500">Fetch Time</div>
                <div className="text-xl font-bold text-secondary-900">
                  {result.fetch_time ? `${result.fetch_time}ms` : '-'}
                </div>
              </div>
              <div className="p-4 bg-secondary-50 rounded-lg">
                <div className="text-sm text-secondary-500">Content Type</div>
                <div className="text-xl font-bold text-secondary-900">
                  {result.content_type || '-'}
                </div>
              </div>
            </div>
          </div>

          {/* SEO Checks */}
          {result.checks && (
            <div className="bg-white rounded-xl border border-secondary-200 p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">SEO Checks</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {getStatusBadge(result.checks.no_title, 'Title Tag vorhanden')}
                {getStatusBadge(result.checks.title_too_long, 'Title Länge OK')}
                {getStatusBadge(result.checks.no_description, 'Meta Description vorhanden')}
                {getStatusBadge(result.checks.description_too_long, 'Description Länge OK')}
                {getStatusBadge(result.checks.no_h1_tag, 'H1 Tag vorhanden')}
                {getStatusBadge(result.checks.duplicate_h1, 'Kein Duplicate H1')}
                {getStatusBadge(result.checks.no_content, 'Content vorhanden')}
              </div>
            </div>
          )}

          {/* Schema Markup */}
          {result.microdata && (
            <div className="bg-white rounded-xl border border-secondary-200 p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Schema Markup</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div
                  className={`p-4 rounded-lg ${
                    result.microdata.errors === 0 ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <div className="text-sm text-secondary-500">Fehler</div>
                  <div
                    className={`text-2xl font-bold ${
                      result.microdata.errors === 0 ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    {result.microdata.errors}
                  </div>
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    result.microdata.warnings === 0 ? 'bg-green-50' : 'bg-yellow-50'
                  }`}
                >
                  <div className="text-sm text-secondary-500">Warnungen</div>
                  <div
                    className={`text-2xl font-bold ${
                      result.microdata.warnings === 0 ? 'text-green-700' : 'text-yellow-700'
                    }`}
                  >
                    {result.microdata.warnings}
                  </div>
                </div>
              </div>
              {result.microdata.schema_types && result.microdata.schema_types.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-secondary-700 mb-2">
                    Gefundene Schema-Typen:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.microdata.schema_types.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Meta Tags */}
          {result.meta && (
            <div className="bg-white rounded-xl border border-secondary-200 p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Meta Tags</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-secondary-500 mb-1">Title</div>
                  <div className="p-3 bg-secondary-50 rounded-lg text-secondary-900">
                    {result.meta.title || '-'}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-secondary-500 mb-1">Description</div>
                  <div className="p-3 bg-secondary-50 rounded-lg text-secondary-900">
                    {result.meta.description || '-'}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-secondary-500 mb-1">Canonical</div>
                  <div className="p-3 bg-secondary-50 rounded-lg text-secondary-900 break-all">
                    {result.meta.canonical || '-'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function OnPageAuditPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-secondary-500">Laden...</div>}>
      <OnPageAuditContent />
    </Suspense>
  )
}
