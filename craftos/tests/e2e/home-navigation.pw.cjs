/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser regression suite. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')
const AxeBuilder = require('@axe-core/playwright').default

/**
 * Hauptnavigation im Browser (Phase 6, Plan 06-03; D-05, D-06, D-13, D-17): Disclosure-Muster mit
 * Tastatur, Drawer mit vorgeöffneter Gruppe „Funktionen“, Scroll-Lock ohne Sprung, CLS, ohne JavaScript
 * und axe bei geöffnetem Menü. Testnamen-Präfixe („Menü:“, „ohne JavaScript:“, „axe:“) erlauben das
 * Filtern per -g; die Pläne 06-04 und 06-05 erweitern diese Datei. Läuft nur lokal gegen next start.
 */

const DETAIL_SLUGS = [
  'angebote', 'aufmass', 'kundenportal', 'plantafel', 'projektverwaltung', 'arbeitsanweisungen',
  'zeiterfassung', 'baudokumentation', 'lager', 'rechnungen', 'e-rechnung', 'buchhaltung',
  'eingangsrechnungen', 'nachkalkulation', 'dashboard', 'team',
]
const GROUP_ANCHORS = ['angebot', 'planung', 'baustelle', 'rechnung', 'buchhaltung', 'team']
const APP_HOST = 'app.craftos.eu'

test.beforeEach(async ({ page, baseURL }) => {
  const origin = new URL(baseURL).origin
  await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
})

async function tapToggle(page, hasTouch) {
  const toggle = page.getByRole('button', { name: /Menü (öffnen|schließen)/ })
  await expect(toggle).toBeVisible()
  const box = await toggle.boundingBox()
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  if (hasTouch) await page.touchscreen.tap(x, y)
  else await page.mouse.click(x, y)
}

