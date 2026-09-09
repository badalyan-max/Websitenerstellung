/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS runner supports an explicit Playwright installation in another worktree. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')

const scenes = [
  { id: 'dashboard', label: 'Überblick', steps: ['Überblick', 'Projekt', 'Kosten'] },
  { id: 'angebot', label: 'Kalkulation', steps: ['Aufmaß', 'Menge', 'Kalkulation', 'Vorschau'] },
  { id: 'planung', label: 'Planung', steps: ['Einsatz', 'Zuordnung', 'Verschieben', 'Mobile Zeit', 'Kosten'] },
  { id: 'rechnung', label: 'Rechnung', steps: ['Bericht', 'Entwurf', 'Prüfen', 'Fertigstellen'] },
  { id: 'beleg', label: 'Belegscan', steps: ['Beleg', 'Angaben', 'Projekt', 'Buchhaltung'] },
  { id: 'ki', label: 'Craft AI', steps: ['Anfrage', 'Entwurf', 'Prüfen', 'Bestätigt'] },
]

async function activate(locator, testInfo) {
  if (testInfo.project.use.hasTouch) await locator.tap()
  else await locator.click()
}

async function openDemo(page) {
  await page.goto('/')
  const demo = page.locator('[data-product-demo]').first()
  await expect(demo).toBeVisible()
  // A deliberate reset also pauses the default presentation after hydration.
  await demo.getByRole('button', { name: 'Diese Demo wiederholen' }).click()
  return demo
}

async function chooseScene(demo, scene, testInfo) {
  const mobile = demo.locator('[data-demo-mobile]')
  if (await mobile.isVisible()) {
    await mobile.getByRole('combobox', { name: 'Produktdemo auswählen', exact: true }).selectOption(scene.id)
  } else {
    await activate(demo.getByRole('navigation', { name: 'Produktdemo auswählen' }).getByRole('button', { name: scene.label, exact: true }), testInfo)
  }
  await expect(demo).toHaveAttribute('data-product-demo', scene.id)
}

async function expectStep(demo, label) {
  const mobile = demo.locator('[data-demo-mobile]')
  if (await mobile.isVisible()) {
    const sceneId = await demo.getAttribute('data-product-demo')
    const scene = scenes.find((item) => item.id === sceneId)
    await expect(mobile).toHaveAttribute('data-demo-active-step', `${scene.id}:${scene.steps.indexOf(label)}`)
    await expect(mobile.locator('[aria-current="step"]')).toHaveText(label)
    return
  }
  await expect(demo.getByRole('list', { name: 'Ablauf' }).locator('[aria-current="step"]')).toHaveText(new RegExp(`${label}$`))
}

