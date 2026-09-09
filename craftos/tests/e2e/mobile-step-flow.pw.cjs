// Archive: Retired universal product demo; retained as behavioral reference and excluded from the public website suite.
/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS runner supports an explicit Playwright installation in another worktree. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')

const scenes = [
  { id: 'dashboard', steps: 3 },
  { id: 'angebot', steps: 4 },
  { id: 'planung', steps: 5 },
  { id: 'rechnung', steps: 4 },
  { id: 'beleg', steps: 4 },
  { id: 'ki', steps: 4 },
]

test('Mobile Schrittführung: Fortsetzen ohne manuelles Wegscrollen und Fokus am aktuellen Schritt', async ({ page }, testInfo) => {
  await page.route('**/*', (route) => ['localhost', '127.0.0.1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort())
  await page.goto('/')
  const demo = page.locator('[data-product-demo]').first()
  const mobile = demo.locator('[data-demo-mobile]')
  await expect(mobile).toBeVisible()
  const sceneChoice = mobile.getByRole('combobox', { name: 'Produktdemo auswählen', exact: true })
  // Enter the demo once. Further progression must work without test-driven scrolling.
  await sceneChoice.scrollIntoViewIfNeeded()
  for (const scene of scenes) {
    await sceneChoice.selectOption(scene.id)
    await expect(demo).toHaveAttribute('data-product-demo', scene.id)
    const title = mobile.locator('[data-demo-step-title]')
    await expect(title).toBeVisible()
    for (let index = 1; index < scene.steps; index++) {
      const previousTitle = await title.innerText()
      const next = mobile.getByRole('button', { name: 'Nächster Schritt', exact: true })
      const action = scene.id === 'ki' && index === 3
        ? mobile.getByRole('button', { name: 'Jetzt ausdrücklich bestätigen', exact: true })
        : next
      if (scene.id === 'ki' && index === 3) await expect(next).toBeDisabled()
      await expect(action).toBeInViewport({ ratio: 1 })
      await action.tap()
      await expect(title).not.toHaveText(previousTitle)
      await expect(title).toBeFocused()
      await expect(title).toBeInViewport({ ratio: 1 })
    }
    await expect(mobile.getByRole('button', { name: 'Nächster Schritt', exact: true })).toBeDisabled()
    await mobile.screenshot({ path: testInfo.outputPath(`mobile-step-${scene.id}.png`) })
  }
})
