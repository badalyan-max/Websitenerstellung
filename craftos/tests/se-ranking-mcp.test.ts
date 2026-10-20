import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { createClient, McpError, parseRetryAfter, redact } from '../scripts/lib/se-ranking-mcp.mjs'

// MCP-Client gegen gemockten fetch: keine Netzaufrufe, Testschlüssel statt .env.
const KEY = 'test-schluessel-123'
interface RpcBody { jsonrpc: string; id?: number; method: string; params?: { name?: string } }
type Reply = Response | Error

const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } })
const ok = (id: number | undefined, result: unknown) => json(200, { jsonrpc: '2.0', id, result })
const toolOk = (id: number | undefined, data: unknown) => ok(id, { content: [{ type: 'text', text: JSON.stringify(data) }] })

// toolReplies: Antworten für tools/call in Reihenfolge; initialize/notifications laufen automatisch durch.
function setup(toolReplies: ((b: RpcBody) => Reply)[]) {
  const toolCalls: RpcBody[] = []
  const sleeps: number[] = []
  const fetch = async (_url: string, init: { body: string }) => {
    const body = JSON.parse(init.body) as RpcBody
    if (body.method === 'initialize') return ok(body.id, { protocolVersion: '2025-06-18' })
    if (body.method === 'notifications/initialized') return new Response(null, { status: 202 })
    toolCalls.push(body)
    const next = toolReplies.shift()
    if (!next) throw new Error('keine weitere Antwort vorgesehen')
    const r = next(body)
    if (r instanceof Error) throw r
    return r
  }
  const client = createClient({
    apiKey: KEY,
    fetch: fetch as unknown as typeof globalThis.fetch,
    sleep: async (ms: number) => {
      sleeps.push(ms)
    },
    random: () => 0,
    pauseMs: 0,
  })
  return { client, toolCalls, sleeps }
}

const fail = async (p: Promise<unknown>) => {
  try {
    await p
  } catch (err) {
    return err as McpError
  }
  throw new Error('kein Fehler geworfen')
}

