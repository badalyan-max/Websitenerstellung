/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser regression suite. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')
const AxeBuilder = require('@axe-core/playwright').default

/**
 * Funktionsdetailseiten und Mobile-App-Seite im Browser (Phase 7, Plan 07-08; D-06, D-13, D-14, D-15, D-19).
 * Die 22 Detailpfade kommen zur Laufzeit aus /sitemap.xml, dazu /app. Geprüft werden Above the fold
 * (07-UI-SPEC „Above-the-fold-Kriterien“), axe in fünf Breiten, CLS und reduzierte Bewegung, Kennzeichnung
 * und Kurzform-Belege, die FeatureSnippet-Bindung, die Darstellung ohne JavaScript und die App-Seite.
 * Testnamen-Präfixe („Detailseite:“, „App-Seite:“, „Gutter:“) erlauben das Filtern per -g.
 * Läuft nur lokal gegen next start; externe Requests werden abgebrochen.
 */

const DETAIL_COUNT = 22
const SNIPPET_SLUGS = ['dashboard', 'angebote', 'plantafel', 'rechnungen', 'eingangsrechnungen', 'zeiterfassung', 'lager', 'aufmass']
const SAMPLE_PATHS = ['/funktionen/angebote', '/funktionen/mahnwesen', '/funktionen/terminplanung', '/app']
const DETAIL_SECTIONS = ['kopf', 'ablauf', 'rollen', 'kernpunkte', 'faq', 'verwandt', 'cta']
const APP_SECTIONS = ['kopf', 'zeit', 'kennzahlen', 'dokumentieren', 'offline', 'material', 'faq', 'cta']
const FRAME_LABEL = 'Vereinfachte Darstellung mit Beispieldaten'
const FRAME_FIGURES = 'figure[data-figure="phone"], figure[data-figure="browser"], figure[data-figure="pair"], figure[data-figure="snippet"]'
const EVIDENCE = /^(web|app):[^\s/]+$/
const SOURCE = /^(site|register):[A-Za-z0-9.-]+$/

test.beforeEach(async ({ page, baseURL }) => {
  const origin = new URL(baseURL).origin
  await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
})

/** Alle Detailpfade /funktionen/<slug> aus der Sitemap (genau 22) plus /app. */
async function sitePaths(request) {
  const response = await request.get('/sitemap.xml')
  expect(response.ok()).toBe(true)
  const xml = await response.text()
  const details = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname)
    .filter((p) => /^\/funktionen\/[a-z0-9-]+$/.test(p)))]
  expect(details, 'Detailseiten in der Sitemap').toHaveLength(DETAIL_COUNT)
  return [...details, '/app']
}

