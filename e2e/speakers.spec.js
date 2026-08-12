import { test, expect } from '@playwright/test'

test.describe('Speakers Directory', () => {
  test('speakers page loads and interacts correctly', async ({ page }) => {
    await page.goto('/speakers')

    const speakerCards = page.locator(
      'article, .speaker-card, [data-testid="speaker-card"]'
    )
    if ((await speakerCards.count()) > 0) {
      const firstCard = speakerCards.first()
      await expect(firstCard).toBeVisible()

      const searchInput = page.getByPlaceholder(/search/i)
      if (await searchInput.isVisible()) {
        await searchInput.fill('Test')
      }

      await firstCard.click()
      await expect(page).toHaveURL(/\/speakers\/.+/)
      await expect(page.locator('main')).toBeVisible()

      await page.goBack()
      await expect(page).toHaveURL(/\/speakers/)
    }
  })
})
