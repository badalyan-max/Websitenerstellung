/* eslint-disable @typescript-eslint/no-require-imports -- Supports a Playwright installation in another worktree. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')

const features = [
  ['dashboard', '/funktionen/dashboard'],
  ['angebot', '/funktionen/angebote'],
  ['planung', '/funktionen/plantafel'],
  ['rechnung', '/funktionen/rechnungen'],
  ['beleg', '/funktionen/eingangsrechnungen'],
  ['zeit', '/funktionen/zeiterfassung'],
  ['lager', '/funktionen/lager'],
  ['aufmass', '/funktionen/aufmass'],
  ['ki', '/craft-ai'],
]

async function activate(locator, testInfo) {
  if (testInfo.project.use.hasTouch) await locator.tap()
  else await locator.click()
}

async function openSnippet(page, variant, pathname = features.find(([id]) => id === variant)[1]) {
  await page.goto(pathname)
  const snippet = page.locator(`[data-feature-snippet="${variant}"]`).first()
  await expect(snippet).toBeVisible()
  await snippet.getByRole('button', { name: 'Beispiel zurücksetzen', exact: true }).click()
  await expect(snippet).toHaveAttribute('data-step', '0')
  return snippet
}

function steps(snippet) {
  return snippet.getByRole('navigation', { name: 'Beispielschritte', exact: true }).getByRole('button')
}

async function center(locator) {
  const box = await locator.boundingBox()
  expect(box, 'Das Interaktionsziel muss sichtbar sein').not.toBeNull()
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
}

test.beforeEach(async ({ page, baseURL }) => {
  const allowedOrigin = new URL(baseURL).origin
  // These illustrative snippets only change browser state, never product accounts.
  await page.route('**/*', (route) => new URL(route.request().url()).origin === allowedOrigin ? route.continue() : route.abort())
})

for (const [variant, pathname] of features) {
  test(`Funktionsbeispiel ${variant}: passender Ausschnitt, drei Schritte und kompakte Darstellung`, async ({ page }, testInfo) => {
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    const snippet = await openSnippet(page, variant, pathname)
    await expect(page.locator('[data-feature-snippet]')).toHaveCount(1)
    await expect(page.locator('[data-product-demo]')).toHaveCount(0)
    await expect(page.getByRole('navigation', { name: 'Produktdemo auswählen', exact: true })).toHaveCount(0)
    await expect(page.getByRole('combobox', { name: 'Produktdemo auswählen', exact: true })).toHaveCount(0)
    await expect(snippet).toContainText(/Beispiel|illustrativ/i)
    await expect(snippet).toContainText(/keine echte|vereinfacht|keine Original/i)
    await expect(steps(snippet)).toHaveCount(3)
    await expect(snippet.getByRole('button', { name: 'Animation abspielen', exact: true })).toBeVisible()
    await expect(snippet.getByRole('button', { name: 'Animation pausieren', exact: true })).toHaveCount(0)
    for (const step of [1, 2, 0]) {
      await activate(steps(snippet).nth(step), testInfo)
      await expect(snippet).toHaveAttribute('data-step', String(step))
      const box = await snippet.boundingBox()
      expect(box.height, `${variant}, Schritt ${step}: das Beispiel bleibt kompakt`).toBeLessThanOrEqual(testInfo.project.use.hasTouch ? 650 : 600)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
    }
    await activate(snippet.getByRole('button', { name: 'Beispiel zurücksetzen', exact: true }), testInfo)
    await expect(snippet).toHaveAttribute('data-step', '0')
    if (['angebot', 'planung'].includes(variant)) await snippet.screenshot({ path: testInfo.outputPath(`${variant}-snippet.png`) })
    expect(errors).toEqual([])
  })
}

test('Funktionsbeispiele: Startseite zeigt kleine Ausschnitte ohne gemeinsame Appnavigation', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('[data-feature-snippet]').first()).toBeVisible()
  await expect(page.locator('[data-product-demo]')).toHaveCount(0)
  await expect(page.getByRole('navigation', { name: 'Produktdemo auswählen', exact: true })).toHaveCount(0)
  await expect(page.getByRole('combobox', { name: 'Produktdemo auswählen', exact: true })).toHaveCount(0)
})

