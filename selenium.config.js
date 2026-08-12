const config = {
  baseUrl: process.env.SELENIUM_BASE_URL || 'http://localhost:4173',
  gridUrl: process.env.SELENIUM_GRID_URL || null,
  browsers: ['chrome', 'firefox'],
  timeout: 30000,
  retries: 2,
  screenshotDir: './test-results/selenium-screenshots',
  capabilities: {
    chrome: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'],
      },
    },
    firefox: {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['-headless'],
      },
    },
  },
}

export default config
