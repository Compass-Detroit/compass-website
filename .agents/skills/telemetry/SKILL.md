---
name: telemetry
description: >
  COMPASS Detroit custom telemetry system. Covers Web Vitals tracking,
  event analytics, error monitoring, and the analytics dashboard.
  Trigger: "telemetry", "analytics", "tracking", "web vitals",
  "use telemetry", or when instrumenting features with telemetry.
---

## Architecture

```
TelemetryProvider (React Context)
  │
  ├─ initTelemetry()          # Global init in main.jsx
  ├─ trackPageView(route)     # Auto on route change
  ├─ trackEvent(cat, action)  # Manual in components
  ├─ trackFeatureUsage(feat)  # Feature adoption metrics
  ├─ trackError(error)        # Auto via ErrorBoundary + window.onerror
  ├─ trackWebVitals()         # Auto via PerformanceObserver
  │
  ├─ EVENT_BUFFER[]           # In-memory queue
  ├─ flush() via sendBeacon   # Every 30s or on page hide
  └─ getSessionMetrics()      # Dashboard data source
```

## Privacy Rules

- **No PII**: never track names, emails, IP addresses
- **No cookies**: session ID is crypto.randomUUID() in memory only
- **No fingerprinting**: no canvas, WebGL, or font enumeration
- **Consent**: default enabled for non-PII analytics; respect DNT header if endpoint configured
- **Data minimization**: stack traces trimmed to 3 lines, URLs path-only (no query params with tokens)

## Event Naming Conventions

| Category | Action | Example |
|----------|--------|---------|
| navigation | page_view | `trackPageView('/speakers')` |
| settings | theme_toggle | `trackEvent('settings', 'theme_toggle', 'dark')` |
| settings | font_change | `trackEvent('settings', 'font_change', 'orbitron')` |
| speakers | profile_view | `trackEvent('speakers', 'profile_view', slug)` |
| speakers | search | `trackEvent('speakers', 'search', query)` |
| tools | feature_use | `trackFeatureUsage('newsletter_studio')` |
| tools | feature_use | `trackFeatureUsage('social_card_generator')` |
| engagement | scroll_depth | auto-tracked by usePageTelemetry |
| engagement | time_on_page | auto-tracked by usePageTelemetry |
| error | uncaught | auto-tracked via window.onerror |
| error | unhandled_promise | auto-tracked |
| error | component_error | auto-tracked via ErrorBoundary |

## Web Vitals Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | ≤ 2.5s | ≤ 4.0s | > 4.0s |
| FID | ≤ 100ms | ≤ 300ms | > 300ms |
| CLS | ≤ 0.1 | ≤ 0.25 | > 0.25 |
| INP | ≤ 200ms | ≤ 500ms | > 500ms |
| TTFB | ≤ 800ms | ≤ 1800ms | > 1800ms |

## Adding Telemetry to New Features

```jsx
import { useTelemetry } from '@/hooks/useTelemetry'

function MyFeature() {
  const { trackEvent, trackFeature } = useTelemetry()

  useEffect(() => { trackFeature('my_feature') }, [])

  const handleAction = () => {
    trackEvent('my_feature', 'action_name', 'label')
  }
}
```

## Dev Overlay

- Toggle: `Ctrl+Shift+V`
- Shows live LCP, CLS, INP, TTFB
- Color-coded: green (good), yellow (needs improvement), red (poor)
- Dev mode only (import.meta.env.DEV)

## Dashboard

- Route: `/tools/analytics`
- Data source: `getSessionMetrics()` (dev) or API endpoint (prod)
- Sections: Page Views, Web Vitals, Feature Usage, Error Log
- Auto-refreshes every 5 seconds
