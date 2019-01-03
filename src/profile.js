const openPage = require('./openPage')
const scrapSection = require('./scrapSection')
const scrollToPageBottom = require('./scrollToPageBottom')
const seeMoreButtons = require('./seeMoreButtons')
const template = require('./profileScraperTemplate')

const logger = require('./logger')

module.exports = async (browser, url) => {
  logger.info('profile', `starting scraping url: ${url}`)

  const page = await openPage(browser, url)
  await page.waitFor("h1[class~='pv-top-card-section__name']", { timeout: 5000 })
    .catch(() => {
      logger.warn('profile', 'profile selector was not found')
      throw new Error('linkedin: profile not found')
    })

  await scrollToPageBottom(page)
  await seeMoreButtons.clickAll(page)

  const [profile] = await scrapSection(page, template.profile)
  const positions = await scrapSection(page, template.positions)
  const educations = await scrapSection(page, template.educations)
  const skillsTop = await scrapSection(page, template.skills.top)
  const skillsOther = await scrapSection(page, template.skills.others)
  const recommendations = await scrapSection(page, template.recommendations)
  const recommendationsGiven = await scrapSection(page, template.recommendationsGiven)
  const accomplishments = await scrapSection(page, template.accomplishments)
  const peopleAlsoViewed = await scrapSection(page, template.peopleAlsoViewed)
  const volunteerExperience = await scrapSection(page, template.volunteerExperience)

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
    peopleAlsoViewed,
    volunteerExperience
  }
}
