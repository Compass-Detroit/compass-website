const CATEGORY_KEYWORDS = {
  Summit: ['devfest', 'summit', 'innovation', 'keynote', 'conference'],
  Workshop: ['workshop', 'bootcamp', 'hands-on', 'training', 'session'],
  Hackathon: ['hackathon', 'hack', 'code challenge'],
  Networking: ['mixer', 'happy hour', 'coffee', 'networking', 'lunch'],
  Career: [
    'career',
    'resume',
    'interview',
    'job fair',
    'portfolio',
    'linkedin',
  ],
  Community: [
    'standup',
    'town hall',
    'orientation',
    'planning',
    'committee',
    'study',
  ],
}

export const categorizeEvent = (event) => {
  const textToSearch = `${event.name || ''} ${event.desc || ''}`.toLowerCase()

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => textToSearch.includes(keyword))) {
      return category
    }
  }

  return 'Community'
}

export const parseICSToEvents = (icsText) => {
  const events = []
  let currentEvent = null

  // Handle line folding (lines starting with space/tab belong to previous line)
  const unfoldedText = icsText.replace(/\r?\n[ \t]/g, '')
  const lines = unfoldedText.split(/\r?\n/)

  const parseDate = (dateStr) => {
    if (!dateStr) return null

    // Date-time (e.g., 20260815T180000Z or 20260815T180000)
    const matchDT = dateStr.match(
      /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/
    )
    if (matchDT) {
      const [, y, m, d, h, min, s, isZ] = matchDT
      // Note: A true robust parser handles timezones (TZID). Here we do a lightweight approach:
      // If it ends in Z, it's UTC. Otherwise assume local.
      const date = isZ
        ? new Date(Date.UTC(y, m - 1, d, h, min, s))
        : new Date(y, m - 1, d, h, min, s)
      return {
        iso: date.toISOString(),
        dateStr: `${y}-${m}-${d}`,
        dateObj: date,
        isAllDay: false,
      }
    }

    // Date-only (e.g., 20260815)
    const matchD = dateStr.match(/^(\d{4})(\d{2})(\d{2})$/)
    if (matchD) {
      const [, y, m, d] = matchD
      const date = new Date(y, m - 1, d)
      return {
        iso: date.toISOString(),
        dateStr: `${y}-${m}-${d}`,
        dateObj: date,
        isAllDay: true,
      }
    }

    return null
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const formatDisplayTime = (start, end) => {
    if (start.isAllDay) return 'All Day'
    const startStr = formatTime(start.dateObj)
    const endStr = end ? formatTime(end.dateObj) : ''
    return endStr ? `${startStr} - ${endStr}` : startStr
  }

  const unescapeText = (text) => {
    return text
      .replace(/\\n/g, '\n')
      .replace(/\\,/g, ',')
      .replace(/\\;/g, ';')
      .replace(/\\\\/g, '\\')
  }

  for (const line of lines) {
    if (!line) continue

    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const fullKey = line.substring(0, colonIndex)
    const value = line.substring(colonIndex + 1)
    const key = fullKey.split(';')[0] // Strip parameters like TZID

    if (key === 'BEGIN' && value === 'VEVENT') {
      currentEvent = {}
    } else if (key === 'END' && value === 'VEVENT' && currentEvent) {
      const startParsed = parseDate(currentEvent.DTSTART)
      const endParsed = parseDate(currentEvent.DTEND)

      if (startParsed) {
        const normalized = {
          id: currentEvent.UID || Math.random().toString(36).substr(2, 9),
          name: currentEvent.SUMMARY
            ? unescapeText(currentEvent.SUMMARY)
            : 'Untitled Event',
          date: startParsed.dateStr,
          startTime: startParsed.iso,
          endTime: endParsed ? endParsed.iso : startParsed.iso,
          time: formatDisplayTime(startParsed, endParsed),
          location: currentEvent.LOCATION
            ? unescapeText(currentEvent.LOCATION)
            : '',
          desc: currentEvent.DESCRIPTION
            ? unescapeText(currentEvent.DESCRIPTION)
            : '',
          source: 'live',
        }
        normalized.category = categorizeEvent(normalized)
        events.push(normalized)
      }
      currentEvent = null
    } else if (currentEvent) {
      currentEvent[key] = value
    }
  }

  return events
}

export const fetchCalendarEvents = async (calendarId) => {
  try {
    const response = await fetch(`/api/calendar?calendarId=${calendarId}`)
    if (!response.ok) throw new Error('Failed to fetch calendar events')
    const icsText = await response.text()
    return parseICSToEvents(icsText)
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return []
  }
}
