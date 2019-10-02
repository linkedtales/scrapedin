const logger = require('./logger')
const seeMoreButtons = [
  { id: 'summary', selector: '.pv-top-card-section__summary button[class~=pv-top-card-section__summary-toggle-button]' },
  { id: 'summaryAlternative', selector: '#oc-about-section a.lt-line-clamp__more' },
  { id: 'positions', selector: '#experience-section a.lt-line-clamp__more' },
  { id: 'educations', selector: '#education-section button.pv-profile-section__see-more-inline' },
  { id: 'skills', selector: 'button.pv-skills-section__additional-skills' },
  { id: 'recommendations', selector: '#recommendation-list + .artdeco-container-card-action-bar button' },
  { id: 'positions-roles', selectors: '.pv-position-entity button.pv-profile-section__see-more-inline' },
  { id: 'recommendations-see-more', selectors: '.pv-recommendation-entity__text a.lt-line-clamp__more'},
  { id: 'recommendations-show-more', selectors: '#recommendation-list + .artdeco-container-card-action-bar .pv-profile-section__see-more-inline'}
]


const clickAll = async(page) => {
  for(let i = 0; i < seeMoreButtons.length; i ++){
    const button = seeMoreButtons[i]
    if (button.selector) {
      const elem = await page.$(button.selector)
      if (elem) {
        await elem.click()
          .catch((e) => logger.warn('seeMoreButtons', `couldn't click on ${button.selector}, it's probably invisible`))
      }
    }

    if (button.selectors) {
      const elems = await page.$$(button.selectors)
      for (let j = 0; j < elems.length; j++) {
        await elems[j].click()
          .catch((e) => logger.warn('seeMoreButtons', `couldn't click on ${button.selectors}, it's probably invisible`))
      }
    }
  }

  return
}

module.exports = { clickAll }
