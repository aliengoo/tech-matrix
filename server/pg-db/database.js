"use strict";

let dbConnection = require('../config/config').dbConnection;
let Sequelize = require('sequelize');

var connection = new Sequelize(
  dbConnection.database,
  dbConnection.username,
  dbConnection.password,
  dbConnection.options);

module.exports = connection;
