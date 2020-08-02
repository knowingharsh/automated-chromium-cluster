const Handler = require('./../../../puppet/index');

const trigger = (req, res) => {
  Handler.handel({ clusterData: req.body })
    .then(result => res.status(200).send(result));
}

module.exports.trigger = trigger;