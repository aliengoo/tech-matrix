"use strict";

var Q = require('q');

module.exports = exports = function nameListPlugin(schema) {

  schema.statics.$getNames = function() {
    var defer = Q.defer();
    this.find().sort({name: 1}).select('name').exec((err, results) => {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(results);
      }
    });

    return defer.promise;
  };
};
