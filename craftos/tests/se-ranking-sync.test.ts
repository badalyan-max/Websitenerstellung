import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  apply,
  check,
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
    const r1 = await apply(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent })
    const r2 = await apply(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent })
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
    const r = await apply(p, soll, { reportDir: dir, datum: '2026-10-21', log: silent })
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
