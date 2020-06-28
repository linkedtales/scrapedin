const profileSelector = '.core-rail > *:first-child section >'

const template = {
  profile: {
    selector: '.pv-top-card',
    fields: {
      name: `.pv-top-card--list:first-child li:first-child`,
      headline: `h2`,
      location: `.pv-top-card--list:last-child li:first-child`,
      connections: `.pv-top-card--list:last-child li:nth-child(2)`,
      imageurl: {
		    selector: `img.pv-top-card__photo`,
        attribute: 'src'
      }
    }
  },
  about: {
    selector: '.pv-about-section',
    fields: {
      text: 'p'
    }
  },
  positions: {
    selector: '#experience-section li:not(.pv-entity__position-group-role-item)',
    fields: {
      title: 'h3',
      link: {
        selector: 'a',
        attribute: 'href',
      },
      url: {
        selector: 'a',
        attribute: 'href'
      },
      companyName: '.pv-entity__secondary-title',
      location: '.pv-entity__location span:last-child',
      description: '.pv-entity__description',
      date1: '.pv-entity__date-range span:last-child',
      date2: '.pv-entity__bullet-item-v2',
      roles: {
        selector: 'li',
        hasChildrenFields: true,
        fields: {
          title: 'h3',
          description: '.pv-entity__description',
          date1: '.pv-entity__date-range span:last-child',
          date2: '.pv-entity__bullet-item-v2',
          location: '.pv-entity__location span:last-child'
        }
      }
    }
  },
  educations: {
    selector: '#education-section li',
    fields: {
      title: 'h3',
      degree: 'span[class=pv-entity__comma-item]',
      url: {
        selector: 'a',
        attribute: 'href'
      },
	    fieldOfStudy: 'p.pv-entity__fos span:nth-child(2)',
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
      received: '.artdeco-tab:nth-child(1)',
      given: '.artdeco-tab:nth-child(2)'
    }
  },
  recommendationsReceived: {
    selector: '.recommendations-inlining',
    fields: {
      user: {
        selector: '.pv-recommendation-entity__member',
        attribute: 'href'
      },
      text: 'blockquote.pv-recommendation-entity__text'
    }
  },
  recommendationsGiven: {
    selector: '.artdeco-tabpanel li.pv-recommendation-entity',
    fields: {
      user: {
        selector: '.pv-recommendation-entity__member',
        attribute: 'href'
      },
      text: 'blockquote.pv-recommendation-entity__text'
    }
  },
  accomplishments: {
    selector: '.pv-accomplishments-section > div',
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
  },
  courses: {
    selector: '.pv-accomplishments-block.courses li', 
    fields: {
      name: '.pv-accomplishment-entity__title',
      year: '.pv-accomplishment-entity__course-number'
    }
  },
  honors: {
    selector: '.pv-accomplishments-block.honors li',
    fields: {
      name: '.pv-accomplishment-entity__title',
      date: 'pv-accomplishment-entity__date',
      issuer: 'pv-accomplishment-entity__issuer',
      description: 'pv-accomplishment-entity__description'
    }  
  },
  languages: {
    selector: '.pv-accomplishments-block.languages li',
    fields: {
      name: '.pv-accomplishment-entity__title',
      proficiency: '.pv-accomplishment-entity__proficiency',
    }
  },
  organizations: {
    selector: '.pv-accomplishments-block.organizations li',
    fields: {
      name: '.pv-accomplishment-entity__title',
      date: '.pv-accomplishment-entity__date',
      position: '.pv-accomplishment-entity__position',
      description: '.pv-accomplishment-entity__description'
    }  
  },
  patents: {
    selector: '.pv-accomplishments-block.patents li',
    fields: {
      name: '.pv-accomplishment-entity__title',
      date: '.pv-accomplishment-entity__date',
      issuer: '.pv-accomplishment-entity__issuer',
      description: '.pv-accomplishment-entity__description',
      link: {
        selector: '.pv-accomplishment-entity__external-source',
        attribute: 'href'
      }
    }  
  },
  projects: {
    selector: '.pv-accomplishments-block.projects li', 
    fields: {
      name: '.pv-accomplishment-entity__title',
      date: '.pv-accomplishment-entity__date',
      description: '.pv-accomplishment-entity__description',
      link: {
        selector: '.pv-accomplishment-entity__external-source',
        attribute: 'href'
      }
    }
  },
  publications: {
    selector: '.pv-accomplishments-block.publications li',
    fields: {
      name: '.pv-accomplishment-entity__title'
    },
    date: '.pv-accomplishment-entity__date',
    publisher: '.pv-accomplishment-entity__publisher',
    description: '.pv-accomplishment-entity__description',
    link: {
      selector: '.pv-accomplishment-entity__external-source',
      attribute: 'href'
    }
  },
  testScores: {
    selector: '.pv-accomplishments-block.test-scores li',
    fields: {
      name: '.pv-accomplishment-entity__title',
      date: '.pv-accomplishment-entity__date',
      score: '.pv-accomplishment-entity__score',
      description: '.pv-accomplishment-entity__description'
    }  
  },
}


module.exports = template