"use strict";
let Vendor = require('../mongo-db/models/Person');
let modelRouter = require('./mongoModelRouter')(Vendor, "people");

module.exports = modelRouter;