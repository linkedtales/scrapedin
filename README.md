![](https://github.com/leonardiwagner/scrapedin/raw/master/logo.png)
[![Build Status](https://travis-ci.org/leonardiwagner/scrapedin.svg?branch=master)](https://travis-ci.org/leonardiwagner/scrapedin)
[![NPM version](https://img.shields.io/npm/v/scrapedin.svg)](https://www.npmjs.com/package/scrapedin)
----
Scraper for LinkedIn full profile data. Unlike others scrapers, it's working in 2020 with their new website.

`npm i scrapedin`

### Usage Example:

```javascript
const scrapedin = require('scrapedin')

const profileScraper = await scrapedin({ email: 'login@mail.com', password: 'pass' })
const profile = await profileScraper('https://www.linkedin.com/in/some-profile/')
```

- If you are looking for a crawler to automatically extract multiple profiles see [scrapedin-crawler](https://github.com/linkedtales/scrapedin-linkedin-crawler)

### Start Guide:

- [Basic Tutorial](https://github.com/linkedtales/scrapedin/wiki/Basic-Tutorial)
- [Using Cookies to Login](https://github.com/linkedtales/scrapedin/wiki/Using-Cookies-To-Login)
- [Tips](https://github.com/linkedtales/scrapedin/wiki/Tips)
- [Documentation](https://github.com/linkedtales/scrapedin/wiki/Documentation)


### Contribution

Feel free to contribute. Just open an issue to discuss something before creating a PR.

### License

[Apache 2.0][apache-license]

[apache-license]:./LICENSE
