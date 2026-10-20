/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS runner supports an explicit Playwright installation in another worktree. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')

async function activate(locator, testInfo) {
  if (testInfo.project.use.hasTouch) await locator.tap()
  else await locator.click()
}

function result(page, type) {
  return page.locator(`section[aria-labelledby="${type}-result-title"]`)
}

function money(scope, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return scope.locator('dl > div').filter({ has: scope.page().locator('dt').filter({ hasText: new RegExp(`^${escaped}$`) }) }).locator('dd')
}

async function invalidField(page, name, value, type) {
  const field = page.getByRole('textbox', { name, exact: true })
  await field.fill(value)
  await expect(field).toHaveAttribute('aria-invalid', 'true')
  const errorId = (await field.getAttribute('aria-describedby')).split(' ').find((id) => id.endsWith('-error'))
  expect(errorId).toBeTruthy()
  await expect(page.locator(`[id="${errorId}"]`)).toBeVisible()
  await expect(result(page, type).locator('[class*="resultAmount"]')).toHaveCount(0)
}

test.beforeEach(async ({ page }) => {
  // No external requests or account creation are needed for these local demos.
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url())
    return ['localhost', '127.0.0.1'].includes(url.hostname) ? route.continue() : route.abort()
  })
})

test('Stundensatz: 144.000 / 2.400 = 60 Kosten und 75 Verkauf; Kommawerte und Übernahme', async ({ page }, testInfo) => {
  await page.goto('/rechner/stundensatz')
  const panel = result(page, 'hourly')
  await expect(panel.locator('[class*="resultAmount"]')).toHaveText('75,00 €')
  await expect(money(panel, 'Rechnerisch kostendeckend')).toHaveText('60,00 € / h')
  await expect(money(panel, 'Kostenaufschlag')).toHaveText('25 %')
  await page.getByRole('textbox', { name: 'Personalkosten pro Jahr in Euro', exact: true }).fill('60.000,50')
  await page.getByRole('textbox', { name: 'Weitere Betriebskosten pro Jahr in Euro', exact: true }).fill('35.999,50')
  await expect(panel.locator('[class*="resultAmount"]')).toHaveText('75,00 €')
  await activate(panel.getByRole('link', { name: /Mit 60,00 € Kostensatz/ }), testInfo)
  await expect(page).toHaveURL(/\/rechner\/angebotskalkulation$/)
  await expect(page.getByRole('textbox', { name: 'Interner Kostensatz in Euro pro Stunde' })).toHaveValue('60,00')
  await expect(page.getByRole('status').filter({ hasText: /Kostensatz ohne Gewinn/ })).toBeVisible()
  await expect(result(page, 'offer').locator('[class*="resultAmount"]')).toHaveText('1.500,00 €')
})

test('Stundensatz: Pflichtwerte, negative Kosten, null Stunden und 100 % sperren Ergebnis', async ({ page }) => {
  await page.goto('/rechner/stundensatz')
  for (const [name, value] of [
    ['Personalkosten pro Jahr in Euro', ''],
    ['Personalkosten pro Jahr in Euro', '-1'],
    ['Personalkosten pro Jahr in Euro', '1,234'],
    ['Verrechenbare Stunden pro Jahr', '0'],
    ['Gewünschte Gewinnmarge in Prozent', '100'],
  ]) {
    await invalidField(page, name, value, 'hourly')
    await page.getByRole('button', { name: 'Auf Beispielwerte zurücksetzen' }).click()
    await expect(result(page, 'hourly').locator('[class*="resultAmount"]')).toHaveText('75,00 €')
  }
})

test('Rechner-Transfer: gültigen Kostensatz von null ohne Gewinnaufschlag übernehmen', async ({ page }) => {
  // Total annual costs must be positive. This directly exercises the incoming
  // transfer boundary, where a zero internal rate is an allowed offer input.
  await page.goto('/rechner/angebotskalkulation#kostensatz=0.00')
  await expect(page).toHaveURL(/\/rechner\/angebotskalkulation$/)
  const rate = page.getByRole('textbox', { name: 'Interner Kostensatz in Euro pro Stunde' })
  await expect(rate).toHaveValue('0,00')
  await expect(rate).toHaveAttribute('aria-invalid', 'false')
  await expect(page.getByRole('status').filter({ hasText: /Kostensatz ohne Gewinn/ })).toBeVisible()
  await expect(result(page, 'offer').locator('[class*="resultAmount"]')).toHaveText('750,00 €')
})

