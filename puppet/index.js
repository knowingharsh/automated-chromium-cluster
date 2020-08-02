const PageProcessor = require('./page.processors');
const logger = require('./../logger/custom.logger')();

const handel = async function ({ clusterData }) {

  logger.customLogger.info('started processing');

  const cluster = await require('./puppet.cluster');
  // cluster to wait until we get response from every page
  let pageResults = await Promise.all(
    clusterData.data.map(pageData => cluster
      .execute({ pageData }, PageProcessor.execute)
      .catch(e => { console.error(e) })));

  logger.customLogger.info('ended processing');

  return {
    pageResults
  }

}

module.exports.handel = handel;


