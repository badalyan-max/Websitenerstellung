/* eslint-disable @typescript-eslint/no-require-imports -- Supports a Playwright installation in another worktree. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')

const MAIN_LABEL = /Beispieleinsatz Bäckerei Krause, Mila Schneider, Dienstag, 3,5 Stunden/
const MOVE_OPTION = 'Bei anderer Person umplanen statt kopieren'

async function openPlanning(page, { create = true } = {}) {
  await page.goto('/')
  const demo = page.locator('[data-product-demo]').first()
  const mobile = demo.locator('[data-demo-mobile]')
  if (await mobile.isVisible()) {
    await mobile.getByRole('combobox', { name: 'Produktdemo auswählen', exact: true }).selectOption('planung')
  } else {
    await demo.getByRole('navigation', { name: 'Produktdemo auswählen', exact: true }).getByRole('button', { name: 'Planung', exact: true }).click()
  }
  await expect(demo).toHaveAttribute('data-product-demo', 'planung')
  if (create) await demo.getByRole('button', { name: 'Einsatz anlegen', exact: true }).click()
  return { demo, mobile, board: demo.locator('[data-planning-board]:visible') }
}

function target(board, member, day) {
  return board.locator(`[data-planning-target][data-member="${member}"][data-day="${day}"]`)
}

async function center(locator) {
  const box = await locator.boundingBox()
  expect(box, 'Das Interaktionsziel muss sichtbar sein').not.toBeNull()
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
}

async function beginMouseDrag(page, board, destination) {
  await board.scrollIntoViewIfNeeded()
  const from = await center(board.locator('[data-planning-assignment]'))
  const to = await center(destination)
  await page.mouse.move(from.x, from.y)
  await page.mouse.down()
  await page.mouse.move(to.x, to.y, { steps: 12 })
  return { from, to }
}

async function resetAndCreate(demo) {
  await demo.getByRole('button', { name: 'Diese Demo wiederholen', exact: true }).click()
  await expect(demo.locator('[data-planning-assignment]:visible')).toHaveCount(0)
  await demo.getByRole('button', { name: 'Einsatz anlegen', exact: true }).click()
}

async function reopenMobileBoard(demo) {
  if (!await demo.locator('[data-demo-mobile]').isVisible()) return
  const details = demo.locator('[data-demo-mobile] details').filter({ hasText: 'Plantafel weiter ausprobieren' })
  if (await details.count() && await details.getAttribute('open') === null) await details.locator('summary').click()
}

test.beforeEach(async ({ page }) => {
  const allowedOrigin = new URL(test.info().project.use.baseURL || process.env.CRAFTOS_BASE_URL || 'http://localhost:3100').origin
  await page.route('**/*', (route) => new URL(route.request().url()).origin === allowedOrigin ? route.continue() : route.abort())
})

for (const forceMove of [false, true]) {
  test(`Plantafel geführt: Nächster Schritt übernimmt Zielperson und Umplanen=${forceMove}`, async ({ page }) => {
    const { demo, mobile, board } = await openPlanning(page)
    const isMobile = await mobile.isVisible()
    await demo.getByRole('combobox', { name: isMobile ? 'Zielperson' : 'Mitarbeiter', exact: true }).selectOption('jonas')
    await board.getByRole('checkbox', { name: MOVE_OPTION }).setChecked(forceMove)
    await demo.getByRole('button', { name: 'Nächster Schritt', exact: true }).click()
    await reopenMobileBoard(demo)
    const current = demo.locator('[data-planning-board]:visible')
    await expect(current).toContainText(forceMove ? '3,5 Std. eingeplant' : '7 Std. eingeplant')
    await expect(current.locator('[data-planning-assignment]')).toHaveAccessibleName(new RegExp(forceMove ? 'Jonas Weber' : 'Mila Schneider'))
    await expect(current.getByRole('status')).toContainText(forceMove ? 'Einsatz verschoben' : 'Zusätzlich eingeplant')
  })
}

test('Beispieldemo: erkennbare Abgrenzung und kein automatischer Start', async ({ page }) => {
  await page.clock.install()
  await page.goto('/')
  const demo = page.locator('[data-product-demo]').first()
  await demo.scrollIntoViewIfNeeded()
  await expect(demo.getByText(/keine Originaloberfläche|keine echte Produktoberfläche/i).first()).toBeVisible()
  await expect(demo).toContainText(/fiktive[nr]? Daten/i)
  await expect(demo.getByRole('button', { name: 'Demo automatisch abspielen', exact: true })).toBeVisible()
  await expect(demo.getByRole('button', { name: 'Demo pausieren', exact: true })).toHaveCount(0)
  await page.clock.runFor(12_000)
  await expect(demo).toHaveAttribute('data-product-demo', 'dashboard')
  const mobile = demo.locator('[data-demo-mobile]')
  if (await mobile.isVisible()) await expect(mobile).toHaveAttribute('data-demo-active-step', 'dashboard:0')
  else await expect(demo.getByRole('list', { name: 'Ablauf' }).locator('[aria-current="step"]')).toContainText('Überblick')
})

