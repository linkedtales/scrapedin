module.exports = async (browser, url) => {
  const page = await browser.newPage()
  await page.goto(url)
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36')
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8' })
  await page.setViewport({
    width: 1920,
    height: 1080
  })

  return page
}
