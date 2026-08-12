/* eslint-env node */
import { describe, it, before, after } from 'node:test'
import { Builder } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome.js'
import fs from 'fs'
import path from 'path'

const baseUrl = process.env.BASE_URL || 'http://localhost:4173'
const screenshotDir = path.resolve('test-results/selenium-screenshots')

describe('Visual Regression Baseline', () => {
  let driver

  before(async () => {
    fs.mkdirSync(screenshotDir, { recursive: true })
    const options = new chrome.Options()
    options.addArguments('--headless=new', '--window-size=1280,800')
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build()
  })

  after(async () => {
    if (driver) await driver.quit()
  })

  const takeScreenshot = async (name) => {
    const image = await driver.takeScreenshot()
    fs.writeFileSync(path.join(screenshotDir, `${name}.png`), image, 'base64')
  }

  it('captures homepage', async () => {
    await driver.get(baseUrl)
    await takeScreenshot('homepage')
  })

  it('captures speakers page', async () => {
    await driver.get(`${baseUrl}/speakers`)
    await takeScreenshot('speakers')
  })

  it('captures about page', async () => {
    await driver.get(`${baseUrl}/about`)
    await takeScreenshot('about')
  })
})