async function activeView(demo) {
  const mobile = demo.locator('[data-demo-mobile]')
  return await mobile.isVisible() ? mobile : demo
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

for (const scene of scenes) {
  test(`Demo ${scene.label}: jeder Schritt, Ende und reproduzierbarer Reset`, async ({ page }, testInfo) => {
    const demo = await openDemo(page)
    await chooseScene(demo, scene, testInfo)
    await expectStep(demo, scene.steps[0])
    for (let index = 1; index < scene.steps.length; index++) {
      if (scene.id === 'ki' && index === 3) {
        await expect(demo.getByRole('button', { name: 'Nächster Schritt' })).toBeDisabled()
        await activate(demo.getByRole('button', { name: 'Jetzt ausdrücklich bestätigen' }), testInfo)
      } else {
        await activate(demo.getByRole('button', { name: 'Nächster Schritt' }), testInfo)
      }
      await expectStep(demo, scene.steps[index])
    }
    await expect(demo.getByRole('button', { name: 'Nächster Schritt' })).toBeDisabled()
    await demo.screenshot({ path: testInfo.outputPath(`${scene.id}-completed.png`) })
    await activate(demo.getByRole('button', { name: 'Diese Demo wiederholen' }), testInfo)
    await expectStep(demo, scene.steps[0])
    await expect(demo.getByRole('button', { name: 'Nächster Schritt' })).toBeEnabled()
  })
}

test('Demo: alle Szenen und Schritte sind per Tastatur erreichbar', async ({ page }, testInfo) => {
  const demo = await openDemo(page)
  const mobile = demo.locator('[data-demo-mobile]')
  const isMobile = await mobile.isVisible()
  if (!isMobile) {
    const choices = demo.getByRole('navigation', { name: 'Produktdemo auswählen' }).getByRole('button')
    await choices.first().focus()
    for (let index = 0; index < scenes.length; index++) {
      await expect(choices.nth(index)).toBeFocused()
      if (index < scenes.length - 1) await page.keyboard.press('Tab')
    }
  }
  for (const scene of scenes) {
    if (isMobile) {
      const choice = mobile.getByRole('combobox', { name: 'Produktdemo auswählen', exact: true })
      await choice.focus()
      await expect(choice).toBeFocused()
      await chooseScene(demo, scene, testInfo)
    } else {
      const choice = demo.getByRole('navigation', { name: 'Produktdemo auswählen' }).getByRole('button', { name: scene.label, exact: true })
      await choice.focus()
      await expect(choice).toBeFocused()
      await choice.press('Enter')
    }
    await expectStep(demo, scene.steps[0])
    const next = demo.getByRole('button', { name: 'Nächster Schritt' })
    await next.focus()
    await next.press('Space')
    await expectStep(demo, scene.steps[1])
    await demo.getByRole('button', { name: 'Diese Demo wiederholen' }).focus()
    await page.keyboard.press('Enter')
    await expectStep(demo, scene.steps[0])
  }
})

test('Dashboard: Projekt öffnen, Desktop zusätzlich Suche und Zeitraum', async ({ page }, testInfo) => {
  const demo = await openDemo(page)
  const mobile = demo.locator('[data-demo-mobile]')
  if (await mobile.isVisible()) {
    await activate(mobile.getByRole('button', { name: /Umbau Bäckerei Krause.*Projekt öffnen/ }), testInfo)
    await expectStep(demo, 'Projekt')
    await expect(mobile).toContainText('Bäckerei Krause')
    await activate(mobile.getByRole('button', { name: 'Nachkalkulation öffnen' }), testInfo)
    await expectStep(demo, 'Kosten')
    await expect(mobile).toContainText('Bisher erfasste Kosten')
    return
  }
  await activate(demo.getByRole('button', { name: '3 Monate', exact: true }), testInfo)
  await expect(demo.getByRole('button', { name: '3 Monate', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(demo.getByRole('img', { name: /^Umsatz des Beispielbetriebs/ })).toHaveAccessibleName(/Jul.*Aug.*Sep/)
  await expect(demo.getByRole('img', { name: /^Umsatz des Beispielbetriebs/ })).not.toHaveAccessibleName(/Apr/)
  await demo.getByRole('textbox', { name: 'Projekte durchsuchen' }).fill('nicht vorhanden')
  await expect(demo.getByText(/Kein Beispielprojekt gefunden/)).toBeVisible()
  await demo.getByRole('textbox', { name: 'Projekte durchsuchen' }).fill('Weber')
  await activate(demo.getByRole('button', { name: /^Badmodernisierung Weber/ }), testInfo)
  await expect(demo.getByRole('heading', { name: 'Badmodernisierung Weber', exact: true })).toBeVisible()
  await activate(demo.getByRole('button', { name: 'Zur Betriebsübersicht' }), testInfo)
  await expect(demo.getByRole('textbox', { name: 'Projekte durchsuchen' })).toHaveValue('')
})

test('Aufmaß: eigene Kommawerte verändern Angebotsmenge und Betrag', async ({ page }, testInfo) => {
  const demo = await openDemo(page)
  await chooseScene(demo, scenes[1], testInfo)
  await demo.getByRole('textbox', { name: 'Wandfläche', exact: true }).fill('50,5')
  await demo.getByRole('textbox', { name: 'Abzüge für Öffnungen' }).fill('5,5')
  await activate(demo.getByRole('button', { name: 'Als Angebotspositionen' }), testInfo)
  await expect(demo.getByRole('textbox', { name: 'Material je m²' })).toBeEnabled()
  const mobile = await demo.locator('[data-demo-mobile]').isVisible()
  await activate(demo.getByRole('button', { name: mobile ? 'Position kalkulieren' : 'Kalkulation übernehmen', exact: true }), testInfo)
  await activate(demo.getByRole('button', { name: 'Nächster Schritt' }), testInfo)
  await expect(await activeView(demo)).toContainText('45 m² × 24,60 €')
  await expect(await activeView(demo)).toContainText('1.107,00 €')
  await activate(demo.getByRole('button', { name: 'Diese Demo wiederholen' }), testInfo)
  await expect(demo.getByRole('textbox', { name: 'Wandfläche', exact: true })).toHaveValue('48')
})

test('Planung: Auswählen statt Ziehen, eigener Timer und Projektkosten', async ({ page }, testInfo) => {
  const demo = await openDemo(page)
  await chooseScene(demo, scenes[2], testInfo)
  await demo.getByRole('combobox', { name: 'Mitarbeiter', exact: true }).selectOption({ label: 'Jonas Weber' })
  await demo.getByRole('textbox', { name: 'Geplante Dauer' }).fill('2,5')
  await activate(demo.getByRole('button', { name: 'Einsatz anlegen', exact: true }), testInfo)
  const mobile = await demo.locator('[data-demo-mobile]').isVisible()
  await demo.getByRole('combobox', { name: mobile ? 'Neuer Einsatztag' : 'Tag', exact: true }).selectOption({ label: 'Do, 10.09.' })
  await activate(demo.getByRole('button', { name: mobile ? 'Einsatz verschieben' : 'Einsatz verschieben / aktualisieren', exact: true }), testInfo)
  await expectStep(demo, 'Verschieben')
  await expect(await activeView(demo)).toContainText(mobile ? 'Jonas Weber' : 'Hallo Jonas,')
  await activate(demo.getByRole('button', { name: 'Timer starten', exact: true }), testInfo)
  await expect(demo).toContainText('02:30:00')
  await activate(demo.getByRole('button', { name: 'Stoppen & buchen' }), testInfo)
  await expectStep(demo, 'Kosten')
  await expect(await activeView(demo)).toContainText('9,5 Std.')
  await expect(await activeView(demo)).toContainText('456,00 €')
  await expect(demo.getByRole('button', { name: mobile ? 'Nächster Schritt' : 'Gebucht', exact: true })).toBeDisabled()
})

test('Rechnung: Auswahl erforderlich, Nummer erst nach Fertigstellen', async ({ page }, testInfo) => {
  const demo = await openDemo(page)
  await chooseScene(demo, scenes[3], testInfo)
  const position = demo.getByRole('checkbox', { name: /Dokumentierte Leistung übernehmen|Wände vorbereiten und beschichten/ })
  await position.uncheck()
  await expect(demo.getByRole('button', { name: 'Rechnungsentwurf erstellen' })).toBeDisabled()
  await position.check()
  await activate(demo.getByRole('button', { name: 'Rechnungsentwurf erstellen' }), testInfo)
  await expect(demo).toContainText('Noch keine Rechnungsnummer')
  await activate(demo.getByRole('button', { name: 'Angaben geprüft', exact: true }), testInfo)
  await expect(demo).toContainText('Noch keine Rechnungsnummer')
  await activate(demo.getByRole('button', { name: /Rechnung fertigstellen/ }), testInfo)
  await expectStep(demo, 'Fertigstellen')
  await expect(demo).toContainText(/RE-2026-\d+/)
  await expect(demo).toContainText(/festgeschrieben|gesperrt/i)
  await expect(demo.getByRole('checkbox')).toHaveCount(0)
})

test('Beleg: Korrektur, Prüfung und ausgewähltes Projekt bleiben sichtbar', async ({ page }, testInfo) => {
  const demo = await openDemo(page)
  await chooseScene(demo, scenes[4], testInfo)
  await activate(demo.getByRole('button', { name: 'Erkennung im Beispiel zeigen' }), testInfo)
  await demo.getByRole('textbox', { name: 'Lieferant', exact: true }).fill('Musterhandel Test')
  await demo.getByRole('textbox', { name: 'Belegnummer', exact: true }).fill('PRUEF-2026-9')
  await demo.getByRole('textbox', { name: 'Nettobetrag', exact: true }).fill('125,50')
  await activate(demo.getByRole('button', { name: 'Angaben geprüft', exact: true }), testInfo)
  await demo.getByRole('combobox', { name: 'Projekt zuordnen' }).selectOption({ label: 'Badmodernisierung Weber' })
  await activate(demo.getByRole('button', { name: 'Beleg zuordnen' }), testInfo)
  await expectStep(demo, 'Buchhaltung')
  await expect(demo).toContainText('Badmodernisierung Weber')
  await expect(demo).toContainText('125,50 €')
  await expect(demo).toContainText('DATEV')
})

test('Craft AI: geänderter Entwurf braucht erneute Prüfung und ausdrückliche Bestätigung', async ({ page }, testInfo) => {
  const demo = await openDemo(page)
  await chooseScene(demo, scenes[5], testInfo)
  await demo.getByRole('textbox', { name: 'Ihre Beispielanfrage' }).fill('Bereite 5 Stunden Wandanstrich für Umbau Bäckerei Krause als Zeiteintrag vor.')
  await activate(demo.getByRole('button', { name: 'Entwurf vorbereiten' }), testInfo)
  await expect(demo.getByRole('textbox', { name: 'Dauer prüfen oder ändern' })).toHaveValue('5')
  await activate(demo.getByRole('button', { name: 'Entwurf geprüft' }), testInfo)
  await expect(demo.getByRole('button', { name: 'Nächster Schritt' })).toBeDisabled()
  const mobile = await demo.locator('[data-demo-mobile]').isVisible()
  if (mobile) await activate(demo.getByRole('button', { name: 'Entwurf bearbeiten', exact: true }), testInfo)
  await demo.getByRole('textbox', { name: 'Dauer prüfen oder ändern' }).fill('4,5')
  await expectStep(demo, 'Entwurf')
  await expect(demo.getByRole('button', { name: 'Jetzt ausdrücklich bestätigen' })).toHaveCount(0)
  await activate(demo.getByRole('button', { name: 'Entwurf geprüft' }), testInfo)
  await activate(demo.getByRole('button', { name: 'Jetzt ausdrücklich bestätigen' }), testInfo)
  await expectStep(demo, 'Bestätigt')
  if (mobile) {
    await expect(demo.getByRole('textbox', { name: 'Dauer prüfen oder ändern' })).toHaveCount(0)
    await expect(await activeView(demo)).toContainText('Zeiteintrag als Entwurf angelegt')
    await expect(await activeView(demo)).toContainText('4,5 Std.')
  } else {
    await expect(demo.getByRole('textbox', { name: 'Dauer prüfen oder ändern' })).toBeDisabled()
    await expect(demo).toContainText('Bestätigt. Der neue Entwurf ist in der Zeiterfassung verfügbar.')
  }
})

test('Automatische Vorführung pausiert und überschreitet keine KI-Bestätigung', async ({ page }, testInfo) => {
  await page.clock.install()
  const demo = await openDemo(page)
  await activate(demo.getByRole('button', { name: 'Demo automatisch abspielen' }), testInfo)
  await page.clock.runFor(5700)
  await expectStep(demo, 'Projekt')
  await activate(demo.getByRole('button', { name: 'Demo pausieren' }), testInfo)
  await page.clock.runFor(12_000)
  await expectStep(demo, 'Projekt')
  await chooseScene(demo, scenes[5], testInfo)
  await activate(demo.getByRole('button', { name: 'Demo automatisch abspielen' }), testInfo)
  await page.clock.runFor(5700)
  await expectStep(demo, 'Entwurf')
  await page.clock.runFor(5700)
  await expectStep(demo, 'Prüfen')
  await page.clock.runFor(18_000)
  await expectStep(demo, 'Prüfen')
  await expect(demo.getByRole('button', { name: 'Jetzt ausdrücklich bestätigen' })).toBeVisible()
})

test('Reduzierte Bewegung: keine Automatik, alle Szenen schrittweise bedienbar', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const demo = await openDemo(page)
  const mobile = demo.locator('[data-demo-mobile]')
  if (await mobile.isVisible()) {
    await expect(mobile.getByText('Sie steuern jeden Schritt selbst. Automatische Wiedergabe ist deaktiviert.')).toBeVisible()
  } else {
    await expect(demo.getByText('Reduzierte Bewegung ist aktiv. Sie steuern jeden Schritt selbst.')).toBeVisible()
  }
  for (const scene of scenes) {
    await chooseScene(demo, scene, testInfo)
    await expect(demo.getByRole('button', { name: 'Demo automatisch abspielen' })).toBeDisabled()
    await activate(demo.getByRole('button', { name: 'Nächster Schritt' }), testInfo)
    await expectStep(demo, scene.steps[1])
  }
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
  const full = page.getByRole('article', { name: 'Volllizenz', exact: true })
  const mobile = page.getByRole('article', { name: 'Mobile Lizenz', exact: true })
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