describe('Backoff des MCP-Clients (MD-01)', () => {
  it('wiederholt lesende Tools bei 503 exponentiell und liefert dann das Ergebnis', async () => {
    const { client, toolCalls, sleeps } = setup([
      () => json(503, { error: 'unavailable' }),
      () => json(502, { error: 'bad gateway' }),
      (b) => toolOk(b.id, { data: [] }),
    ])
    expect(await client.callTool('PROJECT_listKeywords', { site_id: 1 })).toEqual({ data: [] })
    expect(toolCalls).toHaveLength(3)
    expect(sleeps).toEqual([1000, 2000])
  })

  it('beachtet Retry-After (Sekunden) bei 429', async () => {
    const { client, sleeps } = setup([
      () => json(429, {}, { 'retry-after': '7' }),
      (b) => toolOk(b.id, { ok: true }),
    ])
    await client.callTool('DATA_getSubscription', {})
    expect(sleeps).toEqual([7000])
  })

  it('wiederholt bei Netzwerkfehler, Timeout und JSON-RPC-Code 50000 für lesende Tools', async () => {
    const timeout = Object.assign(new Error('The operation was aborted due to timeout'), { name: 'TimeoutError' })
    const { client, toolCalls, sleeps } = setup([
      () => new TypeError('fetch failed'),
      () => timeout,
      (b) => json(200, { jsonrpc: '2.0', id: b.id, error: { code: 50000, message: 'Internal error' } }),
      (b) => toolOk(b.id, { data: [1] }),
    ])
    expect(await client.callTool('PROJECT_listPrompts', { site_id: 1, llm_id: 2 })).toEqual({ data: [1] })
    expect(toolCalls).toHaveLength(4)
    expect(sleeps).toEqual([1000, 2000, 4000])
  })

  it('wiederholt Tool-Fehler mit Status 5xx bei lesenden Tools', async () => {
    const { client, toolCalls } = setup([
      (b) => ok(b.id, { isError: true, content: [{ type: 'text', text: 'HTTP 503 Service Unavailable' }] }),
      (b) => toolOk(b.id, { data: [] }),
    ])
    await client.callTool('PROJECT_listCompetitors', { site_id: 1 })
    expect(toolCalls).toHaveLength(2)
  })

  it('gibt nach erschöpften Wiederholungen den letzten Fehler weiter', async () => {
    const { client, toolCalls, sleeps } = setup(Array.from({ length: 5 }, () => () => json(503, {})))
    const err = await fail(client.callTool('PROJECT_listKeywords', { site_id: 1 }))
    expect(err).toBeInstanceOf(McpError)
    expect(err.status).toBe(503)
    expect(toolCalls).toHaveLength(5)
    expect(sleeps).toEqual([1000, 2000, 4000, 8000])
  })

  it('wiederholt nicht idempotente Mutationen nach 503/Timeout nicht und markiert sie als unklar', async () => {
    const a = setup([() => json(503, {})])
    const e1 = await fail(a.client.callTool('PROJECT_addKeywords', { site_id: 1, keywords: [] }))
    expect(a.toolCalls).toHaveLength(1)
    expect(e1.ambiguous).toBe(true)
    expect(e1.message).toMatch(/Ergebnis unklar/)

    const b = setup([() => Object.assign(new Error('aborted'), { name: 'TimeoutError' })])
    const e2 = await fail(b.client.callTool('PROJECT_addKeywords', { site_id: 1, keywords: [] }))
    expect(b.toolCalls).toHaveLength(1)
    expect(e2.kind).toBe('timeout')
    expect(e2.ambiguous).toBe(true)
  })

  it('wiederholt Mutationen bei 429 (sicher nicht verarbeitet) und das idempotente updateKeyword bei 503', async () => {
    const a = setup([() => json(429, {}), (b) => toolOk(b.id, { added: 1 })])
    expect(await a.client.callTool('PROJECT_addKeywords', { site_id: 1, keywords: [] })).toEqual({ added: 1 })
    expect(a.toolCalls).toHaveLength(2)

    const b = setup([() => json(503, {}), (r) => toolOk(r.id, { success: true })])
    await b.client.callTool('PROJECT_updateKeyword', { site_id: 1, keyword_id: 2, keyword: 'x' })
    expect(b.toolCalls).toHaveLength(2)
  })

  it('wartet nicht auf ein Retry-After über 60 s', async () => {
    const { client, sleeps } = setup([() => json(429, {}, { 'retry-after': '3600' })])
    const err = await fail(client.callTool('PROJECT_listKeywords', { site_id: 1 }))
    expect(err.message).toMatch(/Retry-After 3600 s/)
    expect(sleeps).toEqual([])
  })

  it('wiederholt Client-Fehler (400/401/403) nicht', async () => {
    const { client, toolCalls } = setup([() => json(403, { error: 'Forbidden' })])
    const err = await fail(client.callTool('PROJECT_listKeywords', { site_id: 1 }))
    expect(err.status).toBe(403)
    expect(toolCalls).toHaveLength(1)
  })

  it('entfernt den Schlüssel aus Fehlermeldungen', async () => {
    const { client } = setup([() => json(401, { error: `Invalid token ${KEY}` })])
    const err = await fail(client.callTool('PROJECT_listKeywords', { site_id: 1 }))
    expect(err.message).not.toContain(KEY)
    expect(err.message).toContain('[entfernt]')
  })

  it('parseRetryAfter versteht Sekunden und HTTP-Datum', () => {
    const now = Date.parse('2026-10-21T10:00:00Z')
    expect(parseRetryAfter('3', now)).toBe(3000)
    expect(parseRetryAfter('Wed, 21 Oct 2026 10:00:05 GMT', now)).toBe(5000)
    expect(parseRetryAfter('unsinn', now)).toBeNull()
    expect(parseRetryAfter(null, now)).toBeNull()
  })
})

describe('Schlüssel nie in Fehlertexten (MD-02)', () => {
  it('redact ersetzt jedes Vorkommen und lässt Text ohne Schlüssel unverändert', () => {
    expect(redact(`Invalid token ${KEY}; header Token ${KEY}`, KEY)).toBe('Invalid token [entfernt]; header Token [entfernt]')
    expect(redact('kein Schlüssel', KEY)).toBe('kein Schlüssel')
    expect(redact(undefined, KEY)).toBe('')
  })

  it('keyword-research.mjs gibt API-Fehlerkörper nur über errorText (redact) aus', () => {
    const src = fs.readFileSync(path.join(import.meta.dirname, '../scripts/keyword-research.mjs'), 'utf8')
    expect(src).toMatch(/import \{ redact \} from "\.\/lib\/se-ranking-mcp\.mjs"/)
    // Jede Ausgabe eines Antwortkörpers läuft über errorText(body); kein roher body?.message mehr in console.error.
    const fehlerAusgaben = src.split('\n').filter((l) => l.includes('console.error(') && /body/.test(l))
    expect(fehlerAusgaben.length).toBeGreaterThan(0)
    for (const l of fehlerAusgaben) expect(l).toMatch(/errorText\(body\)/)
    // fetch liegt in try/catch; Netzwerkfehler werden ebenfalls bereinigt.
    expect(src).toMatch(/Netzwerkfehler bei \$\{method\} \$\{endpoint\}: \$\{redact\(err\?\.message, apiKey\)\}/)
  })
})
