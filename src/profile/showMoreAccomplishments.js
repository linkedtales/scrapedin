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

module.exports = { showAccomplishments }