async function severeAxe(page) {
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  return result.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.impact} ${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(', ')}`)
}

async function measureKopf(page) {
  return page.evaluate(() => {
    const box = (el) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { top: r.top, bottom: r.bottom, width: r.width }
    }
    const kopf = document.querySelector('[data-funktions-kopf]')
    const h1 = kopf.querySelector('h1')
    const keyword = h1.querySelector('[data-keyword]')
    const cta = kopf.querySelector('a.v2-btn-cta[data-track="trial"]')
    return {
      h1: box(h1),
      lead: box(h1.nextElementSibling),
      cta: box(cta),
      figure: box(kopf.querySelector('figure')),
      fontSize: parseFloat(getComputedStyle(h1).fontSize),
      keywordRects: keyword ? keyword.getClientRects().length : 0,
      keywordWidth: keyword ? keyword.getBoundingClientRect().width : Infinity,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }
  })
}

function expectVisibleInFold(m, vp, at) {
  for (const key of ['h1', 'lead', 'cta']) {
    expect(m[key], `${at}: ${key} vorhanden`).not.toBeNull()
    expect(m[key].top, `${at}: ${key} oben`).toBeGreaterThanOrEqual(0)
    expect(m[key].bottom, `${at}: ${key} unten`).toBeLessThanOrEqual(vp.height)
  }
  expect(m.keywordRects, `${at}: Kopfwort in einem Rechteck`).toBe(1)
  expect(m.keywordWidth, `${at}: Kopfwort passt in die H1`).toBeLessThanOrEqual(m.h1.width + 0.5)
  expect(m.overflow, `${at}: kein horizontaler Scroll`).toBeLessThanOrEqual(1)
}

test('Detailseite: Above the fold bei 360 × 640 (H1, Kurznutzen, CTA, Kopfwort, kein Querscroll)', async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Breite wird im Desktop-Projekt per setViewportSize geprüft.')
  test.setTimeout(180_000)
  const paths = await sitePaths(request)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const vp = { width: 360, height: 640 }
  await page.setViewportSize(vp)
  const report = []
  for (const path of paths) {
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    const m = await measureKopf(page)
    const at = `${path} 360×640`
    expectVisibleInFold(m, vp, at)
    expect(m.fontSize, `${at}: H1 28 px`).toBe(28)
    report.push(`${path}: CTA bis ${Math.round(m.cta.bottom)}`)
  }
  testInfo.annotations.push({ type: 'Above the fold 360', description: report.join(' | ') })
})

test('Detailseite: Above the fold Breiten (390, 768, 1024, 1440) für Stichprobe und /app', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Breiten werden im Desktop-Projekt per setViewportSize geprüft.')
  test.setTimeout(120_000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const viewports = [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ]
  for (const vp of viewports) {
    await page.setViewportSize(vp)
    for (const path of SAMPLE_PATHS) {
      await page.goto(path)
      await page.evaluate(() => document.fonts.ready)
      const m = await measureKopf(page)
      const at = `${path} ${vp.width}×${vp.height}`
      expectVisibleInFold(m, vp, at)
      expect(m.figure, `${at}: Kopf-figure vorhanden`).not.toBeNull()
      expect(m.figure.top, `${at}: Oberkante der Kopf-figure sichtbar`).toBeLessThan(vp.height)
    }
  }
})

test('Detailseite: axe bei 390 ohne serious/critical auf allen Detailseiten und /app', async ({ page, request }, testInfo) => {
  test.skip(!testInfo.project.use.hasTouch, 'Die 390-px-Prüfung läuft im Touch-Projekt.')
  test.setTimeout(240_000)
  const paths = await sitePaths(request)
  // Ruhiger Endzustand: Zwischenstände der FeatureSnippet-Animation (gedimmte Schritte) sind dekorativ und
  // aria-hidden; geprüft wird die statische Darstellung wie bei reduzierter Bewegung und ohne JavaScript.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const findings = []
  for (const path of paths) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    for (const v of await severeAxe(page)) findings.push(`${path}: ${v}`)
  }
  expect(findings).toEqual([])
})

test('Detailseite: axe in fünf Breiten (360, 768, 1024, 1440) für Stichprobe und /app', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Breiten werden im Desktop-Projekt per setViewportSize geprüft.')
  test.setTimeout(240_000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const findings = []
  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const path of SAMPLE_PATHS) {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      for (const v of await severeAxe(page)) findings.push(`${path} ${width}: ${v}`)
    }
  }
  expect(findings).toEqual([])
})

test('Detailseite: CLS 0 und reduzierte Bewegung auf allen Detailseiten und /app', async ({ page, request, browserName }, testInfo) => {
  test.setTimeout(240_000)
  const paths = await sitePaths(request)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(() => {
    window.__cls = 0
    window.__clsSupported = PerformanceObserver.supportedEntryTypes.includes('layout-shift')
    if (window.__clsSupported) {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__cls += entry.value
      }).observe({ type: 'layout-shift', buffered: true })
    }
  })
  let supported = true
  for (const path of paths) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await new Promise((resolve) => setTimeout(resolve, 40))
      }
      window.scrollTo(0, document.documentElement.scrollHeight)
      await new Promise((resolve) => setTimeout(resolve, 150))
    })
    supported = await page.evaluate(() => window.__clsSupported)
    if (supported) expect(await page.evaluate(() => window.__cls), `${path}: CLS`).toBe(0)
    // Auf eine Bedingung warten statt auf eine feste Zeit: Unter Volllast kann ein Übergang kurz nachlaufen.
    await expect.poll(() => page.evaluate(() => document.getAnimations().map((a) => {
      const el = a.effect && a.effect.target
      const where = el ? `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]}` : '?'
      return `${where} ${a.transitionProperty || a.animationName || a.constructor.name} ${a.playState}`
    })), { message: `${path}: keine Animationen bei reduzierter Bewegung`, timeout: 5_000 }).toEqual([])
    const sections = page.locator('[data-abschnitt]')
    const count = await sections.count()
    expect(count, `${path}: Abschnitte`).toBeGreaterThanOrEqual(7)
    for (let i = 0; i < count; i++) await expect(sections.nth(i), `${path}: Abschnitt ${i + 1} sichtbar`).toBeVisible()
  }
  if (!supported) testInfo.annotations.push({ type: 'hinweis', description: `${browserName} meldet keine layout-shift-Einträge; nur Animationen und Sichtbarkeit geprüft.` })
})

test('Detailseite: Kennzeichnung und Kurzform-Belege, FeatureSnippet nur auf 8 Seiten, feste Abschnittsfolge', async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'DOM-Prüfung im Desktop-Projekt.')
  test.setTimeout(180_000)
  const paths = await sitePaths(request)
  const snippetPages = []
  for (const path of paths) {
    await page.goto(path)
    const data = await page.evaluate(({ selector }) => ({
      figures: [...document.querySelectorAll(selector)].map((f) => ({ kind: f.dataset.figure, text: f.textContent })),
      evidence: [...document.querySelectorAll('[data-evidence]')].map((el) => el.getAttribute('data-evidence')),
      sources: [...document.querySelectorAll('[data-source]')].map((el) => el.getAttribute('data-source')),
      snippets: document.querySelectorAll('figure[data-figure="snippet"]').length,
      sections: [...document.querySelectorAll('[data-abschnitt]')].map((el) => el.getAttribute('data-abschnitt')),
    }), { selector: FRAME_FIGURES })
    expect(data.figures.length, `${path}: Rahmen vorhanden`).toBeGreaterThan(0)
    for (const f of data.figures) expect(f.text, `${path}: figure ${f.kind} gekennzeichnet`).toContain(FRAME_LABEL)
    for (const e of data.evidence) expect(e, `${path}: data-evidence`).toMatch(EVIDENCE)
    for (const s of data.sources) expect(s, `${path}: data-source`).toMatch(SOURCE)
    if (data.snippets > 0) snippetPages.push(path.replace('/funktionen/', ''))
    expect(data.snippets, `${path}: höchstens ein Snippet`).toBeLessThanOrEqual(1)
    expect(data.sections, `${path}: Abschnittsfolge`).toEqual(path === '/app' ? APP_SECTIONS : DETAIL_SECTIONS)
  }
  expect(snippetPages.sort()).toEqual([...SNIPPET_SLUGS].sort())
})

test('Detailseite: ohne JavaScript sind H1, CTA, FAQ-Fragen und alle Abschnitte sichtbar', async ({ browser, baseURL }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Einmal je Engine im Desktop-Projekt.')
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport: { width: 1440, height: 1000 } })
  const origin = new URL(baseURL).origin
  await context.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
  const page = await context.newPage()
  try {
    for (const path of ['/funktionen/angebote', '/funktionen/terminplanung', '/app']) {
      await page.goto(path)
      await expect(page.locator('h1'), path).toHaveCount(1)
      await expect(page.locator('h1'), path).toBeVisible()
      await expect(page.locator('[data-funktions-kopf] a.v2-btn-cta[data-track="trial"]'), path).toBeVisible()
      const questions = page.locator('[data-abschnitt="faq"] summary')
      expect(await questions.count(), `${path}: FAQ-Fragen`).toBeGreaterThanOrEqual(3)
      for (let i = 0; i < await questions.count(); i++) await expect(questions.nth(i), `${path}: Frage ${i + 1}`).toBeVisible()
      const sections = page.locator('[data-abschnitt]')
      for (let i = 0; i < await sections.count(); i++) await expect(sections.nth(i), `${path}: Abschnitt ${i + 1}`).toBeVisible()
    }
  } finally {
    await context.close()
  }
})

test('App-Seite: Store-Links bei 390 und 1440, QR-Codes erst ab 1024 px', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Breiten werden im Desktop-Projekt per setViewportSize geprüft.')
  const kopf = page.locator('[data-funktions-kopf]')
  const qr = kopf.locator('img[alt="QR-Code zum App Store"], img[alt="QR-Code zum Google Play Store"]')
  const stores = [kopf.getByRole('link', { name: 'CraftOS für iOS im App Store' }), kopf.getByRole('link', { name: 'CraftOS für Android bei Google Play' })]
  for (const [width, qrVisible] of [[390, false], [768, false], [1024, true], [1440, true]]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/app')
    if (width === 390 || width === 1440) for (const link of stores) await expect(link, `${width}: Store-Link`).toBeVisible()
    await expect(qr, `${width}: zwei QR-Bilder im DOM`).toHaveCount(2)
    for (let i = 0; i < 2; i++) {
      if (qrVisible) await expect(qr.nth(i), `${width}: QR sichtbar`).toBeVisible()
      else await expect(qr.nth(i), `${width}: QR verborgen`).toBeHidden()
    }
  }
})
