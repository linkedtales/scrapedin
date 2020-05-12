const faker = require('faker')
const { expect } = require('chai')
const profile = require('./profile/profile')
const logger = require('./logger')(__filename)
const { mock, match } = require('sinon')
const profileScraperTemplate = require('./profile/profileScraperTemplate')
const url = faker.internet.url()
const fakeEvalResult = faker.lorem.words(1)

// Make the linter happy.
var mocha = require('mocha')
var it = mocha.it

logger.stopLogging()

it('should get complete profile', async () => {
  const browserMock = prepareBrowserMock()
  const result = await profile(browserMock, [], url, 0)
  const expectedResult = {
    aboutAlternative: {
      text: fakeEvalResult
    },
    aboutLegacy: {
      text: fakeEvalResult
    },
    accomplishments: [
      {
        count: fakeEvalResult,
        items: [fakeEvalResult],
        title: fakeEvalResult
      }
    ],
    contact: {},
    courses: [
      {
        name: fakeEvalResult,
        year: fakeEvalResult
      }
    ],
    educations: [
      {
        date1: fakeEvalResult,
        date2: fakeEvalResult,
        degree: fakeEvalResult,
        fieldOfStudy: fakeEvalResult,
        url: fakeEvalResult,
        title: fakeEvalResult
      }
    ],
    languages: [
      {
        name: fakeEvalResult,
        proficiency: fakeEvalResult
      }
    ],
    peopleAlsoViewed: [
      {
        text: fakeEvalResult,
        user: fakeEvalResult
      }
    ],
    positions: [
      {
        companyName: fakeEvalResult,
        date1: fakeEvalResult,
        date2: fakeEvalResult,
        description: fakeEvalResult,
        link: fakeEvalResult,
        location: fakeEvalResult,
        roles: [
          {
            date1: fakeEvalResult,
            date2: fakeEvalResult,
            description: fakeEvalResult,
            location: fakeEvalResult,
            title: fakeEvalResult
          }
        ],
        title: fakeEvalResult,
        url: fakeEvalResult
      }
    ],
    profile: {
      connections: fakeEvalResult,
      headline: fakeEvalResult,
      location: fakeEvalResult,
      name: fakeEvalResult,
      summary: fakeEvalResult
    },
    profileAlternative: {
      connections: fakeEvalResult,
      headline: fakeEvalResult,
      imageurl: fakeEvalResult,
      location: fakeEvalResult,
      name: fakeEvalResult
    },
    profileLegacy: {
      connections: fakeEvalResult,
      headline: fakeEvalResult,
      location: fakeEvalResult,
      name: fakeEvalResult,
      summary: fakeEvalResult
    },
    projects: [
      {
        date: fakeEvalResult,
        description: fakeEvalResult,
        link: fakeEvalResult,
        name: fakeEvalResult
      }
    ],
    recommendations: {
      given: [
        {
          text: fakeEvalResult,
          user: fakeEvalResult
        }
      ],
      givenCount: '',
      received: [
        {
          text: fakeEvalResult,
          user: fakeEvalResult
        }
      ],
      receivedCount: ''
    },
    skills: [
      {
        count: fakeEvalResult,
        title: fakeEvalResult
      }
    ],
    volunteerExperience: [
      {
        date1: fakeEvalResult,
        date2: fakeEvalResult,
        description: fakeEvalResult,
        experience: fakeEvalResult,
        location: fakeEvalResult,
        title: fakeEvalResult
      }
    ]
  }

  expect(result).to.deep.equals(expectedResult)
})

it('should get an incomplete profile', async () => {
  const browser = prepareBrowserMock(true)

  const result = await profile(browser, [], url, 0)
  const expectedResult = {
    aboutAlternative: {
      text: ''
    },
    aboutLegacy: {
      text: ''
    },
    accomplishments: [
      {
        count: '',
        items: [fakeEvalResult],
        title: ''
      }
    ],
    contact: {},
    courses: [{}],
    educations: [
      {
        date1: '',
        date2: '',
        degree: '',
        fieldOfStudy: '',
        url: ''
      }
    ],
    languages: [
      {
        name: undefined,
        proficiency: ''
      }
    ],
    peopleAlsoViewed: [
      {
        text: '',
        user: ''
      }
    ],
    positions: [
      {
        companyName: '',
        date1: '',
        date2: '',
        description: '',
        link: '',
        location: '',
        roles: [
          {
            date1: '',
            date2: '',
            description: '',
            location: '',
            title: ''
          }
        ],
        url: ''
      }
    ],
    profile: {
      connections: '',
      headline: '',
      location: '',
      name: ''
    },
    profileAlternative: {
      connections: '',
      headline: '',
      imageurl: '',
      location: '',
      name: ''
    },
    profileLegacy: {
      connections: '',
      headline: '',
      location: '',
      name: ''
    },
    projects: [
      {
        date: '',
        description: undefined,
        link: '',
        name: undefined
      }
    ],
    recommendations: {
      given: [
        {
          text: '',
          user: ''
        }
      ],
      givenCount: '',
      received: [
        {
          text: '',
          user: ''
        }
      ],
      receivedCount: ''
    },
    skills: [
      {
        count: '',
        title: ''
      }
    ],
    volunteerExperience: [
      {
        date1: '',
        date2: '',
        description: '',
        experience: '',
        location: ''
      }
    ]
  }

  expect(result).to.deep.equals(expectedResult)
})

const prepareBrowserMock = (isIncompleteProfile) => {
  const Page = function () {
    this.goto = mock().once().withExactArgs(url).resolves()
    this.setUserAgent = mock().once().resolves()
    this.setExtraHTTPHeaders = mock().once().resolves()
    this.setViewport = mock().once().resolves()
    this.waitFor = mock().once().resolves()

    this.evaluate = mock()
      .twice()
      .withExactArgs(match.func)
      .atLeast(1)
      .resolves()
    this.waitForSelector = mock()
      .withExactArgs(match.string, match.object)
      .twice()
      .onCall(0)
      .rejects()
      .onCall(1)
      .resolves(true)

    this.setCookie = mock().once().withExactArgs().resolves()

    this.click = mock().atLeast(1).withExactArgs().resolves()
    this.$$eval = mock()
      .withExactArgs(match.string, match.func)
      .atLeast(1)
      .callsArgWith(1, [{ innerText: fakeEvalResult }])
      .resolves([fakeEvalResult])

    this.$eval = mock()
      .withExactArgs(match.string, match.func)
      .atLeast(1)
      .callsArgWith(
        1,
        isIncompleteProfile
          ? undefined
          : {
            innerText: fakeEvalResult,
            src: fakeEvalResult,
            href: fakeEvalResult
          }
      )
      .resolves(isIncompleteProfile ? '' : fakeEvalResult)

    this.close = mock().once().resolves()
  }

  Page.prototype.$ = () => new Page()

  if (isIncompleteProfile) {
    // I couldn't do that with sinon :(
    Page.prototype.$ = (arg) =>
      arg === profileScraperTemplate.positions.fields.title
        ? undefined
        : Promise.resolve(new Page())
  }

  Page.prototype.$$ = () => [new Page()]

  const browser = {
    newPage: mock().once().withExactArgs().resolves(new Page())
  }

  return browser
}
