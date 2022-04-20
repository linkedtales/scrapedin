const profileSelector = ".core-rail > *:first-child section >";

const template = {
  profile: {
    selector: ".pv-top-card",
    fields: {
      name: `.text-heading-xlarge`,
      headline: `.text-body-medium`,
      location: `.pb2 .text-body-small`,
      connections: `li.text-body-small`,
      imageurl: {
        selector: `img.pv-top-card-profile-picture__image`,
        attribute: "src",
      },
    },
  },
  about: {
    selector:
      "div .pv-shared-text-with-see-more.t-14.t-normal.t-black.display-flex.align-items-center",
    fields: {
      text: "span[class=visually-hidden]",
    },
  },
  positions: {
    selector: "//*[@id='experience']/following-sibling::div/ul/li",
    fields: {
      title: "div.display-flex.flex-column.full-width > div > span",
      link: {
        selector: "a",
        attribute: "href",
      },
      url: {
        selector: "a",
        attribute: "href",
      },
      companyName: ".pv-entity__secondary-title",
      location: ".pv-entity__location span:last-child",
      description: ".pv-entity__description",
      date1: ".pv-entity__date-range span:last-child",
      date2: ".pv-entity__bullet-item-v2",
      roles: {
        selector: "li",
        hasChildrenFields: true,
        fields: {
          title: "h3",
          description: ".pv-entity__description",
          date1: ".pv-entity__date-range span:last-child",
          date2: ".pv-entity__bullet-item-v2",
          location: ".pv-entity__location span:last-child",
        },
      },
    },
  },
  educations: {
    selector: "//*[@id='education']/following-sibling::div/ul/li",
    fields: {
      title:
        "div > div.display-flex.flex-column.full-width.align-self-center > div > a > div > span > span:nth-child(1)",
      degree:
        "div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div > a > span:nth-child(2) > span:nth-child(1)",
      url: {
        selector: "a",
        attribute: "href",
      },
      fieldOfStudy: "p.pv-entity__fos span:nth-child(2)",
      date1: ".pv-entity__dates time:nth-child(1)",
      date2: ".pv-entity__dates time:nth-child(2)",
      description: ".pv-entity__description",
    },
  },
  skills: {
    selector: "//*[@id='skills']/following-sibling::div/ul/li",
    fields: {
      title:
        "div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > div > span.mr1.hoverable-link-text.t-bold",
      count:
        "div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > div > span.pvs-entity__supplementary-info.t-14.t-black--light.t-normal.mr1",
    },
  },
  recommendationsCount: {
    selector: ".recommendations-inlining",
    fields: {
      received: ".artdeco-tab:nth-child(1)",
      given: ".artdeco-tab:nth-child(2)",
    },
  },
  recommendationsReceived: {
    selector: "//*[@id='recommendations']/following-sibling::div/div/following-sibling::div/div/ul/li",
    fields: {
      user: {
        selector: "div > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > div > span.mr1.hoverable-link-text.t-bold",
        attribute: "href",
      },
      text: "blockquote.pv-recommendation-entity__text",
      profileImage: {
        selector: "a img",
        attribute: "src",
      },
      name: {
        selector: "a h3",
      },
      userDescription: {
        selector: ".pv-recommendation-entity__headline",
      },
    },
  },
  recommendationsGiven: {
    selector: "//*[@id='recommendations']/following-sibling::div/div/following-sibling::div/div/ul/li",
    fields: {
      user: {
        selector: "div > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > div > span.mr1.hoverable-link-text.t-bold",
        attribute: "href",
      },
      text: "blockquote.pv-recommendation-entity__text",
      profileImage: {
        selector: "a img",
        attribute: "src",
      },
      name: {
        selector: "a h3",
      },
      userDescription: {
        selector: ".pv-recommendation-entity__headline",
      },
    },
  },
  accomplishments: {
    selector: ".pv-accomplishments-section > div",
    fields: {
      count: "h3 span:last-child",
      title: ".pv-accomplishments-block__title",
      items: {
        selector: "li",
        isMultipleFields: true,
      },
    },
  },
  peopleAlsoViewed: {
    selector: "li.pv-browsemap-section__member-container",
    fields: {
      user: {
        selector: "a",
        attribute: "href",
      },
      text: "p",
      profileImage: {
        selector: "a img",
        attribute: "src",
      },
      name: {
        selector: ".name",
      },
    },
  },
  volunteerExperience: {
    selector: "//*[@id='volonteer']/following-sibling::div/ul/li",
    fields: {
      title: "h3",
      experience: "span[class=pv-entity__secondary-title]",
      location: ".pv-entity__location span:nth-child(2)",
      description: ".pv-volunteer-causes",
      date1: ".pv-entity__date-range span:nth-child(2)",
      date2: ".pv-entity__bullet-item",
    },
  },
  courses: {
    selector: "//*[@id='courses']/following-sibling::div/ul/li",
    fields: {
      name: ".pv-accomplishment-entity__title",
      year: ".pv-accomplishment-entity__course-number",
    },
  },
  languages: {
    selector: "//*[@id='languages']/following-sibling::div/ul/li/div",
    fields: {
      name: "div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div > div.display-flex.flex-column.full-width > div > span",
      proficiency:
        "div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div > div.display-flex.flex-column.full-width > span",
    },
  },
  projects: {
    selector: "//*[@id='projects']/following-sibling::div/div/ul/li",
    fields: {
      name: ".pv-accomplishment-entity__title",
      date: ".pv-accomplishment-entity__date",
      description: ".pv-accomplishment-entity__description",
      link: {
        selector: ".pv-accomplishment-entity__external-source",
        attribute: "href",
      },
    },
  },
};

module.exports = template;
