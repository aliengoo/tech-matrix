"use strict";

let router = require('express').Router();
let UserAdapter = require('../pg-db/adapters/UserAdapter');
let models = require('../pg-db/models');
let util = require('util');
let error = require('./defaultErrorHandler');

let userAdapter = new UserAdapter(models);

router.post('/api/registration/register', (req, res) => {

  req.checkBody('username', 'Invalid username').notEmpty().isAlpha();
  req.checkBody('password', 'Invalid password').notEmpty().isAlpha();

  let errors = req.validationErrors();

  if (errors) {
    res.status(400).json({
      success: false,
      error: util.inspect(errors)
    });
  } else {
    userAdapter.create(req.body).then(user => res.json({
      success: true
    }), error(res));
  }
});

router.get('/api/registration/does-username-exist', (req, res) => {

  req.checkQuery('username', 'Parameter invalid').notEmpty().isAlpha();

  let errors = req.validationErrors();

  if (errors) {
    res.status(400).json({
      success: false,
      error: util.inspect(errors)
    });
  } else {
    userAdapter.doesUsernameExist(req.params.username).then((exists) => {
      res.json({
        success: !exists
      });
    }, error(res));
  }

});

module.exports = router;