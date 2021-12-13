const openPage = require('../openPage')
const scrapSection = require('../scrapSection')
const scrapAccomplishmentPanel = require('./scrapAccomplishmentPanel')
const scrollToPageBottom = require('./scrollToPageBottom')
const seeMoreButtons = require('./seeMoreButtons')
const contactInfo = require('./contactInfo')
const template = require('./profileScraperTemplate')
const cleanProfileData = require('./cleanProfileData')
const cleanCompanyInfo = require('./cleanCompanyInfo')
const pkg = require('../package')

const logger = require('../logger')(__filename)

module.exports = async (browser, cookies, url, waitTimeToScrapMs = 500, hasToGetContactInfo = false, puppeteerAuthenticate = undefined) => {
  logger.info(`starting scraping url: ${url}`)

  let page;
  try {
    page = await openPage({ browser, cookies, url, puppeteerAuthenticate })
    if(!url.includes('/company/')) {
      const [userProfile] = await scrapSection(page, template.profile)
      logger.info(userProfile)
      if(!userProfile && userProfile.name) {
        const messageError = 'INVALID_COOKIE'
        logger.error(messageError, '')
        throw new Error(messageError)
      }
    }
  } catch (error) {
    const messageError = 'INVALID_COOKIE'
    logger.error(messageError, error)
    throw new Error(messageError, error)
  }

  if(!url.includes('/company/')) {
    const profilePageIndicatorSelector = '#profile-wrapper'
    await page.waitForSelector(profilePageIndicatorSelector, { timeout: 5000 })
      .catch((e) => {
        //why doesn't throw error instead of continuing scraping?
        //because it can be just a false negative meaning LinkedIn only changed that selector but everything else is fine :)
        const messageError = `LinkedIn website changed and ${pkg.name} ${pkg.version} can't read basic data. Please report this issue at ${pkg.bugs.url}`;
        logger.error(messageError, e)
        throw new Error(messageError, e)
      })
  }

  logger.info('scrolling page to the bottom')
  await scrollToPageBottom(page)
  
  if(waitTimeToScrapMs) {
    logger.info(`applying 1st delay`)
    await new Promise((resolve) => { setTimeout(() => { resolve() }, waitTimeToScrapMs / 2)})
  }

  await seeMoreButtons.clickAll(page)

  if(waitTimeToScrapMs) {
    logger.info(`applying 2nd (and last) delay`)
    await new Promise((resolve) => { setTimeout(() => { resolve() }, waitTimeToScrapMs / 2)})
  }

  if(url.includes('/company/')) {
    const [company] = await scrapSection(page, template.company);
    const cleanedCompanyInfo = cleanCompanyInfo(company);
    logger.info(`Cleaned Company Info: ${cleanedCompanyInfo}`);
    return cleanedCompanyInfo;
  } else {
    const [profile] = await scrapSection(page, template.profile)
    const [about] = await scrapSection(page, template.about)
    const positions = await scrapSection(page, template.positions)
    const educations = await scrapSection(page, template.educations)
    //const [recommendationsCount] = await scrapSection(page, template.recommendationsCount)
    //const recommendationsReceived = await scrapSection(page, template.recommendationsReceived)
    //const recommendationsGiven = await scrapSection(page, template.recommendationsGiven)
    const skills = await scrapSection(page, template.skills)
    //const accomplishments = await scrapSection(page, template.accomplishments)
    //const courses = await scrapAccomplishmentPanel(page, 'courses')
    //const languages = await scrapAccomplishmentPanel(page, 'languages')
    //const projects = await scrapAccomplishmentPanel(page, 'projects')
    //const volunteerExperience = await scrapSection(page, template.volunteerExperience)
    //const peopleAlsoViewed = await scrapSection(page, template.peopleAlsoViewed)
    //const contact = hasToGetContactInfo ? await contactInfo(page) : []
  
    await page.close()
    logger.info(`finished scraping url: ${url}`)
  
    const rawProfile = {
      profile,
      about,
      positions,
      educations,
      skills,
      /*recommendations: {
        givenCount: recommendationsCount ? recommendationsCount.given : "0",
        receivedCount: recommendationsCount ? recommendationsCount.received : "0",
        given: recommendationsReceived,
        received: recommendationsGiven
      },
      accomplishments,
      courses,
      languages,
      projects,
      peopleAlsoViewed,
      volunteerExperience,
      contact*/
    }
  
    const cleanedProfile = cleanProfileData(rawProfile)
    logger.info(`Cleaned profile: ${cleanedProfile}`);
    return cleanedProfile
  }
}
