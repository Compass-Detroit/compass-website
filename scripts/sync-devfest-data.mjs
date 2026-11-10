/**
 * Refresh the Michigan DevFest 2026 program snapshot from the midevfest.com
 * Sanity project: published sessions plus the speakers who present them.
 * Usage: npm run sync:devfest
 */
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { format } from 'prettier'
import { groq } from '../src/services/sanity.js'

const QUERY = `{
  "sessions": *[_type == "session" && event._ref == "event-2026" && published == true]
    | order(startTime asc, title asc) {
      "id": slug.current, title, abstract, description, track, tags,
      "time": startTime, "duration": durationMinutes, isPanel,
      "speakers": participants[] | order(sortOrder asc) {
        isModerator, "slug": speaker->slug.current
      }
    },
  "speakers": *[_type == "speaker" && event._ref == "event-2026" && published == true]
    | order(name asc) {
      "slug": slug.current, name, bio, organization, position,
      linkedIn, twitter, isGDE, isWTM, "avatar": headshot.asset->url
    }
}`

const { result } = await groq(QUERY, {}, { project: 'devfest2026' })

const clean = (value) => (typeof value === 'string' ? value.trim() : value)

const sessions = result.sessions.map((s) => ({
  id: s.id,
  title: clean(s.title),
  abstract: clean(s.abstract) || '',
  description: clean(s.description) || '',
  track: s.track,
  tags: (s.tags ?? []).filter((t) => t.toLowerCase() !== s.track.toLowerCase()),
  time: s.time,
  duration: s.duration,
  isPanel: Boolean(s.isPanel),
  speakers: (s.speakers ?? []).filter((p) => p.slug).map((p) => p.slug),
  moderators: (s.speakers ?? [])
    .filter((p) => p.slug && p.isModerator)
    .map((p) => p.slug),
}))

// Only speakers on the published program; drafts and withdrawn talks drop out
const onProgram = new Set(sessions.flatMap((s) => s.speakers))
const speakers = result.speakers
  .filter((p) => onProgram.has(p.slug))
  .map((p) => ({
    slug: p.slug,
    name: clean(p.name),
    avatar: p.avatar ?? null,
    bio: clean(p.bio) || null,
    organization: clean(p.organization) || null,
    position: clean(p.position) || null,
    linkedIn: p.linkedIn || null,
    twitter: p.twitter || null,
    isGDE: Boolean(p.isGDE),
    isWTM: Boolean(p.isWTM),
  }))

const out = fileURLToPath(
  new URL('../src/data/2026/devfest/program.json', import.meta.url)
)
await writeFile(
  out,
  await format(
    JSON.stringify({ syncedAt: new Date().toISOString(), sessions, speakers }),
    { parser: 'json' }
  )
)
console.log(
  `program.json: ${sessions.length} sessions, ${speakers.length} speakers`
)