async function severeAxe(page) {
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  return result.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.impact} ${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(', ')}`)
}

test('Menü: Tastatur öffnet, fokussiert und schließt das Mega-Menü (Disclosure, kein role=menu)', async ({ page, browserName }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Tastaturbedienung wird im Desktop-Projekt geprüft.')
  await page.goto('/')
  const key = browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
  const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
  const link = nav.getByRole('link', { name: 'Funktionen', exact: true })
  const button = nav.getByRole('button', { name: 'Untermenü Funktionen', exact: true })
  const panel = page.locator('#navigation-funktionen')
  await expect(link).toHaveAttribute('href', '/funktionen')
  await expect(button).toHaveAttribute('aria-controls', 'navigation-funktionen')
  await expect(button).toHaveAttribute('aria-expanded', 'false')
  await expect(panel).toBeHidden()

  await link.focus()
  await page.keyboard.press(key)
  await expect(button).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(button).toHaveAttribute('aria-expanded', 'true')
  await expect(panel).toBeVisible()
  await page.keyboard.press('ArrowDown')
  await expect(panel.locator('a').first()).toBeFocused()
  await expect(panel.locator('a').first()).toHaveAttribute('href', '/funktionen#angebot')
  await page.keyboard.press('Escape')
  await expect(panel).toBeHidden()
  await expect(button).toBeFocused()
  // Leertaste toggelt wie Enter.
  await page.keyboard.press('Space')
  await expect(button).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Space')
  await expect(button).toHaveAttribute('aria-expanded', 'false')

  await expect(page.locator('[role="menu"], [role="menubar"], [role="menuitem"]')).toHaveCount(0)

  await page.keyboard.press('Enter')
  const zeit = panel.getByRole('link', { name: 'Zeiterfassung', exact: true })
  await expect(zeit).toBeVisible()
  await zeit.click()
  await expect(page).toHaveURL(/\/funktionen\/zeiterfassung$/)
  await expect(panel).toBeHidden()
  await expect(button).toHaveAttribute('aria-expanded', 'false')
  await expect(link).toHaveAttribute('data-active', 'true')
  await button.focus()
  await page.keyboard.press('Enter')
  await expect(panel).toBeVisible()
  await expect(zeit).toHaveAttribute('aria-current', 'page')
  await expect(panel.locator('[aria-current="page"]')).toHaveCount(1)
})

test('Menü: Drawer öffnet mit aufgeklappten Funktionen, sperrt den Scroll ohne Sprung und trennt Anmelden vom Test-CTA', async ({ page, hasTouch }) => {
  test.skip(!hasTouch, 'Der Drawer wird im Touch-Projekt geprüft.')
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
  const mainWidth = () => page.locator('main').evaluate((el) => el.getBoundingClientRect().width)
  const before = await mainWidth()
  await tapToggle(page, hasTouch)
  const functions = nav.getByRole('button', { name: 'Untermenü Funktionen', exact: true })
  await expect(functions).toHaveAttribute('aria-expanded', 'true')
  const details = page.locator('#navigation-funktionen a[href^="/funktionen/"]')
  const groups = page.locator('#navigation-funktionen a[href^="/funktionen#"]')
  await expect(details).toHaveCount(16)
  await expect(groups).toHaveCount(6)
  for (let i = 0; i < 16; i += 1) await expect(details.nth(i)).toBeVisible()
  for (let i = 0; i < 6; i += 1) await expect(groups.nth(i)).toBeVisible()
  expect(await details.evaluateAll((els) => els.map((el) => el.getAttribute('href').slice('/funktionen/'.length)).sort()))
    .toEqual([...DETAIL_SLUGS].sort())
  expect(await groups.evaluateAll((els) => els.map((el) => el.getAttribute('href').split('#')[1])))
    .toEqual(GROUP_ANCHORS)
  expect(await mainWidth()).toBe(before)
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('hidden')

  const trades = nav.getByRole('button', { name: 'Untermenü Gewerke', exact: true })
  await trades.tap()
  await expect(trades).toHaveAttribute('aria-expanded', 'true')
  await expect(functions).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('#navigation-gewerke')).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(nav).toBeHidden()
  await expect(page.getByRole('button', { name: 'Menü öffnen' })).toBeFocused()
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('')

  const appLinks = await page.locator('header a').evaluateAll((els, host) => els
    .filter((el) => { try { return new URL(el.href).host === host } catch { return false } })
    .map((el) => ({ text: el.textContent.trim(), track: el.getAttribute('data-track') })), APP_HOST)
  expect(appLinks.length).toBeGreaterThanOrEqual(2)
  for (const entry of appLinks) {
    if (entry.text === 'Anmelden') expect(entry.track).toBe('login')
    else expect(entry.track, entry.text).not.toBe('login')
  }
  expect(appLinks.filter((e) => e.text === 'Anmelden')).toHaveLength(1)
  expect(appLinks.some((e) => /^\d+ Tage testen$/.test(e.text))).toBe(true)
})

test('Menü: CLS bleibt 0 beim Öffnen und reduzierte Bewegung läuft ohne Animationen', async ({ page, browserName }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(() => {
    window.__navShift = 0
    window.__navShiftSupported = PerformanceObserver.supportedEntryTypes.includes('layout-shift')
    if (window.__navShiftSupported) {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.__navShift += entry.value
      }).observe({ type: 'layout-shift', buffered: false })
    }
  })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => { window.__navShift = 0 })
  const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
  if (testInfo.project.use.hasTouch) {
    await tapToggle(page, true)
    await expect(nav.getByRole('button', { name: 'Untermenü Funktionen', exact: true })).toHaveAttribute('aria-expanded', 'true')
  } else {
    const button = nav.getByRole('button', { name: 'Untermenü Funktionen', exact: true })
    await button.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('#navigation-funktionen')).toBeVisible()
  }
  await page.waitForTimeout(300)
  const supported = await page.evaluate(() => window.__navShiftSupported)
  if (supported) expect(await page.evaluate(() => window.__navShift)).toBe(0)
  else testInfo.annotations.push({ type: 'hinweis', description: `${browserName} meldet keine layout-shift-Einträge; nur Animationen geprüft.` })
  // Seit Plan 06-04 hat die Startseite keine FeatureSnippet-Szenen mehr (D-04): geprüft wird die ganze Seite.
  const running = await page.evaluate(() => document.getAnimations().map((a) => {
    const el = a.effect && a.effect.target
    const where = el ? `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}.${String(el.className).split(' ')[0]}` : '?'
    return `${a.constructor.name} ${a.animationName || a.transitionProperty || ''} @ ${where}`
  }))
  expect(running).toEqual([])
})

test('ohne JavaScript: Hauptpunkte, Anmelden und CTA sind nutzbar, alle Funktionslinks stehen im HTML', async ({ browser, baseURL }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Serverausgabe ist unabhängig von Touch; beide Browser werden geprüft.')
  const origin = new URL(baseURL).origin
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 900 } })
    const page = await context.newPage()
    await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
    try {
      const response = await page.goto(new URL('/', baseURL).href)
      const html = await response.text()
      for (const slug of DETAIL_SLUGS) expect(html, slug).toContain(`href="/funktionen/${slug}"`)
      const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
      const funktionen = nav.getByRole('link', { name: 'Funktionen', exact: true })
      await expect(funktionen).toBeVisible()
      await expect(funktionen).toHaveAttribute('href', '/funktionen')
      await expect(page.locator('[data-nav-toggle]')).toBeHidden()
      const disclosures = page.locator('[data-nav-disclosure]')
      await expect(disclosures).toHaveCount(4)
      for (let i = 0; i < 4; i += 1) await expect(disclosures.nth(i)).toBeHidden()
      await expect(page.locator('#navigation-funktionen')).toBeHidden()
      if (width === 390) {
        for (const name of ['Funktionen', 'Gewerke', 'Preise', 'Wissen', 'Hilfe', 'Anmelden']) {
          await expect(nav.getByRole('link', { name, exact: true }), name).toBeVisible()
        }
        await expect(nav.getByRole('link', { name: /^\d+ Tage testen$/ })).toBeVisible()
      }
      const [document] = await Promise.all([
        page.waitForResponse((r) => new URL(r.url()).pathname === '/funktionen' && r.request().resourceType() === 'document'),
        funktionen.click(),
      ])
      expect(document.status()).toBe(200)
      await expect(page).toHaveURL(/\/funktionen$/)
    } finally { await context.close() }
  }
})

test('axe: Menü offen ohne serious/critical (Mega-Menü 1440, Drawer 390)', async ({ page }, testInfo) => {
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
  if (testInfo.project.use.hasTouch) {
    await tapToggle(page, true)
    await expect(nav.getByRole('button', { name: 'Untermenü Funktionen', exact: true })).toHaveAttribute('aria-expanded', 'true')
  } else {
    const button = nav.getByRole('button', { name: 'Untermenü Funktionen', exact: true })
    await button.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('#navigation-funktionen')).toBeVisible()
  }
  expect(await severeAxe(page)).toEqual([])
})

// Startseite oberhalb der Falz (Plan 06-04, 06-UI-SPEC „Above-the-fold-Lagen“; D-02, D-20, ROADMAP-Kriterium 1).
const FOLD_VIEWPORTS = [
  { width: 360, height: 640 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
]
const FRAME_LABEL = 'Vereinfachte Darstellung mit Beispieldaten'

async function measureHero(page) {
  return page.evaluate(() => {
    const box = (el) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height }
    }
    const hero = document.querySelector('[data-home-hero]')
    const h1 = hero.querySelector('h1')
    const keyword = h1.querySelector('[data-keyword]')
    const pair = hero.querySelector('figure[data-figure="pair"]')
    const cta = hero.querySelector('a.v2-btn-cta')
    const style = getComputedStyle(h1)
    return {
      h1: box(h1),
      lead: box(h1.nextElementSibling),
      cta: box(cta),
      pair: box(pair),
      browser: box(pair.querySelector('[data-frame="browser"]')),
      phone: box(pair.querySelector('[data-frame="phone"]')),
      label: box(pair.querySelector('[data-illustration-label]')),
      fontSize: parseFloat(style.fontSize),
      lineHeight: parseFloat(style.lineHeight),
      keywordRects: keyword.getClientRects().length,
      keywordText: keyword.textContent,
      keywordWidth: keyword.getBoundingClientRect().width,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      ctaHref: cta.getAttribute('href'),
      ctaTrack: cta.getAttribute('data-track'),
    }
  })
}

test('Above the fold: H1, Lead, CTA und Produkt sind in 360, 390, 768, 1024 und 1440 px ohne Scrollen sichtbar', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Breiten werden im Desktop-Projekt per setViewportSize geprüft.')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const report = []
  for (const vp of FOLD_VIEWPORTS) {
    await page.setViewportSize(vp)
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const m = await measureHero(page)
    const at = `${vp.width}×${vp.height}`
    report.push(`${at}: H1 ${Math.round(m.h1.bottom)}, Lead ${Math.round(m.lead.bottom)}, CTA ${Math.round(m.cta.bottom)}, Paar ab ${Math.round(m.pair.top)}, Browser bis ${Math.round(m.browser.bottom)}, Phone ${Math.round(m.phone.top)}–${Math.round(m.phone.bottom)}, Kennzeichnung bis ${Math.round(m.label.bottom)}, H1 ${m.fontSize}px/${Math.round(m.h1.height / m.lineHeight)} Zeilen`)

    for (const key of ['h1', 'lead', 'cta']) {
      expect(m[key].top, `${at}: ${key} oben`).toBeGreaterThanOrEqual(0)
      expect(m[key].bottom, `${at}: ${key} unten`).toBeLessThanOrEqual(vp.height)
    }
    expect(m.keywordText, at).toBe('Handwerkersoftware,')
    expect(m.keywordRects, `${at}: Keyword in einem Stück`).toBe(1)
    expect(m.keywordWidth, `${at}: Keyword passt in die H1`).toBeLessThanOrEqual(m.h1.width + 0.5)
    expect(m.overflow, `${at}: kein horizontaler Scroll`).toBeLessThanOrEqual(1)
    expect(m.ctaHref, at).toMatch(/^https:\/\/app\.craftos\.eu/)
    expect(m.ctaTrack, at).toBe('trial')

    if (vp.width === 360) {
      expect(m.fontSize, '360: H1 28 px').toBe(28)
      expect(m.h1.height, '360: H1 höchstens 3 Zeilen').toBeLessThanOrEqual(3 * m.lineHeight + 1)
      expect(m.pair.top, '360: Produkt beginnt bis 460 px').toBeLessThanOrEqual(460)
    } else if (vp.width === 390) {
      expect(m.browser.bottom, '390: Browserrahmen vollständig').toBeLessThanOrEqual(vp.height)
      expect(m.phone.top, '390: Phone beginnt oberhalb der Falz').toBeLessThan(vp.height)
    } else {
      expect(m.browser.bottom, `${at}: Browser vollständig`).toBeLessThanOrEqual(vp.height)
      expect(m.phone.bottom, `${at}: Phone vollständig`).toBeLessThanOrEqual(vp.height)
      if (vp.width === 1440) expect(m.label.bottom, '1440: Kennzeichnung sichtbar').toBeLessThanOrEqual(vp.height)
    }
  }
  testInfo.annotations.push({ type: 'Above the fold', description: report.join(' | ') })
  console.log(`[${testInfo.project.name}] ${report.join('\n  ')}`)
})

test('Above the fold: Startseite ruhig und gekennzeichnet (keine Animation, Kurzform-Belege, axe in fünf Breiten)', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Breiten werden im Desktop-Projekt per setViewportSize geprüft.')
  test.setTimeout(120_000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0)

  const figures = await page.locator('figure[data-figure]').evaluateAll((els) => els.map((el) => ({
    kind: el.getAttribute('data-figure'),
    text: el.textContent,
  })))
  expect(figures.length).toBeGreaterThanOrEqual(5)
  for (const f of figures) expect(f.text, f.kind).toContain(FRAME_LABEL)

  const evidence = await page.locator('[data-evidence]').evaluateAll((els) => els.map((el) => el.getAttribute('data-evidence')))
  expect(evidence.length).toBeGreaterThan(0)
  for (const e of evidence) expect(e).toMatch(/^(web|app):[^\s/]+$/)

  const loginInContent = await page.locator('main [data-track="login"]').count()
  expect(loginInContent).toBe(0)

  for (const vp of FOLD_VIEWPORTS) {
    await page.setViewportSize(vp)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    expect(await severeAxe(page), `axe ${vp.width}×${vp.height}`).toEqual([])
  }
})

// Zwei-Klick-Nachweis (Plan 06-05; DESIGN-03, D-05, D-17, 06-RESEARCH „Zwei-Klick-Definition“): jede
// Live-Funktion ist nach genau einer Menü-Aktivierung über einen sichtbaren Funktions- oder Gruppenlink erreichbar.
async function overviewDetails(request) {
  const response = await request.get('/funktionen')
  expect(response.status()).toBe(200)
  const html = await response.text()
  const ids = [...html.matchAll(/data-funktion="([^"]+)"/g)].map((m) => m[1])
  expect(ids).toHaveLength(30)
  // Detail-Einträge sind die Karten mit Link „Mehr zu …“ auf /funktionen/<slug>.
  return ids.filter((id) => new RegExp(`href="/funktionen/${id}"[^>]*>Mehr zu `).test(html))
}

async function openFunctionsMenu(page, hasTouch) {
  const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
  const button = nav.getByRole('button', { name: 'Untermenü Funktionen', exact: true })
  if (hasTouch) await tapToggle(page, true)
  else await button.click()
  await expect(button).toHaveAttribute('aria-expanded', 'true')
  return page.locator('#navigation-funktionen')
}

async function expectAnchorBelowHeader(page, id) {
  const bottom = await page.locator('[data-site-header]').evaluate((el) => el.getBoundingClientRect().bottom)
  await expect
    .poll(() => page.locator(`h2#${id}`).evaluate((el) => Math.round(el.getBoundingClientRect().top)), { message: `#${id} unter dem Header` })
    .toBeGreaterThanOrEqual(Math.floor(bottom))
}

