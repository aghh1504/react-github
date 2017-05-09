const express = require('express')
const router = express.Router()
const getUser = require('../helpers/getUser');

router.get("/:username", function(req, res) {
  return getUser(req.params.username)
    .then((user) => user.notes)
    .then((notes) => {
      res.send({
        notes
      });
    })
    .catch((error) => console.error(error))
});

router.post("/:username", function(req, res) {
  return getUser(req.params.username)
    .then((user) => {
      console.log('adding note', req.body)
      user.notes = user.notes || [];
      user.notes.push(req.body.text);

      console.log(user)
      return user.save();
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => console.error(error))
});

router.delete("/:username/:index", function(req, res) {
  return getUser(req.params.username)
    .then((user) => {
      user.notes.splice(req.params.index, 1);

      return user.save();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => console.error(error))
});

router.put("/:username/:index", function(req, res) {
  return getUser(req.params.username)
    .then((user) => {
      user.notes[req.params.index] = req.body.text;

      return user.save();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => console.error(error))
});

module.exports = router;
