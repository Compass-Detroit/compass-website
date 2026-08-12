import { test, expect } from '@playwright/test'

const ROUTES = [
  '/',
  '/about',
  '/programs',
  '/community',
  '/events',
  '/get-involved',
  '/speakers',
  '/team',
  '/gallery',
  '/impact',
  '/news',
  '/resources',
]

test.describe('Navigation', () => {
  test('all major routes load without error', async ({ page }) => {
    for (const route of ROUTES) {
      const response = await page.goto(route)
      expect(response.status()).toBe(200)
      await expect(page.locator('nav').first()).toBeVisible()
      await expect(page.locator('main').first()).toBeVisible()
    }
  })

  test('browser back/forward navigation works', async ({ page }) => {
    await page.goto('/')
    await page.goto('/about')
    await page.goBack()
    expect(new URL(page.url()).pathname).toBe('/')
    await page.goForward()
    expect(new URL(page.url()).pathname).toBe('/about')
  })

  test('invalid route shows 404', async ({ page }) => {
    const response = await page.goto('/nonexistent-page')
    expect(response.status()).toBe(404)
    await expect(page.getByText('404', { exact: false }).first()).toBeVisible()
  })

  test('skip link is first focusable element', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const focused = await page.evaluate(
      () => document.activeElement.textContent
    )
    expect(focused.toLowerCase()).toContain('skip')
  })
})
