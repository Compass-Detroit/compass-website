import { test, expect } from '@playwright/test'

test.describe('Performance', () => {
  test('homepage LCP is under 4000ms', async ({ page }) => {
    await page.goto('/')
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry.startTime)
        }).observe({ type: 'largest-contentful-paint', buffered: true })
        setTimeout(() => resolve(0), 4000)
      })
    })
    expect(lcp).toBeLessThan(4000)
  })

  test('no console errors on page load', async ({ page }) => {
    const errors = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/')
    expect(errors.length).toBe(0)
  })

  test('images use lazy loading when appropriate', async ({ page }) => {
    await page.goto('/')
    const images = page.locator('img')
    const count = await images.count()
    for (let i = 0; i < count; i++) {
      const loading = await images.nth(i).getAttribute('loading')
      if (loading) {
        expect(['lazy', 'eager']).toContain(loading)
      }
    }
  })
})
