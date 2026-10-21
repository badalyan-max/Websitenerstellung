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
  // Geprüft wird die Navigation (Header samt Panels und Drawer). Die alte Startseite enthält bis Plan 06-04
  // noch FeatureSnippet-Szenen mit einer eigenen tab-size-Transition (WebKit); sie entfallen dort (D-04).
  const running = await page.evaluate(() => document.getAnimations().filter((a) => {
    const el = a.effect && a.effect.target
    return el && el.closest && el.closest('header')
  }).map((a) => {
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
