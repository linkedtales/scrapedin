const openPage = require("../openPage");
const scrapSection = require("../scrapSection");
const scrapSectionHardskills = require('../scrapSkillsSection')
const scrollToPageBottom = require("./scrollToPageBottom");
const seeMoreButtons = require("./seeMoreButtons");
const contactInfo = require("./contactInfo");
const template = require("./profileScraperTemplate");
const cleanProfileData = require("./cleanProfileData");

const logger = require("../logger")(__filename);

module.exports = async (
  browser,
  cookies,
  url,
  waitTimeToScrapMs = 500,
  hasToGetContactInfo = false,
  puppeteerAuthenticate = undefined
) => {
  logger.info(`starting scraping url: ${url}`);

  const page = await openPage({ browser, cookies, url, puppeteerAuthenticate });
  const profilePageIndicatorSelector = ".pv-top-card";
  try {
    await page.waitForSelector(profilePageIndicatorSelector, {
      timeout: 30000,
    });
  } catch (errSelector) {
    //why doesn't throw error instead of continuing scraping?
    //because it can be just a false negative meaning LinkedIn only changed that selector but everything else is fine :)
    const notLogged = await page.$('#public_profile_contextual-sign-in > div > section > main > div');
    const authWall = await page.$('a[href*="signup"]');
    if (notLogged || authWall) {
      browser.close();
      throw new Error("NOT_LOGGED");
    }
    logger.warn("profile selector was not found", errSelector.message);
  }
  try {
    logger.info("scrolling page to the bottom");
    await scrollToPageBottom(page);
    if (waitTimeToScrapMs) {
      logger.info(`applying 1st delay`);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, waitTimeToScrapMs / 2);
      });
    }

    await seeMoreButtons.clickAll(page);

    if (waitTimeToScrapMs) {
      logger.info(`applying 2nd (and last) delay`);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, waitTimeToScrapMs / 2);
      });
    }

    const [profile] = await scrapSection(page, template.profile);
    const [about] = await scrapSection(page, template.about);
    const positions = await scrapSection(page, template.positions);
    const educations = await scrapSection(page, template.educations);
    const [recommendationsCount] = await scrapSection(
      page,
      template.recommendationsCount
    );
    const recommendationsReceived = await scrapSection(
      page,
      template.recommendationsReceived
    );
    const recommendationsGiven = await scrapSection(
      page,
      template.recommendationsGiven
    );
    const accomplishments = await scrapSection(page, template.accomplishments);
    const courses = await scrapSection(page, template.courses);
    const languages = await scrapSection(page, template.languages);
    const projects = await scrapSection(page, template.projects);
    const volunteerExperience = await scrapSection(
      page,
      template.volunteerExperience
    );
    const peopleAlsoViewed = await scrapSection(
      page,
      template.peopleAlsoViewed
    );
    const contact = hasToGetContactInfo ? await contactInfo(page) : [];

    const skills = await scrapSectionHardskills(page, template.skills);

    await page.close();
    logger.info(`finished scraping url: ${url}`);

    const rawProfile = {
      profile,
      about,
      positions,
      educations,
      skills,
      recommendations: {
        givenCount: recommendationsCount ? recommendationsCount.given : "0",
        receivedCount: recommendationsCount
          ? recommendationsCount.received
          : "0",
        given: recommendationsReceived,
        received: recommendationsGiven,
      },
      accomplishments,
      courses,
      languages,
      projects,
      peopleAlsoViewed,
      volunteerExperience,
      contact,
    };

    const cleanedProfile = cleanProfileData(rawProfile);
    browser.close();
    return cleanedProfile;
  } catch (unhandledError) {
    browser.close();
    throw unhandledError;
  }
};
