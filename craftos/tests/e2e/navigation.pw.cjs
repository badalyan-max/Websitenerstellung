/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser regression suite. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')

async function activate(locator, hasTouch) {
  if (hasTouch) await locator.tap()
  else await locator.click()
}

async function atScroll(page, top) {
  await page.evaluate((value) => window.scrollTo({ top: value, behavior: 'instant' }), top)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(top)
}

async function toggleVisibleMenu(page, hasTouch) {
  const toggle = page.getByRole('button', { name: /Menü (öffnen|schließen)/ })
  await expect(toggle).toBeVisible()
  const box = await toggle.boundingBox()
  // Locator.click/tap can scroll a sticky target to its original document position.
  // A real tap uses the button's currently visible viewport coordinates.
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  if (hasTouch) await page.touchscreen.tap(x, y)
  else await page.mouse.click(x, y)
}

test('Mobile Navigation behält beim Hover ihre Höhe', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/funktionen')
  await page.getByRole('button', { name: 'Menü öffnen' }).click()
  const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
  // D-17: Der Drawer öffnet mit aufgeklappter Gruppe „Funktionen“.
  await expect(nav.getByRole('button', { name: 'Untermenü Funktionen', exact: true })).toHaveAttribute('aria-expanded', 'true')
  const product = nav.getByRole('link', { name: 'Funktionen', exact: true })
  const firstLink = nav.getByRole('link', { name: 'Alle Funktionen', exact: true })
  const panel = firstLink.locator('..')
  await page.mouse.move(380, 76)
  const before = await panel.boundingBox()
  await product.hover()
  const after = await panel.boundingBox()
  expect(after.height).toBeCloseTo(before.height, 0)
  await firstLink.focus()
  expect((await panel.boundingBox()).height).toBeCloseTo(before.height, 0)
})

test('Mobile Navigation öffnet Gewerke per Tippen und folgt dem ausgewählten Link', async ({ page, hasTouch }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/funktionen')
  const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
  await atScroll(page, 700)
  await toggleVisibleMenu(page, hasTouch)
  // D-17: „Funktionen“ ist ohne weiteren Tap aufgeklappt (vorher: Tap auf „Produkt“).
  const functions = nav.getByRole('button', { name: 'Untermenü Funktionen', exact: true })
  await expect(functions).toHaveAttribute('aria-expanded', 'true')
  await expect(page).toHaveURL(/\/funktionen$/)
  await expect(nav.getByRole('link', { name: 'Alle Funktionen', exact: true })).toBeVisible()
  await activate(nav.getByRole('button', { name: 'Untermenü Gewerke', exact: true }), hasTouch)
  // 06-UI-SPEC „Akkordeon“: Im Drawer dürfen mehrere Gruppen gleichzeitig offen sein.
  await expect(nav.getByRole('button', { name: 'Untermenü Gewerke', exact: true })).toHaveAttribute('aria-expanded', 'true')
  await expect(functions).toHaveAttribute('aria-expanded', 'true')
  await expect(nav.getByRole('link', { name: 'Alle Funktionen', exact: true })).toBeVisible()
  await expect(page.locator('#navigation-gewerke a')).toHaveCount(13)
  await expect(page.locator('#navigation-gewerke a').first()).toHaveText('Alle Gewerke')
  await activate(nav.getByRole('link', { name: 'Elektriker & Elektrotechnik', exact: true }), hasTouch)
  await expect(page).toHaveURL(/\/gewerke\/elektriker$/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  await expect(page.getByRole('button', { name: 'Menü öffnen' })).toHaveAttribute('aria-expanded', 'false')
  await expect(nav).toBeHidden()
})

test('Mobile Navigation bleibt angeheftet und scrollt intern ohne die Seite zu verschieben', async ({ page, hasTouch }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/funktionen')
  await atScroll(page, 700)
  const header = page.locator('header').first()
  expect((await header.boundingBox()).y).toBe(0)
  await toggleVisibleMenu(page, hasTouch)
  expect((await header.boundingBox()).y).toBe(0)
  const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
  await activate(nav.getByRole('button', { name: 'Untermenü Gewerke', exact: true }), hasTouch)
  await nav.getByRole('link', { name: '10 Tage testen', exact: true }).focus()
  await expect.poll(() => nav.evaluate((el) => el.scrollTop)).toBeGreaterThan(0)
  expect(await page.evaluate(() => window.scrollY)).toBe(700)
  expect((await header.boundingBox()).y).toBe(0)
  await page.keyboard.press('Escape')
  await expect(nav).toBeHidden()
  await expect(page.getByRole('button', { name: 'Menü öffnen' })).toBeFocused()
  expect(await page.evaluate(() => window.scrollY)).toBe(700)
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('')
  await atScroll(page, 900)
  expect((await header.boundingBox()).y).toBe(0)
})

test('Navigation räumt beim Größenwechsel offene Untermenüs und Scrollsperren auf', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/funktionen')
  await page.getByRole('button', { name: 'Menü öffnen' }).click()
  const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
  await nav.getByRole('button', { name: 'Untermenü Gewerke', exact: true }).click()
  await page.setViewportSize({ width: 1440, height: 1000 })
  await expect(nav).toBeVisible()
  await expect(nav.getByRole('button', { name: 'Untermenü Gewerke', exact: true })).toHaveAttribute('aria-expanded', 'false')
  await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe('')
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(nav).toBeHidden()
  await page.getByRole('button', { name: 'Menü öffnen' }).click()
  await expect(nav).toBeVisible()
  await expect(nav.getByRole('button', { name: 'Untermenü Gewerke', exact: true })).toHaveAttribute('aria-expanded', 'false')
  await page.getByRole('button', { name: 'Menü schließen' }).click()
  await expect(nav).toBeHidden()
})