test('Funktionsbeispiele: Angebot und Plantafel bleiben bei 360, 768 und 1024 Pixeln kompakt', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Zusätzliche Breiten werden in beiden Browsern geprüft; 390 Pixel mit Touch ist separat abgedeckt.')
  for (const width of [360, 768, 1024]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const variant of ['angebot', 'planung']) {
      const snippet = await openSnippet(page, variant)
      await steps(snippet).nth(2).click()
      const box = await snippet.boundingBox()
      expect(box.height).toBeLessThanOrEqual(width < 600 ? 650 : 600)
      expect(box.width).toBeLessThanOrEqual(width)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
      await snippet.screenshot({ path: testInfo.outputPath(`${variant}-${width}.png`) })
    }
  }
})

test('Funktionsbeispiel: Animation startet bewusst, endet nach drei Schritten und lässt sich zurücksetzen', async ({ page }, testInfo) => {
  await page.clock.install()
  const snippet = await openSnippet(page, 'angebot')
  await page.clock.fastForward(12_000)
  await expect(snippet).toHaveAttribute('data-step', '0')
  await activate(snippet.getByRole('button', { name: 'Animation abspielen', exact: true }), testInfo)
  await expect(snippet.getByRole('button', { name: 'Animation pausieren', exact: true })).toBeVisible()
  await page.clock.runFor(1900)
  await expect(snippet).toHaveAttribute('data-step', '1')
  await page.clock.runFor(1900)
  await expect(snippet).toHaveAttribute('data-step', '2')
  await page.clock.runFor(1900)
  await expect(snippet.getByRole('button', { name: 'Animation abspielen', exact: true })).toBeVisible()
  await page.clock.fastForward(10_000)
  await expect(snippet).toHaveAttribute('data-step', '2')
  await activate(snippet.getByRole('button', { name: 'Beispiel zurücksetzen', exact: true }), testInfo)
  await expect(snippet).toHaveAttribute('data-step', '0')
})

test('Funktionsbeispiel: Schrittwahl und Pause unterbrechen die Animation', async ({ page }, testInfo) => {
  await page.clock.install()
  const snippet = await openSnippet(page, 'planung')
  await activate(snippet.getByRole('button', { name: 'Animation abspielen', exact: true }), testInfo)
  await activate(snippet.getByRole('button', { name: 'Animation pausieren', exact: true }), testInfo)
  await page.clock.fastForward(10_000)
  await expect(snippet).toHaveAttribute('data-step', '0')
  await activate(snippet.getByRole('button', { name: 'Animation abspielen', exact: true }), testInfo)
  await activate(steps(snippet).nth(1), testInfo)
  await expect(snippet.getByRole('button', { name: 'Animation abspielen', exact: true })).toBeVisible()
  await page.clock.fastForward(10_000)
  await expect(snippet).toHaveAttribute('data-step', '1')
})

test('Funktionsbeispiel: reduzierte Bewegung lässt alle Schritte per Tastatur erreichen', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.clock.install()
  const snippet = await openSnippet(page, 'angebot')
  await page.clock.fastForward(10_000)
  await expect(snippet).toHaveAttribute('data-step', '0')
  await expect(snippet.getByRole('button', { name: 'Animation abspielen', exact: true })).toBeDisabled()
  for (const step of [1, 2, 0]) {
    await steps(snippet).nth(step).focus()
    await steps(snippet).nth(step).press('Enter')
    await expect(snippet).toHaveAttribute('data-step', String(step))
  }
})

