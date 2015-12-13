"use strict";

let router = require('express').Router();
let config = require('../config/config');
let jwt = require('jsonwebtoken');
let models = require('../pg-db/models');
let TokenAdapter = require('../pg-db/adapters/TokenAdapter');

let tokenAdapter = new TokenAdapter(models);

router.use('/api/auth/*', (req, res, next) => {
  var token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.token.secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Failed to authenticate token'
        });
      } else {
        req.token = token;
        req.decodedToken = decodedToken;
        tokenAdapter.setLastAccessed(token).then(() => {
          next();
        }).catch(error => res.status(500).send(error));
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
});

module.exports = router;

