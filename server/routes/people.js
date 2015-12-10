"use strict";
let Vendor = require('../db/models/Person');
let modelRouter = require('./modelRouter')(Vendor, "people");

module.exports = modelRouter;