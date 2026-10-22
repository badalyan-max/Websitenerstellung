/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser regression suite. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')
const AxeBuilder = require('@axe-core/playwright').default

/**
 * Phase-8-Seiten im Browser (Plan 08-13; D-09, D-10, D-18; 08-UI-SPEC „Prüfmatrix“ und „Bewegung, Barrierefreiheit,
 * Stabilität“). Muster: funktionsdetails.pw.cjs (07-08). Geprüft werden Above the fold (CTA-Unterkante ≤ 640 bei
 * 360 × 640), Brotkrumen einzeilig ohne Seitenscroll bei 360 px, axe ohne serious/critical (390 auf allen Seiten,
 * fünf Breiten für die Stichprobe), CLS 0 bei reduzierter Bewegung, Antwort zuerst, die Darstellung ohne JavaScript
 * und Quellenlinks (rel „nofollow“, gleicher Tab). Testnamen-Präfixe „Vergleich:“ und „Phase 8:“ erlauben -g.
 * Läuft nur lokal gegen next start; externe Requests werden abgebrochen, Quellenlinks nur über Attribute geprüft.
 */

/** Seiten der Vergleichsvorlage plus /preise: CTA im Kopf muss bei 360 × 640 sichtbar sein (UI-SPEC § 3.1, § 4). */
const VERGLEICH_SEITEN = [
  '/preise',
  '/vergleich',
  '/vergleich/plancraft-alternative',
  '/vergleich/craftnote-alternative',
  '/vergleich/hero-alternative',
  '/vergleich/tooltime-alternative',
  '/vergleich/handwerkersoftware-kleine-betriebe',
]
/** Kernseiten aus 08-12: Kopf mit Lead statt Antwortabsatz, keine Tabelle. */
const KERN_SEITEN = ['/fakten-ueber-craftos', '/craft-ai', '/gobd']
const PHASE8_SEITEN = [...VERGLEICH_SEITEN, ...KERN_SEITEN]
/** Stichprobe für axe in fünf Breiten (UI-SPEC „Bewegung, Barrierefreiheit, Stabilität“). */
const AXE_STICHPROBE = ['/preise', '/vergleich/hero-alternative', '/fakten-ueber-craftos']
const AXE_BREITEN = [360, 390, 768, 1024, 1440]
const FOLD_BREITEN = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
]
const ANTWORT_MAX = 300
const BROTKRUMEN_HOEHE = 48
const ZIEL_MIN = 44
/** Eigene Domains (CTA zur Web-App, Website); alle anderen Links im Inhalt gelten als Quellenlinks. */
const EIGENE_HOSTS = /(^|\.)craftos\.eu$/

const KOPF_CTA = '[data-funktions-kopf] a.v2-btn-cta[data-track="trial"]'

test.beforeEach(async ({ page, baseURL }) => {
  const origin = new URL(baseURL).origin
  await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
})

