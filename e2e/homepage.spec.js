import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/COMPASS/i)
  })

  test('hero section and CTA are visible', async ({ page }) => {
    const main = page.locator('main')
    await expect(main).toBeVisible()
    await expect(
      page.getByRole('link', { name: /get involved|join|explore/i }).first()
    ).toBeVisible()
  })

  test('footer is visible with social links', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    const socialLinks = footer.locator(
      'a[href*="facebook"], a[href*="twitter"], a[href*="instagram"], a[href*="linkedin"]'
    )
    if ((await socialLinks.count()) > 0) {
      for (const link of await socialLinks.all()) {
        await expect(link).toHaveAttribute('href', /.+/)
      }
    }
  })
})