test('Zwei Klicks: Desktop – ein Klick auf „Untermenü Funktionen“ zeigt alle Funktions- und Gruppenlinks, Gruppenlink führt zum Anker', async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Desktop-Weg im 1440-Projekt; der Drawer wird im Touch-Projekt geprüft.')
  const details = await overviewDetails(request)
  expect([...details].sort()).toEqual([...DETAIL_SLUGS].sort())
  await page.goto('/')
  const panel = await openFunctionsMenu(page, false)
  for (const slug of details) await expect(panel.locator(`a[href="/funktionen/${slug}"]`), slug).toBeVisible()
  for (const id of GROUP_ANCHORS) await expect(panel.locator(`a[href="/funktionen#${id}"]`), id).toBeVisible()
  await panel.locator('a[href="/funktionen#rechnung"]').click()
  await expect(page).toHaveURL(/\/funktionen#rechnung$/)
  await expectAnchorBelowHeader(page, 'rechnung')
  await expect(page.locator('[data-funktion="mahnwesen"]')).toBeVisible()
  testInfo.annotations.push({ type: 'Zwei Klicks', description: `Desktop: ${details.length} Funktionslinks und ${GROUP_ANCHORS.length} Gruppenlinks nach 1 Klick sichtbar` })
})

test('Zwei Klicks: Mobil – ein Tap auf „Menü öffnen“ zeigt alle Funktions- und Gruppenlinks, Gruppenlink führt zum Anker', async ({ page, request, hasTouch }, testInfo) => {
  test.skip(!hasTouch, 'Mobiler Weg im Touch-Projekt.')
  const details = await overviewDetails(request)
  expect([...details].sort()).toEqual([...DETAIL_SLUGS].sort())
  await page.goto('/')
  const panel = await openFunctionsMenu(page, true)
  for (const slug of details) await expect(panel.locator(`a[href="/funktionen/${slug}"]`), slug).toBeVisible()
  for (const id of GROUP_ANCHORS) await expect(panel.locator(`a[href="/funktionen#${id}"]`), id).toBeVisible()
  await panel.locator('a[href="/funktionen#baustelle"]').tap()
  await expect(page).toHaveURL(/\/funktionen#baustelle$/)
  await expectAnchorBelowHeader(page, 'baustelle')
  await expect(page.locator('[data-funktion="maengel"]')).toBeVisible()
  testInfo.annotations.push({ type: 'Zwei Klicks', description: `Mobil: ${details.length} Funktionslinks und ${GROUP_ANCHORS.length} Gruppenlinks nach 1 Tap sichtbar` })
})

test('Zwei Klicks: Zuordnung – alle 30 Einträge auf /funktionen liegen in einer Gruppe, deren Link im geöffneten Menü sichtbar war', async ({ page, hasTouch }, testInfo) => {
  await page.goto('/')
  const panel = await openFunctionsMenu(page, hasTouch)
  const visibleGroups = []
  for (const id of GROUP_ANCHORS) {
    if (await panel.locator(`a[href="/funktionen#${id}"]`).isVisible()) visibleGroups.push(id)
  }
  expect(visibleGroups).toEqual(GROUP_ANCHORS)
  await page.goto('/funktionen')
  const entries = await page.locator('[data-funktion]').evaluateAll((els) => els.map((el) => ({
    id: el.getAttribute('data-funktion'),
    gruppe: el.closest('[data-gruppe]')?.getAttribute('data-gruppe') ?? null,
  })))
  expect(entries).toHaveLength(30)
  for (const e of entries) expect(visibleGroups, `${e.id} in ${e.gruppe}`).toContain(e.gruppe)
  const detailCount = entries.filter((e) => DETAIL_SLUGS.includes(e.id)).length
  expect(detailCount).toBe(16)
  testInfo.annotations.push({
    type: 'Zwei Klicks',
    description: `${testInfo.project.name}: ${entries.length} Funktionen erreichbar (${detailCount} Detail + ${entries.length - detailCount} Zusatz)`,
  })
})

test('Zwei Klicks: Ziele – alle Links der Übersichtseinträge und des Funktionen-Panels liefern 200', async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Serverantworten sind geräteunabhängig.')
  await page.goto('/funktionen')
  const entryLinks = await page.locator('[data-funktion] a[href]').evaluateAll((els) => els.map((el) => el.getAttribute('href')))
  expect(entryLinks).toHaveLength(16 + 7)
  const panelLinks = await page.locator('#navigation-funktionen a[href]').evaluateAll((els) => els.map((el) => el.getAttribute('href')))
  for (const href of ['/funktionen', '/app', '/craft-ai', '/gobd', '/vergleich']) expect(panelLinks, href).toContain(href)
  const paths = [...new Set([...entryLinks, ...panelLinks].map((href) => href.split('#')[0]))]
  for (const p of paths) {
    const response = await request.get(p)
    expect(response.status(), p).toBe(200)
  }
})