async function severeAxe(page) {
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  return result.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.impact} ${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(', ')}`)
}

async function measureKopf(page) {
  return page.evaluate((ctaSelector) => {
    const box = (el) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { top: r.top, bottom: r.bottom, width: r.width }
    }
    const kopf = document.querySelector('[data-funktions-kopf]')
    const h1 = kopf ? kopf.querySelector('h1') : null
    const keyword = h1 ? h1.querySelector('[data-keyword]') : null
    return {
      kopf: Boolean(kopf),
      h1: box(h1),
      cta: box(document.querySelector(ctaSelector)),
      keywordRects: keyword ? keyword.getClientRects().length : 0,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }
  }, KOPF_CTA)
}

function expectFold(m, vp, at) {
  expect(m.kopf, `${at}: FunktionsKopf vorhanden`).toBe(true)
  expect(m.h1, `${at}: H1 vorhanden`).not.toBeNull()
  expect(m.cta, `${at}: Kopf-CTA vorhanden`).not.toBeNull()
  expect(m.h1.top, `${at}: H1 oben sichtbar`).toBeGreaterThanOrEqual(0)
  expect(m.cta.bottom, `${at}: CTA-Unterkante ≤ ${vp.height}`).toBeLessThanOrEqual(vp.height)
  expect(m.keywordRects, `${at}: Kopfwort in einem Rechteck`).toBe(1)
  expect(m.overflow, `${at}: kein horizontaler Scroll`).toBeLessThanOrEqual(1)
}

/** Längste Artikelseite je Bereich (Hilfe, Ratgeber) nach dem aktuellen Brotkrumen-Glied aus dem Server-HTML. */
async function laengsteArtikel(request) {
  const response = await request.get('/sitemap.xml')
  expect(response.ok()).toBe(true)
  const xml = await response.text()
  const pfade = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname))]
  const out = []
  for (const bereich of ['hilfe', 'blog']) {
    let best = null
    for (const pfad of pfade.filter((p) => new RegExp(`^/${bereich}/[a-z0-9-]+$`).test(p))) {
      const html = await (await request.get(pfad)).text()
      const m = html.match(/aria-current="page"[^>]*>([^<]+)</)
      if (m && (!best || m[1].length > best.laenge)) best = { pfad, laenge: m[1].length }
    }
    expect(best, `längster ${bereich}-Artikel gefunden`).not.toBeNull()
    out.push(best)
  }
  return out
}

test('Vergleich: Above the fold bei 360 × 640 – CTA-Unterkante ≤ 640 auf Vergleichsseiten und /preise', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Breite wird im Desktop-Projekt per setViewportSize geprüft.')
  test.setTimeout(120_000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const vp = { width: 360, height: 640 }
  await page.setViewportSize(vp)
  const report = []
  for (const path of VERGLEICH_SEITEN) {
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    const m = await measureKopf(page)
    expectFold(m, vp, `${path} 360×640`)
    report.push(`${path}: CTA bis ${Math.round(m.cta.bottom)}`)
  }
  testInfo.annotations.push({ type: 'Above the fold 360', description: report.join(' | ') })
})

test('Vergleich: Above the fold in den Breiten 390, 768, 1024 und 1440 auf Vergleichsseiten und /preise', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Breiten werden im Desktop-Projekt per setViewportSize geprüft.')
  test.setTimeout(180_000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const vp of FOLD_BREITEN) {
    await page.setViewportSize(vp)
    for (const path of VERGLEICH_SEITEN) {
      await page.goto(path)
      await page.evaluate(() => document.fonts.ready)
      expectFold(await measureKopf(page), vp, `${path} ${vp.width}×${vp.height}`)
    }
  }
})

test('Phase 8: Brotkrumen bei 360 px einzeilig ohne Seitenscroll, „Start“ mindestens 44 × 44 px', async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Breite wird im Desktop-Projekt per setViewportSize geprüft.')
  test.setTimeout(180_000)
  const artikel = await laengsteArtikel(request)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 360, height: 640 })
  const report = []
  for (const path of [...PHASE8_SEITEN, ...artikel.map((a) => a.pfad)]) {
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    const m = await page.evaluate(() => {
      const navs = document.querySelectorAll('nav[aria-label="Brotkrumen"]')
      const ol = navs[0] ? navs[0].querySelector('ol') : null
      const start = ol ? ol.querySelector('a') : null
      const r = start ? start.getBoundingClientRect() : null
      return {
        navs: navs.length,
        olHeight: ol ? ol.getBoundingClientRect().height : Infinity,
        startText: start ? start.textContent.trim() : '',
        startW: r ? r.width : 0,
        startH: r ? r.height : 0,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }
    })
    const at = `${path} 360`
    expect(m.navs, `${at}: genau eine Brotkrumen-Navigation`).toBe(1)
    expect(m.olHeight, `${at}: Brotkrumen in einer Zeile`).toBeLessThanOrEqual(BROTKRUMEN_HOEHE)
    expect(m.startText, `${at}: erstes Glied`).toBe('Start')
    expect(m.startW, `${at}: „Start“ Breite`).toBeGreaterThanOrEqual(ZIEL_MIN)
    expect(m.startH, `${at}: „Start“ Höhe`).toBeGreaterThanOrEqual(ZIEL_MIN)
    expect(m.scrollWidth, `${at}: kein Seitenscroll`).toBeLessThanOrEqual(m.innerWidth)
    report.push(`${path}: ol ${Math.round(m.olHeight)} px`)
  }
  testInfo.annotations.push({ type: 'Brotkrumen 360', description: report.join(' | ') })
})

test('Phase 8: axe bei 390 ohne serious/critical auf allen Phase-8-Seiten', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.use.hasTouch, 'Die 390-px-Prüfung läuft im Touch-Projekt.')
  test.setTimeout(240_000)
  // Statischer Zustand wie bei reduzierter Bewegung und ohne JavaScript (FeatureSnippet auf /craft-ai und /gobd).
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const findings = []
  for (const path of PHASE8_SEITEN) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    for (const v of await severeAxe(page)) findings.push(`${path}: ${v}`)
  }
  expect(findings).toEqual([])
})

test('Phase 8: axe in fünf Breiten für /preise, /vergleich/hero-alternative und /fakten-ueber-craftos', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Breiten werden im Desktop-Projekt per setViewportSize geprüft.')
  test.setTimeout(240_000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const findings = []
  for (const width of AXE_BREITEN) {
    await page.setViewportSize({ width, height: 900 })
    for (const path of AXE_STICHPROBE) {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      for (const v of await severeAxe(page)) findings.push(`${path} ${width}: ${v}`)
    }
  }
  expect(findings).toEqual([])
})

test('Phase 8: CLS 0 und reduzierte Bewegung auf allen Phase-8-Seiten', async ({ page, browserName }, testInfo) => {
  test.setTimeout(240_000)
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
  for (const path of PHASE8_SEITEN) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    // Bedingungen statt fester Pausen (Muster 07-08): durchscrollen, Schriften und dargestellte Bilder abwarten.
    await page.evaluate(async () => {
      const zweiFrames = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await zweiFrames()
      }
      window.scrollTo(0, document.documentElement.scrollHeight)
      await document.fonts.ready
      const sichtbar = [...document.images].filter((img) => img.getClientRects().length > 0)
      const geladen = Promise.all(sichtbar.map((img) => (img.complete ? img.decode().catch(() => {}) : new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true })
        img.addEventListener('error', resolve, { once: true })
      }))))
      await Promise.race([geladen, new Promise((resolve) => setTimeout(resolve, 10_000))])
      await zweiFrames()
    })
    supported = await page.evaluate(() => window.__clsSupported)
    if (supported) expect(await page.evaluate(() => window.__cls), `${path}: CLS`).toBe(0)
    await expect.poll(() => page.evaluate(() => document.getAnimations().map((a) => {
      const el = a.effect && a.effect.target
      const where = el ? `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]}` : '?'
      return `${where} ${a.transitionProperty || a.animationName || a.constructor.name} ${a.playState}`
    })), { message: `${path}: keine Animationen bei reduzierter Bewegung`, timeout: 5_000 }).toEqual([])
  }
  if (!supported) testInfo.annotations.push({ type: 'hinweis', description: `${browserName} meldet keine layout-shift-Einträge; nur Animationen geprüft.` })
})

test('Phase 8: Antwort zuerst – #antwort direkt nach der H1 und alle FAQ-Antworten höchstens 300 Zeichen', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'DOM-Prüfung im Desktop-Projekt.')
  test.setTimeout(90_000)
  for (const path of PHASE8_SEITEN) {
    await page.goto(path)
    const m = await page.evaluate(() => {
      const h1 = document.querySelectorAll('h1')
      const antwort = document.getElementById('antwort')
      return {
        h1: h1.length,
        antwortNachH1: Boolean(antwort && h1[0] && h1[0].nextElementSibling === antwort),
        antwortLaenge: antwort ? [...antwort.textContent.trim()].length : null,
        faq: [...document.querySelectorAll('[data-abschnitt="faq"] details')].map((d) => ({
          q: d.querySelector('summary').textContent.trim(),
          a: [...(d.querySelector('summary + p') || { textContent: '' }).textContent.trim()].length,
        })),
      }
    })
    expect(m.h1, `${path}: genau eine H1`).toBe(1)
    if (VERGLEICH_SEITEN.includes(path)) {
      expect(m.antwortNachH1, `${path}: #antwort direkt nach der H1`).toBe(true)
      expect(m.antwortLaenge, `${path}: #antwort ≤ ${ANTWORT_MAX}`).toBeLessThanOrEqual(ANTWORT_MAX)
    }
    expect(m.faq.length, `${path}: FAQ-Fragen`).toBeGreaterThanOrEqual(3)
    for (const f of m.faq) {
      expect(f.q.endsWith('?'), `${path}: „${f.q}“ als Frage`).toBe(true)
      expect(f.a, `${path}: Antwort auf „${f.q}“`).toBeGreaterThan(0)
      expect(f.a, `${path}: Antwort auf „${f.q}“ ≤ ${ANTWORT_MAX}`).toBeLessThanOrEqual(ANTWORT_MAX)
    }
  }
})

