const PageExecutor = require('./page.executor');

const WIDTH = 1024;
const HEIGHT = 1000;

const blockedResourceTypes = [
  'image',
  'media',
  'font',
  'texttrack',
  'object',
  'beacon',
  'csp_report',
  'imageset',
];

const skippedResources = [
  'quantserve',
  'adzerk',
  'doubleclick',
  'adition',
  'exelator',
  'sharethrough',
  'cdn.api.twitter',
  'google-analytics',
  'googletagmanager',
  'google',
  'fontawesome',
  'facebook',
  'analytics',
  'optimizely',
  'clicktale',
  'mixpanel',
  'zedo',
  'clicksor',
  'tiqcdn',
];

const pageConfig = {
  timeout: 0,
  waitUntil: 'load',
};

const reqProcessing = (request) => {
  const requestUrl = request._url.split('?')[0].split('#')[0];
  if (
    blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
    skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)
  ) {
    request.abort();
  } else {
    request.continue();
  }
}

const execute = (async ({ page, data: { pageData } }) => {
  let { urlPath, urlData } = pageData;
  await page.setViewport({ width: WIDTH, height: HEIGHT });
  await page.setRequestInterception(true);
  page.on('request', reqProcessing);

  let executeResults;
  let error = "";
  try {
    await page.goto(urlPath, pageConfig);
    await page.content();
    await page.addScriptTag({ url: process.env.PAGE_SCRIPT_LOCATION });
    executeResults = await page.evaluate(PageExecutor.executeMeOnPage, { urlData });
  } catch (e) {
    console.error(e);
    error = e.stack;
  }

  return {
    ...pageData,
    urlPath, executeResults, error
  };
});


module.exports = {
  execute
}