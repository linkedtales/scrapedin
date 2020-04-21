const logger = require('../logger')

module.exports = async (page) => {
  const MAX_TIMES_TO_SCROLL = 25
  const TIMEOUT_BETWEEN_SCROLLS = 50
  const PAGE_BOTTOM_SELECTOR_STRING = '#footer-logo'

  for (let i = 0; i < MAX_TIMES_TO_SCROLL; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight))

    const hasReachedEnd = await page.waitForSelector(PAGE_BOTTOM_SELECTOR_STRING, {
      visible: true,
      timeout: TIMEOUT_BETWEEN_SCROLLS
    }).catch(() => {
      logger.info('scrollToPageBottom', `scrolling to page bottom (${i + 1})`)
    })

    if (hasReachedEnd) {
      return
    }
  }

  logger.warn('scrollToPageBottom', 'page bottom not found')
}
