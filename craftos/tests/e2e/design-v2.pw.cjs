/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS runner supports an explicit Playwright installation in another worktree. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')
const AxeBuilder = require('@axe-core/playwright').default

/**
 * Designsystem v2 im Browser (Phase 5, Plan 05-06): Musterseite /styleguide, reduzierte Bewegung (DESIGN-04)
 * und Bildbudget mit CLS (MEDIA-04). Läuft ausschließlich lokal gegen einen Produktionsserver.
 */

const WIDTHS = [360, 390, 768, 1024, 1440]
const BLOCKS = [
  'Designbausteine v2', 'Tokens', 'SectionHeader', 'BentoGrid', 'StepFlow', 'KeyFacts', 'FeatureCard',
  'Geräterahmen', 'ComparisonTable', 'Badges', 'FaqList', 'MediaFigure', 'Videoplayer', 'CtaBand',
]
const LABELS = ['Vereinfachte Darstellung mit Beispieldaten', 'Darstellung, KI-gestaltet']
const BUDGET_ROUTES = ['/', '/funktionen', '/app', '/gewerke', '/preise', '/vergleich', '/funktionen/angebote', '/funktionen/mahnwesen', '/funktionen/terminplanung', '/styleguide']
const LIMIT = 150 * 1024
/** Begründete PNG-Ausnahmen, identisch mit EXCEPTIONS in tests/media-budget.test.ts. */
const PNG_EXCEPTIONS = ['/icons/icon-192x192.png', '/icons/icon-512x512.png', '/images/brands/craftnote.png']

test.beforeEach(async ({ page, baseURL }) => {
  const origin = new URL(baseURL).origin
  await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
})

async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
    window.scrollTo(0, document.documentElement.scrollHeight)
    await new Promise((resolve) => setTimeout(resolve, 150))
    window.scrollTo(0, 0)
  })
}

test.describe('styleguide', () => {
  test('styleguide: HTTP 200, noindex, X-Robots-Tag und nicht in der Sitemap', async ({ page }) => {
    const response = await page.goto('/styleguide')
    expect(response.status()).toBe(200)
    expect(response.headers()['x-robots-tag']).toBe('noindex, nofollow')
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveCount(1)
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow')
    // Kein seitenspezifisches JSON-LD: nur die seitenweiten Angaben des Root-Layouts.
    const ldTypes = await page.locator('script[type="application/ld+json"]').evaluateAll((els) =>
      els.flatMap((el) => { const data = JSON.parse(el.textContent); return [].concat(data['@graph'] || data).map((x) => x['@type']) }))
    expect(ldTypes.filter((t) => !['Organization', 'SoftwareApplication'].includes(t))).toEqual([])
    const sitemap = await page.request.get('/sitemap.xml')
    expect(sitemap.ok()).toBe(true)
    expect(await sitemap.text()).not.toContain('/styleguide')
    const robotsTxt = await (await page.request.get('/robots.txt')).text()
    expect(robotsTxt).not.toContain('styleguide')
  })

  test('styleguide: kein horizontaler Seitenscroll und axe ohne serious/critical', async ({ page }, testInfo) => {
    test.setTimeout(150_000)
    const widths = testInfo.project.use.hasTouch ? [testInfo.project.use.viewport.width] : WIDTHS
    for (const width of widths) {
      if (!testInfo.project.use.hasTouch) await page.setViewportSize({ width, height: 1000 })
      // Je Breite frisch laden: WebKit behält nach dem Verkleinern sonst die alte Scrollbreite.
      await page.goto('/styleguide')
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow, `Seitenscroll bei ${width} px`).toBeLessThanOrEqual(1)
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
      const severe = result.violations
        .filter((v) => v.impact === 'serious' || v.impact === 'critical')
        .map((v) => `${v.impact} ${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(', ')}`)
      expect(severe, `axe bei ${width} px`).toEqual([])
    }
  })

  test('styleguide: Kennzeichnung an jedem Rahmen und Phone-Tabs wie im Release', async ({ page }) => {
    await page.goto('/styleguide')
    const figures = page.locator('figure:has([data-evidence]), figure[data-evidence]')
    const count = await figures.count()
    expect(count).toBeGreaterThanOrEqual(10)
    for (let i = 0; i < count; i += 1) {
      const text = await figures.nth(i).innerText()
      expect(LABELS.some((label) => text.includes(label)), `Rahmen ${i} ohne Kennzeichnung`).toBe(true)
    }
    const evidence = await page.locator('[data-evidence]').evaluateAll((els) => els.map((el) => el.getAttribute('data-evidence')))
    expect(evidence.every((e) => /^(web|app):[^\s/]+$/.test(e))).toBe(true)
    const tabs = await page.locator('[data-frame="phone"]').first().locator('[data-tab]').evaluateAll((els) => els.map((el) => el.getAttribute('data-tab')))
    expect(tabs).toEqual(['Einsätze', 'Zeiten', 'Projekte', 'Mehr'])
    const ki = page.locator('[data-block="MediaFigure"] figure')
    await expect(ki).toContainText('Darstellung, KI-gestaltet')
  })

  test('styleguide: Tastatur erreicht CTA und FAQ, Mini-UI wird nie fokussiert', async ({ page, browserName }, testInfo) => {
    test.skip(testInfo.project.use.hasTouch, 'Tastaturbedienung wird im Desktop-Projekt geprüft.')
    test.setTimeout(90_000)
    await page.goto('/styleguide')
    const key = browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
    const seen = []
    for (let i = 0; i < 160; i += 1) {
      await page.keyboard.press(key)
      const info = await page.evaluate(() => {
        const el = document.activeElement
        if (!el || el === document.body) return null
        return {
          tag: el.tagName,
          text: el.textContent.trim().slice(0, 60),
          cta: el.matches('[data-block="CtaBand"] a.v2-btn-cta'),
          inertOrHidden: !!el.closest('[inert], [aria-hidden="true"]'),
          frame: !!el.closest('[data-frame]'),
        }
      })
      if (info) seen.push(info)
      if (info && info.cta) break
    }
    if (browserName === 'webkit') {
      // WebKit überspringt Links bei Tab standardmäßig (Browsereinstellung); der CTA muss fokussierbar sein.
      const cta = page.locator('[data-block="CtaBand"] a.v2-btn-cta')
      await cta.focus()
      await expect(cta).toBeFocused()
    } else {
      expect(seen.some((s) => s.cta), 'CTA im CtaBand nicht per Tab erreichbar').toBe(true)
    }
    // WebKit beginnt die Tab-Kette nach dem Seitenende von vorn; deshalb eindeutige Fragen zählen.
    expect(new Set(seen.filter((s) => s.tag === 'SUMMARY').map((s) => s.text)).size).toBe(3)
    expect(seen.filter((s) => s.inertOrHidden || s.frame)).toEqual([])
  })
})

