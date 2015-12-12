"use strict";

var Q = require('q');
var calculate = require('../pagination').calculate;

module.exports = exports = function promisePlugin(schema) {
  schema.statics.$findById = function(id) {
    return Q.ninvoke(this, "findById", id);
  };

  schema.statics.$pagedQuery = function(page, query) {
    var defer = Q.defer();

    this.$count(query).then((count) => {
      calculate(page, count);

      this.find(query).skip(page.skip).limit(page.limit).exec((err, results) => {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve(results);
        }
      });
    });

    return defer.promise;
  };

  schema.statics.$count = function(query) {
    return Q.ninvoke(this, "find", query);
  };

  schema.statics.$findByIdAndRemove = function(id) {
    return Q.ninvoke(this, "findByIdAndRemove", id);
  };

  schema.statics.$findOneAndUpdate = function(product) {
    const query = {_id: product._id};
    const options = {upsert: true, "new": true};
    return Q.ninvoke(this, "findOneAndUpdate", query, product, options);
  };

  schema.statics.$textSearch = function(text) {
    var defer = Q.defer();
    this
      .find({$text: {$search: text}}, {score: {$meta: 'textScore'}})
      .sort({score: {$meta: 'textScore'}})
      .exec((err, results) => {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve(results);
        }
      });

    return defer.promise;
  };

  schema.methods.$save = function() {
    return Q.invoke(this, "save");
  };

};