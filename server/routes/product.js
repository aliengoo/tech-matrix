"use strict";
let Product = require('../db/models/Product');
let router = require('express').Router();
let calculate = require('../db/pagination');
let _ = require('lodash');

router.get('/api/product/meta/names', (req, res) => {
  Product.find({}).select('name').exec((err, docs) => {
    console.log("hello");
    if (err) {
      res.status(500).send({err});
    } else {
      var names = [];
      _.forEach(docs, (d) => names.push(d.name));

      res.send(names);
    }
  });
});

router.get('/api/product/:id', (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      res.status(500).send({
        err
      });
    } else {
      res.send(product);
    }
  });
});

router.post('/api/product/meta/filter', (req, res) => {

  //TODO: use promises
  // count
  Product.count(req.body.query, (err, count) => {

    if (err) {
      res.status(500).send({err});
    } else {
      let page = _.clone(req.body.page);
      calculate(page, count);

      var query = Product
        .find(req.body.query)
        .skip(page.skip)
        .limit(page.totalItems);

      query.exec((err, results) => {
        if (err) {
          res.status(500).send({err});
        } else {
          res.send({
            page,
            results
          });
        }
      });
    }

  });
});

router.post('/api/product', (req, res) => {
  var product = new Product(req.body);

  product.save((err) => {
    if (err) {
      res.status(500).send({
        err
      });
    } else {
      res.send(product);
    }
  });

});

router.put('/api/product', (req, res) => {
  Product.findOneAndUpdate({
    _id: req.body._id
  }, req.body, {upsert: true, "new": true}, (err, doc) => {
    if (err) {
      res.status(500).send({
        err
      });
    } else {
      res.send(doc);
    }
  })
});

router.delete('/api/product/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(500).send({
        err
      });
    } else {
      res.send({
        ok: true
      });
    }
  });
});

module.exports = router;
