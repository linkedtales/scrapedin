const logger = require('../logger')(__filename)
const pkg = require('../package')

module.exports = (profile) => {
  if(!profile?.profile?.name) {
    const messageError = `LinkedIn website changed and ${pkg.name} ${pkg.version} can't read basic data. Please report this issue at ${pkg.bugs.url}`
    logger.error(messageError, '')
    throw new Error(messageError)
  }

  profile.profile.summary = profile?.about?.text

  profile.positions?.forEach((position) => {
    if(position.title){
        position.title = position.title.replace('Company Name\n', '')?.substring(0, position.title.indexOf('\n'))
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
    if (position?.date1?.includes('-')) {
      const splittedDate = position.date1.split('-')
      position.date1 = splittedDate?.[0].trim()
      position.date2 = splittedDate?.[1]?.substring(0, splittedDate?.[1]?.indexOf('·')).trim()
    }
  })

  profile.educations?.forEach((position) => {
    if (position?.date1?.includes('-')) {
      const splittedDate = position.date1.split('-')
      position.date1 = splittedDate?.[0].trim()
      position.date2 = splittedDate?.[1]?.trim()
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
      name: name ? name.replace('Language name\n', '')?.substring(0, name.indexOf('\n')) : undefined,
      proficiency: proficiency?.substring(0, proficiency.indexOf('\n')),
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

  if (profile?.skills?.title) {
    profile.skills = profile.skills.map((skill) => {
      return {
        title: skill?.title?.substring(0, skill?.title?.indexOf('\n')),
        count: skill?.count ? skill?.count?.substring(0, skill?.count?.indexOf('\n'))?.replace('· ', '').trim() : 0
      }
    })
  }
  
  return profile
}
