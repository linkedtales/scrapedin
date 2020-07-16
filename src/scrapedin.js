const puppeteer = require('puppeteer')
const login = require('./login')
const profile = require('./profile/profile')
const company = require('./company/company')
const logger = require('./logger')(__filename)

module.exports = async ({ cookies, email, password, isHeadless, hasToLog, hasToGetContactInfo, puppeteerArgs, puppeteerAuthenticate, endpoint } = { isHeadless: true, hasToLog: false }) => {
  if (!hasToLog) {
    logger.stopLogging()
  }
  logger.info('initializing')

  let browser;
  if(endpoint){
    browser = await puppeteer.connect({
      browserWSEndpoint: endpoint,
    });
  }else{
    const args = Object.assign({ headless: isHeadless, args: ['--no-sandbox'] }, puppeteerArgs)
    browser = await puppeteer.launch(args)
  }

  if (cookies) {
    logger.info('using cookies, login will be bypassed')
  } else if (email && password) {
    logger.info('email and password was provided, we\'re going to login...')

    try {
      await login(browser, email, password, logger)
    } catch (e) {
      if(!endpoint){
        await browser.close()
      }
      throw e
    }
  } else {
    logger.warn('email/password and cookies wasn\'t provided, only public data will be collected')
  }

  return (url, waitMs) => url.includes('/school/') || url.includes('/company/') ? company(browser, cookies, url, waitMs, hasToGetContactInfo, puppeteerAuthenticate) :profile(browser, cookies, url, waitMs, hasToGetContactInfo, puppeteerAuthenticate)
}
