import { test, expect } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('homepage has no critical accessibility violations', async ({
    page,
  }) => {
    await page.goto('/')
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(
      accessibilityScanResults.violations.filter((v) => v.impact === 'critical')
        .length
    ).toBe(0)
  })

  test('speakers page has no critical accessibility violations', async ({
    page,
  }) => {
    await page.goto('/speakers')
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()
    expect(
      accessibilityScanResults.violations.filter((v) => v.impact === 'critical')
        .length
    ).toBe(0)
  })

  test('about page has no critical accessibility violations', async ({
    page,
  }) => {
    await page.goto('/about')
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()
    expect(
      accessibilityScanResults.violations.filter((v) => v.impact === 'critical')
        .length
    ).toBe(0)
  })

  test('skip link moves focus to main', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')
    const focused = await page.evaluate(() =>
      document.activeElement.tagName.toLowerCase()
    )
    expect(['main', 'div', 'section']).toContain(focused)
  })

  test('images have alt text', async ({ page }) => {
    await page.goto('/')
    const images = page.locator('img')
    const count = await images.count()
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt')
    }
  })
})
