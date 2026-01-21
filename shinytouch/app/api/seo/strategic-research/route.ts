import { NextResponse } from 'next/server'
import {
  getPeopleAlsoAsk,
  checkSERPPosition,
  checkAIOverview,
} from '@/lib/dataforseo'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Strategic SEO Research API
 *
 * Runs 10 strategic queries with minimal API cost (~$0.05 total)
 * Extracts insights that can be applied to ALL 500+ pages
 *
 * Cost breakdown:
 * - 5 SERP queries (PAA): ~$0.025
 * - 3 AI Overview checks: ~$0.015
 * - 2 Position checks: ~$0.01
 * Total: ~$0.05
 */

interface ResearchResult {
  timestamp: string
  totalCost: number
  peopleAlsoAsk: {
    keyword: string
    questions: string[]
  }[]
  aiOverview: {
    keyword: string
    hasAIOverview: boolean
    details: any
  }[]
  positions: {
    keyword: string
    position: number | null
    found: boolean
  }[]
  insights: {
    newFAQSuggestions: string[]
    aiOverviewTriggers: string[]
    rankingBaseline: string
  }
}

// Strategic keywords for maximum insight with minimal cost
const STRATEGIC_KEYWORDS = {
  // These PAA queries give insights applicable to ALL pages
  peopleAlsoAsk: [
    'Was kostet Gebäudereinigung pro Stunde',    // Price questions -> all city pages
    'Treppenhausreinigung Kosten pro Monat',     // Object type questions
    'Baureinigung nach Renovierung',              // Service-specific
    'Gebäudereinigung Bamberg',                   // Home market
    'professionelle Glasreinigung Preis',         // Service pricing
  ],

  // Check if these trigger Google AI Overviews
  aiOverview: [
    'Gebäudereinigung München Kosten',
    'Was kostet Gebäudereinigung pro Stunde',
    'Büroreinigung Berlin',
  ],

  // Baseline ranking positions
  positions: [
    'Gebäudereinigung Bamberg',   // Home market
    'Gebäudereinigung München',   // Target market
  ],
}

const DOMAIN = 'shinytouchgebaeudereinigung.de'

export async function POST() {
  try {
    const result: ResearchResult = {
      timestamp: new Date().toISOString(),
      totalCost: 0,
      peopleAlsoAsk: [],
      aiOverview: [],
      positions: [],
      insights: {
        newFAQSuggestions: [],
        aiOverviewTriggers: [],
        rankingBaseline: '',
      },
    }

    // Phase 1: People Also Ask queries (5x ~$0.005 = $0.025)
    console.log('Running People Also Ask queries...')
    for (const keyword of STRATEGIC_KEYWORDS.peopleAlsoAsk) {
      try {
        const paaResult = await getPeopleAlsoAsk(keyword)
        const questions: string[] = []

        if (Array.isArray(paaResult) && paaResult.length > 0) {
          for (const paa of paaResult) {
            if (paa.items) {
              for (const item of paa.items) {
                if (item.title) {
                  questions.push(item.title)
                }
              }
            }
          }
        }

        result.peopleAlsoAsk.push({ keyword, questions })
        result.insights.newFAQSuggestions.push(...questions)
        result.totalCost += 0.005

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.error(`PAA error for "${keyword}":`, error)
        result.peopleAlsoAsk.push({ keyword, questions: [] })
      }
    }

    // Phase 2: AI Overview checks (3x ~$0.005 = $0.015)
    console.log('Running AI Overview checks...')
    for (const keyword of STRATEGIC_KEYWORDS.aiOverview) {
      try {
        const aiResult = await checkAIOverview(keyword)

        result.aiOverview.push({
          keyword,
          hasAIOverview: aiResult.hasAIOverview,
          details: aiResult.aiOverview,
        })

        if (aiResult.hasAIOverview) {
          result.insights.aiOverviewTriggers.push(keyword)
        }

        result.totalCost += 0.005
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.error(`AI Overview error for "${keyword}":`, error)
        result.aiOverview.push({ keyword, hasAIOverview: false, details: null })
      }
    }

    // Phase 3: Position checks (2x ~$0.005 = $0.01)
    console.log('Running position checks...')
    for (const keyword of STRATEGIC_KEYWORDS.positions) {
      try {
        const posResult = await checkSERPPosition(keyword, DOMAIN)

        result.positions.push({
          keyword,
          position: posResult.position,
          found: posResult.found,
        })

        result.totalCost += 0.005
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.error(`Position error for "${keyword}":`, error)
        result.positions.push({ keyword, position: null, found: false })
      }
    }

    // Generate ranking baseline summary
    result.insights.rankingBaseline = result.positions
      .map(p => `${p.keyword}: ${p.found ? `Position ${p.position}` : 'Nicht gefunden'}`)
      .join('; ')

    // Deduplicate FAQ suggestions
    result.insights.newFAQSuggestions = [...new Set(result.insights.newFAQSuggestions)]

    return NextResponse.json({
      success: true,
      data: result,
      summary: {
        totalQueries: 10,
        estimatedCost: `$${result.totalCost.toFixed(3)} (~${(result.totalCost * 0.95).toFixed(2)}€)`,
        newFAQsFound: result.insights.newFAQSuggestions.length,
        aiOverviewKeywords: result.insights.aiOverviewTriggers.length,
        rankingBaseline: result.insights.rankingBaseline,
      },
    })
  } catch (error) {
    console.error('Strategic Research Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    name: 'Strategic SEO Research',
    description: 'Runs 10 strategic queries with minimal cost (~$0.05)',
    keywords: STRATEGIC_KEYWORDS,
    estimatedCost: '$0.05 (~0.05€)',
    usage: 'POST /api/seo/strategic-research',
  })
}
