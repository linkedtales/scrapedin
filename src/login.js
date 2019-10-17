const openPage = require('./openPage')
const logger = require('./logger')

module.exports = async (browser, email, password) => {
  const loginUrl = 'https://www.linkedin.com/login'
  const page = await openPage(browser, undefined, loginUrl)
  logger.info('login', `logging at: ${loginUrl}`)

  await page.goto(loginUrl)
  await page.waitFor('#username')

  await page.$('#username')
    .then((emailElement) => emailElement.type(email))
  await page.$('#password')
    .then((passwordElement) => passwordElement.type(password))

  await page.$x("//button[contains(text(), 'Sign in')]")
    .then((button) => button[0].click())

  return page.waitFor('input[role=combobox]', {
    timeout: 15000
    })
    .then(async () => {
      logger.info('login', 'logged feed page selector found')
      await page.close()
    })
    .catch(async () => {
      logger.warn('login', 'successful login element was not found')
      const emailError = await page.evaluate(() => {
        const e = document.querySelector('div[error-for=username]')
        if (!e) { return false }
        const style = window.getComputedStyle(e)
        return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
      })

      const passwordError = await page.evaluate(() => {
        const e = document.querySelector('div[error-for=password]')
        if (!e) { return false }
        const style = window.getComputedStyle(e)
        return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
      })

      const manualChallengeRequested = await page.evaluate(() => {
        const e = document.querySelector('.flow-challenge-content')
        if (!e) { return false }
        const style = window.getComputedStyle(e)
        return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
      })

      if (emailError) {
        logger.info('login', 'wrong username element found')
        return Promise.reject(new Error(`linkedin: invalid username: ${email}`))
      }

      if (passwordError) {
        logger.info('login', 'wrong password element found')
        return Promise.reject(new Error('linkedin: invalid password'))
      }

      if (page.$(manualChallengeRequested)) {
        logger.warn('login', 'manual check was required')
        return Promise.reject(new Error('linkedin: manual check was required, verify if your login is properly working manually or report this issue: https://github.com/leonardiwagner/scrapedin/issues'))
      }

      logger.error('login', 'could not find any element to retrieve a proper error')
      return Promise.reject(new Error('login is not working, please report: https://github.com/leonardiwagner/scrapedin/issues'))
    })
}
