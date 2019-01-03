const seeMoreButtons = [
  { id: 'summary', selector: '.pv-top-card-section__summary button[class~=pv-top-card-section__summary-toggle-button]' },
  { id: 'positions', selector: '.pv-experience-section__see-more button' },
  { id: 'educations', selector: '#education-section button.pv-profile-section__see-more-inline' },
  { id: 'skills', selector: 'button.pv-skills-section__additional-skills' },
  { id: 'recommendations', selector: '#recommendation-list + .artdeco-container-card-action-bar button' },
  { id: 'positions-roles', selectors: '.pv-position-entity button.pv-profile-section__see-more-inline' }
]

const clickAll = async(page) => {
  for(let i = 0; i < seeMoreButtons.length; i ++){
    const button = seeMoreButtons[i]
    if (button.selector) {
      const elem = await page.$(button.selector)
      if (elem) {
        await elem.click()
      }
    }

    if (button.selectors) {
      const elems = await page.$$(button.selectors)
      for (let j = 0; j < elems.length; j++) {
        await elems[j].click()
      }
    }
  }

  return
}

module.exports = { clickAll }
