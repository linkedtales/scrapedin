const faker = require('faker')
const { expect } = require('chai')
const profile = require('./profile/profile')
const logger = require('./logger')
const { mock, match } = require('sinon')
const profileScraperTemplate = require('./profile/profileScraperTemplate')
const url = faker.internet.url()
const fakeEvalResult = faker.lorem.words(1)

logger.stopLogging()

it.skip('should get complete profile', async () => {
  const browserMock = prepareBrowserMock()
  const result = await profile(browserMock, url, 0)
  const expectedResult = {
    profile: {
      name: fakeEvalResult,
      headline: fakeEvalResult,
      location: fakeEvalResult,
      summary: fakeEvalResult,
      connections: fakeEvalResult
    },
    positions: [{
      title: fakeEvalResult,
      companyName: fakeEvalResult,
      location: fakeEvalResult,
      description: fakeEvalResult,
      date1: fakeEvalResult,
      date2: fakeEvalResult,
      roles: [
        { title: fakeEvalResult, date1: fakeEvalResult, date2: fakeEvalResult, location: fakeEvalResult }
      ]
    }],
    educations: [{
      title: fakeEvalResult,
      degree: fakeEvalResult,
      date1: fakeEvalResult,
      date2: fakeEvalResult
    }],
    skills: [
      { title: fakeEvalResult, count: fakeEvalResult }
    ],
    recommendations: {
      givenCount: '',
      receivedCount: '',
      given: [{ text: fakeEvalResult, user: fakeEvalResult }],
      received: [{ text: fakeEvalResult, user: fakeEvalResult }]
    },
    accomplishments: [{
      count: fakeEvalResult,
      items: [fakeEvalResult],
      title: fakeEvalResult
    }],
    volunteerExperience: [{
      title: fakeEvalResult,
      description: fakeEvalResult,
      location: fakeEvalResult,
      date1: fakeEvalResult,
      date2: fakeEvalResult,
      experience: fakeEvalResult
    }],
    peopleAlsoViewed: [{
      user: fakeEvalResult,
      text: fakeEvalResult
    }]
  }

  expect(result).to.deep.equals(expectedResult)
})

it.skip('should get an incomplete profile', async () => {
  const browser = prepareBrowserMock(true)

  const result = await profile(browser, url, 0)
  const expectedResult = {
    profile: { name: '', headline: '', location: '', summary: '', connections: '' },
    positions: [{ companyName: '', description: '', date1: '', date2: '', location: '', roles: [{ title: '', date1: '', date2: '', location: '' }] }],
    educations: [{ degree: '', date1: '', date2: '' }],
    skills: [{ title: '', count: '' }],
    recommendations: { givenCount: '', receivedCount: '', given: [{ user: '', text: '' }], received: [{ user: '', text: '' }] },
    accomplishments: [{ count: '', items: [fakeEvalResult], title: '' }],
    volunteerExperience: [{ experience: '', date1: '', date2: '', description: '', location: '' }],
    peopleAlsoViewed: [{ user: '', text: '' }]
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

    this.evaluate = mock().twice().withExactArgs(match.func).atLeast(1).resolves()
    this.waitForSelector = mock().withExactArgs(match.string, match.object)
      .twice()
      .onCall(0).rejects()
      .onCall(1).resolves(true)

    this.click = mock().atLeast(1).withExactArgs().resolves()
    this.$$eval = mock().withExactArgs(match.string, match.func).atLeast(1)
      .callsArgWith(1, [fakeEvalResult])
      .resolves([fakeEvalResult])

    this.$eval = mock()
      .withExactArgs(match.string, match.func).atLeast(1)
      .callsArgWith(1, isIncompleteProfile ? undefined : fakeEvalResult)
      .resolves(isIncompleteProfile ? '' : fakeEvalResult)

    this.close = mock().once().resolves()
  }

  Page.prototype.$ = () => new Page()

  if (isIncompleteProfile) {
    // I couldn't do that with sinon :(
    Page.prototype.$ = (arg) =>
      (arg === profileScraperTemplate.positions.fields.title)
        ? undefined : Promise.resolve(new Page())
  }

  Page.prototype.$$ = () => [new Page()]

  const browser = {
    newPage: mock().once().withExactArgs().resolves(new Page())
  }

  return browser
}