test('Angebotsausschnitt: Leistungen verändern die Summe unmittelbar und stoppen die Animation', async ({ page }, testInfo) => {
  await page.clock.install()
  const snippet = await openSnippet(page, 'angebot')
  function amount(label) {
    return snippet.locator('dl > div').filter({ has: page.locator('dt', { hasText: new RegExp(`^${label}$`) }) }).locator('dd')
  }
  const first = snippet.getByRole('button', { name: /Wand streichen/ })
  const second = snippet.getByRole('button', { name: /Untergrund vorbereiten/ })
  const third = snippet.getByRole('button', { name: /Boden abdecken/ })
  await expect(amount('Netto')).toHaveText('0,00 €')
  await activate(snippet.getByRole('button', { name: 'Animation abspielen', exact: true }), testInfo)
  await activate(first, testInfo)
  await expect(snippet.getByRole('button', { name: 'Animation abspielen', exact: true })).toBeVisible()
  await expect(first).toHaveAttribute('aria-pressed', 'true')
  await expect(amount('Netto')).toHaveText('367,50 €')
  await page.clock.fastForward(10_000)
  await expect(amount('Netto')).toHaveText('367,50 €')
  await activate(second, testInfo)
  await activate(third, testInfo)
  await expect(amount('Netto')).toHaveText('563,50 €')
  await expect(amount('19 % Umsatzsteuer')).toHaveText('107,07 €')
  await expect(amount('Gesamt')).toHaveText('670,57 €')
  await activate(second, testInfo)
  await expect(amount('Netto')).toHaveText('423,50 €')
  await expect(second).toHaveAttribute('aria-pressed', 'false')
  await activate(snippet.getByRole('button', { name: 'Beispiel zurücksetzen', exact: true }), testInfo)
  await expect(amount('Netto')).toHaveText('0,00 €')
  await expect(first).toHaveAttribute('aria-pressed', 'false')
  await expect(third).toHaveAttribute('aria-pressed', 'false')
})

test('Plantafel im Ausschnitt: Ziel antippen oder mit Tastatur wählen und zuverlässig zurücksetzen', async ({ page }, testInfo) => {
  const snippet = await openSnippet(page, 'planung')
  const assignment = snippet.locator('[data-snippet-assignment]')
  await expect(assignment).toHaveAccessibleName(/am Dienstag, 3,5 Stunden/)
  await activate(snippet.getByRole('button', { name: 'Einsatz auf Donnerstag verschieben', exact: true }), testInfo)
  await expect(assignment).toHaveAccessibleName(/am Donnerstag, 3,5 Stunden/)
  const tuesday = snippet.getByRole('button', { name: 'Einsatz auf Mittwoch verschieben', exact: true })
  await tuesday.focus()
  await tuesday.press('Enter')
  await expect(assignment).toHaveAccessibleName(/am Mittwoch, 3,5 Stunden/)
  await assignment.focus()
  await assignment.press('ArrowRight')
  await expect(assignment).toHaveAccessibleName(/am Donnerstag, 3,5 Stunden/)
  await expect(assignment).toBeFocused()
  await assignment.press('ArrowLeft')
  await expect(assignment).toHaveAccessibleName(/am Mittwoch, 3,5 Stunden/)
  await activate(snippet.getByRole('button', { name: 'Beispiel zurücksetzen', exact: true }), testInfo)
  await expect(assignment).toHaveAccessibleName(/am Dienstag, 3,5 Stunden/)
})

test('Plantafel im Ausschnitt: Maus verschiebt, Escape und Ablegen außerhalb brechen ab', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Native Mausgesten laufen in beiden Desktop-Browsern.')
  const snippet = await openSnippet(page, 'planung')
  const assignment = snippet.locator('[data-snippet-assignment]')
  async function dragTo(day) {
    await snippet.scrollIntoViewIfNeeded()
    const from = await center(assignment)
    const to = await center(snippet.locator(`[data-snippet-day="${day}"]`))
    await page.mouse.move(from.x, from.y)
    await page.mouse.down()
    await page.mouse.move(to.x, to.y, { steps: 12 })
    return { from, to }
  }
  await dragTo(1)
  await page.mouse.up()
  await expect(assignment).toHaveAccessibleName(/am Mittwoch, 3,5 Stunden/)
  await dragTo(2)
  await page.keyboard.press('Escape')
  await page.mouse.up()
  await expect(assignment).toHaveAccessibleName(/am Mittwoch, 3,5 Stunden/)
  await dragTo(2)
  const box = await snippet.boundingBox()
  await page.mouse.move(box.x + box.width / 2, box.y - 15)
  await page.mouse.up()
  await expect(assignment).toHaveAccessibleName(/am Mittwoch, 3,5 Stunden/)
})

