/**
 * Refresh the LHM Summit 2026 snapshots from the mishpe26 repo, which owns
 * the Sanity -> JSON mapping (scripts/fetch-event-data.mjs there).
 * Usage: npm run sync:lhm
 */
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const RAW =
  'https://raw.githubusercontent.com/Compass-Detroit/mishpe26/main/src/data/2026'
const FILES = {
  'speakers.generated.json': 'speakers.json',
  'partners.generated.json': 'partners.json',
}

for (const [source, target] of Object.entries(FILES)) {
  const response = await fetch(`${RAW}/${source}`)
  if (!response.ok) throw new Error(`${source}: HTTP ${response.status}`)
  const data = await response.json()
  const out = fileURLToPath(
    new URL(`../src/data/2026/lhm/${target}`, import.meta.url)
  )
  await writeFile(out, `${JSON.stringify(data, null, 2)}\n`)
  console.log(
    `${target}: ${
      Array.isArray(data) ? data.length : Object.keys(data).length
    } entries`
  )
}