// Funktionsübersicht im Browser (Plan 06-05; 06-UI-SPEC „Seite 3“ und Prüfmatrix).
test('Funktionsübersicht: axe, kein horizontaler Scroll und ungetrenntes Keyword in fünf Breiten', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Breiten werden im Desktop-Projekt per setViewportSize geprüft.')
  test.setTimeout(120_000)
  for (const vp of FOLD_VIEWPORTS) {
    await page.setViewportSize(vp)
    await page.goto('/funktionen')
    await page.waitForLoadState('networkidle')
    const m = await page.evaluate(() => {
      const h1 = document.querySelector('h1')
      const kw = h1.querySelector('[data-keyword]')
      return {
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        rects: kw.getClientRects().length,
        kw: kw.getBoundingClientRect().width,
        h1: h1.getBoundingClientRect().width,
        h1Count: document.querySelectorAll('h1').length,
      }
    })
    expect(m.overflow, `horizontaler Scroll ${vp.width}`).toBeLessThanOrEqual(1)
    expect(m.rects, `Keyword in einer Zeile ${vp.width}`).toBe(1)
    expect(m.kw, `Keyword ≤ H1 ${vp.width}`).toBeLessThanOrEqual(m.h1 + 0.5)
    expect(m.h1Count).toBe(1)
    expect(await severeAxe(page), `axe ${vp.width}×${vp.height}`).toEqual([])
  }
})

