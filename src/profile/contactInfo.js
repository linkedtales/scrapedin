const logger = require('../logger')

const showSelector = '.a[data-control-name=contact_see_more]'
const template = {
  contacts: {
    selector: '.pv-contact-info__contact-type',
    fields: {
      value: 'header',
      type: '.pv-contact-info__ci-container'
    }
  }
} 
const getContactInfo = async(page) => {

  await page.waitFor(showSelector, { timeout: 2000 })
    .catch(() => {
      logger.warn('contact-info', 'selector not found')
      return {}
    })

  const element = page.$(showSelector)
  await elem.click()
  await new Promise((resolve) => { setTimeout(() => { resolve() }, 500)})

  const contacts = page.$$('pv-contact-info__contact-type')
}

module.exports = { getContactInfo }