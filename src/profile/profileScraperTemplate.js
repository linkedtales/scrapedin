const template = {
  profile: {
    selector: '.pv-top-card',
    fields: {
      name: `.text-heading-xlarge`,
      headline: `.text-body-medium`,
      location: `.pb2 .text-body-small`,
      connections: `li.text-body-small`,
      imageurl: {
        selector: `img.pv-top-card-profile-picture__image`,
        attribute: 'src'
      }
    }
  },
  about: {
    selector:
      'div .pv-shared-text-with-see-more.t-14.t-normal.t-black.display-flex.align-items-center',
    fields: {
      text: 'span[class=visually-hidden]'
    }
  },
  positions: {
    selector: "//*[@id='experience']/following-sibling::div/ul/li",
    fields: {
      title: 'div.display-flex.flex-column.full-width > div > span',
      link: {
        selector: 'a',
        attribute: 'href'
      },
      url: {
        selector: 'a',
        attribute: 'href'
      },
      companyName: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span:nth-child(2) > span:nth-child(1)',
      location: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div > div.display-flex.flex-column.full-width > span:nth-child(4) > span:nth-child(1)',
      description: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li > div > ul > li > div > div > div > div > span:nth-child(1)',
      date1: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span:nth-child(3) > span:nth-child(1)',
      date2: '.pv-entity__bullet-item-v2',
      roles: {
        selector: 'li',
        hasChildrenFields: true,
        fields: {
          title: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(1) > div > div.display-flex.flex-column.full-width.align-self-center > div > a > div',
          description: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(1) > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container',
          date1: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(1) > div > div.display-flex.flex-column.full-width.align-self-center > div > a > span:nth-child(3) > span:nth-child(1)',
          date2: '.pv-entity__bullet-item-v2',
          location: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(2) > div > div.display-flex.flex-column.full-width.align-self-center > div > a > span:nth-child(4) > span:nth-child(1)'
        }
      }
    }
  },
  educations: {
    selector: "//*[@id='education']/following-sibling::div/ul/li",
    fields: {
      title:
        'div > div.display-flex.flex-column.full-width.align-self-center > div > a > div > span > span:nth-child(1)',
      degree:
        'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div > a > span:nth-child(2) > span:nth-child(1)',
      url: {
        selector: 'a',
        attribute: 'href'
      },
      fieldOfStudy: 'div.pvs-list__outer-container > ul > li:nth-child(2) > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span:nth-child(2) > span:nth-child(1)',
      date1: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div > a > span.t-14.t-normal.t-black--light > span:nth-child(1)',
      date2: '.pv-entity__dates time:nth-child(2)',
      description: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li > div > ul > li > div > div > div > div > span:nth-child(1)'
    }
  },
  skills: {
    selector: '//a[contains(@href, "details/skills")]',
    fields: {
      title: '#main > section > div.artdeco-tabs.artdeco-tabs--size-t-48.ember-view > div.artdeco-tabpanel.active.ember-view > div > div > div.scaffold-finite-scroll__content > ul > li > div > div > div > div > a > div > span  > span:nth-child(1)',
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
    selector: "//*[@id='recommendations']/following-sibling::div/div/following-sibling::div/div/ul/li",
    fields: {
      user: {
        selector: 'div > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > div > span.mr1.hoverable-link-text.t-bold > span:nth-child(1)',
        attribute: 'href'
      },
      text: 'div > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li > div > ul > li > div > div > div > div > span:nth-child(1)',
      profileImage: {
        selector: 'a img',
        attribute: 'src'
      },
      name: {
        selector: 'a h3'
      },
      userDescription: {
        selector: 'div > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span:nth-child(2) > span:nth-child(1)'
      }
    }
  },
  recommendationsGiven: {
    selector: '.artdeco-tabpanel li.pv-recommendation-entity',
    fields: {
      user: {
        selector: '.pv-recommendation-entity__member',
        attribute: 'href'
      },
      text: 'blockquote.pv-recommendation-entity__text',
      profileImage: {
        selector: 'a img',
        attribute: 'src'
      },
      name: {
        selector: 'a h3'
      },
      userDescription: {
        selector: '.pv-recommendation-entity__headline'
      }
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
      text: 'p',
      profileImage: {
        selector: 'a img',
        attribute: 'src'
      },
      name: {
        selector: '.name'
      }
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
    selector: "//*[@id='courses']/following-sibling::div/ul/li",
    fields: {
      name: '.pv-accomplishment-entity__title',
      year: '.pv-accomplishment-entity__course-number'
    }
  },
  languages: {
    selector: "//*[@id='languages']/following-sibling::div/ul/li",
    fields: {
      name: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div > div.display-flex.flex-column.full-width > div',
      proficiency:
        'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div > div.display-flex.flex-column.full-width > span'
    }
  },
  projects: {
    selector: "//*[@id='projects']/following-sibling::div/ul/li",
    fields: {
      name: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > div > span > span:nth-child(1)',
      date: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span > span:nth-child(1)',
      description: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(3) > div > ul > li > div > div > div',
      link: {
        selector: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(2) > div > a',
        attribute: 'href'
      }
    }
  }
};

module.exports = template;
