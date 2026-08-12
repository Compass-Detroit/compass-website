import { test, expect } from '@playwright/test'

test.describe('Dark Mode', () => {
  test('theme toggle works and persists', async ({ page }) => {
    await page.goto('/')

    const html = page.locator('html')
    const initialTheme = (await html.getAttribute('class')) || 'light'

    const toggleBtn = page.locator(
      'button[aria-label*="theme"], button[aria-label*="mode"], button:has(svg)'
    )
    if ((await toggleBtn.count()) > 0) {
      await toggleBtn.first().click()

      const newTheme = await html.getAttribute('class')
      expect(newTheme).not.toBe(initialTheme)

      await page.goto('/about')
      await expect(page.locator('html')).toHaveClass(newTheme)

      await page.reload()
      await expect(page.locator('html')).toHaveClass(newTheme)
    }
  })
})
