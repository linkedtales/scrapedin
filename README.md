# scrapedin
scrape LinkedIn new website 2018-2019

#### Install from NPM package manager
```
npm i scrapedin
```

#### Usage

```
const scrapedin = require('scrapedin')

const profileScraper = await scrapedin({ email: 'some@user.com', password: 'pass' })
const profile = await profileScraper('https://www.linkedin.com/in/some-user/')
```

### Documentation

- `scrapedin(options)`
  - options *Object*:
    - **email** *string (required)*: A LinkedIn e-mail address to login
    - **password** *string (required)*: A LinkedIn password address to login
    - **isLogVisible** *bool*: Prints on stdout scrapedin log, default value: *false*
  - returns: Promise of *profileScraper* Object

- `profileScraper(url)`
  - url *string*: A LinkedIn profile URL
  - returns: promise of *profile* Object

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
    peopleAlsoViewed: [
      { user }
    ]
  }
  ```
