"use strict";
let Vendor = require('../db/models/Vendor');
let modelRouter = require('./modelRouter')(Vendor, "vendor");

module.exports = modelRouter;
