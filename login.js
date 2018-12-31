module.exports = async(page, email, password) => {
  await page.goto('https://www.linkedin.com')

  await page.waitFor('#login-email')

  await page.$('#login-email')
    .then((emailElement) => emailElement.type(email))
  await page.$('#login-password')
    .then((passwordElement) => passwordElement.type(password))

  await page.$('#login-submit')
    .then((button) => button.click())

  await page.waitFor('input[role=combobox]')

  return
}