test('Mobile Navigation zeigt nach Gruppenwechsel im Querformat den gewählten Bereich', async ({ page, hasTouch }) => {
  await page.setViewportSize({ width: 844, height: 390 })
  await page.goto('/funktionen')
  await toggleVisibleMenu(page, hasTouch)
  const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
  await activate(nav.getByRole('button', { name: 'Untermenü Gewerke', exact: true }), hasTouch)
  const knowledge = nav.getByRole('button', { name: 'Untermenü Wissen', exact: true })
  await activate(knowledge, hasTouch)
  await expect(knowledge).toHaveAttribute('aria-expanded', 'true')
  await expect.poll(async () => (await knowledge.boundingBox()).y - (await nav.boundingBox()).y).toBeGreaterThanOrEqual(0)
  const firstLink = nav.getByRole('link', { name: 'Ratgeber', exact: true })
  const linkBox = await firstLink.boundingBox()
  const navBox = await nav.boundingBox()
  expect(linkBox.y).toBeGreaterThanOrEqual(navBox.y)
  expect(linkBox.y + linkBox.height).toBeLessThanOrEqual(navBox.y + navBox.height)
})

test('Desktop Navigation bedient Dropdowns per Maus und Tastatur und schließt mit Escape oder Außenklick', async ({ page, hasTouch }) => {
  test.skip(hasTouch, 'Desktop-Maus und Tastatur werden im Desktop-Projekt geprüft.')
  await page.goto('/funktionen')
  const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
  const product = nav.getByRole('button', { name: 'Untermenü Funktionen', exact: true })
  // Erster Panel-Link ist der Gruppenlink „Angebot“ (06-UI-SPEC „Pfeil runter“ und Tab-Reihenfolge).
  const firstLink = page.locator('#navigation-funktionen a').first()
  const allFunctions = page.locator('#navigation-funktionen').getByRole('link', { name: 'Alle Funktionen', exact: true })
  await product.hover()
  await expect(firstLink).toBeVisible()
  await expect(firstLink).toHaveAttribute('href', '/funktionen#angebot')
  await expect(allFunctions).toBeVisible()
  await firstLink.hover()
  await expect(product).toHaveAttribute('aria-expanded', 'true')
  await page.mouse.move(30, 600)
  await expect(firstLink).toBeHidden()
  // Klick auf den Schalter nach Hover-Öffnen hält das Panel offen, auch nach Verlassen des Hauptpunkts.
  await product.hover()
  await expect(firstLink).toBeVisible()
  await product.click()
  await expect(product).toHaveAttribute('aria-expanded', 'true')
  await page.mouse.move(30, 600)
  await expect(firstLink).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(firstLink).toBeHidden()
  await product.focus()
  await page.keyboard.press('Enter')
  await expect(firstLink).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(firstLink).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(firstLink).toBeHidden()
  await expect(product).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(firstLink).toBeFocused()
  await page.locator('main').click({ position: { x: 25, y: 100 } })
  await expect(firstLink).toBeHidden()
  const trades = nav.getByRole('button', { name: 'Untermenü Gewerke', exact: true })
  await trades.hover()
  await expect(nav.getByRole('link', { name: 'Alle Gewerke', exact: true })).toBeVisible()
  expect((await page.locator('#navigation-gewerke').boundingBox()).x).toBeGreaterThanOrEqual(0)
  await page.mouse.move(30, 600)
  await atScroll(page, 700)
  expect((await page.locator('header').first().boundingBox()).y).toBe(0)
})

