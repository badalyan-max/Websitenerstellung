/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS runner supports an explicit Playwright installation in another worktree. */
const { defineConfig } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')
const path = require('node:path')

module.exports = defineConfig({
  testDir: __dirname,
  testMatch: ['browser-functional.pw.cjs', 'function-illustrations.pw.cjs', 'navigation.pw.cjs', 'design-v2.pw.cjs', 'home-navigation.pw.cjs'],
  timeout: 45_000,
  expect: { timeout: 8_000 },
  retries: 0,
  workers: 2,
  outputDir: path.join(__dirname, 'artifacts'),
  reporter: [['list'], ['json', { outputFile: path.join(__dirname, 'reports/results.json') }], ['html', { outputFolder: path.join(__dirname, 'reports/html'), open: 'never' }]],
  use: {
    baseURL: process.env.CRAFTOS_BASE_URL || 'http://localhost:3100',
    headless: true,
    locale: 'de-DE',
    timezoneId: 'Europe/Berlin',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 10_000,
  },
  projects: ['chromium', 'webkit'].flatMap((browserName) => [
    { name: `${browserName}-1440`, use: { browserName, viewport: { width: 1440, height: 1000 }, hasTouch: false } },
    { name: `${browserName}-390-touch`, use: { browserName, viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
  ]),
})
