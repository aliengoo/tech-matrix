"use strict";
let Product = require('../db/models/Product');
let router = require('express').Router();

router.get('/api/product/meta/names', (req, res) => {
  Product.$getNames().then(
    (names) => res.send(names),
    (error) => res.status(500).send(error));
});

router.get('/api/product/:id', (req, res) => {
  Product.$findById(req.params.id).then(
    (product) => res.send(product),
    (error) => res.status(500).send(error));
});

router.post('/api/product/paged-query', (req, res) => {
  Product.$pagedQuery(res.body.page, res.body.query).then(
    (results) => res.send(results),
    (error) => res.status(500).send(error));
});

router.post('/api/product', (req, res) => {
  var product = new Product(req.body);
  product.$save().then(
    () => res.send(product),
    (error) => res.status(500).send(error));
});

router.put('/api/product', (req, res) => {
  Product.$findOneAndUpdate(req.body).then(
    (product) => res.send(product),
    (error) => res.status(500).send(error));
});

router.delete('/api/product/:id', (req, res) => {
  Product.$findByIdAndRemove(req.params.id).then(
    () => res.send({ok: true}),
    (error) => res.status(500).send(error));
});

module.exports = router;
