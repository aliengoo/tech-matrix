"use strict";
let Vendor = require('../mongo-db/models/Vendor');
let modelRouter = require('./mongoModelRouter')(Vendor, "vendor");

module.exports = modelRouter;
