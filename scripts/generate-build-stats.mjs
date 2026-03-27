/**
 * generate-build-stats.mjs
 *
 * Runs after `vite build`. Scans dist/assets/, gzip-compresses each file,
 * and writes dist/build-stats.json with size metrics.
 *
 * The JSON is fetched at runtime by BuildStatsSection.tsx to display
 * live bundle data on the "Under the Hood" page.
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const distDir = join(process.cwd(), 'dist', 'assets')
const outFile = join(process.cwd(), 'dist', 'build-stats.json')

// ── Read assets ─────────────────────────────────────────────────────────────

let files
try {
  files = readdirSync(distDir)
} catch {
  console.error('❌  dist/assets not found — run npm run build first')
  process.exit(1)
}

const items = files
  .filter(file => statSync(join(distDir, file)).isFile())
  .map(file => {
    const filePath = join(distDir, file)
    const raw = readFileSync(filePath)
    const gz = gzipSync(raw, { level: 9 })
    const ext = file.split('.').pop() ?? ''

    return {
      name: file,
      rawBytes: raw.length,
      gzipBytes: gz.length,
      type: ['js', 'css'].includes(ext) ? ext : 'other',
    }
  })

// ── Aggregate ────────────────────────────────────────────────────────────────

const byType = /** @param {string} t */ t => items.filter(i => i.type === t)
const sum = /** @param {typeof items} arr @param {'rawBytes'|'gzipBytes'} key */ (arr, key) =>
  arr.reduce((s, i) => s + i[key], 0)

const js = byType('js')
const css = byType('css')

/** @type {{ buildDate: string, js: object, css: object, total: object }} */
const stats = {
  buildDate: new Date().toISOString(),
  js: {
    rawBytes: sum(js, 'rawBytes'),
    gzipBytes: sum(js, 'gzipBytes'),
    chunks: js.length,
  },
  css: {
    rawBytes: sum(css, 'rawBytes'),
    gzipBytes: sum(css, 'gzipBytes'),
    chunks: css.length,
  },
  // total = JS + CSS only (fonts are loaded async by the browser, not part of the critical path)
  total: {
    rawBytes: sum(js, 'rawBytes') + sum(css, 'rawBytes'),
    gzipBytes: sum(js, 'gzipBytes') + sum(css, 'gzipBytes'),
    files: js.length + css.length,
  },
}

// ── Write ────────────────────────────────────────────────────────────────────

writeFileSync(outFile, JSON.stringify(stats, null, 2))

const kb = /** @param {number} b */ b => (b / 1024).toFixed(1)

console.log('✅  build-stats.json generated')
console.log(
  `   JS   ${js.length} chunk${js.length !== 1 ? 's' : ''} · ${kb(stats.js.gzipBytes)} KB gzip`
)
console.log(
  `   CSS  ${css.length} chunk${css.length !== 1 ? 's' : ''} · ${kb(stats.css.gzipBytes)} KB gzip`
)
console.log(`   Total ${kb(stats.total.gzipBytes)} KB gzip (${kb(stats.total.rawBytes)} KB raw)`)
