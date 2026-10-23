/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser regression suite. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')
const AxeBuilder = require('@axe-core/playwright').default
const path = require('node:path')
const { pathToFileURL } = require('node:url')

/**
 * Barrierefreiheit der Vorlagen und Tastaturbedienung (Phase 10, Plan 10-08; D-05 bis D-07, D-31 Nr. 1, 21, 40;
 * 10-UI-SPEC § 9.2). axe läuft wie in scripts/a11y-audit.mjs (`.options()` vor `.withTags()`, Bewertung über
 * `bewerteAxe` aus scripts/lib/a11y-audit-core.mjs: Gate plus Großtext unter 4,5 : 1). Die Spec iteriert die fünf
 * Breiten selbst, weil playwright.config.cjs nur 1440 und 390 als Projekte führt; Fälle mit Breitenschleife laufen
 * im Desktop-Projekt. Testnamen-Präfixe („Vorlage:“, „Tastatur:“) erlauben das Filtern per -g; der Fall für
 * /impressum heißt „Vorlage: Rechtsseite /impressum“ und ist so gezielt ausweisbar.
 * Läuft nur lokal gegen next start; externe Requests werden abgebrochen.
 */

const BREITEN = [360, 390, 768, 1024, 1440]
/** Je Vorlage eine Seite (D-05); muss WEBKIT_VORLAGEN aus a11y-audit-core.mjs entsprechen (eigener Fall). */
const VORLAGEN = [
  '/',
  '/funktionen',
  '/funktionen/zeiterfassung',
  '/app',
  '/gewerke',
  '/gewerke/elektriker',
  '/blog',
  '/hilfe/kategorie/einrichtung',
  '/blog/handwerkerrechnung-schreiben',
  '/hilfe/rechnung-fertigstellen',
  '/vergleich',
  '/vergleich/plancraft-alternative',
  '/preise',
  '/fakten-ueber-craftos',
  '/craft-ai',
  '/gobd',
  '/rechner/stundensatz',
  '/support',
  '/impressum',
  '/gibt-es-nicht-a11y',
]
const RECHTSSEITEN = ['/impressum']
const NUR_DESKTOP = 'Die Breiten werden im Desktop-Projekt per setViewportSize geprüft.'
/** WebKit unter Windows fokussiert Links per Tab nicht (10-01, gemessen); Link-Tabstopps prüft Chromium. */
const WEBKIT_LINKS = 'WebKit fokussiert Links per Tab nicht; geprüft in Chromium.'

let kern
/** Kern-Datei (ESM) einmal laden. */
async function core() {
  kern ??= await import(pathToFileURL(path.join(__dirname, '..', '..', 'scripts', 'lib', 'a11y-audit-core.mjs')).href)
  return kern
}

test.beforeEach(async ({ page, baseURL }) => {
  const origin = new URL(baseURL).origin
  await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
})

/** axe nach D-06: Gate-Verstöße und Großtext-Knoten unter 4,5 : 1 als Textzeilen. */
async function axeBefunde(page) {
  const { AXE_TAGS, bewerteAxe } = await core()
  const result = await new AxeBuilder({ page })
    .options({ rules: { 'color-contrast-enhanced': { enabled: true } } })
    .withTags(AXE_TAGS)
    .analyze()
  const { gate, grossText } = bewerteAxe(result)
  return [...gate, ...grossText].map((b) => `${b.regel} (${b.wirkung}) ${b.selektor}`)
}

async function laden(page, pfad) {
  const response = await page.goto(pfad)
  await page.waitForLoadState('networkidle')
  return response
}

/** Kein horizontaler Seitenscroll und keine überlaufende H1. */
async function querscroll(page) {
  return page.evaluate(() => {
    const root = document.documentElement
    const h1 = document.querySelector('h1')
    const befunde = []
    if (root.scrollWidth > root.clientWidth) befunde.push(`Seite ${root.scrollWidth} > ${root.clientWidth}`)
    if (h1 && h1.scrollWidth > h1.clientWidth) befunde.push(`H1 ${h1.scrollWidth} > ${h1.clientWidth}`)
    return befunde
  })
}

