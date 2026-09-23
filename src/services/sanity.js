/**
 * Minimal read-only Sanity client over the HTTP query API — no SDK needed for
 * public datasets. Event sites (mishpe26, midevfest26, ...) each own a Sanity
 * project; register them in `SANITY_PROJECTS` to read their content here.
 *
 * Browsers reach Sanity through a same-origin proxy (`/api/sanity/<key>`,
 * vercel.json rewrite in production, vite proxy in dev) so no CORS origins
 * have to be configured per project. Node callers hit Sanity directly.
 */
const API_VERSION = 'v2024-01-01'

export const SANITY_PROJECTS = {
  lhm2026: {
    label: 'LHM Innovation Summit 2026',
    projectId: 'd1h6cagq',
    dataset: 'production',
    studio: 'https://github.com/Compass-Detroit/mishpe26/tree/main/studio',
  },
}

export const sanityUpstream = ({ projectId, dataset }) =>
  `https://${projectId}.apicdn.sanity.io/${API_VERSION}/data/query/${dataset}`

export async function groq(query, params = {}, { project, signal }) {
  const config = SANITY_PROJECTS[project]
  if (!config) throw new Error(`Unknown Sanity project: ${project}`)

  const search = new URLSearchParams({ query })
  for (const [key, value] of Object.entries(params))
    search.set(`$${key}`, JSON.stringify(value))

  const base =
    typeof window === 'undefined'
      ? sanityUpstream(config)
      : `/api/sanity/${project}`
  const response = await fetch(`${base}?${search}`, { signal })
  if (!response.ok)
    throw new Error(`Sanity ${response.status}: ${response.statusText}`)
  const { result, ms } = await response.json()
  return { result, ms }
}

/** Sanity image URL with resize params; passes non-Sanity URLs through. */
export const sanityImage = (url, { w = 320, h, fit = 'crop' } = {}) => {
  if (!url?.includes('cdn.sanity.io')) return url
  const params = new URLSearchParams({ w, fit, auto: 'format' })
  if (h) params.set('h', h)
  return `${url}?${params}`
}

export const LHM_LIVE_QUERY = `{
  "event": *[_type == "event" && year == $year][0]{ title, year, "slug": slug.current },
  "sessions": *[_type == "session" && event->year == $year && published == true]
    | order(startTime asc) {
      _id, title, track, startTime, durationMinutes,
      "speakers": participants[].speaker->{ name, organization, "avatar": headshot.asset->url }
    },
  "partners": count(*[_type == "partner"]),
  "speakers": count(*[_type == "speaker"])
}`
