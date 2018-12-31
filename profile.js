const frame = require('./frame')

const sectionRead = async(browser, section) => {
  const page = await browser.newPage()

  const experiencesElement = await page.$$(section.selector)
  return await Promise.all(
    experiencesElement.map((experience) =>
      Object.keys(section.fields).reduce((acc, field) =>
        acc.then(async(obj) => {
          const fieldObject = section.fields[field]
          const selector = fieldObject.selector || fieldObject
          const hasField = await experience.$(selector)

          if(hasField){
            if(fieldObject.attribute && fieldObject.attribute === 'href') {
              obj[field] = await experience.$eval(selector, (e) => e ? e.href : '')
            } else if (fieldObject.isMultipleFields) {
              const fields = await experience.$$(fieldObject.selector)

              obj[field] = []
              for(let i = 0; i < fields.length; i++) {
                obj[field] = await experience.$$eval(fieldObject.selector, (e) => e.map(x => x.innerText))
              }
            } else {
              obj[field] = await experience.$eval(selector, (e) => e ? e.innerText : '')
            }
          }
          return obj
        })
      , Promise.resolve({}))
    )
  )
}
module.exports = async(page, url) => {
  await page.goto(url)
  await page.waitFor("h1[class~='pv-top-card-section__name']")

  for(i = 0; i < 15; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight))
    const hasReachedEnd = await page.waitForSelector('#footer-logo', {
      visible: true,
      timeout: 500
    }).catch(() => {
      console.log("vai promissar")
    })

    if(hasReachedEnd)
      break;
  }


  //click see more buttons
  for(i = 0; i < frame.seeMoreButtons.length;i++) {
    const elem = await page.$(frame.seeMoreButtons[i].selector)
    if(elem){
      await elem.click()
    }
  }

  const [profile] = await sectionRead(page, frame.profile)
  const experiences = await sectionRead(page, frame.experiences)
  const educations = await sectionRead(page, frame.educations)
  const skillsTop = await sectionRead(page, frame.skills.top)
  const skillsOther = await sectionRead(page, frame.skills.others)
  const recommendations = await sectionRead(page, frame.recommendations)
  const recommendationsGiven = await sectionRead(page, frame.recommendationsGiven)
  const accomplishments = await sectionRead(page, frame.accomplishments)
  const peopleAlsoViewed = await sectionRead(page, frame.peopleAlsoViewed)

  return {
    profile,
    experiences,
    educations,
    skills: skillsTop.concat(skillsOther),
    recommendations,
    recommendationsGiven,
    peopleAlsoViewed
  }
}