test('Plantafel im Ausschnitt: echter Touch-Drag und Systemabbruch behalten konsistente Daten', async ({ page, browserName }, testInfo) => {
  test.skip(browserName !== 'chromium' || !testInfo.project.use.hasTouch, 'Native Touchgesten per CDP in Chromium; WebKit nutzt die separat geprüfte Antippalternative.')
  const snippet = await openSnippet(page, 'planung')
  const assignment = snippet.locator('[data-snippet-assignment]')
  const session = await page.context().newCDPSession(page)
  async function swipe(day, cancelled = false) {
    await snippet.scrollIntoViewIfNeeded()
    const from = await center(assignment)
    const to = await center(snippet.locator(`[data-snippet-day="${day}"]`))
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...from, id: 1 }] })
    for (let index = 1; index <= 8; index++) {
      await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: from.x + (to.x - from.x) * index / 8, y: from.y + (to.y - from.y) * index / 8, id: 1 }] })
    }
    await session.send('Input.dispatchTouchEvent', { type: cancelled ? 'touchCancel' : 'touchEnd', touchPoints: [] })
  }
  await swipe(1)
  await expect(assignment).toHaveAccessibleName(/am Mittwoch, 3,5 Stunden/)
  await swipe(2, true)
  await expect(assignment).toHaveAccessibleName(/am Mittwoch, 3,5 Stunden/)
  await session.detach()
})

for (const input of ['Maus', 'Tastatur']) {
  test(`Review-Regression: ${input}-Beginn stoppt die Animation vor einem Rechnungs-Schrittwechsel`, async ({ page }, testInfo) => {
    test.skip(input === 'Maus' && testInfo.project.use.hasTouch, 'Maus-Halten wird in beiden Desktop-Browsern geprüft.')
    await page.clock.install()
    const snippet = await openSnippet(page, 'rechnung')
    await snippet.getByRole('button', { name: 'Animation abspielen', exact: true }).click()
    const review = snippet.getByRole('button', { name: 'Entwurf prüfen', exact: true })
    if (input === 'Maus') {
      const point = await center(review)
      await page.mouse.move(point.x, point.y)
      await page.mouse.down()
    } else {
      await review.focus()
      await page.keyboard.down('Space')
    }
    await page.clock.runFor(1900)
    if (input === 'Maus') await page.mouse.up()
    else await page.keyboard.up('Space')
    await expect(snippet).toHaveAttribute('data-step', '1')
    await expect(snippet.getByRole('button', { name: 'Beispiel fertigstellen', exact: true })).toBeVisible()
    await expect(snippet).not.toContainText('RE-BEISPIEL-001')
    await expect(snippet.getByRole('button', { name: 'Animation abspielen', exact: true })).toBeVisible()
  })
}

test('Review-Regression: Reset während eines aktiven Drags verwirft Geste und Vorschau', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Gehaltene Maus mit gleichzeitigem Tastatur-Reset wird in beiden Desktop-Browsern geprüft.')
  const snippet = await openSnippet(page, 'planung')
  const assignment = snippet.locator('[data-snippet-assignment]')
  await snippet.scrollIntoViewIfNeeded()
  const from = await center(assignment)
  const to = await center(snippet.locator('[data-snippet-day="1"]'))
  await page.mouse.move(from.x, from.y)
  await page.mouse.down()
  await page.mouse.move(to.x, to.y, { steps: 12 })
  await expect(snippet.locator('[data-snippet-day="1"]')).toHaveAttribute('data-over', 'true')
  await snippet.getByRole('button', { name: 'Beispiel zurücksetzen', exact: true }).focus()
  await page.keyboard.press('Enter')
  await page.mouse.up()
  await expect(snippet).toHaveAttribute('data-step', '0')
  await expect(assignment).toHaveAccessibleName(/am Dienstag, 3,5 Stunden/)
  await expect(snippet.locator('[data-over="true"]')).toHaveCount(0)
  await expect(snippet.locator('[class*="dragGhost"]')).toHaveCount(0)
})

test('Review-Regression: Tastatur-Zielwahl übergibt den Fokus direkt an den verschobenen Einsatz', async ({ page }) => {
  const snippet = await openSnippet(page, 'planung')
  const target = snippet.getByRole('button', { name: 'Einsatz auf Mittwoch verschieben', exact: true })
  await target.focus()
  await target.press('Enter')
  const assignment = snippet.locator('[data-snippet-assignment]')
  await expect(assignment).toHaveAccessibleName(/am Mittwoch, 3,5 Stunden/)
  await expect(assignment).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(snippet).toHaveAttribute('data-step', '2')
  await expect(assignment).toHaveAccessibleName(/am Donnerstag, 3,5 Stunden/)
  await expect(assignment).toBeFocused()
})