test('Stundensatz: Umsatzsteuer ändert keine Marge, Reset entfernt optionale Angaben', async ({ page }, testInfo) => {
  await page.goto('/rechner/stundensatz')
  const panel = result(page, 'hourly')
  await page.getByRole('checkbox', { name: 'Bruttopreis zusätzlich anzeigen' }).check()
  await page.getByRole('textbox', { name: 'Verwendeter Umsatzsteuersatz in Prozent' }).fill('19')
  await expect(money(panel, 'Stundensatz brutto')).toHaveText('89,25 € / h')
  await expect(money(panel, 'Gewinnmarge')).toHaveText('20 %')
  await activate(page.getByRole('button', { name: 'Auf Beispielwerte zurücksetzen' }), testInfo)
  await expect(page.getByRole('checkbox', { name: 'Bruttopreis zusätzlich anzeigen' })).not.toBeChecked()
  await expect(page.getByRole('textbox', { name: 'Verwendeter Umsatzsteuersatz in Prozent' })).toHaveCount(0)
})

test('Angebot: 1.200 Kosten ergeben 1.500 netto, 20 % Marge und 25 % Aufschlag', async ({ page }, testInfo) => {
  await page.goto('/rechner/angebotskalkulation')
  const panel = result(page, 'offer')
  await expect(money(panel, 'Auftragskosten gesamt')).toHaveText('1.200,00 €')
  await expect(panel.locator('[class*="resultAmount"]')).toHaveText('1.500,00 €')
  await expect(money(panel, 'Gewinnmarge')).toHaveText('20 %')
  await expect(money(panel, 'Kostenaufschlag')).toHaveText('25 %')
  await page.getByRole('textbox', { name: 'Materialkosten netto in Euro' }).fill('500,50')
  await page.getByRole('textbox', { name: 'Zusätzliche Auftragskosten netto in Euro' }).fill('99,50')
  await expect(panel.locator('[class*="resultAmount"]')).toHaveText('1.500,00 €')
  await page.getByRole('checkbox', { name: 'Bruttopreis zusätzlich anzeigen' }).check()
  await page.getByRole('textbox', { name: 'Verwendeter Umsatzsteuersatz in Prozent' }).fill('19')
  await expect(money(panel, 'Angebotspreis brutto')).toHaveText('1.785,00 €')
  await expect(money(panel, 'Gewinnmarge')).toHaveText('20 %')
  await activate(panel.locator('summary'), testInfo)
  await expect(panel.locator('details')).toHaveAttribute('open', '')
  await expect(panel.locator('details')).toContainText('Auftragskosten')
})

test('Angebot: Verlust bleibt negativ und Reset kehrt zum Zielpreis zurück', async ({ page }, testInfo) => {
  await page.goto('/rechner/angebotskalkulation')
  const panel = result(page, 'offer')
  await page.getByRole('radio', { name: 'Vorhandenen Preis prüfen' }).check()
  await page.getByRole('textbox', { name: 'Vorhandener Nettoangebotspreis in Euro' }).fill('1.000,00')
  await expect(money(panel, 'Kalkulierter Verlust')).toHaveText('-200,00 €')
  await expect(money(panel, 'Gewinnmarge')).toHaveText('-20 %')
  await expect(panel).toContainText('Es fehlen 200,00 €')
  await activate(page.getByRole('button', { name: 'Auf Beispielwerte zurücksetzen' }), testInfo)
  await expect(page.getByRole('radio', { name: 'Angebotspreis berechnen' })).toBeChecked()
  await expect(panel.locator('[class*="resultAmount"]')).toHaveText('1.500,00 €')
  await expect(panel.locator('dt').filter({ hasText: 'Kalkulierter Verlust' })).toHaveCount(0)
})