test('Phase 8: ohne JavaScript sind H1, Antwort, erste Tabelle und FAQ-Fragen sichtbar', async ({ browser, baseURL }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Einmal je Engine im Desktop-Projekt.')
  test.setTimeout(120_000)
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport: { width: 390, height: 844 } })
  const origin = new URL(baseURL).origin
  await context.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
  const page = await context.newPage()
  try {
    for (const path of PHASE8_SEITEN) {
      await page.goto(path)
      await expect(page.locator('h1'), path).toHaveCount(1)
      await expect(page.locator('h1'), path).toBeVisible()
      await expect(page.locator(KOPF_CTA), `${path}: Kopf-CTA`).toBeVisible()
      if (VERGLEICH_SEITEN.includes(path)) {
        await expect(page.locator('#antwort'), `${path}: #antwort`).toBeVisible()
        await expect(page.locator('main table').first(), `${path}: erste Tabelle`).toBeVisible()
      }
      const questions = page.locator('[data-abschnitt="faq"] summary')
      expect(await questions.count(), `${path}: FAQ-Fragen`).toBeGreaterThanOrEqual(3)
      for (let i = 0; i < await questions.count(); i++) await expect(questions.nth(i), `${path}: Frage ${i + 1}`).toBeVisible()
    }
  } finally {
    await context.close()
  }
})

test('Vergleich: Quellenlinks mit rel „nofollow“, im gleichen Tab und nur über Attribute geprüft', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'DOM-Prüfung im Desktop-Projekt.')
  test.setTimeout(90_000)
  const findings = []
  let quellen = 0
  for (const path of PHASE8_SEITEN) {
    await page.goto(path)
    const links = await page.evaluate(() => [...document.querySelectorAll('main a[href^="http"]')].map((a) => ({
      href: a.getAttribute('href'),
      rel: (a.getAttribute('rel') || '').split(/\s+/),
      target: a.getAttribute('target'),
    })))
    for (const l of links) {
      if (EIGENE_HOSTS.test(new URL(l.href).hostname)) continue
      quellen++
      if (!l.rel.includes('nofollow')) findings.push(`${path}: ${l.href} ohne rel="nofollow"`)
      if (l.target === '_blank') findings.push(`${path}: ${l.href} mit target="_blank"`)
    }
  }
  expect(quellen, 'Quellenlinks auf den Phase-8-Seiten').toBeGreaterThan(0)
  expect(findings).toEqual([])
})