test('Desktop Navigation: Escape greift nur bei Fokus im Header oder Hover-Panel ein und lässt Eingabefelder unberührt', async ({ page, hasTouch }) => {
  test.skip(hasTouch, 'Desktop-Maus und Tastatur werden im Desktop-Projekt geprüft.')
  await page.goto('/rechner/stundensatz')
  // Nach allen Dokument-Handlern festhalten, ob Esc sein Standardverhalten behalten hat.
  await page.evaluate(() => {
    window.__escPrevented = []
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') window.__escPrevented.push(event.defaultPrevented)
    })
  })
  const escPrevented = () => page.evaluate(() => window.__escPrevented)
  const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
  const product = nav.getByRole('button', { name: 'Untermenü Funktionen', exact: true })
  const panel = page.locator('#navigation-funktionen')

  // 1. Fokus im Eingabefeld, Panel nur per Hover offen: Esc gehört dem Feld, kein Fokusraub, kein preventDefault.
  const input = page.locator('main input').first()
  // WebKit übernimmt den Fokus erst nach der Hydrierung zuverlässig; bis dahin erneut fokussieren.
  await expect(async () => {
    await input.click()
    await expect(input).toBeFocused({ timeout: 500 })
  }).toPass()
  await product.hover()
  await expect(panel).toBeVisible()
  await expect(input).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(input).toBeFocused()
  expect(await escPrevented()).toEqual([false])

  // 2. Fokus auf einem Inhaltselement, Panel per Hover offen: Esc schließt das Panel, der Fokus bleibt im Inhalt.
  await page.mouse.move(30, 600)
  await expect(panel).toBeHidden()
  // Fokussierbares Inhaltselement, das kein Eingabefeld ist (WebKit fokussiert Links ohne tabindex nicht per Skript).
  const contentTarget = page.locator('main h1').first()
  await contentTarget.evaluate((el) => el.setAttribute('tabindex', '-1'))
  await contentTarget.focus()
  await expect(contentTarget).toBeFocused()
  await product.hover()
  await expect(panel).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(panel).toBeHidden()
  await expect(contentTarget).toBeFocused()
  expect(await escPrevented()).toEqual([false, true])

  // 3. Fokus im Header (Tastatur): Esc schließt und gibt den Fokus an den Schalter zurück.
  await page.mouse.move(30, 600)
  await product.focus()
  await page.keyboard.press('Enter')
  await expect(panel).toBeVisible()
  await page.keyboard.press('ArrowDown')
  await expect(panel.locator('a').first()).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(panel).toBeHidden()
  await expect(product).toBeFocused()
  expect(await escPrevented()).toEqual([false, true, true])

  // 4. Kein Panel offen: Esc bleibt unangetastet.
  await contentTarget.focus()
  await page.keyboard.press('Escape')
  await expect(contentTarget).toBeFocused()
  expect(await escPrevented()).toEqual([false, true, true, false])
})
