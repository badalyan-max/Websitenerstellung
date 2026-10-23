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
  'Geräterahmen', 'ComparisonTable', 'Badges', 'FitPanels', 'FactList', 'FaqList', 'MediaFigure', 'Videoplayer', 'CtaBand',
]
const LABELS = ['Vereinfachte Darstellung mit Beispieldaten', 'Darstellung, KI-gestaltet']
const BUDGET_ROUTES = ['/', '/funktionen', '/app', '/gewerke', '/preise', '/vergleich', '/vergleich/handwerkersoftware-kleine-betriebe', '/vergleich/hero-alternative', '/fakten-ueber-craftos', '/craft-ai', '/gobd', '/funktionen/angebote', '/funktionen/mahnwesen', '/funktionen/terminplanung', '/styleguide']
const LIMIT = 150 * 1024
/** Begründete PNG-Ausnahmen, identisch mit EXCEPTIONS in tests/media-budget.test.ts. */
const PNG_EXCEPTIONS = ['/icons/icon-192x192.png', '/icons/icon-512x512.png']
/**
 * Phase 9 (09-UI-SPEC § 8 „Darstellung“ und „A11y, Bewegung, CLS“; Plan 09-16): Vorlagen Gewerke, Übersichten
 * und Artikel in sechs Breiten. art: gewerk (FunktionsKopf mit Ablauf-StepFlow und FeatureSnippet), gewerke
 * (Übersicht mit FunktionsKopf), index (ContentKopf ohne Antwort), artikel (ContentKopf mit #antwort,
 * Inhaltsverzeichnis); schritte: Artikel mit Schrittliste (Knoten 40 × 40).
 */
const PHASE9_WIDTHS = [360, 390, 768, 1024, 1280, 1440]
const PHASE9_ROUTES = [
  { path: '/gewerke', art: 'gewerke' },
  { path: '/gewerke/elektriker', art: 'gewerk' },
  { path: '/gewerke/allrounder', art: 'gewerk' },
  { path: '/blog', art: 'index' },
  { path: '/hilfe/kategorie/rechnungen', art: 'index' },
  { path: '/blog/tiefenkalkulation-handwerk', art: 'artikel' },
  { path: '/hilfe/material-entnehmen-zurueckbuchen', art: 'artikel', schritte: true },
]

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
      // 08-03: zweite Tabelle (Marktübersicht mit Quellenliste, G3); FitPanels (G4) und FactList (G5)
      await expect(page.locator('[data-block="ComparisonTable"] table')).toHaveCount(2)
      for (const table of await page.locator('[data-block="ComparisonTable"] table').all()) await expect(table).toBeVisible()
      await expect(page.locator('[data-block="ComparisonTable"] ol[aria-label="Quellen zur Tabelle"] > li')).toHaveCount(3)
      await expect(page.locator('[data-block="FitPanels"] article')).toHaveCount(2)
      await expect(page.locator('[data-block="FactList"] dt')).toHaveCount(6)
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

