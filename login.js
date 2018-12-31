const logger = require('./logger')

module.exports = async(page, email, password) => {
  const loginUrl = 'https://www.linkedin.com'
  logger.info('login', `logging at: ${loginUrl}`)

  await page.goto(loginUrl)
  await page.waitFor('#login-email')

  await page.$('#login-email')
    .then((emailElement) => emailElement.type(email))
  await page.$('#login-password')
    .then((passwordElement) => passwordElement.type(password))

  await page.$('#login-submit')
    .then((button) => button.click())

  return page.waitFor('input[role=combobox]', {
    timeout: 5000
  })
  .then(() => Promise.resolve())
  .catch(async(error) => {
    logger.warn('login', 'successful login element was not found')
    const emailError = await page.evaluate(() => {
          const e = document.querySelector('div[error-for=username]');
          if (!e)
            return false;
          const style = window.getComputedStyle(node);
          return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        })

    const passwordError = await page.evaluate(() => {
          const e = document.querySelector('div[error-for=password]');
          if (!e)
            return false;
          const style = window.getComputedStyle(node);
          return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        })

    if(emailError){
      logger.info('login', 'wrong username element found')
      return Promise.reject(`linkedin: invalid username: ${email}`)
    }

    if(passwordError){
      logger.info('login', 'wrong password element found')
      return Promise.reject('linkedin: invalid password')
    }

    logger.error('login', 'could not find any element to retrieve a proper error')
    return Promise.reject('login is not working, please report: https://github.com/leonardiwagner/scrapedin/issues')
  })

  return
}
