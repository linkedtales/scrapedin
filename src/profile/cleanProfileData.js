const logger = require('../logger')(__filename)
const pkg = require('../package')

module.exports = (profile) => {
  if(!profile.profile.name) {
    const messageError = `LinkedIn website changed and ${pkg.name} ${pkg.version} can't read basic data. Please report this issue at ${pkg.bugs.url}`
    logger.error(messageError, '')
    throw new Error(messageError)
  }

  profile.profile.summary = profile.about.text

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
    profile.courses = profile.courses.map(
      ({ name, year }) => ({
        name: name ? name.replace('Course name\n', '') : undefined,
        year: year ? year.replace('Course number\n', '') :undefined
      })
    );
  }

  if(profile.honors){
    profile.honors = profile.honors.map(
      ({ name, date, issuer, description }) => ({
        name: name ? name.replace('honor title\n', '') : undefined,
        date,
        issuer: issuer ? issuer.replace('honor issuer\n', '') : undefined,
        description: description ? description.replace('honor description\n', '') : undefined
      })
    );
  }

  if(profile.languages){
    profile.languages = profile.languages.map(({ name, proficiency }) => ({
      name: name ? name.replace('Language name\n', '') : undefined,
      proficiency,
    }));
  }

  if(profile.projects){
    profile.projects = profile.projects.map(
      ({ name, date, description, link }) => ({
        name: name ? name.replace('Project name\n', '') : undefined,
        date,
        description: description ? description.replace('Project description\n', '') : undefined,
        link,
      }),
    );
  }
  
  if (profile.organizations){
    profile.organizations = profile.organizations.map(
       ({ name, date, position, description }) => ({
         name: name ? name.replace('organization name\n', '') : undefined,
         date,
         position: position ? position.replace('organization position\n', '') : undefined,
         description: description ? description.replace('organization description\n', '') : undefined         
       })
    );
  }

  if(profile.patents){
    profile.patents = profile.patents.map(
      ({ name, date, issuer, description, link }) => ({
        name: name ? name.replace('Patent title\n', '') : undefined,
        date,
        issuer: issuer ? issuer.replace('Patent issuer and number\n', '') : undefined,
        description: description ? description.replace('Patent description\n', '') : undefined,
        link
      })
    );
  }

  if(profile.publications){
    profile.publications = profile.publications.map(
      ({ name, date, publisher, description, link }) => ({
        name: name ? name.replace('publication title\n','') : undefined,
        date,
        publisher: publisher ? publisher.replace('publication description\n','') : undefined,
        description: description ? description.replace('publication description\n', '') : undefined,
        link
      })
    );
  }

  if (profile.testScores){
    profile.testScores = profile.testScores.map(
      ({ name, date, score, description }) => ({
        name: name ? name.replace('Test name\n', '') : undefined,
        date,
        score,
        description: description ? description.replace('Description\n', '') : undefined
      })
    )
  }

  return profile
}
