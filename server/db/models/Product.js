var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dependencies: {
    type: Array,
    required: false
  },
  notes: {
    type: String,
    required: false
  },
  supportEndDate: {
    type: Date,
    required: false
  },
  supportNotes: {
    type: String,
    required: false
  },
  businessOwners: {
    type: Array,
    required: false
  },
  technologyOwners: {
    type: Array,
    required: false
  },
  vendor: {
    type: Schema.Types.ObjectId,
    required: false
  },
  version: {
    type: String,
    required: false
  },
  updated: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);