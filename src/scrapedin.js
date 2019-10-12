const puppeteer = require('puppeteer')
const login = require('./login')
const profile = require('./profile')
const logger = require('./logger')

module.exports = async({ email, password, isHeadless, hasToLog, puppeteerArgs } = { isHeadless: true, hasToLog: false }) => {
  if (!hasToLog) {
    logger.stopLogging()
  }
  logger.info('scrapedin', 'initializing')

  if (!email || !password) {
    logger.warn('scrapedin', 'required parameters email and password were not provided')
    throw new Error('scrapedin: email and password are required to access linkedin profiles')
  }

  logger.info('scrapedin', 'required parameters email and password were provided')

  const args = Object.assign({ headless: isHeadless }, puppeteerArgs)
  const browser = await puppeteer.launch(args)

  try {
    await login(browser, email, password, logger)
  } catch (e) {
    await browser.close()
    throw e
  }

  return (url, waitMs) => profile(browser, url, waitMs)
}
