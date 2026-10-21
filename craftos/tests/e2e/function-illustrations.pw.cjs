/* eslint-disable @typescript-eslint/no-require-imports -- Supports a Playwright installation in another worktree. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')

const features = [
  ['dashboard', '/funktionen/dashboard'], ['angebot', '/funktionen/angebote'],
  ['planung', '/funktionen/plantafel'], ['rechnung', '/funktionen/rechnungen'],
  ['beleg', '/funktionen/eingangsrechnungen'], ['zeit', '/funktionen/zeiterfassung'],
  ['lager', '/funktionen/lager'], ['aufmass', '/funktionen/aufmass'], ['ki', '/craft-ai'],
]
const trades = [
  { slug: 'fliesenleger', variant: 'angebot', project: 'Bad Familie Weber', positions: ['Wandfliesen verlegen', 'Abdichtung im Duschbereich', 'Fliesen verfugen'] },
  { slug: 'maler', variant: 'angebot', project: 'Altbauwohnung Familie Becker', positions: ['Wände streichen', 'Untergrund vorbereiten', 'Decken streichen'] },
  { slug: 'trockenbau', variant: 'angebot', project: 'Büroumbau Muster GmbH', positions: ['Ständerwand montieren', 'Dämmung einlegen', 'Fugen verspachteln'] },
  { slug: 'elektriker', variant: 'planung', project: 'Elektroanlage Familie Braun', activity: 'Zählerschrank montieren' },
  { slug: 'shk', variant: 'planung', project: 'Bad Familie Weber', activity: 'Sanitärobjekte montieren' },
  { slug: 'tischler-schreiner', variant: 'planung', project: 'Einbauschrank Familie Hoffmann', activity: 'Einbauschrank montieren' },
  { slug: 'dachdecker', variant: 'planung', project: 'Dachsanierung Familie Schulz', activity: 'Dachziegel verlegen' },
  { slug: 'zimmerer', variant: 'planung', project: 'Dachstuhl Familie Berger', activity: 'Sparren montieren' },
  { slug: 'galabau', variant: 'planung', project: 'Hofeinfahrt Familie Neumann', activity: 'Pflastersteine verlegen' },
  { slug: 'metallbau', variant: 'planung', project: 'Treppenhaus Familie Wolf', activity: 'Geländer montieren' },
  { slug: 'bauunternehmen', variant: 'planung', project: 'Gewerbeumbau Muster GmbH', activity: 'Baustelleneinrichtung aufbauen' },
  { slug: 'allrounder', variant: 'planung', project: 'Wohnanlage Lindenhof', activity: 'Türbeschläge instand setzen' },
]
const durations = [1200, 900, 1500, 1000, 1700, 1000, 1800, 3000]
const stages = [0, 0, 1, 1, 2, 2, 3, 3]
const platformFocus = {
  dashboard: ['web', 'web', 'web', 'mobile', 'mobile', 'mobile', 'mobile', 'mobile'],
  angebot: ['web', 'web', 'web', 'mobile', 'mobile', 'web', 'web', 'web'],
  planung: ['web', 'web', 'web', 'web', 'web', 'mobile', 'mobile', 'mobile'],
  rechnung: ['mobile', 'mobile', 'mobile', 'web', 'web', 'web', 'web', 'web'],
  beleg: ['mobile', 'mobile', 'mobile', 'mobile', 'mobile', 'web', 'web', 'web'],
  zeit: ['mobile', 'mobile', 'mobile', 'mobile', 'mobile', 'web', 'web', 'web'],
  aufmass: ['mobile', 'mobile', 'mobile', 'mobile', 'mobile', 'web', 'web', 'web'],
  ki: ['mobile', 'mobile', 'mobile', 'web', 'web', 'web', 'web', 'web'],
}
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

async function frozenClock(page) {
  const initial = new Date('2026-09-09T12:00:00Z')
  await page.clock.install({ time: initial })
  await page.clock.pauseAt(new Date(initial.getTime() + 1000))
}

// React effects run in native browser tasks, independently of the frozen clock.
// Let the committed phase install its next timer before advancing virtual time.
async function advancePhase(page, duration) {
  await page.waitForTimeout(50)
  await page.clock.runFor(duration + 1)
}

async function openIllustration(page, variant, pathname = features.find(([id]) => id === variant)[1]) {
  await page.goto(pathname)
  const illustration = page.locator(`[data-feature-illustration="true"][data-feature-snippet="${variant}"]`).first()
  await expect(illustration).toBeVisible()
  await illustration.scrollIntoViewIfNeeded()
  return illustration
}

async function activate(locator, testInfo) {
  if (testInfo.project.use.hasTouch) await locator.tap()
  else await locator.click()
}

function amount(page, illustration, label) {
  return illustration.locator('dl > div').filter({ has: page.locator('dt', { hasText: new RegExp(`^${escapeRegExp(label)}$`) }) }).locator('dd')
}

async function expectNoBusinessControls(illustration, { reduced = false } = {}) {
  await expect(illustration.locator('input, select, textarea, form, [role="slider"], [role="checkbox"], [role="tab"]')).toHaveCount(0)
  await expect(illustration.getByRole('navigation', { name: 'Beispielschritte', exact: true })).toHaveCount(0)
  await expect(illustration.locator('button, [role="button"]')).toHaveCount(reduced ? 0 : 1)
  if (!reduced) await expect(illustration.getByRole('button')).toHaveAccessibleName(/Animation pausieren|Animation fortsetzen/)
}

async function expectPlatforms(illustration, variant, { reduced = false } = {}) {
  await expect(illustration.locator('[data-illustration-platform="web"]')).toHaveCount(1)
  await expect(illustration.locator('[data-illustration-platform="mobile"]')).toHaveCount(variant === 'lager' ? 0 : 1)
  await expect(illustration.locator('[data-illustration-device="phone"]')).toHaveCount(variant === 'lager' ? 0 : 1)
  if (variant === 'lager') {
    await expect(illustration.locator('[data-illustration-platform="web"]')).toBeVisible()
    return
  }
  const bridge = illustration.locator('[data-device-bridge]')
  await expect(bridge).toHaveCount(1)
  const phase = Number(await illustration.getAttribute('data-phase'))
  const focus = platformFocus[variant][phase]
  await expect(bridge).toHaveAttribute('data-focus', focus)
  const compact = await bridge.evaluate((element) => element.clientWidth <= 480)
  for (const platform of ['web', 'mobile']) {
    const view = illustration.locator(`[data-illustration-platform="${platform}"]`)
    if (reduced || !compact || platform === focus) await expect(view).toBeVisible()
    else await expect(view).toBeHidden()
  }
  if (!reduced && phase > 0 && phase < 7) {
    const target = illustration.locator(`[data-cursor-target="${phase < 3 ? 'first' : phase < 5 ? 'second' : 'third'}"]`).first()
    await expect(target).toBeVisible()
    if (compact) {
      expect(await target.evaluate((element) => element.closest('[data-illustration-platform]')?.getAttribute('data-illustration-platform'))).toBe(focus)
    }
  }
}

async function expectPhoneGeometry(illustration) {
  const phone = illustration.locator('[data-illustration-device="phone"]')
  await expect(phone).toBeVisible()
  const box = await phone.boundingBox()
  expect(box).not.toBeNull()
  expect(box.width).toBeGreaterThan(0)
  expect(box.height / box.width, `Handyproportion ${box.width} × ${box.height}`).toBeGreaterThanOrEqual(1.95)
  const screen = phone.locator('[data-phone-screen]')
  await expect(screen).toHaveCount(1)
  const content = await screen.evaluate((element) => {
    const body = element.querySelector('[class*="mobileContent"]')
    const tabs = element.querySelector('[class*="tabs"]')
    if (!body || !tabs) return { missingContentBoundary: true }
    const bounds = body.getBoundingClientRect()
    const tabBounds = tabs.getBoundingClientRect()
    const clipped = []
    const inspect = (rect, label) => {
      if (rect.width <= 0 || rect.height <= 0) return
      if (rect.left < bounds.left - 1 || rect.right > bounds.right + 1 || rect.top < bounds.top - 1 || rect.bottom > Math.min(bounds.bottom, tabBounds.top) + 1) {
        clipped.push({ label: label.slice(0, 80), left: rect.left - bounds.left, right: rect.right - bounds.right, top: rect.top - bounds.top, bottom: rect.bottom - bounds.bottom, intoTabs: rect.bottom - tabBounds.top })
      }
    }
    // The screen clips overflow, so checking its scrollHeight alone misses content
    // hidden under the fixed bottom navigation or outside the content allocation.
    for (const child of body.querySelectorAll('*')) {
      if (!(child instanceof HTMLElement)) continue
      if (getComputedStyle(child).visibility === 'hidden' || getComputedStyle(child).opacity === '0') continue
      inspect(child.getBoundingClientRect(), child.textContent.trim() || child.tagName)
      for (const node of child.childNodes) {
        if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) continue
        const range = document.createRange()
        range.selectNodeContents(node)
        for (const rect of range.getClientRects()) inspect(rect, node.textContent.trim())
      }
    }
    return {
      width: element.clientWidth, height: element.clientHeight,
      scrollWidth: element.scrollWidth, scrollHeight: element.scrollHeight,
      clipped,
    }
  })
  expect(content.missingContentBoundary, 'Handyinhalt und untere Navigation müssen getrennt messbar sein.').not.toBe(true)
  expect(content.width).toBeGreaterThan(0)
  expect(content.height).toBeGreaterThan(0)
  expect(content.scrollWidth, `Horizontaler Handyinhalt: ${JSON.stringify(content)}`).toBeLessThanOrEqual(content.width + 1)
  expect(content.scrollHeight, `Vertikaler Handyinhalt: ${JSON.stringify(content)}`).toBeLessThanOrEqual(content.height + 1)
  expect(content.clipped, `Abgeschnittener oder von der Navigation überdeckter Handyinhalt: ${JSON.stringify(content.clipped)}`).toEqual([])
}

async function expectTrade(illustration, trade) {
  await expect(illustration).toHaveAttribute('data-snippet-example', trade.slug)
  await expect(illustration).toContainText(trade.project)
  await expect(illustration).not.toContainText('Bäckerei Krause')
  await expect(illustration).not.toContainText('Wand streichen')
  if (trade.positions) {
    for (const position of trade.positions) await expect(illustration).toContainText(position)
  } else await expect(illustration).toContainText(trade.activity)
}

test.beforeEach(async ({ page, baseURL }) => {
  const origin = new URL(baseURL).origin
  await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
})

for (const [variant, pathname] of features) {
  test(`Funktionsillustration ${variant}: automatischer Ablauf ohne bedienbare Geschäftsoberfläche`, async ({ page }) => {
    await frozenClock(page)
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    const illustration = await openIllustration(page, variant, pathname)
    await expect(illustration).toHaveAttribute('data-running', 'true')
    await expect(illustration).toHaveAttribute('data-phase', '0')
    await expect(illustration).toHaveAttribute('data-stage', '0')
    await expectNoBusinessControls(illustration)
    await expect(illustration).toContainText(/vereinfacht|Illustration/i)
    await expectPlatforms(illustration, variant)
    for (let phase = 0; phase < 6; phase++) {
      await advancePhase(page, durations[phase])
      await expect(illustration).toHaveAttribute('data-phase', String(phase + 1))
      await expect(illustration).toHaveAttribute('data-stage', String(stages[phase + 1]))
      await expectPlatforms(illustration, variant)
    }
    await expect(illustration).toHaveAttribute('data-stage', '3')
    await expectNoBusinessControls(illustration)
    await expectPlatforms(illustration, variant)
    await illustration.getByRole('button', { name: 'Animation pausieren', exact: true }).click()
    await page.clock.runFor(25_000)
    await expect(illustration).toHaveAttribute('data-running', 'false')
    await expect(illustration).toHaveAttribute('data-phase', '6')
    await illustration.getByRole('button', { name: 'Animation fortsetzen', exact: true }).click()
    await expect(illustration).toHaveAttribute('data-running', 'true')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
    expect(errors).toEqual([])
  })
}

for (const variant of ['angebot', 'planung']) {
  test(`Cursorillustration ${variant}: zwei vollständige deterministische Schleifen`, async ({ page }) => {
    await frozenClock(page)
    const illustration = await openIllustration(page, variant)
    await expect(illustration).toHaveAttribute('data-running', 'true')
    const cursor = illustration.locator('[data-illustration-cursor="true"]')
    await expect(cursor).toHaveAttribute('aria-hidden', 'true')
    for (let loop = 0; loop < 2; loop++) {
      for (let phase = 0; phase < durations.length; phase++) {
        await expect(illustration).toHaveAttribute('data-phase', String(phase))
        await expect(illustration).toHaveAttribute('data-stage', String(stages[phase]))
        await expect(cursor).toHaveAttribute('data-visible', String(phase > 0 && phase < 7))
        await advancePhase(page, durations[phase])
      }
      await expect(illustration).toHaveAttribute('data-phase', '0')
      await expect(illustration).toHaveAttribute('data-stage', '0')
    }
  })

  test(`Cursorillustration ${variant}: echte CSS-Bewegung trifft nacheinander alle drei Ziele`, async ({ page }, testInfo) => {
    const illustration = await openIllustration(page, variant)
    await expect(illustration).toHaveAttribute('data-running', 'true')
    const cursor = illustration.locator('[data-illustration-cursor="true"]')
    const positions = []
    for (const [phase, targetName] of [[2, 'first'], [4, 'second'], [6, 'third']]) {
      let reached
      await expect.poll(async () => {
        if (await illustration.getAttribute('data-phase') !== String(phase)) return false
        const target = await illustration.locator(`[data-cursor-target="${targetName}"]`).first().boundingBox()
        const pointer = await cursor.boundingBox()
        if (!target || !pointer) return false
        const matches = pointer.x >= target.x - 4 && pointer.x <= target.x + target.width + 4 && pointer.y >= target.y - 4 && pointer.y <= target.y + target.height + 4
        if (matches) reached = pointer
        return matches
      }, { timeout: 20_000, intervals: [50, 100] }).toBe(true)
      positions.push(reached)
    }
    expect(Math.hypot(positions[1].x - positions[0].x, positions[1].y - positions[0].y)).toBeGreaterThan(20)
    await illustration.screenshot({ path: testInfo.outputPath(`${variant}-cursor-real-time.png`) })
  })
}

test('Funktionsillustration: Pause bleibt dauerhaft erhalten und Fortsetzen startet wieder', async ({ page }, testInfo) => {
  await frozenClock(page)
  const illustration = await openIllustration(page, 'planung')
  await expect(illustration).toHaveAttribute('data-running', 'true')
  await advancePhase(page, durations[0])
  await activate(illustration.getByRole('button', { name: 'Animation pausieren', exact: true }), testInfo)
  const phase = await illustration.getAttribute('data-phase')
  await expect(illustration).toHaveAttribute('data-running', 'false')
  await page.waitForTimeout(50)
  await page.clock.runFor(25_000)
  await expect(illustration).toHaveAttribute('data-phase', phase)
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await illustration.scrollIntoViewIfNeeded()
  await expect(illustration).toHaveAttribute('data-running', 'false')
  await activate(illustration.getByRole('button', { name: 'Animation fortsetzen', exact: true }), testInfo)
  await expect(illustration).toHaveAttribute('data-running', 'true')
  await advancePhase(page, durations[Number(phase)])
  await expect(illustration).not.toHaveAttribute('data-phase', phase)
})

test('Funktionsillustration: außerhalb des Viewports bleibt der automatische Ablauf stehen', async ({ page }) => {
  await frozenClock(page)
  const illustration = await openIllustration(page, 'angebot')
  await expect(illustration).toHaveAttribute('data-running', 'true')
  await advancePhase(page, durations[0])
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await expect(illustration).toHaveAttribute('data-running', 'false')
  // Das Attribut wechselt beim Commit, die Effekt-Bereinigung (clearTimeout) läuft erst danach in einer
  // eigenen Browser-Aufgabe; ohne diese Wartezeit kann runFor den alten Timer noch auslösen (WebKit-Flake).
  await page.waitForTimeout(50)
  const phase = await illustration.getAttribute('data-phase')
  await page.clock.runFor(25_000)
  await expect(illustration).toHaveAttribute('data-phase', phase)
  await illustration.scrollIntoViewIfNeeded()
  await expect(illustration).toHaveAttribute('data-running', 'true')
  await advancePhase(page, durations[Number(phase)])
  await expect(illustration).not.toHaveAttribute('data-phase', phase)
})

test('Funktionsillustration: emulierter Tab-Sichtbarkeitswechsel hält den Ablauf an', async ({ page }) => {
  await frozenClock(page)
  const illustration = await openIllustration(page, 'planung')
  await expect(illustration).toHaveAttribute('data-running', 'true')
  await advancePhase(page, durations[0])
  // Headless tabs do not consistently expose native background visibility;
  // this explicitly tests the visibility event contract, not tab switching.
  await page.evaluate(() => {
    Object.defineProperties(document, { hidden: { value: true, configurable: true }, visibilityState: { value: 'hidden', configurable: true } })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(illustration).toHaveAttribute('data-running', 'false')
  const phase = await illustration.getAttribute('data-phase')
  await page.clock.runFor(25_000)
  await expect(illustration).toHaveAttribute('data-phase', phase)
  await page.evaluate(() => {
    delete document.hidden
    delete document.visibilityState
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(illustration).toHaveAttribute('data-running', 'true')
})

test('Funktionsillustration: Hover und Antippen verändern keine Geschäftsdaten oder Ablaufsteuerung', async ({ page }, testInfo) => {
  await frozenClock(page)
  const illustration = await openIllustration(page, 'angebot')
  await expect(illustration).toHaveAttribute('data-running', 'true')
  const target = illustration.locator('[data-cursor-target="first"]').first()
  const before = await illustration.innerText()
  await target.hover()
  await activate(target, testInfo)
  await expect(illustration).toHaveAttribute('data-phase', '0')
  await expect(illustration).toHaveAttribute('data-stage', '0')
  await expect(illustration).toHaveAttribute('data-running', 'true')
  expect(await illustration.innerText()).toBe(before)
  await advancePhase(page, durations[0])
  await expect(illustration).toHaveAttribute('data-phase', '1')
  await advancePhase(page, durations[1])
  await expect(illustration).toHaveAttribute('data-stage', '1')
})

test('Funktionsillustration: reduzierte Bewegung zeigt ein vollständiges statisches Ergebnis', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await frozenClock(page)
  for (const variant of ['angebot', 'planung']) {
    const illustration = await openIllustration(page, variant)
    await expect(illustration).toHaveAttribute('data-stage', '3')
    await expect(illustration).toHaveAttribute('data-running', 'false')
    await expectNoBusinessControls(illustration, { reduced: true })
    const cursor = illustration.locator('[data-illustration-cursor="true"]')
    if (await cursor.count()) {
      expect(await cursor.evaluate((element) => { const style = getComputedStyle(element); return style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0' })).toBe(true)
    }
    const before = await illustration.innerText()
    await page.clock.runFor(25_000)
    await expect(illustration).toHaveAttribute('data-stage', '3')
    expect(await illustration.innerText()).toBe(before)
  }
})

test('Funktionsillustration: zwölf Gewerke behalten passende Projekte und Arbeiten', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Alle zwölf Inhaltszuordnungen werden in beiden Browsern geprüft; mobile Grenzen haben eigene Fälle.')
  test.setTimeout(90_000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const trade of trades) {
    const illustration = await openIllustration(page, trade.variant, `/gewerke/${trade.slug}`)
    await expect(illustration).toHaveAttribute('data-stage', '3')
    await expectTrade(illustration, trade)
    await expectNoBusinessControls(illustration, { reduced: true })
  }
})

test('Funktionsillustration: Fliesen ergeben im vollständigen Ergebnis exakt 971,04 Euro', async ({ page }) => {
  await frozenClock(page)
  const illustration = await openIllustration(page, 'angebot', '/gewerke/fliesenleger')
  await expect(illustration).toHaveAttribute('data-running', 'true')
  for (let phase = 0; phase < 6; phase++) {
    await advancePhase(page, durations[phase])
    await expect(illustration).toHaveAttribute('data-phase', String(phase + 1))
  }
  await expect(illustration).toHaveAttribute('data-stage', '3')
  await expectTrade(illustration, trades[0])
  await expect(amount(page, illustration, 'Netto')).toHaveText('816,00 €')
  await expect(amount(page, illustration, '19 % Umsatzsteuer')).toHaveText('155,04 €')
  await expect(amount(page, illustration, 'Gesamt')).toHaveText('971,04 €')
})

test('Funktionsillustration: Web und Handy zeigen denselben geplanten Gewerkeeinsatz', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await frozenClock(page)
  const trade = trades.find((item) => item.slug === 'elektriker')
  const illustration = await openIllustration(page, 'planung', '/gewerke/elektriker')
  await expect(illustration).toHaveAttribute('data-running', 'false')
  await expect(illustration).toHaveAttribute('data-stage', '3')
  await expectPlatforms(illustration, 'planung', { reduced: true })
  for (const platform of ['web', 'mobile']) {
    const view = illustration.locator(`[data-illustration-platform="${platform}"]`)
    await expect(view).toBeVisible()
    await expect(view).toContainText(trade.project)
    await expect(view).toContainText(trade.activity)
    await expect(view).toContainText('09:00–12:30')
    if (platform === 'web') {
      await expect(view).toContainText(/3,5\s*h/)
      await expect(view.locator('[data-moved="true"]')).toContainText(trade.activity)
      await expect(view.locator('[data-destination="true"]')).toContainText('Mi')
    } else await expect(view).toContainText('Mittwoch, 16.09.')
  }
})

test('Funktionsillustration: kurze Planungsmitteilung bleibt im Handy und verdeckt keinen Einsatz', async ({ page }) => {
  const illustration = await openIllustration(page, 'planung')
  const phone = illustration.locator('[data-illustration-device="phone"]')
  const notice = phone.locator('[data-illustration-notification]')
  await expect(notice).toBeHidden()
  await expect.poll(() => illustration.getAttribute('data-phase'), { intervals: [20], timeout: 20_000 }).toBe('5')
  await expect(notice).toHaveAttribute('data-visible', 'true')
  await expect(notice).toBeVisible()
  await expect(notice).toContainText('Einsatz verschoben')
  await expect(notice).toHaveCSS('opacity', '1')
  const [phoneBox, noticeBox, assignmentBox] = await Promise.all([
    phone.boundingBox(), notice.boundingBox(), phone.locator('[data-cursor-target="third"]').boundingBox(),
  ])
  expect(phoneBox).not.toBeNull()
  expect(noticeBox).not.toBeNull()
  expect(assignmentBox).not.toBeNull()
  expect(noticeBox.x).toBeGreaterThanOrEqual(phoneBox.x)
  expect(noticeBox.y).toBeGreaterThanOrEqual(phoneBox.y)
  expect(noticeBox.x + noticeBox.width).toBeLessThanOrEqual(phoneBox.x + phoneBox.width)
  expect(noticeBox.y + noticeBox.height).toBeLessThanOrEqual(phoneBox.y + phoneBox.height)
  expect(noticeBox.y + noticeBox.height, 'Die Mitteilung darf die darunterliegende Einsatzkarte nicht überdecken.').toBeLessThanOrEqual(assignmentBox.y)
  await expect.poll(() => illustration.getAttribute('data-phase'), { intervals: [20], timeout: 2000 }).toBe('6')
  await expect(notice).toHaveAttribute('data-visible', 'false')
  await expect(notice).toBeHidden()
  await expect(phone).toContainText('Mittwoch, 16.09.')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(illustration).toHaveAttribute('data-stage', '3')
  await expect(illustration).toHaveAttribute('data-running', 'false')
  await expect(notice).toHaveAttribute('data-visible', 'false')
  await expect(notice).toBeHidden()
})

test('Funktionsillustration: Gewerkeausschnitte passen bei 360, 390, 768, 1024 und 1440 Pixeln', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die vollständige Breitenmatrix läuft in beiden Browsern; native Touchbedienung wird separat geprüft.')
  test.setTimeout(90_000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const slug of ['fliesenleger', 'bauunternehmen']) {
      const trade = trades.find((item) => item.slug === slug)
      const illustration = await openIllustration(page, trade.variant, `/gewerke/${slug}`)
      await expectTrade(illustration, trade)
      await expectPlatforms(illustration, trade.variant, { reduced: true })
      await expectPhoneGeometry(illustration)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
      const box = await illustration.boundingBox()
      expect(box.width).toBeLessThanOrEqual(width)
      await illustration.screenshot({ path: testInfo.outputPath(`${slug}-${width}.png`) })
    }
  }
})

for (const [variant, pathname] of features.filter(([variant]) => variant !== 'lager')) {
  test(`Handyansicht ${variant}: proportional und ohne abgeschnittenen Inhalt bei fünf Breiten`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.use.hasTouch, 'Die vollständige Größenmatrix läuft in beiden Browsern; native Touchprojekte prüfen jede Variante separat.')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const illustration = await openIllustration(page, variant, pathname)
    await expect(illustration).toHaveAttribute('data-stage', '3')
    for (const width of [360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      await expectPlatforms(illustration, variant, { reduced: true })
      await expectPhoneGeometry(illustration)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
      if (['angebot', 'planung'].includes(variant) && [360, 1440].includes(width)) {
        await illustration.screenshot({ path: testInfo.outputPath(`${variant}-phone-${width}.png`) })
      }
    }
  })
}

test('Funktionsillustration: Erklärung bleibt ohne JavaScript im ausgelieferten HTML lesbar', async ({ browser, baseURL }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch, 'Die Serverausgabe ist unabhängig von Touch; beide Browser werden geprüft.')
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } })
  const page = await context.newPage()
  const origin = new URL(baseURL).origin
  await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
  try {
    await page.goto(new URL('/gewerke/fliesenleger', baseURL).href)
    const illustration = page.locator('[data-feature-illustration="true"]').first()
    const summary = illustration.locator('[data-illustration-summary]')
    await expect(summary).toBeVisible()
    expect((await summary.innerText()).trim().length).toBeGreaterThan(40)
    await expect(illustration).toContainText('Bad Familie Weber')
  } finally { await context.close() }
})

test('Funktionsillustration: Pause friert auch gleitenden Cursor und Einsatzkarte ein', async ({ page }) => {
  const illustration = await openIllustration(page, 'planung')
  const toggle = illustration.getByRole('button', { name: 'Animation pausieren', exact: true })
  await toggle.focus()
  await expect.poll(() => illustration.getAttribute('data-phase'), { intervals: [20], timeout: 20_000 }).toBe('3')
  const transforms = () => illustration.evaluate((element) => ({
    cursor: getComputedStyle(element.querySelector('[data-illustration-cursor="true"]')).transform,
    assignment: getComputedStyle(element.querySelector('[data-illustration-platform="web"] [data-moved]')).transform,
  }))
  const movingBefore = await transforms()
  await page.waitForTimeout(120)
  const movingAfter = await transforms()
  expect(movingAfter.cursor).not.toBe(movingBefore.cursor)
  expect(movingAfter.assignment).not.toBe(movingBefore.assignment)
  await toggle.press('Space')
  await expect(illustration).toHaveAttribute('data-running', 'false')
  await expect(illustration).toHaveAttribute('data-phase', '3')
  await page.waitForTimeout(200)
  const pausedBefore = await transforms()
  await page.waitForTimeout(500)
  const pausedAfter = await transforms()
  expect(pausedAfter).toEqual(pausedBefore)
  await illustration.getByRole('button', { name: 'Animation fortsetzen', exact: true }).press('Space')
  await expect(illustration).toHaveAttribute('data-running', 'true')
  await page.waitForTimeout(250)
  const resumed = await transforms()
  expect(resumed.cursor).not.toBe(pausedAfter.cursor)
  expect(resumed.assignment).not.toBe(pausedAfter.assignment)
})
