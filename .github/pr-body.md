## 🧪 Testing Infrastructure & Custom Telemetry

### Description

Adds a complete 3-layer testing pyramid and a privacy-first custom telemetry system to the COMPASS Detroit website. Goes from **zero tests** to **74 passing unit/integration tests**, **7 Playwright E2E specs**, **3 Selenium cross-browser tests**, and a **full Web Vitals telemetry system** with dev overlay and analytics dashboard.

### Changes

#### Testing
- **Vitest** (unit/integration): 13 test suites, 74 tests — all passing ✅
  - Components: ThemeProvider, CTAButton, ProfileCard, GenericCard, SiteNavbar, SiteFooter
  - Utilities: speakerRegistry, eventData
  - Integration: App routing, HomePage, SpeakersDirectory, SpeakerProfile, EventsPage
- **Playwright** (E2E): 7 spec files covering navigation, homepage, speakers, dark mode, accessibility, performance, forms
- **Selenium** (cross-browser): 3 test files for smoke tests, navigation verification, visual regression
- Test setup with browser API mocks (IntersectionObserver, matchMedia, ResizeObserver, localStorage)
- `vitest.config.js`, `playwright.config.js`, `selenium.config.js`

#### Custom Telemetry
- `src/utils/telemetry.js` — Core engine: Web Vitals (LCP, CLS, FID, INP, TTFB), event tracking, error monitoring
- `src/components/TelemetryProvider.jsx` — React context + ErrorBoundary
- `src/hooks/useTelemetry.js` — Hooks: usePageTelemetry, useWebVitals
- `src/components/WebVitalsOverlay.jsx` — Dev-only panel (Ctrl+Shift+V)
- `src/pages/AnalyticsDashboardPage.jsx` — Dashboard at `/tools/analytics`
- **Privacy-first**: No PII, no cookies, in-memory session ID, sendBeacon flush

#### CI/CD
- Added `unit-tests` job (Vitest + coverage upload)
- Added `e2e-tests` job (Playwright on Chromium + report upload)

#### Agent Skills
- Updated `caveman`, `cavecrew`, `cove` with testing/telemetry patterns
- Created `testing/SKILL.md` and `telemetry/SKILL.md`

### Screenshots

#### All 74 Unit Tests Passing
![Test Results](https://raw.githubusercontent.com/Compass-Detroit/compass-website/feat/testing-telemetry-infrastructure/.github/pr-assets/test-results.jpg)

#### Analytics Dashboard (`/tools/analytics`)
![Analytics Dashboard](https://raw.githubusercontent.com/Compass-Detroit/compass-website/feat/testing-telemetry-infrastructure/.github/pr-assets/analytics-dashboard.jpg)

#### Web Vitals Overlay (Dev Mode, Ctrl+Shift+V)
![Web Vitals Overlay](https://raw.githubusercontent.com/Compass-Detroit/compass-website/feat/testing-telemetry-infrastructure/.github/pr-assets/web-vitals-overlay.jpg)

### New Scripts

```bash
npm run test              # Vitest single run
npm run test:watch        # Vitest watch mode
npm run test:ui           # Vitest interactive UI
npm run test:coverage     # Vitest with coverage report
npm run test:e2e          # Playwright all browsers
npm run test:e2e:ui       # Playwright interactive UI
npm run test:e2e:headed   # Playwright with browser visible
npm run test:selenium     # Selenium via Node test runner
npm run test:all          # Unit + E2E combined
```

### Verification

- [x] `npm run build` passes
- [x] `npm run lint` passes (exit 0)
- [x] `npm run test` — 13 suites, 74 tests, 0 failures (3.4s)

### Privacy Notes

The telemetry system collects **zero PII**:
- Session ID: `crypto.randomUUID()` — in-memory only, no cookies
- No names, emails, or IP tracking
- Stack traces trimmed to 3 lines
- All data stays in-browser unless `VITE_TELEMETRY_ENDPOINT` is configured

### Post-Merge Steps

1. `npx playwright install --with-deps` to enable E2E tests
2. Optionally set `VITE_TELEMETRY_ENDPOINT` for production data collection
3. Optionally set `SELENIUM_GRID_URL` for remote cross-browser testing
