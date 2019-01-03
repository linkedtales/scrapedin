![](https://github.com/leonardiwagner/scrapedin/raw/master/logo.png)

Scraper for LinkedIn full profile data, working for 2019 new website layout.  

Install via npm package manager: `npm i scrapedin`

[![Build Status](https://travis-ci.org/leonardiwagner/scrapedin.svg?branch=master)](https://travis-ci.org/leonardiwagner/scrapedin) [![Coverage Status](https://coveralls.io/repos/github/leonardiwagner/scrapedin/badge.svg?branch=master)](https://coveralls.io/github/leonardiwagner/scrapedin?branch=master)



#### Usage Example:

```
const scrapedin = require('scrapedin')

const profileScraper = await scrapedin({ email: 'login@mail.com', password: 'pass' })
const profile = await profileScraper('https://www.linkedin.com/in/some-profile/')
```

#### Documentation:

- `scrapedin(options)`
  - options *Object*:
    - email: LinkedIn login e-mail *(required)*
    - password: LinkedIn login password *(required)*
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
    experiences:[
      { title, company, description, date1, date2 }
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
    recommendationsGiven: [
      { user, text }
    ],
    accomplishments: [
     { count, title, items }
    ],
    peopleAlsoViewed: [
      { user }
    ]
  }
  ```

### License

[Apache 2.0][apache-license]

[apache-license]:./LICENSE
