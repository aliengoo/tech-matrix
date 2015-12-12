"use strict";
let Product = require('../mongo-db/models/Product');
let modelRouter = require('./mongoModelRouter')(Product, "product");

module.exports = modelRouter;
