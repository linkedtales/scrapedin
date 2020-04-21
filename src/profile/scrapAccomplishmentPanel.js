const scrapSection = require('../scrapSection');
const template = require('./profileScraperTemplate');

const scrapAccomplishmentPanel = async (page, section) => {
  const openingButton = await page.$(
    `.pv-accomplishments-block.${section} button`,
  );

  await openingButton.click();
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });

  const result = scrapSection(page, template[section]);

  return result;
};

module.exports = scrapAccomplishmentPanel;
