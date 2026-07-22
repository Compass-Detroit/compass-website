import { useState } from 'react'

const categoryColors = {
  Workshop: {
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    label: 'Workshop',
  },
  Networking: {
    dot: 'bg-blue-500',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    label: 'Networking',
  },
  Summit: {
    dot: 'bg-primary',
    badge: 'bg-primary/10 text-primary border-primary/20',
    label: 'Summit',
  },
  Community: {
    dot: 'bg-violet-500',
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    label: 'Community',
  },
  Career: {
    dot: 'bg-rose-500',
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    label: 'Career',
  },
  Hackathon: {
    dot: 'bg-cyan-500',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    label: 'Hackathon',
  },
}

const mockEvents = [
  // July 2026
  {
    name: 'Monthly Community Standup',
    date: '2026-07-02',
    time: '6:00 PM - 7:00 PM',
    location: 'Virtual',
    category: 'Community',
    desc: "Monthly all-hands update for Navigators — hear what's new and connect with the team.",
  },
  {
    name: 'Code & Coffee',
    date: '2026-07-08',
    time: '8:00 AM - 10:00 AM',
    location: 'Bamboo Detroit',
    category: 'Networking',
    desc: 'Casual co-working morning for developers. Bring your laptop and a project.',
  },
  {
    name: 'Resume Workshop',
    date: '2026-07-09',
    time: '6:00 PM - 8:00 PM',
    location: 'TechTown Detroit',
    category: 'Workshop',
    desc: 'Hands-on session to polish your tech resume with recruiter feedback.',
  },
  {
    name: 'Career Panel: Breaking into Tech',
    date: '2026-07-11',
    time: '12:00 PM - 1:30 PM',
    location: 'Virtual',
    category: 'Career',
    desc: 'Hear from professionals who successfully transitioned into tech careers.',
  },
  {
    name: 'Women in Tech Lunch',
    date: '2026-07-15',
    time: '12:00 PM - 1:00 PM',
    location: 'Grand Circus',
    category: 'Networking',
    desc: "Monthly networking lunch for women in Michigan's tech ecosystem.",
  },
  {
    name: 'Portfolio Review Session',
    date: '2026-07-16',
    time: '6:00 PM - 8:00 PM',
    location: 'TechTown Detroit',
    category: 'Workshop',
    desc: 'Get your portfolio reviewed by senior engineers and hiring managers.',
  },
  {
    name: 'Tech Talk: AI in Michigan',
    date: '2026-07-18',
    time: '2:00 PM - 3:30 PM',
    location: 'IBM Detroit',
    category: 'Summit',
    desc: 'Industry leaders discuss AI opportunities and careers in the Michigan ecosystem.',
  },
  {
    name: 'NSBE Detroit Study Session',
    date: '2026-07-21',
    time: '6:00 PM - 8:00 PM',
    location: 'Wayne State University',
    category: 'Community',
    desc: 'Collaborative study and skill-building session hosted by NSBE Detroit chapter.',
  },
  {
    name: 'Mock Interview Night',
    date: '2026-07-23',
    time: '6:00 PM - 9:00 PM',
    location: 'Grand Circus',
    category: 'Career',
    desc: 'Practice technical and behavioral interviews with real hiring managers.',
  },
  {
    name: 'Networking Happy Hour',
    date: '2026-07-25',
    time: '5:30 PM - 7:30 PM',
    location: 'Bamboo Detroit',
    category: 'Networking',
    desc: 'Casual end-of-week mixer for Navigators and industry partners.',
  },
  {
    name: 'Innovation Summit Planning',
    date: '2026-07-28',
    time: '5:00 PM - 6:30 PM',
    location: 'Virtual',
    category: 'Summit',
    desc: 'Planning committee meeting for the upcoming Hispanic Heritage Month Summit.',
  },
  {
    name: 'LinkedIn Optimization Workshop',
    date: '2026-07-30',
    time: '6:00 PM - 7:30 PM',
    location: 'Virtual',
    category: 'Workshop',
    desc: 'Optimize your LinkedIn profile to attract recruiters and showcase your skills.',
  },
  // August 2026
  {
    name: 'New Navigator Orientation',
    date: '2026-08-01',
    time: '10:00 AM - 12:00 PM',
    location: 'TechTown Detroit',
    category: 'Community',
    desc: 'Welcome session for new community members — learn about COMPASS programs and resources.',
  },
  {
    name: 'Monthly Community Standup',
    date: '2026-08-06',
    time: '6:00 PM - 7:00 PM',
    location: 'Virtual',
    category: 'Community',
    desc: 'Monthly all-hands update — August edition.',
  },
  {
    name: 'Code & Coffee',
    date: '2026-08-05',
    time: '8:00 AM - 10:00 AM',
    location: 'Bamboo Detroit',
    category: 'Networking',
    desc: 'Morning co-working session for developers.',
  },
  {
    name: 'Technical Interview Bootcamp',
    date: '2026-08-08',
    time: '10:00 AM - 4:00 PM',
    location: 'Grand Circus',
    category: 'Career',
    desc: 'Full-day intensive prep for technical interviews — data structures, algorithms, and system design.',
  },
  {
    name: 'Mentor Mixer',
    date: '2026-08-12',
    time: '6:00 PM - 8:00 PM',
    location: 'IBM Detroit',
    category: 'Networking',
    desc: 'Connect with experienced tech mentors in a speed-mentoring format.',
  },
  {
    name: 'Job Fair Prep Workshop',
    date: '2026-08-14',
    time: '6:00 PM - 8:00 PM',
    location: 'TechTown Detroit',
    category: 'Workshop',
    desc: 'Prepare your elevator pitch, resume, and strategy for upcoming job fairs.',
  },
  {
    name: 'Women in Tech Lunch',
    date: '2026-08-19',
    time: '12:00 PM - 1:00 PM',
    location: 'Grand Circus',
    category: 'Networking',
    desc: 'Monthly networking lunch — August edition.',
  },
  {
    name: 'Hack Michigan Kickoff',
    date: '2026-08-22',
    time: '10:00 AM - 6:00 PM',
    location: 'Wayne State University',
    category: 'Hackathon',
    desc: 'Official kickoff for Hack Michigan — team formation, challenges revealed, and hacking begins.',
  },
  {
    name: 'Hack Michigan Day 2',
    date: '2026-08-23',
    time: '9:00 AM - 9:00 PM',
    location: 'Wayne State University',
    category: 'Hackathon',
    desc: 'Day 2 — building, mentoring, and demos.',
  },
  {
    name: 'Detroit Pride Planning Committee',
    date: '2026-08-26',
    time: '5:30 PM - 7:00 PM',
    location: 'Virtual',
    category: 'Community',
    desc: 'Planning session for upcoming community pride initiatives.',
  },
  {
    name: 'Networking Happy Hour',
    date: '2026-08-28',
    time: '5:30 PM - 7:30 PM',
    location: 'Bamboo Detroit',
    category: 'Networking',
    desc: 'End-of-month mixer for the community.',
  },
  // September 2026
  {
    name: 'Monthly Community Standup',
    date: '2026-09-03',
    time: '6:00 PM - 7:00 PM',
    location: 'Virtual',
    category: 'Community',
    desc: 'September community standup — Hispanic Heritage Month programming preview.',
  },
  {
    name: 'Code & Coffee',
    date: '2026-09-09',
    time: '8:00 AM - 10:00 AM',
    location: 'Bamboo Detroit',
    category: 'Networking',
    desc: 'Morning co-working for developers.',
  },
  {
    name: 'Resume Workshop',
    date: '2026-09-10',
    time: '6:00 PM - 8:00 PM',
    location: 'TechTown Detroit',
    category: 'Workshop',
    desc: 'Resume workshop — fall hiring season prep.',
  },
  {
    name: 'Hispanic Heritage Innovation Summit',
    date: '2026-09-12',
    time: '9:00 AM - 5:00 PM',
    location: 'IBM Detroit',
    category: 'Summit',
    desc: 'Full-day innovation summit celebrating Hispanic and Latinx contributions to technology.',
  },
  {
    name: 'Career Panel: Cloud Careers',
    date: '2026-09-16',
    time: '12:00 PM - 1:30 PM',
    location: 'Virtual',
    category: 'Career',
    desc: 'Panel discussion on cloud computing career paths and certifications.',
  },
  {
    name: 'Women in Tech Lunch',
    date: '2026-09-17',
    time: '12:00 PM - 1:00 PM',
    location: 'Grand Circus',
    category: 'Networking',
    desc: 'Monthly networking lunch — September.',
  },
  {
    name: 'Portfolio Review Session',
    date: '2026-09-19',
    time: '10:00 AM - 12:00 PM',
    location: 'TechTown Detroit',
    category: 'Workshop',
    desc: 'Get feedback on your portfolio from industry professionals.',
  },
  {
    name: 'DevFest Speaker Prep',
    date: '2026-09-23',
    time: '6:00 PM - 8:00 PM',
    location: 'Virtual',
    category: 'Community',
    desc: 'Workshop for prospective Michigan DevFest speakers — abstract writing and presentation skills.',
  },
  {
    name: 'Networking Happy Hour',
    date: '2026-09-25',
    time: '5:30 PM - 7:30 PM',
    location: 'Bamboo Detroit',
    category: 'Networking',
    desc: 'Friday evening mixer at Bamboo.',
  },
  {
    name: 'Community Town Hall',
    date: '2026-09-30',
    time: '6:00 PM - 7:30 PM',
    location: 'Virtual',
    category: 'Community',
    desc: 'Quarterly town hall — community feedback, roadmap updates, and Q&A.',
  },
  // October 2026
  {
    name: 'Monthly Community Standup',
    date: '2026-10-01',
    time: '6:00 PM - 7:00 PM',
    location: 'Virtual',
    category: 'Community',
    desc: 'October standup — DevFest countdown begins.',
  },
  {
    name: 'Code & Coffee',
    date: '2026-10-07',
    time: '8:00 AM - 10:00 AM',
    location: 'Bamboo Detroit',
    category: 'Networking',
    desc: 'Morning co-working for developers.',
  },
  {
    name: 'Technical Interview Bootcamp',
    date: '2026-10-10',
    time: '10:00 AM - 4:00 PM',
    location: 'Grand Circus',
    category: 'Career',
    desc: 'Full-day technical interview prep — fall edition.',
  },
  {
    name: 'NSBE Detroit Study Session',
    date: '2026-10-13',
    time: '6:00 PM - 8:00 PM',
    location: 'Wayne State University',
    category: 'Community',
    desc: 'Collaborative study and certification prep.',
  },
  {
    name: 'Mentor Mixer',
    date: '2026-10-15',
    time: '6:00 PM - 8:00 PM',
    location: 'IBM Detroit',
    category: 'Networking',
    desc: 'Speed mentoring with tech industry leaders.',
  },
  {
    name: 'Mock Interview Night',
    date: '2026-10-20',
    time: '6:00 PM - 9:00 PM',
    location: 'Grand Circus',
    category: 'Career',
    desc: 'Practice interviews with real hiring managers.',
  },
  {
    name: 'Women in Tech Lunch',
    date: '2026-10-21',
    time: '12:00 PM - 1:00 PM',
    location: 'Grand Circus',
    category: 'Networking',
    desc: 'October networking lunch.',
  },
  {
    name: 'Innovation Summit Planning',
    date: '2026-10-27',
    time: '5:00 PM - 6:30 PM',
    location: 'Virtual',
    category: 'Summit',
    desc: 'Planning for the 2027 programming calendar.',
  },
  {
    name: 'Networking Happy Hour',
    date: '2026-10-30',
    time: '5:30 PM - 7:30 PM',
    location: 'Bamboo Detroit',
    category: 'Networking',
    desc: 'Halloween-themed networking mixer.',
  },
  // November 2026
  {
    name: 'Monthly Community Standup',
    date: '2026-11-05',
    time: '6:00 PM - 7:00 PM',
    location: 'Virtual',
    category: 'Community',
    desc: 'November standup — DevFest final prep.',
  },
  {
    name: 'Michigan DevFest',
    date: '2026-11-14',
    time: '9:00 AM - 6:00 PM',
    location: 'Wayne State University',
    category: 'Summit',
    desc: "Michigan's flagship technology conference — multi-track sessions on cloud, AI, mobile, web, and careers.",
  },
  {
    name: 'Michigan DevFest Day 2',
    date: '2026-11-15',
    time: '9:00 AM - 4:00 PM',
    location: 'Wayne State University',
    category: 'Summit',
    desc: 'DevFest Day 2 — workshops, career fair, and closing keynote.',
  },
  {
    name: 'Code & Coffee',
    date: '2026-11-11',
    time: '8:00 AM - 10:00 AM',
    location: 'Bamboo Detroit',
    category: 'Networking',
    desc: 'Morning co-working.',
  },
  {
    name: 'Resume Workshop',
    date: '2026-11-18',
    time: '6:00 PM - 8:00 PM',
    location: 'TechTown Detroit',
    category: 'Workshop',
    desc: 'Year-end resume refresh workshop.',
  },
  {
    name: 'Community Town Hall',
    date: '2026-11-19',
    time: '6:00 PM - 7:30 PM',
    location: 'Virtual',
    category: 'Community',
    desc: 'Year-end town hall — celebrating wins and planning 2027.',
  },
  {
    name: 'Networking Happy Hour',
    date: '2026-11-20',
    time: '5:30 PM - 7:30 PM',
    location: 'Bamboo Detroit',
    category: 'Networking',
    desc: 'Thanksgiving week mixer.',
  },
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const days = []

  // Previous month fill
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      month: month - 1,
      year,
      isCurrentMonth: false,
    })
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, month, year, isCurrentMonth: true })
  }

  // Next month fill
  const remaining = 42 - days.length
  for (let d = 1; d <= remaining; d++) {
    days.push({ day: d, month: month + 1, year, isCurrentMonth: false })
  }

  return days
}

