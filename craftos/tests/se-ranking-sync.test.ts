import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { errorStatus, McpError, rowsOf } from '../scripts/lib/se-ranking-mcp.mjs'
import {
  apply,
  check,
  isLimitError,
  latestApplyFile,
  writeJsonUnique,
} from '../scripts/lib/se-ranking-sync-core.mjs'

// Gemockter SE-Ranking-Projektzustand: keine echten Aufrufe, kein Schlüssel.
interface Kw { id: number; name: string; link: string | null }
type Handler = (args: Record<string, unknown>) => unknown

function fakeProject(initial: Kw[], overrides: Record<string, Handler> = {}) {
  const keywords: Kw[] = initial.map((k) => ({ ...k }))
  let nextId = 1000
  const calls: { name: string; args: Record<string, unknown> }[] = []
  const handlers: Record<string, Handler> = {
    PROJECT_listKeywords: () => ({ data: keywords.map((k) => ({ ...k })) }),
    PROJECT_listCompetitors: () => ({ data: [] }),
    PROJECT_listLlmEngines: () => ({ data: [] }),
    PROJECT_updateKeyword: (a) => {
      const k = keywords.find((x) => x.id === a.keyword_id)!
      k.link = String(a.target_url)
      if (typeof a.keyword === 'string') k.name = a.keyword
      return { success: true }
    },
    PROJECT_addKeywords: (a) => {
      for (const k of a.keywords as { keyword: string; target_url: string }[])
        keywords.push({ id: nextId++, name: k.keyword, link: k.target_url })
      return { success: true }
    },
    ...overrides,
  }
  return {
    keywords,
    calls,
    callCount: 0,
    async callTool(name: string, args: Record<string, unknown>) {
      calls.push({ name, args })
      const h = handlers[name]
      if (!h) throw new Error(`unerwarteter Aufruf ${name}`)
      return h(args)
    },
  }
}

const soll = [
  { keyword: 'handwerkersoftware', url: 'https://craftos.eu/', status: 'bestehend', phase: null },
  { keyword: 'bautagebuch app', url: 'https://craftos.eu/funktionen/baudokumentation', status: 'bestehend', phase: null },
  { keyword: 'gaeb software', url: 'https://craftos.eu/funktionen/gaeb', status: 'geplant', phase: 7 },
]
const silent = () => {}

let dir: string
beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'se-sync-'))
})
afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true })
})
const readJson = (f: string) => JSON.parse(fs.readFileSync(f, 'utf8'))

describe('Berichte ohne Überschreiben (HI-01)', () => {
  it('writeJsonUnique hängt bei Kollision eine Laufnummer an und lässt die erste Datei unverändert', () => {
    const a = writeJsonUnique(dir, '2026-10-21-projektabgleich-apply', { lauf: 1 })
    const b = writeJsonUnique(dir, '2026-10-21-projektabgleich-apply', { lauf: 2 })
    const c = writeJsonUnique(dir, '2026-10-21-projektabgleich-apply', { lauf: 3 })
    expect(path.basename(a)).toBe('2026-10-21-projektabgleich-apply.json')
    expect(path.basename(b)).toBe('2026-10-21-projektabgleich-apply-2.json')
    expect(path.basename(c)).toBe('2026-10-21-projektabgleich-apply-3.json')
    expect(readJson(a)).toEqual({ lauf: 1 })
  })

  it('latestApplyFile sortiert nach Datum und Laufnummer (numerisch)', () => {
    for (const f of [
      '2026-10-20-projektabgleich-apply-12.json',
      '2026-10-21-projektabgleich-apply.json',
      '2026-10-21-projektabgleich-apply-2.json',
      '2026-10-21-projektabgleich-apply-10.json',
      '2026-10-21-projektabgleich.json',
    ])
      fs.writeFileSync(path.join(dir, f), '{}')
    expect(path.basename(latestApplyFile(dir)!)).toBe('2026-10-21-projektabgleich-apply-10.json')
  })

  it('zwei --apply-Läufe am selben Tag behalten beide Protokolle samt vorher-URLs', async () => {
    const p = fakeProject([
      { id: 1, name: 'handwerkersoftware', link: 'https://craftos.eu/' },
      { id: 2, name: 'bautagebuch app', link: 'https://craftos.eu/blog/digitale-bautagesberichte' },
      { id: 3, name: 'gaeb software', link: 'https://craftos.eu/funktionen/gaeb' },
    ])
    const r1 = await apply(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent, retarget: true })
    const r2 = await apply(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent, retarget: true })
    expect(r1.file).not.toBe(r2.file)
    expect(readJson(r1.file).zielseiteAngeglichen).toEqual([
      expect.objectContaining({ keyword: 'bautagebuch app', vorher: 'https://craftos.eu/blog/digitale-bautagesberichte' }),
    ])
    expect(readJson(r2.file).zielseiteAngeglichen).toEqual([])
  })

  it('--check überschreibt den Bericht desselben Tages nicht', async () => {
    const p = fakeProject([{ id: 1, name: 'handwerkersoftware', link: 'https://craftos.eu/' }])
    const r1 = await check(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent })
    const r2 = await check(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent })
    expect(path.basename(r1.file)).toBe('2026-10-21-projektabgleich.json')
    expect(path.basename(r2.file)).toBe('2026-10-21-projektabgleich-2.json')
  })
})