test('Angebot: ungültige Werte sperren Ergebnis; Zielpreis wird auf Cent aufgerundet', async ({ page }) => {
  await page.goto('/rechner/angebotskalkulation')
  for (const [name, value] of [
    ['Materialkosten netto in Euro', ''],
    ['Materialkosten netto in Euro', '-1'],
    ['Materialkosten netto in Euro', '500,999'],
    ['Gewünschte Gewinnmarge in Prozent', '100'],
  ]) {
    await invalidField(page, name, value, 'offer')
    await page.getByRole('button', { name: 'Auf Beispielwerte zurücksetzen' }).click()
  }
  await page.getByRole('textbox', { name: 'Materialkosten netto in Euro' }).fill('1,01')
  await page.getByRole('textbox', { name: 'Arbeitsstunden für den Auftrag' }).fill('0')
  await page.getByRole('textbox', { name: 'Zusätzliche Auftragskosten netto in Euro' }).fill('0')
  await expect(result(page, 'offer').locator('[class*="resultAmount"]')).toHaveText('1,27 €')
})

test('Rechner: Eingaben lösen keine Requests aus und bleiben nicht nach Neuladen gespeichert', async ({ page }) => {
  await page.goto('/rechner/angebotskalkulation')
  await expect(result(page, 'offer').locator('[class*="resultAmount"]')).toBeVisible()
  const requests = []
  page.on('request', (request) => requests.push({ url: request.url(), body: request.postData() || '' }))
  await page.getByRole('textbox', { name: 'Materialkosten netto in Euro' }).fill('87654,32')
  await expect(result(page, 'offer').locator('[class*="resultAmount"]')).toHaveText('110.442,90 €')
  expect(requests.some((entry) => /87654|87654,32/.test(entry.url + entry.body))).toBe(false)
  const stored = await page.evaluate(() => JSON.stringify({ local: { ...localStorage }, session: { ...sessionStorage } }))
  expect(stored).not.toContain('87654')
  await page.reload()
  await expect(page.getByRole('textbox', { name: 'Materialkosten netto in Euro' })).toHaveValue('500')
})

test('Preise: Jahresabo als Standard, Monatsäquivalent und sichtbare Jahreszahlung', async ({ page }, testInfo) => {
  await page.goto('/preise')
  const billing = page.getByRole('group', { name: 'Abrechnung wählen', exact: true })
  const full = page.getByRole('article', { name: 'Voll-Lizenz', exact: true })
  const mobile = page.getByRole('article', { name: 'App-Lizenz', exact: true })
  await expect(billing.getByRole('button', { name: 'Jährlich', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(full.locator('strong').first()).toHaveText(/^24,96\s*€$/)
  await expect(full.getByText('299,50 €', { exact: true })).toBeVisible()
  await expect(full).toContainText('jährlich im Voraus')
  await expect(mobile.locator('strong').first()).toHaveText(/^8,29\s*€$/)
  await expect(mobile.getByText('99,50 €', { exact: true })).toBeVisible()
  await expect(mobile).toContainText('jährlich im Voraus')
  await expect(full.getByRole('listitem').filter({ hasText: 'für dieselbe Person enthalten' })).toBeVisible()
  await activate(billing.getByRole('button', { name: 'Monatlich', exact: true }), testInfo)
  await expect(billing.getByRole('button', { name: 'Monatlich', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(full.locator('strong').first()).toHaveText(/^29,95\s*€$/)
  await expect(mobile.locator('strong').first()).toHaveText(/^9,95\s*€$/)
  await expect(full).toContainText('bei monatlicher Abrechnung')
  await expect(mobile).toContainText('bei monatlicher Abrechnung')
  await expect(full).toContainText('Oder 299,50 € jährlich im Voraus')
  await expect(mobile).toContainText('Oder 99,50 € jährlich im Voraus')
  await activate(billing.getByRole('button', { name: 'Jährlich', exact: true }), testInfo)
  await expect(full.locator('strong').first()).toHaveText(/^24,96\s*€$/)
  await expect(mobile.locator('strong').first()).toHaveText(/^8,29\s*€$/)
  await full.screenshot({ path: testInfo.outputPath('annual-pricing.png') })
})
