const openAccomplishmentPanel = async (page, section) => {
  const element = await page.$(`.pv-accomplishments-block.${section} button`);

  await element.click();
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });

  return;
};

module.exports = openAccomplishmentPanel;
