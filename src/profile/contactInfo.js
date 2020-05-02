const logger = require('../logger')
const scrapSection = require('../scrapSection')

const SEE_MORE_SELECTOR = 'a[data-control-name=contact_see_more]'
const CLOSE_MODAL_SELECTOR = '.artdeco-modal__dismiss';

const template = {
  selector: '.pv-contact-info__contact-type',
  fields: {
    type: 'header',
    values: {
      selector: '.pv-contact-info__ci-container',
      isMultipleFields: true
    }
  }
} 
const getContactInfo = async(page) => {
  await page.waitFor(SEE_MORE_SELECTOR, { timeout: 2000 })
    .catch(() => {
      logger.warn('contact-info', 'selector not found')
      return {}
    })

  const element = await page.$(SEE_MORE_SELECTOR)
  if(element){
    await element.click()
    await new Promise((resolve) => { setTimeout(() => { resolve() }, 500)})
    
    const contactInfo = await scrapSection(page, template)
    const closeButton = await page.$(CLOSE_MODAL_SELECTOR)
    if(closeButton)
      await closeButton.click()

    return contactInfo
  }
  
}

module.exports = getContactInfo