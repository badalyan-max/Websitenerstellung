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

// B10 (07-08): Große Kacheln mit Phone füllen ihre zwei Rasterzeilen; weder die Kachel noch ihre Nachbarn
// behalten einen Leerstreifen über 48 px (vorher bis 220 px auf /app, rund 100 px auf lager).
const B10_PATHS = ['/funktionen/lager', '/funktionen/baudokumentation', '/app']
const B10_MAX_LEER = 48

test('Detailseite: große Kacheln mit Phone ohne Leerstreifen (B10)', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Breiten werden im Desktop-Projekt per setViewportSize geprüft.')
  test.setTimeout(90_000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const report = []
  for (const width of [768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const path of B10_PATHS) {
      await page.goto(path)
      await page.evaluate(() => document.fonts.ready)
      const groups = await page.evaluate(() => {
        const measure = (t) => {
          const cs = getComputedStyle(t)
          const inner = t.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
          const [body, visual] = t.children
          const visualHeight = Math.max(0, ...[...visual.children].map((c) => c.getBoundingClientRect().height))
          const bodyHeight = body.getBoundingClientRect().height
          const content = cs.display === 'grid' ? Math.max(visualHeight, bodyHeight) : visualHeight + (parseFloat(cs.rowGap) || 0) + bodyHeight
          const r = t.getBoundingClientRect()
          const figure = visual.querySelector('figure')
          const f = figure ? figure.getBoundingClientRect() : null
          const phone = t.querySelector('[data-frame="phone"]')
          return {
            title: t.querySelector('h3').textContent.trim(),
            top: r.top,
            bottom: r.bottom,
            leer: Math.round(inner - content),
            inside: !f || (f.top >= r.top - 0.5 && f.bottom <= r.bottom + 0.5 && f.left >= r.left - 0.5 && f.right <= r.right + 0.5),
            phone: phone ? Math.round(phone.getBoundingClientRect().width) : null,
            // gekürzte Texte im Phone (Auslassungspunkte): Titel und Zeilen müssen ungekürzt bleiben
            cut: phone ? [...phone.querySelectorAll('*')].filter((el) => getComputedStyle(el).textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 0.5).map((el) => el.textContent.trim()) : [],
          }
        }
        return [...document.querySelectorAll('article[data-size="lg"]')]
          .filter((lg) => lg.querySelector('[data-frame="phone"]'))
          .map((lg) => {
            const self = measure(lg)
            const neighbours = [...lg.closest('ul').querySelectorAll('article[data-size]')]
              .filter((t) => t !== lg)
              .map(measure)
              .filter((t) => t.top >= self.top - 1 && t.bottom <= self.bottom + 1)
            return { self, neighbours }
          })
      })
      expect(groups.length, `${path} ${width}: große Kachel mit Phone`).toBeGreaterThan(0)
      for (const { self, neighbours } of groups) {
        const at = `${path} ${width}: ${self.title}`
        expect(self.phone, `${at}: Phone mindestens 160 px`).toBeGreaterThanOrEqual(160)
        expect(self.cut, `${at}: keine gekürzten Texte im Phone`).toEqual([])
        for (const t of [self, ...neighbours]) {
          expect(t.inside, `${at} / ${t.title}: Rahmen in der Kachel`).toBe(true)
          expect(t.leer, `${at} / ${t.title}: kein Überstand`).toBeGreaterThanOrEqual(-1)
          expect(t.leer, `${at} / ${t.title}: Leerraum`).toBeLessThanOrEqual(B10_MAX_LEER)
        }
        report.push(`${path} ${width}: Phone ${self.phone}, Leerraum ${[self, ...neighbours].map((t) => t.leer).join('/')}`)
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `${path} ${width}: kein Querscroll`).toBeLessThanOrEqual(1)
    }
  }
  testInfo.annotations.push({ type: 'B10', description: report.join(' | ') })
})

// D-14 (IN-07 aus Phase 6): scrollbar-gutter darf auf kurzen Seiten keine leere Rinne neben dunklem Header und
// Footer reservieren. Headless-Chromium blendet Scrollleisten aus (--hide-scrollbars); für klassische Leisten wie
// unter Windows startet der Fall deshalb einen eigenen Chromium ohne diesen Schalter. WebKit nutzt den Projektbrowser.
const GUTTER_PATHS = ['/impressum', '/datenschutz', '/gibt-es-nicht']
// 1920 × 1080: üblicher Windows-Desktop; dort ist die 404-Seite kürzer als das Fenster (Messung 07-08).
const GUTTER_VIEWPORTS = [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 1920, height: 1080 }]

