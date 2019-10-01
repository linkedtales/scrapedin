const scrapSelectorFields = (selector, section) => async (scrapedObjectPromise, fieldKey) => {
  const scrapedObject = await scrapedObjectPromise
  const field = section.fields[fieldKey]

  // currently field can be a selector string, or an object containing a selector field
  const fieldSelectorString = await field.selector
    ? field.selector
    : field

  const isFieldPresent = await selector.$(fieldSelectorString)

  if (!isFieldPresent) { return scrapedObject }

  if (field.isMultipleFields) {
    scrapedObject[fieldKey] = await selector.$$eval(fieldSelectorString, (elems) => elems.map(elem => elem.innerText.trim()))
  } else if (field.hasChildrenFields) {
    const fieldChildrenSelectors = await selector.$$(field.selector)

    scrapedObject[fieldKey] = await Promise.all(
      fieldChildrenSelectors.map((s) => scrapSelector(s, field))
    )
  } else if (field.attribute && field.attribute === 'href') {
    scrapedObject[fieldKey] = await selector.$eval(fieldSelectorString, (elem) => elem ? elem.href.trim() : '')
  } else if (field.attribute && field.attribute === 'src') {
	scrapedObject[fieldKey] = await selector.$eval(fieldSelectorString, (elem) => elem ? elem.src.trim() : '')
  } else {
    scrapedObject[fieldKey] = await selector.$eval(fieldSelectorString, (elem) => elem ? elem.innerText.trim() : '')
  }

  return scrapedObject
}
const scrapSelector = (selector, section) =>
  Object.keys(section.fields)
    .reduce(scrapSelectorFields(selector, section), Promise.resolve({}))

module.exports = async (page, section) => {
  const sectionSelectors = await page.$$(section.selector)

  const scrapedPromises = sectionSelectors
    .map((selector) => scrapSelector(selector, section))

  return Promise.all(scrapedPromises)
}
