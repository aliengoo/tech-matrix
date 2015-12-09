var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var model = mongoose.model;

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

module.exports = model('Vendor', vendorSchema);
