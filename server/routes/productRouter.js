"use strict";

let models = require('../pg-db/models');
let router = require('express').Router();

router.get('/api/auth/product/:id', (req, res) => {
  models.Product.findAll({
    include: [models.Vendor],
    where: {
      id: req.params.id
    }
  }).then((results) => {
    res.json(results);
  });
});

router.post('/api/auth/product', (req, res) => {
  models.Product.create(req.body).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json(error);
  });
});

module.exports = router;