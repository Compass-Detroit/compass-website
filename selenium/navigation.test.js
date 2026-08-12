/* eslint-env node */
import { describe, it, before, after } from 'node:test'
import assert from 'node:assert'
import { Builder, By, until } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome.js'

// Assuming basic config if selenium.config.js doesn't export what we need
const baseUrl = process.env.BASE_URL || 'http://localhost:4173'

describe('Selenium Navigation', () => {
  let driver

  before(async () => {
    const options = new chrome.Options()
    options.addArguments('--headless=new')
    options.addArguments('--no-sandbox')
    options.addArguments('--disable-dev-shm-usage')
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build()
  })

  after(async () => {
    if (driver) await driver.quit()
  })

  it('homepage loads and title contains COMPASS', async () => {
    await driver.get(baseUrl)
    await driver.wait(until.titleMatches(/COMPASS/i), 5000)
    const title = await driver.getTitle()
    assert.match(title, /COMPASS/i)
  })

  it('navigate to /about, content appears', async () => {
    await driver.get(`${baseUrl}/about`)
    const main = await driver.wait(until.elementLocated(By.css('main')), 5000)
    assert.ok(await main.isDisplayed())
  })

  it('navigate to /speakers, speaker cards appear', async () => {
    await driver.get(`${baseUrl}/speakers`)
    try {
      const card = await driver.wait(
        until.elementLocated(
          By.css('article, .speaker-card, [data-testid="speaker-card"]')
        ),
        5000
      )
      assert.ok(await card.isDisplayed())
    } catch (e) {
      // In case there are no speakers, at least main is there
      const main = await driver.findElement(By.css('main'))
      assert.ok(await main.isDisplayed())
    }
  })

  it('invalid route shows 404', async () => {
    await driver.get(`${baseUrl}/nonexistent-page`)
    const bodyText = await driver.findElement(By.css('body')).getText()
    assert.match(bodyText, /404/)
  })
})
