const openPage = require('../openPage')
const scrapSection = require('../scrapSection')
const scrollToPageBottom = require('./scrollToPageBottom')
const seeMoreButtons = require('./seeMoreButtons')
const contactInfo = require('./contactInfo')
const template = require('./profileScraperTemplate')
const cleanProfileData = require('./cleanProfileData')

const logger = require('../logger')

module.exports = async (browser, cookies, url, waitTimeToScrapMs = 500, hasToGetContactInfo = false) => {
  logger.info('profile', `starting scraping url: ${url}`)

  const page = await openPage(browser, cookies, url)
  const profilePageIndicatorSelector = '.pv-profile-section'

  await page.waitFor(profilePageIndicatorSelector, { timeout: 5000 })
    .catch(() => {
      logger.warn('profile', 'profile selector was not found')
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

  const contact = hasToGetContactInfo ? await contactInfo(page) : {}
  const [profileLegacy] = await scrapSection(page, template.profileLegacy)
  const [profileAlternative] = await scrapSection(page, template.profileAlternative)
  const [aboutLegacy] = await scrapSection(page, template.aboutLegacy)
  const [aboutAlternative] = await scrapSection(page, template.aboutAlternative)
  const positions = await scrapSection(page, template.positions)
  const educations = await scrapSection(page, template.educations)
  const [recommendationsCount] = await scrapSection(page, template.recommendationsCount)
  const recommendationsReceived = await scrapSection(page, template.recommendationsReceived)
  const recommendationsGiven = await scrapSection(page, template.recommendationsGiven)
  const skills = await scrapSection(page, template.skills)
  const accomplishments = await scrapSection(page, template.accomplishments)
  const volunteerExperience = await scrapSection(page, template.volunteerExperience)
  const peopleAlsoViewed = await scrapSection(page, template.peopleAlsoViewed)

  await page.goto("https://www.linkedin.com/m/logout/")
  await page.close()
  logger.info('profile', `finished scraping url: ${url}`)

  const rawProfile = {
    contact,
    profileLegacy,
    profileAlternative,
    aboutLegacy,
    aboutAlternative,
    positions,
    educations,
    skills,
    recommendations: {
      givenCount: recommendationsCount ? recommendationsCount.given : "0",
      receivedCount: recommendationsCount ? recommendationsCount.received : "0",
      given: recommendationsReceived,
      received: recommendationsGiven
    },
    accomplishments,
    peopleAlsoViewed,
    volunteerExperience
  }

  const cleanedProfile = cleanProfileData(rawProfile)
  return cleanedProfile
}
