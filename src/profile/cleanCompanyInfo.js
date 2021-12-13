const logger = require('../logger')(__filename)
const pkg = require('../package')

module.exports = (company) => {
  const rawCompanyJson = JSON.stringify(company);
  logger.info(`Raw company information: ${rawCompanyJson}`);

  const { name, employeesOnLinkedIn, followers, about } = company;

  if(!name) {
    const messageError = `LinkedIn website changed and ${pkg.name} ${pkg.version} can't read basic data. Please report this issue at ${pkg.bugs.url}`
    logger.error(messageError, '')
    throw new Error(messageError)
  }

  if(employeesOnLinkedIn !== undefined) {
    company.employeesOnLinkedIn = employeesOnLinkedIn.split(' ')[2];
  }

  if(followers !== undefined) {
    company.followers = followers.split(' ')[0];
  }

  if(about && about.length) {
    company.about = about[0];
  }
  
  return company;
}