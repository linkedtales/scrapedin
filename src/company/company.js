const openPage = require('../openPage')
const scrapSection = require('../scrapSection')

const logger = require('../logger')(__filename)

module.exports = async (browser, cookies, url, waitTimeToScrapMs = 500) => {
  logger.info(`starting scraping url: ${url}`)

  //TODO: implement company scraper
}
