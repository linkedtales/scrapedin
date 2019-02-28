![](https://github.com/leonardiwagner/scrapedin/raw/master/logo.png)
[![Build Status](https://travis-ci.org/leonardiwagner/scrapedin.svg?branch=master)](https://travis-ci.org/leonardiwagner/scrapedin) [![Coverage Status](https://coveralls.io/repos/github/leonardiwagner/scrapedin/badge.svg?branch=master)](https://coveralls.io/github/leonardiwagner/scrapedin?branch=master)
[![NPM version](https://img.shields.io/npm/v/scrapedin.svg)](https://www.npmjs.com/package/scrapedin)

Scraper for LinkedIn full profile data.<br/>
Unlike others scrapers, it's working in 2019 with their new website.

Install via npm package manager: `npm i scrapedin`

### Usage Example:

```
const scrapedin = require('scrapedin')

const profileScraper = await scrapedin({ email: 'login@mail.com', password: 'pass' })
const profile = await profileScraper('https://www.linkedin.com/in/some-profile/')
```

### Documentation:

- `scrapedin(options)`
  - options *Object*:
    - email: LinkedIn login e-mail *(required)*
    - password: LinkedIn login password *(required)*
    - isHeadless: display browser *(default `false`)*
    - hasToLog: print logs on stdout *(default `false`)*
    - proxyAddress: use a proxy address in the format `"address:port"` *(default `undefined`)*
  - returns: Promise of *profileScraper* function

- `profileScraper(url, waitTimeMs = 500)`
  - url *string*: A LinkedIn profile URL
  - waitTimeMs *integer*: milliseconds to wait page load before scraping
  - returns: Promise of *profile* Object

- `profile` Object:
  ```
  {
    profile: {
      name, headline, location, summary, connections
    },
    positions:[
      { title, company, description, date1, date2,
        roles: [{ title, description, date1, date2 }]
      }
    ],
    educations: [
      { title, degree, date1, date2 }
    ],
    skills: [
      { title, count }
    ],
    recommendations: [
      { user, text }
    ],
    recommendationsCount: {
      received, given
    },
    recommendationsReceived: [
      { user, text }
    ],
    recommendationsGiven: [
      { user, text }
    ],
    accomplishments: [
     { count, title, items }
    ],
    volunteerExperience: {
      title, experience, location, description, date1, date2
    },
    peopleAlsoViewed: [
      { user, text }
    ]
  }
  ```
### Tips

- We already built a crawler to automatically collect multiple profiles, so check it out: [scrapedin-linkedin-crawler](https://github.com/linkedtales/scrapedin-linkedin-crawler)

- Usually in the first run LinkedIn asks for a manual check, to solve that you should:
  - set `isHeadless` to `false` on scrapedin to solve the manual check in the browser.
  - set `waitTimeMs` with a large number (such as  `10000`) to you have time to solve the manual check.

  After doing the manual check once you can go back with `isHeadless` and `waitTimeMs` previous values and start the scraping.

  We still don't have a solution for that on remote servers without GUI, if you have any idea [please tell us!](https://github.com/linkedtales/scrapedin/issues)

### Contribution

Feel free to contribute. Just open an issue to discuss something before creating a PR.

### License

[Apache 2.0][apache-license]

[apache-license]:./LICENSE
