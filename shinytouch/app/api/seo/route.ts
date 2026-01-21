import { NextRequest, NextResponse } from 'next/server'
import {
  getRelatedKeywords,
  getPeopleAlsoAsk,
  getSearchVolume,
  checkSERPPosition,
  runOnPageAudit,
  testConnection,
  checkAIOverview,
  trackLLMMentions,
  batchCheckSERP,
  analyzeContentGap,
  analyzeKeywordIntent,
} from '@/lib/dataforseo'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type SEOAction =
  | 'test-connection'
  | 'related-keywords'
  | 'people-also-ask'
  | 'search-volume'
  | 'serp-position'
  | 'batch-serp'
  | 'audit'
  | 'ai-overview'
  | 'llm-mentions'
  | 'content-gap'
  | 'keyword-intent'

interface SEORequest {
  action: SEOAction
  params?: Record<string, any>
}

export async function POST(request: NextRequest) {
  try {
    const body: SEORequest = await request.json()
    const { action, params = {} } = body

    switch (action) {
      case 'test-connection': {
        const isConnected = await testConnection()
        return NextResponse.json({ success: isConnected })
      }

      case 'related-keywords': {
        const { keyword, city } = params
        if (!keyword) {
          return NextResponse.json({ error: 'keyword is required' }, { status: 400 })
        }
        const result = await getRelatedKeywords(keyword, city || '')
        return NextResponse.json(result)
      }

      case 'people-also-ask': {
        const { keyword } = params
        if (!keyword) {
          return NextResponse.json({ error: 'keyword is required' }, { status: 400 })
        }
        const result = await getPeopleAlsoAsk(keyword)
        return NextResponse.json(result)
      }

      case 'search-volume': {
        const { keywords } = params
        if (!keywords || !Array.isArray(keywords)) {
          return NextResponse.json({ error: 'keywords array is required' }, { status: 400 })
        }
        const result = await getSearchVolume(keywords)
        return NextResponse.json(result)
      }

      case 'serp-position': {
        const { keyword, domain } = params
        if (!keyword || !domain) {
          return NextResponse.json({ error: 'keyword and domain are required' }, { status: 400 })
        }
        const result = await checkSERPPosition(keyword, domain)
        return NextResponse.json(result)
      }

      case 'batch-serp': {
        const { keywords, domain } = params
        if (!keywords || !Array.isArray(keywords) || !domain) {
          return NextResponse.json(
            { error: 'keywords array and domain are required' },
            { status: 400 }
          )
        }
        const result = await batchCheckSERP(keywords, domain)
        return NextResponse.json(result)
      }

      case 'audit': {
        const { url } = params
        if (!url) {
          return NextResponse.json({ error: 'url is required' }, { status: 400 })
        }
        const result = await runOnPageAudit(url)
        return NextResponse.json(result)
      }

      case 'ai-overview': {
        const { keyword } = params
        if (!keyword) {
          return NextResponse.json({ error: 'keyword is required' }, { status: 400 })
        }
        const result = await checkAIOverview(keyword)
        return NextResponse.json(result)
      }

      case 'llm-mentions': {
        const { brand, prompts } = params
        if (!brand) {
          return NextResponse.json({ error: 'brand is required' }, { status: 400 })
        }
        const result = await trackLLMMentions(brand, prompts)
        return NextResponse.json(result)
      }

      case 'content-gap': {
        const { ourDomain, competitorDomains } = params
        if (!ourDomain || !competitorDomains || !Array.isArray(competitorDomains)) {
          return NextResponse.json(
            { error: 'ourDomain and competitorDomains array are required' },
            { status: 400 }
          )
        }
        const result = await analyzeContentGap(ourDomain, competitorDomains)
        return NextResponse.json(result)
      }

      case 'keyword-intent': {
        const { keywords } = params
        if (!keywords || !Array.isArray(keywords)) {
          return NextResponse.json({ error: 'keywords array is required' }, { status: 400 })
        }
        const result = await analyzeKeywordIntent(keywords)
        return NextResponse.json(result)
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
    }
  } catch (error) {
    console.error('SEO API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    name: 'ShinyTouch SEO API',
    version: '1.0.0',
    actions: [
      'test-connection',
      'related-keywords',
      'people-also-ask',
      'search-volume',
      'serp-position',
      'batch-serp',
      'audit',
      'ai-overview',
      'llm-mentions',
      'content-gap',
      'keyword-intent',
    ],
    documentation: 'POST with { action: "action-name", params: { ... } }',
  })
}
