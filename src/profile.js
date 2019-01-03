const openPage = require('./openPage')
const scrapSection = require('./scrapSection')
const scrollToPageBottom = require('./scrollToPageBottom')
const seeMoreButtons = require('./seeMoreButtons')
const template = require('./profileScraperTemplate')

const logger = require('./logger')

module.exports = async (browser, url, waitTimeToScrapMs = 500) => {
  logger.info('profile', `starting scraping url: ${url}`)

  const page = await openPage(browser, url)
  await page.waitFor("h1[class~='pv-top-card-section__name']", { timeout: 5000 })
    .catch(() => {
      logger.warn('profile', 'profile selector was not found')
      throw new Error('linkedin: profile not found')
    })

  logger.info('profile', 'scrolling page to the bottom')
  await scrollToPageBottom(page)

  if(waitTimeToScrapMs) {
    logger.info('profile', `applying 1st delay`)
    await new Promise((resolve) => { setTimeout(() => { resolve() }, waitTimeToScrapMs / 2)})
  }

  logger.info('profile', 'clicking on see more buttons')
  await seeMoreButtons.clickAll(page)

  if(waitTimeToScrapMs) {
    logger.info('profile', `applying 2nd delay`)
    await new Promise((resolve) => { setTimeout(() => { resolve() }, waitTimeToScrapMs / 2)})
  }

  const [profile] = await scrapSection(page, template.profile)
  const positions = await scrapSection(page, template.positions)
  const educations = await scrapSection(page, template.educations)
  const recommendations = await scrapSection(page, template.recommendations)
  const recommendationsGiven = await scrapSection(page, template.recommendationsGiven)
  const skills = await scrapSection(page, template.skills)
  const accomplishments = await scrapSection(page, template.accomplishments)
  const volunteerExperience = await scrapSection(page, template.volunteerExperience)
  const peopleAlsoViewed = await scrapSection(page, template.peopleAlsoViewed)

  //await page.close()
  logger.info('profile', `finished scraping url: ${url}`)

  return {
    profile,
    positions,
    educations,
    skills,
    recommendations,
    recommendationsGiven,
    accomplishments,
    peopleAlsoViewed,
    volunteerExperience
  }
}
