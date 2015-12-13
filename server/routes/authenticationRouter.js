"use strict";

let router = require('express').Router();
let config = require('../config/config');
let authenticate = require('../ldap/ldapAuthenticate');
let jwt = require('jsonwebtoken');
let models = require('../pg-db/models');
let TokenAdapter = require('../pg-db/adapters/TokenAdapter');

let tokenAdapter = new TokenAdapter(models);

router.post('/api/auth/logout', (req, res) => {
  tokenAdapter.destroy(req.token)
    .then(() => res.json({
      success: true
    }))
    .catch(error => res.status(500).send(error));
});

router.post('/api/authenticate', (req, res) => {
  authenticate(req.body.username, req.body.password)
    .then(() => {
      let token = jwt.sign({
        username: req.body.username
      }, config.token.secret, {
        expiresInMinutes: 1440
      });

      tokenAdapter.create(req.body.username, token).then(() => {
        res.json({
          success: true,
          message: `Hello, ${req.body.username}`,
          token
        });
      }).catch(error => res.status(500).send(error));
    })
    .catch(() => {
      res.status(401).json({
        success: false,
        message: "invalid username or password"
      });
    });
});

// used by the client to check on their current authorization status.
// this goes through the /api/auth middleware
router.get('/api/auth/verify', (req, res) => {
  res.json({
    success: true,
    username: req.decodedToken.username
  });
});

module.exports = router;
