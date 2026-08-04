import { useState } from 'react'
import PropTypes from 'prop-types'
import { startOfWeek, format, isSameMonth, parseISO } from 'date-fns'
import AddToCalendarButton from './AddToCalendarButton'

const ClockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
)

const MapPinIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
)

const EventCard = ({ event, categoryColors }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const colorData = categoryColors[event.category] ||
    categoryColors['Community'] || {
      dot: 'bg-primary',
      badge: 'bg-primary/10 text-primary border-primary/20',
      label: event.category || 'Event',
    }

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-xl border border-surface bg-surface-card p-4 transition-all hover:border-primary/20"
      role="button"
      tabIndex={0}
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsExpanded(!isExpanded)
        }
      }}
      aria-expanded={isExpanded}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className={`size-2.5 rounded-full ${colorData.dot}`} />
            <h4 className="font-semibold text-[var(--text-primary)]">
              {event.name}
            </h4>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-1">
              <ClockIcon />
              <span>{event.time}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-1">
                <MapPinIcon />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isExpanded
            ? 'mt-4 grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="mb-4 whitespace-pre-line text-sm leading-relaxed text-[var(--text-muted)]">
            {event.desc || 'No description available.'}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span
              className={`rounded-md border px-2 py-1 text-[10px] font-medium uppercase tracking-wider ${colorData.badge}`}
            >
              {colorData.label}
            </span>
            <div
              role="presentation"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <AddToCalendarButton event={event} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ScheduleView = ({
  events,
  currentMonth,
  currentYear,
  categoryColors,
}) => {
  const monthDate = new Date(currentYear, currentMonth, 1)

  const monthEvents = events.filter((event) => {
    const eventDate =
      typeof event.date === 'string' ? parseISO(event.date) : event.date
    return isSameMonth(eventDate, monthDate)
  })

  const groupedEvents = monthEvents.reduce((acc, event) => {
    const eventDate =
      typeof event.date === 'string' ? parseISO(event.date) : event.date
    const weekStart = startOfWeek(eventDate, { weekStartsOn: 0 })
    const weekKey = `Week of ${format(weekStart, 'MMM d')}`

    if (!acc[weekKey]) {
      acc[weekKey] = []
    }
    acc[weekKey].push(event)
    return acc
  }, {})

  const sortedWeeks = Object.keys(groupedEvents).sort((a, b) => {
    const dateA =
      typeof groupedEvents[a][0].date === 'string'
        ? parseISO(groupedEvents[a][0].date)
        : groupedEvents[a][0].date
    const dateB =
      typeof groupedEvents[b][0].date === 'string'
        ? parseISO(groupedEvents[b][0].date)
        : groupedEvents[b][0].date
    return dateA - dateB
  })

  if (monthEvents.length === 0) {
    return (
      <div className="py-12 text-center text-[var(--text-muted)]">
        No events this month
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {sortedWeeks.map((weekKey) => (
        <div key={weekKey}>
          <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] first:mt-0">
            {weekKey}
          </h3>
          <div className="flex flex-col gap-3">
            {groupedEvents[weekKey]
              .sort((a, b) => {
                const dateA =
                  typeof a.date === 'string' ? parseISO(a.date) : a.date
                const dateB =
                  typeof b.date === 'string' ? parseISO(b.date) : b.date
                return dateA - dateB
              })
              .map((event, idx) => (
                <EventCard
                  key={`${event.id || idx}`}
                  event={event}
                  categoryColors={categoryColors}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
EventCard.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    desc: PropTypes.string,
    category: PropTypes.string,
    date: PropTypes.string,
  }),
  categoryColors: PropTypes.object,
}

ScheduleView.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      name: PropTypes.string,
      time: PropTypes.string,
      location: PropTypes.string,
      desc: PropTypes.string,
      category: PropTypes.string,
    })
  ),
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  categoryColors: PropTypes.object,
}

export default ScheduleView
