import { describe, expect, it } from 'vitest'
import {
  LEADERBOARD_TOOL,
  berichtszeileOhneLeaderboard,
  fuehreAbrufeAus,
  kiTrackerZeilen,
  kostenwarnung,
  leaderboardStand,
  letzteLeaderboardDatei,
  parseArgs,
  planeAbrufe,
  rawNamen,
  unitDifferenz,
} from '../scripts/lib/seo-report-core.mjs'

// Gemockter SE-Ranking-Client nach dem Muster fakeProject (tests/se-ranking-sync.test.ts):
// keine echten Aufrufe, kein Schlüssel; jede Anfrage und jede Wartezeit landet in `events`.
type Handler = (args: Record<string, unknown>) => unknown
function fakeClient(overrides: Record<string, Handler> = {}) {
  const calls: { name: string; args: Record<string, unknown> }[] = []
  const events: string[] = []
  let units = 18071
  const handlers: Record<string, Handler> = {
    DATA_getSubscription: () => ({ subscription_info: { units_left: units, units_limit: 100000 } }),
    PROJECT_listKeywords: () => ({ data: [{ id: 1, name: 'handwerkersoftware', link: 'https://craftos.eu/' }] }),
    PROJECT_getSearchEngines: () => ({ data: [{ site_engine_id: 490327 }] }),
    PROJECT_getKeywordStats: () => ({ data: [] }),
    PROJECT_listLlmEngines: () => ({
      data: [
        { id: 203632, base_name: 'chatgpt' },
        { id: 204127, base_name: 'perplexity' },
      ],
    }),
    PROJECT_getLlmStatus: (a) => ({
      llm_id: a.llm_id,
      progress: a.llm_id === 203632 ? 100 : 0,
      prompts_count: a.llm_id === 203632 ? 16 : 2,
      prompts_checked: a.llm_id === 203632 ? 16 : 0,
      last_update_date: a.llm_id === 203632 ? '2026-10-23' : null,
    }),
    PROJECT_getLlmStatistics: (a) => ({
      archetype: 'scorecard',
      tiles: [
        { key: 'link', value: a.llm_id === 203632 ? 6.25 : 0, delta: { value: -10.42 } },
        { key: 'mention', value: a.llm_id === 203632 ? 6.25 : 0, delta: { value: -10.42 } },
      ],
    }),
    DATA_getAiSearchLeaderboard: () => {
      units -= 7500
      return { leaderboard: [] }
    },
    DATA_getBacklinksSummary: () => {
      units -= 100
      return { summary: [{ target: 'craftos.eu', refdomains: 12 }] }
    },
    DATA_getBacklinksRefDomains: () => ({ refdomains: [] }),
    ...overrides,
  }
  return {
    calls,
    events,
    callCount: 0,
    async callTool(name: string, args: Record<string, unknown>) {
      calls.push({ name, args })
      events.push(`call:${name}`)
      const h = handlers[name]
      if (!h) throw new Error(`unerwarteter Aufruf ${name}`)
      return h(args)
    },
  }
}

const basis = {
  siteId: 13094375,
  baseDate: '2026-10-20',
  today: '2026-10-24',
  leaderboardParams: { primary: { target: 'craftos.eu', brand: 'CraftOS' }, competitors: [], source: 'de', engines: ['chatgpt'], scope: 'base_domain' },
}

describe('planeAbrufe und rawNamen (D-37)', () => {
  it('ohne Schalter kein DATA_getAiSearchLeaderboard, mit Schalter genau einmal', () => {
    expect(planeAbrufe({ leaderboard: false })).not.toContain(LEADERBOARD_TOOL)
    expect(LEADERBOARD_TOOL).toBe('DATA_getAiSearchLeaderboard')
    const mit = planeAbrufe({ leaderboard: true })
    expect(mit.filter((t: string) => t === 'DATA_getAiSearchLeaderboard')).toHaveLength(1)
  })

  it('Kontostand steht am Anfang und am Ende der Aufrufplanung', () => {
    for (const leaderboard of [false, true]) {
      const p = planeAbrufe({ leaderboard })
      expect(p[0]).toBe('DATA_getSubscription')
      expect(p[p.length - 1]).toBe('DATA_getSubscription')
    }
  })

  it('rawNamen ohne Schalter: kein ai-leaderboard, dafür ki-tracker; mit Schalter beide', () => {
    const ohne = rawNamen({ leaderboard: false })
    expect(ohne).not.toContain('ai-leaderboard')
    expect(ohne).toContain('ki-tracker')
    const mit = rawNamen({ leaderboard: true })
    expect(mit).toContain('ai-leaderboard')
    expect(mit).toContain('ki-tracker')
  })
})

