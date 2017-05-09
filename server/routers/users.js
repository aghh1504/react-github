const express = require('express')
const router = express.Router()
const getUser = require('../helpers/getUser');
const getInfo = require('../helpers/getInfo');

router.get("/:username", function(req, res) {
  console.log(req.params.username)

  return getUser(req.params.username)
    .then((user) => Promise.all([
      getInfo(user, 'info', req.query.force),
      getInfo(user, 'repos', req.query.force)
    ]))
  .then(([info, repos, notes]) => {
    res.send({
      info,
      repos
    });
  })
  .catch((error) => console.error(error))

});

module.exports = router;
