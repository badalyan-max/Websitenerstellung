import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'node_modules/**', '_seo-referenz/**', 'playwright-report/**', 'test-results/**', 'tests/e2e/reports/**', 'tests/e2e/artifacts/**', 'next-env.d.ts']),
])
