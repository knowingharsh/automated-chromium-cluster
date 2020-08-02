const TriggerRest = require('../controller/rest/trigger.rest');

module.exports = function (router) {
  router.post('/api/trigger', TriggerRest.trigger);
}