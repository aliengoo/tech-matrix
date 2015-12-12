// http://docs.sequelizejs.com/en/1.7.0/articles/express/

"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";

// todo: dev configuration
var config = require('../../config/config');
var sequelize = new Sequelize(
  config.dbConnection.database,
  config.dbConnection.username,
  config.dbConnection.password,
  config.dbConnection.options);
var db = {};

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Product.sync({force: true});
db.Vendor.sync({force: true});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;