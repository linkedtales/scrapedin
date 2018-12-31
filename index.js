const puppeteer = require('puppeteer')
const login = require('./login')
const profile = require('./profile')
const logger = require('./logger')

module.exports = ({ email, password, isHeadless, hasToLog } = { isHeadless: true, hasToLog: false }) => new Promise(async(resolve, reject) => {
  logger.info('index', 'initializing')

  if(!email || !password) {
    logger.warn('index', 'required parameters email and password was not provided')
    return reject('scrapedin: email and password are required to access linkedin profiles')
  }

  logger.info('index', 'required parameters email and password was provided')

  const browser = await puppeteer.launch({ headless: isHeadless })
  const page = await browser.newPage()

  // await page.setViewport({
  //   width:1000,
  //   height: 15000
  // })

  try{
    await login(page, email, password, logger)
  }catch(e){
    await browser.close()
    return reject(e)
  }


  return Promise.resolve((url) => profile(browser, url))
})