describe('Protokoll auch bei Abbruch (HI-02)', () => {
  const start = (): Kw[] => [
    { id: 1, name: 'handwerkersoftware', link: 'https://craftos.eu/vergleich' },
    { id: 2, name: 'bautagebuch app', link: 'https://craftos.eu/blog/digitale-bautagesberichte' },
  ]

  it('schreibt das Protokoll nach jeder Mutation fort und hält den Abbruch samt vorher-URL fest', async () => {
    let updates = 0
    let zwischenstand: { zielseiteAngeglichen: unknown[] } | null = null
    const p = fakeProject(start(), {
      PROJECT_updateKeyword: (a) => {
        updates++
        if (updates === 2) {
          const f = fs.readdirSync(dir).find((x) => x.includes('-apply'))!
          zwischenstand = readJson(path.join(dir, f))
          throw new Error('Netzwerkfehler bei tools/call: fetch failed')
        }
        p.keywords.find((k) => k.id === a.keyword_id)!.link = String(a.target_url)
        return { success: true }
      },
    })
    const r = await apply(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent, retarget: true })
    expect(zwischenstand!.zielseiteAngeglichen).toHaveLength(1)
    const prot = readJson(r.file)
    expect(r.code).toBe(1)
    expect(prot.status).toBe('abgebrochen')
    expect(prot.abgebrochen).toMatch(/fetch failed/)
    expect(prot.zielseiteAngeglichen).toEqual([
      expect.objectContaining({ keyword: 'handwerkersoftware', vorher: 'https://craftos.eu/vergleich', nachher: 'https://craftos.eu/' }),
    ])
    // Das fehlgeschlagene Update und das nicht mehr versuchte Hinzufügen bleiben offen, nicht als Limit.
    expect(prot.limits).toEqual([])
    expect(prot.fehlgeschlagen.map((f: { keyword: string }) => f.keyword).sort()).toEqual(['bautagebuch app', 'gaeb software'])
    expect(prot.verifikation).toMatch(/neu gelesen/)
    expect(p.calls.filter((c) => c.name === 'PROJECT_addKeywords')).toHaveLength(0)
  })

  it('erkennt ein trotz Timeout übernommenes Paket beim Neulesen als hinzugefügt', async () => {
    const p = fakeProject(start(), {
      PROJECT_addKeywords: (a) => {
        for (const k of a.keywords as { keyword: string; target_url: string }[])
          p.keywords.push({ id: 99, name: k.keyword, link: k.target_url })
        throw new Error('Zeitüberschreitung bei PROJECT_addKeywords')
      },
    })
    const r = await apply(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent })
    const prot = readJson(r.file)
    expect(prot.status).toBe('abgebrochen')
    expect(prot.hinzugefuegt.map((h: { keyword: string }) => h.keyword)).toEqual(['gaeb software'])
    expect(prot.unbestaetigt).toEqual([])
    expect(prot.fehlgeschlagen).toEqual([])
  })

  it('führt gesendete Pakete als unbestätigt, wenn der Projektstand danach nicht lesbar ist', async () => {
    let reads = 0
    const p = fakeProject(start(), {
      PROJECT_listKeywords: () => {
        reads++
        if (reads > 1) throw new Error('HTTP 503 bei tools/call')
        return { data: p.keywords.map((k) => ({ ...k })) }
      },
    })
    const r = await apply(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent })
    const prot = readJson(r.file)
    expect(r.code).toBe(1)
    expect(prot.status).toBe('unvollstaendig')
    expect(prot.verifikation).toMatch(/nicht lesbar/)
    expect(prot.unbestaetigt.map((u: { keyword: string }) => u.keyword)).toEqual(['gaeb software'])
  })
})

