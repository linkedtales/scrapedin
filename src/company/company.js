const openPage = require('../openPage')
const scrapSection = require('../scrapSection')
const template = require('./companyScraperTemplate')

const logger = require('../logger')(__filename)

module.exports = async (browser, cookies, url, waitTimeToScrapMs = 500, puppeteerAuthenticate = undefined) => {
  logger.info(`starting scraping url: ${url}`);

  let company = {};

  let page;
  if(url.includes('legacySchoolId=')){
      page = await openPage({ browser, cookies, url, puppeteerAuthenticate });

      const aboutSelector = 'a[data-control-name=page_member_main_nav_about_tab]';

      company.url = page.url();
      
      await page.$eval(aboutSelector, async about => await about.click());
      await page.waitForNavigation();
  } else{
      company.url = url;
      url = url + '/about';
      page = await openPage({ browser, cookies, url, puppeteerAuthenticate });
  }
  company.about = (await scrapSection(page, template.about))[0];
  company.profile = (await scrapSection(page, template.profile))[0];

  await page.close();
  logger.info(`finished scraping url: ${url}`);
  
  return company
    
}
