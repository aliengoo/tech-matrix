"use strict";
let _ = require('lodash');
let models = require('../pg-db/models');
let router = require('express').Router();
let ProductAdapter = require('../pg-db/adapters/ProductAdapter');
  var productAdapter = new ProductAdapter(models);

router.get('/api/auth/product/:id', (req, res) => {
  productAdapter.findById(req.params.id).then((product) => {
    res.json(product);
  }).catch((error) => res.status(500).send(error));

});

router.post('/api/auth/product', (req, res) => {
  productAdapter.create(req.body).then((product) => {
    res.json(product);
  }).catch(error => res.status(500).send(error));
});

module.exports = router;