function getEventsForDay(year, month, day) {
  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(
    day
  ).padStart(2, '0')}`
  return mockEvents.filter((ev) => ev.date === dateStr)
}

function ChevronLeft() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function MapPin() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function CommunityCalendar() {
  const now = new Date()
  const [currentMonth, setCurrentMonth] = useState(now.getMonth())
  const [currentYear, setCurrentYear] = useState(now.getFullYear())
  const [selectedDay, setSelectedDay] = useState(null)

  const calendarDays = getCalendarDays(currentYear, currentMonth)

  const today = now.getDate()
  const todayMonth = now.getMonth()
  const todayYear = now.getFullYear()

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
    setSelectedDay(null)
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
    setSelectedDay(null)
  }

  const goToToday = () => {
    setCurrentMonth(now.getMonth())
    setCurrentYear(now.getFullYear())
    setSelectedDay(null)
  }

  const selectedEvents = selectedDay
    ? getEventsForDay(currentYear, currentMonth, selectedDay)
    : []

  // Count total events this month
  const monthEventCount = calendarDays
    .filter((d) => d.isCurrentMonth)
    .reduce(
      (acc, d) =>
        acc + getEventsForDay(currentYear, currentMonth, d.day).length,
      0
    )

  return (
    <div className="flex flex-col gap-6">
      {/* Coming Soon Banner */}
      <div className="rounded-xl border border-primary/20 bg-primary/[0.06] p-6 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
          <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
            Preview Mode
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-white">
          Community Calendar Coming Soon
        </h3>
        <p className="text-sm text-gray-400">
          We are finalizing our 2026 programming schedule. The events below are
          placeholders and will be updated soon!
        </p>
      </div>

      {/* Calendar card */}
      <div className="overflow-hidden rounded-2xl border border-surface bg-surface-card opacity-60">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface px-6 py-5">
          <div>
            <h3 className="text-xl font-bold tracking-tight">
              {MONTHS[currentMonth]} {currentYear}
            </h3>
            <p className="mt-0.5 text-xs text-gray-500">
              {monthEventCount} event{monthEventCount !== 1 ? 's' : ''} this
              month
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToToday}
              className="rounded-lg border border-surface px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
            >
              Today
            </button>
            <button
              onClick={prevMonth}
              className="flex size-9 items-center justify-center rounded-lg border border-surface transition-colors hover:border-primary/40 hover:text-primary"
              aria-label="Previous month"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextMonth}
              className="flex size-9 items-center justify-center rounded-lg border border-surface transition-colors hover:border-primary/40 hover:text-primary"
              aria-label="Next month"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-surface">
          {DAYS.map((day) => (
            <div
              key={day}
              className="py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((d, i) => {
            const events = d.isCurrentMonth
              ? getEventsForDay(currentYear, currentMonth, d.day)
              : []
            const isToday =
              d.isCurrentMonth &&
              d.day === today &&
              currentMonth === todayMonth &&
              currentYear === todayYear
            const isSelected = d.isCurrentMonth && d.day === selectedDay
            const hasEvents = events.length > 0

            return (
              <button
                key={i}
                onClick={() => {
                  if (d.isCurrentMonth) {
                    setSelectedDay(d.day === selectedDay ? null : d.day)
                  }
                }}
                className={`relative flex min-h-[72px] flex-col items-center border-b border-r border-surface p-2 transition-colors md:min-h-[84px]
                  ${
                    !d.isCurrentMonth
                      ? 'cursor-default opacity-30'
                      : 'cursor-pointer hover:bg-[var(--card-hover-bg)]'
                  }
                  ${
                    isSelected
                      ? 'bg-primary/[0.06] ring-1 ring-inset ring-primary/40'
                      : ''
                  }
                  ${i % 7 === 6 ? 'border-r-0' : ''}
                `}
                disabled={!d.isCurrentMonth}
                aria-label={
                  d.isCurrentMonth
                    ? `${MONTHS[currentMonth]} ${d.day}${
                        hasEvents
                          ? `, ${events.length} event${
                              events.length > 1 ? 's' : ''
                            }`
                          : ''
                      }`
                    : undefined
                }
              >
                <span
                  className={`flex size-7 items-center justify-center rounded-full text-sm font-medium
                    ${isToday ? 'bg-primary font-bold text-black' : ''}
                    ${isSelected && !isToday ? 'font-bold text-primary' : ''}
                  `}
                >
                  {d.day}
                </span>
                {hasEvents && (
                  <div className="mt-1 flex items-center gap-0.5">
                    {events.slice(0, 3).map((ev, j) => (
                      <div
                        key={j}
                        className={`size-1.5 rounded-full ${
                          categoryColors[ev.category]?.dot || 'bg-gray-500'
                        }`}
                      />
                    ))}
                    {events.length > 3 && (
                      <span className="ml-0.5 text-[9px] text-gray-500">
                        +{events.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 px-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-600">
          Categories
        </span>
        {Object.entries(categoryColors).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={`size-2 rounded-full ${val.dot}`} />
            <span className="text-xs text-gray-500">{val.label}</span>
          </div>
        ))}
      </div>

      {/* Selected day events */}
      {selectedDay && (
        <div className="rounded-xl border border-surface bg-surface-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-bold">
              {MONTHS[currentMonth]} {selectedDay}, {currentYear}
            </h4>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {selectedEvents.length} event
              {selectedEvents.length !== 1 ? 's' : ''}
            </span>
          </div>
          {selectedEvents.length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-500">
              No events scheduled for this day.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {selectedEvents.map((ev, i) => {
                const cat =
                  categoryColors[ev.category] || categoryColors.Community
                return (
                  <div
                    key={i}
                    className="group rounded-xl border border-surface p-4 transition-colors hover:border-primary/30"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h5 className="text-[15px] font-semibold">{ev.name}</h5>
                        <div className="mt-1.5 flex flex-wrap items-center gap-3">
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <ClockIcon /> {ev.time}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin /> {ev.location}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-gray-500">
                          {ev.desc}
                        </p>
                      </div>
                      <span
                        className={`mt-2 w-fit shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider sm:mt-0 ${cat.badge}`}
                      >
                        {ev.category}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