test('Gutter: keine leere Rinne ohne Seitenüberlauf (Impressum, Datenschutz, 404)', async ({ browser, browserName, baseURL }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Einmal je Engine im Desktop-Projekt.')
  test.setTimeout(90_000)
  const { chromium } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')
  const own = browserName === 'chromium' ? await chromium.launch({ ignoreDefaultArgs: ['--hide-scrollbars'] }) : null
  const origin = new URL(baseURL).origin
  const findings = []
  try {
    for (const vp of GUTTER_VIEWPORTS) {
      const context = await (own || browser).newContext({ baseURL, viewport: vp, locale: 'de-DE' })
      await context.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
      const page = await context.newPage()
      for (const path of GUTTER_PATHS) {
        await page.goto(path)
        await page.evaluate(() => document.fonts.ready)
        const m = await page.evaluate(() => ({
          gutter: window.innerWidth - document.documentElement.clientWidth,
          // Chromium meldet die reservierte Rinne nicht in clientWidth; die Breite des Body-Layouts zeigt sie.
          layoutGutter: Math.round(window.innerWidth - document.body.getBoundingClientRect().width),
          overflow: document.documentElement.scrollHeight > window.innerHeight,
          scrollHeight: document.documentElement.scrollHeight,
          gutterRule: getComputedStyle(document.documentElement).scrollbarGutter || 'n/a',
        }))
        const name = `gutter-${browserName}-${vp.width}${path.replaceAll('/', '_')}.png`
        await page.screenshot({ path: testInfo.outputPath(name) })
        const line = `${browserName} ${vp.width}×${vp.height} ${path}: Rinne ${m.gutter} px (Layout ${m.layoutGutter} px), Überlauf ${m.overflow ? 'ja' : 'nein'} (scrollHeight ${m.scrollHeight}), scrollbar-gutter ${m.gutterRule}`
        testInfo.annotations.push({ type: 'Gutter', description: line })
        console.log(line)
        if (!m.overflow && (m.gutter !== 0 || m.layoutGutter !== 0)) findings.push(line)
      }
      await context.close()
    }
  } finally {
    if (own) await own.close()
  }
  expect(findings, 'leere Rinne ohne Seitenüberlauf').toEqual([])
})

test('Gutter: Drawer-Scroll-Lock ohne Seitensprung mit klassischen Scrollleisten', async ({ baseURL, browserName }, testInfo) => {
  test.skip(browserName !== 'chromium' || testInfo.project.use.hasTouch, 'Klassische Scrollleisten nur im eigenen Chromium ohne --hide-scrollbars.')
  const { chromium } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')
  const own = await chromium.launch({ ignoreDefaultArgs: ['--hide-scrollbars'] })
  const origin = new URL(baseURL).origin
  try {
    for (const path of ['/impressum', '/gibt-es-nicht']) {
      const context = await own.newContext({ baseURL, viewport: { width: 390, height: 844 }, locale: 'de-DE' })
      await context.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
      const page = await context.newPage()
      await page.goto(path)
      const state = () => page.evaluate(() => ({
        body: document.body.getBoundingClientRect().width,
        header: document.querySelector('header').getBoundingClientRect().width,
        gutter: document.documentElement.style.scrollbarGutter,
        overflow: document.documentElement.style.overflow,
      }))
      const before = await state()
      await page.getByRole('button', { name: 'Menü öffnen' }).click()
      await expect(page.getByRole('button', { name: 'Menü schließen' })).toBeVisible()
      const open = await state()
      expect(open.overflow, `${path}: Scroll-Lock aktiv`).toBe('hidden')
      expect(open.body, `${path}: Seite springt beim Sperren nicht`).toBe(before.body)
      expect(open.header, `${path}: Header springt beim Sperren nicht`).toBe(before.header)
      await page.getByRole('button', { name: 'Menü schließen' }).click()
      await expect(page.getByRole('button', { name: 'Menü öffnen' })).toBeVisible()
      const closed = await state()
      expect(closed, `${path}: Zustand nach dem Schließen wie vorher`).toEqual(before)
      console.log(`Drawer ${path} 390: Body ${before.body} → offen ${open.body} (Gutter „${open.gutter}“) → zu ${closed.body}`)
      testInfo.annotations.push({ type: 'Gutter', description: `${path} 390: Body ${before.body} → offen ${open.body} (Gutter „${open.gutter}“) → zu ${closed.body}` })
      await context.close()
    }
  } finally {
    await own.close()
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
