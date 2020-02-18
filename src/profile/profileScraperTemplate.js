const alternativeProfileSelector = '.core-rail > *:first-child section >'

module.exports = {
  profileLegacy: {
    selector: '.pv-content .pv-top-card-section',
    fields: {
      name: `.pv-top-card-section__name`,
      headline: `.pv-top-card-section__headline`,
      location: `.pv-top-card-section__location`,
      connections: `.pv-top-card-v2-section__connections`
    }
  },
  profileAlternative: {
    selector: '.pv-content',
    fields: {
      name: `${alternativeProfileSelector} div:last-child > div:last-child > div:first-child ul:first-child > li:first-child`,
      headline: `${alternativeProfileSelector} div:last-child h2`,
      imageurl: {
		  selector: `${alternativeProfileSelector} div:last-child > div:first-child > div:first-child [src^="https"]`,
		  attribute: 'src'
	  },
	  location: `${alternativeProfileSelector} div:last-child > div:last-child > div:first-child ul:last-child > li:first-child`,
      connections: `${alternativeProfileSelector} div:last-child > div:last-child > div:first-child ul:last-child > li:nth-child(2)`
    }
  },
  aboutLegacy: {
    selector: '.pv-top-card-section__summary',
    fields: {
      text: '.pv-top-card-section__summary-text'
    }
  },
  aboutAlternative: {
    selector: '.pv-about-section',
    fields: {
      text: 'p'
    }
  },
  positions: {
    selector: 'section[id=experience-section] li',
    fields: {
      title: 'h3',
      companyName: '.pv-entity__secondary-title',
      location: '.pv-entity__location span:last-child',
      description: '.pv-entity__description',
      date1: '.pv-entity__date-range span:last-child',
      date2: '.pv-entity__bullet-item-v2',
      roles: {
        selector: '.pv-entity__role-details',
        hasChildrenFields: true,
        fields: {
          title: 'h3 span:last-child',
          description: '.pv-entity__description',
          date1: '.pv-entity__date-range span:last-child',
          date2: '.pv-entity__bullet-item-v2',
          location: '.pv-entity__location span:last-child'
        }
      }
    }
  },
  educations: {
    selector: 'section[id=education-section] li',
    fields: {
      title: 'h3',
      degree: 'span[class=pv-entity__comma-item]',
	  fieldofstudy: 'p.pv-entity__fos span:nth-child(2)',
      date1: '.pv-entity__dates time:nth-child(1)',
      date2: '.pv-entity__dates time:nth-child(2)'
    }
  },
  skills: {
    selector: '.pv-skill-category-entity__skill-wrapper',
    fields: {
      title: '.pv-skill-category-entity__name-text',
      count: '.pv-skill-category-entity__endorsement-count'
    }
  },
  recommendationsCount: {
    selector: '.recommendations-inlining',
    fields: {
      received: 'artdeco-tab:nth-child(1)',
      given: 'artdeco-tab:nth-child(2)'
    }
  },
  recommendationsReceived: {
    selector: 'artdeco-tabpanel[aria-hidden=false] li.pv-recommendation-entity',
    fields: {
      user: {
        selector: '.pv-recommendation-entity__member',
        attribute: 'href'
      },
      text: 'blockquote.pv-recommendation-entity__text'
    }
  },
  recommendationsGiven: {
    selector: 'artdeco-tabpanel[aria-hidden=true] li.pv-recommendation-entity',
    fields: {
      user: {
        selector: '.pv-recommendation-entity__member',
        attribute: 'href'
      },
      text: 'blockquote.pv-recommendation-entity__text'
    }
  },
  accomplishments: {
    selector: '.pv-accomplishments-section',
    fields: {
      count: 'h3 span:last-child',
      title: '.pv-accomplishments-block__title',
      items: {
        selector: 'li',
        isMultipleFields: true
      }
    }
  },
  peopleAlsoViewed: {
    selector: 'li.pv-browsemap-section__member-container',
    fields: {
      user: {
        selector: 'a',
        attribute: 'href'
      },
      text: 'p'
    }
  },
  volunteerExperience: {
    selector: 'section.volunteering-section li',
    fields: {
      title: 'h3',
      experience: 'span[class=pv-entity__secondary-title]',
      location: '.pv-entity__location span:nth-child(2)',
      description: '.pv-volunteer-causes',
      date1: '.pv-entity__date-range span:nth-child(2)',
      date2: '.pv-entity__bullet-item'
    }
  }
}
