const puppeteer = require('puppeteer')
const login = require('./login')
const profile = require('./profile')

puppeteer.launch({ headless: false })
  .then((browser) => {
    return browser.newPage()
  })
  .then(async(page) => {

    // await page.setViewport({
    //   width:1000,
    //   height: 15000
    // })




  })