function vorlagenName(pfad) {
  return RECHTSSEITEN.includes(pfad) ? `Vorlage: Rechtsseite ${pfad}` : `Vorlage: ${pfad}`
}

test('Vorlage: Liste entspricht WEBKIT_VORLAGEN', async () => {
  const { WEBKIT_VORLAGEN } = await core()
  expect(VORLAGEN).toEqual(WEBKIT_VORLAGEN)
})

for (const pfad of VORLAGEN) {
  test(vorlagenName(pfad), async ({ page }, testInfo) => {
    test.skip(testInfo.project.use.hasTouch, NUR_DESKTOP)
    test.setTimeout(120_000)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const findings = []
    for (const width of BREITEN) {
      await page.setViewportSize({ width, height: 900 })
      await laden(page, pfad)
      for (const b of await axeBefunde(page)) findings.push(`${width}: ${b}`)
      for (const b of await querscroll(page)) findings.push(`${width}: ${b}`)
    }
    expect(findings).toEqual([])
  })
}

test('Tastatur: Sprunglink', async ({ page, browserName }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, NUR_DESKTOP)
  test.skip(browserName === 'webkit', WEBKIT_LINKS)
  test.setTimeout(90_000)
  const findings = []
  for (const width of BREITEN) {
    await page.setViewportSize({ width, height: 900 })
    await laden(page, '/')
    await page.keyboard.press('Tab')
    const erster = await page.evaluate(() => document.activeElement?.matches('a.skip-link[href="#inhalt"]') ?? false)
    if (!erster) {
      findings.push(`${width}: erster Tabstopp ist nicht der Sprunglink`)
      continue
    }
    await page.keyboard.press('Enter')
    await expect.poll(() => page.evaluate(() => location.hash)).toBe('#inhalt')
    // Der Sprung verlegt den Startpunkt der Tab-Reihenfolge in den Hauptbereich.
    await page.keyboard.press('Tab')
    const imInhalt = await page.evaluate(() => {
      const a = document.activeElement
      return !!a && a !== document.body && !!document.getElementById('inhalt')?.contains(a)
    })
    if (!imInhalt) findings.push(`${width}: Fokus nach dem Sprung nicht in #inhalt`)
  }
  expect(findings).toEqual([])
})

test('Tastatur: Menü und Drawer', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, NUR_DESKTOP)
  test.setTimeout(90_000)
  const findings = []
  for (const width of BREITEN) {
    await page.setViewportSize({ width, height: 900 })
    await laden(page, '/')
    const drawer = page.getByRole('button', { name: 'Menü öffnen' })
    const istDrawer = await drawer.isVisible()
    const ausloeser = istDrawer ? drawer : page.locator('header button[data-nav-disclosure]').first()
    for (const taste of ['Enter', 'Space']) {
      await ausloeser.focus()
      await page.keyboard.press(taste)
      // Der Drawer-Schalter wechselt beim Öffnen sein Label; geprüft wird über die feste Steuerung.
      const offen = istDrawer ? page.locator('header button[aria-controls="hauptnavigation"]') : ausloeser
      await expect(offen, `${width} ${taste}: geöffnet`).toHaveAttribute('aria-expanded', 'true')
      if (istDrawer) {
        const inert = await page.evaluate(() => ['main', 'footer'].map((t) => document.querySelector(t)?.inert === true))
        if (inert.includes(false)) findings.push(`${width} ${taste}: main/footer nicht inert bei offenem Drawer`)
      }
      await page.keyboard.press('Escape')
      await expect(offen, `${width} ${taste}: nach Esc geschlossen`).toHaveAttribute('aria-expanded', 'false')
      const zurueck = await offen.evaluate((el) => document.activeElement === el)
      if (!zurueck) findings.push(`${width} ${taste}: Fokus nach Esc nicht auf dem Auslöser`)
    }
  }
  expect(findings).toEqual([])
})