test('Funktionsübersicht: Sprunglinks, reduzierte Bewegung, Kurzform-Belege und Kennzeichnung', async ({ page, hasTouch }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/funktionen')
  await page.waitForLoadState('networkidle')
  // WebKit meldet beim Laden kurzzeitig 0,01-ms-Übergänge (globale Reduced-Motion-Regel mit transition: all);
  // geprüft wird, dass danach nichts mehr läuft.
  await expect.poll(() => page.evaluate(() => document.getAnimations().length), { timeout: 3_000 }).toBe(0)

  const jump = page.getByRole('navigation', { name: 'Funktionsgruppen' })
  const links = jump.getByRole('link')
  await expect(links).toHaveCount(6)
  expect(await links.evaluateAll((els) => els.map((el) => el.getAttribute('href')))).toEqual(GROUP_ANCHORS.map((id) => `#${id}`))
  for (const id of GROUP_ANCHORS) {
    await page.evaluate(() => window.scrollTo(0, 0))
    const link = jump.locator(`a[href="#${id}"]`)
    if (hasTouch) await link.tap()
    else await link.click()
    await expect(page).toHaveURL(new RegExp(`/funktionen#${id}$`))
    await expectAnchorBelowHeader(page, id)
  }

  const figures = await page.locator('figure[data-figure]').evaluateAll((els) => els.map((el) => el.textContent))
  expect(figures).toHaveLength(5)
  for (const text of figures) expect(text).toContain(FRAME_LABEL)
  const evidence = await page.locator('[data-evidence]').evaluateAll((els) => els.map((el) => el.getAttribute('data-evidence')))
  expect(evidence.length).toBeGreaterThan(0)
  for (const e of evidence) expect(e).toMatch(/^(web|app):[^\s/]+$/)
})

test('Funktionsübersicht: ohne JavaScript stehen alle 30 Funktionen im Dokument', async ({ browser, baseURL }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Serverausgabe ist unabhängig von Touch.')
  const origin = new URL(baseURL).origin
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
  try {
    await page.goto(new URL('/funktionen', baseURL).href)
    await expect(page.locator('[data-funktion]')).toHaveCount(30)
    await expect(page.locator('[data-gruppe]')).toHaveCount(6)
    await expect(page.getByRole('link', { name: /^Mehr zu / })).toHaveCount(16)
  } finally { await context.close() }
})
