"use strict";

let router = require('express').Router();

let config = require('../config/config');
let jwt = require('jsonwebtoken');
let models = require('../pg-db/models');
let TokenAdapter = require('../pg-db/adapters/TokenAdapter');
let UserAdapter = require('../pg-db/adapters/UserAdapter');

let tokenAdapter = new TokenAdapter(models);
let userAdapter = new UserAdapter(models);

router.post('/api/auth/logout', (req, res) => {
  tokenAdapter.destroy(req.token)
    .then(() => res.json({
      success: true
    }))
    .catch(error => res.status(500).send(error));
});

router.post('/api/authenticate', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      success: false,
      error: "Bad Request"
    });
    return;
  }

  userAdapter.authenticate(req.body).then(() => {
      let token = jwt.sign({
        username: req.body.username
      }, config.token.secret, {
        expiresInMinutes: 1440
      });

      tokenAdapter.create(req.body.username, token).then(() => {
        res.json({
          success: true,
          message: `Hello, ${req.body.username}`,
          username: req.body.username,
          token
        });
      }).catch(error => res.status(500).send(error));
    }, (error) => {
      res.status(401).json(error);
    });
});

// used by the client to check on their current authorization status.
// this goes through the /api/auth middleware
router.get('/api/auth/authentication/verify', (req, res) => {
  res.json({
    success: true,
    username: req.decodedToken.username
  });
});

module.exports = router;
