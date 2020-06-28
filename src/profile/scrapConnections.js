const template = require('./profileScraperTemplate')
const scrapSection = require('../scrapSection')

const seeConnectionsSelector = 'a[data-control-name*="topcard_view_all_connections"]'

const scrapConnections = async (browser, page) => {
	const link = await page.$eval(seeConnectionsSelector, e => e ? e.href.trim() : undefined);
	if (!link) {
		// TODO Log 
		return { total: 0, connections: []}
	}

	let currentPage = 1;
	await page.goto(link + '&page=' + currentPage);
	const total = await page.$eval('.search-results__total', e => e ? parseInt(e.innerText) : 0)
	const maxPage = total > 1000 ? 100 : total / 10;
	const connections = [];

	do {
		// TODO - Last element on page isn't captured
		const connectionsOnPage = await scrapSection(page, template.connections);
		Array.prototype.push.apply(connections, connectionsOnPage);
		await page.goto(link + '&page=' + ++currentPage);
	} while (currentPage <= maxPage)
	
	return { total, connections };
}

module.exports = scrapConnections;