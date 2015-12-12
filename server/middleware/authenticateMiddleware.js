"use strict";

let router = require('express').Router();
let config = require('../config/config');
let jwt = require('jsonwebtoken');

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
        req.decodedToken = decodedToken;
        next();
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

