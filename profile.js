const elements = {
  profile: {
    selector: 'section.pv-profile-section.pv-top-card-section',
    fields: {
      name: 'h1[class~=pv-top-card-section__name]',
      headline: 'h2[class~=pv-top-card-section__headline]',
      location: 'h3[class~=pv-top-card-section__location]',
      summary: 'p[class~=pv-top-card-section__summary-text]'
    }
  },
  experiences: {
    selector: 'section[id=experience-section] li',
    fields: {
       title: 'h3',
       company: 'span[class~=pv-entity__secondapv-profile-sectionry-title]',
       description: 'p[class~=pv-entity__description]',
       date1: 'h4.pv-entity__date-range span:nth-child(2)',
       date2: '.pv-entity__bullet-item-v2'
    }
  },
  educations: {
    selector: 'section[id=education-section] li',
    fields: {
       title: 'h3',
       degree: 'span[class=pv-entity__comma-item]',
       date1: 'p.pv-entity__dates time:nth-child(1)',
       date2: 'p.pv-entity__dates time:nth-child(2)',
    }
  },
  skills: {
    top: {
      selector: 'li.pv-skill-category-entity__top-skill',
      fields: {
        title: 'p.pv-skill-category-entity__name',
        count: 'span.pv-skill-category-entity__endorsement-count'
      },
    },
    others: {
      selector: 'div.pv-skill-category-entity__skill-wrapper',
      fields: {
        title: 'span.pv-skill-category-entity__name-text',
        count: 'span.pv-skill-category-entity__endorsement-count'
      }
    }
  },
  recommendations: {
    selector: 'li.pv-recommendation-entity',
    fields: {
      user: {
        selector: 'a.pv-recommendation-entity__member',
        attribute: 'href'
      },
      text: 'blockquote.pv-recommendation-entity__text'
    },
    givenButton: '.recommendations-inlining .artdeco-scrolling-container artdeco-tab:nth-child(1)'
  },
  seeMoreButtons: [
    '.pv-top-card-section__summary button[class~=pv-top-card-section__summary-toggle-button]', //summary
    '.pv-experience-section__see-more button', //experiences
    '.pv-skill-categories-section button[class~=pv-skills-section__additional-skills]', //skills
    '#recommendation-list + .artdeco-container-card-action-bar button' // recommendations
  ]
}

const sectionRead = async(page, section) => {
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
              obj[field] = await experience.$eval(selector, (e) => e ? e.href : '<none>')
            } else {
              obj[field] = await experience.$eval(selector, (e) => e ? e.innerText : '<none>')
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

  console.log("vai ir")

  //click see more buttons
  for(i = 0; i < elements.seeMoreButtons.length;i++) {
    const elem = await page.$(elements.seeMoreButtons[i])
    if(elem) {
      await elem.click()
    }
  }

  const profile = await sectionRead(page, elements.profile)
  const experiences = await sectionRead(page, elements.experiences)
  const educations = await sectionRead(page, elements.educations)
  const skillsTop = await sectionRead(page, elements.skills.top)
  const skillsOther = await sectionRead(page, elements.skills.others)
  const recommendations = await sectionRead(page, elements.recommendations)



  console.log("profile", profile)
  //console.log("recommendations", recommendations)




}
