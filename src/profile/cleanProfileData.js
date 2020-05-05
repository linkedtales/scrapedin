const logger = require('../logger')

module.exports = (profile) => {
  profile.profile = profile.profileLegacy
  if(!profile.profile){
    profile.profile = profile.profileAlternative
  }

  if(!profile.profile) {
    const messageError = 'LinkedIn website changed and scrapedin can\'t read basic data. Please report this issue at https://github.com/linkedtales/scrapedin/issues'
    logger.error('cleanMessageData', messageError, '')
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
      position.description = position.description.replace('see more', '');
	    position.description = position.description.replace('See less', '');
    }
    if(position.roles) {
      position.roles.forEach((role) => {
        if(role.title) {
          role.title = role.title.replace('Title\n', '')
        }
        if(role.description) {
          role.description = role.description.replace('See more', '')
          role.description = role.description.replace('see more', '')
        }
      })
    }
  })

  if(profile.recommendations.receivedCount) {
    profile.recommendations.receivedCount = profile.recommendations.receivedCount.replace(/[^\d]/g, '')
  }

  if(profile.recommendations.givenCount) {
    profile.recommendations.givenCount = profile.recommendations.givenCount.replace(/[^\d]/g, '')
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

  if(profile.courses){
    profile.courses = profile.courses.map(({ name, year }) => {
      const coursesObj = {}
      if(name) {
        coursesObj.name = name.replace('Course name\n', '')
      }
      if(year) {
        coursesObj.year = year.replace('Course number\n', '')
      }
      return coursesObj
    }
    );
  }

  if(profile.languages){
    profile.languages = profile.languages.map(({ name, proficiency }) => ({
      name: name.replace('Language name\n', ''),
      proficiency,
    }));
  }

  if(profile.projects){
    profile.projects = profile.projects.map(
      ({ name, date, description, link }) => ({
        name: name.replace('Project name\n', ''),
        date,
        description: description.replace('Project description\n', ''),
        link,
      }),
    );
  }
  
  return profile
}
