const logger = require('./logger')

module.exports = (profile) => {
  profile.profile = profile.profileLegacy
  if(!profile.profile){
    profile.profile = profile.profileAlternative
  }

  if(!profile.profile) {
    const messageError = 'LinkedIn website changed and scrapedin can\'t read basic data. Please report this issue at https://github.com/linkedtales/scrapedin/issues'
    logger.error('cleanProfileData', messageError, '')
    throw new Error(messageError)
  }

  if(profile.profile.connections) {
    profile.profile.connections = profile.profile.connections.replace(' connections', '')

    if(profile.profile.connections.indexOf('followers') > -1){
      profile.profile.followers = profile.profile.connections
                                                  .replace(' followers', '')
                                                  .replace(',', '')
    }
  }

  //backward compatibility only
  if(profile.aboutLegacy && profile.aboutLegacy.text) {
    profile.profile.summary = profile.aboutLegacy.text
  }
  if(profile.aboutAlternative && profile.aboutAlternative.text) {
    profile.profile.summary = profile.aboutAlternative.text
  }

  profile.positions.forEach((position) => {
    if(position.title){
        position.title = position.title.replace('Company Name\n', '')
    }
    if(position.description) {
      position.description = position.description.replace('See more', '');
	  position.description = position.description.replace('See less', '');
    }
    if(position.roles) {
      position.roles.forEach((role) => {
        if(role.title) {
          role.title = role.title.replace('Title\n', '')
        }
        if(role.description) {
          role.description = role.description.replace('See more', '')
        }
      })
    }
  })

  profile.recommendations.receivedCount = profile.recommendations.receivedCount.replace(/[^\d]/g, '')
  profile.recommendations.givenCount = profile.recommendations.givenCount.replace(/[^\d]/g, '')

  //Log any time we still have "see more" in the text - most likely this is something WE SHOULD be clicking...
  for (var key in profile) {
	  if ((profile.hasOwnProperty(key)) && (typeof profile[key] === 'object')) {
		  if (JSON.stringify(profile[key]).toLowerCase().indexOf('see more') > 0) {
		   logger.warn('cleanProfileData', `JSON property "${key}" appears to need some button click work (see more - exists in text)`);
		  }
	  }
  }

  if(profile.recommendations.received) {
    profile.recommendations.received.forEach((recommendation) => {
      if(recommendation.summary){
        recommendation.summary = recommendation.summary.replace('See more', '')
        recommendation.summary = recommendation.summary.replace('See less', '')
      }
    })
  }

  if(profile.recommendations.given) {
    profile.recommendations.given.forEach((recommendation) => {
      if(recommendation.summary){
        recommendation.summary = recommendation.summary.replace('See more', '')
        recommendation.summary = recommendation.summary.replace('See less', '')
      }
    })
  }

  return profile
}
