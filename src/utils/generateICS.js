const formatDateForICS = (dateString) => {
  const d = new Date(dateString)
  return d
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z')
}

const escapeText = (text) => {
  return text
    ? text
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\n/g, '\\n')
    : ''
}

export const generateICS = (event) => {
  const dtStamp = formatDateForICS(new Date().toISOString())
  const dtStart = formatDateForICS(event.startTime)
  const dtEnd = formatDateForICS(event.endTime)
  const uid = event.id || Math.random().toString(36).substring(2, 11)

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Compass Detroit//Community Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeText(event.name)}`,
    `DESCRIPTION:${escapeText(event.desc)}`,
    `LOCATION:${escapeText(event.location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  return icsLines.join('\r\n')
}

export const downloadICS = (event) => {
  const icsContent = generateICS(event)
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${event.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const getGoogleCalendarUrl = (event) => {
  const start = formatDateForICS(event.startTime)
  const end = formatDateForICS(event.endTime)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.name,
    dates: `${start}/${end}`,
    details: event.desc,
    location: event.location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export const getOutlookCalendarUrl = (event) => {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    startdt: event.startTime,
    enddt: event.endTime,
    subject: event.name,
    body: event.desc,
    location: event.location,
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

export const getSubscribeUrl = (calendarId) => {
  return `webcal://calendar.google.com/calendar/ical/${encodeURIComponent(
    calendarId
  )}/public/basic.ics`
}