describe('Texte', () => {
  it('kostenwarnung nennt den Endpunkt und die Kosten', () => {
    expect(kostenwarnung()).toBe(
      'Achtung: --leaderboard ruft DATA_getAiSearchLeaderboard ab – pauschal ca. 7.500 Units je Aufruf.',
    )
  })

  it('berichtszeileOhneLeaderboard nennt Schalter, Kosten und den letzten Wert mit Datum, ohne Schätzung', () => {
    const z = berichtszeileOhneLeaderboard({
      datum: '2026-10-23',
      datei: 'reports/2026-10-23-raw-rollout-phase09-ai-leaderboard.json',
      rang: 8,
      anzahl: 8,
      shareOfVoice: 0.0002,
      markennennungen: 1,
      linkzitate: 1,
    })
    expect(z.startsWith('KI-Leaderboard nicht abgerufen (Schalter --leaderboard, ca. 7.500 Units); letzter Wert vom 23.10.2026: ')).toBe(true)
    expect(z).toContain('Rang 8 von 8')
    expect(z).toContain('0,02 %')
    expect(z).toContain('reports/2026-10-23-raw-rollout-phase09-ai-leaderboard.json')
    expect(z).not.toMatch(/schätz|geschätzt|ca\. [0-9]+ %/i)
  })

  it('berichtszeileOhneLeaderboard ohne vorhandenen Wert sagt das ausdrücklich', () => {
    expect(berichtszeileOhneLeaderboard(null)).toBe(
      'KI-Leaderboard nicht abgerufen (Schalter --leaderboard, ca. 7.500 Units); letzter Wert: keine Rohdatei vorhanden.',
    )
  })

  it('unitDifferenz rechnet vorher minus nachher, sonst null', () => {
    const s = (n: number) => ({ subscription_info: { units_left: n } })
    expect(unitDifferenz(s(18071), s(17959))).toBe(112)
    expect(unitDifferenz(s(18071), s(18071))).toBe(0)
    expect(unitDifferenz(null, s(1))).toBeNull()
  })
})

describe('letzter Leaderboard-Stand', () => {
  it('wählt die jüngste Datei nach Datumspräfix, bei gleichem Datum die letzte nach Name', () => {
    const f = letzteLeaderboardDatei([
      'data/2026-10-20-ai-leaderboard.json',
      'reports/2026-10-23-raw-rollout-phase08-ai-leaderboard.json',
      'reports/2026-10-23-raw-rollout-phase09-ai-leaderboard.json',
      'reports/2026-10-22-raw-rollout-phase07-ai-leaderboard.json',
      'reports/2026-10-23-messbericht-rollout-phase09.md',
    ])
    expect(f).toEqual({ datum: '2026-10-23', datei: 'reports/2026-10-23-raw-rollout-phase09-ai-leaderboard.json' })
    expect(letzteLeaderboardDatei([])).toBeNull()
  })

  it('leaderboardStand liest den Eintrag der Hauptdomain', () => {
    const json = {
      leaderboard: [
        { rank: 1, domain: 'streit-software.de', share_of_voice: 0.4 },
        { rank: 8, domain: 'craftos.eu', share_of_voice: 0.0002, brand_presence: 1, link_presence: 1 },
      ],
    }
    expect(leaderboardStand(json, { datum: '2026-10-23', datei: 'x.json' }, 'craftos.eu')).toEqual({
      datum: '2026-10-23',
      datei: 'x.json',
      rang: 8,
      anzahl: 2,
      shareOfVoice: 0.0002,
      markennennungen: 1,
      linkzitate: 1,
    })
    expect(leaderboardStand({}, { datum: '2026-10-23', datei: 'x.json' }, 'craftos.eu')).toBeNull()
  })

  it('leaderboardStand liefert Datum und Quelle auch ohne Eintrag der Hauptdomain (LO-07)', () => {
    const json = { leaderboard: [{ rank: 1, domain: 'streit-software.de' }, { rank: 2, domain: 'hero-software.de' }] }
    const stand = leaderboardStand(json, { datum: '2026-10-23', datei: 'reports/x.json' }, 'craftos.eu')
    expect(stand).toEqual({ datum: '2026-10-23', datei: 'reports/x.json', rang: null, anzahl: 2, shareOfVoice: null, markennennungen: null, linkzitate: null })
    const zeile = berichtszeileOhneLeaderboard(stand)
    expect(zeile).toContain('nicht unter 2 Einträgen')
    expect(zeile).toContain('23.10.2026')
    expect(zeile).not.toContain('keine Rohdatei')
  })
})

