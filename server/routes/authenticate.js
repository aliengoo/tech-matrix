"use strict";

let router = require('express').Router();
let config = require('../config/config');
let authenticate = require('../ldap/ldapAuthenticate');
let jwt = require('jsonwebtoken');

router.post('/api/authenticate', (req, res) => {
  authenticate(req.body.username, req.body.password)
    .then(() => {
      let token = jwt.sign({
        username: req.body.username
      }, config.token.secret, {
        expiresInMinutes: 1440
      });

      res.json({
        success: true,
        message: `Hello, ${req.body.username}`,
        token
      });
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
router.get('/api/auth/authorize', (req, res) => {
  res.json({
    success: true,
    username: req.decodedToken.username
  });
});

module.exports = router;