test('Tastatur: FAQ', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, NUR_DESKTOP)
  test.setTimeout(90_000)
  const findings = []
  for (const width of BREITEN) {
    await page.setViewportSize({ width, height: 900 })
    await laden(page, '/gobd')
    const summary = page.locator('main details > summary').first()
    const details = summary.locator('xpath=..')
    const offen = () => details.evaluate((d) => d.open)
    for (const taste of ['Enter', 'Space']) {
      await summary.focus()
      const vorher = await offen()
      await page.keyboard.press(taste)
      await expect.poll(offen, { message: `${width} ${taste}: öffnet` }).toBe(!vorher)
      await page.keyboard.press(taste)
      await expect.poll(offen, { message: `${width} ${taste}: schließt` }).toBe(vorher)
    }
  }
  expect(findings).toEqual([])
})

test('Tastatur: Rechner', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, NUR_DESKTOP)
  test.setTimeout(90_000)
  const findings = []
  for (const width of BREITEN) {
    await page.setViewportSize({ width, height: 900 })
    await laden(page, '/rechner/stundensatz')
    const feld = page.getByLabel('Personalkosten pro Jahr in Euro')
    const formular = feld.locator('xpath=ancestor::form[1]')
    // Felder per Tab: Ab dem ersten Feld erreicht die Tab-Folge jedes Eingabefeld des Formulars (Radiogruppe = ein Stopp).
    const ziele = await formular.evaluate((f) => [...f.querySelectorAll('input, select, textarea')]
      .filter((el) => !el.disabled && el.type !== 'hidden' && el.getClientRects().length > 0)
      .map((el) => (el.type === 'radio' ? `radio:${el.name}` : el.id || el.name)))
    await formular.evaluate((f) => f.querySelector('input:not([type="hidden"]), select, textarea')?.focus())
    const erreicht = new Set()
    for (let i = 0; i < ziele.length + 10; i++) {
      erreicht.add(await page.evaluate(() => {
        const el = document.activeElement
        if (!el || !(el instanceof HTMLElement)) return ''
        return el instanceof HTMLInputElement && el.type === 'radio' ? `radio:${el.name}` : el.id || el.getAttribute('name') || ''
      }))
      await page.keyboard.press('Tab')
    }
    const fehlend = [...new Set(ziele)].filter((z) => !erreicht.has(z))
    if (fehlend.length) findings.push(`${width}: per Tab nicht erreicht: ${fehlend.join(', ')}`)
    // Eingabe ändert das Ergebnis im aria-live-Bereich.
    const live = page.locator('[aria-live="polite"]').first()
    const vorher = await live.textContent()
    await feld.focus()
    await page.keyboard.press('ControlOrMeta+A')
    await page.keyboard.type('123456')
    await expect.poll(() => live.textContent(), { message: `${width}: Ergebnis im aria-live-Bereich` }).not.toBe(vorher)
    // Rechenweg per Tastatur.
    const rechenweg = page.locator('section details > summary').first()
    const details = rechenweg.locator('xpath=..')
    await rechenweg.focus()
    const war = await details.evaluate((d) => d.open)
    await page.keyboard.press('Enter')
    await expect.poll(() => details.evaluate((d) => d.open), { message: `${width}: Rechenweg Enter` }).toBe(!war)
    await page.keyboard.press('Space')
    await expect.poll(() => details.evaluate((d) => d.open), { message: `${width}: Rechenweg Leertaste` }).toBe(war)
  }
  expect(findings).toEqual([])
})

test('Tastatur: Suche', async ({ page, browserName }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, NUR_DESKTOP)
  test.setTimeout(90_000)
  const findings = []
  for (const width of BREITEN) {
    await page.setViewportSize({ width, height: 900 })
    await laden(page, '/hilfe')
    const suche = page.getByLabel('Artikel suchen')
    const status = page.locator('main p[role="status"]').first()
    const vorher = await status.textContent()
    await suche.focus()
    await expect(suche).toBeFocused()
    await page.keyboard.type('Rechnung')
    await expect.poll(() => status.textContent(), { message: `${width}: Trefferzahl` }).not.toBe(vorher)
    const treffer = page.locator('main a[href^="/hilfe/"]:not([href^="/hilfe/kategorie"])').first()
    await expect(treffer).toBeVisible()
    if (browserName === 'webkit') {
      // Links nimmt WebKit nicht in die Tab-Folge (10-01); fokussierbar müssen sie trotzdem sein.
      await treffer.focus()
      await expect(treffer).toBeFocused()
      continue
    }
    let erreicht = false
    for (let i = 0; i < 6 && !erreicht; i++) {
      await page.keyboard.press('Tab')
      erreicht = await treffer.evaluate((el) => document.activeElement === el)
    }
    if (!erreicht) findings.push(`${width}: erster Treffer per Tab nicht erreicht`)
  }
  expect(findings).toEqual([])
})

