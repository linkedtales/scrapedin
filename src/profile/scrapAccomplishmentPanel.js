const scrapSection = require('../scrapSection');
const template = require('./profileScraperTemplate');

const scrapAccomplishmentPanel = async (page, section) => {
  const openingButton = await page.$(
    `.pv-accomplishments-block.${section} button`,
  );
  
  if(openingButton) {
    await openingButton.click();
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });

    return scrapSection(page, template[section]);
  }
  
};

module.exports = scrapAccomplishmentPanel;
