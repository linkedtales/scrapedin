const scrapSelectorFields = (selector, section) => async (scrapedObjectPromise, fieldKey) => {
  const scrapedObject = await scrapedObjectPromise
  const field = section.fields[fieldKey]

  // currently field can be a selector string, or an object containing a selector field
  const fieldSelectorString = await field.selector
    ? field.selector
    : field

    let isFieldPresent
    if (!fieldSelectorString.includes('/')) {
      isFieldPresent = await selector.$(fieldSelectorString)
    } else {
      isFieldPresent = await selector.$x(fieldSelectorString)
    }

  if (!isFieldPresent) { return scrapedObject }

  if (field.isMultipleFields) {
    if (field.attribute === 'href') {
      scrapedObject[fieldKey] = await selector.$$eval(fieldSelectorString, (elems) => elems.map(elem => elem.href ? elem.href.trim() : elem.innerHTML.trim()))
    } else if(field.attribute === 'src'){
      scrapedObject[fieldKey] = await selector.$$eval(fieldSelectorString, (elems) => elems.map(elem => elem.src ? elem.src.trim() : elem.innerHTML.trim()))
    }else{
      scrapedObject[fieldKey] = await selector.$$eval(fieldSelectorString, (elems) => elems.map(elem => elem.innerText.trim()))
    }
  } else if (field.hasChildrenFields) {
    const fieldChildrenSelectors = await selector.$$(field.selector)

    scrapedObject[fieldKey] = await Promise.all(
      fieldChildrenSelectors.map((s) => scrapSelector(s, field))
    )
  } else if (field.attribute && field.attribute === 'href') {
    scrapedObject[fieldKey] = await selector.$eval(fieldSelectorString, (elem) => elem && elem.href ? elem.href.trim() : '')
  } else if (field.attribute && field.attribute === 'src') {
    scrapedObject[fieldKey] = await selector.$eval(fieldSelectorString, (elem) => elem && elem.src ? elem.src.trim() : '')
  } else {
    scrapedObject[fieldKey] = await selector.$eval(fieldSelectorString, (elem) => elem && elem.innerText ? elem.innerText.trim() : '')
  }

  return scrapedObject
}
const scrapSelector = (selector, section) =>
  Object.keys(section.fields)
    .reduce(scrapSelectorFields(selector, section), Promise.resolve({}))

module.exports = async (page, section) => {
  let sectionSelectors;
  if (!section.selector.includes('/')) {
    sectionSelectors = await page.$$(section.selector)
  } else {
    sectionSelectors = await page.$x(section.selector)
  }
  const scrapedPromises = sectionSelectors
    .map((selector) => scrapSelector(selector, section))

  return Promise.all(scrapedPromises)
}
