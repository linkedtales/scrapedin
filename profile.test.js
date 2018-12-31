const faker = require('faker')
const { expect } = require('chai')
const profile = require('./profile')
const { mock, match } = require('sinon')

const url = faker.internet.url()
const fakeEvalResult = faker.lorem.words(1)
function page(){
  this.goto = mock().withExactArgs(url).resolves(),
  this.waitFor = mock().resolves(),
  this.evaluate = mock().withExactArgs(match.func).atLeast(1).resolves(),
  this.waitForSelector = mock().withExactArgs(match.string, match.object)
    .twice()
    .onCall(0).rejects()
    .onCall(1).resolves(true),
  this.click = mock().withExactArgs().atLeast(1).resolves()

  this.$$eval = mock().withExactArgs(match.string, match.func).atLeast(1)
    .callsArgWith(1, [fakeEvalResult])
    .resolves([fakeEvalResult])
}

page.prototype.$eval = mock()
  .withExactArgs(match.string, match.func).atLeast(1)
  .callsArgWith(1, fakeEvalResult)
  .resolves(fakeEvalResult)

page.prototype.$ = () => new page()
page.prototype.$$ = () => [new page()]

it('should get complete profile', async() => {

  const result = await profile(new page(), url)
  const expectedResult = {
    profile: {
      name: fakeEvalResult,
      headline: fakeEvalResult,
      location: fakeEvalResult,
      summary: fakeEvalResult,
      connections: fakeEvalResult
    },
    experiences:[{
      title: fakeEvalResult,
      company: fakeEvalResult,
      description: fakeEvalResult,
      date1: fakeEvalResult,
      date2: fakeEvalResult
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
    peopleAlsoViewed: [{
      user: fakeEvalResult
    }]
  }

  expect(result).to.deep.equals(expectedResult)
})

it('should get an incomplete profile', async() => {
  page.prototype.$eval = mock()
    .withExactArgs(match.string, match.func).atLeast(1)
    .callsArgWith(1, undefined)

  const frame = require('./frame')

  //I couldn't do that with sinon :(
  page.prototype.$ = (arg) =>
    (arg === frame.experiences.fields.title || arg === frame.seeMoreButtons[2].selector)
    ? undefined : Promise.resolve(new page())


  const result = await profile(new page(), url)
  const expectedResult = {
    profile: { name: '', headline: '', location: '', summary: '', connections: '' },
    experiences: [ { company: '', description: '', date1: '', date2: '' } ],
    educations: [ { degree: '', date1: '', date2: '' } ],
    skills: [ { title: '', count: '' }, { title: '', count: '' } ],
    recommendations: [ { user: '', text: '' } ],
    recommendationsGiven: [ { user: '', text: '' } ],
    peopleAlsoViewed: [ { user: '' } ]
  }

  expect(result).to.deep.equals(expectedResult)
})
