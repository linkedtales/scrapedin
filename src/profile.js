const openPage = require('./openPage')
const logger = require('./logger')
const template = require('./profileScraperTemplate')


const sectionRead = async (page, section) => {
  const experiencesElement = await page.$$(section.selector)
  return Promise.all(
    experiencesElement.map((experience) =>
      Object.keys(section.fields).reduce((acc, field) =>
        acc.then(async (obj) => {
          const fieldObject = section.fields[field]
          const selector = fieldObject.selector || fieldObject
          const hasField = await experience.$(selector)

          if (hasField) {
            if (fieldObject.attribute && fieldObject.attribute === 'href') {
              obj[field] = await experience.$eval(selector, (e) => e ? e.href : '')
            } else if (fieldObject.isMultipleFields) {
              const fields = await experience.$$(fieldObject.selector)

              obj[field] = []
              for (let i = 0; i < fields.length; i++) {
                obj[field] = await experience.$$eval(fieldObject.selector, (e) => e.map(x => x.innerText))
              }
            } else {
              obj[field] = await experience.$eval(selector, (e) => e ? e.innerText : '')
            }
          }
          return obj
        })
      , Promise.resolve({}))
    )
  )
}
module.exports = async (browser, url) => {
  logger.info('profile', `starting scraping url: ${url}`)
  const page = await openPage(browser, url)
  await page.waitFor("h1[class~='pv-top-card-section__name']", { timeout: 5000 })
    .catch(() => {
      logger.warn('profile', 'profile selector was not found')
      throw new Error('linkedin: profile not found')
    })

  for (let i = 0; i < 15; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight))
    const hasReachedEnd = await page.waitForSelector('#footer-logo', {
      visible: true,
      timeout: 500
    }).catch(() => {
      console.log('vai promissar')
    })

    if (hasReachedEnd) { break }
  }

  // click see more buttons
  for (let i = 0; i < template.seeMoreButtons.length; i++) {
    const elem = await page.$(template.seeMoreButtons[i].selector)
    if (elem) {
      await elem.click()
    }
  }

  const [profile] = await sectionRead(page, template.profile)
  const positions = await sectionRead(page, template.positions)
  const educations = await sectionRead(page, template.educations)
  const skillsTop = await sectionRead(page, template.skills.top)
  const skillsOther = await sectionRead(page, template.skills.others)
  const recommendations = await sectionRead(page, template.recommendations)
  const recommendationsGiven = await sectionRead(page, template.recommendationsGiven)
  const accomplishments = await sectionRead(page, template.accomplishments)
  const peopleAlsoViewed = await sectionRead(page, template.peopleAlsoViewed)

  await page.close()
  logger.info('profile', `finished scraping url: ${url}`)
  return {
    profile,
    positions,
    educations,
    skills: skillsTop.concat(skillsOther),
    recommendations,
    recommendationsGiven,
    accomplishments,
    peopleAlsoViewed
  }
}
