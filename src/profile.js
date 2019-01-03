const openPage = require('./openPage')
const logger = require('./logger')
const template = require('./profileScraperTemplate')
const scrapSection = require('./scrapSection')

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

  const [profile] = await scrapSection(page, template.profile)
  const positions = await scrapSection(page, template.positions)
  const educations = await scrapSection(page, template.educations)
  const skillsTop = await scrapSection(page, template.skills.top)
  const skillsOther = await scrapSection(page, template.skills.others)
  const recommendations = await scrapSection(page, template.recommendations)
  const recommendationsGiven = await scrapSection(page, template.recommendationsGiven)
  const accomplishments = await scrapSection(page, template.accomplishments)
  const peopleAlsoViewed = await scrapSection(page, template.peopleAlsoViewed)

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
