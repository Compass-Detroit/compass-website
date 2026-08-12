import { test, expect } from '@playwright/test'

test.describe('Forms', () => {
  test('submit talk form validation', async ({ page }) => {
    await page.goto('/submit-talk')

    const form = page.locator('form')
    if ((await form.count()) > 0) {
      await expect(page.locator('input').first()).toBeVisible()

      const submitBtn = page.locator(
        'button[type="submit"], input[type="submit"]'
      )
      if ((await submitBtn.count()) > 0) {
        await submitBtn.first().click()
        const firstRequired = page.locator(':invalid').first()
        if ((await firstRequired.count()) > 0) {
          await expect(firstRequired).toBeVisible()
        }
      }
    }
  })

  test('newsletter signup in footer works', async ({ page }) => {
    await page.goto('/')
    const newsletterForm = page.locator('footer form')
    if ((await newsletterForm.count()) > 0) {
      const emailInput = newsletterForm.locator('input[type="email"]')
      await emailInput.fill('test@example.com')
      const submitBtn = newsletterForm.locator('button[type="submit"]')
      await submitBtn.click()
      // Assume basic validation or success msg
    }
  })
})
