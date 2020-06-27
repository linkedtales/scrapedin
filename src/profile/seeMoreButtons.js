const logger = require('../logger')(__filename)


const accomplishments = [ 
    'courses',
    'projects',
    'languages',
    'honors',
    'patents',
    'publications',
    'organizations',
    'test-scores'
]

const showAccomplishments = async (page) => {
  for (let accomplishment of accomplishments) {
    const selector = '.pv-accomplishments-block.' + accomplishment;;

    try {
      const elems = await page.$$(selector + ' button')
      const elem = elems[0] 
      if (elem)
        await elem.click()
      else
        continue
    } catch (e) {
      logger.warn(`couldn't click on ${accomplishment}, it's probably invisible`)
      continue
    }

    while (true) {  
      try {
        const elems = await page.$$(selector + ' button.pv-profile-section__see-more-inline')
        const elem = elems[0];
        if (elem) 
          await elem.click()  
        else
          break;
      } catch (e) {
        break
      }
    }

  }
  return
}



const seeMoreButtons = [
  {
    id: 'SHOW_MORE_ABOUT',
    selector: '#line-clamp-show-more-button'
  },{
    id: 'SHOW_MORE_EXPERIENCES',
    selector: '#experience-section .pv-profile-section__see-more-inline'
  },{
    id: 'SEE_MORE_EXPERIENCES',
    selector: '#experience-section .inline-show-more-text__button'
  },{
    id: 'SHOW_MORE_CERTIFICATIONS',
    selector: '#certifications-section .pv-profile-section__see-more-inline'
  },{
    id: 'SHOW_MORE_SKILLS',
    selector: '.pv-skills-section__additional-skills'
  },{
    id: 'SEE_MORE_RECOMMENDATIONS',
    selector: '.recommendations-inlining #line-clamp-show-more-button'
  }
]


const clickAll = async(page) => {
  for(let i = 0; i < seeMoreButtons.length; i++){
    const button = seeMoreButtons[i]
    const elems = await page.$$(button.selector)

    for(let j = 0; j < elems.length; j++){
      const elem = elems[j]
      if (elem) {
        await elem.click()
          .catch((e) => logger.warn(`couldn't click on ${button.selector}, it's probably invisible`))
      }
    }
  }

  return
}

module.exports = { clickAll }
