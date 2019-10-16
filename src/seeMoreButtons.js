const logger = require('./logger')
const seeMoreButtons = [
  {
    id: 'SEE_MORE_EXPERIENCE_DESCRIPTION',
    selector: '.lt-line-clamp__more'
  },{
    id: 'SHOW_MORE_EXPERIENCES',
    //buton to avoid activities click which are <a> and will redirect to other page
    selector: 'button.pv-profile-section__see-more-inline'
  },{
    id: 'SHOW_MORE_SECTIONS',
    //button to avoid followers click which are <a> and will open a modal
    selector: 'button.pv-profile-section__card-action-bar'
  }
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