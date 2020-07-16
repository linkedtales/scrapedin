const scrapSection = require('../scrapSection');
const template = require('./profileScraperTemplate');

const scrapAccomplishmentPanel = async (page, section) => {
  const queryString = `.pv-accomplishments-block.${section} button`

  const openingButton = await page.$(queryString);

  if (openingButton) {
    await page.evaluate((q) => {
      document.querySelector(q).click();
    }, queryString);

    return scrapSection(page, template[section]);
  }
};

module.exports = scrapAccomplishmentPanel;