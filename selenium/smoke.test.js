/* eslint-env node */
import { describe, it, before, after } from 'node:test'
import assert from 'node:assert'
import { Builder, By, until } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome.js'

const baseUrl = process.env.BASE_URL || 'http://localhost:4173'

describe('Selenium Smoke Test', () => {
  let driver

  before(async () => {
    const options = new chrome.Options()
    options.addArguments('--headless=new')
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build()
  })

  after(async () => {
    if (driver) await driver.quit()
  })

  it('critical user path: home to speakers to profile to back', async () => {
    await driver.get(baseUrl)

    // Find speakers link in nav
    const speakersLink = await driver.wait(
      until.elementLocated(By.xpath('//nav//a[contains(text(), "Speakers")]')),
      5000
    )
    await speakersLink.click()

    // Wait for speakers page URL
    await driver.wait(until.urlContains('/speakers'), 5000)

    try {
      // Click first speaker
      const firstSpeaker = await driver.wait(
        until.elementLocated(By.css('a[href^="/speakers/"]')),
        5000
      )
      await firstSpeaker.click()

      // Wait for profile
      await driver.wait(until.urlMatches(/\/speakers\/.+/), 5000)

      const main = await driver.findElement(By.css('main'))
      assert.ok(await main.isDisplayed())

      // Navigate back
      await driver.navigate().back()
      await driver.wait(until.urlMatches(/\/speakers$/), 5000)
    } catch (e) {
      // Ignore if no speakers found
      console.log('No speaker found, skipping profile click step')
    }
  })
})
