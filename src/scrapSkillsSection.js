module.exports = async (page, section) => {
  const elements = await page.$x(section.selector);
  await Promise.all([elements[0].click(), page.waitForNavigation()]);
  await page.waitForSelector('.pvs-list');
  //await page.waitForXPath('//*[@id="profilePagedListComponent-ACoAACRK7OQBs6rHhP6cNWG8SC0lysjD9Unu3Wo-SKILLS-VIEW-DETAILS-profileTabSection-ALL-SKILLS-NONE-en-US-0"]/div/div/div[2]/div[1]/a/div');

  const skills = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        "#main > section > div.artdeco-tabs.artdeco-tabs--size-t-48.ember-view > div.artdeco-tabpanel.active.ember-view > div > div > div.scaffold-finite-scroll__content > ul > li > div > div > div > div > a > div > span  > span:nth-child(1)"
      ),
      (element) => {
        return {
          title: element.textContent.replace(/\n| /g, ""),
        };
      }
    )
  );
  return skills;
};