test('Plantafel Maus: Zielvorschau, Verschieben und unveränderte gespeicherte Dauer', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Mausgeste wird in beiden Desktop-Browsern geprüft.')
  const { demo, board } = await openPlanning(page)
  await expect(board.locator('[data-planning-assignment]')).toHaveAccessibleName(MAIN_LABEL)
  // An unsaved form edit must not silently resize the assignment during a drag.
  await demo.getByRole('textbox', { name: 'Geplante Dauer', exact: true }).fill('7')
  const destination = target(board, 'mila', 'do')
  await beginMouseDrag(page, board, destination)
  await expect(destination).toHaveAttribute('data-over', 'true')
  await expect(board.getByRole('status')).toContainText('Verschieben: Mila Schneider, Donnerstag')
  await page.mouse.up()
  await expect(board.locator('[data-planning-assignment]')).toHaveAccessibleName(/Mila Schneider, Donnerstag, 3,5 Stunden/)
  await expect(board.getByRole('status')).toContainText('Einsatz verschoben')
  await expect(board.getByText('3,5 Std. eingeplant', { exact: true })).toBeVisible()
  await expect(demo.getByRole('textbox', { name: 'Geplante Dauer', exact: true })).toHaveValue('3,5')
  await expect(board.locator('[data-over="true"]')).toHaveCount(0)
})

test('Plantafel Maus: andere Person erhält Kopie, Wochenstunden stimmen, belegtes Ziel bleibt unverändert', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Desktop-Raster zeigt alle Personen und Kopien gleichzeitig.')
  const { board } = await openPlanning(page)
  const destination = target(board, 'jonas', 'mi')
  await beginMouseDrag(page, board, destination)
  await expect(destination).toHaveAttribute('data-over', 'true')
  await expect(board.getByRole('status')).toContainText('Zusätzlich einplanen: Jonas Weber, Mittwoch')
  await page.mouse.up()
  await expect(board.locator('[data-planning-assignment]')).toHaveAccessibleName(MAIN_LABEL)
  await expect(board.getByText('7 Std. eingeplant', { exact: true })).toBeVisible()
  await expect(board.locator('[aria-label="3,5 von 40 Beispielstunden verplant"]')).toHaveCount(2)
  await expect(board.getByRole('status')).toContainText('Der ursprüngliche Einsatz bleibt bestehen.')
  await expect(destination).toHaveCount(0)
  const to = await center(board.getByText('Zusätzlich eingeplant', { exact: true }).first().locator('..'))
  const from = await center(board.locator('[data-planning-assignment]'))
  await page.mouse.move(from.x, from.y)
  await page.mouse.down()
  await page.mouse.move(to.x, to.y, { steps: 12 })
  await expect(board.locator('[data-over="true"]')).toHaveCount(0)
  await page.mouse.up()
  await expect(board.getByText('7 Std. eingeplant', { exact: true })).toBeVisible()
  await expect(board.locator('[data-planning-assignment]')).toHaveAccessibleName(MAIN_LABEL)
})

test('Plantafel Maus: Checkbox sowie Alt, Strg und Meta verschieben zu anderer Person', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Tastaturmodifikatoren betreffen den Desktop-Drag.')
  const { demo, board } = await openPlanning(page)
  for (const mode of ['checkbox', 'Alt', 'Control', 'Meta']) {
    if (mode === 'checkbox') await board.getByRole('checkbox', { name: MOVE_OPTION, exact: true }).check()
    else await page.keyboard.down(mode)
    await beginMouseDrag(page, board, target(board, 'emre', 'fr'))
    await expect(board.getByRole('status')).toContainText('Verschieben: Emre Yilmaz, Freitag')
    await page.mouse.up()
    if (mode !== 'checkbox') await page.keyboard.up(mode)
    await expect(board.locator('[data-planning-assignment]')).toHaveAccessibleName(/Emre Yilmaz, Freitag, 3,5 Stunden/)
    await expect(board.getByText('3,5 Std. eingeplant', { exact: true })).toBeVisible()
    await resetAndCreate(demo)
    await expect(board.getByRole('checkbox', { name: MOVE_OPTION, exact: true })).not.toBeChecked()
  }
})

test('Plantafel Maus: Escape und Loslassen außerhalb brechen ohne Datenänderung ab', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Maus-Abbruch in beiden Desktop-Browsern.')
  const { board } = await openPlanning(page)
  const destination = target(board, 'mila', 'fr')
  await beginMouseDrag(page, board, destination)
  await expect(destination).toHaveAttribute('data-over', 'true')
  await page.keyboard.press('Escape')
  await expect(board.locator('[data-over="true"]')).toHaveCount(0)
  await page.mouse.up()
  await expect(board.locator('[data-planning-assignment]')).toHaveAccessibleName(MAIN_LABEL)
  await beginMouseDrag(page, board, destination)
  await page.mouse.move(8, 8, { steps: 8 })
  await expect(board.locator('[data-over="true"]')).toHaveCount(0)
  await page.mouse.up()
  await expect(board.locator('[data-planning-assignment]')).toHaveAccessibleName(MAIN_LABEL)
  await expect(board.getByText('3,5 Std. eingeplant', { exact: true })).toBeVisible()
})

