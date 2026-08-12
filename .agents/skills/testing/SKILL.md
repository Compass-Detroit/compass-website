---
name: testing
description: >
  COMPASS Detroit testing conventions and patterns. Covers unit tests (Vitest),
  integration tests (Testing Library), E2E tests (Playwright), and cross-browser
  tests (Selenium). Trigger: "write test", "add test", "test this", "testing",
  "use testing", or when test files need to be created or modified.
---

## Stack

| Layer | Tool | Config |
|-------|------|--------|
| Unit/Integration | Vitest + @testing-library/react | vitest.config.js |
| E2E | Playwright | playwright.config.js |
| Cross-browser | Selenium WebDriver | selenium.config.js |
| Accessibility | @axe-core/playwright + @axe-core/react | Built into E2E + dev mode |
| Coverage | @vitest/coverage-v8 | Istanbul reporter |

## File Locations

| Type | Pattern | Example |
|------|---------|--------|
| Unit test | `src/**/*.test.{js,jsx}` | `src/utils/speakerRegistry.test.js` |
| Component test | `src/components/**/*.test.jsx` | `src/components/SiteNavbar.test.jsx` |
| Page test | `src/pages/**/*.test.jsx` | `src/pages/HomePage.test.jsx` |
| E2E test | `e2e/*.spec.js` | `e2e/navigation.spec.js` |
| Selenium test | `selenium/*.test.js` | `selenium/smoke.test.js` |

## Test Naming

- Describe block: component/function name
- Test name: what it does (verb phrase), not "should X"
- Example: `it('renders speaker name')` not `it('should render the speaker name correctly')`

## Required Wrappers

```jsx
// Components using react-router-dom
const wrap = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

// Components using useTheme()
const wrapAll = (ui) => render(
  <BrowserRouter><ThemeProvider>{ui}</ThemeProvider></BrowserRouter>
)
```

## Common Mocks

```javascript
// SVG imports
vi.mock('@/assets/images/compass-logo.svg', () => ({
  ReactComponent: (props) => <svg data-testid="compass-logo" {...props} />,
}))

// Heavy child components
vi.mock('@/components/SiteNavbar', () => ({ default: () => <nav data-testid="navbar" /> }))
vi.mock('@/components/SiteFooter', () => ({ default: () => <footer data-testid="footer" /> }))

// Data modules
vi.mock('@/utils/speakerRegistry', () => ({
  getAllSpeakers: () => [/* minimal test data */],
}))
```

## When to Write Which Test

| Change | Test type |
|--------|-----------|
| New utility function | Unit test |
| New component | Component test (render + interaction) |
| New page | Page integration test (mocked deps) + E2E smoke |
| Bug fix | Unit test reproducing the bug |
| Visual change | E2E screenshot (Playwright or Selenium) |
| Accessibility | E2E axe scan |
| Cross-browser issue | Selenium test |

## Scripts

```bash
npm run test              # Vitest run (single pass)
npm run test:watch        # Vitest watch mode
npm run test:ui           # Vitest UI
npm run test:coverage     # Vitest with coverage report
npm run test:e2e          # Playwright all browsers
npm run test:e2e:ui       # Playwright interactive UI
npm run test:e2e:headed   # Playwright with browser visible
npm run test:selenium     # Selenium smoke tests
npm run test:all          # Unit + E2E
```

## Coverage Targets

- Utilities: >80% statement coverage
- Components: >60% statement coverage
- Pages: smoke-level (renders without crash)
- Overall: >50% as baseline, increase over time
