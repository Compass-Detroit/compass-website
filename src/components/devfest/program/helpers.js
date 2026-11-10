// Small helpers shared by the /devfest program components

export const chipClass = (active) =>
  `whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
    active
      ? 'border-primary bg-primary text-gray-950'
      : 'border-surface bg-surface-card text-theme-secondary hover:border-primary/50'
  }`

export const matchesQuery = (session, q) =>
  !q ||
  [
    session.title,
    session.abstract,
    session.track,
    ...session.tags,
    ...session.speakers.flatMap((p) => [p.name, p.organization]),
  ]
    .join(' ')
    .toLowerCase()
    .includes(q.toLowerCase())

export const scrollToId = (id) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
