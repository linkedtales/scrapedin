const faker = require('faker')
const { expect } = require('chai')
const profile = require('./profile')
const logger = require('./logger')
const { mock, match } = require('sinon')
const profileScraperTemplate = require('./profileScraperTemplate')
const url = faker.internet.url()
const fakeEvalResult = faker.lorem.words(1)

logger.stopLogging()

it('should get complete profile', async () => {
  const browserMock = prepareBrowserMock()
  const result = await profile(browserMock, url)
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
      { title: fakeEvalResult, count: fakeEvalResult },
      { title: fakeEvalResult, count: fakeEvalResult }
    ],
    recommendations: [{
      user: fakeEvalResult,
      text: fakeEvalResult
    }],
    recommendationsGiven: [{
      user: fakeEvalResult,
      text: fakeEvalResult
    }],
    accomplishments: [{
      count: fakeEvalResult,
      items: [fakeEvalResult],
      title: fakeEvalResult
    }],
    volunteerExperience: [{
      title: fakeEvalResult,
      experience: fakeEvalResult
    }],
    peopleAlsoViewed: [{
      user: fakeEvalResult
    }]
  }

  expect(result).to.deep.equals(expectedResult)
})

it('should get an incomplete profile', async () => {
  const browser = prepareBrowserMock(true)

  const result = await profile(browser, url)
  const expectedResult = {
    profile: { name: '', headline: '', location: '', summary: '', connections: '' },
    positions: [{ companyName: '', description: '', date1: '', date2: '', location: '', roles: [{ date1: '', date2: '', location: '' }] }],
    educations: [{ degree: '', date1: '', date2: '' }],
    skills: [{ title: '', count: '' }, { title: '', count: '' }],
    recommendations: [{ user: '', text: '' }],
    recommendationsGiven: [{ user: '', text: '' }],
    accomplishments: [{ count: '', items: [fakeEvalResult], title: '' }],
    volunteerExperience: [{ experience: '' }],
    peopleAlsoViewed: [{ user: '' }]
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

    this.click = mock().exactly(profileScraperTemplate.seeMoreButtons.length).withExactArgs().resolves()
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
      (arg === profileScraperTemplate.positions.fields.title || arg === profileScraperTemplate.seeMoreButtons[2].selector)
        ? undefined : Promise.resolve(new Page())
  }

  Page.prototype.$$ = () => [new Page()]

  const browser = {
    newPage: mock().once().withExactArgs().resolves(new Page())
  }

  return browser
}
