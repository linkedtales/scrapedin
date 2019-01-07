const puppeteer = require('puppeteer')
const login = require('./login')
const profile = require('./profile')
const logger = require('./logger')

module.exports = ({ email, password, isHeadless, hasToLog, proxyAddress } = { isHeadless: true, hasToLog: false }) => new Promise(async (resolve, reject) => {
  if (!hasToLog) {
    logger.stopLogging()
  }
  logger.info('scrapedin', 'initializing')

  if (!email || !password) {
    logger.warn('scrapedin', 'required parameters email and password was not provided')
    return reject(new Error('scrapedin: email and password are required to access linkedin profiles'))
  }

  logger.info('scrapedin', 'required parameters email and password was provided')

  const args = proxyAddress && [`--proxy-server=${proxyAddress}`]
  args && logger.info('scrapedin', `using proxy address: ${proxyAddress}`)
  const browser = await puppeteer.launch({ headless: isHeadless, args })

  try {
    await login(browser, email, password, logger)
  } catch (e) {
    await browser.close()
    return reject(e)
  }

  return resolve(Promise.resolve((url, waitMs) => profile(browser, url, waitMs)))
})
