// Session ID - in-memory only, no cookies, no PII
const SESSION_ID = crypto.randomUUID()
const EVENT_BUFFER = []
const FLUSH_INTERVAL = 30000
const MAX_BUFFER_SIZE = 50

const config = {
  endpoint: null, // configurable API endpoint
  enabled: true,
  debug: import.meta.env.DEV,
  consentGiven: true, // default true for non-PII analytics
}

// Initialize telemetry
export function initTelemetry(options = {}) {
  Object.assign(config, options)
  if (config.enabled) {
    trackWebVitals()
    setupErrorTracking()
    startFlushTimer()
  }
}

// Track page view
export function trackPageView(route, metadata = {}) {
  pushEvent('page_view', {
    route,
    referrer: document.referrer,
    title: document.title,
    timestamp: Date.now(),
    ...metadata,
  })
}

// Track custom event
export function trackEvent(category, action, label = null, value = null) {
  pushEvent('custom', { category, action, label, value })
}

// Track feature usage
export function trackFeatureUsage(feature, metadata = {}) {
  pushEvent('feature_usage', { feature, ...metadata })
}

// Track errors
export function trackError(error, context = {}) {
  pushEvent('error', {
    message: error?.message || String(error),
    stack: error?.stack?.split('\n').slice(0, 3).join('\n'),
    ...context,
  })
}

// Web Vitals tracking via PerformanceObserver
function trackWebVitals() {
  // LCP
  observeMetric('largest-contentful-paint', (entries) => {
    const last = entries[entries.length - 1]
    pushEvent('web_vital', {
      metric: 'LCP',
      value: last.startTime,
      rating: rateMetric('LCP', last.startTime),
    })
  })

  // FID / INP via event timing
  observeMetric('first-input', (entries) => {
    const entry = entries[0]
    pushEvent('web_vital', {
      metric: 'FID',
      value: entry.processingStart - entry.startTime,
      rating: rateMetric('FID', entry.processingStart - entry.startTime),
    })
  })

  // CLS
  let clsValue = 0
  observeMetric('layout-shift', (entries) => {
    entries
      .filter((e) => !e.hadRecentInput)
      .forEach((e) => {
        clsValue += e.value
      })
    pushEvent('web_vital', {
      metric: 'CLS',
      value: clsValue,
      rating: rateMetric('CLS', clsValue),
    })
  })

  // TTFB from navigation timing
  observeMetric('navigation', (entries) => {
    const nav = entries[0]
    pushEvent('web_vital', {
      metric: 'TTFB',
      value: nav.responseStart,
      rating: rateMetric('TTFB', nav.responseStart),
    })
  })
}

function observeMetric(type, callback) {
  try {
    const observer = new PerformanceObserver((list) =>
      callback(list.getEntries())
    )
    observer.observe({ type, buffered: true })
  } catch (e) {
    // PerformanceObserver not supported for this type
  }
}

// Rate metric against thresholds (good/needs-improvement/poor)
export function rateMetric(name, value) {
  const thresholds = {
    LCP: [2500, 4000],
    FID: [100, 300],
    CLS: [0.1, 0.25],
    INP: [200, 500],
    TTFB: [800, 1800],
  }
  const [good, poor] = thresholds[name] || [Infinity, Infinity]
  if (value <= good) return 'good'
  if (value <= poor) return 'needs-improvement'
  return 'poor'
}

// Error tracking
function setupErrorTracking() {
  window.addEventListener('error', (event) => {
    trackError(event.error || event.message, {
      type: 'uncaught',
      filename: event.filename,
      lineno: event.lineno,
    })
  })
  window.addEventListener('unhandledrejection', (event) => {
    trackError(event.reason, { type: 'unhandled_promise' })
  })
}

// Event buffer management
function pushEvent(type, data) {
  if (!config.enabled || !config.consentGiven) return

  const event = {
    type,
    sessionId: SESSION_ID,
    timestamp: Date.now(),
    url: window.location.pathname,
    ...data,
  }

  if (config.debug) {
    console.log('[Telemetry]', type, data)
  }

  EVENT_BUFFER.push(event)

  if (EVENT_BUFFER.length >= MAX_BUFFER_SIZE) flush()
}

// Flush events to endpoint
export function flush() {
  if (EVENT_BUFFER.length === 0) return

  const events = EVENT_BUFFER.splice(0)

  if (config.endpoint) {
    const blob = new Blob([JSON.stringify(events)], {
      type: 'application/json',
    })
    navigator.sendBeacon(config.endpoint, blob)
  }
}

function startFlushTimer() {
  setInterval(flush, FLUSH_INTERVAL)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush()
  })
}

// Get current session metrics for dashboard
export function getSessionMetrics() {
  const events = [...EVENT_BUFFER]
  const pageViews = events.filter((e) => e.type === 'page_view')
  const errors = events.filter((e) => e.type === 'error')
  const vitals = events.filter((e) => e.type === 'web_vital')
  const features = events.filter((e) => e.type === 'feature_usage')

  return {
    sessionId: SESSION_ID,
    totalEvents: events.length,
    pageViews: pageViews.length,
    uniquePages: [...new Set(pageViews.map((e) => e.route))],
    errorCount: errors.length,
    errors: errors.slice(-10),
    vitals: Object.fromEntries(
      vitals.map((v) => [v.metric, { value: v.value, rating: v.rating }])
    ),
    featureUsage: features.reduce((acc, f) => {
      acc[f.feature] = (acc[f.feature] || 0) + 1
      return acc
    }, {}),
    sessionDuration: events.length > 0 ? Date.now() - events[0].timestamp : 0,
  }
}
