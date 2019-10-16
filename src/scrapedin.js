const puppeteer = require('puppeteer')
const login = require('./login')
const profile = require('./profile')
const logger = require('./logger')

module.exports = async({ cookies, email, password, isHeadless, hasToLog, puppeteerArgs } = { isHeadless: true, hasToLog: false }) => {
  if (!hasToLog) {
    logger.stopLogging()
  }
  logger.info('scrapedin', 'initializing')

  const args = Object.assign({ headless: isHeadless, args: ['--no-sandbox'] }, puppeteerArgs)
  const browser = await puppeteer.launch(args)

  if(cookies) {
    logger.info('scrapedin', 'using cookies, login will be bypassed')
  } else if (email && password) {
    logger.info('scrapedin', 'email and password was provided, we\'re going to login...')

    try {
      await login(browser, email, password, logger)
    } catch (e) {
      await browser.close()
      throw e
    }
  } else{ 
    logger.warn('scrapedin', 'email/password and cookies wasn\'t provided, only public data will be collected')
  }
 
  return (url, waitMs) => profile(browser, cookies, url, waitMs)
}
