"use strict";
let Product = require('../db/models/Product');
let modelRouter = require('./modelRouter')(Product, "product");

module.exports = modelRouter;