describe('Nur eindeutige Limits, stille Fehlschläge bleiben Fehler (HI-03)', () => {
  it('isLimitError erkennt nur 402 und klare Kontingenttexte', () => {
    const e = (msg: string, status: number | null = null) => new McpError(msg, { status })
    expect(isLimitError(e('Payment required', 402))).toBe(true)
    expect(isLimitError(e('Tool PROJECT_addKeywords meldet Fehler: Keyword limit reached for this project'))).toBe(true)
    expect(isLimitError(e('You have exceeded the keyword limit of your tariff', 403))).toBe(true)
    expect(isLimitError(e('Not enough units on balance'))).toBe(true)
    // Kein Limit: nacktes 403, Validierungsfehler mit „limit“/„exceeds“, fremde Fehlertypen.
    expect(isLimitError(e('Forbidden', 403))).toBe(false)
    expect(isLimitError(e("parameter 'limit' must be between 1 and 1000"))).toBe(false)
    expect(isLimitError(e('keyword length exceeds 255 characters'))).toBe(false)
    expect(isLimitError(new Error('Keyword limit reached'))).toBe(false)
  })

  it('errorStatus liest den Status nur aus eindeutigen Stellen', () => {
    expect(errorStatus({ status: 403, message: 'x' }, '')).toBe(403)
    expect(errorStatus({ error: { code: 402 } }, '')).toBe(402)
    expect(errorStatus('HTTP 503 Service Unavailable', 'HTTP 503 Service Unavailable')).toBe(503)
    expect(errorStatus('403 Forbidden', '403 Forbidden')).toBe(403)
    expect(errorStatus('', 'status: 429')).toBe(429)
    expect(errorStatus('', 'keyword_id 22299151 not found, limit 500 exceeded')).toBeNull()
    expect(errorStatus({ code: 50000 }, '')).toBeNull()
  })

  it('führt stillschweigend nicht übernommene Einträge unter fehlgeschlagen, nicht unter limits', async () => {
    const p = fakeProject([{ id: 1, name: 'handwerkersoftware', link: 'https://craftos.eu/' }], {
      PROJECT_addKeywords: () => ({ success: true }), // Server meldet Erfolg, übernimmt aber nichts
    })
    const r = await apply(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent })
    const prot = readJson(r.file)
    expect(r.code).toBe(1)
    expect(prot.limits).toEqual([])
    expect(prot.fehlgeschlagen.map((f: { keyword: string }) => f.keyword)).toEqual(['bautagebuch app', 'gaeb software'])
    expect(prot.fehlgeschlagen[0].fehler).toMatch(/Server meldete keinen Fehler/)
  })

  it('protokolliert echte Limits mit grund "limit" und Exit 0', async () => {
    const p = fakeProject([{ id: 1, name: 'handwerkersoftware', link: 'https://craftos.eu/' }], {
      PROJECT_addKeywords: () => {
        throw new McpError('Tool PROJECT_addKeywords meldet Fehler: keyword limit reached', { status: 403 })
      },
    })
    const r = await apply(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent })
    const prot = readJson(r.file)
    expect(r.code).toBe(0)
    expect(prot.fehlgeschlagen).toEqual([])
    expect(prot.limits.map((l: { keyword: string; grund: string }) => [l.keyword, l.grund])).toEqual([
      ['bautagebuch app', 'limit'],
      ['gaeb software', 'limit'],
    ])
  })

  it('--check nimmt nur grund "limit" aus und ignoriert Limits älter als 30 Tage', async () => {
    const p = fakeProject([{ id: 1, name: 'handwerkersoftware', link: 'https://craftos.eu/' }])
    const limit = { keyword: 'bautagebuch app', url: soll[1].url, status: 'bestehend', phase: null, art: 'fehlend', grund: 'limit' }
    const still = { keyword: 'gaeb software', url: soll[2].url, status: 'geplant', phase: 7, art: 'fehlend', fehler: 'nach --apply nicht übernommen' }
    fs.writeFileSync(path.join(dir, '2026-10-21-projektabgleich-apply.json'), JSON.stringify({ limits: [limit, still] }))
    const frisch = await check(p, soll, { reportDir: dir, datum: '2026-10-22', log: silent })
    expect(frisch.code).toBe(1)
    expect(frisch.report.limits).toHaveLength(1)
    expect(frisch.report.offenOhneLimit.map((o) => o.keyword)).toEqual(['gaeb software'])

    const alt = await check(p, soll, { reportDir: dir, datum: '2026-12-01', log: silent })
    expect(alt.report.limits).toEqual([])
    expect(alt.report.limitsHinweis).toMatch(/älter als 30 Tage/)
    expect(alt.report.offenOhneLimit).toHaveLength(2)
  })
})

