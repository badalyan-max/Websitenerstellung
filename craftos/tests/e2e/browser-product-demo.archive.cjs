// Archive: Tests for the retired universal product demo; intentionally excluded from the public website suite.
/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS runner supports an explicit Playwright installation in another worktree. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')

const scenes = [
  { id: 'dashboard', label: 'Überblick', steps: ['Überblick', 'Projekt', 'Kosten'] },
  { id: 'angebot', label: 'Kalkulation', steps: ['Aufmaß', 'Menge', 'Kalkulation', 'Vorschau'] },
  { id: 'planung', label: 'Planung', steps: ['Einsatz anlegen', 'Termin ändern', 'Mobile Zeit starten', 'Zeit buchen', 'Kosten'] },
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
  // A deliberate reset provides the same fixture after hydration.
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
  if (mobile) {
    await activate(demo.locator('[data-demo-mobile] [data-planning-target][data-day="do"][data-member="jonas"]'), testInfo)
  } else {
    await demo.getByRole('combobox', { name: 'Tag', exact: true }).selectOption({ label: 'Do, 10.09.' })
    await activate(demo.getByRole('button', { name: 'Einsatz aktualisieren', exact: true }), testInfo)
  }
  await expectStep(demo, 'Mobile Zeit starten')
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
