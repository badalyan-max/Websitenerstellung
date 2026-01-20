/**
 * DataForSEO API Client
 *
 * Für SEO-Recherche und Content-Optimierung
 * Benötigt: DATAFORSEO_LOGIN und DATAFORSEO_PASSWORD in .env.local
 */

const DATAFORSEO_LOGIN = process.env.DATAFORSEO_LOGIN || ''
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD || ''

const DATAFORSEO_AUTH = Buffer.from(
  `${DATAFORSEO_LOGIN}:${DATAFORSEO_PASSWORD}`
).toString('base64')

interface DataForSEOResponse<T> {
  version: string
  status_code: number
  status_message: string
  time: string
  cost: number
  tasks_count: number
  tasks_error: number
  tasks: Array<{
    id: string
    status_code: number
    status_message: string
    time: string
    cost: number
    result_count: number
    path: string[]
    data: any
    result: T[]
  }>
}

interface RelatedKeyword {
  keyword: string
  keyword_info: {
    search_volume: number
    competition: number
    cpc: number
  }
}

interface PeopleAlsoAskItem {
  type: 'people_also_ask'
  title: string
  items: Array<{
    title: string
    expanded_element: Array<{
      type: string
      featured_title: string
      description: string
    }>
  }>
}

/**
 * Basis-Funktion für DataForSEO API Calls
 */
export async function callDataForSEO<T>(
  endpoint: string,
  data: any[]
): Promise<DataForSEOResponse<T>> {
  if (!DATAFORSEO_LOGIN || !DATAFORSEO_PASSWORD) {
    throw new Error(
      'DataForSEO credentials not configured. Add DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD to .env.local'
    )
  }

  const response = await fetch(`https://api.dataforseo.com${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${DATAFORSEO_AUTH}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`DataForSEO Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

/**
 * Keyword-Recherche für Stadt-Seiten
 * Holt verwandte Keywords für "Gebäudereinigung {Stadt}"
 */
export async function getRelatedKeywords(keyword: string, city: string) {
  return callDataForSEO<RelatedKeyword[]>(
    '/v3/dataforseo_labs/google/related_keywords/live',
    [
      {
        keyword: `${keyword} ${city}`,
        language_code: 'de',
        location_code: 2276, // Deutschland
        limit: 20,
      },
    ]
  )
}

/**
 * People Also Ask für FAQ-Content
 * Holt Fragen aus den SERPs die echte Nutzer stellen
 */
export async function getPeopleAlsoAsk(keyword: string) {
  const response = await callDataForSEO<any>(
    '/v3/serp/google/organic/live/advanced',
    [
      {
        keyword,
        location_code: 2276, // Deutschland
        language_code: 'de',
      },
    ]
  )

  // Filtere nur People Also Ask Elemente
  const items = response.tasks?.[0]?.result?.[0]?.items || []
  return items.filter((item: any) => item.type === 'people_also_ask') as PeopleAlsoAskItem[]
}

/**
 * Suchvolumen für ein Keyword abfragen
 */
export async function getSearchVolume(keywords: string[]) {
  return callDataForSEO<any>(
    '/v3/dataforseo_labs/google/search_volume/live',
    [
      {
        keywords,
        language_code: 'de',
        location_code: 2276,
      },
    ]
  )
}

/**
 * SERP Position für Website prüfen
 */
export async function checkSERPPosition(keyword: string, domain: string) {
  const response = await callDataForSEO<any>(
    '/v3/serp/google/organic/live/regular',
    [
      {
        keyword,
        location_code: 2276,
        language_code: 'de',
        depth: 100,
      },
    ]
  )

  const items = response.tasks?.[0]?.result?.[0]?.items || []
  const position = items.findIndex((item: any) =>
    item.domain?.includes(domain) || item.url?.includes(domain)
  )

  return {
    found: position !== -1,
    position: position === -1 ? null : position + 1,
    items: items.slice(0, 10),
  }
}

/**
 * OnPage Audit mit GPTBot User-Agent
 * Prüft ob KI-Crawler die Seite lesen können
 */
export async function runOnPageAudit(url: string) {
  return callDataForSEO<any>('/v3/on_page/task_post', [
    {
      target: url,
      custom_user_agent:
        'Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)',
      validate_micromarkup: true,
      enable_javascript: true,
      load_resources: true,
    },
  ])
}

/**
 * Verbindungstest für DataForSEO API
 */
export async function testConnection(): Promise<boolean> {
  try {
    const response = await callDataForSEO<any>('/v3/appendix/user_data', [])
    return response.status_code === 20000
  } catch {
    return false
  }
}