test('Tastatur: Pause', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, NUR_DESKTOP)
  test.setTimeout(90_000)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const findings = []
  for (const width of BREITEN) {
    await page.setViewportSize({ width, height: 900 })
    await laden(page, '/funktionen/lager')
    const snippet = page.locator('[data-feature-illustration]').first()
    await snippet.scrollIntoViewIfNeeded()
    await expect(snippet, `${width}: Animation läuft`).toHaveAttribute('data-running', 'true', { timeout: 15_000 })
    const knopf = page.getByRole('button', { name: 'Animation pausieren', exact: true }).first()
    if (!(await knopf.evaluate((el) => el.tabIndex >= 0))) findings.push(`${width}: Pause-Knopf nicht in der Tab-Folge`)
    await knopf.focus()
    await expect(knopf).toBeFocused()
    await page.keyboard.press('Space')
    await expect(snippet, `${width}: Leertaste pausiert`).toHaveAttribute('data-running', 'false')
    await expect(page.getByRole('button', { name: 'Animation fortsetzen', exact: true }).first()).toBeFocused()
  }
  expect(findings).toEqual([])
})

test('Tastatur: Tabellen-Scroll', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, NUR_DESKTOP)
  await page.setViewportSize({ width: 360, height: 900 })
  await laden(page, '/preise')
  const bereich = page.locator('main [role="region"][tabindex="0"]').first()
  await bereich.focus()
  await expect(bereich).toBeFocused()
  const links = () => bereich.evaluate((el) => el.scrollLeft)
  const vorher = await links()
  await page.keyboard.press('ArrowRight')
  await expect.poll(links, { message: 'Pfeil rechts scrollt den Tabellenbereich' }).toBeGreaterThan(vorher)
})

test('Vorlage: 404', async ({ page }) => {
  const res = await page.goto('/gibt-es-nicht-a11y')
  expect(res.status()).toBe(404)
  const robots = await page.locator('meta[name="robots"]').evaluateAll((m) => m.map((x) => x.getAttribute('content') ?? ''))
  expect(robots.some((c) => /noindex/.test(c)), `robots: ${robots.join(' | ')}`).toBe(true)
  await expect(page.locator('nav[aria-label="Brotkrumen"]')).toHaveCount(0)
})

test('Vorlage: Styleguide-Bild', async ({ page }) => {
  await laden(page, '/styleguide')
  const bild = page.locator('img[src*="werkstatt-2026"]').first()
  const alt = await bild.getAttribute('alt')
  expect(alt?.trim().length ?? 0, 'Alt-Text werkstatt-2026').toBeGreaterThan(0)
  const kennzeichnung = bild.locator('xpath=ancestor::figure[1]').locator('[data-illustration-label="ki"]')
  await expect(kennzeichnung).toBeVisible()
  await expect(kennzeichnung).toHaveText('Darstellung, KI-gestaltet')
})

test('Vorlage: Silbentrennung WebKit', async ({ page, browserName }) => {
  test.skip(browserName !== 'webkit', 'D-31 Nr. 21 betrifft nur WebKit.')
  await page.setViewportSize({ width: 360, height: 900 })
  await laden(page, '/hilfe/material-entnehmen-zurueckbuchen')
  const breite = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }))
  expect(breite.scroll, 'kein horizontaler Seitenscroll bei 360 px').toBeLessThanOrEqual(breite.client)
})
