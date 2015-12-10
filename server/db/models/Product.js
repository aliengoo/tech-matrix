var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var promisePlugin = require('./promisePlugin');

var productSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true }
  },
  relatedProducts: {
    type: Array,
    required: false,
    index: true
  },
  notes: {
    type: String,
    required: false
  },
  maintenanceEndDate: {
    type: Date
  },
  maintenanceNotes: {
    type: String
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
  tags: {
    type: Array
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

// text indexes
productSchema.index({
  name: 'text',
  notes: 'text',
  maintenanceNotes: 'text',
  supportNotes: 'text',
  tags: 'text'
}, {
  name: 'Product text index',
  weights: {
    name: 10, notes: 4, maintenanceNotes: 2, supportNotes: 2, tags: 1
  }
});

productSchema.statics.$getNames = function() {
  var defer = Q.defer();
  this.find().sort({name: 1}).select('name').exec((err, results) => {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(results);
    }
  });

  return defer.promise;
};

productSchema.plugin(promisePlugin);

module.exports = mongoose.model('Product', productSchema);