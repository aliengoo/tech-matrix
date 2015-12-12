var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var promisePlugin = require('./promisePlugin');
var nameListPlugin = require('./namesListPlugin');

var vendorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  }
});

vendorSchema.plugin(promisePlugin);
vendorSchema.plugin(nameListPlugin);

module.exports = mongoose.model('Vendor', vendorSchema);