describe('fuehreAbrufeAus mit gemocktem Client', () => {
  it('ohne Schalter: keine Leaderboard-Anfrage, KI-Tracker je Engine, Kontostand nachher erst nach der Wartezeit', async () => {
    const c = fakeClient()
    const warnungen: string[] = []
    const r = await fuehreAbrufeAus(c, {
      ...basis,
      leaderboard: false,
      warteMs: 5,
      sleep: async (ms: number) => {
        c.events.push(`sleep:${ms}`)
      },
      warn: (m: string) => warnungen.push(m),
    })
    expect(c.calls.map((x) => x.name)).not.toContain('DATA_getAiSearchLeaderboard')
    expect(warnungen).toEqual([])
    expect(r.raw['ai-leaderboard']).toBeUndefined()
    expect(Object.keys(r.raw).sort()).toEqual([...rawNamen({ leaderboard: false })].sort())
    // KI-Tracker: Statistik je Engine des Projekts
    const stats = c.calls.filter((x) => x.name === 'PROJECT_getLlmStatistics')
    expect(stats.map((x) => x.args.llm_id)).toEqual([203632, 204127])
    expect(stats[0].args).toMatchObject({ site_id: 13094375, from: '2026-10-20', to: '2026-10-24' })
    // Reihenfolge: Wartezeit unmittelbar vor dem letzten Kontostand
    const last = c.events.lastIndexOf('call:DATA_getSubscription')
    expect(c.events[last - 1]).toBe('sleep:5')
    expect(c.events.indexOf('sleep:5')).toBeGreaterThan(c.events.lastIndexOf('call:DATA_getBacklinksRefDomains'))
    expect(r.verbraucht).toBe(100)
  })

  it('Wartezeit 0 ms über die Option funktioniert ohne echte Pause', async () => {
    const c = fakeClient()
    const r = await fuehreAbrufeAus(c, { ...basis, leaderboard: false, warteMs: 0, warn: () => {} })
    expect(c.calls.filter((x) => x.name === 'DATA_getSubscription')).toHaveLength(2)
    expect(r.subAfter).toBeTruthy()
  })

  it('mit Schalter: Kostenwarnung vor genau einer Leaderboard-Anfrage', async () => {
    const c = fakeClient()
    const warnungen: string[] = []
    const r = await fuehreAbrufeAus(c, {
      ...basis,
      leaderboard: true,
      warteMs: 0,
      warn: (m: string) => {
        warnungen.push(m)
        c.events.push('warn')
      },
    })
    expect(c.calls.filter((x) => x.name === 'DATA_getAiSearchLeaderboard')).toHaveLength(1)
    expect(warnungen).toEqual([kostenwarnung()])
    expect(c.events.indexOf('warn')).toBe(c.events.indexOf('call:DATA_getAiSearchLeaderboard') - 1)
    expect(r.raw['ai-leaderboard']).toBeDefined()
    expect(Object.keys(r.raw).sort()).toEqual([...rawNamen({ leaderboard: true })].sort())
    expect(r.verbraucht).toBe(7600)
  })
})

describe('kiTrackerZeilen', () => {
  it('macht je Engine Prompts, geprüft, letzte Prüfung, Nennung und Link lesbar', () => {
    const z = kiTrackerZeilen({
      engines: [
        {
          id: 203632,
          name: 'chatgpt',
          status: { prompts_count: 16, prompts_checked: 16, last_update_date: '2026-10-23' },
          statistik: { tiles: [{ key: 'link', value: 6.25, delta: { value: -10.42 } }, { key: 'mention', value: 6.25 }] },
        },
        { id: 204127, name: 'perplexity', status: { prompts_count: 2, prompts_checked: 0, last_update_date: null }, statistik: null },
      ],
    })
    expect(z).toEqual([
      '| ChatGPT | 16 | 16 | 23.10.2026 | 6,25 % | 6,25 % |',
      '| Perplexity | 2 | 0 | nie geprüft | – | – |',
    ])
  })
})

describe('parseArgs', () => {
  it('Standard: ohne Leaderboard, Wartezeit 60 s', () => {
    expect(parseArgs(['--etappe', 'rollout-phase10'])).toEqual({ etappe: 'rollout-phase10', leaderboard: false, warteSek: 60, fehler: null })
  })
  it('--leaderboard und --warte=<sekunden>', () => {
    expect(parseArgs(['--etappe', 'x', '--leaderboard', '--warte=15'])).toMatchObject({ leaderboard: true, warteSek: 15, fehler: null })
  })
  it('ungültige Werte melden einen Fehler', () => {
    expect(parseArgs([]).fehler).toBeTruthy()
    expect(parseArgs(['--etappe', 'X Y']).fehler).toBeTruthy()
    expect(parseArgs(['--etappe', 'x', '--warte=-1']).fehler).toBeTruthy()
    expect(parseArgs(['--etappe', 'x', '--warte=abc']).fehler).toBeTruthy()
  })
})
