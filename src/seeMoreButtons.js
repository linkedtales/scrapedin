const logger = require('./logger')
const seeMoreButtons = [
  {
    id: 'SHOW_MORE_SECTIONS',
    //button to avoid followers click which are <a> and will open a modal
    selector: 'button.pv-profile-section__card-action-bar',
    count: 1
  },{
    id: 'SHOW_MORE_EXPERIENCES',
    //buton to avoid activities click which are <a> and will redirect to other page
    selector: 'button.pv-profile-section__see-more-inline',
    count: 3
  },{
    id: 'SEE_MORE_EXPERIENCE_DESCRIPTION',
    selector: '.lt-line-clamp__more',
    count: 1
  }
]

const clickAll = async(page) => {
  for(let i = 0; i < seeMoreButtons.length; i ++){
    const button = seeMoreButtons[i]
    const elems = await page.$$(button.selector)

    //may click multiple times (since linkedin loads 5 per click)
    for(let j = 0; j < button.count; j++){
      elems.map(async(elem) => {
        if (elem) {
          await elem.click()
            .catch((e) => logger.warn('seeMoreButtons', `couldn't click on ${button.selector}, it's probably invisible`))
        }
      })

      if(button.count > 1){
        //wait for more items load
        await new Promise((resolve) => { setTimeout(() => { resolve() }, 100)})
      }
    }
  }

  return
}

module.exports = { clickAll }