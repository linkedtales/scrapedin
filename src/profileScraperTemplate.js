module.exports = {
  profile: {
    selector: 'section.pv-profile-section.pv-top-card-section',
    fields: {
      name: 'h1[class~=pv-top-card-section__name]',
      headline: 'h2[class~=pv-top-card-section__headline]',
      location: 'h3[class~=pv-top-card-section__location]',
      summary: 'p[class~=pv-top-card-section__summary-text]',
      connections: '.pv-top-card-v2-section__connections'
    }
  },
  positions: {
    selector: 'section[id=experience-section] li.pv-profile-section',
    fields: {
      title: 'h3',
      companyName: 'span[class~=pv-entity__secondapv-profile-sectionry-title]',
      location: 'pv-entity__location span:nth-child(2)',
      description: 'p[class~=pv-entity__description]',
      date1: 'h4.pv-entity__date-range span:nth-child(2)',
      date2: '.pv-entity__bullet-item-v2',
      roles: {
        selector: '.pv-entity__role-details-container',
        hasChildrenFields: true,
        fields: {
          title: 'h3',
          date1: 'h4.pv-entity__date-range span:nth-child(2)',
          date2: '.pv-entity__bullet-item-v2',
          location: 'pv-entity__location span:nth-child(2)'
        }
      }
    }
  },
  educations: {
    selector: 'section[id=education-section] li',
    fields: {
      title: 'h3',
      degree: 'span[class=pv-entity__comma-item]',
      date1: 'p.pv-entity__dates time:nth-child(1)',
      date2: 'p.pv-entity__dates time:nth-child(2)'
    }
  },
  skills: {
    top: {
      selector: 'li.pv-skill-category-entity__top-skill',
      fields: {
        title: 'p.pv-skill-category-entity__name',
        count: 'span.pv-skill-category-entity__endorsement-count'
      }
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
    selector: 'artdeco-tabpanel[aria-hidden=false] li.pv-recommendation-entity',
    fields: {
      user: {
        selector: 'a.pv-recommendation-entity__member',
        attribute: 'href'
      },
      text: 'blockquote.pv-recommendation-entity__text'
    }
  },
  recommendationsGiven: {
    selector: 'artdeco-tabpanel[aria-hidden=true] li.pv-recommendation-entity',
    fields: {
      user: {
        selector: 'a.pv-recommendation-entity__member',
        attribute: 'href'
      },
      text: 'blockquote.pv-recommendation-entity__text'
    }
  },
  accomplishments: {
    selector: 'section.pv-accomplishments-section div.ember-view',
    fields: {
      count: 'h3.pv-accomplishments-block__count span:nth-child(2)',
      title: '.accomplishments-block__content h3.pv-accomplishments-block__title',
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
      }
    }
  },
  volunteerExperience: {
    selector: 'section.volunteering-section li',
    fields: {
      title: 'h3',
      experience: 'span[class=pv-entity__secondary-title]',
      location: 'pv-entity__location span:nth-child(2)',
      description: '.pv-volunteer-causes',
      date1: 'h4.pv-entity__date-range span:nth-child(2)',
      date2: '.pv-entity__bullet-item'
    }
  },
  seeMoreButtons: [
    { id: 'summary', selector: '.pv-top-card-section__summary button[class~=pv-top-card-section__summary-toggle-button]' },
    { id: 'experiences', selector: '.pv-experience-section__see-more button' },
    { id: 'education', selector: '#education-section button.pv-profile-section__see-more-inline' },
    { id: 'skills', selector: '.pv-skill-categories-section button[class~=pv-skills-section__additional-skills]' },
    { id: 'recommendations', selector: '#recommendation-list + .artdeco-container-card-action-bar button' }
  ]
}
