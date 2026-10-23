/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser regression suite. */
const { test, expect } = require(process.env.CRAFTOS_PLAYWRIGHT_PATH || '@playwright/test')
const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')
const { pathToFileURL } = require('node:url')

/**
 * Logo-Schriftzug (10-UI-SPEC § 7.1–§ 7.4, J11, K4; Plan 10-09).
 * Screenshot-Vergleich nur des Schriftzugs ([data-logo-schriftzug]) im Header und in der Fußleiste bei 1440 und
 * 390 px mit deviceScaleFactor 2 gegen Referenzen, die VOR der Umstellung auf SVG im eigenen Commit entstanden
 * sind (tests/e2e/logo-schriftzug.pw.cjs-snapshots/). Nach der Umstellung ist --update-snapshots verboten.
 * Boxgröße gleich der Referenz ±0,5 px. Netzfall: auf den Lighthouse-Gate-Seiten und /impressum lädt die Seite nur
 * die drei verbliebenen Schnitte Clash 600, General 400 und General 600 (Vergleich per Inhalts-Hash, next/font
 * benennt die Dateien um) und genau drei Schrift-Preloads. Seit 10-06 (D-42) liegen Clash 500/700 und General 500
 * nicht mehr im Repo; der Fall prüft deshalb die erlaubten statt der entfallenen Schnitte. Nur Chromium. Läuft lokal gegen next start; externe Requests werden abgebrochen.
 */

// Gemessene Box des Schriftzugs vor der Umstellung (Build vor 10-09 Aufgabe 2, Chromium, `md`).
const REFERENZ_BOX = { width: 117.421875, height: 34 }
const BOX_TOLERANZ = 0.5

const BREITEN = { 'chromium-1440': 1440, 'chromium-390-touch': 390 }
const ENTFALLENE_SCHNITTE = ['clash-display-500.woff2', 'clash-display-700.woff2', 'general-sans-500.woff2']
const GELADENE_SCHNITTE = ['clash-display-600.woff2', 'general-sans-400.woff2', 'general-sans-600.woff2']
const FONT_DIR = path.join(__dirname, '..', '..', 'public', 'fonts')

const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex')

// Referenz und Vergleich mit Graustufen-Kantenglättung: Chromium glättet Text unter Windows per LCD-Subpixel
// (Farbsäume), SVG-Pfade dagegen immer in Graustufen. Ohne --disable-lcd-text misst der Vergleich die Glättungsart
// statt der Form. macOS, iOS und Android glätten Text ohnehin in Graustufen (10-09-SUMMARY, Abweichung 1).
test.use({ deviceScaleFactor: 2, launchOptions: { args: ['--disable-lcd-text'] } })

test.beforeEach(async ({ page, baseURL, browserName }) => {
  test.skip(browserName !== 'chromium', 'Screenshot-Referenzen nur für Chromium (10-UI-SPEC § 7.4)')
  const origin = new URL(baseURL).origin
  await page.route('**/*', (route) => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
})

for (const bereich of ['header', 'footer']) {
  test(`Schriftzug im ${bereich === 'header' ? 'Header' : 'Footer'} gleich der Referenz`, async ({ page }, testInfo) => {
    const breite = BREITEN[testInfo.project.name]
    test.skip(!breite, 'nur chromium-1440 und chromium-390-touch')
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const schriftzug = page.locator(`${bereich} [data-logo-schriftzug]`).first()
    await schriftzug.scrollIntoViewIfNeeded()
    await page.evaluate(() => document.fonts.ready)
    const box = await schriftzug.evaluate((el) => {
      const r = el.getBoundingClientRect()
      return { width: r.width, height: r.height }
    })
    testInfo.annotations.push({ type: 'box', description: `${bereich} ${breite}: ${box.width} × ${box.height}` })
    expect(Math.abs(box.width - REFERENZ_BOX.width)).toBeLessThanOrEqual(BOX_TOLERANZ)
    expect(Math.abs(box.height - REFERENZ_BOX.height)).toBeLessThanOrEqual(BOX_TOLERANZ)
    await expect(schriftzug).toHaveScreenshot(`${bereich}.png`, { maxDiffPixels: 40, threshold: 0.1, scale: 'device' })
  })
}

test('Netz: keine entfallenen Schnitte, genau drei Schrift-Preloads', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-1440', 'Netzfall einmal je Lauf')
  for (const datei of ENTFALLENE_SCHNITTE) expect(fs.existsSync(path.join(FONT_DIR, datei)), `${datei} entfernt (D-42)`).toBe(false)
  const erlaubt = new Set(GELADENE_SCHNITTE.map((datei) => sha256(fs.readFileSync(path.join(FONT_DIR, datei)))))
  const { GATE_ROUTEN } = await import(pathToFileURL(path.join(__dirname, '..', '..', 'scripts', 'lib', 'lighthouse-core.mjs')).href)
  // LO-04: ohne Browser-Cache, damit jede Route ihre Schriften wirklich anfordert und jede Antwort einen Body hat.
  const cdp = await page.context().newCDPSession(page)
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true })
  for (const route of ['/impressum', ...GATE_ROUTEN]) {
    const geladen = []
    const warten = []
    let erlaubtGesehen = 0
    const beiAntwort = (antwort) => {
      if (!/\.woff2(\?|$)/.test(antwort.url())) return
      warten.push(antwort.body().then((body) => {
        if (erlaubt.has(sha256(body))) erlaubtGesehen++
        else geladen.push(antwort.url())
      }).catch(() => {
        // LO-04: nicht lesbarer Body (Weiterleitung, 304) gilt nicht als erlaubt.
        geladen.push(`${antwort.url()} (nicht prüfbar, Status ${antwort.status()})`)
      }))
    }
    page.on('response', beiAntwort)
    await page.goto(route, { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    await Promise.all(warten)
    page.off('response', beiAntwort)
    expect(geladen, `${route}: andere als die drei geladenen Schnitte angefordert`).toEqual([])
    expect(erlaubtGesehen, `${route}: mindestens ein erlaubter Schnitt tatsächlich geladen`).toBeGreaterThan(0)
    await expect(page.locator('link[rel="preload"][as="font"]'), `${route}: Schrift-Preloads`).toHaveCount(3)
  }
})