test('Plantafel Tastatur: auswählbares Ziel bewegt denselben Einsatz und meldet das Ergebnis', async ({ page }) => {
  const { demo, board } = await openPlanning(page)
  await board.locator('[data-planning-assignment]').focus()
  await page.keyboard.press('Enter')
  await expect(board.getByRole('status')).toContainText('Wählen Sie jetzt')
  const destination = target(board, 'mila', 'fr')
  await destination.focus()
  await expect(destination).toBeFocused()
  await page.keyboard.press('Space')
  await reopenMobileBoard(demo)
  await expect(board.locator('[data-planning-assignment]')).toHaveAccessibleName(/Mila Schneider, Freitag, 3,5 Stunden/)
  await expect(board.getByRole('status')).toContainText('Einsatz verschoben')
  await expect(board.getByText('3,5 Std. eingeplant', { exact: true })).toBeVisible()
})

test('Plantafel Touch: echte Wischgeste, Systemabbruch und Zielvorschau ohne Seitensprung', async ({ page, context }, testInfo) => {
  test.skip(!testInfo.project.use.hasTouch || testInfo.project.use.browserName !== 'chromium', 'Native Mehrpunkt-Touch-Ereignisse sind über CDP nur in Chromium verfügbar; WebKit wird per echtem Antippen geprüft.')
  const { demo, board } = await openPlanning(page)
  await board.scrollIntoViewIfNeeded()
  const from = await center(board.locator('[data-planning-assignment]'))
  const destination = target(board, 'mila', 'do')
  const to = await center(destination)
  const scrollBefore = await page.evaluate(() => window.scrollY)
  const session = await context.newCDPSession(page)
  const swipe = async () => {
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...from, id: 1 }] })
    for (let step = 1; step <= 12; step++) {
      await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: from.x + (to.x - from.x) * step / 12, y: from.y + (to.y - from.y) * step / 12, id: 1 }] })
    }
  }
  await swipe()
  await expect(destination).toHaveAttribute('data-over', 'true')
  await session.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] })
  await expect(board.locator('[data-over="true"]')).toHaveCount(0)
  await expect(board.locator('[data-planning-assignment]')).toHaveAccessibleName(MAIN_LABEL)
  await swipe()
  await expect(destination).toHaveAttribute('data-over', 'true')
  await expect(board.getByRole('status')).toContainText('Verschieben: Mila Schneider, Donnerstag')
  expect(await page.evaluate(() => window.scrollY)).toBeCloseTo(scrollBefore, 0)
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await session.detach()
  await reopenMobileBoard(demo)
  await expect(board.locator('[data-planning-assignment]')).toHaveAccessibleName(/Mila Schneider, Donnerstag, 3,5 Stunden/)
  await expect(board.getByText('3,5 Std. eingeplant', { exact: true })).toBeVisible()
})

test('Plantafel Touch: Antippen kopiert, gesperrtes Ziel verhindert Duplikate, Reset leert Stunden und Modus', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.use.hasTouch, 'Touch-Alternative wird in Chromium und WebKit geprüft.')
  const { demo, board } = await openPlanning(page)
  await board.locator('[data-planning-assignment]').tap()
  await board.getByRole('combobox', { name: 'Zielperson', exact: true }).selectOption('jonas')
  await target(board, 'jonas', 'mi').tap()
  await reopenMobileBoard(demo)
  await expect(board.locator('[data-planning-assignment]')).toHaveAccessibleName(MAIN_LABEL)
  await expect(board.getByText('7 Std. eingeplant', { exact: true })).toBeVisible()
  await expect(board.getByRole('status')).toContainText('Der ursprüngliche Einsatz bleibt bestehen.')
  await board.getByRole('combobox', { name: 'Zielperson', exact: true }).selectOption('jonas')
  await expect(target(board, 'jonas', 'mi')).toBeDisabled()
  await board.getByRole('checkbox', { name: MOVE_OPTION, exact: true }).check()
  await resetAndCreate(demo)
  await expect(board.locator('[data-planning-assignment]')).toHaveAccessibleName(MAIN_LABEL)
  await expect(board.getByText('3,5 Std. eingeplant', { exact: true })).toBeVisible()
  await expect(board.getByRole('checkbox', { name: MOVE_OPTION, exact: true })).not.toBeChecked()
  await board.getByRole('combobox', { name: 'Zielperson', exact: true }).selectOption('jonas')
  await expect(target(board, 'jonas', 'mi')).toBeEnabled()
  await board.getByRole('checkbox', { name: MOVE_OPTION, exact: true }).check()
  await target(board, 'jonas', 'fr').tap()
  await reopenMobileBoard(demo)
  await expect(board.locator('[data-planning-assignment]')).toHaveAccessibleName(/Jonas Weber, Freitag, 3,5 Stunden/)
  await expect(board.getByText('3,5 Std. eingeplant', { exact: true })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
