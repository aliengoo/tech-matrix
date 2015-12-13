"use strict";
let _ = require('lodash');
let models = require('../pg-db/models');
let router = require('express').Router();

router.get('/api/auth/vendor/:id', (req, res) => {
  models.Vendor.findOne({
    where: {
      id: req.params.id
    }
  }).then((results) => {
    res.json(results);
  });
});

router.post('/api/auth/vendor', (req, res) => {
  models.Vendor.create(req.body).then((vendor) => {
    res.json(vendor);
  }).catch((error) => {
    res.status(500).json(error);
  });
});

module.exports = router;