async function severeAxe(page) {
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  return result.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.impact} ${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(', ')}`)
}

/** Desktop-Projekte prüfen alle sechs Breiten per setViewportSize, Touch-Projekte ihre eigene Breite. */
function phase9Widths(testInfo) {
  return testInfo.project.use.hasTouch ? [testInfo.project.use.viewport.width] : PHASE9_WIDTHS
}

async function measurePhase9(page) {
  return page.evaluate(() => {
    const rect = (el) => {
      const r = el.getBoundingClientRect()
      return { top: r.top, bottom: r.bottom, left: r.left, width: r.width }
    }
    const shown = (el) => !!el && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().height > 0
    const h1 = document.querySelector('h1')
    const keyword = h1 ? h1.querySelector('[data-keyword]') : null
    const tocSeite = document.querySelector('nav[data-toc="seite"]')
    const tocMobil = document.querySelector('details[data-toc="mobil"]')
    const knoten = document.querySelector('.article-prose > ol > li')
    const knotenStil = knoten ? getComputedStyle(knoten, '::before') : null
    return {
      h1Count: document.querySelectorAll('h1').length,
      h1: h1 ? { scrollWidth: h1.scrollWidth, clientWidth: h1.clientWidth, width: h1.getBoundingClientRect().width } : null,
      keywordWidth: keyword ? keyword.getBoundingClientRect().width : null,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      steps: [...document.querySelectorAll('[data-abschnitt="ablauf"] ol > li')].slice(0, 2).map(rect),
      toc: { seite: shown(tocSeite), position: tocSeite ? getComputedStyle(tocSeite).position : null, mobil: shown(tocMobil) },
      knoten: knotenStil ? { width: parseFloat(knotenStil.width), height: parseFloat(knotenStil.height) } : null,
      // Geräterahmen der Funktionskarten bleiben innerhalb der Kartenbühne (höchstens in deren Innenabstand).
      kartenRahmen: [...document.querySelectorAll('[data-abschnitt="funktionen"] li figure')].map((fig) => {
        const f = fig.getBoundingClientRect()
        const s = fig.parentElement.getBoundingClientRect()
        return { evidence: fig.getAttribute('data-evidence') || fig.querySelector('[data-evidence]')?.getAttribute('data-evidence') || fig.textContent.slice(0, 30), ueberstand: Math.max(s.left - f.left, f.right - s.right) }
      }),
    }
  })
}

test.describe('Phase 9: Vorlagen Gewerke, Übersichten und Artikel', () => {
  for (const route of PHASE9_ROUTES) {
    test(`Phase 9 ${route.path}: Darstellung und axe in sechs Breiten`, async ({ page }, testInfo) => {
      test.setTimeout(180_000)
      await page.emulateMedia({ reducedMotion: 'reduce' })
      const findings = []
      for (const width of phase9Widths(testInfo)) {
        if (!testInfo.project.use.hasTouch) await page.setViewportSize({ width, height: 900 })
        // Je Breite frisch laden: WebKit behält nach dem Verkleinern sonst die alte Scrollbreite.
        const response = await page.goto(route.path)
        expect(response.status(), `${route.path} ${width}`).toBe(200)
        await page.evaluate(() => document.fonts.ready)
        const m = await measurePhase9(page)
        const at = `${route.path} ${width} px`
        expect(m.overflow, `${at}: kein horizontaler Seitenscroll`).toBeLessThanOrEqual(1)
        expect(m.h1Count, `${at}: genau eine H1`).toBe(1)
        expect(m.h1.scrollWidth, `${at}: H1 ohne Überlauf`).toBeLessThanOrEqual(m.h1.clientWidth)
        if (route.art === 'gewerk' || route.art === 'gewerke') {
          expect(m.keywordWidth, `${at}: Kopfwort-Span vorhanden`).not.toBeNull()
          expect(m.keywordWidth, `${at}: Kopfwort-Span passt in die H1`).toBeLessThanOrEqual(m.h1.width + 0.5)
        }
        if (route.art === 'gewerk') {
          expect(m.steps, `${at}: StepFlow mit mindestens zwei Schritten`).toHaveLength(2)
          const [a, b] = m.steps
          if (width >= 1024) {
            expect(Math.abs(b.top - a.top), `${at}: StepFlow waagerecht (gleiche Oberkante)`).toBeLessThanOrEqual(1)
            expect(b.left, `${at}: StepFlow waagerecht (zweiter Schritt rechts)`).toBeGreaterThan(a.left + a.width - 1)
          } else {
            expect(b.top, `${at}: StepFlow senkrecht (zweiter Schritt darunter)`).toBeGreaterThanOrEqual(a.bottom - 1)
            expect(Math.abs(b.left - a.left), `${at}: StepFlow senkrecht (gleiche linke Kante)`).toBeLessThanOrEqual(1)
          }
          expect(m.kartenRahmen.length, `${at}: Funktionskarten mit Rahmen`).toBeGreaterThan(0)
          const ragend = m.kartenRahmen.filter((k) => k.ueberstand > 0.5).map((k) => `${k.evidence} ${k.ueberstand.toFixed(1)} px`)
          expect(ragend, `${at}: Kartenrahmen ragen über die Bühne`).toEqual([])
        }
        if (route.art === 'artikel') {
          if (width >= 1024) {
            expect(m.toc.seite, `${at}: Inhaltsverzeichnis in der Seitenspalte`).toBe(true)
            expect(m.toc.position, `${at}: Inhaltsverzeichnis sticky`).toBe('sticky')
            expect(m.toc.mobil, `${at}: eingeklapptes Inhaltsverzeichnis ausgeblendet`).toBe(false)
          } else {
            expect(m.toc.mobil, `${at}: Inhaltsverzeichnis als details`).toBe(true)
            expect(m.toc.seite, `${at}: Seitenspalte ausgeblendet`).toBe(false)
          }
          if (route.schritte) expect(m.knoten, `${at}: Schrittknoten 40 × 40`).toEqual({ width: 40, height: 40 })
        }
        for (const v of await severeAxe(page)) findings.push(`${at}: ${v}`)
      }
      expect(findings, `axe ${route.path}`).toEqual([])
    })

    test(`Phase 9 ${route.path}: reduzierte Bewegung ohne laufende Animation und CLS 0 in sechs Breiten`, async ({ page, browserName }, testInfo) => {
      test.setTimeout(180_000)
      await page.emulateMedia({ reducedMotion: 'reduce' })
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
      let supported = true
      for (const width of phase9Widths(testInfo)) {
        if (!testInfo.project.use.hasTouch) await page.setViewportSize({ width, height: 900 })
        await page.goto(route.path)
        await page.waitForLoadState('networkidle')
        await page.evaluate(() => document.fonts.ready)
        const at = `${route.path} ${width} px`
        if (route.art === 'gewerk') {
          // FeatureSnippet im Endzustand: vollständiges statisches Ergebnis, kein Ablauf.
          const snippet = page.locator('[data-feature-illustration="true"]').first()
          await expect(snippet, `${at}: FeatureSnippet im Endzustand`).toHaveAttribute('data-stage', '3')
          await expect(snippet, `${at}: FeatureSnippet läuft nicht`).toHaveAttribute('data-running', 'false')
        }
        expect(await page.evaluate(() => document.getAnimations().length), `${at}: keine Animation`).toBe(0)
        await scrollThrough(page)
        expect(await page.evaluate(() => document.getAnimations().length), `${at}: keine Animation nach dem Scrollen`).toBe(0)
        const cls = await page.evaluate(() => window.__cls)
        if (cls.supported) expect(cls.value, `${at}: CLS`).toBe(0)
        else supported = false
      }
      if (!supported) testInfo.annotations.push({ type: 'CLS', description: `${browserName} meldet keine layout-shift-Einträge; CLS wird in Chromium geprüft.` })
    })
  }

  // 09-REVIEW ME-01: Das sticky Inhaltsverzeichnis ist höchstens so hoch wie der Viewport unter dem Kopf und scrollt
  // selbst; auf Laptop-Höhen (1366 × 768) bleibt der letzte Eintrag eines langen Artikels erreichbar.
  test('Phase 9: Inhaltsverzeichnis bei 1366 × 768 bis zum letzten Eintrag erreichbar (ME-01)', async ({ page }, testInfo) => {
    test.skip(testInfo.project.use.hasTouch, 'Die Seitenspalte gibt es erst ab 1024 px; geprüft im Desktop-Projekt.')
    test.setTimeout(60_000)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 1366, height: 768 })
    const response = await page.goto('/hilfe/zeiteintrag-erfassen-korrigieren')
    expect(response.status()).toBe(200)
    await page.evaluate(() => document.fonts.ready)
    await expect(page.locator('nav[data-toc="seite"]')).toBeVisible()
    // In den Artikel scrollen, damit das Verzeichnis an seiner sticky-Position steht.
    await page.evaluate(() => {
      const raster = document.querySelector('.artikel-raster')
      window.scrollTo(0, raster.getBoundingClientRect().top + window.scrollY + 400)
    })
    const m = await page.evaluate(() => {
      const nav = document.querySelector('nav[data-toc="seite"]')
      nav.scrollTop = nav.scrollHeight
      const links = nav.querySelectorAll('a')
      const last = links[links.length - 1].getBoundingClientRect()
      const n = nav.getBoundingClientRect()
      return { anzahl: links.length, navTop: n.top, navBottom: n.bottom, lastTop: last.top, lastBottom: last.bottom, hoehe: window.innerHeight }
    })
    expect(m.anzahl, 'langer Artikel mit vielen Einträgen').toBeGreaterThanOrEqual(12)
    expect(m.navBottom, 'Inhaltsverzeichnis endet im Viewport').toBeLessThanOrEqual(m.hoehe + 0.5)
    expect(m.lastTop, 'letzter Eintrag im Verzeichnis sichtbar (oben)').toBeGreaterThanOrEqual(m.navTop - 0.5)
    expect(m.lastBottom, 'letzter Eintrag im Viewport sichtbar (unten)').toBeLessThanOrEqual(Math.min(m.navBottom, m.hoehe) + 0.5)
  })

  test('Phase 9: Fold 360 × 640 – Gewerke-CTA und Artikel-Antwort vollständig sichtbar', async ({ page }, testInfo) => {
    test.skip(testInfo.project.use.hasTouch, 'Die Breite wird im Desktop-Projekt per setViewportSize geprüft.')
    test.setTimeout(90_000)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 360, height: 640 })
    const report = []
    for (const route of PHASE9_ROUTES.filter((r) => r.art !== 'index')) {
      await page.goto(route.path)
      await page.evaluate(() => document.fonts.ready)
      const selector = route.art === 'artikel' ? '#antwort' : '[data-funktions-kopf] a.v2-btn-cta[data-track="trial"]'
      const box = await page.locator(selector).first().boundingBox()
      expect(box, `${route.path}: ${selector} vorhanden`).not.toBeNull()
      expect(box.y, `${route.path}: ${selector} oben im Fold`).toBeGreaterThanOrEqual(0)
      expect(box.y + box.height, `${route.path}: ${selector} Unterkante ≤ 640`).toBeLessThanOrEqual(640)
      report.push(`${route.path}: bis ${Math.round(box.y + box.height)}`)
    }
    testInfo.annotations.push({ type: 'Fold 360 × 640', description: report.join(' | ') })
  })
})
