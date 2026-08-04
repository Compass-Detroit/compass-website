export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { calendarId } = req.query

  if (!calendarId) {
    return res.status(400).json({ error: 'calendarId is required' })
  }

  try {
    const url = `https://calendar.google.com/calendar/ical/${calendarId}/public/basic.ics`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch ICS feed: ${response.statusText}`)
    }

    const icsText = await response.text()

    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Cache-Control', 'public, s-maxage=300')
    res.status(200).send(icsText)
  } catch (error) {
    console.error('Calendar API Error:', error)
    res.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}