test.describe('reduzierte Bewegung', () => {
  test('reduzierte Bewegung: alle Bausteine sichtbar, keine laufenden Animationen', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/styleguide')
    await page.waitForLoadState('networkidle')
    for (const block of BLOCKS) await expect(page.locator(`[data-block="${block}"]`)).toBeVisible()
    const transparent = await page.evaluate(() =>
      [...document.querySelectorAll('[data-block], [data-block] :is(article, figure, ol, dl, table, details, header, ul)')]
        .filter((el) => getComputedStyle(el).opacity !== '1' || getComputedStyle(el).visibility === 'hidden')
        .map((el) => el.tagName + ' ' + (el.closest('[data-block]')?.getAttribute('data-block') || '')),
    )
    expect(transparent).toEqual([])
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0)
    await scrollThrough(page)
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0)
  })

  test('reduzierte Bewegung: ohne JavaScript sind alle Bausteine im HTML sichtbar', async ({ browser, baseURL }, testInfo) => {
    test.skip(testInfo.project.use.hasTouch, 'Die Serverausgabe ist unabhängig von Touch; beide Browser werden geprüft.')
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    const origin = new URL(baseURL).origin
    await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
    try {
      await page.goto(new URL('/styleguide', baseURL).href)
      for (const block of BLOCKS) await expect(page.locator(`[data-block="${block}"]`)).toBeVisible()
      await expect(page.locator('[data-block="BentoGrid"] article')).toHaveCount(5)
      await expect(page.locator('[data-block="StepFlow"] ol > li')).toHaveCount(12)
      await expect(page.locator('[data-block="KeyFacts"] dd')).toHaveCount(4)
      await expect(page.locator('[data-block="FaqList"] summary')).toHaveCount(3)
      await expect(page.locator('[data-block="ComparisonTable"] table')).toBeVisible()
      await expect(page.locator('[data-block="CtaBand"] a.v2-btn-cta')).toBeVisible()
    } finally { await context.close() }
  })
})

test.describe('Budget', () => {
  for (const route of BUDGET_ROUTES) {
    test(`Budget ${route}: Bilder höchstens 150 KB als AVIF/WebP/SVG, feste Maße, CLS 0`, async ({ page, browserName }) => {
      test.setTimeout(90_000)
      await page.addInitScript(() => {
        window.__cls = { value: 0, supported: false }
        try {
          if (PerformanceObserver.supportedEntryTypes?.includes('layout-shift')) {
            window.__cls.supported = true
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__cls.value += entry.value
            }).observe({ type: 'layout-shift', buffered: true })
          }
        } catch { /* Browser ohne Layout-Shift-API */ }
      })
      const images = []
      page.on('response', (response) => {
        if (response.request().resourceType() === 'image') images.push(response)
      })
      await page.goto(route)
      await page.waitForLoadState('networkidle')
      await scrollThrough(page)
      await page.waitForLoadState('networkidle')

      const problems = []
      for (const response of images) {
        const url = new URL(response.url())
        if (response.status() >= 300) {
          if (response.status() >= 400) problems.push(`${url.pathname}: HTTP ${response.status()}`)
          continue
        }
        const type = (response.headers()['content-type'] || '').split(';')[0]
        const body = await response.body().catch(() => null)
        const size = body ? body.length : Number(response.headers()['content-length'] || 0)
        const label = url.pathname === '/_next/image' ? `${url.searchParams.get('url')} (w=${url.searchParams.get('w')})` : url.pathname
        if (size > LIMIT) problems.push(`${label}: ${Math.round(size / 1024)} KB`)
        const allowedType = /^image\/(avif|webp|svg\+xml)$/.test(type) || (type === 'image/png' && PNG_EXCEPTIONS.includes(url.pathname))
        if (!allowedType) problems.push(`${label}: ${type}`)
      }
      expect(problems, `Bildbudget auf ${route}`).toEqual([])

      const unsized = await page.evaluate(() =>
        [...document.images]
          .filter((img) => img.getBoundingClientRect().width > 0)
          .filter((img) => !(img.getAttribute('width') && img.getAttribute('height')) && getComputedStyle(img).aspectRatio === 'auto')
          .map((img) => img.currentSrc || img.src),
      )
      expect(unsized, `Bilder ohne feste Maße auf ${route}`).toEqual([])

      const cls = await page.evaluate(() => window.__cls)
      if (cls.supported) expect(cls.value, `CLS auf ${route}`).toBe(0)
      else test.info().annotations.push({ type: 'CLS', description: `${browserName} meldet keine layout-shift-Einträge; CLS wird in Chromium geprüft.` })
    })
  }
})