describe('Keyword-Schreibweise bleibt erhalten, Zielseiten nur mit --retarget (MD-03)', () => {
  const start = (): Kw[] => [
    { id: 1, name: 'Handwerkersoftware', link: 'https://craftos.eu/vergleich' },
    { id: 2, name: 'bautagebuch app', link: 'https://craftos.eu/funktionen/baudokumentation' },
    { id: 3, name: 'gaeb software', link: 'https://craftos.eu/funktionen/gaeb' },
  ]

  it('ändert ohne --retarget keine Zielseite und listet die Abweichung nur auf', async () => {
    const p = fakeProject(start())
    const r = await apply(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent })
    const prot = readJson(r.file)
    expect(p.calls.some((c) => c.name === 'PROJECT_updateKeyword')).toBe(false)
    expect(prot.zielseiteNichtAngeglichen).toEqual([
      expect.objectContaining({ keyword: 'handwerkersoftware', istUrl: 'https://craftos.eu/vergleich', sollUrl: 'https://craftos.eu/' }),
    ])
    expect(prot.fehlgeschlagen).toEqual([])
    expect(r.code).toBe(0)
  })

  it('sendet mit --retarget den Original-Keywordtext und lässt die Schreibweise unverändert', async () => {
    const p = fakeProject(start())
    const r = await apply(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent, retarget: true })
    const upd = p.calls.find((c) => c.name === 'PROJECT_updateKeyword')!
    expect(upd.args).toEqual({ site_id: 13094375, keyword_id: 1, keyword: 'Handwerkersoftware', target_url: 'https://craftos.eu/' })
    expect(p.keywords[0].name).toBe('Handwerkersoftware')
    expect(readJson(r.file).schreibweiseGeaendert).toEqual([])
  })

  it('meldet eine serverseitig geänderte Schreibweise', async () => {
    const p = fakeProject(start(), {
      PROJECT_updateKeyword: (a) => {
        const k = p.keywords.find((x) => x.id === a.keyword_id)!
        k.link = String(a.target_url)
        k.name = k.name.toLowerCase()
        return { success: true }
      },
    })
    const r = await apply(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent, retarget: true })
    expect(readJson(r.file).schreibweiseGeaendert).toEqual([{ id: 1, vorher: 'Handwerkersoftware', nachher: 'handwerkersoftware' }])
  })
})

describe('Unerwartete Antworten brechen ab statt „leeres Projekt“ (MD-04)', () => {
  it('rowsOf akzeptiert Array, data und items und wirft bei anderer Form', () => {
    expect(rowsOf([1], 'x')).toEqual([1])
    expect(rowsOf({ data: [2] }, 'x')).toEqual([2])
    expect(rowsOf({ items: [3] }, 'x')).toEqual([3])
    expect(() => rowsOf({ keywords: [] }, 'PROJECT_listKeywords')).toThrow(/Antwortformat von PROJECT_listKeywords unbekannt/)
    expect(() => rowsOf('Fehlertext', 'x')).toThrow(/unbekannt/)
    expect(() => rowsOf(null, 'x')).toThrow(/unbekannt/)
  })

  it.each([
    ['unbekanntes Format', { keywords: [{ id: 1, name: 'handwerkersoftware' }] }, /Antwortformat/],
    ['leeres Projekt', { data: [] }, /0 Keywords/],
    ['Eintrag ohne Namen', { data: [{ id: 1, link: null }] }, /ohne gültige id\/name/],
    ['doppelte IDs', { data: [{ id: 1, name: 'a' }, { id: 1, name: 'b' }] }, /doppelte Keyword-IDs/],
  ])('apply bricht bei %s ohne jede Mutation ab', async (_fall, antwort, meldung) => {
    const p = fakeProject([], { PROJECT_listKeywords: () => antwort })
    await expect(apply(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent, retarget: true })).rejects.toThrow(meldung)
    expect(p.calls.map((c) => c.name)).toEqual(['PROJECT_listKeywords'])
    expect(fs.readdirSync(dir)).toEqual([])
  })

  it('liest KI-Prompts seitenweise statt bei 100 abzuschneiden', async () => {
    const p = fakeProject([{ id: 1, name: 'handwerkersoftware', link: 'https://craftos.eu/' }], {
      PROJECT_listLlmEngines: () => ({ data: [{ id: 7, base_name: 'ChatGPT' }] }),
      PROJECT_listPrompts: (a) => {
        const offset = Number(a.offset)
        const n = offset === 0 ? 100 : offset === 100 ? 30 : 0
        return { data: Array.from({ length: n }, (_, i) => ({ prompt: `p${offset + i}` })) }
      },
    })
    const r = await check(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent })
    expect(r.report.aiPrompts).toHaveLength(130)
    expect(p.calls.filter((c) => c.name === 'PROJECT_listPrompts').map((c) => c.args.offset)).toEqual([0, 100])
  })
})
